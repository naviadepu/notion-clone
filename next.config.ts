import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["files.edgestore.dev"],
  },
  eslint: {
    // This will allow production builds to complete even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
