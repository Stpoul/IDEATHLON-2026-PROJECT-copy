import { useState, useEffect } from 'react';
import { CheckCircle2, MessageCircle, Lock, School, Cpu, Star } from 'lucide-react';

const SKILL_TAGS = ['Logika', 'Tech', 'Řešení problémů'];

export default function BridgeScreen() {
  const [sent, setSent] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(94), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] overflow-y-auto screen-enter">
      <div className="px-6 pt-14 pb-6">
        <p className="text-[var(--muted-foreground)] text-sm font-medium">Na základě tvých odpovědí</p>
        <h1 className="text-[var(--foreground)] text-3xl font-[800] mt-1">Tvůj Match</h1>
      </div>

      <div className="mx-6 mb-6 bg-gradient-to-br from-[var(--primary)] to-[#a855f7] rounded-2xl p-5 flex items-center gap-5 shadow-xl shadow-purple-200">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
          <Star size={30} fill="white" strokeWidth={0} />
        </div>
        <div>
          <p className="text-white font-extrabold text-2xl leading-tight">94% shoda</p>
          <p className="text-white/80 text-sm mt-1">Máš hodně společného s Jakubem</p>
        </div>
      </div>

      <div className="mx-6 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-lg shadow-gray-500/5 overflow-hidden mb-6">
        <div className="bg-gray-50/50 p-5 flex items-center gap-5 border-b border-[var(--border)]">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-[var(--primary)] flex items-center justify-center shadow-md shadow-purple-200">
              <span className="text-white font-extrabold text-2xl">J</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[var(--success)] rounded-full border-4 border-gray-50" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-900 font-bold text-lg">Jakub Novák</p>
            <div className="flex items-center gap-2 mt-1">
              <School size={14} className="text-gray-400 shrink-0" />
              <span className="text-[var(--muted-foreground)] text-sm truncate">Gymnázium Semily → TUL Liberec</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Cpu size={14} className="text-gray-400 shrink-0" />
              <span className="text-[var(--muted-foreground)] text-sm">Bc. Informační technologie</span>
            </div>
          </div>
        </div>

        <div className="p-5 border-b border-[var(--border)]">
          <p className="text-[var(--muted-foreground)] text-sm leading-relaxed italic">
            "Chodil jsem na tvoji školu a nevěděl jsem co chci. Pak jsem si uvědomil, že jsem už dělal věci, které dělají inženýři."
          </p>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap gap-2.5">
            {SKILL_TAGS.map((tag) => (
              <span key={tag} className="text-sm font-semibold px-4 py-1.5 rounded-full bg-purple-100 text-[var(--primary)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-6 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-lg shadow-gray-500/5 p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[var(--foreground)] text-sm font-semibold">Shoda dovedností</p>
          <p className="text-[var(--primary)] text-sm font-extrabold">{progress}%</p>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: `${progress}%`, transition: 'width 0.8s cubic-bezier(0.25, 1, 0.5, 1)' }} />
        </div>
      </div>

      <div className="px-6 pb-8 mt-auto">
        <button
          onClick={() => setSent(true)}
          disabled={sent}
          className={`w-full font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-150 active:scale-95 ${sent ? 'bg-[var(--success)] text-white' : 'bg-[var(--primary)] text-white shadow-lg shadow-purple-200'}`}
        >
          {sent ? <CheckCircle2 size={20} /> : <MessageCircle size={20} />}
          {sent ? 'Zpráva odeslána — Jakub odpoví brzy!' : 'Zeptat se Jakuba anonymně'}
        </button>

        <div className="flex items-center justify-center gap-2 mt-4">
          <Lock size={12} className="text-gray-400" />
          <p className="text-gray-400 text-xs">Tvoje identita není nikdy odhalena alumni</p>
        </div>
      </div>
    </div>
  );
}