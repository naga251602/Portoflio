# Page norm: research index | v1

Route: `#/research`. The sitemap owns the page-component permission map. Do not duplicate that map here.

## Required components
[heading](design_norms_heading.md), [research_card](design_norms_research_card.md).

## Composition and order
- Page intro / heading first. Then metadata/filters when relevant, then substantive body or collection. Put related content after the primary content and avoid repeating summaries.
- Article/detail pages: intro, optional actions/tags, main content (author freely mixes headings, text, figures, diagrams, formulas, code and simulations), related content, contextual right pane.
- Archive/index pages: intro, compact search/filter controls, cards, pagination or empty state. No oversized padding on cards.
- Use existing spacing rules from global and each component; no copying component CSS into this page rule.
- "In this page": the existing ToC scans visible `h2` in `main` and links via id. When dynamic filtering hides entries, rebuild the list to reflect what is shown.
- Desktop right pane: page-specific metadata or related navigation only, avoid duplicating article content. Mobile: navigation condenses into bottom tabs.

## Current/next state
- This page is based on actual `#/research` routing; not every allowed component is already implemented. Planned additions are documented in the sitemap and `audit_to_build.md`.
- Keep pages assembled from independently reusable components. Detail content is free to vary in order; do not force identical blog/project bodies.

## QA
- [ ] Route loads directly and via navigation
- [ ] Dark and light; phone width
- [ ] ToC correct after filtering/navigation
- [ ] Empty/missing content and large card collection
- [ ] No console errors

Changelog: 2026-11-08 | Initial page composition norm.


---
**Next.js v2.1 implementation note (2026-11-08):** This norm defines design/behavioral intent. Its visible implementation currently remains in `public/legacy.html` (legacy hash router) presented through `src/components/LegacyPortfolio/index.tsx`; there is **no active matching native React leaf component**. When modifying this feature, consult `context_router.md` and `rules/nextjs_crud.md`, update the active HTML handlers/styles first, and validate all consumers listed in the sitemap. Any future isolated React component must preserve the same contract, responsive behavior and dark/light visuals before replacing the legacy fragment.
