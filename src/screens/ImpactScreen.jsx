import { Award, TrendingUp, Users, Lightbulb } from 'lucide-react';

const TEACHER_METRICS = [
  { label: 'Project-Based', value: '72%', sub: 'Student preference', icon: Lightbulb },
  { label: 'Video Request', value: '34%', sub: 'Students want more', icon: TrendingUp },
];

export default function ImpactScreen() {
  return (
    <div className="flex-1 p-6 bg-[var(--background)] screen-enter">
      <h1 className="text-[var(--foreground)] text-3xl font-extrabold mb-1">Impact Dashboard</h1>
      <p className="text-[var(--muted-foreground)] text-sm mb-8">Data-driven school improvements</p>

      <div className="flex flex-col gap-4 mb-8">
        <p className="text-xs font-bold uppercase text-[var(--muted-foreground)] tracking-widest">Regional Growth</p>
        <div className="bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)] flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-indigo-600"><Users size={24}/></div>
          <div><p className="text-xs font-bold text-[var(--muted-foreground)]">STUDENT COMPLETION</p><h3 className="text-2xl font-extrabold text-[var(--foreground)]">85%</h3></div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xs font-bold uppercase text-[var(--muted-foreground)] tracking-widest">Teaching Adaptation</p>
        <div className="grid grid-cols-2 gap-3">
          {TEACHER_METRICS.map(m => (
            <div key={m.label} className="bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
              <p className="text-xl font-bold text-[var(--primary)]">{m.value}</p>
              <p className="text-[10px] font-bold uppercase">{m.label}</p>
              <p className="text-[10px] text-[var(--muted-foreground)]">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}