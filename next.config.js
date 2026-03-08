/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static HTML export for S3
  trailingSlash: true, // Required for S3 static hosting
  allowedDevOrigins: ['http://192.168.1.186:3000'],
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'live.staticflickr.com',
      },
      {
        protocol: 'https',
        hostname: '*.staticflickr.com',
      },
    ],
  },
};

module.exports = nextConfig;
