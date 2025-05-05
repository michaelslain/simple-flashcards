/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode for better error detection
  reactStrictMode: true,
  
  // Minimal, empty config is often best for reliability
  experimental: {
    // Support unstable features but don't activate them
    appDocumentPreloading: false,
    clientRouterFilter: false,
  }
}

module.exports = nextConfig
