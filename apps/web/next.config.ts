import type { NextConfig } from "next";
import intl from "next-intl/plugin";

const withNextIntl = intl();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
