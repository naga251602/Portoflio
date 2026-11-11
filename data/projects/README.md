# Projects data

**File:** `data/projects/index.json`

Array of records. Keep `id` unique, `skills` an array, `is_featured` a boolean, `order` a number, `status` as `published` or `draft`, and `details` as ordered `[type, props]` tuples. Use `intro` as the shared summary.

This must remain valid strict JSON. JSON does not permit comment headers, so usage instructions are kept here. Records are loaded by `lib/data_loader.js` and should not contain markup or executable source.

**Current entries:** 2.
