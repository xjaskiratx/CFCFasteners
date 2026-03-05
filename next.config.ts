import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CSP is now set per-request in middleware to include a nonce.
  images: {
    qualities: [75, 100],
  },
};

export default nextConfig;
