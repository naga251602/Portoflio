import type { Metadata, Viewport } from "next";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Gaurav N.V. | Software Engineer — Full Stack & Backend", template: "%s | Gaurav N.V." },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Gaurav Nagalapuram Venkataramanan" }],
  creator: "Gaurav Nagalapuram Venkataramanan",
  keywords: ["Gaurav Nagalapuram", "Gaurav N V", "software engineer", "backend engineer", "full stack engineer", "data engineering", "USC", "Python", "Go", "TypeScript", "C++", "distributed systems", "machine learning", "software projects"],
  alternates: { canonical: "/" },
  openGraph: { type:"website", locale:"en_US", siteName:SITE_NAME, title:"Gaurav N.V. | Software Engineer", description:SITE_DESCRIPTION, url:SITE_URL, images:[{url:"/opengraph-image",width:1200,height:630,alt:"Gaurav N.V. software engineer portfolio"}] },
  twitter: { card:"summary_large_image", title:"Gaurav N.V. | Software Engineer", description:SITE_DESCRIPTION, images:["/opengraph-image"] },
  robots: { index: process.env.VERCEL_ENV === "production" || (!process.env.VERCEL && process.env.NODE_ENV === "production"), follow:true, googleBot: {index:process.env.VERCEL_ENV === "production" || (!process.env.VERCEL && process.env.NODE_ENV === "production"), follow:true} },
};
export const viewport: Viewport = { width:"device-width", initialScale:1, themeColor:"#121214" };
export default function RootLayout({children}:{children:React.ReactNode}) {
  const structured = {"@context":"https://schema.org","@type":"Person",name:"Gaurav Nagalapuram Venkataramanan",alternateName:"Gaurav N.V.",url:SITE_URL,jobTitle:"Software Engineer",alumniOf:{"@type":"CollegeOrUniversity",name:"University of Southern California"},knowsAbout:["Backend Engineering","Full Stack Development","Data Engineering","Distributed Systems","Machine Learning"]};
  return <html lang="en"><body style={{padding:0,margin:0,background:"#121214",overflow:"hidden"}}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,"\\u003c")}} />{children}</body></html>;
}
