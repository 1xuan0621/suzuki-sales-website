import type { NextConfig } from "next";
import { guideRedirects } from "./src/data/guides";

const nextConfig: NextConfig = {
  redirects: () => guideRedirects,
};

export default nextConfig;
