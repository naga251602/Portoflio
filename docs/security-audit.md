# Security and data isolation audit | 2026-11-08

## Findings and mitigations

| Issue | Status | Mitigation / qualification |
|---|---|---|
| Parent attempts to access cross-origin iframe DOM | Fixed in adapter | Strict origin/source/channel validated `postMessage`; never read frame DOM or attach listeners to frame Window |
| Arbitrary URL proxy / SSRF | Guarded | Proxy accepts only hardcoded HTTPS domains, narrow endpoint paths/queries, rejects redirects, capped response bytes and timeouts; not a generic URL fetcher |
| `/api/profile` missing | Implemented | GET route; upstream failures return 502 so original public snapshots remain |
| Direct AtCoder CORS failures | Mitigated | No direct browser fallback on proxy error; network may still fail upstream |
| LeetCode CSP iframe error | Mitigated | External anchors opened in new tab rather than changing main portfolio frame; external sites cannot be embedded on purpose |
| Browser public stats storage | Existing | `portfolio-live-*` localStorage stores PUBLIC coding statistics. Do not store secrets or user-provided personal info here |
| Cross-page / cross-component data leak | No specific leak confirmed from static inspection | Existing HTML contains global JS/shared DOM state and localStorage. No user sessions or secrets found in this intended stat flow. Requires browser test, audit of inline handlers, dependencies and remote third-party resources |
| Legacy `innerHTML` and custom editor code | Outstanding risk | Legacy has widespread HTML injection surfaces; some DOMPurify use exists, but comprehensive sanitization audit remains necessary before accepting untrusted content |
| Legacy bundled third-party scripts / simulation sandbox | Outstanding review | Exact bundled JS & simulation code was not exhaustively audited; pasted simulation iframes must never include allow-same-origin |
| Content-Security-Policy | Partial hardening | `frame-ancestors 'self'`, `object-src 'none'`, `base-uri 'self'` and same-origin framing; strict nonce/hash CSP not deployed because inline legacy JS/styles would break |
| `X-Frame-Options` | Same-origin only | Required for trusted same-origin legacy iframe. Cannot use DENY until iframe retired |
| Rate limiting | Not implemented | Caching reduces requests; upstream scraping/abuse prevention needs edge-level rate limiting if exploited |

## Not proof of zero leaks

A source inspection cannot certify zero information leaks, XSS, dependencies or runtime issues. Do not log URL parameters containing personal identifiers or tokens. Never embed credentials in `content/`, public HTML, or `NEXT_PUBLIC_` variables. Run dependency audits, CSP evaluation, browser network traces and OWASP tests before deploying to production.
