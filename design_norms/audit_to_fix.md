# To fix | known mismatches with intended norms

1. **Research ToC after filter**: handoff confirms `In this page` keeps all 3 papers even when only one card visible. Recompute ToC or link list after filter.
2. **Theme-only color rule exceptions to triage**: graph uses hardcoded node accent colors; simulation iframe uses fixed cream palette; note-art/research diagrams are approved fixed-color exceptions, but graph and generic simulation colors need policy decisions or dual-theme tokens.
3. **Design consistency**: project `.card` is a border-top list; blog and research cards use a cream artwork panel. This is a real intentional/current difference, not proof of a bug. Define whether to unify the anatomy before editing.
4. **External share previews**: router uses hash URLs and sets generic page-level titles; route-specific social previews require serving/hosting strategy.
5. **Tags**: current code treats tag strings literally, creating potential inconsistent spellings and duplicate filter options; normalize only after auditing existing content.
6. **Code panel alignment**: current generic simulation runner and bespoke laboratory canvas controls have distinct UI anatomy. Consolidate styles/contract cautiously, not rendering engines.
7. **Focus/accessible filter state**: review `aria-pressed` and focus after tag rerender and expand/collapse. Current `.on` class alone is not an accessibility guarantee.
8. **Typographic tokens**: locate and decide on occasional local font-size/color overrides; preserve existing presentation until approved.

Each item requires verification when implemented. These are not claimed fixed.

Changelog: 2026-11-08 | Initial source-and-handoff mismatch list.
