# to_nextjs.md | Convert the single HTML portfolio into a Next.js app on Vercel

Version: 1.0 | 2026-11-08 | Status: **plan only. Nothing in this file is built yet.**

Place this file at `migration/to_nextjs.md` in the new repo. It works together with `context_router.md`, `design_norms/` and `rules/` (the same package as `Portfolio.zip`). Those stay in the repo so every future site update goes through the same routing and norms.

Items marked **(verify)** were not fully checked in the source and must be confirmed during the phase that touches them. Do not claim something works until it was run.

---

## 1. Goal and decisions

Goal: replace `Naga-Software-Engineer-refined.html` (one 5.5 MB hash-routed file) with a Next.js app where:
- every page is a real URL
- every project, post and paper is one content file (unique page = unique file)
- all data comes from one source and everything else is derived
- the norms and the router keep working, so updating the site stays cheap

Decisions already made:

| Topic | Decision | Why |
|---|---|---|
| Hosting | **Vercel**, GitHub repo, production branch `main` | preview URL for every branch or PR, good for testing updates |
| Framework | Next.js App Router, TypeScript. Pin the exact version in `package.json` at setup | |
| Rendering | Static generation for all content pages. Live stats refreshed with revalidation | content is files in git, no database needed |
| Content | MDX files with frontmatter in `content/` | unique detail pages, any component order |
| Styling | CSS variables for the theme + one CSS Module per component. **No Tailwind** | the legacy Tailwind is a tiny prebuilt subset, CSS Modules give the scoping the norms ask for |
| Fonts | `next/font` for Schibsted Grotesk, Source Sans 3, IBM Plex Mono | self-hosted, no layout shift |
| Create page and in-browser editor | **Dropped** | content is edited as files in git. Stays hidden in legacy |
| Simulations | Pasted HTML/JS simulations stay in a sandboxed iframe (no `allow-same-origin`). The bespoke 3D model lab becomes a client component | matches the existing security rule |
| Database / CMS | None for now | can be added later without changing the content shape |

Open (decide in Phase 0 and record in `docs/decisions.md`): package manager, MDX library (recommended: `next-mdx-remote` with RSC and `gray-matter`), syntax highlighter (shiki-based or Prism), domain name, analytics yes or no.

## 2. Target repo layout

The first five entries are the same package as the zip, kept at the repo root so all router paths still resolve.

```
portfolio/
  context_router.md          entry point for any LLM (updated to v2, see section 9)
  README.md
  design_norms/              global, sitemap, page norms, component norms, tag_vocabulary, audits, examples
  rules/                     extraction_page_rules.md, extraction_component_rules.md (+ nextjs rules, section 9)
  migration/                 to_nextjs.md (this file), data-map.md, parity-checklist.md, legacy-data/ (frozen JSON)
  changes/                   one change manifest per task (router section 6)
  source/                    legacy HTML + writing_norms.md, READ ONLY reference until parity is signed off
  content/
    projects/<id>.mdx
    blog/<slug>.mdx
    research/<slug>.mdx
    contributions/<slug>.mdx
    simulations/<id>/        pasted html/js for sandboxed simulations
    experience.json
    site.ts                  socials, skill groups, hero text, goal numbers
    tags.ts                  canonical tags + aliases (from design_norms/tag_vocabulary.md)
    _templates/              ready-to-paste MDX for every body component
  src/
    app/                     routes (section 5)
    components/<Name>/       one folder per component norm: index.tsx, types.ts, <Name>.module.css, fixtures
    lib/                     content.ts, schemas.ts, search.ts, graph.ts, routes.ts
    mdx-components.tsx       the allowlist of components usable inside MDX
    styles/tokens.css        both themes, all variables (global norms)
  scripts/                   extract-legacy-data, check-content, check-sitemap-sync, parity
  tests/                     parity screenshots, route smoke tests
  public/                    images, favicon, sim assets
  package.json  next.config.ts  tsconfig.json
```

## 3. Where each legacy thing goes

| Legacy (in the HTML) | New home | Note |
|---|---|---|
| `P` array (13 projects) | `content/projects/<id>.mdx` frontmatter + body | keys today: id, t, d, dl, st, tg, lv, g, repo, date |
| `POSTS` array (blog) | `content/blog/<slug>.mdx` | body is markdown today, becomes MDX |
| `ADDON_CONFIG.research` | `content/research/<slug>.mdx` | the hand-written research card HTML string is deleted, cards are rendered from this data |
| `ADDON_CONFIG.experience` | `content/experience.json` | |
| Contribution stories | `content/contributions/<slug>.mdx` | partly hard-coded in the Home HTML (verify) |
| `N`, `E` graph data | derived in `lib/graph.ts` from content links (`project` field on posts, `related` fields) | no hand-kept graph |
| `IX` search index | built at build time in `lib/search.ts` | |
| `SK` skills map | derived by inverting each project's stack | |
| `SOCIALS`, hero text | `content/site.ts` | |
| `window.SIM_TEMPLATES`, model lab | `content/simulations/`, `<Simulation>` component, model lab client component | |
| `window.INLINE_STATS` | `content/live-stats.snapshot.json` as fallback | live refresh via section 7 |
| Emoji map and name map inside `cards()` | fields `emoji` and `title` on each project | no lookups by id in code |
| `cards()` shared by Home and Projects | `ProjectCard` + two pages that call it | no shared mode flag |
| `renderPost()` | MDX pipeline | |
| `toc()` | derived from MDX headings (h2) | |
| `wrapTags()` observer ("More filters") | `useOverflowCollapse` hook inside `TagRow` and `TagFilter` | |
| theme variables + `data-theme` | `styles/tokens.css` + inline init script | no flash on load |
| base64 images embedded in CSS/HTML | files in `public/`, used via `next/image` | |
| Hash routes `#/blog/x` | `/blog/x` | legacy redirect, section 5 |

## 4. Content model (validated with zod in `lib/schemas.ts`)

Build fails if a file breaks its schema. Field names below are the new names. Unknown meanings are marked **(verify)**.

**Project**: `id` (slug, unique), `title`, `summary`, `details` (bullet markdown, becomes the default body), `stack[]`, `category` (one of the 8 current: ai, backend, full stack, machine learning, ml / data, mobile, real time, tools), `level` (featured | interactive demo | side project, verify wording), `github` (repo URL), `githubSlug` (legacy `g`, verify), `date`, `emoji`, `related[]`, optional `cardArt`. Body: optional MDX. If no MDX body, the page renders `details` with the standard layout.

**Post**: `slug`, `title`, `date`, `tags[]` (must be in `tags.ts`), `takeaways[]`, `summary`, `project` (project id, optional), `draft` (bool). Body: MDX.

**Research**: `slug`, `title`, `short`, `abstract`, `question`, `method`, `findings`, `url`, `bibtex`, `skills[]` (tags), plus split fields instead of the baked `status` string: `venue`, `year`, `award`, `citations`. Card art: `diagram` (id from the diagram component) and `diagramCaption`, instead of hard-coded SVG in a string.

**Experience**: `role`, `company`, `dates`, `description`, `points[]`, `skills[]`.

**Contribution**: `slug`, `title`, `repo`, `date`, `summary`, `tags[]`. Body: MDX.

**Rules enforced by `check-content`** (script in `scripts/`): unique slugs and ids, every tag in the vocabulary, required fields present, dates valid, `project` references exist, images exist and have alt text, MDX uses h2 for sections, MDX only uses allowed components, no em dashes in site copy.

## 5. Routes and pages

Page types come straight from `design_norms_sitemap.md`. The sitemap stays the only authority for which components a page may use. This table only adds where the code lives.

| Page type | Route | File | Params |
|---|---|---|---|
| home | `/` | `src/app/page.tsx` | |
| projects_index | `/projects` | `src/app/projects/page.tsx` | `?tag=` filter |
| project_detail | `/projects/[id]` | `src/app/projects/[id]/page.tsx` | `generateStaticParams` |
| blog_index | `/blog` | `src/app/blog/page.tsx` | `?tag=` |
| blog_detail | `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | `generateStaticParams` |
| research_index | `/research` | `src/app/research/page.tsx` | `?tag=` |
| research_detail | `/research/[slug]` | `src/app/research/[slug]/page.tsx` | |
| experience | `/experience` | `src/app/experience/page.tsx` | |
| simulations_index | `/playground` | `src/app/playground/page.tsx` | |
| contributions | `/contributions` | `src/app/contributions/page.tsx` | |
| contribution_detail | `/contributions/[slug]` | `src/app/contributions/[slug]/page.tsx` | |

Shared rules:
- `src/app/layout.tsx` holds the shell: left pane (search, theme toggle, nav, "In this page"), content, right pane slot. Under 1024px the left pane hides and the bottom nav shows (same as legacy).
- Right pane: each page passes its content to a `PageShell` component through an `aside` prop. Keep it simple, move to parallel routes only if needed.
- Unknown slug: `dynamicParams = false` plus `not-found.tsx` with a way back to the list.
- Per-page titles and social previews: `generateMetadata` on every page and detail page, with an Open Graph image. This replaces the legacy generic title.
- Filters live in the URL (`?tag=NLP`) so refresh, back and sharing work. Filter buttons are real links with `aria-pressed` or `aria-current`.
- `sitemap.ts` and `robots.ts` generated from content. Non-production deployments send `noindex`.
- Legacy hash links: a tiny client script in the root layout redirects `#/x/y` to `/x/y`, maps `#/playground` to `/playground`, and `#/about`, `#/coding`, `#/create` to `/`. Hash is never sent to the server, so this must be client-side.
- Fixed bottom nav and mobile layout must match the legacy behavior at widths under 1024px.

## 6. Components

One folder per file in `design_norms/design_norms_<component>.md` (18 norms today).

- `types.ts` is **Part A** (the contract) as TypeScript props. Optional fields and variants are the same ones the norm lists.
- `<Name>.module.css` is **Part B** (the look). Colors only from `tokens.css` variables. The diagram panel keeps its approved fixed colors.
- `fixtures.ts` has normal, empty and extreme data (the norm's edge cases).
- No component imports a page, reads the route, or touches global data. Links come in as `href`, events go up as callbacks (router section 4).
- `src/mdx-components.tsx` is the allowlist for MDX. For detail pages it must match the sitemap's allowed components for `project_detail` and `blog_detail`, and a sync check verifies that.

Server vs client:

| Client components (`"use client"`) | Server components (default) |
|---|---|
| ThemeToggle, SearchOverlay, TagFilter and TagRow overflow behavior, Simulation (iframe runner and model lab canvas), CodeTabs (live tab), copy buttons, reading progress ring, ResearchCard expand if it is not a plain `<details>` | text, heading, link, text highlight, code block (highlighted at build), formula (rendered at build), image, callout, quote, diagram (static SVG), cards, related posts, all pages |

Notes:
- Use `useId` for ids such as the expand panels so two copies never collide.
- Formulas: `remark-math` + `rehype-katex` at build time. Remember to load the KaTeX CSS and fonts.
- Code: highlight at build time. Languages used in the legacy: HTML, CSS, JavaScript, C, C++, Go, Python. Java was not bundled.
- Diagrams: static SVG components. If any content really uses Mermaid, load it lazily on that page only (verify, the legacy bundles it and a mermaid fence appears once in the file).
- Code tabs is a new component (design_norms `audit_to_build` item 1). JS/HTML tab is live and sandboxed. Other languages are display only with labeled captured output.
- Pasted simulations: iframe with `sandbox="allow-scripts"`, never `allow-same-origin`. Stop timers and animation frames on unmount.

## 7. Vercel setup and runtime

- Import the GitHub repo in Vercel. Framework preset is detected. Build command `next build`. Node version set in `package.json` `engines`.
- Branch workflow: work on a branch, open a PR, test on the **preview URL**, merge to `main` for production. Preview deployments are the place to run the parity and visual checks.
- Environment variables: none required for content. Optional: a GitHub token and any stats tokens, added in the Vercel dashboard, never committed.
- Live stats (GitHub, LeetCode, Codeforces): the legacy fetches in the browser and falls back to a snapshot (snapshot ends Oct 19, 2026). New approach: fetch on the server with revalidation (route handler or `fetch` with a revalidate time), keep `live-stats.snapshot.json` as the fallback when a request fails. Never block a page on a stats request.
- Images: `next/image`, files in `public/`. Add remote patterns only if remote images are really used.
- Headers: optional CSP and security headers in `next.config.ts`. Document in the global norms (security section) what they are.
- Domain: add in Vercel, then update `metadataBase`.
- Cutover: keep the legacy site live until the parity gate passes. Then point the domain at the new project. Keep `source/` for rollback.
- Check Vercel's current limits and plan details in their docs when it matters. Do not rely on numbers from memory.

## 8. Phases with exit criteria

Each phase is one or more change manifests in `changes/` (router section 6). Do not start the next phase until the exit criteria pass.

**Phase 0 | Repo and tooling**
- Create the repo, install, add this package (`context_router.md`, `design_norms/`, `rules/`, `migration/`, `source/`).
- Write `docs/decisions.md` for the open choices in section 1.
- Add scripts as empty stubs: `check-content`, `check-sitemap-sync`, `parity`.
- Exit: `next build` passes on an empty shell, first Vercel preview works.

**Phase 1 | Tokens and shell**
- `tokens.css` with both themes from `design_norms_global.md`, fonts via `next/font`, theme toggle with an init script (no flash), layout with left pane, right pane slot, mobile bottom nav, legacy hash redirect.
- Exit: shell renders in dark, light and phone width, theme persists, no console errors.

**Phase 2 | Extract the data (one time)**
- `scripts/extract-legacy-data` opens the legacy HTML in a headless browser and dumps the data objects to `migration/legacy-data/*.json` (frozen). `P`, `POSTS`, `ADDON_CONFIG`, `N`, `E`, `SK` and the others may be script-scoped constants, so read them with an in-page evaluate. If one is not reachable, fall back to parsing that script text (verify). `window.SIM_TEMPLATES` and `window.INLINE_STATS` are on `window`.
- A second script converts the JSON into `content/` files and applies tag canonicalization with a backup.
- Exit: `check-content` passes. Counts match the legacy (13 projects, the current posts, 3 research papers, experience entries). Nothing retyped by hand.

**Phase 3 | Leaf components**
- text, heading, link, tag_row, text_highlight, callout_note, quote, image, code_block, formula, diagram. Follow `rules/extraction_component_rules.md` to find the legacy CSS cascade for each, then rebuild it in the CSS Module from tokens.
- Exit: each component renders all fixtures in both themes and phone width, and passes its norm checklist.

**Phase 4 | Cards, filters, list pages**
- project_card, blog_card, research_card, tag_filter, related_posts, then `/projects`, `/blog`, `/research`, `/experience`, `/contributions`.
- Exit: filters work from the URL, "More filters" overflow works, the research "In this page" list updates with the filter (audit to_fix item 1 must be designed, not assumed).

**Phase 5 | Detail pages, simulations, code tabs**
- MDX pipeline, `mdx-components.tsx`, project, blog, research and contribution detail pages, `Simulation`, model lab client component, `CodeTabs`.
- Exit: the Kvrocks post and the model-lab project render with all body components, deep links and bad slugs work.

**Phase 6 | Home, search, page map, extras**
- Home (hero, featured work, graph, coding profiles, live stats), search overlay from the build-time index, page map from `lib/graph.ts`, `generateMetadata` and OG images, `sitemap.ts`, `robots.ts`.
- Exit: every route has a unique title and share preview.

**Phase 7 | Parity gate and cutover**
- `scripts/parity` takes screenshots of every legacy route and every new route (list pages plus sample detail pages) in dark, light and phone width, and compares them. Differences are triaged, not auto-failed (the plan allows intended changes, each recorded in `changes/`).
- Run the checklist in `migration/parity-checklist.md`: routes, direct reload, back and forward, nav active state, search, page map, keyboard use, reduced motion, console errors, performance check on the preview URL.
- Exit: all green or logged. Switch the domain. Keep `source/` and the old deployment until the new site has been stable.

## 9. Keeping the router and norms useful (this is how updates stay cheap)

**`context_router.md` v2 changes**
- Section 0 source gate: source is now the repo. `source/` is only the frozen legacy reference. The "no source supplied" warning is replaced by "inspect the repo".
- Architecture reality: now a modular Next.js app. Keep the rule "never claim a capability is implemented unless it is in the repo and was run".
- Replace "find the CSS cascade and registration points" steps with direct file paths (table below). The legacy extraction rules remain for migration phases only.
- Keep: precedence table, conflict protocol, change manifests, definitions of done, response contract, preserve invariants (dark default, both themes, Create dropped, no em dashes in site copy, no new heavy dependencies).

**Operation to edit location (new routing table)**

| Operation | Edit | Also |
|---|---|---|
| New blog post | `content/blog/<slug>.mdx` (copy from `_templates`) | run `check-content`. Card, index, search, graph, ToC, sitemap and metadata are derived |
| New project | `content/projects/<id>.mdx` | same. Optional body, otherwise the default layout renders `details` |
| New research paper | `content/research/<slug>.mdx` | add the diagram id if it needs a new card art |
| New contribution story | `content/contributions/<slug>.mdx` | |
| New simulation | `content/simulations/<id>/` + `<Simulation>` in MDX | norm: simulation |
| Component look | `src/components/<X>/<X>.module.css` | norm Part B, changelog, test every consumer from the sitemap inverse table |
| Component contract | `types.ts` + implementation + consumers | norm Part A, migration or adapter |
| New component | folder + norm + both sitemap tables + `mdx-components.tsx` if usable in MDX | |
| Page composition | `src/app/<route>/page.tsx` | page norm |
| New page type | route folder + page norm + sitemap + nav config | search, graph and metadata derive from content |
| Global palette or shell | `styles/tokens.css`, `layout.tsx` | global norm, test all routes in both themes |
| Delete page or component | remove files, then run `check-sitemap-sync` | router section 3.3 dependency transaction |

**Norm files**
- `design_norms_sitemap.md`: add two columns, "Next.js route file" and "Component folder". Membership still lives only here.
- Component norms: Part A links to `types.ts`, Part B links to the CSS Module, add an "Implementation path" line.
- `design_norms_global.md`: tokens file path, `next/font`, headers and CSP, performance budget (use the Vercel preview and Lighthouse).
- `tag_vocabulary.md`: becomes the source for `content/tags.ts`. Keep them in sync with a check.
- `component_examples.md`: becomes the source for `content/_templates/`.

**Scripts that enforce the norms**
- `check-content`: section 4 rules.
- `check-sitemap-sync`: every component folder has a norm and sitemap rows, every route has a page norm, both sitemap tables are symmetric, `mdx-components.tsx` matches the allowed list.
- `parity`: screenshots for dark, light and phone. Reused after migration as the visual regression check for any component or page change.
- Run these in CI on every PR so the Vercel preview only shows changes that passed.

**Audit files: what the migration resolves**

| Audit item | Status after migration |
|---|---|
| to_build 2 schema | answered: MDX + frontmatter + zod |
| to_build 3 templates | `content/_templates/` |
| to_build 4 titles and share previews | `generateMetadata` + OG images |
| to_build 5 visual QA | `scripts/parity` |
| to_build 6 tag canonicalization | `tags.ts` + extraction script + `check-content` |
| to_build 7 unified ToC | derived from visible headings, but filter-aware lists still need design |
| to_build 8 image validation | `next/image` + `check-content` |
| to_build 1 code tabs, 9 empty states | built in Phases 3 and 5 |
| to_fix 4 share previews, 5 tags | resolved as above |
| to_fix 1 research ToC after filter | must be designed in Phase 4 |
| to_fix 2, 3, 6, 7, 8 | still need decisions (color exceptions, card anatomy, code panel, focus state, typographic tokens). Do them while building the components |

Update `audit_*.md` as items close. Do not delete history, add a dated line.

## 10. Risks and traps

- **Theme flash**: set `data-theme` with an inline script before paint.
- **Hydration mismatches**: theme, stats and anything using `window` must be client-only or deferred.
- **Do not port the legacy CSS wholesale.** The cascade has early rules overridden by later ones. Rebuild from tokens and use parity screenshots to check the look.
- **Hand-written duplicate data** (research cards, emoji map, name map) must not survive. Search for them before deleting the legacy code.
- **KaTeX** CSS and fonts must be included or formulas look broken.
- **Canvas and WebGL** simulations: client only, no server rendering, clean up on unmount.
- **Old shared links** use hash URLs. Keep the redirect script until you no longer care about old links.
- **Rate limits** on stats APIs: revalidate rarely, keep the snapshot fallback.
- **Preview deployments** must not be indexed.
- **Bundle growth**: no new heavy dependency without a reason and a measurement.
- **Source of truth drift**: if content files, norms and sitemap disagree, the conflict protocol in the router applies. Log it in `audit_to_fix.md`.

## 11. Definition of done for the migration

- [ ] All 11 page types are live routes with unique titles and share previews
- [ ] Every project, post, paper and contribution is one content file, everything else is derived
- [ ] `check-content`, `check-sitemap-sync` and `parity` run in CI and pass
- [ ] Both themes and phone layout match the legacy or have logged intended differences
- [ ] Deep links, refresh, bad slugs, back and forward work
- [ ] Router v2, norms, sitemap columns and audits updated and consistent with the repo
- [ ] Domain switched, legacy kept for rollback, `changes/` has a manifest per phase

## 12. Prompt header for a new chat

> Use `context_router.md` as your entry point. We are executing `migration/to_nextjs.md`, currently in **Phase `<n>`**. Load only the norms and rules needed for that phase, inspect the real repo before changing code, make a change manifest, make the smallest safe change, run `check-content`, `check-sitemap-sync` and the parity checks that apply, and report anything unverified. Keep dark default, both themes, no em dashes in site copy, and do not invent data.

Attach: `to_nextjs.md`, `context_router.md`, the norms for the phase, and either the repo or the relevant files. For Phase 2 also attach the legacy HTML.

Changelog: 2026-11-08 | v1: first full migration spec.
