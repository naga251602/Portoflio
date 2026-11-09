# Source audit | 2026-11-08

Input: `Naga-Software-Engineer-refined (1).html` (~5.3 MB) and `writing_norms.md`. Static source/code inspection, not a new browser-based runtime QA pass. Previous handoff reports research theme/phone testing without console errors, but that has not been independently rerun here.

## Current implementation facts

| Feature | Blog detail | Standard project detail | Research detail/index |
|---|---|---|---|
| Shared Markdown renderer | Yes, `renderPost(root, post.body)` | Yes, `renderPost(project-body, p.dl)` | No, fixed detail HTML / static archive markup |
| Formulas `$` and `$$` | Yes, KaTeX in `renderPost` | Yes | Not in research fixed template |
| Marker `==...==` and `!!...!!` | Yes, text node walker | Yes | Not automatically |
| Fenced single-language code + copy + Prism | Yes | Yes | Not automatically |
| Mermaid fenced diagram | Yes | Yes | Index instead uses built-in SVG artwork |
| Markdown image + optional caption + dialog | Yes | Yes | Not automatically |
| `[!NOTE]` callout / blockquote | Yes | Yes | Not automatically |
| `sim` fenced live HTML/JS sandbox | Yes | Yes | Not automatically |
| Code tabs (JS live, Python/C++ display) | No | No | No |
| Related posts | Link to project/previous/next, no shared Related posts panel | Yes, post collection | No |

## Verified code details
- Router defines Home, Projects, Research, Experience, Blog, Simulations (`playground`), Contributions. Paths use `#/...` with detail slugs. `#/create` redirects to Home, Create elements are hidden.
- Layout uses left nav, main reading area, right contextual pane. At `<1024px`, original left pane hides and bottom nav appears, per handoff and styles.
- `renderPost` sanitizes marked HTML with DOMPurify (forbids `style`, `iframe`, `form`, inline style), then adds special markers, simulation iframe, Prism code, image zoom, KaTeX and Mermaid rendering.
- `Simulations.mount` provides Preview, Code, Split, Run, Stop, Reset, Copy, Download and Fullscreen. Sandbox `allow-scripts`, CSP `connect-src 'none'`; optional D3 or p5 from CDN. JS only.
- `model-laboratory` project is a special renderer (`NAGA_LAB_MARKUP`, `initNagaLab`) with custom canvases/stage/controls. It is not equivalent to the generic `sim` iframe runner.
- Blog preview `.note-card` uses cream left SVG art; research archive `.research-card` is separately scoped `#naga-research-archive` and also uses cream-grid SVG on the left.
- Research archive has tag filtering, expandable details, copy BibTeX; research detail uses preformatted question, method, findings, tags.
- Projects original `cards()` builds `.card` summaries, enhanced by a second pass with View project / GitHub actions; this differs from blog/research card geometry.
- `toc()` scans visible `h2`, assigns IDs; it can still show research headings for filtered-away cards as reported in handoff.
- Bundled libraries include marked, DOMPurify, KaTeX, Prism, Mermaid; fonts Google-hosted.

## Source trace pointers
- Main inline application script: `window.Simulations`, `window.renderPost`, `blog`, `project`, `researchPage`, `toc`, `route`.
- Styling: `.addon .prose`, `.code-wrap`, `.note-card`, `#naga-research-archive`, `.naga-simulation`.
- Input handoff sections 5 through 9 supply prior test observations, design decisions and open questions.

## Scope limitations
This audit did not change the source file and did not execute a browser or screenshot every route. All quantified targets in global norms are proposed guardrails unless explicitly identified as source values.

Changelog: 2026-11-08 | Static HTML/JS/CSS audit completed.
