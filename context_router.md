# context_router.md | Portfolio change orchestration

Version: 1.0 | 2026-11-08 | Status: routing protocol, **not an implemented modular build system**

> **Entry point for any LLM working on this portfolio.** Read this file first. Identify the requested operation, load only the necessary norms and actual code, make the smallest safe change, validate impacted routes, and keep the dependency map synchronized. The standards describe *intended design*. The HTML, if supplied, determines *current behavior*. Never claim a capability is implemented merely because a norm describes it.

## 0. Start here: paths, facts, and missing inputs

Expected package layout:

```text
Portfolio/
  context_router.md                  <-- THIS FILE
  README.md
  design_norms/
    design_norms_index.md
    design_norms_global.md
    design_norms_sitemap.md          <-- canonical page <-> component relation
    design_norms_page_<type>.md
    design_norms_<component>.md
    tag_vocabulary.md
    audit_existing_site.md
    audit_to_fix.md
    audit_to_build.md
    component_examples.md
  rules/
    extraction_page_rules.md
    extraction_component_rules.md
  source/                           <-- expected for code changes, NOT present in this uploaded ZIP
    Naga-Software-Engineer-refined (1).html
    writing_norms.md
```

**Source availability gate:** The inspected `Portfolio.zip` contains the Markdown norms and extraction rules, but NO HTML source and NO `source/` directory. Do not invent HTML/JS/CSS, selectors, locations, functions, or an already-existing build pipeline. Documentation-only edits can proceed with the norms. To implement or verify actual UI, request the current full HTML or an equivalent source repository. If a task requires source and it is absent, produce a precise implementation plan / patch instructions and clearly say that code has not been changed. A README mention of an HTML path is not evidence the path exists.

**Architecture reality:** Current documented site is a single large hash-routed HTML file, not a file-per-component application. Standalone harnesses, component markers, module registries, tests and atomic builds below are **recommended future architecture or process**, not assertions that they exist today. Before edits, inspect the real current source and adapt the integration plan.

**Preserve invariants:** Dark theme is default; keep both themes; keep Create hidden; respect existing routes; no new heavy dependencies or site-wide CSS leakage; use global semantic color variables (except documented diagram artwork); preserve content and visible UI unless requested; no em dashes in generated site copy; do not invent external URLs, projects, data, or metrics.

## 1. Precedence and ownership

| Concern | Authoritative file | What it owns |
|---|---|---|
| Change selection, dependency traversal, edit lifecycle | `context_router.md` | **Which files to load and edit**, change sequencing, validation gates |
| Design tokens, site-wide invariants | `design_norms/design_norms_global.md` | Fonts, colors, layout, a11y, security, performance |
| Page <-> component membership | `design_norms/design_norms_sitemap.md` | **Only** source of page-to-component and component-to-page membership |
| Page composition | `design_norms/design_norms_page_<type>.md` | Required/optional content, order, page-level behavior |
| Component contract and look | `design_norms/design_norms_<name>.md` | Inputs, behavior, internal styles, variants, edge cases |
| Extraction/merge procedure | `rules/extraction_page_rules.md`, `rules/extraction_component_rules.md` | Locate markup, CSS, JS, handlers, registration points, round trips |
| Canonical tags | `design_norms/tag_vocabulary.md` | Filter/tag names and aliases |
| Observed behavior, gaps | `audit_existing_site.md`, `audit_to_fix.md`, `audit_to_build.md` | Evidence, mismatches, future work |
| Actual implementation | Supplied CURRENT HTML/repository | Current APIs, selectors, data shapes, routes, and registration functions |

**Conflict protocol:** Norm is target intent; source is implementation fact. Record disagreement in `audit_to_fix.md`; never silently rewrite norms to match implementation or claim the implementation already meets the norm. If source is newer than the audit, recheck and update the audit with evidence before relying on it. Do not duplicate component membership tables in page or component files. Links from page norms to permitted components are navigational, but the sitemap determines the list.

## 2. Task classification and minimal context loading

Start by interpreting the requested *target*, *action*, and *scope*. If the request is to change code, verify the current source is available. Read `design_norms_index.md` only for discovery; do not load all 40+ files by default.

| User request | Read, in order | Permitted edits | Impact to validate |
|---|---|---|---|
| Change a **component's look** (UI only) | router -> global -> sitemap inverse table -> component norm Part B -> component extraction rules -> source and all matched CSS | Component-scoped styles and norm Part B; audit fixes | Every consumer page/variant in sitemap |
| Change a **component's logic or fields** | Above + component Part A + relevant fixture/data definitions + affected page norms | Contract + implementation + migration/compatibility + impacted page adapters | All consumers, old inputs, edge cases, link behavior |
| Delete a component | Above + search for all dynamic/static references | Remove uses/registrations/styles/handlers; replace required slots or revise page composition; remove from sitemap | All former consumers, empty states, direct routes |
| Change a **page's look/composition** | router -> global -> sitemap row -> page norm -> page extraction rules -> only used component norms -> source | Page wrapper and composition only; avoid changing shared internals | Route and incoming links; affected shared consumers only if edited |
| Change a page's data/handlers | Above + data source and integration manifest | Page-specific logic/adapters; documented data migration | Route, filtering, title, TOC, nav, search, graph |
| Delete a page | Page rules + sitemap row + incoming-link search + source | Remove route registration, nav, data/search/map refs, inbound links; apply redirect or not-found plan | Every inbound link and fresh deep-link |
| Add new component to an existing page | Global + sitemap + target page norm + similar component norm + component extraction rules + source | New component contract/look/implementation; page assembly; sitemap both directions | Target page + any shared mounting/registration points |
| Add new page type / route | Global + sitemap + closest page norm + page extraction rules + relevant component norms + source | New page norm, page data/view, route/nav/search/map/side/TOC integrations, sitemap | Fresh URL, nav, backlinks, direct reload, back/forward |
| Create blog/project detail content | Blog/project page norm + relevant card norm + link norm + body component norms + source | New content entry and unique slug/id, card action/link, detail renderer registration | Index -> detail -> index, direct reload, bad slug |
| Link button/card to a page | Target page norm + link norm + source router + source of card/button | Real link or route action; no phantom destination | Click, keyboard, direct paste URL, back/forward |
| Global palette/shell change | Global + sitemap + all page types touching shell + source | Explicitly approved global tokens/layout/nav | All top-level routes, both themes, mobile |
| Documentation only | Router + affected norms + sitemap, with audits as needed | Markdown only | Cross-link consistency; do not report code changes |

For any component changed on multiple pages: the sitemap's **Component -> pages** table is the impact set. For any page edit: the **Page -> components** table is the assembly/permissions set. If those two tables disagree, reconcile them *in the sitemap* in the same change before proceeding. Keep membership strictly symmetric.

## 3. The five operations, routed precisely

### 3.1 Add or update component UI

1. Find the component's exact identifier in the sitemap; check aliases and legacy CSS classes in its norm and source. If new, first decide whether it is a variant of an existing component (prefer variant) or truly independent.
2. Read its **Part A contract** and **Part B look**, then find all existing markup/templates, CSS cascade occurrences, handlers, helpers, initialization and destruction logic. Follow `extraction_component_rules.md`; do not rely on a single regex match or line number.
3. Maintain a standalone contract: `render(props, context)` or equivalent, clear required/optional props, explicit outputs/events and semantic variants. The actual single-file implementation may use existing functions instead of this proposed signature; document the adapter rather than faking a new framework.
4. When the change is only visual, keep Part A stable. Scope styles under a unique component wrapper/prefix, reuse theme variables, keep keyboard behavior, and test all existing variants, including empty/extreme fixtures.
5. On breaking contract change, version data fields, map old -> new, provide a compatibility adapter or migrate all consumers, and keep backwards compatibility until migration is complete. Never delete a field still consumed by another page.
6. Update Part B (and Part A only if actually changed), changelog, and sitemap if membership changes. Test every consumer listed in the inverse table.

### 3.2 Add or update an independent page

1. Find the page type, route and page norm from the sitemap. Identify whether it is an original shared-section page or an addon page in the actual source, as described in `extraction_page_rules.md`.
2. Use a page wrapper scoped by a unique id/class. A page **composes** components, while components never import a page or assume its route, nav, title or parent data store.
3. Keep page-specific layout, data fetching/lookup, selected filters, header, related items and right-pane configuration in the page (or a page adapter), not inside a reusable card component.
4. Inventory all 15 page integration points from `extraction_page_rules.md`: nav, icon/mobile nav, route dispatch, detail allowlists, header, side pane, TOC, search, page map, data source, filters, CSS, lifecycle, hidden pages, direct-open.
5. Preserve direct-link reload, back/forward, bad slug fallback, content rendering, keyboard controls and responsive layout. Update page norm changelog, sitemap if composition changes, and audit if needed.

### 3.3 Delete page or component safely

Deletion is a **dependency transaction**, not simply removing the DOM node. Search all route strings, IDs, data records, nav arrays, search indexes, page-map edges, action targets, CSS selectors, global handlers and tests. Prefer an explicit replacement for a deleted required component; if no replacement exists, modify the page contract deliberately. For removed pages, decide and document whether old URLs redirect to a valid route or show a real not-found view. Do not leave broken card buttons. Remove obsolete CSS/JS and event listeners only after all dependents are migrated. Verify no orphan entries remain in either sitemap table.

### 3.4 Create new component and attach to page

**Example: new `experiment_card` inside the projects index.**

1. Create `design_norms/design_norms_experiment_card.md` using the Part A / Part B / changelog structure of existing card norms. Define a stable ID, required title and link destination, optional excerpt/tags/art, variants and missing-data behavior.
2. Define markup + CSS + JS in a scoped implementation (or extracted standalone harness first); use no page-specific names in component CSS or props. Link target comes in through `href` or an explicit `onOpen` callback supplied by the parent, not an internal hard-coded `#/projects/...`.
3. Add `experiment_card` to **both directions** of the sitemap membership mapping for `projects_index`. The page norm continues to describe only composition; its allowed component links may point to that file, but do not maintain a second authoritative list there.
4. Integrate the new card into the page using its documented props; make the action actually lead somewhere or disable/omit it until a destination exists.
5. Test the card independently (normal, empty, extreme data; theme/mobile), then test the projects page, click navigation, fresh detail-link reload and unaffected project cards.

### 3.5 Create new blog/project detail page and link from card/button

**Example:** add a blog post with slug `storage-notes` or project with id `durable-db`.

1. Reuse existing page types `blog_detail` (`#/blog/<slug>`) and `project_detail` (`#/projects/<id>`) unless a fundamentally different detail layout is necessary. A new article is **a new content record**, not automatically a new page implementation.
2. Validate and reserve unique lowercase slug/id; store content in the actual source's canonical collection. Current audits reference `POSTS` for blog and `P` for projects; confirm current source rather than guessing data fields.
3. Render detail through the established detail route; create the matching card from the same canonical record where possible. The card receives target `href: '#/blog/storage-notes'` or `href: '#/projects/durable-db'` as data; it does not own the detail page.
4. For a button, use a real `a href="#/blog/storage-notes"` (or the app's verified navigation API) so keyboard, direct open and back/forward work. Don't register a click handler that depends on a missing DOM ID or undocumented global.
5. Check route matching AND all detail allowlists, the collection lookup, page title, right pane, headings/TOC, search, graph and existing previous/next or related navigation. If the user asks for a **new page type**, add its own page norm and full 15-point integration manifest instead of misusing a one-off slug.
6. Test list card -> detail -> back; direct pasted URL; refresh; unknown slug; both themes; phone; no console errors. Confirm the link is bidirectional where appropriate (back-to-list or index navigation).

## 4. Loose-coupling contract

**Dependency direction** (recommended, to be enforced during extraction or refactor):

```text
Global shell / router / canonical data registry
          |             |                 |
          v             v                 v
      Page adapters -> page assembly -> component public contracts
                                             |
                                             v
                                     component internals
```

- Components must **not** import/call page functions or route dispatch, inspect global `location.hash` for their own business logic, mutate global data arrays, insert nav/search/page-map registrations, or select unrelated page DOM nodes.
- A page may provide data and an `href`, or pass a callback for actions. Events go **up** to the page; inputs flow **down** to the component. Shared presentation components are stateless where possible; local interactive state must remain local and be disposed on unmount.
- Canonical content IDs and slugs are stable; generate links through a single small `routeFor(type, id)` adapter once implemented, or use verified existing URL patterns until then. The sitemap is a *documentation dependency registry*, not a runtime router.
- Avoid implicit global listeners/observers. If legacy code requires them, list them in the extraction manifest and ensure registration occurs once and cleanup is paired with initialization. Namespace unique DOM IDs to prevent duplicates when multiple cards or simulations mount.
- Prefer dependency injection (helpers, flags, callbacks, data) over `window.*` lookups. Do not refactor a stable legacy global API incidentally while changing one card. Add adapters and migrate incrementally.
- No cross-component CSS selectors unless a documented shared token/utility owns that rule. Page CSS may style its layout slots, not inner component details.
- A component supports an empty state without throwing and has safe handling for missing optional fields, long text, wide code/math, no image, duplicate tags and unsupported actions.
- If a shared component changes, every listed consumer must be smoke-tested. Do not fork copies across pages to get a local UI tweak; add a documented variant if behavior is genuinely different.

## 5. Scalable and crash-resistant update procedure

**Goal: make changes safe and recoverable. No Markdown rule guarantees that a runtime will never crash. Actual fault isolation, test automation and performance must be implemented and verified in source.**

**Phase A | Preflight:**
- Inventory package and current source. Report missing files, current route map, affected component/page and all incoming/outgoing dependencies.
- Capture baseline source checksum or backup, and screenshots/behavior for affected routes in dark, light and phone widths. Record existing console errors separately from new ones.
- Construct a small **change manifest** (template below). Identify shared code paths (`cards()` on Home/Projects, `renderPost()` on blog/project detail, `toc()`, and global filter observers) before editing.

**Phase B | Isolated edit:**
- For code in the legacy monolith, follow extraction rule first: capture complete CSS cascade + JS + helpers + data; build a standalone harness; perform an **unchanged round-trip extraction/merge** before a behavioral refactor if extraction is needed.
- Change one component/page at a time behind explicit markers or carefully located, verified functions. Do not assume markers already exist. Make a minimal diff, do not reformat/rebundle an unrelated 5+ MB document, and avoid broad regex replacements.
- Reject or safely sanitize untrusted Markdown/HTML; retain existing DOMPurify/simulation iframe sandbox constraints, including no `allow-same-origin`. Mount expensive canvases and simulations only when needed; stop frames/timers/observers on navigation and unmount. Keep a stable fallback or error state if initialization fails.

**Phase C | Transactional integration:**
- Register components and route/data bindings only after they are ready. Migrate referencing pages without dangling links. Keep old contract until every consumer is compatible.
- Run static checks for duplicate IDs, missing selectors, missing slugs, orphan links, invalid hash routes, use of nonexistent Tailwind utilities, unexpected hard-coded theme colors and unknown tags. Distinguish proposed checks from actually run checks.
- Rebuild/update sitemap both directions, page/component changelogs, and audit lists. Only declare a change complete when docs and implementation agree or deviations are logged.

**Phase D | Regression / rollback:**
- Test baseline impacted routes plus Home, Projects, Blog, Research and Simulations when global router, CSS, markdown renderer, filters or shell changed. Verify dark/light, desktop/mobile, direct deep link reload, back/forward, nav active state, search, page map, ToC, filter state, keyboard, and console errors.
- For simulations test preview/run/stop/reset and unmount cleanup; avoid runaway loops and unbounded DOM/observer accumulation. For collections test zero, one, many and extreme-length items.
- If regression fails, revert the isolated patch from backup, capture failure and update manifest; do **not** keep partially registered routes or delete the previous version prematurely.
- If tests couldn't be run (no browser, source missing), say *not verified* and provide explicit steps. Never report "no crashes" or successful test results without evidence.

**Performance/scale guardrails:** defer offscreen images/heavy content; avoid loading all simulations at once; cleanup timers, observers and animation frames; do not repeatedly attach global handlers on each hash change; use event delegation or keyed attach-once patterns; avoid rebuilding entire archives for a single card update when a scoped change is possible. Profile memory and responsiveness after increasing content size. Existing single-file size and JS bundle limitations require measured decisions, not magic thresholds.

## 6. Required change manifest (make one per task)

For each independent change, create or describe `changes/<YYYY-MM-DD>-<task-slug>.md` (the directory is **proposed**, not present by default):

```markdown
# Change: <task>
- Operation: add | update | delete | link | refactor
- Target: page:<type/route> | component:<id>
- Goal and non-goals:
- Code source present: yes/no, path and version:
- Files read (norms, source):
- Dependency impact (from both sitemap directions):
- Actual code touchpoints (symbol names/selectors, not brittle line numbers):
- Inbound links / outbound links / data records / unique slugs:
- Contract change: none | additive | breaking; migration plan:
- Missing integration points / baseline issues:
- Implementation diff/files edited:
- Tests run and outcomes (or explicitly NOT RUN):
- Rollback instructions:
- Norm/sitemap/audit updates:
- Open risks:
```

Keep this small for minor UI-only changes. For page route creation, attach all 15 integration answers; for component extraction, attach the component manifest prescribed in `extraction_component_rules.md`.

## 7. Definition of done by operation

| Operation | Must be true to mark done |
|---|---|
| Component update | Contract unchanged or migrated; style scoped; every sitemap consumer tested; norm/changelog updated |
| Page update | Only intended page changes; 15 relevant page integrations inspected; links, TOC, nav and direct route work |
| New component + page attachment | Component norm created; sitemap both directions updated; actual page renders it; action works; test fixtures pass |
| New page/detail | Unique route/id; actual router+data+content+incoming link registered; direct URL + refresh work; not-found works |
| Delete | No inbound dead links, orphan data/CSS/handlers, stale nav/search/graph entries or sitemap references |
| Docs-only | Correct cross-links and ownership, no false claims of implementation or QA |

A successful documentation update **does not** equal successful UI deployment. If an implementation cannot be completed, deliver documentation and implementation checklist with explicit status.

## 8. Response contract for any future LLM

Return concise results in this order: **(1) scope**, **(2) files read**, **(3) files changed**, **(4) linked routes/components**, **(5) tests performed/results**, **(6) unresolved gaps**. Be exact about what was done; don't claim browser testing, page support or source modifications not performed. When delivering code, include a runnable edited artifact or precise diff and backup plan. Never overwrite the original solely to satisfy documentation.

## 9. Reusable prompt for a new chat

> Use `context_router.md` as your entry point and change coordinator. My task: `<describe task>`. Classify page/component add/update/delete/link; load the minimum relevant global, sitemap, page/component norms and extraction rules; inspect the actual current source before code edits; create a dependency impact manifest; make a minimal isolated change; update both sitemap directions and affected changelogs; test impacted routes and themes; report anything unverified. Keep Create hidden and do not rewrite unrelated components.

---

Changelog: 2026-11-08 | v1: added task routing, source presence gate, ownership and dependency rules, independent page/component workflows, link creation, deletion safety, scalability gates, change manifests and definitions of done.
