import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
export default function robots():MetadataRoute.Robots {
 const production=process.env.VERCEL_ENV==="production" || (!process.env.VERCEL && process.env.NODE_ENV==="production");
 return { rules:production?{userAgent:"*",allow:"/",disallow:["/api/","/legacy.html"]}:{userAgent:"*",disallow:"/"},sitemap:production?`${SITE_URL}/sitemap.xml`:undefined };
}
