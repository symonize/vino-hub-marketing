/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.figma.com" },
      { protocol: "https", hostname: "s3-alpha.figma.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/pricing", destination: "/", permanent: false },
    ];
  },
};
export default nextConfig;
