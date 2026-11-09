import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { list, get } from "@/lib/content";
import LegacyPortfolio from "@/components/LegacyPortfolio";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return list("projects").map(item => ({ id: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const entry = get("projects", id);
  return pageMetadata(entry?.title || "Not found", entry?.summary || entry?.abstract || "", `/projects/${id}`);
}
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!get("projects", id)) notFound();
  return <LegacyPortfolio path={`/projects/${id}`} />;
}
