/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Auto-converts JPG/JPEG/PNG → WebP or AVIF (browsers pick best)
    formats: ['image/avif', 'image/webp'],

    // Cache optimized images for 1 year on CDN/server
    minimumCacheTTL: 31536000,

    // Standard responsive breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],

    // Allow all local images (no remote domains needed for local /public images)
    remotePatterns: [],
  },

  // Compress all JS/CSS output
  compress: true,

  // Faster builds + smaller output
  poweredByHeader: false,

  // Enable React strict mode for better performance
  reactStrictMode: true,
}

module.exports = nextConfig
