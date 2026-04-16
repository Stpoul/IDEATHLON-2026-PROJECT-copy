import { useState } from 'react';
import { Flame, Zap, X, Heart } from 'lucide-react';

const SCENARIOS = [
  { e:'🔧', t:'Dismantle a radio to see how it works', c:'Technical' },
  { e:'✍️', t:'Write a story about someone else\'s life', c:'Creative' },
  { e:'🔬', t:'Perform a science experiment at home', c:'Science' },
];

export default function SwipeScreen({ onNavigate }) {
  const [idx, setIdx] = useState(0);

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] screen-enter p-6">
      <div className="mb-6">
        <h1 className="text-[var(--foreground)] text-3xl font-extrabold">Discover</h1>
        <p className="text-[var(--muted-foreground)] text-sm">Swipe your preferences</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full bg-[var(--card)] rounded-3xl p-8 shadow-xl border border-[var(--border)] text-center">
          <div className="text-6xl mb-4">{SCENARIOS[idx].e}</div>
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-2 block">{SCENARIOS[idx].c}</span>
          <p className="text-[var(--foreground)] text-xl font-bold">{SCENARIOS[idx].t}</p>
        </div>
      </div>

      <div className="flex justify-center gap-6 py-8">
        <button onClick={() => setIdx((idx + 1) % SCENARIOS.length)} className="w-16 h-16 rounded-full bg-white border border-red-200 text-red-500 flex items-center justify-center shadow-lg"><X /></button>
        <button onClick={() => onNavigate('bridge')} className="w-20 h-20 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-lg"><Heart fill="white" strokeWidth={0} /></button>
      </div>
    </div>
  );
}