'use client';
import { useState } from 'react';
/** Read-only v7.7 code area with copy action. */
export default function CodeViewer({ props = {} }) { const code = String(props.code || '# Illustrative example\nfor item in stream:\n    process(item)'), [copied, setCopied] = useState(false); return <div className="demo-shell"><div className="demo-header"><span>CODE AREA / READ ONLY</span><button type="button" className="copy-code text-[#a4bed0] hover:text-hot" onClick={async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { window.prompt('Copy snippet', code) } }}>{copied ? 'Copied' : 'Copy snippet'}</button></div><pre className="code-sample"><code>{code}</code></pre></div> }
