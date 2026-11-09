# Change: Content validation and simulation permissions

- Operation: update; targets: blog metadata and content validator.
- Goal: resolve three content errors without inventing projects or changing simulation/UI behavior.
- Source present: `content/`, `scripts/check-content.mjs`, `public/legacy.html`.
- Read: `context_router.md`; global, sitemap, simulation, blog detail and code block norms; `rules/nextjs_crud.md`; security audit; content loader, project IDs, affected MDX and active legacy renderer/runner.
- Dependency impact: simulation consumers remain project detail, blog detail and simulations index, symmetrically listed in the sitemap. No membership or runtime contract changes.
- Investigation: neither the canonical MDX project collection nor active legacy project registry contains `db` or Durable DB. Removed the optional `project` field from both affected MDX records and their legacy counterparts. Article text and tags remain intact; no substitute project relationship was asserted.
- Validator: only complete top-level triple-backtick `sim` fences exempt their contents from the script prohibition. Raw scripts, other code fences, nested sim examples, malformed/unclosed fences and scripts following permitted blocks remain prohibited.
- Security: inspected both initial and replacement simulation frames: `sandbox="allow-scripts"`, no `allow-same-origin`; code is assigned only to iframe srcdoc, with restrictive CSP including `connect-src 'none'`. Markdown remains DOMPurify-sanitized. Runner source and simulation functionality unchanged.
- Additional build fixes: repaired empty lockfile entries and installations for `@types/ms` and `@types/unist`, pinned as development dependencies. npm deduplicated equivalent nested unist types.
- Files changed: two blog MDX files, legacy metadata, content validator, package manifests, this manifest. No styling changes or new routes.
- Validation: `npm run check-content` PASS; `npm run check-sitemap-sync` PASS (its symmetry validation remains manual); `npm run build` PASS, 34 pages generated; `npm run check-legacy-js` PASS (17 scripts); eight in-memory permission regression cases and sandbox/CSP source assertions PASS; `git diff --check` PASS.
- Unverified: browser playback/run/stop/reset, navigation, screenshots and dark/light/mobile visual parity. No runtime security certification claimed.
- Rollback: revert this task's diff via git; restore package manifests together and reinstall dependencies. Frozen source archive untouched.
- Norm/sitemap updates: none needed; existing permissions and membership preserved.
