# Change manifest | Security, routing and SEO fidelity hardening

**Scope:** trusted iframe bridge communication, locked-down stats API, remove direct browser CORS fallback, external link isolation, canonical per-page metadata, OG image, sitemap/robots, docs v2.1, remove unused Next.js shell components.

**Affected URLs:** all 11 page types; `/api/profile`; `/sitemap.xml`, `/robots.txt`, `/opengraph-image`.

**Contracts preserved:** original CSS, content arrays, visual layout and theme logic in legacy document. Added scripts do not alter DOM styling; exceptions may occur if external links previously navigated in-frame.

**Security:** proxy validates HTTPS host/path/query and response size; no redirects. Browser snapshots are fallback. Frame bridge uses origin/source-checked messages. Conservative security headers. Strict CSP and security audit still outstanding.

**Verification:** static structural checks are possible without dependencies; TypeScript/Next build and browser screenshot parity are **NOT VERIFIED** without installed dependencies and live browser. Upstream API reliability unverified. SEO discoverability limited by iframe; prioritize native SSR migration.
