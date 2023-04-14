/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  env: {
    BASE_URL: 'http://localhost:3000',
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
    hostname: 'firebasestorage.googleapis.com',
  }
}

module.exports = nextConfig
