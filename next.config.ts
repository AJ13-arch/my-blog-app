import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Change from 'standalone' to 'export' for Cloudflare Pages compatibility
  output: 'export',
  // Add this for handling images on Cloudflare
  images: {
    unoptimized: true
  }
};

export default nextConfig;