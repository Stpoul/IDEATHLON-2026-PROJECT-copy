import { CheckCircle2, Star, Lock, Sparkles, Zap, ChevronRight } from 'lucide-react';

const NODES = [
  { key: 'discovery', label: 'Discovery', sub: 'Completed', status: 'completed', Icon: Sparkles },
  { key: 'skills',    label: 'Core Skills', sub: 'In progress', status: 'active',    Icon: Zap      },
  { key: 'bridge',    label: 'The Bridge',  sub: 'Locked',       status: 'locked',    Icon: Lock     },
];

export default function RoadmapScreen({ onNavigate }) {
  return (
    <div className="flex-1 flex flex-col bg-[var(--card)] screen-enter">
      <div className="px-5 pt-12 pb-5">
        <h1 className="text-[var(--foreground)] text-2xl font-extrabold">Your Journey</h1>
        <p className="text-[var(--muted-foreground)] text-sm">Welcome back to your personalized path.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {NODES.map((n, i) => (
          <div key={n.key} className="flex items-stretch gap-4 mb-4">
            <div className="flex flex-col items-center w-10 shrink-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${n.status === 'completed' ? 'bg-emerald-500' : n.status === 'active' ? 'bg-[var(--primary)]' : 'bg-slate-100'}`}>
                {n.status === 'completed' ? <CheckCircle2 size={18} /> : <n.Icon size={18} />}
              </div>
              {i < NODES.length - 1 && <div className="w-0.5 flex-1 my-1 bg-slate-200" />}
            </div>
            <div className={`flex-1 p-4 rounded-2xl border ${n.status === 'active' ? 'bg-indigo-50 border-indigo-100' : 'bg-white border-slate-100'}`}>
              <p className="font-bold text-[var(--foreground)]">{n.label}</p>
              <p className="text-xs text-[var(--muted-foreground)]">{n.sub}</p>
              {n.status === 'active' && (
                <button onClick={() => onNavigate('swipe')} className="mt-3 w-full bg-[var(--primary)] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1">
                  Continue Journey <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}