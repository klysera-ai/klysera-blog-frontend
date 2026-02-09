import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
  },
};

export default nextConfig;
