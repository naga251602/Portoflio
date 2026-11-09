# Sitemap | page and component cross-reference

Legend: **active** means visible content comes from `public/legacy.html` within `LegacyPortfolio`; **planned** refers to future native React component composition. The old `/` paths are internal iframe hashes. Public URLs are real Next.js routes. Page types use their dedicated norm.

## Page -> components (authoritative)

| Page type | Route | Page norm | Allowed components | Active implementation |
|---|---|---|---|---|
| home | `/` | [page norm](design_norms_page_home.md) | [heading](design_norms_heading.md), [text](design_norms_text.md), [project_card](design_norms_project_card.md), [blog_card](design_norms_blog_card.md), [tag_row](design_norms_tag_row.md), [diagram](design_norms_diagram.md), [link](design_norms_link.md) | `src/app/.../page.tsx` + `public/legacy.html` |
| projects_index | `/projects` | [page norm](design_norms_page_projects_index.md) | [heading](design_norms_heading.md), [project_card](design_norms_project_card.md), [tag_row](design_norms_tag_row.md), [tag_filter](design_norms_tag_filter.md) (planned), [link](design_norms_link.md) | `src/app/.../page.tsx` + `public/legacy.html` |
| project_detail | `/projects/[id]` | [page norm](design_norms_page_project_detail.md) | [heading](design_norms_heading.md), [text](design_norms_text.md), [text_highlight](design_norms_text_highlight.md), [formula](design_norms_formula.md), [code_block](design_norms_code_block.md), [code_tabs](design_norms_code_tabs.md) (planned), [simulation](design_norms_simulation.md), [image](design_norms_image.md), [diagram](design_norms_diagram.md), [link](design_norms_link.md), [callout_note](design_norms_callout_note.md), [quote](design_norms_quote.md), [tag_row](design_norms_tag_row.md), [related_posts](design_norms_related_posts.md) | `src/app/.../page.tsx` + `public/legacy.html` |
| blog_index | `/blog` | [page norm](design_norms_page_blog_index.md) | [heading](design_norms_heading.md), [blog_card](design_norms_blog_card.md), [tag_filter](design_norms_tag_filter.md), [tag_row](design_norms_tag_row.md), [link](design_norms_link.md) | `src/app/.../page.tsx` + `public/legacy.html` |
| blog_detail | `/blog/[slug]` | [page norm](design_norms_page_blog_detail.md) | [heading](design_norms_heading.md), [text](design_norms_text.md), [text_highlight](design_norms_text_highlight.md), [formula](design_norms_formula.md), [code_block](design_norms_code_block.md), [code_tabs](design_norms_code_tabs.md) (planned), [simulation](design_norms_simulation.md), [image](design_norms_image.md), [diagram](design_norms_diagram.md), [link](design_norms_link.md), [callout_note](design_norms_callout_note.md), [quote](design_norms_quote.md), [tag_row](design_norms_tag_row.md), [related_posts](design_norms_related_posts.md) (planned) | `src/app/.../page.tsx` + `public/legacy.html` |
| research_index | `/research` | [page norm](design_norms_page_research_index.md) | [heading](design_norms_heading.md), [research_card](design_norms_research_card.md), [tag_filter](design_norms_tag_filter.md), [tag_row](design_norms_tag_row.md), [diagram](design_norms_diagram.md), [link](design_norms_link.md) | `src/app/.../page.tsx` + `public/legacy.html` |
| research_detail | `/research/[slug]` | [page norm](design_norms_page_research_detail.md) | [heading](design_norms_heading.md), [text](design_norms_text.md), [tag_row](design_norms_tag_row.md), [link](design_norms_link.md) | `src/app/.../page.tsx` + `public/legacy.html` |
| experience | `/experience` | [page norm](design_norms_page_experience.md) | [heading](design_norms_heading.md), [text](design_norms_text.md), [tag_row](design_norms_tag_row.md), [link](design_norms_link.md) | `src/app/.../page.tsx` + `public/legacy.html` |
| simulations_index | `/playground` | [page norm](design_norms_page_simulations_index.md) | [heading](design_norms_heading.md), [simulation](design_norms_simulation.md), [code_block](design_norms_code_block.md), [link](design_norms_link.md) | `src/app/.../page.tsx` + `public/legacy.html` |
| contributions | `/contributions` | [page norm](design_norms_page_contributions.md) | [heading](design_norms_heading.md), [text](design_norms_text.md), [tag_row](design_norms_tag_row.md), [link](design_norms_link.md) | `src/app/.../page.tsx` + `public/legacy.html` |
| contribution_detail | `/contributions/[slug]` | [page norm](design_norms_page_contribution_detail.md) | [heading](design_norms_heading.md), [text](design_norms_text.md), [link](design_norms_link.md), [tag_row](design_norms_tag_row.md) | `src/app/.../page.tsx` + `public/legacy.html` |

## Component -> pages (inverse cross-reference)

| Component | Page types |
|---|---|
| [text](design_norms_text.md) | home, project_detail, blog_detail, research_detail, experience, contributions, contribution_detail |
| [heading](design_norms_heading.md) | home, projects_index, project_detail, blog_index, blog_detail, research_index, research_detail, experience, simulations_index, contributions, contribution_detail |
| [text_highlight](design_norms_text_highlight.md) | project_detail, blog_detail |
| [formula](design_norms_formula.md) | project_detail, blog_detail |
| [code_block](design_norms_code_block.md) | project_detail, blog_detail, simulations_index |
| [code_tabs](design_norms_code_tabs.md) | project_detail, blog_detail |
| [simulation](design_norms_simulation.md) | project_detail, blog_detail, simulations_index |
| [image](design_norms_image.md) | project_detail, blog_detail |
| [diagram](design_norms_diagram.md) | home, project_detail, blog_detail, research_index |
| [link](design_norms_link.md) | home, projects_index, project_detail, blog_index, blog_detail, research_index, research_detail, experience, simulations_index, contributions, contribution_detail |
| [callout_note](design_norms_callout_note.md) | project_detail, blog_detail |
| [quote](design_norms_quote.md) | project_detail, blog_detail |
| [tag_row](design_norms_tag_row.md) | home, projects_index, project_detail, blog_index, blog_detail, research_index, research_detail, experience, contributions, contribution_detail |
| [tag_filter](design_norms_tag_filter.md) | projects_index, blog_index, research_index |
| [related_posts](design_norms_related_posts.md) | project_detail, blog_detail |
| [project_card](design_norms_project_card.md) | home, projects_index |
| [blog_card](design_norms_blog_card.md) | home, blog_index |
| [research_card](design_norms_research_card.md) | research_index |

**Special routing**: `#/about`, `#/coding`, `#/create` redirect to Home; Create stays hidden. The playground route is confirmed in the router. The model-laboratory is special-cased under project detail.

Changelog: 2026-11-08 | Mapped routes and component dependencies from source plus planned contracts.

## Active Next.js route file map (explicit, compatibility mode)

| Page type | Next.js route file | Legacy render source |
|---|---|---|
| `home` | `src/app/page.tsx` | `public/legacy.html` hash renderer |
| `projects_index` | `src/app/projects/page.tsx` | `public/legacy.html` hash renderer |
| `project_detail` | `src/app/projects/[id]/page.tsx` | `public/legacy.html` hash renderer |
| `blog_index` | `src/app/blog/page.tsx` | `public/legacy.html` hash renderer |
| `blog_detail` | `src/app/blog/[slug]/page.tsx` | `public/legacy.html` hash renderer |
| `research_index` | `src/app/research/page.tsx` | `public/legacy.html` hash renderer |
| `research_detail` | `src/app/research/[slug]/page.tsx` | `public/legacy.html` hash renderer |
| `experience` | `src/app/experience/page.tsx` | `public/legacy.html` hash renderer |
| `simulations_index` | `src/app/playground/page.tsx` | `public/legacy.html` hash renderer |
| `contributions` | `src/app/contributions/page.tsx` | `public/legacy.html` hash renderer |
| `contribution_detail` | `src/app/contributions/[slug]/page.tsx` | `public/legacy.html` hash renderer |

**Inverse component table above is DESIGN MEMBERSHIP, not mounted React component imports.** Actual JSX only renders `LegacyPortfolio`. Each requested component CRUD must update the active legacy renderer until native migration passes parity.

Changelog: 2026-11-08 | v2.1: public Next.js routes, active ownership and compatibility caveat.
