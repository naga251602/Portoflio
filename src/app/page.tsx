import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Software Engineer","Engineering projects, research and technical field notes.","/");
import LegacyPortfolio from "@/components/LegacyPortfolio";
export default function Page() { return <LegacyPortfolio path="/" />; }
