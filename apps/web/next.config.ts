import type { NextConfig } from "next";
import intl from "next-intl/plugin";

const withNextIntl = intl();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
