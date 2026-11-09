# Tag vocabulary | canonical display rules

Status: proposed **normalization contract**, not a claim of a fully extracted production tag list. The source currently renders tags as stored.

- Canonical spellings: `C++`, `C`, `Python`, `JavaScript`, `TypeScript`, `Go`, `SQL`, `HTML`, `CSS`, `Linux`, `RocksDB`, `NLP`, `GPT`, `BERT`, `ML`, `AI`, `WebGL`, `PySpark`, `Kafka`, `Redis`, `PostgreSQL`, `Docker`, `React`, `Next.js`.
- Store a stable slug for filtering (`computer-vision`), display the canonical label (`Computer Vision`). Strip whitespace, normalize case/aliases, deduplicate by canonical slug.
- Avoid mixing singular and plural for one concept: use singular for technology/category (e.g. `Database`, not both `Database` and `Databases`) when introducing a new tag.
- Existing post/project/research tags vary and are not migrated by these documents. Audit exact historical labels before applying a transformation to live content.

Changelog: 2026-11-08 | Initial vocabulary rules.
