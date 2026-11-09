import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Open Source Contributions","Open-source projects and contributions.","/contributions");
import LegacyPortfolio from "@/components/LegacyPortfolio";
export default function Page() { return <LegacyPortfolio path="/contributions" />; }
