# Read-only code area with Copy

**Location:** `plugin/code-viewer/index.jsx` (native React implementation), `styles.css` (original v7.7 stylesheet).

## Usage

In a JSON item's ordered `details` array, or directly through React where supported:

```jsx
`["code-viewer", {"heading":"Code excerpt", "language":"cpp", "code":"constexpr auto PAGE_SIZE = 4096;"}]`
```

## Supported behavior and options

`code` is displayed verbatim and copied to the clipboard using the original v7.7 code-area styling. `heading` appears in the enclosing detail section; `language` is metadata and does not activate syntax highlighting.

## Integration

`components/PluginRenderer.jsx` dynamically imports the entrypoint for `details` tuples. The renderer passes the tuple's second member as `props` and wraps it in a `detail-section` with `props.heading`. Avoid dynamic imports outside the allowlisted plugin registry. Source design styles remain unchanged.

## Testing

Run `npm run check`, then `npm run dev`; inspect this plugin on a detail page. Verify cleanup on navigation and test reduced motion where applicable.
