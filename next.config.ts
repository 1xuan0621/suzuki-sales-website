import type { NextConfig } from "next";
import { guideRedirects } from "./src/data/guides";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  redirects: () => guideRedirects,
  images: {
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/personal/**", search: "" },
    ],
  },
  headers: () => [{
    source: "/:path*",
    headers: [
      // Baseline restrictions preserve static rendering and Next's inline scripts.
      // This is not a script-src policy and does not replace output escaping.
      { key: "Content-Security-Policy", value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ],
  }],
};

export default nextConfig;
