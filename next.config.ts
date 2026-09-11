import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000"
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  {
    key: "X-Frame-Options",
    value: "DENY"
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin"
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  },
  {
    key: "Content-Security-Policy",
    value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'"
  }
];

const negotiatedContentPaths = [
  "/",
  "/music",
  "/visuals",
  "/about",
  "/press",
  "/contact",
  "/privacy",
  "/imprint"
];

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders
      },
      ...negotiatedContentPaths.map((source) => ({
        source,
        headers: [
          {
            // HTML and Markdown share the same canonical URL. Caches must keep
            // the negotiated representations separate.
            key: "Vary",
            value: "Accept"
          }
        ]
      }))
    ];
  }
};

export default nextConfig;
