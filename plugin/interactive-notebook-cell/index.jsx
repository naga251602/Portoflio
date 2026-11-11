'use client';
/** v7.7 notebook: immutable provided source, replay or isolated sandboxed JavaScript. */
import { useEffect, useRef, useState } from 'react';
export default function InteractiveNotebookCell({ props = {} }) {  
const language = String(props.language || 'python'), [output, setOutput] = useState('Out [ ]: Run to display output.'), [running, setRunning] = useState(false), timer = useRef(null), frame = useRef(null), cancel = useRef(() => { });
  useEffect(() => () => { clearTimeout(timer.current); cancel.current(); frame.current?.remove() }, []);
  function run() {    
clearTimeout(timer.current); cancel.current(); frame.current?.remove(); frame.current = null; setRunning(true); setOutput('Executing…');
    if(props.execution === 'live' && language === 'javascript') {
      // Preserve the original security boundary: an opaque-origin iframe without DOM/storage permissions.
      const token = crypto.randomUUID(), iframe = document.createElement('iframe'); iframe.setAttribute('sandbox', 'allow-scripts'); iframe.hidden = true; frame.current = iframe;
      const escaped = JSON.stringify(String(props.code || '')).replace(/</g, '\\u003c');
      iframe.srcdoc = `<script>const out=[];try{const console={log:(...a)=>out.push(a.map(String).join(' '))};const result=Function('console',${escaped})(console);parent.postMessage({token:${JSON.stringify(token)},result:out.join('\\n')||String(result??'')},'*')}catch(e){parent.postMessage({token:${JSON.stringify(token)},error:String(e)},'*')}<\/script>`;
      const onMessage = e => { if(e.source !== iframe.contentWindow || e.data?.token !== token) return; window.removeEventListener('message', onMessage); clearTimeout(timer.current); setOutput(e.data.error ? `Error: ${e.data.error}` : e.data.result); setRunning(false); iframe.remove(); frame.current = null };
      window.addEventListener('message', onMessage); cancel.current = () => window.removeEventListener('message', onMessage); document.body.appendChild(iframe);
      timer.current = setTimeout(() => { cancel.current(); frame.current?.remove(); frame.current = null; setOutput('Execution timed out.'); setRunning(false) }, 2500);
    } else timer.current = setTimeout(() => { setOutput(typeof props.output === 'string' ? props.output : JSON.stringify(props.output ?? 'No saved output configured.', null, 2)); setRunning(false) }, 700)
  }
  return <div className="demo-shell notebook-cell"><div className="demo-header"><span>NOTEBOOK CELL · {language.toUpperCase()}</span><span>In [1]</span></div><pre className="code-sample"><code>{props.code ?? ''}</code></pre><div className="demo-body"><button className="run-btn" type="button" disabled={running} onClick={run}>▶ Run</button><pre className="notebook-output" aria-live="polite">{output}</pre><div className="demo-caption">{props.execution === 'live' && language === 'javascript' ? 'Sandboxed JavaScript execution' : 'Saved output replay · no code execution'}</div></div></div>
}
