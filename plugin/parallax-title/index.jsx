'use client';
/** Standalone title plugin for other pages, powered by exact v7.7 scroll engine. */
import { useEffect, useRef } from 'react';
import { mount } from './engine';
export default function ParallaxTitle({ title, subtitle }) { const root = useRef(null); useEffect(() => mount(root.current), []); return <div ref={root}><div className="detail-hero"><div className="detail-glow" /><div className="detail-kicker">{subtitle || 'FIELD NOTES'}</div><h1 className="detail-title">{title}</h1></div></div> }
