# LLM guide — strict visual and behavioral fidelity

## Source of truth

The working **Gaurav N V Portfolio v7.7** is authoritative. `scripts/v77-reference-checksums.json` records exact SHA-256 digests of 18 original CSS files and 5 content JSON files. Avoid changing `styles/` during native-component fixes. No iframe wrapping the legacy site, no static HTML entrypoint, no `dangerouslySetInnerHTML`, and no reinvented card layouts.

## Architecture

- `app/` — Next App Router pages; static content can be supplied from JSON. Homepage anchors: `intro`, `featured`, `experience`, `coding`, `work`, `research`, `others`, `skills`, `contact`.
- `components/Shell.jsx` — sticky translucent navbar, social icons, footer, background stars, and Go to Top.
- `components/Hero.jsx` and `plugin/globe/` — exact hero data-URI artwork, hero copy, notable contribution chips, rotating globe and LA clock.
- `components/Cards.jsx` — project/research/others/featured cards, with original `.card` and `.research-content` DOM/class structure. The 70-character excerpt is in `lib/card_excerpt.js`.
- `components/Collection.jsx` — filter chips with overflow control, collection search, full-size cards, alternating experience timeline, and Back.
- `components/Details.jsx` — original `.detail-hero`, `.detail-title`, contribution reveal, short-version note, tags, detail blocks and related links. It mounts the original parallax engine in an effect.
- `components/SkillDock.jsx` and `components/SkillsSection.jsx` — skill chips open grouped bottom dock, skill row auto-select/pause, height-aware information panel.
- `components/PluginRenderer.jsx` — the only dynamic rich-plugin registry.
- `data/` — five categories only: `projects`, `experience`, `research`, `contributions`, `socials`; Others are contribution items with `display_group:"others"`.

## Data edit examples

```json
{
  "id":"sample-entry",
  "title":"Sample Project",
  "intro":"One source of truth for card and detail summary.",
  "skills":["Python","Linux"],
  "is_featured":false,
  "order":500,
  "status":"published",
  "details":[
    ["text",{"heading":"Project Overview","content":"A longer explanation."}],
    ["code-viewer",{"heading":"Implementation","language":"python","code":"print(42)"}]
  ]
}
```

`details` is an ordered array of `[type, props]` tuples; `type` may be `text`, `list`, or a registered rich plugin. `text` uses `content`; `list` uses `items`. All other plugin types are described in their individual `plugin/<name>/README.md` files. Use only supported plugin IDs; never evaluate source code from user-controlled JSON in the page origin.

## Exact component rules

Maintain original `card-actions`, `compact-card`, `research-card`, `research-content`, `collection-card-wrap`, `home-experience-timeline`, `exp-tree`, `skill-dock`, `detail-skill-wrap`, and `demo-shell` class structures. Preserve all homepage sections and their ordering. Preserve accessible labels, keyboard interactions, reduced-motion handling, external links, and cleanup hooks. React state/effects replace old DOM string-building.

## Build and verification

Run `npm run check`, `npm run build`, `npm run audit` after installation. Check `/`, `/about`, every collection, details for all categories, and the 9 rich plugins on desktop and mobile. `npm run check` verifies source content/CSS hashes and JS import paths; it **cannot** certify visual 1:1 parity or a vulnerability-free npm dependency tree. Compare browser screenshots against v7.7 before declaring a production release.
