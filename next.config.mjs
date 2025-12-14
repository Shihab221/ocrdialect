/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

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

  // Experimental features to bypass issues
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;


