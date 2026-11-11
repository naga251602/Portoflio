/**
 * Usage: mount(detailRoot) animates the detail-page heading during window scrolling.
 * Movement is relative to the detail hero, and always cleans up listeners on navigation.
 */
export function mount(root = document) {
  const title = root.querySelector('.detail-title');
  const hero = root.matches?.('.detail-hero') ? root : root.querySelector('.detail-hero');
  if(!title || !hero) return () => { };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frameId = 0;
  let lastProgress = -1;

  function update() {
    frameId = 0;
    if(!title.isConnected) return;
    if(reducedMotion.matches) {
      title.style.removeProperty('--parallax-y');
      title.style.removeProperty('--parallax-x');
      title.style.removeProperty('--parallax-scale');
      title.style.removeProperty('--parallax-opacity');
      return;
    }

    // Relative to the document, so hashes, browser history and late plugin mounts all work.
    const heroTop = hero.getBoundingClientRect().top;
    const scrolled = Math.max(0, -heroTop);
    const progress = Math.min(1, scrolled / 310);
    if(progress === lastProgress) return;
    lastProgress = progress;

    // Do not cancel page movement with near-1:1 downward translation.
    // Instead the title visibly drifts left/up, contracts, and softly fades.
    title.style.setProperty('--parallax-y', `${(-48 * progress).toFixed(1)}px`);
    title.style.setProperty('--parallax-x', `${(-24 * progress).toFixed(1)}px`);
    title.style.setProperty('--parallax-scale', (1 - .14 * progress).toFixed(3));
    title.style.setProperty('--parallax-opacity', (1 - .38 * progress).toFixed(3));
  }

  function schedule() { if(!frameId) frameId = requestAnimationFrame(update); }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  reducedMotion.addEventListener?.('change', schedule);
  update();

  return () => {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    reducedMotion.removeEventListener?.('change', schedule);
    if(frameId) cancelAnimationFrame(frameId);
    for(const property of ['--parallax-y', '--parallax-x', '--parallax-scale', '--parallax-opacity']) {
      title.style.removeProperty(property);
    }
  };
}
