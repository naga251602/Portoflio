export const slug = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const detailHref = (category, item) => `/detail/${category}/${item.id}`;
export const collectionHref = category => `/${category === 'projects' ? 'projects' : category}`;
export const cleanIntro = (text, max = 69) => { const plain = String(text || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); return plain.length > max ? plain.slice(0, max - 1).trimEnd() + '…' : plain; };
