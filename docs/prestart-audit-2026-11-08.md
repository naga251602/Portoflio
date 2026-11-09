# Pre-start health audit | 2026-11-08

**Decision: NOT production-ready; runtime build and browser checks still required.** This is a source-level audit, not a certification of functional/visual parity or absence of vulnerabilities.

## Tests performed

- `npm run check-structure` PASS. This checks a small set of required files/bridge patterns, not comprehensive project correctness.
- `npm run check-sitemap-sync` PASS with limitations. It does not implement symmetric sitemap validation.
- `python3 scripts/verify-fidelity.py` PASS. This checks that the original HTML archive remains intact and that the bridge exists; it does not test screenshots.
- `python3 scripts/check-legacy-js.py` PASS: all 17 inline script tags now pass JavaScript syntax checking.
- ZIP contents were inspected for path traversal filenames: none found.
- Quick static scan of source/content for common secret patterns: no obvious secrets found; not a complete privacy/security audit.
- `npm install --ignore-scripts --no-audit --no-fund --fetch-retries=0 --fetch-timeout=12000` TIMED OUT. No dependency installation, TypeScript check, Next.js build, browser runtime, or dependency audit was verified.

## Confirmed defect corrected in this audit

The navigation bridge and external-link script were injected inside a DOMPurify inline bundle because a patch matched a `</body>` string embedded *inside JavaScript*, rather than the actual closing body tag. This corrupted a JavaScript string and could prevent the original portfolio from rendering correctly. The scripts have been relocated to the end of the real body. The stray newline left inside the JS string was also removed. A placement assertion and inline JS parser check now detect recurrence.

## Outstanding high-priority issues

1. **The site is still an iframe-hosted legacy HTML app**, not a native component migration. The Next.js metadata, sitemap and detail URLs do not make iframe text equivalent to server-rendered HTML for search indexing. SEO parity is unverified.
2. **No actual parity test exists.** `scripts/parity.mjs` currently prints instructions rather than taking screenshots or comparing functionality.
3. **Dead/unused implementation artifacts exist.** `src/lib/content.ts` exports `allSearch` and `slugify` without consumers in the active UI. Installed runtime packages for MDX, KaTeX, syntax processing, zod and icons have no active imports; they are migration scaffolding, not proven needed by the shipped adapter. Do not remove content files without evaluating future migration plans.
4. **Profile API needs live integration tests** for Codeforces, AtCoder, GitHub contributions and LeetCode. It restricts hosts, path patterns and payload sizes, and denies redirects, but availability, response shape and rate limiting are not proven. The endpoint is unauthenticated by design for public stats and may be abused for excessive upstream requests without additional rate limiting.
5. **Some third-party embeds cannot be framed**, including LeetCode, due to external CSP. Open such destinations in a new tab, do not force iframes.
6. **Original HTML includes substantial bundled third-party code and dynamic simulation execution.** Syntax passing is not a complete XSS or sandbox review. Assess CSP and the sandboxed simulation runner in a real browser before release.
7. **Security headers and metadata not exercised against a running server.** Confirm on production and preview deployments. `upgrade-insecure-requests` and any third-party assets should be checked across localhost and HTTPS.
8. **No lockfile shipped.** Exact direct dependency versions are declared, but reproducibility and supply-chain review require a committed `package-lock.json` produced after a successful install.

## Required go/no-go checks before deployment

1. With working npm registry access: `npm install`, commit the lockfile, `npm run check`, `npm run build`, and `npm audit --omit=dev`.
2. Run `npm run dev`; visit every route directly, reload, navigate back/forward, change themes, open all cards, and test simulations in browser console with no errors.
3. Test mobile sizes and reduced-motion preference; verify sandbox security, network fetches and profile fallback behavior.
4. Implement and run browser-based parity tests using source HTML screenshots as baseline.
5. Validate `/sitemap.xml`, `/robots.txt`, canonical/OG metadata, and Googlebot-visible text. Do not treat iframe SEO as a finished migration.

Until those are complete, mark status **PARTIALLY VERIFIED / NO-GO FOR PRODUCTION**.
