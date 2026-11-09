# SEO implementation and limits | 2026-11-08

**Configured:** branded site metadata, page title templates, keyword coverage, site description, authorship, canonical per index and detail route, per-route descriptions, `Person` JSON-LD, generated 1200×630 OpenGraph image, Twitter card, sitemap sourced from MDX slug files, preview `noindex`, robots restrictions on `/api/` and raw `/legacy.html`. Production origin defaults to `https://gauravnv.info` and can be overridden with `NEXT_PUBLIC_SITE_URL`.

**Critical limitation:** The actual body visible to users is inside a same-origin iframe. Many bots will not attribute iframe text, headings, images and links to the parent route as first-class content. Meta and sitemap alone cannot deliver excellent indexing. Do NOT claim 100% SEO until article/page content renders as semantic server HTML in Next.js.

**Next steps:** 1) migrate each page from iframe to actual React server markup preserving pixels, 2) add unique article/project JSON-LD and visible server content, 3) validate OG previews with deployed HTTPS domain and image crawler, 4) use Google Search Console / Bing Webmaster Tools, 5) check Lighthouse Core Web Vitals, 6) inspect canonical and duplicate raw legacy URLs, 7) consider replacing raw HTML route with server-only fallback or noindex header, 8) verify production environment and live stats outages.

**Preview caution:** non-production Vercel environment must return noindex and robots disallow. Local production builds without Vercel credentials can index by design; never deploy a staging URL with production NODE_ENV and no VERCEL_ENV without explicit index controls.
