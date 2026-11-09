# Design norms index

Start with [global](design_norms_global.md), then [sitemap](design_norms_sitemap.md). For new content, attach this index plus the page norm and components actually used.

- [Global rules](design_norms_global.md): palette, themes, fonts, layout, accessibility, security, performance.
- [Sitemap](design_norms_sitemap.md): authoritative page-to-component and component-to-page dependency tables.
- [Tag vocabulary](tag_vocabulary.md): proposed canonical terms and normalization decisions.
- [Author examples](component_examples.md): ready-to-paste Markdown and proposed code tabs shape.
- [Current audit](audit_existing_site.md): supported components and source-backed behavior.
- [To fix](audit_to_fix.md): source mismatches to triage.
- [To build](audit_to_build.md): features not implemented.

## Page norms
- [home](design_norms_page_home.md)
- [projects index](design_norms_page_projects_index.md)
- [project detail](design_norms_page_project_detail.md)
- [blog index](design_norms_page_blog_index.md)
- [blog detail](design_norms_page_blog_detail.md)
- [research index](design_norms_page_research_index.md)
- [research detail](design_norms_page_research_detail.md)
- [experience](design_norms_page_experience.md)
- [simulations index](design_norms_page_simulations_index.md)
- [contributions](design_norms_page_contributions.md)
- [contribution detail](design_norms_page_contribution_detail.md)

## Component norms
- [text](design_norms_text.md)
- [heading](design_norms_heading.md)
- [text highlight](design_norms_text_highlight.md)
- [formula](design_norms_formula.md)
- [code block](design_norms_code_block.md)
- [code tabs](design_norms_code_tabs.md)
- [simulation](design_norms_simulation.md)
- [image](design_norms_image.md)
- [diagram](design_norms_diagram.md)
- [link](design_norms_link.md)
- [callout note](design_norms_callout_note.md)
- [quote](design_norms_quote.md)
- [tag row](design_norms_tag_row.md)
- [tag filter](design_norms_tag_filter.md)
- [related posts](design_norms_related_posts.md)
- [project card](design_norms_project_card.md)
- [blog card](design_norms_blog_card.md)
- [research card](design_norms_research_card.md)

## Task-to-files handoff
- New blog: global + sitemap + `page_blog_detail` + individual components used.
- New project: global + sitemap + `page_project_detail` + `project_card` + `related_posts` + body components used.
- New research: global + sitemap + `page_research_index`, `page_research_detail`, `research_card`, `diagram`.
- Redesign card: global + sitemap + card norm + all page norms in the inverse table.
- New simulation: global + `simulation` + relevant page norm + `audit_to_build`.

## Paste-at-start prompt
"Follow the attached design norms, preserve source content and existing component contracts, and keep Create hidden. Use existing theme variables, call out norm/code differences in to-fix, and never silently add unbuilt features. Test both themes and phone layout."

Changelog: 2026-11-08 | Index and handoff tasks created.


---
**Next.js v2.1 implementation note (2026-11-08):** This norm defines design/behavioral intent. Its visible implementation currently remains in `public/legacy.html` (legacy hash router) presented through `src/components/LegacyPortfolio/index.tsx`; there is **no active matching native React leaf component**. When modifying this feature, consult `context_router.md` and `rules/nextjs_crud.md`, update the active HTML handlers/styles first, and validate all consumers listed in the sitemap. Any future isolated React component must preserve the same contract, responsive behavior and dark/light visuals before replacing the legacy fragment.
