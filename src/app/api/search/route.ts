import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import {
  rateLimit,
  tooManyRequestsError,
} from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  const limited = rateLimit(request);
  if (!limited.success) {
    return tooManyRequestsError(limited.retryAfterSeconds);
  }

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") || "all";

    if (!query || query.length < 2) {
      return NextResponse.json({ success: true, data: [] });
    }

    const results: Record<string, unknown>[] = [];

    if (type === "all" || type === "services") {
      const services = await db.service.findMany({
        where: {
          isActive: true,
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          slug: true,
          shortDescription: true,
          category: true,
        },
        take: 5,
      });
      results.push(
        ...services.map((service: Record<string, unknown>) => ({
          ...service,
          type: "service",
        })),
      );
    }

    if (type === "all" || type === "blog") {
      const posts = await db.blogPost.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { excerpt: { contains: query, mode: "insensitive" } },
          ],
        },
        select: { id: true, title: true, slug: true, excerpt: true },
        take: 5,
      });
      results.push(
        ...posts.map((post: Record<string, unknown>) => ({
          ...post,
          type: "blog",
        })),
      );
    }

    if (type === "all" || type === "faq") {
      const faqs = await db.fAQ.findMany({
        where: {
          isActive: true,
          OR: [
            { question: { contains: query, mode: "insensitive" } },
            { answer: { contains: query, mode: "insensitive" } },
          ],
        },
        select: { id: true, question: true, answer: true, category: true },
        take: 5,
      });
      results.push(
        ...faqs.map((faq: Record<string, unknown>) => ({
          ...faq,
          type: "faq",
        })),
      );
    }

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error("GET /api/search error:", error);
    return NextResponse.json(
      { success: false, error: "Search failed" },
      { status: 500 },
    );
  }
}
