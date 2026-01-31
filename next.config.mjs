/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize JS bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Experimental optimizations
  experimental: {
    optimizePackageImports: ["antd", "@ant-design/icons", "swiper", "framer-motion"],
  },
  env: {
    NEXT_PUBLIC_URL_BE: process.env.NEXT_PUBLIC_URL_BE,
    NEXT_PUBLIC_TOKEN_DEV: process.env.NEXT_PUBLIC_TOKEN_DEV,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET:
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  },
  images: {
    // Tự động convert ảnh sang AVIF/WebP để giảm 50-70% dung lượng
    formats: ["image/avif", "image/webp"],
    // Các kích thước thiết bị - thêm sizes nhỏ hơn cho mobile
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920],
    // Các kích thước ảnh nhỏ (icons, thumbnails)
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 384],
    // Cache ảnh 1 năm
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "admin.corrjewelry.vn",
        pathname: "/uploads/**",
      },
    ],
  },
  // Cache headers cho static assets
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
