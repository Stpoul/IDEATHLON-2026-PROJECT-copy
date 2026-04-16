import { Award, TrendingUp, Users } from 'lucide-react';

const METRICS = [
  { id: 1, label: 'Drop Completion', value: '85%', sub: '+6% this month', Icon: Award },
  { id: 2, label: 'Top Interest', value: 'Tech', sub: 'Rising by 34%', Icon: TrendingUp },
  { id: 3, label: 'Connections', value: '120', sub: '+18 alumni matches', Icon: Users },
];

export default function ImpactScreen() {
  return (
    <div className="flex-1 p-6 bg-[var(--background)] screen-enter">
      <h1 className="text-[var(--foreground)] text-3xl font-extrabold mb-1">Regional Impact</h1>
      <p className="text-[var(--muted-foreground)] text-sm mb-8">Aggregated Engagement Metrics</p>

      <div className="flex flex-col gap-4">
        {METRICS.map(m => (
          <div key={m.id} className="bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600"><m.Icon size={24}/></div>
            <div>
              <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase">{m.label}</p>
              <h3 className="text-2xl font-extrabold text-[var(--foreground)]">{m.value}</h3>
              <p className="text-[10px] text-emerald-500 font-bold">{m.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}