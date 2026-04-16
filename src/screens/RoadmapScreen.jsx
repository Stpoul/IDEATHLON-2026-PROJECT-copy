import { Sparkles, Zap, Lock, CheckCircle2, Star, ChevronRight } from 'lucide-react';

const NODES = [
  { key: 'discovery', label: 'Curiosity', sub: 'Completed', status: 'completed', Icon: Sparkles },
  { key: 'skills',    label: 'Core Skills', sub: 'Active',    status: 'active',    Icon: Zap      },
  { key: 'bridge',    label: 'The Bridge',  sub: 'Locked',    status: 'locked',    Icon: Lock     },
];

export default function RoadmapScreen({ onNavigate, globalXp }) {
  // Mentor Feedback: Pet Function
  const petStage = globalXp < 200 ? '🥚' : globalXp < 400 ? '🐣' : '🐥';
  const petLevel = Math.floor(globalXp / 100);

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] screen-enter px-5 pb-8">
      <div className="pt-12 pb-5 flex justify-between items-end">
        <div>
          <p className="text-[var(--muted-foreground)] text-xs font-medium">Liberec Region Hub 👋</p>
          <h1 className="text-[var(--foreground)] text-2xl font-extrabold mt-0.5">Jan's Journey</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl animate-bounce">{petStage}</div>
          <span className="text-[10px] font-bold text-[var(--primary)] uppercase">Pet Lvl {petLevel}</span>
        </div>
      </div>

      <div className="mb-6 bg-[var(--primary)] rounded-2xl p-4 shadow-lg text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2"><Star size={14} fill="white"/><span className="font-bold text-sm">Level 8</span></div>
          <span className="text-white/70 text-xs font-semibold">{globalXp} / 600 XP</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${(globalXp/600)*100}%` }} />
        </div>
      </div>

      <div className="flex-1">
        {NODES.map((n, i) => (
          <div key={n.key} className="flex items-stretch gap-4 mb-4">
            <div className="flex flex-col items-center w-10 shrink-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${n.status === 'completed' ? 'bg-emerald-500' : n.status === 'active' ? 'bg-[var(--primary)]' : 'bg-slate-100'}`}>
                {n.status === 'completed' ? <CheckCircle2 size={18} /> : <n.Icon size={18} />}
              </div>
              {i < NODES.length - 1 && <div className="w-0.5 flex-1 my-1 bg-slate-200" />}
            </div>
            <div className={`flex-1 p-4 rounded-2xl border ${n.status === 'active' ? 'bg-indigo-50 border-indigo-100 dark:bg-slate-800' : 'bg-[var(--card)] border-[var(--border)]'}`}>
              <p className="font-bold text-[var(--foreground)]">{n.label}</p>
              {n.status === 'active' && <button onClick={() => onNavigate('swipe')} className="mt-3 w-full bg-[var(--primary)] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-all">Continue <ChevronRight size={14}/></button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}