# Safe CRUD and feature lifecycle | Next.js compatibility stage

The user may ask to create, read, update or delete a **feature**, **component** or **page**. Do not equate a new `.tsx` file with a working UI. The currently displayed portfolio lives in `public/legacy.html`.

## Decision examples

- "Change ProjectCard padding": inspect `design_norms_project_card.md`, both consumers in sitemap, active `cards()` markup and CSS; modify scoped CSS and test Home/Projects; update Part B only.
- "Add project details": add `content/projects/slug.mdx` for valid Next deep link/metadata, **and** legacy `P` record and its detail body/render path. Update related card action and navigation. Verify page loads via direct URL and fresh reload.
- "Add page": create `src/app/<slug>/page.tsx` with real metadata, add legacy route/render branch until native conversion, update desktop/mobile navigation and both sitemap tables and page norm. Verify unknown route is 404.
- "Add widget": define props/types and empty/error states in the norm, register active legacy lifecycle with teardown, attach it only to intended pages, update inverse sitemap. Don't introduce a global singleton unless required.
- "Delete section": find all DOM IDs, references, event handlers and navigation anchors; remove feature data/render and listeners together, then clean norms and test every consumer.

## Transaction checklist

1. **Design**: feature contract, input/output, owner, state lifetime, effect cleanup, keyboard/accessibility, theme tokens.
2. **Data**: source and schema, no duplicate active records, unique IDs, validate URLs, alt text and markdown, explicit empty/error/loading states.
3. **Integration**: active renderer, route dispatch, desktop/mobile links, detail URL, TOC, search index, graph/related links, SEO metadata, sitemap, 404/redirect.
4. **Security**: no client secrets or cross-page private data; avoid unsafe `innerHTML`; any user HTML gets sanitized; untrusted code executes only inside sandboxed iframe without same-origin. All network requests must use pinned allowlisted endpoints with bounds.
5. **Lifecycle**: mount/unmount; listener/observer/timer/RAF cleanup; prevent duplicates after route changes, tab switches and React Strict Mode rerenders.
6. **Rollback**: keep original via git, use small commits and change manifest; never overwrite frozen legacy archive.
7. **Verification**: compile, route smoke, direct URL refresh, browser console, keyboard, mobile, dark/light, slow/no network, tab back/forward, SEO HTML, unauthorized proxy checks, screenshot comparison.

## Operation matrix

| Operation | Feature | Component | Page |
|---|---|---|---|
| CREATE | data + UI + interaction + teardown | props + styling + integration | route + navigation + metadata + content |
| READ | trace state + network effects | find all consumers + norm | trace route + visible renderer + SEO |
| UPDATE | preserve unrelated behavior | preserve API unless migration | preserve URLs or redirect |
| DELETE | remove all handlers + dependencies | remove all consuming imports/markup | remove nav/link/search/sitemap + 404/redirect |

## Coupling restrictions

Components receive content and callbacks as props, not page-specific imports or global DOM IDs. Pages own data fetching and per-route filters. New features in React should have a standalone folder `<Name>/index.tsx`, `types.ts`, `<Name>.module.css`, and fixtures only once actively migrated. Avoid adding unused folders as placeholders. Provider contexts should be explicitly limited to consumers and must not leak values across users or SSR requests.
