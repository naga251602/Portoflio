/** Procedural surface engine. Draw logic from v7.7, no HTML rendering. */
export async function mountSurface(canvas, props = {}) {
  if(!canvas) return () => { };
  if(props.source === 'module') {
    const id = String(props.module || '');
    const modules = { 'loss-landscape': () => import('./presets/loss-landscape.js') };
    if(!modules[id]) throw Error('Unknown trusted 3D module.');
    const mod = await modules[id](); return mod.mount(canvas, props.parameters ?? {});
  }
  const ctx = canvas.getContext('2d'); let yaw = .8, drag = false, lastX = 0, frame = null, active = true; const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const down = e => { drag = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId) }, up = () => drag = false, move = e => { if(drag) { yaw += (e.clientX - lastX) * .009; lastX = e.clientX; draw() } };
  canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointerup', up); canvas.addEventListener('pointermove', move);
  const height = Math.max(.2, Math.min(3, Number(props.parameters?.height ?? 1.6)));
  function project(x, y, z) { const a = x * Math.cos(yaw) + z * Math.sin(yaw), b = -x * Math.sin(yaw) + z * Math.cos(yaw); return [320 + a * 69, 210 + y * 48 - b * 34] }
  function draw() { ctx.clearRect(0, 0, 640, 360); ctx.lineWidth = 1.1; for(let dir = 0; dir < 2; dir++)for(let i = -11; i <= 11; i++) { ctx.beginPath(); for(let j = -35; j <= 35; j++) { const x = (dir ? j : i) / 10, y = (dir ? i : j) / 10, z = height * Math.exp(-.8 * (x * x + y * y)) * Math.cos(x * 2) * Math.sin(y * 2); const pt = project(x, y, z); if(j === -35) ctx.moveTo(...pt); else ctx.lineTo(...pt) } ctx.strokeStyle = dir ? 'rgba(245,165,36,.52)' : 'rgba(116,147,173,.48)'; ctx.stroke() } }
  function animate() { if(!active) return; if(!drag) yaw += .002; draw(); if(!document.hidden && !reduce) frame = requestAnimationFrame(animate) };
  if(reduce) draw(); else animate();
  return () => { active = false; if(frame !== null) cancelAnimationFrame(frame); canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointerup', up); canvas.removeEventListener('pointermove', move) };
}
