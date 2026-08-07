#!/usr/bin/env bash
# Generate the repetitive inner pages (legal, info) from templates.
set -euo pipefail
cd "$(dirname "$0")/../public"

head() {
  local title="$1" desc="$2"
  cat <<EOF
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <div data-header></div>
  <main id="main-content">
EOF
}

pagehero() {
  local crumb="$1" title="$2" sub="$3"
  cat <<EOF
    <section class="page-hero">
      <div class="container ph-inner">
        <div class="ph-breadcrumb"><a href="/">Home</a> <span>›</span> <span>${crumb}</span></div>
        <h1 class="display-2">${title}</h1>
        <p>${sub}</p>
      </div>
    </section>
EOF
}

foot() {
  cat <<EOF
  </main>
  <div data-footer></div>
  <script src="/js/api.js"></script>
  <script src="/js/demo.js"></script>
  <script src="/js/main.js"></script>
</body>
</html>
EOF
}

# ── Legal pages ─────────────────────────────────────────────────────────────
legal() {
  local file="$1" title="$2" date="$3"
  {
    head "${title} | Serene Dental" "${title} at Serene Dental Clinic."
    pagehero "Legal" "${title}" "Please read this page carefully. It governs your use of the Serene Dental website and services."
    cat <<EOF
    <section class="section">
      <div class="container article">
        <p class="lead">Effective date: ${date}</p>
        <p>This ${title} explains how Serene Dental Clinic collects, uses, and protects information, and the terms that apply when you use our website and services.</p>
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly — such as your name, email address, phone number, and health information you share during appointments — as well as certain technical data automatically when you use our website.</p>
        <h2>2. How We Use Information</h2>
        <p>We use your information to schedule and manage appointments, provide dental care, process payments, send appointment reminders, and improve our services. We never sell your personal information.</p>
        <h2>3. Data Security</h2>
        <p>We use industry-standard security measures including encryption, secure connections, and access controls to protect your data. Only authorized staff have access to your records.</p>
        <h2>4. Your Rights</h2>
        <p>You may request access to, correction of, or deletion of your personal information at any time by contacting us at info@serenedental.com.</p>
        <h2>5. Contact Us</h2>
        <p>If you have questions about this ${title}, please contact us at Serene Dental Clinic, 123 Wellness Avenue, Suite 200, San Francisco, CA 94102, or call (555) 123-4567.</p>
      </div>
    </section>
EOF
    foot
  } > "${file}"
  echo "generated ${file}"
}

legal privacy.html "Privacy Policy" "January 1, 2025"
legal terms.html "Terms of Service" "January 1, 2025"
legal cookies.html "Cookie Policy" "January 1, 2025"
legal refund-policy.html "Refund Policy" "January 1, 2025"

# ── Sitemap ─────────────────────────────────────────────────────────────────
{
  head "Sitemap | Serene Dental" "Browse all pages on the Serene Dental website."
  pagehero "Sitemap" "Sitemap" "Every page on the Serene Dental website, organized for easy navigation."
  cat <<'EOF'
    <section class="section">
      <div class="container" style="max-width:52rem">
        <div class="card" style="padding:2rem">
          <h2 class="section-title" style="margin-bottom:1rem">Main Pages</h2>
          <ul style="list-style:none;display:grid;gap:.5rem">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/team">Our Team</a></li>
            <li><a href="/technology">Technology</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/doctors">Doctors</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/book-appointment">Book Appointment</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/testimonials">Testimonials</a></li>
            <li><a href="/insurance">Insurance</a></li>
            <li><a href="/emergency">Emergency</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/login">Patient Portal / Login</a></li>
          </ul>
          <h2 class="section-title" style="margin:2rem 0 1rem">Legal</h2>
          <ul style="list-style:none;display:grid;gap:.5rem">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/cookies">Cookie Policy</a></li>
            <li><a href="/refund-policy">Refund Policy</a></li>
          </ul>
        </div>
      </div>
    </section>
EOF
  foot
} > sitemap.html
echo "generated sitemap.html"

# ── Technology ──────────────────────────────────────────────────────────────
{
  head "Technology | Serene Dental" "The advanced dental technology we use for precise, comfortable care."
  pagehero "About" "Modern Dental Technology" "Digital precision and comfort, powered by the latest in dental innovation."
  cat <<'EOF'
    <section class="section">
      <div class="container">
        <div class="grid" style="grid-template-columns:1fr;gap:1.5rem">
          <div class="card card-hover" style="padding:1.75rem"><h3 style="color:#0f766e;margin-bottom:.5rem">3D Digital Imaging</h3><p class="text-muted">Cone-beam CT and intraoral scanners give us a complete, 3D view of your mouth for precise planning and better outcomes.</p></div>
          <div class="card card-hover" style="padding:1.75rem"><h3 style="color:#0f766e;margin-bottom:.5rem">Digital Smile Design</h3><p class="text-muted">Preview your future smile before treatment begins with photo-realistic digital simulations.</p></div>
          <div class="card card-hover" style="padding:1.75rem"><h3 style="color:#0f766e;margin-bottom:.5rem">Laser Dentistry</h3><p class="text-muted">Minimally invasive laser treatment for faster healing and more comfortable procedures.</p></div>
          <div class="card card-hover" style="padding:1.75rem"><h3 style="color:#0f766e;margin-bottom:.5rem">Intraoral Cameras</h3><p class="text-muted">See exactly what we see with real-time, high-definition views inside your mouth.</p></div>
        </div>
      </div>
    </section>
EOF
  foot
} > technology.html
echo "generated technology.html"

# ── Insurance ───────────────────────────────────────────────────────────────
{
  head "Insurance | Serene Dental" "We accept most major dental insurance plans."
  pagehero "Patients" "Insurance & Financing" "We work with most major providers to make great dental care accessible."
  cat <<'EOF'
    <section class="section">
      <div class="container">
        <div class="grid" style="grid-template-columns:1fr;gap:1.5rem">
          <div class="card" style="padding:1.75rem"><h3 style="color:#0f766e;margin-bottom:.5rem">Accepted Providers</h3><p class="text-muted">We accept most PPO dental insurance plans, including Aetna, Delta Dental, Cigna, MetLife, Guardian, Humana, and UnitedHealthcare. Our team verifies your benefits before your visit.</p></div>
          <div class="card" style="padding:1.75rem"><h3 style="color:#0f766e;margin-bottom:.5rem">How It Works</h3><p class="text-muted">Bring your insurance card to your first visit. We'll estimate your coverage, file claims on your behalf, and clearly explain any out-of-pocket costs before treatment begins.</p></div>
          <div class="card" style="padding:1.75rem"><h3 style="color:#0f766e;margin-bottom:.5rem">No Insurance? No Problem</h3><p class="text-muted">Our Complete Care and Family plans offer affordable in-house coverage, and we provide flexible payment options for treatment.</p></div>
        </div>
      </div>
    </section>
EOF
  foot
} > insurance.html
echo "generated insurance.html"

# ── Emergency ───────────────────────────────────────────────────────────────
{
  head "Emergency Dental Care | Serene Dental" "Same-day relief for dental emergencies, 24/7."
  pagehero "Patients" "Dental Emergency Care" "Pain can't wait. We keep same-day slots open and provide 24/7 emergency support."
  cat <<'EOF'
    <section class="section">
      <div class="container">
        <div class="card" style="padding:2rem;border-left:6px solid #ef4444;margin-bottom:1.5rem">
          <h2 style="color:#b91c1c;margin-bottom:.5rem">Call Us Immediately</h2>
          <p class="text-muted">For urgent dental issues, call <a href="tel:(555) 911-0000" style="color:#0f766e;font-weight:600">(555) 911-0000</a>. Our emergency line is staffed 24/7.</p>
        </div>
        <div class="grid" style="grid-template-columns:1fr;gap:1.5rem">
          <div class="card card-hover" style="padding:1.75rem"><h3 style="color:#0f766e;margin-bottom:.5rem">Severe Toothache</h3><p class="text-muted">Rinse with warm water, gently floss to remove debris, and apply a cold compress. Avoid aspirin directly on the gums.</p></div>
          <div class="card card-hover" style="padding:1.75rem"><h3 style="color:#0f766e;margin-bottom:.5rem">Knocked-Out Tooth</h3><p class="text-muted">Hold the tooth by the crown, rinse gently, and keep it in milk or saliva. See us within 60 minutes for the best chance to save it.</p></div>
          <div class="card card-hover" style="padding:1.75rem"><h3 style="color:#0f766e;margin-bottom:.5rem">Broken or Chipped Tooth</h3><p class="text-muted">Save any broken pieces, rinse your mouth with warm water, and apply a cold compress to reduce swelling.</p></div>
          <div class="card card-hover" style="padding:1.75rem"><h3 style="color:#0f766e;margin-bottom:.5rem">Lost Filling or Crown</h3><p class="text-muted">Keep the crown if you have it. Over-the-counter dental cement can offer temporary relief until you see us.</p></div>
        </div>
      </div>
    </section>
EOF
  foot
} > emergency.html
echo "generated emergency.html"

# ── Careers ─────────────────────────────────────────────────────────────────
{
  head "Careers | Serene Dental" "Join a team that's passionate about smiles."
  pagehero "About" "Careers at Serene Dental" "We're always looking for passionate, compassionate people to join our growing team."
  cat <<'EOF'
    <section class="section">
      <div class="container">
        <div class="section-head"><span class="eyebrow">Join Us</span><h2 class="section-title">Open Positions</h2></div>
        <div class="grid" style="grid-template-columns:1fr;gap:1.5rem;max-width:48rem;margin:0 auto">
          <div class="card card-hover" style="padding:1.5rem;display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap"><div><h3>Dental Hygienist</h3><p class="text-muted text-sm">Full-time • San Francisco, CA</p></div><a class="btn btn-outline btn-sm" href="/contact">Apply Now</a></div>
          <div class="card card-hover" style="padding:1.5rem;display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap"><div><h3>Registered Dental Assistant</h3><p class="text-muted text-sm">Full-time • San Francisco, CA</p></div><a class="btn btn-outline btn-sm" href="/contact">Apply Now</a></div>
          <div class="card card-hover" style="padding:1.5rem;display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap"><div><h3>Patient Care Coordinator</h3><p class="text-muted text-sm">Full-time • San Francisco, CA</p></div><a class="btn btn-outline btn-sm" href="/contact">Apply Now</a></div>
        </div>
        <p class="text-center text-muted" style="margin-top:2rem">Don't see your role? Email your resume to <a href="mailto:careers@serenedental.com" style="color:#0f766e">careers@serenedental.com</a>.</p>
      </div>
    </section>
EOF
  foot
} > careers.html
echo "generated careers.html"

echo "Done generating info pages."
