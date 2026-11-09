# Remaining verification follow-up | 2026-11-08

## Release decision: NO-GO (runtime verification incomplete)

### Executed in this environment
- `python3 scripts/verify-structure.py` PASS. This checks bridge structure, not runtime behavior.
- `node scripts/check-sitemap-sync.mjs` PASS with its own documented limitation: it does NOT enforce complete sitemap symmetry.
- `python3 scripts/check-legacy-js.py` PASS: syntax checked for 17 inline script elements, not runtime.
- `python3 scripts/verify-fidelity.py` PASS: original archived and compatibility patches present. Not visual parity.
- `node --check scripts/parity.mjs` PASS syntactically, BUT it is only a message-printing placeholder, not a test.
- Content file counts: 13 projects, 3 posts, 3 research files, 1 contribution.
- Checked the profile proxy allowlist source. It permits only selected HTTPS hosts/paths, disallows redirects and oversized responses. This is a source-code observation, not a live security certification.

### Blockers observed
1. `npm install --ignore-scripts --no-audit --no-fund --fetch-retries=0 --fetch-timeout=10000 --prefer-offline` timed out. No `node_modules` was installed.
2. `node scripts/check-content.mjs` fails with `ERR_MODULE_NOT_FOUND: gray-matter` (dependency unavailable), so its validation has NOT passed.
3. `npm audit --omit=dev --audit-level=high --offline` fails with `ENOLOCK`: no `package-lock.json` exists. Dependency vulnerability status UNKNOWN.
4. Playwright + system Chromium start successfully, but navigation to `http://127.0.0.1:8765/legacy.html` and `file:///.../legacy.html` fails with `net::ERR_BLOCKED_BY_ADMINISTRATOR`. Thus runtime, screenshot, mobile and iframe behavior are NOT verified.
5. `next build`, `tsc --noEmit`, live endpoint checks, request/response headers, production metadata and visual parity could not be executed.

### Confirmed outstanding architectural/security concerns
- Browser-visible portfolio remains in `/legacy.html` iframe; native HTML returned by detail routes is mostly a frame shell, meaning effective indexing of project/post contents is still poor despite metadata.
- Profile proxy `/api/profile?url=...` uses an HTTPS endpoint allowlist, but accepts arbitrary matching usernames and has no explicit request-rate limit or per-user throttling. Upstream rate limits, error shapes, caching and endpoint availability remain unverified.
- Public `legacy.html` is an additional indexable address unless explicitly excluded by a per-resource robots directive or noindex response; this can lead to duplicate content. Do not apply noindex to the parent detail routes.
- Original inline JS is very large, and sandboxed HTML simulations still require targeted XSS and messaging audits. No global proof of absence of data leaks is possible from static inspection alone.
- `src/lib/content.ts` has exported helpers `allSearch` and `slugify` unused by active app. Dependencies `next-mdx-remote`, `remark-gfm`, `remark-math`, `rehype-katex`, `katex`, `zod`, `lucide-react` have no references inside `src`; they appear to be unfinished migration scaffolding, not proven runtime necessities. Reassess before deletion.
- `scripts/parity.mjs` is a stub, so `npm run parity` cannot certify anything.

### User environment verification commands (where registry and browser are accessible)
```bash
npm install
npm run check
npm run build
npm audit --omit=dev
npm run dev
```
Then test `/`, `/projects`, `/projects/<valid-id>`, `/blog`, `/blog/<valid-slug>`, `/research`, `/experience`, `/playground`, `/contributions`, all deep links, `/api/profile` allowed/disallowed parameters, `/robots.txt`, `/sitemap.xml`, `/opengraph-image` and `/legacy.html`. Check browser console and network for desktop/mobile, theme changes, keyboard navigation, simulations and offline stats fallback. Implement actual screenshot comparisons against the original HTML before calling parity passed.

### Important
No production readiness, security clearance, bug-free runtime, successful build, vulnerability absence or 100% fidelity is claimed by this report.
