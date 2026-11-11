# Data-driven architecture chain

**Location:** `plugin/architecture-diagram/index.jsx` (native React implementation), `styles.css` (original v7.7 stylesheet).

## Usage

In a JSON item's ordered `details` array, or directly through React where supported:

```jsx
`["architecture-diagram", {"heading":"Architecture", "nodes":["Frontend","API","Storage"], "note":"Simplified architecture"}]`
```

## Supported behavior and options

`nodes` is an ordered list of up to 12 strings and `note` is optional. Without nodes the plugin shows an explicit Input → Processing → Output demo. It does not interpret HTML or create graph edges automatically.

## Integration

`components/PluginRenderer.jsx` dynamically imports the entrypoint for `details` tuples. The renderer passes the tuple's second member as `props` and wraps it in a `detail-section` with `props.heading`. Avoid dynamic imports outside the allowlisted plugin registry. Source design styles remain unchanged.

## Testing

Run `npm run check`, then `npm run dev`; inspect this plugin on a detail page. Verify cleanup on navigation and test reduced motion where applicable.
