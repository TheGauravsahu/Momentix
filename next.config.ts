import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
      },
      {
        protocol: "https",
        hostname: "avatar-url.co",
      },
    ],
  },
};

export default nextConfig;
