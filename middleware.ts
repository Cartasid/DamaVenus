import { NextRequest, NextResponse } from "next/server";
import { isMarkdownPath, prefersMarkdown } from "@/lib/markdown-negotiation";

const INTERNAL_MARKDOWN_HEADER = "x-dama-markdown-internal";

export function middleware(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  if (request.headers.get(INTERNAL_MARKDOWN_HEADER) === "1") {
    return NextResponse.next();
  }

  if (!isMarkdownPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!prefersMarkdown(request.headers.get("accept"))) {
    return NextResponse.next();
  }

  const markdownUrl = request.nextUrl.clone();
  markdownUrl.pathname = "/api/markdown";
  markdownUrl.search = "";
  markdownUrl.searchParams.set("path", request.nextUrl.pathname);

  return NextResponse.rewrite(markdownUrl);
}

export const config = {
  matcher: ["/", "/music", "/visuals", "/about", "/press", "/contact", "/privacy", "/imprint"]
};
