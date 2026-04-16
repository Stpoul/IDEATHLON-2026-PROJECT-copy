import { useState } from 'react';
import { Award, TrendingUp, Users, Download } from 'lucide-react';

const METRICS_DATA = {
  Týden: [
    { id: 'c', Icon: Award,      value: '72%',  label: 'Dokončení dropu', trend: '+2% vs minulý týden',   bar: 0.72 },
    { id: 'i', Icon: TrendingUp, value: '#2',   label: 'Největší zájem: Kreativa', trend: '+12% vyhledávání',    bar: 0.55 },
    { id: 'n', Icon: Users,      value: '31',   label: 'Nových alumni spojení', trend: '+5 tento týden',        bar: 0.40 },
  ],
  Měsíc: [
    { id: 'c', Icon: Award,      value: '85%',  label: 'Dokončení dropu', trend: '+6% vs minulý měsíc',   bar: 0.85 },
    { id: 'i', Icon: TrendingUp, value: '#1',   label: 'Největší zájem: Creative Tech', trend: '+34% vyhledávání',  bar: 0.72 },
    { id: 'n', Icon: Users,      value: '120',  label: 'Nových alumni spojení', trend: '+18 tento měsíc',      bar: 0.60 },
  ],
  'Čtvrtletí': [
    { id: 'c', Icon: Award,      value: '94%',  label: 'Dokončení dropu', trend: '+11% vs minulé čtvrtletí', bar: 0.94 },
    { id: 'i', Icon: TrendingUp, value: '#1',   label: 'Největší zájem: Creative Tech', trend: '+61% vyhledávání',  bar: 0.90 },
    { id: 'n', Icon: Users,      value: '340',  label: 'Nových alumni spojení', trend: '+52 toto čtvrtletí',    bar: 0.75 },
  ],
};
const PERIODS = ['Týden', 'Měsíc', 'Čtvrtletí'];

function MetricCard({ Icon, value, label, trend, bar }) {
  return (
    <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-lg shadow-gray-500/5 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center">
          <Icon size={22} className="text-[var(--primary)]" />
        </div>
        <p className="text-[var(--muted-foreground)] text-xs font-medium">{trend}</p>
      </div>
      <p className="text-[var(--foreground)] text-4xl font-[800] leading-none tabular-nums mb-1">{value}</p>
      <p className="text-[var(--muted-foreground)] text-sm font-medium leading-snug mb-4">{label}</p>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: `${bar * 100}%`, transition: 'width 0.5s ease' }} />
      </div>
    </div>
  );
}

export default function ImpactScreen() {
  const [period, setPeriod] = useState('Měsíc');
  const metrics = METRICS_DATA[period];

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] screen-enter">
      <div className="px-6 pt-14 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--success)]" />
              <span className="text-green-600 text-sm font-bold uppercase tracking-wider">Live</span>
            </div>
            <h1 className="text-[var(--foreground)] text-3xl font-[800]">Dopad v regionu</h1>
            <p className="text-[var(--muted-foreground)] text-sm mt-1">Liberecký kraj · Duben 2026</p>
          </div>
          <button aria-label="Export" className="w-11 h-11 bg-[var(--card)] border border-[var(--border)] rounded-full flex items-center justify-center active:scale-95 transition-all duration-150">
            <Download size={18} className="text-[var(--foreground)]" />
          </button>
        </div>
      </div>

      <div className="px-6 mb-5">
        <div className="flex gap-2 bg-gray-100 p-1.5 rounded-full border border-gray-200">
          {PERIODS.map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`flex-1 text-sm font-bold py-2.5 rounded-full transition-all duration-150 active:scale-95 ${period === p ? 'bg-[var(--primary)] text-white shadow-md shadow-purple-200' : 'bg-transparent text-[var(--muted-foreground)]'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-1 pb-8">
        <div className="flex flex-col gap-4">
          {metrics.map((props) => <MetricCard key={props.id + period} {...props} />)}
        </div>
        
        <div className="mt-5 bg-gradient-to-r from-[var(--primary)] to-[#8e44ad] rounded-2xl p-5 flex items-center justify-between shadow-xl shadow-purple-200">
          <div>
            <p className="text-white font-bold text-base">9. ročník — Cohort</p>
            <p className="text-white/80 text-sm mt-0.5">85% dokončilo tento měsíc</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <TrendingUp size={22} className="text-white" />
          </div>
        </div>
        
        <p className="text-center text-gray-400 text-[10px] mt-6 px-6">
          Data jsou anonymizována · GDPR · zákon č. 110/2019 Sb. · Liberecký kraj
        </p>
      </div>
    </div>
  );
}