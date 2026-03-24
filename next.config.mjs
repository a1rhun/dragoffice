/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'postarchivefaction.com',
      },
    ],
  },
};

export default nextConfig;
