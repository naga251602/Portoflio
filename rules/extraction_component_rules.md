# extraction_component_rules.md

Rules for pulling ONE component out of the big site file, working on it alone, and putting it back safely.

Status: draft. Written from reading `Naga-Software-Engineer-refined.html`. Items marked (verify) were not fully checked yet.

Use with: `writing_norms.md` (the plan) and the component's own `design_norms_<component>.md` once it exists.

---

## 1. What counts as a component

A component is five things together. If I forget one, the extracted version breaks or the merge breaks the site.

1. **Markup**: usually a template string inside JS (with escaped quotes), sometimes static HTML
2. **CSS**: every selector for it, across ALL style blocks (see section 3)
3. **JS behavior**: the render function, click handlers, filters, expand and collapse
4. **Data**: the array, config key or fields it reads
5. **Dependencies**: helper functions, libraries, ids, global observers

## 2. Before extracting

1. Open the component's norm file. If there is none, write a rough one first (purpose, fields, class prefix).
2. Open the sitemap's "component to pages" table. Write down every page the component appears on. These are the pages to test after merging.
3. Decide what the change is: new look only (Part B), or data change too (Part A). Data changes need the old-to-new field note from `writing_norms.md` section 6.
4. Take "before" screenshots of every page on that list in dark, light and phone width. These are the baseline.

## 3. How to find every piece

Do not trust one search. The file has several style blocks and later ones override earlier ones.

**CSS**
- Search the class name and the wrapper id in the whole file, not just the first block.
- Check all of these places: the main style block, the later override blocks (some use `!important`), media queries (`max-width: 1023px`, `600px`, `680px`), `[data-theme="light"]` rules, hover and reduced-motion rules.
- Write down the ORDER the rules appear in. Cascade order matters. Example from the research cards: an old `.research-card` rule exists early in the file, and a scoped `#naga-research-archive .research-card` rule near the end wins. If I only copy one of them, the look is wrong.
- Parent-scoped rules: many addon styles only work under a parent like `.addon`. Copy the parent requirement too.

**Utility classes**
- The site uses a pre-built Tailwind bundle that only contains the utility classes already used. A new component cannot use a utility class that is not in that bundle (it silently does nothing). Check before relying on one, or write real CSS instead.

**JS**
- The render function (names like `row`, `researchPage`, `cards`) and anything it calls.
- Event handlers set after rendering (`onclick`, `oninput`).
- Global side effects: the MutationObserver that runs `wrapTags` (adds "[+] More filters"), highlight calls, formula rendering.
- Registration lists: for example the list of filter ids that get the "More filters" label (`flt`, `blog-tags`, `research-tags`). A new filter bar must be added there.

**Data**
- Where the fields come from: the `P` projects array, the `POSTS` array, `ADDON_CONFIG.research` and `ADDON_CONFIG.experience`, or a string constant.

**Helpers**
- Small shared functions the component calls: `esc`, `chip`, `q`, `head`, `side`, `copyText`. List which ones it uses.

**Assets and libraries**
- Inline SVG, base64 images, Prism, KaTeX, Mermaid, DOMPurify, marked. Note which ones the component needs at render time.

## 4. Hidden couplings checklist

Check each one and write the answer in the manifest.

- Does it need a parent wrapper class or id?
- Does it use ids that must be unique (like `details-0`)? What if two copies are on one page?
- Does it add anything to the search index, the "In this page" list or the page map graph?
- Does it call a `window.*` function?
- Does it depend on theme variables only, or has hard-coded colors (only the diagram panel is allowed)?
- Does it change when the window is under 1024px (left pane hides, bottom nav shows)?
- Does it rely on being rendered again after a filter or route change?

## 5. The standalone harness

A small HTML file so I can work on the component alone without opening the 5.5 MB site.

The harness must have:
- the `:root` color variables for BOTH themes (copy from the global norms) and a theme toggle button
- the same font link as the site (Schibsted Grotesk, Source Sans 3, IBM Plex Mono)
- the same base styles for `body`, headings, links, `.mono`, `.chip`
- the parent wrapper (like `.addon`) around the component
- stubs or copies of the helpers it uses
- fixtures: 3 normal items, 1 empty state, 1 extreme case (very long title, many tags, missing image, wide formula)
- viewport buttons for desktop and phone width

Libraries in the harness: for development only I may load pinned versions from cdnjs. The final site is offline, so the merged component must use what is already bundled and must never add a CDN link.

## 6. What an extraction produces

A folder named after the component:

```
extracted/<component>/
  <component>.css         all its CSS in cascade order, one prefix
  <component>.js          render(data) function plus handlers
  <component>.fixture.json  sample data for the harness
  harness.html            standalone page to work in
  manifest.md             the record (see below)
```

`manifest.md` records:
- source markers or function and selector names (not line numbers, they drift)
- every CSS block the rules came from, in order
- helpers, libraries, ids and observers it depends on
- registration points to redo on merge (filter id list, search index and so on)
- pages it appears on (from the sitemap)
- the baseline screenshots

## 7. Rules while working on it

- Every selector starts with the component prefix. No bare selectors like `h2`, `.chip`, `.tag`.
- Colors come only from the site variables. A new color is added to the global norms first.
- No new globals, no edits to shared helpers. If a shared helper must change, that is a global change and goes through the global norms.
- Keep the contract (fields it reads) the same unless I decided on a breaking change.
- Edge cases from the norm file must all render in the harness.

## 8. Putting it back (merge)

1. In the site file, find the component's pieces using the manifest. If markers exist, use them. If not, add markers now:
   `/* @component:<name> start */` and `/* @component:<name> end */` around the CSS and JS.
2. Replace only the content between markers. Remove the old overrides the manifest listed so they stop fighting the new CSS.
3. Keep the cascade order. If the old rules came late in the file, the new ones go in the same place.
4. Redo the registration points (filter id list, search index and so on).
5. Diff the file. Nothing outside the markers and the registration points should change.
6. Test every page from the "component to pages" table in dark, light and phone width. Compare with the baseline screenshots. No console errors.
7. Test the direct-open case: reload the page while sitting on the page's own route.
8. Update the norm file (Look section, changelog line) and the sitemap if pages changed.

## 9. Round trip test

Before changing anything: extract, then merge the untouched version back. The site must look and behave exactly the same as the baseline. If it does not, the extraction rules missed something. Fix the manifest first, then start the real change.

## 10. Don'ts

- Do not copy only the first CSS match.
- Do not rely on line numbers.
- Do not add a library or a CDN link to the site.
- Do not leave old CSS in place "just in case". It will fight the new CSS.
- Do not skip the phone width and light theme test.
- Do not change other components while merging.

## 11. Checklist

- [ ] norm file read, pages list from sitemap written
- [ ] baseline screenshots taken
- [ ] CSS collected from ALL style blocks in cascade order
- [ ] helpers, libraries, ids, observers listed
- [ ] harness works in dark, light and phone width with all fixtures
- [ ] round trip test passed
- [ ] merge diff touches only markers and registration points
- [ ] all pages in the list tested, no console errors
- [ ] norm file and changelog updated

## 12. Prompt header for a new chat

> I am working on the component `<name>`. Follow `extraction_component_rules.md` and `design_norms_<name>.md`. First produce the manifest (do not change anything yet), then the harness. Use only site color variables, prefix every selector, flag anything that conflicts with the norms.

Attach: this file, the component norm, `design_norms_global.md`, the sitemap, and the site HTML (or the extracted folder).
