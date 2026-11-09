# Naga Portfolio - Next.js (fidelity-first build)

The original 5.5 MB single-file portfolio is rendered **unchanged** by default, so it retains its precise design and original JavaScript behavior. Next.js supplies path-based entry points, metadata and a compatibility bridge between pathname URLs and the original hash router.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000` or `/projects`, `/blog`, `/research`, `/experience`, `/playground`, `/contributions` and supported detail routes.

## Important

**This is a fidelity-first compatibility build, not a completed native component migration.** The fully modular Next.js implementation remains in the repository as scaffolding but is not used for the visible pages. See `docs/fidelity-mode.md` for limitations and next steps. The file `public/legacy.html` is byte-for-byte identical to the uploaded source. Do not modify it without documenting the parity impact.

## Scripts

- `npm run dev` - start Next.js locally
- `npm run build` - content check and Next.js build
- `npm run check-content` - validate extracted content
- `npm run check-sitemap-sync` - current basic norms check

See `migration/to_nextjs.md` for the native migration goals. This build intentionally does not claim to have met that final definition of done.

## Pre-start audit

Read `docs/prestart-audit-2026-11-08.md` before deployment. The legacy inline-script corruption was fixed and syntax-checked, but the Next.js build, browser behavior, runtime security and SEO parity have **not** been verified. `npm run check-legacy-js` is part of the preflight `npm run check` command.
