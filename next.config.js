/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/assets/s/:slug",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["34.101.221.152"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "storage",
        port: "8081",
        pathname: "/files/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8081",
        pathname: "/files/**",
      },
      {
        protocol: "http",
        hostname: "34.101.221.152",
        port: "8081",
        pathname: "/files/**",
      },
    ],
  },
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
