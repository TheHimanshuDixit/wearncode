/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    AES_SECRET: process.env.AES_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  images: {
    domains: ['source.unsplash.com'],
  },
}

module.exports = nextConfig
