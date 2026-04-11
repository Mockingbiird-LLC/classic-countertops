import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/classic-countertops',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
