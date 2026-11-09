export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://gauravnv.info").replace(/\/$/, "");
export const SITE_NAME = "Gaurav N.V.";
export const SITE_DESCRIPTION = "MS Applied Data Science at USC. Software engineer focused on full stack and backend systems, performant frontends, data pipelines and ML-integrated applications using Go, Python, TypeScript and React.";
export function pageMetadata(title:string, description:string, pathname:string) {
  return { title, description, alternates:{canonical:pathname}, openGraph:{title,description,url:pathname,images:["/opengraph-image"]}, twitter:{title,description,images:["/opengraph-image"]} };
}
