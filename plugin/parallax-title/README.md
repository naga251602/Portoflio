# Detail-page title scroll effect

**Location:** `plugin/parallax-title/index.jsx` (native React implementation), `styles.css` (original v7.7 stylesheet).

## Usage

In a JSON item's ordered `details` array, or directly through React where supported:

```jsx
`<ParallaxTitle title="My Project" subtitle="PROJECTS / FIELD NOTES" />`
```

## Supported behavior and options

Uses v7.7 scroll engine. On detail routes, `components/Details.jsx` directly mounts `engine.js` on `.detail-title` within `.detail-hero`. CSS variables `--parallax-x`, `--parallax-y`, `--parallax-scale`, and `--parallax-opacity` drive the effect. Scroll and resize listeners are cleaned up on unmount.

## Integration

`components/PluginRenderer.jsx` dynamically imports the entrypoint for `details` tuples. The renderer passes the tuple's second member as `props` and wraps it in a `detail-section` with `props.heading`. Avoid dynamic imports outside the allowlisted plugin registry. Source design styles remain unchanged.

## Testing

Run `npm run check`, then `npm run dev`; inspect this plugin on a detail page. Verify cleanup on navigation and test reduced motion where applicable.
