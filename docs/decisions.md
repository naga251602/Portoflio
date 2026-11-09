# Architecture decisions | 2026-11-08

- **Active architecture:** Next.js 15 App Router shell + trusted same-origin iframe rendering the original single HTML. Intentionally NOT a completed native React migration.
- **UI fidelity first:** preserve legacy rendering until visual regression and interaction tests pass for every replacement component.
- **Content:** local MDX files are staged slug/metadata source and future server rendering content; visible legacy arrays still drive the site. All content CRUD must maintain both until cutover.
- **Styling:** original legacy CSS active; CSS Modules required for newly migrated React components. No Tailwind added.
- **External stats:** server HTTPS allowlist proxy with 15-minute revalidation and browser snapshots if upstream unavailable.
- **SEO:** canonical site origin `https://gauravnv.info`; route metadata and OG, with explicit iframe indexing limitation.
- **Package manager:** npm; pin dependency versions. Domain override via `NEXT_PUBLIC_SITE_URL`.
- **Analytics:** absent; no tracker added.
- **Security headers:** SAMEORIGIN needed for compatibility iframe, CSP partially hardened. Full strict CSP after porting inline scripts.
