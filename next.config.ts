import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize pdf-parse for server-side builds
      config.externals = config.externals || [];
      config.externals.push('pdf-parse');
    }
    return config;
  },
};

export default nextConfig;
