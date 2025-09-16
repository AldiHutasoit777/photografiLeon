/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repoName = 'photografiLeon' // <-- nama repo GitHub-mu

const nextConfig = {
  // WAJIB untuk GitHub Pages (static hosting)
  output: 'export',
  trailingSlash: true,

  // Subpath saat production (project pages)
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',

  // Helper env: pakai di kode untuk prefix aset manual
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : '',
    NEXT_PUBLIC_SITE_URL: isProd
      ? `https://aldihutasoit777.github.io/${repoName}`
      : 'http://localhost:3000',
  },

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    // WAJIB untuk export statis
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
