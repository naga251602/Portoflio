import type { MetadataRoute } from "next";
import { list } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";
export default function sitemap():MetadataRoute.Sitemap {
 const paths=["/","/projects","/blog","/research","/experience","/playground","/contributions"];
 const dynamic=(["projects","blog","research","contributions"] as const).flatMap(kind=>list(kind).map(item=>`/${kind}/${item.slug}`));
 return [...paths,...dynamic].map(path=>({url:SITE_URL+path,changeFrequency:"monthly" as const,priority:path==="/"?1:0.7}));
}
