import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CSP is now set per-request in middleware to include a nonce.
};

export default nextConfig;
