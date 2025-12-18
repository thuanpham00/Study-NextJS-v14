import envConfig from "@/config";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/me/",
    },
    sitemap: `${envConfig.NEXT_PUBLIC_URL}/sitemap.xml`,
  };
}

/**
 * File này là cấu hình robots cho Next.js, dùng để hướng dẫn các search engine (Google, Bing, v.v.) cách crawl (thu thập dữ liệu) website của bạn. Ý nghĩa từng phần:

  Hàm robots() trả về một object theo chuẩn MetadataRoute.Robots của Next.js, sẽ tự động sinh file robots.txt khi build.
  rules:
  - userAgent: "*" — áp dụng cho mọi search engine bot.
  - allow: "/" — cho phép crawl toàn bộ website.
  - disallow: "/me/" — không cho phép bot truy cập/crawl các đường dẫn bắt đầu bằng /me/ (thường là trang cá nhân, profile, hoặc thông tin nhạy cảm).
  - sitemap: ${envConfig.NEXT_PUBLIC_URL}/sitemap.xml — chỉ định đường dẫn sitemap.xml để search engine biết cấu trúc website, giúp index hiệu quả hơn.
 */
