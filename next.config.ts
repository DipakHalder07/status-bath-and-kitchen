import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "interio.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.interio.com",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
