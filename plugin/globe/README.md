# Rotating world globe and time

**Location:** `plugin/globe/index.jsx` (native React implementation), `styles.css` (original v7.7 stylesheet).

## Usage

In a JSON item's ordered `details` array, or directly through React where supported:

```jsx
`<Globe loc={{city:"Los Angeles, CA",lat:34.05,lon:-118.24,tz:"America/Los_Angeles"}} />`
```

## Supported behavior and options

`loc.city` is shown below the 400×400 canvas, `lat`/`lon` control the marker and initial orientation, `tz` controls the clock. Uses the exact original canvas drawing engine. Animates unless reduced motion is enabled.

## Integration

`components/PluginRenderer.jsx` dynamically imports the entrypoint for `details` tuples. The renderer passes the tuple's second member as `props` and wraps it in a `detail-section` with `props.heading`. Avoid dynamic imports outside the allowlisted plugin registry. Source design styles remain unchanged.

## Testing

Run `npm run check`, then `npm run dev`; inspect this plugin on a detail page. Verify cleanup on navigation and test reduced motion where applicable.
