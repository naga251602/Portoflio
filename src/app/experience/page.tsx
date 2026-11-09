import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Experience","Software engineering and research experience.","/experience");
import LegacyPortfolio from "@/components/LegacyPortfolio";
export default function Page() { return <LegacyPortfolio path="/experience" />; }
