# Global design norms | v1

Status: intended rules backed by the uploaded source. Current mismatches are tracked in `audit_to_fix.md`, not hidden. Norms are prescriptive for new work, while the audit describes current behavior.

## Typography and palette
- Body: Source Sans 3, 17px, line-height 1.75, system sans fallback. Headings (`h1` to `h3`, `.hd`): Schibsted Grotesk 700, letter spacing `-0.02em`. Labels, chips, code: IBM Plex Mono; `.mono` defaults to `.8rem`.
- Dark (default `:root`): `--bg #121214`, `--lg #2a2a2e` border, `--gr #80808a` muted, `--dg #cfcfd4` body, `--dk #f2f2f3` strong, `--sec #8fb0c8` links, `--ter #e8a87c` emphasis, `--hl rgba(143,176,200,.12)` highlight.
- Light (`:root[data-theme=light]`): `--bg #f4f1ea`, `--lg #dcd8cc`, `--gr #7a7a80`, `--dg #3d3d44`, `--dk #15151a`, `--sec #2b4c7e`, `--ter #c8553d`, `--hl rgba(43,76,126,.08)`.
- Theme variables are the ONLY default source of component colors. To add one, define semantic variable in both themes here before styling a component. Fixed cream grid for diagram artwork is the sole deliberate palette exception: paper `#fffefb`, grid `#ece8dc` / 24px, ink blue `#2b4c7e`, orange `#c8553d`.
- Existing `.m`: underlined blue gradient marker. Existing `.k`: orange emphasis. Article `==text==` becomes `.m`; `!!text!!` becomes `.caution`.

## Layout and shared patterns
- Desktop: left nav and in-page headings, main reading column, contextual right pane. At under 1024px original left pane hides and bottom navigation appears; account for narrower detail panes, diagrams, and controls.
- Respect existing `.line` (1px `--lg`, radius 8px), `.chip` (pill border), `.chip.on` (highlight + blue border), `.sec` (6rem top separation) unless the component explicitly uses tighter archive spacing.
- Retain restrained hover: note/research cards lift 2px and use `--sec` border; no decorative animations without purpose. Follow `prefers-reduced-motion: reduce`.
- `↗` signifies outgoing/deeper action as in current site. For article prose, no em dashes. Use `|` where a separator is needed; speak like an engineering student, short and concrete.
- Keep Create page hidden and route redirected to Home. Never casually surface it through nav or template.

## Content and metadata conventions (new standards, not all enforced in current code)
- Route/content slug: lowercase ASCII `a-z`, digits, single hyphens, unique per type; existing editor uses `[a-z0-9][a-z0-9-]*`. Use `#/blog/<slug>`, `#/projects/<id>`, `#/research/<slug>`.
- CSS scope: component prefix (`dn-<component>` for new code); existing names (`note-card`, `research-card`, `.prose`, `.naga-simulation`) must be preserved until migrated.
- Dates: source blog rows use literal `post.date`; new articles standardize to `YYYY-MM-DD` source format and display consistently after migration, never silently rewrite old dates. Reading time for blog currently `max(1,ceil(body whitespace words/220))` minutes. Keep this formula unless deliberately versioned.
- Tags: master vocabulary maintained in `tag_vocabulary.md`; display `C++`, `Python`, `JavaScript`, `SQL`, `Linux`, `NLP`, `GPT`, `BERT`, `RocksDB`, etc. Normalize casing/aliases before filtering, do not create duplicate filters for spelling variants.
- HTML page titles: current router sets Home `Naga | Software Engineer` and internal pages `<Page> | Naga`; detail-specific titles and Open Graph previews are **not implemented globally** and belong to `audit_to_build.md`. Hash routing has SEO/share-preview limitations.

## Accessibility
- Focus visible on links/buttons, keyboard operation and clear labels. Decorative SVG has `aria-hidden=true`; meaningful media has explanatory alt/caption. All icon buttons get `aria-label`. Any selected filter exposes state beyond color and consider `aria-pressed`.
- Respect both themes' text contrast, including small labels. Ensure wide math, code, diagrams and chip rows scroll or wrap on phones.
- Keep heading hierarchy and derive "In this page" from visible `h2` headings. Hide filtered headings or rebuild toc to avoid stale links.

## Performance and safety
- Baseline source HTML is ~5.3 MB. Proposed budget, not a measured current guarantee: avoid extra libraries by default; target raster art <= 250 KB each, hero <= 500 KB, defer offscreen images and expensive simulations, and avoid continuous animation when hidden. Measure before enforcing hard budgets.
- Markdown: sanitize `marked.parse()` output with DOMPurify; current `FORBID_TAGS`: style, iframe, form and `FORBID_ATTR`: style. Treat untrusted content and generated HTML as unsafe unless reviewed, with no privileged access; this sanitizer alone does not protect custom script execution.
- Pasted simulation code: current `iframe sandbox=allow-scripts`, CSP with `connect-src 'none'`, and optional allowlisted CDN D3/p5. This isolates frame origin/storage but not CPU resource abuse. Never add `allow-same-origin`; never assume arbitrary code is harmless.
- No live Python/C++ in browser. JS/HTML runs only in the existing sandbox. Captured output must be labeled as such.

## Shipping checklist
- Both themes; desktop 3-column; 1024px transition; phone width; keyboard + reduced-motion; alt labels + focus; test long title, 15 tags, empty list and wide formula; verify image and sim behavior; inspect browser console; check only theme variables used outside permitted diagram palette; verify routes, toc, links, and note/project/research cards.
- Mismatch policy: this norm expresses the desired direction; code is evidence of current behavior. Record differences in `audit_to_fix.md` before changing either.

Changelog: 2026-11-08 | Created initial rules from provided handoff and source review.


---
**Next.js v2.1 implementation note (2026-11-08):** This norm defines design/behavioral intent. Its visible implementation currently remains in `public/legacy.html` (legacy hash router) presented through `src/components/LegacyPortfolio/index.tsx`; there is **no active matching native React leaf component**. When modifying this feature, consult `context_router.md` and `rules/nextjs_crud.md`, update the active HTML handlers/styles first, and validate all consumers listed in the sitemap. Any future isolated React component must preserve the same contract, responsive behavior and dark/light visuals before replacing the legacy fragment.

Security/SEO v2.1: `src/app/api/profile/route.ts` is HTTPS allowlist-only (no free proxy); `LegacyPortfolio` communicates using validated same-origin postMessage; untrusted pasted simulations stay isolated without allow-same-origin; no secrets in public content; Next.js metadata, sitemap, robots and OpenGraph are generated from `src/lib/seo.ts` and content. Search engines cannot fully index an iframe body as first-class SSR page content; migrate pages to semantic React server output to complete SEO.
