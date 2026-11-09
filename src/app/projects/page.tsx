import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Projects","Backend, full stack, AI and data engineering projects.","/projects");
import LegacyPortfolio from "@/components/LegacyPortfolio";
export default function Page() { return <LegacyPortfolio path="/projects" />; }
