# Replay-only saved output

**Location:** `plugin/animated-notebook-output/index.jsx` (native React implementation), `styles.css` (original v7.7 stylesheet).

## Usage

In a JSON item's ordered `details` array, or directly through React where supported:

```jsx
`["animated-notebook-output", {"heading":"Saved output", "output":"Precision: 0.92"}]`
```

## Supported behavior and options

Replays JSON/text output after a 700ms delay. Offers a Replay button, clears timers when unmounted, and never executes arbitrary code.

## Integration

`components/PluginRenderer.jsx` dynamically imports the entrypoint for `details` tuples. The renderer passes the tuple's second member as `props` and wraps it in a `detail-section` with `props.heading`. Avoid dynamic imports outside the allowlisted plugin registry. Source design styles remain unchanged.

## Testing

Run `npm run check`, then `npm run dev`; inspect this plugin on a detail page. Verify cleanup on navigation and test reduced motion where applicable.
