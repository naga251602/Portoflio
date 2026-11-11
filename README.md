# Gaurav N V — Native Next.js portfolio (v7.7 fidelity migration)

This project is a **native React / Next.js App Router conversion** of the working v7.7 website. Its original CSS and content files are preserved verbatim; all pages and rich UI use React components, not an HTML compatibility renderer.

## Start

Requires Node.js 20.9 or newer and internet access to install packages.

```bash
npm install
npm run check
npm run dev
# Then open http://localhost:3000
npm run build
npm run audit
```

`package-lock.json` is intentionally not invented: generate it with `npm install` and commit it after verifying dependencies. Production deploys should use `npm ci` with that committed lockfile.

## Folder guide

- `app/` — Next.js pages: `/`, `/about`, `/projects`, `/research`, `/experience`, `/others`, `/detail/[category]/[id]`.
- `components/` — Hero, navigation, original card variants, skills, search, collection filters, coding activity, detail view, contact, and skill dock.
- `data/` — the exact five JSON content categories from v7.7.
- `config/` — global site copy, About page content, skill descriptions, contact endpoint.
- `plugin/` — 9 individually documented rich React plugins plus shared CSS.
- `lib/` — data access, skill extraction, card excerpts, and plugin metadata.
- `public/assets/` — brand icons and optional screenshots/models; `resume.pdf`.
- `styles/` — byte-for-byte copies of original v7.7 CSS; **do not redesign or replace them**.
- `scripts/` — static parity checks and v7.7 source file checksums.

## Important limitations

Contact delivery remains disabled until `config/contact.js` contains a working endpoint, just as in the original. Some original image/model placeholders have no supplied assets. GitHub live heatmap requires access to the public activity endpoint. Imported notebook replay is simulated; the optional live mode supports sandboxed JavaScript, not arbitrary Python execution.

See `llm-guide.md` for exact content schemas, extension rules and fidelity constraints, and `MIGRATION_AUDIT.md` for verification status and package-security limitations.
