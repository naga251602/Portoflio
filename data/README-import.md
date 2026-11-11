# data.ts migration

The imported data from `data.ts` is merged into the existing category JSON arrays. Existing entries remain intact. `SubletSafe` and `Palate` are the two featured **projects**. Other research/experience featured flags are retained.

`stack` becomes `skills`; HTML descriptions become plain-text `intro` and a `text` detail tuple. `visual` becomes an architecture diagram tuple using supplied nodes. Publication BibTeX becomes a code-viewer tuple. Original screenshot references are retained in `media_references` but not rendered unless the corresponding asset exists. The supplied GIF/PNG files were not attached. No benchmark claims were added.

Imported skill metadata is stored at `/config/imported_skill_metadata.json`; the Skills panel continues to derive its list from the actual entry tags.
