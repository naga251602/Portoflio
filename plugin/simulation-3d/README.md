# Interactive procedural surface or GLB/GLTF asset

**Location:** `plugin/simulation-3d/index.jsx` (native React implementation), `styles.css` (original v7.7 stylesheet).

## Usage

In a JSON item's ordered `details` array, or directly through React where supported:

```jsx
`["simulation-3d", {"heading":"3D simulation", "source":"module", "module":"loss-landscape", "parameters":{"height":1.6}}]`
```

## Supported behavior and options

Modes: `source:"module"` loads allowlisted `loss-landscape` from `presets/`; omitted/`source:"procedural"` draws the v7.7 interactive mathematical mesh; `source:"model"` loads `/assets/models/file.glb` or `.gltf` from `public/assets/models/` using npm-installed `@google/model-viewer`. No arbitrary JavaScript evaluation from JSON; missing models show an explicit error. Canvas animation and listeners are released on unmount.

## Integration

`components/PluginRenderer.jsx` dynamically imports the entrypoint for `details` tuples. The renderer passes the tuple's second member as `props` and wraps it in a `detail-section` with `props.heading`. Avoid dynamic imports outside the allowlisted plugin registry. Source design styles remain unchanged.

## Testing

Run `npm run check`, then `npm run dev`; inspect this plugin on a detail page. Verify cleanup on navigation and test reduced motion where applicable.
