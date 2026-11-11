/**
 * Usage: Rotating map-style globe in the hero. Entrypoint implementing render/mount as applicable.
 * Edit guidance: see /llm-guide.md; preserve public exports, IDs and class hooks.
 */
// Globe with embedded simplified continent outlines (no network request required).
export function mount(canvas, loc) {
  const cv = canvas; if(!cv) return () => { }; const ctx = cv.getContext('2d'); let frame = null; let disposed = false;
  const size = cv.width, center = size / 2, radius = size * .44, tilt = 22 * Math.PI / 180;
  const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const rad = d => d * Math.PI / 180;
  // Simplified coastlines, [longitude, latitude], for a lightweight recognizable world.
  const land = [
    [[-168, 65], [-158, 71], [-144, 70], [-137, 61], [-130, 55], [-125, 49], [-124, 42], [-117, 32], [-111, 30], [-105, 24], [-98, 17], [-91, 17], [-86, 21], [-82, 25], [-80, 30], [-75, 35], [-70, 43], [-65, 47], [-60, 53], [-53, 56], [-56, 62], [-70, 60], [-81, 64], [-95, 72], [-110, 71], [-125, 72], [-140, 69], [-154, 61]],
    [[-81, 12], [-75, 9], [-71, 11], [-62, 10], [-57, 7], [-50, 3], [-47, -4], [-40, -11], [-38, -18], [-43, -23], [-48, -29], [-53, -34], [-59, -39], [-66, -50], [-71, -55], [-75, -46], [-74, -36], [-71, -29], [-70, -20], [-77, -10], [-79, -1]],
    [[-52, 59], [-42, 59], [-39, 65], [-43, 73], [-49, 82], [-59, 83], [-61, 77], [-54, 70]],
    [[-11, 36], [-5, 43], [2, 44], [8, 43], [13, 46], [19, 45], [23, 40], [28, 41], [31, 46], [26, 52], [20, 55], [13, 55], [8, 58], [5, 63], [10, 70], [22, 71], [31, 69], [39, 65], [47, 60], [54, 60], [62, 57], [72, 56], [81, 55], [90, 54], [103, 49], [115, 52], [124, 50], [132, 46], [139, 39], [142, 34], [137, 32], [132, 35], [126, 39], [121, 33], [115, 24], [107, 18], [106, 9], [103, 2], [97, 4], [94, 15], [88, 21], [82, 21], [77, 8], [73, 9], [70, 20], [66, 24], [59, 24], [53, 16], [49, 12], [44, 12], [42, 19], [37, 21], [34, 28], [27, 32], [19, 33], [11, 37], [5, 36], [-1, 36], [-5, 36]],
    [[-17, 35], [-6, 37], [8, 37], [13, 33], [24, 32], [33, 31], [35, 26], [43, 12], [50, 11], [44, 1], [41, -12], [35, -19], [33, -27], [27, -34], [19, -35], [13, -29], [11, -18], [7, -7], [2, 4], [-5, 5], [-9, 14], [-16, 20]],
    [[113, -11], [119, -17], [128, -14], [136, -12], [145, -15], [153, -24], [151, -33], [145, -39], [137, -36], [130, -32], [123, -33], [115, -27], [112, -21]],
    [[47, -13], [50, -16], [50, -25], [46, -26], [44, -19]],
    [[-9, 58], [-5, 58], [-3, 54], [-6, 50], [-10, 53]],
    [[130, 31], [133, 35], [137, 37], [141, 43], [145, 45], [143, 36], [139, 33]],
    [[-180, -72], [-130, -70], [-80, -72], [-30, -70], [25, -72], [70, -70], [125, -72], [180, -72], [180, -87], [-180, -87]]
  ];
  function proj(lat, lon, rot) { const f = rad(lat), dl = rad(lon - rot); return { x: center + radius * Math.cos(f) * Math.sin(dl), y: center - radius * (Math.cos(tilt) * Math.sin(f) - Math.sin(tilt) * Math.cos(f) * Math.cos(dl)), v: Math.sin(tilt) * Math.sin(f) + Math.cos(tilt) * Math.cos(f) * Math.cos(dl) }; }
  function line(points, color) { ctx.strokeStyle = color; ctx.lineWidth = 1.15; ctx.beginPath(); let prior = false; for(const p of points) { if(p.v > 0) { if(prior) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); prior = true } else prior = false } ctx.stroke() }
  function coast(poly, rot) {
    // Clip every coastline segment at the horizon, avoiding opposite-side lines.
    ctx.beginPath(); let open = false;
    const pts = poly.map(([lon, lat]) => proj(lat, lon, rot)); pts.push(pts[0]);
    for(const p of pts) { if(p.v > 0) { if(open) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); open = true } else open = false; }
    ctx.strokeStyle = '#c2a06b'; ctx.lineWidth = 1.7; ctx.stroke();
    // Dots spread through coastal regions give the world some texture.
    ctx.fillStyle = 'rgba(196,154,90,.35)'; for(let i = 0; i < pts.length - 1; i++) { const p = pts[i]; if(p.v > .1) { ctx.beginPath(); ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2); ctx.fill() } }
  }
  function draw(t) {
    const rot = still ? loc.lon : loc.lon + (t * .0065) % 360;
    ctx.clearRect(0, 0, size, size);
    let grad = ctx.createRadialGradient(center - radius * .35, center - radius * .38, 5, center, center, radius * 1.2);
    grad.addColorStop(0, '#25201a'); grad.addColorStop(.7, '#141518'); grad.addColorStop(1, '#09090b');
    ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(center, center, radius, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(center, center, radius, 0, Math.PI * 2); ctx.clip();
    for(let lon = -180; lon < 180; lon += 30) { let pts = []; for(let lat = -90; lat <= 90; lat += 4)pts.push(proj(lat, lon, rot)); line(pts, 'rgba(112,100,83,.20)') }
    for(let lat = -60; lat <= 60; lat += 30) { let pts = []; for(let lon = -180; lon <= 180; lon += 4)pts.push(proj(lat, lon, rot)); line(pts, 'rgba(112,100,83,.20)') }
    for(const polygon of land) coast(polygon, rot);
    let shade = ctx.createLinearGradient(center - radius, 0, center + radius, 0); shade.addColorStop(0, 'rgba(0,0,0,.65)'); shade.addColorStop(.55, 'rgba(0,0,0,0)'); shade.addColorStop(1, 'rgba(0,0,0,.38)'); ctx.fillStyle = shade; ctx.fillRect(center - radius, center - radius, radius * 2, radius * 2);
    ctx.restore(); ctx.strokeStyle = '#4d3b25'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(center, center, radius, 0, Math.PI * 2); ctx.stroke();
    const m = proj(loc.lat, loc.lon, rot); if(m.v > 0) { const pulse = still ? 0 : (t / 1600) % 1; ctx.strokeStyle = `rgba(245,165,36,${.5 * (1 - pulse)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(m.x, m.y, 8 + 24 * pulse, 0, Math.PI * 2); ctx.stroke(); ctx.fillStyle = '#f5a524'; ctx.beginPath(); ctx.arc(m.x, m.y, 5, 0, Math.PI * 2); ctx.fill() }
    if(!still && !disposed) frame = requestAnimationFrame(draw);
  }
  frame = requestAnimationFrame(draw);
  return () => { disposed = true; if(frame !== null) cancelAnimationFrame(frame); };
}
