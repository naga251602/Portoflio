# Component: callout note | v1

## Part A | Contract
**Purpose**: Highlight context or cautions.

**Author input / fields**: `> [!NOTE] explanatory note`.

**CSS scope / DOM hook**: `.note-callout`, `.note-callout-label`, `.story-summary`.

**Usage example**: See `component_examples.md` for copyable representations. Reuse current input type until a deliberate migration is documented. Do not require a page-specific wrapper inside this component contract.

## Part B | Look
Use theme border/surface and mono heading; do not use fixed callout colors.

**Dark / light**: All added styles must consume global semantic variables except the expressly allowed paper diagram palette. Typography and spacing follow global norms. Mobile should never cause horizontal page overflow.

**Variants**: Favor compact/large modifiers within this same file, not another component file. Existing variants, if any, remain separate until explicit consolidation.

**Edge cases**: Empty content: omit; note within note: flatten; warning variant is not built.

**Do**: make content accessible; support theme switching, keyboard, mobile, reduced motion; check console after use.

**Do not**: introduce new fonts, leak CSS outside scope, run Python/C++ in the browser, or claim planned capabilities already work.

## Current source status
`renderPost` recognizes leading `[!NOTE]` in first blockquote paragraph. Story summary is separate special-case HTML.

## Shipping checks
- [ ] Dark + light
- [ ] Phone width and long content
- [ ] Keyboard / focus / accessible labels
- [ ] Reduced motion and no console exceptions
- [ ] No hard-coded colors beyond approved artwork

Changelog: 2026-11-08 | Initial documented contract/look; distinguish observed behavior from intended behavior.


---
**Next.js v2.1 implementation note (2026-11-08):** This norm defines design/behavioral intent. Its visible implementation currently remains in `public/legacy.html` (legacy hash router) presented through `src/components/LegacyPortfolio/index.tsx`; there is **no active matching native React leaf component**. When modifying this feature, consult `context_router.md` and `rules/nextjs_crud.md`, update the active HTML handlers/styles first, and validate all consumers listed in the sitemap. Any future isolated React component must preserve the same contract, responsive behavior and dark/light visuals before replacing the legacy fragment.
