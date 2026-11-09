import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Engineering Blog","Technical articles and engineering notes.","/blog");
import LegacyPortfolio from "@/components/LegacyPortfolio";
export default function Page() { return <LegacyPortfolio path="/blog" />; }
