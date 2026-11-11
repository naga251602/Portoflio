/** Exact data-URI artwork algorithms extracted from v7.7; no image replacements. */
export function artUrl(seed, w = 480, h = 260) {
  let x = seed * 9301 + 49297; const r = () => ((x = (x * 9301 + 49297) % 233280) / 233280);
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#0d0d10"/>`;
  for(let k = 0; k < 9; k++) { const cx = r() * w, cy = r() * h, rad = 20 + r() * 90, hot = k % 4 === 0; s += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${rad.toFixed(0)}" fill="none" stroke="${hot ? '#f5a524' : '#2a2a31'}" stroke-width="${hot ? 1.5 : 1}"/>` }
  for(let k = 0; k < 6; k++)s += `<line x1="${(r() * w).toFixed(0)}" y1="0" x2="${(r() * w).toFixed(0)}" y2="${h}" stroke="#1a1a1f"/>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(s + '</svg>');
}
export function heroArtUrl() {
  const w = 960, h = 300; let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><radialGradient id="g" cx="75%" cy="35%" r="65%"><stop offset="0" stop-color="#f5a524" stop-opacity=".38"/><stop offset="1" stop-color="#09090b" stop-opacity="0"/></radialGradient></defs><rect width="${w}" height="${h}" fill="#0a0a0d"/><rect width="${w}" height="${h}" fill="url(#g)"/>`;
  for(let k = 0; k < 20; k++) { const hot = k % 5 === 0; s += `<ellipse cx="720" cy="130" rx="${40 + k * 36}" ry="${18 + k * 13}" fill="none" stroke="${hot ? '#f5a524' : '#24242a'}" stroke-width="1" opacity="${hot ? .85 : 1}" transform="rotate(-16 720 130)"/>` }
  for(let k = 0; k < 40; k++)s += `<circle cx="${(k * 53 + 20) % w}" cy="${(k * 97 + 15) % h}" r="1.2" fill="#555560"/>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(s + '</svg>');
}
