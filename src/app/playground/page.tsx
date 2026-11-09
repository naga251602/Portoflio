import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Playground","Interactive visualizations and model simulations.","/playground");
import LegacyPortfolio from "@/components/LegacyPortfolio";
export default function Page() { return <LegacyPortfolio path="/playground" />; }
