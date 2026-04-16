import { useState } from 'react';
import { Flame, Zap, X, Heart, SkipForward } from 'lucide-react';

const SCENARIOS = [
  { e:'🔧', t:'Rozebrat rádio, abys viděl jak funguje', c:'Technické' },
  { e:'✍️', t:'Napsat příběh o životě někoho jiného', c:'Kreativní' },
  { e:'🔬', t:'Udělat vědecký pokus doma', c:'Věda' },
  { e:'🎭', t:'Zorganizovat školní akci pro 50 lidí', c:'Sociální' },
  { e:'💻', t:'Vytvořit malou appku pro spolužáky', c:'Tech' },
];

const CAT_COLOR = {
  Technické: { bg: '#ede9fe', text: '#6d28d9' },
  Kreativní: { bg: '#fff7ed', text: '#c2410c' },
  Věda:      { bg: '#f0fdf4', text: '#15803d' },
  Sociální:  { bg: '#fdf4ff', text: '#a21caf' },
  Tech:      { bg: '#e0e7ff', text: '#3730a3' },
};

export default function SwipeScreen({ onNavigate }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(null);
  const [done, setDone] = useState(false);

  const advance = (direction) => {
    setDir(direction);
    setTimeout(() => {
      setDir(null);
      if (idx < SCENARIOS.length - 1) { setIdx(i => i + 1); }
      else { setDone(true); }
    }, 300);
  };

  if (done) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 bg-[var(--background)] px-8 text-center screen-enter">
        <div className="w-24 h-24 text-5xl" style={{ animation: 'bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>🎉</div>
        <div>
          <h1 className="text-3xl font-[800] text-[var(--foreground)]">Hotovo!</h1>
          <p className="text-[var(--muted-foreground)] text-base mt-2 leading-relaxed">Odemkl jsi svůj alumni match na základě tvých odpovědí.</p>
        </div>
        <button onClick={() => onNavigate('bridge')} className="w-full bg-[var(--primary)] text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-purple-200 active:scale-95 transition-all duration-150">
          Zobrazit můj match →
        </button>
      </div>
    );
  }

  const card = SCENARIOS[idx];
  const cat  = CAT_COLOR[card.c];
  const cardStyle = {
    transition: 'transform 0.28s cubic-bezier(0.4,0,1,1), opacity 0.28s ease',
    transform: dir === 'left' ? 'translateX(-110%) rotate(-12deg)' : dir === 'right' ? 'translateX(110%) rotate(12deg)' : 'translateX(0)',
    opacity: dir ? 0 : 1,
  };

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] screen-enter">
      <div className="px-6 pt-14 pb-4">
        <p className="text-[var(--muted-foreground)] text-sm font-semibold">Otázka {idx + 1} z {SCENARIOS.length}</p>
        <h1 className="text-slate-900 text-3xl font-[800] mt-1">Discover</h1>
      </div>

      <div className="flex gap-3 px-6 mb-5">
        <div className="flex-1 flex items-center gap-2.5 bg-purple-100 rounded-2xl p-3">
          <Zap size={18} className="text-[var(--primary)]" />
          <span className="text-[var(--primary)] text-sm font-bold">Level 8</span>
        </div>
        <div className="flex-1 flex items-center gap-2.5 bg-orange-100 rounded-2xl p-3">
          <Flame size={18} className="text-orange-500" />
          <span className="text-orange-600 text-sm font-bold">5 Day Streak</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-6">
        {SCENARIOS.map((_, i) => (
          <div key={i} style={{
            height: 8, borderRadius: 4,
            width: i === idx ? 24 : 8,
            background: i < idx ? 'var(--success)' : i === idx ? 'var(--primary)' : '#e2e8f0',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div style={cardStyle} className="w-full bg-[var(--card)] rounded-[28px] border border-[var(--border)] shadow-2xl shadow-gray-500/10">
          <div className="flex flex-col items-center gap-4 px-7 py-12 text-center">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl" style={{ background: cat.bg }}>{card.e}</div>
            <span className="text-sm font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: cat.bg, color: cat.text }}>{card.c}</span>
            <p className="text-[var(--foreground)] text-xl font-bold leading-snug pt-2">{card.t}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 py-8">
        <button onClick={() => advance('left')} className="w-20 h-20 rounded-full bg-white border-2 border-[var(--border)] flex items-center justify-center active:scale-95 transition-all duration-150">
          <X size={30} className="text-[var(--danger)]" strokeWidth={3} />
        </button>
        <button onClick={() => advance('right')} className="w-24 h-24 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-xl shadow-purple-300 active:scale-95 transition-all duration-150">
          <Heart size={36} fill="white" strokeWidth={0} />
        </button>
        <button onClick={() => advance('left')} className="w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center active:scale-95 transition-all duration-150">
          <SkipForward size={24} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}