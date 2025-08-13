/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',       // ✅ Enable static export
  distDir: 'dist',         // ✅ Put build in dist/ instead of .next
  trailingSlash: true,     // Optional: /about -> /about/index.html
}

module.exports = nextConfig
