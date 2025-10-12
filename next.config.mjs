/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_URL_BE: process.env.NEXT_PUBLIC_URL_BE,
    NEXT_PUBLIC_TOKEN_DEV: process.env.NEXT_PUBLIC_TOKEN_DEV,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET:
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  },
  images: {
    domains: ["localhost", "127.0.0.1", "admin.corrjewelry.vn"], // Cho phép tải hình ảnh từ localhost
    remotePatterns: [
      {
        protocol: "http", // Chắc chắn sử dụng HTTP, vì Strapi đang chạy trên HTTP (local)
        hostname: "localhost", // Địa chỉ hostname của Strapi
        port: "1337", // Port mà Strapi đang chạy
        pathname: "/uploads/**", // Đảm bảo các đường dẫn hình ảnh trong Strapi sẽ được nhận diện
      },
      {
        protocol: "http", // Chắc chắn sử dụng HTTP, vì Strapi đang chạy trên HTTP (local)
        hostname: "127.0.0.1", // Địa chỉ hostname của Strapi
        port: "1337", // Port mà Strapi đang chạy
        pathname: "/uploads/**", // Đảm bảo các đường dẫn hình ảnh trong Strapi sẽ được nhận diện
      },
      {
        protocol: "https",
        hostname: "admin.corrjewelry.vn",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
