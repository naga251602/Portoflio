import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Research","Research papers, methods and findings.","/research");
import LegacyPortfolio from "@/components/LegacyPortfolio";
export default function Page() { return <LegacyPortfolio path="/research" />; }
