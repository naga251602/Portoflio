import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { list, get } from "@/lib/content";
import LegacyPortfolio from "@/components/LegacyPortfolio";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return list("blog").map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = get("blog", slug);
  return pageMetadata(entry?.title || "Not found", entry?.summary || entry?.abstract || "", `/blog/${slug}`);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!get("blog", slug)) notFound();
  return <LegacyPortfolio path={`/blog/${slug}`} />;
}
