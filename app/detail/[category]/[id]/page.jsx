import { notFound } from 'next/navigation';
import { getAll, getOthers, getById } from '@/lib/data_loader';
import { Details } from '@/components/Details';
export function generateStaticParams() { return ['projects', 'research', 'experience', 'contributions'].flatMap(category => getAll(category).map(item => ({ category, id: item.id }))).concat(getOthers().map(item => ({ category: 'others', id: item.id }))) }
export async function generateMetadata({ params }) { const { category, id } = await params; const item = category === 'others' ? getOthers().find(x => x.id === id) : getById(category, id); return { title: `${item?.title || item?.role || 'Not found'} | Gaurav N V` } }
export default async function Page({ params }) { const { category, id } = await params; const item = category === 'others' ? getOthers().find(x => x.id === id) : getById(category, id); if(!item) notFound(); return <Details item={item} category={category} /> }
