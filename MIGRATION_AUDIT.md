# Migration audit — 2026-11-11

## Completed in source

- Replaced the earlier approximate React UI with v7.7 markup and **unaltered original CSS**. No `app.js`/HTML compatibility route, no old HTML string-rendering components.
- Migrated the actual navbar, hero art, globe clock, section order, compact cards, research CSS-only art, experience timeline, coding profiles/calendar, skill dock, skill auto-scroll, contact form, About, full collections, and detail-page parallax.
- Migrated all 9 rich plugins to separate React entrypoints; heavy plugins are dynamically imported by the detail renderer. Preserved procedural canvas modules, and replaced the runtime Google CDN model viewer with its npm dependency.
- Preserved 40 content records (17 projects, 5 experience, 4 research, 14 contributions), plus social links and asset placeholders.
- Static source audit verifies SHA-256 parity for every original CSS/data asset, JSON validity, module resolution, and the absence of a legacy HTML entrypoint.

## Not yet verifiable here — do not label 100% certified

- `npm install`, `npm run build`, `npm audit` and cross-browser pixel comparisons require npm registry access. This container cannot resolve `registry.npmjs.org`, and has no cached packages. The ZIP therefore includes no fabricated lockfile, and **zero known vulnerabilities is not guaranteed**.
- Visual snapshots of native Next pages, runtime behavior, keyboard and mobile tests have **not** been executed here. Source parity does not establish pixel-perfect parity.
- Contact requires a configured real endpoint. Optional model assets and screenshots were not supplied. GitHub heatmap depends on a public third-party endpoint.

## Dependencies selected (latest stable npm listings checked 2026-11-11)

`next@16.4.6`, `react@19.3.1`, `react-dom@19.3.1`, `@google/model-viewer@4.4.0`; no Tailwind runtime compiler or unused icon/runtime dependencies. Existing compiled Tailwind CSS is retained. Published advisories and future transitive dependencies require an `npm audit` after installation.

The correct acceptance criterion is a successful `next build`, clean applicable security audit, functional tests, and **screenshot/interaction comparison against v7.7** on mobile and desktop; these remain the final gates.
