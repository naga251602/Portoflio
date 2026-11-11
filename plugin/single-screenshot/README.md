# Single screenshot / fallback

**Location:** `plugin/single-screenshot/index.jsx` (native React implementation), `styles.css` (original v7.7 stylesheet).

## Usage

In a JSON item's ordered `details` array, or directly through React where supported:

```jsx
`["single-screenshot", {"heading":"Screenshot", "src":"/assets/screenshots/one.png", "alt":"App dashboard", "caption":"Home screen"}]`
```

## Supported behavior and options

`src` or `image` must be a root-relative `/...` path or HTTPS URL; `alt` and `caption` are optional. Missing or broken images show the v7.7 labeled placeholder. Put files in `public/assets/screenshots/`.

## Integration

`components/PluginRenderer.jsx` dynamically imports the entrypoint for `details` tuples. The renderer passes the tuple's second member as `props` and wraps it in a `detail-section` with `props.heading`. Avoid dynamic imports outside the allowlisted plugin registry. Source design styles remain unchanged.

## Testing

Run `npm run check`, then `npm run dev`; inspect this plugin on a detail page. Verify cleanup on navigation and test reduced motion where applicable.
