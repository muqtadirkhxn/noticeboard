/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow any external image URL since the bonus imageUrl field accepts arbitrary URLs
    unoptimized: true,
  },
}
module.exports = nextConfig
