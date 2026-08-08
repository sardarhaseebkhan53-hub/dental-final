#!/usr/bin/env python3
"""Download media (profile picture, photos, video thumbnails, videos) from the
JDC - Junaid Dental care Facebook page (id 100083737489911) into public/images/fb.

Run inside GitHub Actions (full internet access). Anonymous fetch - the page is
public and its media URLs are served by the public fbcdn CDN.
"""
import html
import json
import os
import re
import subprocess
import sys
import urllib.request

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36")
PAGE_ID = "100083737489911"
BASE = f"https://www.facebook.com/profile.php?id={PAGE_ID}"
OUT = "public/images/fb"

# (video id, title) - ordered as they appear on the page's videos tab
VIDEOS = [
    ("744725975270312", "Uper Full bridge PFM"),
    ("1186218292846347", "Dr Tania Rehman Khattak interview (Pushto)"),
    ("532116652998922", "JDC clinic video"),
    ("865911898825628", "For appointment 03148290684"),
    ("685377140079135", "Full arch rehabilitation"),
    ("680764227191317", "Severe full arch attrition management"),
    ("604553594820536", "MB2 - contact us"),
    ("3018195168482109", "JDC clinic video"),
    ("502645235027607", "JDC clinic video"),
]

# photo ids seen on the page (largest = photo id of the profile picture)
PROFILE_PHOTO_ID = "541088700_741493211985255"


def opener():
    cj = urllib.request.HTTPCookieProcessor()
    return urllib.request.build_opener(cj)


def get(url, binary=False, op=None):
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept-Language": "en-US,en;q=0.9",
    })
    with (op or urllib.request.urlopen)(req, timeout=60) as r:
        data = r.read()
    return data if binary else data.decode("utf-8", "ignore")


def extract_urls(text):
    out = []
    for m in re.finditer(r'https://scontent[^"\s\\]+', text):
        u = html.unescape(m.group(0))
        if u not in out:
            out.append(u)
    return out


def photo_id(u):
    m = re.search(r'/([0-9]{5,}_[0-9]{5,})_n\.jpg', u)
    return m.group(1) if m else None


def size_of(u):
    m = re.search(r'cstp=mx(\d+)x(\d+)', u)
    return int(m.group(1)) * int(m.group(2)) if m else 0


def download(url, path, op=None):
    if os.path.exists(path) and os.path.getsize(path) > 1000:
        return True
    try:
        data = get(url, binary=True, op=op)
        with open(path, "wb") as f:
            f.write(data)
        print(f"OK   {path} ({len(data)} bytes)")
        return True
    except Exception as e:
        print(f"FAIL {path}: {e}")
        return False


def best_by_id(urls, wanted_id=None, pick=None):
    """Group urls by photo id, return dict id -> largest url."""
    groups = {}
    for u in urls:
        pid = photo_id(u)
        if not pid:
            continue
        if wanted_id and pid != wanted_id:
            continue
        if pick and not pick(u):
            continue
        if pid not in groups or size_of(u) > size_of(groups[pid][0]):
            groups[pid] = (u, size_of(u))
    return groups


def main():
    os.makedirs(OUT, exist_ok=True)
    op = opener()

    print("Fetching page tabs ...")
    main_html = get(BASE, op=op)
    photos_html = get(BASE + "&sk=photos", op=op)
    videos_html = get(BASE + "&sk=videos", op=op)
    all_urls = extract_urls(main_html + photos_html + videos_html)
    if not all_urls:
        print("ERROR: no fbcdn URLs found (login wall?)")
        sys.exit(1)

    # ---- profile picture (logo) -----------------------------------------
    best = best_by_id(all_urls, wanted_id=PROFILE_PHOTO_ID)
    if best:
        url, _ = best[PROFILE_PHOTO_ID]
        download(url, f"{OUT}/profile.jpg", op=op)
    else:
        print("WARN: profile photo not found")

    # ---- gallery photos (skip the profile pic, keep the biggest) --------
    groups = best_by_id(all_urls, pick=lambda u: "/t39.30808-" in u)
    groups.pop(PROFILE_PHOTO_ID, None)
    ordered = sorted(groups.items(), key=lambda kv: -kv[1][1])
    for i, (pid, (url, _)) in enumerate(ordered[:12], 1):
        download(url, f"{OUT}/photo-{i:02d}.jpg", op=op)
    print(f"      ({len(ordered)} photos available)")

    # ---- video thumbnails ------------------------------------------------
    thumbs = best_by_id(videos_html, pick=lambda u: "/t15.5256-" in u)
    for vid, _title in VIDEOS:
        candidates = {k: v for k, v in thumbs.items()}
        # pick the largest thumb not already used
        if not candidates:
            break
        pid, (url, _) = sorted(candidates.items(), key=lambda kv: -kv[1][1])[0]
        download(url, f"{OUT}/thumb-{vid}.jpg", op=op)
        thumbs.pop(pid, None)

    # ---- videos (mp4) -----------------------------------------------------
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "--quiet", "yt-dlp"],
                       check=True)
    except Exception as e:
        print("pip install yt-dlp failed:", e)

    for vid, title in VIDEOS:
        dest = f"{OUT}/video-{vid}.mp4"
        if os.path.exists(dest) and os.path.getsize(dest) > 100_000:
            continue
        vurl = f"https://www.facebook.com/100083737489911/videos/{vid}/"
        got = False
        try:
            r = subprocess.run(
                ["yt-dlp", "-f", "mp4", "--no-playlist", "--no-warnings",
                 "-o", f"{OUT}/video-{vid}.%(ext)s", vurl],
                capture_output=True, text=True, timeout=300)
            if r.returncode == 0 and os.path.exists(dest) and os.path.getsize(dest) > 100_000:
                print(f"OK   video-{vid}.mp4 via yt-dlp ({os.path.getsize(dest)} bytes)")
                got = True
        except Exception as e:
            print(f"yt-dlp {vid} failed: {e}")
        if got:
            continue
        # manual fallback: extract playable url from page html
        try:
            page = get(vurl, op=op)
            for key in ("browser_native_hd_url", "browser_native_sd_url",
                        "playable_url_quality_hd", "playable_url"):
                m = re.search(r'"' + key + r'":"((?:[^"\\]|\\.)*)"', page)
                if not m:
                    continue
                u = json.loads('"' + m.group(1) + '"')
                if "fbcdn" in u and download(u, dest, op=op):
                    got = True
                break
        except Exception as e:
            print(f"manual {vid} failed: {e}")
        if not got:
            print(f"SKIP video-{vid} (could not extract; will use FB embed)")

    # ---- resized logo + favicon ------------------------------------------
    try:
        subprocess.run(["pip", "install", "--quiet", "pillow"], check=True)
        from PIL import Image
        src = f"{OUT}/profile.jpg"
        if os.path.exists(src):
            im = Image.open(src).convert("RGB")
            im.thumbnail((512, 512))
            im.save(f"{OUT}/logo.png", "PNG")
            im2 = im.resize((96, 96), Image.LANCZOS)
            im2.save(f"{OUT}/logo-96.png", "PNG")
            im3 = im.resize((64, 64), Image.LANCZOS)
            im3.save(f"{OUT}/favicon.png", "PNG")
            print("OK   logo.png / logo-96.png / favicon.png")
    except Exception as e:
        print("PIL resize failed:", e)

    print("Done.")


if __name__ == "__main__":
    main()
