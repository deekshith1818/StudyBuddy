/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['fonts.googleapis.com', 'fonts.gstatic.com'],
  },
  experimental: {
    optimizeFonts: true,
  },
};
module.exports = {
  output: "standalone", // instead of "export"
};

