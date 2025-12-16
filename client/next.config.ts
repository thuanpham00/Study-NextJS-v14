import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        // pathname: "/**",
      },
    ],
  },
};

// https://images.pexels.com/photos/32844898/pexels-photo-32844898.jpeg
// dùng ảnh remote bên ngoài thì phải vào nextJS.config.ts để cấu hình
export default nextConfig;
