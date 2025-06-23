import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ...otras opciones...
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "localtonet-skip-warning",
            value: "1",
          },
        ],
      },
    ];
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
