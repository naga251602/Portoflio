import { Suspense } from 'react';
import Collection from '@/components/Collection';
import { getAll, getOthers } from '@/lib/data_loader';
export const metadata = { title: 'Others | Gaurav N V' };
export default function Page() { return <Suspense fallback={<p className="py-8 text-dim">Loading collection…</p>}><Collection items={getOthers()} category="others" title="Others" /></Suspense> }
