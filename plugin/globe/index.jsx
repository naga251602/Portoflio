'use client';
/** Canvas and clock markup copied from v7.7; drawing engine unchanged. */
import { useEffect, useRef, useState } from 'react';
import { mount } from './engine';
import { Icon } from '@/components/Icons';
const timeFormat = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
const dateFormat = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', weekday: 'short', month: 'short', day: 'numeric' });
const zoneFormat = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', timeZoneName: 'short' });
export default function Globe({ loc }) {
  const canvas = useRef(null), [now, setNow] = useState(null);
  useEffect(() => mount(canvas.current, loc), [loc.lat, loc.lon]);
  useEffect(() => { const tick = () => setNow(new Date()); tick(); const interval = setInterval(tick, 1000); return () => clearInterval(interval) }, []);
  return <aside className="rounded-2xl border border-line bg-card p-4 sm:w-52 shrink-0 text-center"><canvas ref={canvas} id="globe" width="400" height="400" className="w-full max-w-[180px] mx-auto aspect-square" aria-label="Rotating globe" /><div className="mt-2 flex items-center justify-center gap-1.5 text-sm"><span className="text-hot"><Icon name="pin" className="w-3.5 h-3.5" /></span>{loc.city}</div><div id="clock" className="mt-1 font-mono text-lg tracking-tight">{now ? timeFormat.format(now) : '--:--:--'}</div><div id="clockd" className="font-mono text-[11px] text-dim">{now ? `${dateFormat.format(now)} | ${zoneFormat.formatToParts(now).find(p => p.type === 'timeZoneName').value}` : ''}</div></aside>
}
