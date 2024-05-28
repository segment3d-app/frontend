/** @type {import('next').NextConfig} */
const nextConfig = {
  // headers() {
  //   return [
  //     {
  //       source: "/assets/s/:slug",
  //       headers: [
  //         {
  //           key: "Cross-Origin-Opener-Policy",
  //           value: "same-origin",
  //         },
  //         {
  //           key: "Cross-Origin-Embedder-Policy",
  //           value: "require-corp",
  //         },
  //       ],
  //     },
  //   ];
  // },
  images: {
    domains: ["103.174.115.248"],
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
        hostname: "103.174.115.248",
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
