# Component: code block | v1

## Part A | Contract
**Purpose**: Display a single syntax-highlighted example with copying.

**Author input / fields**: Fenced Markdown: ```python ... ``` or ```cpp ... ```.

**CSS scope / DOM hook**: `.code-wrap`, `.code-wrap pre`, `pre code`.

**Usage example**: See `component_examples.md` for copyable representations. Reuse current input type until a deliberate migration is documented. Do not require a page-specific wrapper inside this component contract.

## Part B | Look
IBM Plex Mono and current code-wrap styles; copy action; horizontal scrolling on mobile.

**Dark / light**: All added styles must consume global semantic variables except the expressly allowed paper diagram palette. Typography and spacing follow global norms. Mobile should never cause horizontal page overflow.

**Variants**: Favor compact/large modifiers within this same file, not another component file. Existing variants, if any, remain separate until explicit consolidation.

**Edge cases**: Unknown language remains readable plain text. Empty block should not break.

**Do**: make content accessible; support theme switching, keyboard, mobile, reduced motion; check console after use.

**Do not**: introduce new fonts, leak CSS outside scope, run Python/C++ in the browser, or claim planned capabilities already work.

## Current source status
`renderPost` wraps each pre/code, adds Copy code, calls Prism.highlightElement.

## Shipping checks
- [ ] Dark + light
- [ ] Phone width and long content
- [ ] Keyboard / focus / accessible labels
- [ ] Reduced motion and no console exceptions
- [ ] No hard-coded colors beyond approved artwork

Changelog: 2026-11-08 | Initial documented contract/look; distinguish observed behavior from intended behavior.


---
**Next.js v2.1 implementation note (2026-11-08):** This norm defines design/behavioral intent. Its visible implementation currently remains in `public/legacy.html` (legacy hash router) presented through `src/components/LegacyPortfolio/index.tsx`; there is **no active matching native React leaf component**. When modifying this feature, consult `context_router.md` and `rules/nextjs_crud.md`, update the active HTML handlers/styles first, and validate all consumers listed in the sitemap. Any future isolated React component must preserve the same contract, responsive behavior and dark/light visuals before replacing the legacy fragment.
