# Notebook code cell with run/replay

**Location:** `plugin/interactive-notebook-cell/index.jsx` (native React implementation), `styles.css` (original v7.7 stylesheet).

## Usage

In a JSON item's ordered `details` array, or directly through React where supported:

```jsx
`["interactive-notebook-cell", {"heading":"Notebook", "language":"python", "code":"print(1 + 1)", "output":"2", "execution":"replay"}]`
```

## Supported behavior and options

Fields: `language` (default `python`), `code`, `output` (string/JSON), `execution` (`replay` or `live`). Replay simulates output after 700ms. Live executes *JavaScript only* inside a sandboxed, opaque-origin iframe with a 2.5s timeout; Python is replay-only. Never executes project JSON code in the page origin.

## Integration

`components/PluginRenderer.jsx` dynamically imports the entrypoint for `details` tuples. The renderer passes the tuple's second member as `props` and wraps it in a `detail-section` with `props.heading`. Avoid dynamic imports outside the allowlisted plugin registry. Source design styles remain unchanged.

## Testing

Run `npm run check`, then `npm run dev`; inspect this plugin on a detail page. Verify cleanup on navigation and test reduced motion where applicable.
