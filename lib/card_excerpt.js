/** React-safe version of the v7.7 excerpt: React handles escaping during render. */
export const CARD_TEXT_LIMIT = 70;
export function cardExcerpt(value) { const s = String(value ?? '').replace(/\s+/g, ' ').trim(); return s.length > CARD_TEXT_LIMIT ? s.slice(0, CARD_TEXT_LIMIT - 1).trimEnd() + '…' : s; }
