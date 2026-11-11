'use client';
/** v7.7 3D panel with trusted procedural presets or self-hosted GLB model assets. */
import { useEffect, useRef, useState } from 'react';
import { mountSurface } from './canvas-engine';
const validAsset = x => typeof x === 'string' && /^\/assets\/models\/[\w./-]+\.(?:glb|gltf)$/i.test(x) && !x.includes('..');
export default function Simulation3D({ props = {} }) {  
const canvas = useRef(null), [message, setMessage] = useState(props.source === 'model' ? 'Loading 3D model…' : ''), [modelReady, setModelReady] = useState(false);
  const source = props.source, asset = props.asset;
  useEffect(() => { if(source === 'model') return; let disposed = false, cleanup = () => { }; mountSurface(canvas.current, props).then(fn => { if(disposed) fn?.(); else cleanup = fn || (() => { }) }).catch(err => { if(!disposed) setMessage(err.message) }); return () => { disposed = true; cleanup() } }, [source, props.module, props.parameters?.height]);
  useEffect(() => {    
if(source !== 'model') return; let disposed = false; if(!validAsset(asset)) { setMessage('Invalid model path: use /assets/models/your-model.glb'); return; } const controller = new AbortController();
    fetch(asset, { method: 'HEAD', signal: controller.signal }).then(r => { if(!r.ok) throw Error('Model unavailable'); return import('@google/model-viewer') }).then(() => { if(!disposed) { setModelReady(true); setMessage('') } }).catch(() => { if(!disposed) setMessage('3D asset unavailable. Add the GLB/GLTF file to public/assets/models/.') }); return () => { disposed = true; controller.abort() }  
}, [source, asset]);
  if(source === 'model') return <div className="demo-shell"><div className="demo-header">3D MODEL · INTERACTIVE</div><div className="demo-body"><div className="model-container" data-model={asset || ''}>{modelReady ? <model-viewer src={asset} camera-controls="" auto-rotate="" style={{ display: 'block', width: '100%', height: 340, background: '#0c0c0f' }} /> : <p className="text-sm text-dim">{message}</p>}</div><div className="demo-caption">GLB/GLTF asset · orbit controls</div></div></div>;
  return <div className="demo-shell"><div className="demo-header"><span>3D SURFACE · INTERACTIVE</span><span>DRAG TO ROTATE</span></div><div className="demo-body"><canvas ref={canvas} className="sim-canvas" width={640} height={360} aria-label="Interactive 3D mathematical surface" />{message && <p className="text-sm text-dim">{message}</p>}<div className="demo-caption">Procedural visualization · configured via JSON</div></div></div>
}
