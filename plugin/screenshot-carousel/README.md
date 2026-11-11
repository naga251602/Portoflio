# Image carousel with Previous and Next

**Location:** `plugin/screenshot-carousel/index.jsx` (native React implementation), `styles.css` (original v7.7 stylesheet).

## Usage

In a JSON item's ordered `details` array, or directly through React where supported:

```jsx
`["screenshot-carousel", {"heading":"Screenshots", "images":["/assets/screenshots/a.png",{"src":"/assets/screenshots/b.png","alt":"Settings","caption":"Settings screen"}]}]`
```

## Supported behavior and options

`images` accepts strings or objects `{src, alt?, caption?}`. `caption` at top level supplies a fallback. Prev/Next wraps cyclically. Empty image lists display the original fake-screen placeholder.

## Integration

`components/PluginRenderer.jsx` dynamically imports the entrypoint for `details` tuples. The renderer passes the tuple's second member as `props` and wraps it in a `detail-section` with `props.heading`. Avoid dynamic imports outside the allowlisted plugin registry. Source design styles remain unchanged.

## Testing

Run `npm run check`, then `npm run dev`; inspect this plugin on a detail page. Verify cleanup on navigation and test reduced motion where applicable.
