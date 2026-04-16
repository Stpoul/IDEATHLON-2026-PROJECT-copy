import { useState } from 'react';
import { Flame, Zap, X, Heart } from 'lucide-react';

const SCENARIOS = [
  { e:'🔧', t:'Dismantle a radio to see how it works', c:'Technical' },
  { e:'📚', t:'"I wish my teachers used more hands-on experiments in class."', c:'Teaching Style' }, // Feedback for teachers
  { e:'✍️', t:'Write a story about someone else\'s life', c:'Creative' },
  { e:'💡', t:'"I find it easier to learn through videos than lectures."', c:'Teaching Style' }, // Feedback for teachers
];

export default function SwipeScreen({ onNavigate, globalStreak }) {
  const [idx, setIdx] = useState(0);

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] screen-enter p-6">
      <div className="px-0 pt-8 pb-4">
        <h1 className="text-[var(--foreground)] text-3xl font-[800]">Discover</h1>
      </div>

      <div className="flex gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2.5 bg-indigo-100 dark:bg-indigo-900 rounded-2xl p-3"><Zap size={18} className="text-indigo-600 dark:text-indigo-300"/><span className="text-indigo-700 dark:text-indigo-200 text-sm font-bold">Level 8</span></div>
        <div className="flex-1 flex items-center gap-2.5 bg-orange-100 dark:bg-orange-900 rounded-2xl p-3"><Flame size={18} className="text-orange-500"/><span className="text-orange-600 dark:text-orange-300 text-sm font-bold">{globalStreak} Day Streak</span></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full bg-[var(--card)] rounded-3xl p-8 shadow-xl border border-[var(--border)] text-center">
          <div className="text-6xl mb-4">{SCENARIOS[idx].e}</div>
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-2 block">{SCENARIOS[idx].c}</span>
          <p className="text-[var(--foreground)] text-xl font-bold">{SCENARIOS[idx].t}</p>
        </div>
      </div>

      <div className="flex justify-center gap-6 py-8">
        <button onClick={() => setIdx((idx + 1) % SCENARIOS.length)} className="w-16 h-16 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--danger)] flex items-center justify-center active:scale-95 transition-all"><X /></button>
        <button onClick={() => onNavigate('bridge')} className="w-20 h-20 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"><Heart fill="white" strokeWidth={0} /></button>
      </div>
    </div>
  );
}