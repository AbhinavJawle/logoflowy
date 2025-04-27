import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://v3.fal.media/files/**"),
      new URL("https://replicate.delivery/**"),
      new URL("https://res.cloudinary.com/**"),
    ],
  },
};

export default nextConfig;
