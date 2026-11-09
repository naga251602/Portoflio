# To build | intentionally absent features

1. **Code tabs component**: JS/HTML (live, sandbox only), Python/C++ (syntax highlighted display and labeled captured outputs). Common sample input, copy, language tabs, errors, empty outputs, keyboard semantics, no arbitrary backend execution.
2. **Component schema/editor bridge**: optional JSON versioned shape for typed blocks, or plain Markdown-only authoring. Decide after code tabs pilot. Do not invent schema as currently supported.
3. **Article templates**: ready-to-paste Markdown blocks for all article body components and optional metadata manifest; templates may be prepared without changing runtime.
4. **Per-detail titles/metadata and social sharing**: detail-specific `document.title`, Open Graph metadata where hosting supports it, optional server-rendered/canonical pages for hash routing.
5. **Visual QA automation**: screenshots of each route at dark, light and phone width; check console logs, scroll overflow, focus and reduced motion.
6. **Tag canonicalization pipeline**: normalize at creation/import/render with a backwards-compatible data migration and backup.
7. **Unified dynamic ToC**: subscribe to archive filters/expansions and rebuild live based on visible sections.
8. **Image validation + resource budget enforcement**: clear loading fallback, metadata/alt verification, image size checks and Lighthouse measurement.
9. **Generic empty-state patterns**: no posts, no related posts, missing image, unknown language, failed diagram/render.

Status: design requirements only. Not implemented in supplied HTML.

Changelog: 2026-11-08 | Missing pieces identified.
