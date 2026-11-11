'use client';
/** Native rich plugin registry; each component is imported only for the detail that uses it. */
import dynamic from 'next/dynamic';
const plugins = {
  'single-screenshot': dynamic(() => import('@/plugin/single-screenshot')),
  'screenshot-carousel': dynamic(() => import('@/plugin/screenshot-carousel')),
  'architecture-diagram': dynamic(() => import('@/plugin/architecture-diagram')),
  'code-viewer': dynamic(() => import('@/plugin/code-viewer')),
  'interactive-notebook-cell': dynamic(() => import('@/plugin/interactive-notebook-cell')),
  'animated-notebook-output': dynamic(() => import('@/plugin/animated-notebook-output')),
  'simulation-3d': dynamic(() => import('@/plugin/simulation-3d'))
};
export default function PluginRenderer({ type, props }) { const Component = plugins[type]; return Component ? <Component props={props} /> : <p className="text-dim">Unsupported plugin: {type}</p> }
