# extraction_page_rules.md

Rules for pulling ONE page out of the big site file, working on it alone, and putting it back safely.

Status: draft. Written from reading `Naga-Software-Engineer-refined.html`. Items marked (verify) were not fully checked yet.

Use with: `writing_norms.md`, `extraction_component_rules.md` (a page is made of components), and the page's own `design_norms_page_<name>.md`.

---

## 1. What counts as a page

A page is a route plus everything the shell needs to show it. It is more than one function. If I miss one integration point, the page works in my harness and breaks (or vanishes) in the real site.

A page = 
1. **A route** (for example `#/research`, and a detail route like `#/research/<slug>`)
2. **A page function** that renders the content
3. **Its components** (each one follows `extraction_component_rules.md`)
4. **Its data source**
5. **Its shell integrations** (nav, right pane, "In this page", search, page map, title)
6. **Its page-level CSS and handlers**

## 2. Two kinds of pages in this site

They are extracted differently.

- **Original section pages** (Home, and the Projects list): real sections of the first page, with fixed ids (like `#cards`, `#flt`) and a shared render function (`cards()` with a mode flag for home vs projects). The router shows or hides these sections.
- **Addon pages** (Research, Experience, Blog, Simulations, Contributions and the detail pages): rendered by a page function into one container (`extension`) with `head(...)`, the content, and `side(...)` for the right pane.

For an addon page, extraction is mostly the page function plus its data. For an original section page, extraction must also take the section's static HTML and the shared function it shares with another page (Home and Projects both use `cards()`), so changing one can break the other.

## 3. Integration points to check (the full list)

Write each answer in the manifest. Use function and selector names, not line numbers.

1. **Nav entry**: the `pages` list that builds the left nav (key plus label). Note the key can differ from the label (Simulations uses the key `playground`).
2. **Icon**: the icon map used for the compact nav, and the mobile bottom nav entry.
3. **Route dispatch**: the place that says "if page is X, call the page function with the slug".
4. **Detail route allowlist**: a pattern that decides which `#/page/slug` routes are valid. It appears in more than one place. A new detail route must be added to all of them (verify the exact places).
5. **Title and subtitle**: how `head(title, text)` is called.
6. **Right pane**: the content passed to `side(...)`. Every non-home page needs one.
7. **"In this page" list**: built from the h2 headings in the page. Pages must use h2 for sections. Known gap: it does not react to filters.
8. **Search index**: entries pushed into the search list so the page and its items can be found.
9. **Page map graph**: nodes and links (blog posts, research papers, projects) that show up in "Explore the page map".
10. **Data source**: `ADDON_CONFIG.<key>`, the `P` or `POSTS` arrays, or a constant string.
11. **Filters**: any filter bar and whether its id is in the "More filters" registration list.
12. **Page CSS**: scoped under a page wrapper id.
13. **Handlers and observers**: anything attached after render, and the global MutationObserver behavior.
14. **Hidden pages**: the Create page stays hidden everywhere. A new page must not expose it.
15. **Direct open**: the page must also work when someone opens its URL fresh. The site has extra code for this on some routes (the model lab), so check if the page needs the same.

## 4. Before extracting

1. Read `design_norms_page_<name>.md`. If missing, write a rough one: allowed components, required parts, order rules.
2. Take baseline screenshots of the page (list and detail views) in dark, light and phone width.
3. List the components on the page and decide which ones are being changed too. Extract those first or in the same pass, following the component rules.
4. Note what links TO this page (nav, other cards, graph nodes, home hero buttons) so no link breaks.

## 5. The page harness

A small HTML shell to work on the page alone.

Must have:
- the color variables for both themes, the fonts, base styles, and a theme toggle
- a stub of the three-column layout: left pane (nav and "In this page" placeholder), content area, right pane
- a tiny hash router that calls the page function with the slug, plus back and forward support
- the helpers (`head`, `side`, `esc`, `chip`, `q`) copied or stubbed
- the data as a fixture file, with: a normal set, an empty set, an extreme set
- viewport buttons (desktop, phone) and the bottom nav at phone width

Same rule as components: libraries from a CDN only in the harness. The merged page uses what the site already bundles.

## 6. What an extraction produces

```
extracted/page-<name>/
  page.js              page function(s) for the list view and the detail view
  page.css             page-level CSS only (components keep their own CSS)
  data.fixture.json    sample data
  harness.html         shell stub plus router
  manifest.md          the record (below)
```

`manifest.md` records:
- route(s) and the nav key
- the 15 integration points above, each with: where it lives (function or selector name), what to change on merge
- the components used (links to their manifests)
- what links to this page from other places
- baseline screenshots

## 7. Rules while working on it

- Only use components allowed by the page norm. Need a new one? Make it a component first.
- Use h2 for section headings so "In this page" keeps working.
- The right pane always has content that helps on this page.
- Handle empty results and a bad slug (the site shows "not found" with a way back to the list).
- Page-level CSS uses a page wrapper id. No component styles in the page CSS.
- Colors from variables only.

## 8. Putting it back (merge)

1. Add or replace the page function between markers: `/* @page:<name> start */` and `/* @page:<name> end */`.
2. Go through the 15 integration points one by one and update each. This is where most breakage happens, so tick them off in the manifest.
3. Merge the components first (own markers), then the page.
4. Diff the file. Changes should only be inside page markers, component markers, and the integration points.
5. Test:
   - the list view and a detail view, dark, light, phone width
   - direct open: reload while on the page's route, for the list and the detail
   - browser back and forward between this page and others
   - nav highlight, bottom nav on phone, search finds the page and its items, page map still opens
   - no console errors
6. Update the page norm, the sitemap (page to components, component to pages) and the changelog.

## 9. Round trip test

Same as components: extract, merge back untouched, and the site must match the baseline. If it does not, an integration point was missed. Fix the manifest before the real change.

## 10. Don'ts

- Do not change the shell (nav, panes, router) while extracting a page. That is a global change.
- Do not edit shared functions that other pages use (like the shared projects function) without testing every page that uses them.
- Do not forget the second detail route allowlist, the search index or the page map.
- Do not expose the Create page.
- Do not rely on line numbers.

## 11. Checklist

- [ ] page norm read or drafted
- [ ] baseline screenshots (list and detail, dark, light, phone)
- [ ] original section page or addon page decided
- [ ] all 15 integration points answered in the manifest
- [ ] components on the page extracted or listed
- [ ] harness works with normal, empty and extreme data
- [ ] round trip test passed
- [ ] merge diff limited to markers and integration points
- [ ] list view, detail view, direct open, back and forward, search, page map tested
- [ ] norms, sitemap and changelog updated

## 12. Prompt header for a new chat

> I am working on the page `<name>`. Follow `extraction_page_rules.md` and `design_norms_page_<name>.md`. First produce the manifest with all 15 integration points (do not change anything yet), then the harness. Do not touch the shell. Flag any conflict with the norms.

Attach: this file, `extraction_component_rules.md`, the page norm, the norms for components on the page, the sitemap, and the site HTML (or the extracted folder).
