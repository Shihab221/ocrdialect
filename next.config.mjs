/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript errors during builds
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization for external domains (if needed)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

