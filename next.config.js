/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/assets/:slug",
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
        hostname: "0.0.0.0",
        port: "8081",
        pathname: "/files/**",
      },
    ],
  },
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
