/** Matching v7.7 icon strokes (brand marks are local assets). */
const PATHS = {
  graph: <><circle cx="5" cy="12" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="19" cy="18" r="2" /><path d="M7 11l10-4M7 13l10 4" /></>,
  work: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  skills: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />, tool: <path d="M14 6a4 4 0 0 0 5 5l-9 9a2 2 0 0 1-3-3z" />,
  github: <><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="9" r="2" /><path d="M6 7v10M18 11c0 4-6 3-12 6" /></>,
  arrow: <path d="M7 17L17 7M8 7h9v9" />, down: <path d="M12 5v14M6 13l6 6 6-6" />, file: <path d="M6 2h8l5 5v15H6zM14 2v6h5M9 13h7M9 17h7" />,
  pin: <><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2" /></>,
  cite: <><path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9" /><path d="M8 11h8M8 15h6M15 3h6v6M21 3l-8 8" /></>,
  research: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c-6 6-6 12 0 18M12 3c6 6 6 12 0 18" /></>,
  others: <path d="M4 5h7v7H4zM13 5h7v7h-7zM4 14h7v7H4zM13 14h7v7h-7z" />
};
export function Icon({ name, className = 'w-4 h-4' }) { return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{PATHS[name] || PATHS.arrow}</svg> }
export function GithubBrand() { return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.53v-2.06c-3.1.68-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.02-.69.08-.67.08-.67 1.12.08 1.71 1.15 1.71 1.15 1 .1.75.03 2.2.03.24-.72.61-1.2 1.11-1.49-2.48-.28-5.09-1.24-5.09-5.49 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.5 10.5 0 0 1 5.56 0c2.12-1.44 3.06-1.14 3.06-1.14.6 1.53.22 2.67.1 2.95.72.78 1.15 1.77 1.15 2.98 0 4.26-2.61 5.2-5.1 5.48.63.55 1.19 1.63 1.19 3.28V22c0 .3.2.64.77.53A11.1 11.1 0 0 0 12 .9Z" /></svg> }
export function LinkedinBrand() { return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 18.5H5.4V10H8v8.5ZM6.7 8.8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm11.8 9.7h-2.6v-4.2c0-1-.02-2.2-1.35-2.2-1.35 0-1.55 1.05-1.55 2.14v4.26h-2.6V10h2.5v1.16h.04a2.75 2.75 0 0 1 2.47-1.36c2.65 0 3.14 1.74 3.14 4v4.7Z" /></svg> }
