import { Sparkles, Zap, Lock, CheckCircle2, Star, Trophy, ChevronRight } from 'lucide-react';

const ACHIEVEMENTS = [
  { i: '⚡', l: 'First Swipe',     d: 'Completed your first question',  earned: true  },
  { i: '🔥', l: '3-Day Streak',    d: 'Came back 3 days in a row',      earned: true  },
  { i: '🔍', l: 'Curiosity Badge', d: 'Completed Curiosity module',     earned: true  },
  { i: '🤝', l: 'Alumni Bridge',   d: 'Connected with an alumni',       earned: false },
  { i: '🏆', l: 'Completionist',   d: 'Finished all 5 swipes',          earned: false },
];

const NODES = [
  { key: 'curiosity',  label: 'Curiosity',   sub: 'Completed · 5/5',     xp: '+120 XP', status: 'completed', Icon: Sparkles },
  { key: 'skills',     label: 'Core Skills', sub: 'In progress · 3/5',   xp: '+150 XP', status: 'active',    Icon: Zap      },
  { key: 'logistics',  label: 'Logistics',   sub: 'Locked',               xp: '+200 XP', status: 'locked',    Icon: Lock     },
];

const STATUS_COLOR = {
  completed: { dot: '#10B981', bar: '#10B981' },
  active:    { dot: '#2563EB', bar: '#2563EB' },
  locked:    { dot: '#CBD5E1', bar: '#CBD5E1' },
};

export default function RoadmapScreen({ onNavigate }) {
  const xp = 340; const xpMax = 600;
  const earned = ACHIEVEMENTS.filter(a => a.earned).length;

  return (
    <div className="flex-1 flex flex-col bg-white">

      {/* Header */}
      <div className="px-5 pt-12 pb-5 bg-white">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-slate-400 text-xs font-medium">Welcome back 👋</p>
            <h1 className="text-slate-900 text-2xl font-extrabold mt-0.5">Jan's Journey</h1>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <span className="text-white font-extrabold text-lg">J</span>
          </div>
        </div>
      </div>

      {/* XP Card */}
      <div className="mx-5 mb-6 bg-blue-600 rounded-2xl p-4 shadow-lg shadow-blue-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
              <Star size={14} fill="white" strokeWidth={0} className="text-white" />
            </div>
            <span className="text-white font-bold text-sm">Level 8</span>
          </div>
          <span className="text-white/70 text-xs font-semibold">{xp} / {xpMax} XP</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${(xp/xpMax)*100}%` }} />
        </div>
        <p className="text-white/70 text-xs mt-2 font-medium">58% to Level 9 — keep going!</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8">

        {/* Path section */}
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Learning Path</p>
        <div className="flex flex-col gap-0">
          {NODES.map((n, i) => {
            const color = STATUS_COLOR[n.status];
            const isActive = n.status === 'active';
            const isDone   = n.status === 'completed';
            const isLocked = n.status === 'locked';
            return (
              <div key={n.key} className="flex items-stretch gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center w-10 shrink-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 ${isDone ? 'bg-emerald-500' : isActive ? 'bg-blue-600' : 'bg-slate-100'}`}
                    style={{ boxShadow: isActive ? '0 0 0 4px rgba(37,99,235,0.15)' : undefined }}>
                    {isDone  ? <CheckCircle2 size={18} className="text-white" /> :
                     isLocked ? <Lock size={16} className="text-slate-300" /> :
                     <n.Icon size={18} className="text-white" />}
                  </div>
                  {i < NODES.length - 1 && (
                    <div className="w-0.5 flex-1 my-1 rounded-full" style={{ background: color.bar, opacity: isLocked ? 0.2 : 0.3 }} />
                  )}
                </div>

                {/* Card */}
                <div className={`flex-1 mb-4 rounded-2xl border p-4 ${isLocked ? 'opacity-50 bg-slate-50 border-slate-100' : isActive ? 'bg-blue-50 border-blue-100' : 'bg-white border-slate-100 shadow-sm'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`font-bold text-[15px] ${isLocked ? 'text-slate-400' : 'text-slate-800'}`}>{n.label}</p>
                      <p className={`text-[12px] mt-0.5 ${isLocked ? 'text-slate-300' : 'text-slate-500'}`}>{n.sub}</p>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${isDone ? 'bg-emerald-50 text-emerald-600' : isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                      {n.xp}
                    </span>
                  </div>
                  {isActive && (
                    <button onClick={() => onNavigate('swipe')}
                      className="mt-3 w-full bg-blue-600 text-white text-[13px] font-bold py-2.5 rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-transform shadow-sm shadow-blue-200">
                      Continue <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="mt-2">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Achievements</p>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{earned}/{ACHIEVEMENTS.length} earned</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.l} className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-3.5 ${!a.earned ? 'opacity-40' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${a.earned ? 'bg-amber-50' : 'bg-slate-100'}`}>
                    {a.earned ? a.i : '🔒'}
                  </div>
                  {a.earned && <CheckCircle2 size={14} className="text-emerald-500 mt-0.5" />}
                </div>
                <p className="text-slate-800 text-[12px] font-bold leading-tight">{a.l}</p>
                <p className="text-slate-400 text-[10px] mt-0.5 leading-tight">{a.d}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}