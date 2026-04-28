import type { MetadataRoute } from "next";
import { LEGAL_INFO } from "@/lib/legal";

const BASE = LEGAL_INFO.shopUrl.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/shop/cart",
          "/shop/delivery",
          "/shop/confirm",
          "/shop/success",
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
