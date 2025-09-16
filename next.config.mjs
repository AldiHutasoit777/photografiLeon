/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repoName = 'photografiLeon' // <-- nama repo kamu

const nextConfig = {
  // --- GitHub Pages: static export ---
  output: 'export',
  trailingSlash: true,

  // --- Subpath untuk Project Pages ---
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',

  // --- Helper env agar mudah dipakai di komponen ---
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : '',
    NEXT_PUBLIC_SITE_URL: isProd
      ? `https://aldihutasoit777.github.io/${repoName}`
      : 'http://localhost:3000',
  },

  // --- Build toleran (opsional, biar gak nahan deploy) ---
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // --- Next/Image tanpa server loader (wajib utk export) ---
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
