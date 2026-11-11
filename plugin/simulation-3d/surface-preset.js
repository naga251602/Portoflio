/**
 * Usage: Interactive mathematical surface or a 3D model asset. Trusted procedural surface helper.
 * Edit guidance: see /llm-guide.md; preserve public exports, IDs and class hooks.
 */
export function mount(canvas, params = {}) {
  const ctx = canvas.getContext('2d'); let angle = .7, id, active = true; const height = Math.min(3, Math.max(.2, Number(params.height || 1.6)));
  function draw() { ctx.clearRect(0, 0, 640, 360); for(let i = -14; i <= 14; i++) { ctx.beginPath(); for(let j = -25; j <= 25; j++) { const x = i / 8, y = j / 8, z = height * Math.exp(-(x * x + y * y) * .6) * Math.cos(x * 2 + y); const xx = x * Math.cos(angle) + z * Math.sin(angle), zz = z * Math.cos(angle) - x * Math.sin(angle); const px = 320 + xx * 65, py = 195 + y * 45 - zz * 30; j === -25 ? ctx.moveTo(px, py) : ctx.lineTo(px, py) } ctx.strokeStyle = 'rgba(245,165,36,.65)'; ctx.stroke() } if(active && !matchMedia('(prefers-reduced-motion:reduce)').matches) { angle += .003; id = requestAnimationFrame(draw) } }
  draw(); return () => { active = false; cancelAnimationFrame(id) };
}
