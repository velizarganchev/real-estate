const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  outputFileTracing: false,
  images: {
    domains: ['res.cloudinary.com', 'shoplineimg.com'],
  },
})
