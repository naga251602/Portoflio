# Component: Simulation | v2

**Status:** Documented from the supplied portfolio HTML, specifically the project detail `#/projects/model-laboratory` ("3D Loss Landscape & Model Laboratory"). This file is a reusable **component contract**, not a rule tied to that page. Existing behavior is labeled **Observed**; stronger requirements for future changes are labeled **Required for new work** or **Proposed**. Do not treat proposed features as implemented.

## Part A | Contract

### 1. Purpose and independence

A simulation is a self-contained, interactive visual explanation accompanied by controls, measurements, reproducible source, and notebook observations. The host page owns only placement, navigation, and descriptive metadata; the simulation owns its own model state, drawing, inputs, and cleanup. A single page may contain several simulations, and a simulation may be mounted on a project, blog, research, or dedicated simulation detail page without knowing which page hosts it.

**Observed:** The portfolio has two implementations:

- **Generic fenced `sim` block:** `Simulations.mount` uses an iframe-based preview with Preview/Code/Split and Run/Stop/Reset/Copy/Download/Fullscreen controls. Its safety and lifecycle must remain distinct from bespoke lab code.
- **Model Laboratory:** Four inline JavaScript + Canvas 2D experiments, special-cased by project ID `model-laboratory`. They use a shared frame and notebook layout. **The 3D loss landscape is projected onto a 2D canvas. It is not WebGL or Three.js.** Its project technology metadata explicitly says `Canvas 2D`.

**Required for new work:** Make both variants conform to a common externally observable contract without forcing the same internal rendering engine. A simulation must not query, mutate, or depend on unrelated page elements. Avoid a global shared animation state; isolate every mounted instance.

### 2. Component input contract

Use the existing `sim` fence format for already-authored generic simulations until a separate migration is approved. The current bespoke lab is identified with `data-lab="loss|nn|graph|cluster"`; these values are implementation IDs, **not** a universal restriction on new types.

**Proposed reusable descriptor (future schema, not currently parsed by the site):**

```yaml
id: loss-landscape
kind: canvas2d-projected-3d   # or canvas2d, webgl, html-js, iframe
version: 1
title: 3D Loss Landscape
summary: Explore a synthetic non-convex loss function
manualStart: true
initialView: completed-preview
controls:
  - { key: learningRate, type: range, min: 0.01, max: 0.25, step: 0.01, default: 0.08 }
  - { key: amplitude, type: range, min: 0.20, max: 1.80, step: 0.05, default: 1.00 }
metrics: [iteration, loss, gradientNorm]
notebook: { question: "...", source: "...", observation: "...", caveat: "..." }
```

Page integration should conceptually be `mountSimulation(container, descriptor)`. No page route, header, or sidebar element belongs inside the simulation descriptor. Host links and related pages should be passed as data, not hard-coded inside the renderer.

**Required instance API:**

```js
// Interface specification; not an existing exported function.
const instance = mountSimulation(container, options);
instance.play();
instance.pause();
instance.step();
instance.reset();
instance.resize();
instance.destroy();
```

Each instance owns its canvas/iframe, event listeners, observers, frame handle, numerical model, and exposed metrics. `destroy()` must be safe to call twice and must release resources. `reset()` restores the documented preview, not an ambiguous halfway-running state.

### 3. DOM structure and CSS isolation

**Observed Model Laboratory hooks:**

```html
<section class="naga-study" data-lab="loss">
  <div class="simulation naga-simulation">
    <div class="toolbar naga-sim-toolbar">
      <span>SIMULATION / 01</span>
      <div class="naga-sim-buttons">
        <button type="button" data-run="play">▶ Play</button>
        <button type="button" data-run="step">Step →</button>
        <button type="button" data-run="reset">↻ Reset</button>
      </div>
    </div>
    <div class="naga-sim-stage">
      <canvas data-canvas aria-label="3D Loss Landscape simulation" tabindex="0"></canvas>
      <span class="naga-sim-caption">DRAG TO ROTATE · SCROLL TO ZOOM</span>
    </div>
    <div class="naga-sim-footer">
      <!-- scoped controls and data-metric fields -->
    </div>
  </div>
  <div class="naga-notebook-inline">
    <!-- research question, source, current observation and methodological caveat -->
  </div>
</section>
```

**Observed hooks:** `.simulation`, `.toolbar`, `.naga-simulation`, `.naga-sim-toolbar`, `.naga-sim-buttons`, `.naga-sim-stage`, `.naga-sim-footer`, `.naga-sim-inputs`, `.naga-sim-metrics`, `.naga-notebook-inline`, `.naga-output`, `[data-lab]`, `[data-canvas]`, `[data-run]`, `[data-metric]`, `[data-source]`, `[data-observation]`.

**Required for new work:** Scope all selectors to each simulation root (e.g. `root.querySelector(...)`). Existing `#sim-rate`, `#sim-amp`, and `#sim-signal` are IDs that work only once per document; replace with per-root data attributes or unique generated IDs before mounting duplicates. Do not require a project-specific wrapper or define global selectors that bleed into other components. The page provides the container and can add its own surrounding heading, TOC, or related links.

### 4. Lifecycle and navigation

**Observed:** `window.initNagaLab()` scans all `[data-lab]` elements and calls `makeController(el)` for each. The detail page calls `initNagaLab` after inserting its HTML. A separate initial-load check retries on DOM readiness / window load. Controllers are kept at `window.__nagaLabControllers` and prior controllers receive `.stop()` during reinitialization. Each controller returns `{stop, resize: render}`.

**Observed limitation:** Stopping an old controller does not disconnect its `ResizeObserver` or remove all canvas event listeners. The `requestAnimationFrame` draw scheduler is also separate from the play loop. The existing code is not a full mount/unmount contract.

**Required for new work:**

1. Mount only after the host container is connected and has non-zero size. Render a completed or representative static preview immediately after the first valid measurement, without requiring pointer interaction.
2. Keep **one owner for every resource** and register listeners/observers through that owner. On route change or component replacement: stop playback, cancel both animation and scheduled redraw frames, disconnect `ResizeObserver`/`IntersectionObserver`, abort or remove listeners, release buffers/textures if applicable, and detach DOM references.
3. Do not initialize the same element twice. Cache controllers by **element identity**, not by a hard-coded expected count of four.
4. If hidden, disconnected, or backgrounded, pause active rendering; resume only according to user preference (do not surprise-start after navigation or tab return).
5. Failed simulation initialization must leave the rest of the page interactive. Display a local error/fallback inside the simulation frame, never crash the route renderer.
6. Updates to one simulation must not reset another simulation's controls, playback, camera, or observations.

### 5. State, controls and notebook contract

**Observed lab:** Every experiment opens at a **finished or illustrative preview**, with no automatic playback. Buttons: **Play/Pause, Step, Reset**. The animation frame loop uses `requestAnimationFrame`, advances at approximately `t - last > 65` ms (~15 updates/sec), and stops at experiment-specific limits. `Reset` calls `preview()`, which reconstructs the representative completed state. Source code appears in a collapsible `details` block; an observation `pre` updates with current data.

**Required for new work:**

- Distinguish `preview`, `playing`, `paused`, `finished`, `error`, and `destroyed` states. A user should always know whether the model is moving.
- Keep one deterministic `advance()` function, one `render()` function, and a `reset()`/preview initializer. Disable or safely handle inputs when destroyed.
- Update visual state, metrics and notebook observation together; never leave stale metrics after reset.
- Controls must be keyboard reachable and have clear accessible names. For custom canvas interactions, add keyboard equivalents and concise instructions, not merely `tabindex="0"`.
- Show **actual model output** and clearly distinguish simulation, approximation, illustration, and trained or measured results. Embedded snippets are explanatory source and may be abbreviated; label them accordingly rather than implying they are the complete executable engine.

## Part B | Look and rendering

### 6. Visual standard observed in the laboratory

| Element | Existing styling |
| --- | --- |
| Outer simulation | 1px `var(--lg)` border, 6px radius, clipped overflow, vertical margins |
| Toolbar | flex, wraps on narrow widths, 9px padding, bottom border |
| Buttons | IBM Plex Mono 11px, 1px `var(--lg)` border, 4px radius, 5px × 9px padding; active state `var(--hl)` and `var(--sec)` |
| Canvas stage | `position: relative`, 300px tall desktop, 250px at max-width 680px, `var(--bg)` background |
| Canvas | width/height 100%, `touch-action: pan-y`, grab/grabbing cursor |
| Caption | lower-left overlay, 9px mono, muted `var(--gr)`, no pointer interception |
| Footer | top border, 12px padding; slider controls use a two-column grid desktop and one column mobile |
| Metrics | compact mono line, flex wrap, labels muted and numeric values `var(--ter)` |
| Notebook | source in `<details>`, current observation in a bordered `<pre>`, research question and explicit caveat |

**Theme:** Use the portfolio's existing semantic variables, especially `--bg`, `--lg`, `--gr`, `--dg`, `--dk`, `--sec`, `--ter`, and `--hl`. Canvas drawing in the existing code reads `--dg` for wire/ink, `--ter` for trajectory/accent, and `--sec` for blue marks. The optional fixed cream diagram/paper exception belongs to the *diagram* norm, not automatically to live canvases. Font families are Source Sans 3 for body, Schibsted Grotesk for headings and IBM Plex Mono for controls/code.

**Required:** No new hard-coded simulation colors, font families, or one-theme-only styles. On a theme change, repaint canvases; CSS variable changes alone do not recolor pixels already drawn. On mobile, labels wrap and canvas must not cause document horizontal overflow.

### 7. Exact 3D loss landscape model and rendering | observed source

**Rendering method:** A **wireframe height field rendered with CanvasRenderingContext2D**. A 3D point `(u, v, z)` is projected through an in-plane yaw rotation and a vertical/elevation projection onto 2D canvas coordinates. There is no `WebGLRenderingContext`, scene graph, camera object, shaders, meshes, depth buffer, or GPU disposal in this implementation.

**Synthetic objective:**

```js
function surface(x, y, amp) {
  return 0.23 * (x*x + y*y) + amp * (
    0.5 * Math.sin(1.6*x) * Math.cos(1.3*y) +
    0.14 * Math.sin(3*y + x)
  );
}
function grad(x, y, amp) {
  const d = 0.001;
  return [
    (surface(x+d, y, amp) - surface(x-d, y, amp)) / (2*d),
    (surface(x, y+d, amp) - surface(x, y-d, amp)) / (2*d)
  ];
}
```

**Gradient descent state:** Initial `(x, y) = (-2.4, 1.8)`, learning rate `0.08`, amplitude `1.0`, maximum 220 steps. Each step appends the current position to the path and subtracts `rate * grad(...)`. Initial preview computes 220 steps and draws the final path. Play starts the trajectory from the beginning. Step advances once. The notebook reports iteration, `(x,y)`, loss, gradient norm, and learning rate.

**Projection, simplified from the actual renderer:**

```js
function project(u, v, z, w, h, yaw, elevation, zoom) {
  const a = u*Math.cos(yaw) - v*Math.sin(yaw);
  const b = u*Math.sin(yaw) + v*Math.cos(yaw);
  const s = Math.min(w/9, h/7) * zoom;
  return [
    w*0.5 + a*s,
    h*0.56 + (b*Math.sin(elevation) - z*Math.cos(elevation)*1.25)*s
  ];
}
```

Defaults: `yaw = -0.55`, `elevation = 0.5`, `zoom = 1`. The grid draws two families of surface lines: for `v = -3.2..3.2` in increments of `0.19`, sample `u = -3.5..3.5` by `0.10`; then for `u = -3.5..3.5` by `0.19`, sample `v = -3.2..3.2` by `0.10`. Stroke each line thin (`0.55px`) with the ink theme variable. Project the optimization path and draw it at `2.5px` in the accent color; draw the current position as a radius-6 dot.

**Interaction:** Pointer down stores the coordinate and captures the pointer. Pointer drag changes `yaw` by `dx * 0.008` and `elevation` by `-dy * 0.005`, clamped to `[0.12, 1.3]`. Wheel prevents default and scales zoom by `0.93` or `1.07`, clamped to `[0.55, 1.75]`. Pointer up/cancel drops drag state. These are *visual camera changes*, not edits to optimization coordinates. The implementation currently does **not** provide an equivalent keyboard camera control.

**Controls and observed bounds:**

- Learning rate `0.01..0.25` step `0.01`, default `0.08`.
- Surface amplitude `0.20..1.80` step `0.05`, default `1.00`.
- Changing either slider updates its readout then regenerates the completed preview.
- Metrics: `ITERATION`, `LOSS`, `∇L NORM`.
- Research question: effect of learning rate on descent across a non-convex synthetic loss surface. **Caveat:** analytic toy objective, not a trained model.

**Required if recreating this component:** Preserve the mathematical function, projection semantics, camera limits, preview-before-play, step/reset behavior, and accompanying observation. Do not swap this to Three.js and claim it is identical. A WebGL replacement is a separate implementation variant and should be deliberately approved and tested.

### 8. Canvas sizing, initial paint and responsiveness

**Observed:** Each render calls `setup()`, reads `canvas.getBoundingClientRect()`, returns early for dimensions below 2 pixels, caps device pixel ratio at 2, sets the canvas bitmap to CSS dimensions × DPR, and uses `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)`. A `ResizeObserver` on the canvas parent schedules redraw via a coalesced `requestAnimationFrame`. Initial `preview()` schedules drawing and an additional double-RAF render is requested to support late layout.

**Required for new work:**

- Measure the container after insertion, then paint **without requiring a click, scroll, slider move or hover**. If initially zero-sized, wait for positive dimensions with `ResizeObserver` and then paint.
- Redraw on actual size change and theme change; do not resize canvas on every animation tick if width, height and DPR are unchanged. Assigning `canvas.width`/`height` resets its drawing state and costs work.
- Keep DPR bounded by performance requirements and only redraw when dimensions or content change. Avoid indefinite RAF polling of a hidden zero-width canvas.
- Account for small touch screens: use an accessible alternative to wheel zoom and ensure dragging does not hijack vertical page scrolling unexpectedly.
- If canvas context creation returns `null`, show text fallback plus captured still and explanation when available.

### 9. Other laboratory experiments | observed source

These are separate simulation kinds with the **same frame, toolbar, source, metrics, and notebook contract**; they must not be baked into the loss surface renderer.

| Kind / `data-lab` | Model and drawing | Controls / metric | Preview |
| --- | --- | --- | --- |
| `nn` | Four layer widths `[3,6,5,2]`; deterministic seeded weights (seed 58), `tanh` feed-forward activations; draw weighted connections and circles on Canvas 2D | Input signal `-1..1`, step `0.01`, initial `0.5`; iteration, first output activation, 4 layers | Fixed input and network diagram |
| `graph` | Nine preset nodes and fifteen edges; illustrative softmax-normalized local edge attention; click nearest node to inspect | Selected node, neighbor count, step/play through illustrative states | Selected node 2 and seed 4 |
| `cluster` | 210 reproducibly generated 2D synthetic points in three groups; repeat nearest-centroid assignment + centroid mean update; colored points and plus-shaped centroids | Iteration, sum of squared distances (inertia), 3 clusters | Nine clustering iterations completed |

**Important:** The network weights are not trained; graph attention scores are illustrative, not learned; K-means points are synthetic. These caveats should remain visible whenever these components are reused.

### 10. Frame timing, efficiency and graceful failure

**Observed:** The lab play loop uses one RAF and advances when at least 65 ms have elapsed; its stopping conditions are loss 220 steps, NN 180 frames, graph 90 frames, and cluster 9 iterations. Preview rendering is demand-driven. No WebGL resources are allocated in this implementation.

**Required for new work:**

- Run one animation loop maximum per mounted instance; cancel it on pause, completion, unmount, and failure. Repeated Play clicks must not create duplicate loops.
- Treat `requestAnimationFrame` as a clock, not a guarantee of fixed FPS; bound expensive updates and handle large time jumps after tab suspension.
- Prefer repaint-on-demand for static previews, parameter edits, camera moves, and resize; do not render perpetually when the simulation is not moving.
- Cap sample counts, path history, memory, event frequency and render work. When adding many canvases to a page, defer heavy work until a panel is visible without delaying its initial representative preview indefinitely.
- If mathematical values become nonfinite, stop that instance and display a local diagnostic rather than drawing corrupted frames.
- Preserve reduced-motion behavior: start with static preview; let users step through the experiment. If reduced motion is requested, do not auto-animate.

### 11. Optional future WebGL / Three.js variant | NOT implemented

If a new simulation genuinely requires GPU 3D (large meshes, lighting, depth testing, shader-based operations), define a separate rendering strategy under this **same component contract**. Do **not** describe the current loss landscape as WebGL.

**Proposed requirements for such a variant:**

- Lazy-load only the approved, pinned rendering dependency; document size and fallback. Never add a large library silently to the existing bundled single HTML file.
- Own scene, camera, renderer, controls, geometries, materials, textures, frame loop, and event listeners per instance. Handle resize, bounded DPR, camera clipping, and user input explicitly.
- Handle WebGL context loss/restoration and device capability failures gracefully.
- Dispose geometries, materials, textures, render targets, listeners and renderer on `destroy()`; do not leave GPU canvases alive across route transitions.
- Keep a non-WebGL static preview or Canvas 2D fallback for unsupported devices, reduced motion, and context loss.
- Record which renderer is actually used. Renderers may share the simulation frame and numerical model but need not share scene or drawing internals.

### 12. Generic `sim` block security

**Observed:** Generic simulations run via an iframe-oriented path, while the Model Laboratory code executes inline in the host document. The two have different isolation properties. Do **not** assume the inline lab has iframe security or that an iframe without verified sandbox restrictions has no network access.

**Required for new work:** If content is user-pasted or untrusted, use an explicitly sandboxed iframe with narrowly scoped permissions and a controlled message channel; sanitize static markup separately. Never evaluate arbitrary externally supplied JS in the host page. If network access is forbidden, enforce a suitable Content Security Policy / sandbox policy and test it rather than merely stating "no network". The inline native lab should include only reviewed, trusted local code. Do not expose page-wide state, credentials, or globals to simulation input.

### 13. Edge cases and failure contract

- Multiple copies of the same simulation on one page: independent states and controls; no ID collision.
- Replace component while playing: stop/cleanup and mount replacement once.
- Hide/show tab, collapse panel, navigate quickly: no leaked RAF, observer, or pointer capture.
- Zero-size or offscreen canvas: wait until measurable, then draw; static fallback if unavailable.
- Theme toggle during pause: redraw with updated theme-derived colors.
- Pointer cancel, multitouch and wheel on mobile: release interactions cleanly and preserve page scroll.
- Long labels, many metrics, narrow phones: wrap without overflow; slider values remain visible.
- Invalid parameter, NaN/Infinity, empty dataset, missing source, browser lacks canvas: local explanatory failure state, no uncaught exception escaping into page routing.
- Several experiments on one page: avoid synchronized unnecessary repaints and excessive CPU use.

### 14. Shipping checklist

**Functional**
- [ ] Opening directly at its route renders a visible canvas and preview with no interaction.
- [ ] Internal navigation to the same route renders identically.
- [ ] Play / Pause / Step / Reset work, stopping conditions are correct, and metrics match what is drawn.
- [ ] Drag, zoom and slider bounds work, with keyboard-accessible equivalents.
- [ ] Each source/observation block corresponds to its actual local experiment.
- [ ] Duplicates of one component mount independently; changing one does not affect others.
- [ ] Route changes and repeated mount/unmount leave no active loops or observers.

**Quality**
- [ ] Dark and light themes repaint correctly; site variables only.
- [ ] Desktop and phone widths work (including touch and horizontal overflow checks).
- [ ] Reduced-motion, keyboard focus, accessible control labels and text fallback are checked.
- [ ] 3D projection still matches the documented formula/controls; no false WebGL/ML-training claims.
- [ ] Malformed input and missing graphics support do not crash the host page.
- [ ] No console errors, long-task spikes, accumulating canvas bitmaps or memory growth during repeated navigation.
- [ ] For a new renderer/dependency, document asset size, cleanup and approved fallback.

### 15. Update procedure / dependency boundaries

1. Locate the component entry in `design_norms_sitemap.md` and its hosting pages, plus `design_norms_global.md` and the relevant page norm. This document itself must never hard-code a page dependency.
2. Classify the change as **contract** (data, lifecycle, inputs/outputs) or **look** (frame, typography, layout, renderer). For a look-only redesign preserve the contract.
3. Make the change inside the simulation's scoped implementation. Add a new `kind`/variant rather than editing page-specific logic for unrelated simulations.
4. If registration or route/link behavior changes, update the sitemap and affected page norm; do not copy the simulation engine into page markup.
5. Verify standalone mount, duplicated mount, direct route load, dark/light, phone, playback, and teardown. Compare with the known working model laboratory reference where applicable.
6. Record source/schema migration and update this changelog. Never silently replace code behavior with an aspirational norm.

## Changelog

- 2026-11-08 | v1 originally documented generic `sim` and special-cased Model Laboratory at a high level.
- 2026-11-08 | v2 expanded from the uploaded HTML's actual Model Laboratory markup, CSS, Canvas 2D 3D projection, numerical experiments, interactions and lifecycle; separated observed code from new reliability and optional WebGL requirements.


---
**Next.js v2.1 implementation note (2026-11-08):** This norm defines design/behavioral intent. Its visible implementation currently remains in `public/legacy.html` (legacy hash router) presented through `src/components/LegacyPortfolio/index.tsx`; there is **no active matching native React leaf component**. When modifying this feature, consult `context_router.md` and `rules/nextjs_crud.md`, update the active HTML handlers/styles first, and validate all consumers listed in the sitemap. Any future isolated React component must preserve the same contract, responsive behavior and dark/light visuals before replacing the legacy fragment.
