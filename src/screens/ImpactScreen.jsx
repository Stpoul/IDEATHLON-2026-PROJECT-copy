import { useState } from 'react';
import { Award, Users, School } from 'lucide-react';
import { t } from '../i18n';

const TS_LABELS = {
  ts_experiments: { en: 'Hands-on', cz: 'Praktické' },
  ts_video:       { en: 'Video',    cz: 'Video' },
  ts_group:       { en: 'Groups',   cz: 'Skupiny' },
  ts_digital:     { en: 'Digital',  cz: 'Digitální' },
  ts_apps:        { en: 'Apps',     cz: 'Aplikace' },
  ts_practical:   { en: 'By Doing', cz: 'Praxí' },
};

function LearningBar({ label, pct }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-[10px] font-bold mb-1">
        <span className="text-[var(--foreground)]">{label}</span>
        <span className="text-[var(--primary)]">{pct}%</span>
      </div>
      <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function ImpactScreen({ language, swipeResults }) {
  const [activeTab, setActiveTab] = useState('teachers');

  const tsData = Object.entries(TS_LABELS)
    .map(([key, labels]) => {
      const r = swipeResults[key];
      const pct = r && r.total > 0 ? Math.round((r.liked / r.total) * 100) : 0;
      return { key, label: labels[language] ?? labels.en, pct };
    })
    .sort((a, b) => b.pct - a.pct);

  const hasTeachingData = tsData.some(d => d.pct > 0);

  return (
    <div className="flex-1 p-6 bg-[var(--background)] screen-enter">
      <h1 className="text-[var(--foreground)] text-3xl font-extrabold mb-1">{t(language, 'impact_title')}</h1>
      <p className="text-[var(--muted-foreground)] text-sm mb-5">{t(language, 'impact_subtitle')}</p>

      <div className="flex bg-[var(--card)] rounded-2xl p-1 border border-[var(--border)] mb-5">
        {['teachers', 'sponsors'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === tab ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-[var(--muted-foreground)]'}`}
          >
            {t(language, tab === 'teachers' ? 'impact_tab_teachers' : 'impact_tab_sponsors')}
          </button>
        ))}
      </div>

      {activeTab === 'teachers' && (
        <div className="bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)]">
          <p className="text-xs font-bold uppercase text-[var(--muted-foreground)] tracking-widest mb-4">
            {t(language, 'impact_learning_styles')}
          </p>
          {hasTeachingData
            ? tsData.map(item => <LearningBar key={item.key} label={item.label} pct={item.pct} />)
            : <p className="text-xs text-[var(--muted-foreground)] text-center py-4">{t(language, 'impact_no_data')}</p>}
        </div>
      )}

      {activeTab === 'sponsors' && (
        <div className="space-y-3">
          <div className="bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)] flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-indigo-600">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase">{t(language, 'impact_completion')}</p>
              <h3 className="text-2xl font-extrabold text-[var(--foreground)]">85%</h3>
            </div>
          </div>
          <div className="bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)] flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-amber-500">
              <Award size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase">{t(language, 'impact_regional_rank')}</p>
              <h3 className="text-2xl font-extrabold text-[var(--foreground)]">#3 / 14</h3>
            </div>
          </div>
          <div className="bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)] flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-green-600">
              <School size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase">{t(language, 'impact_visibility')}</p>
              <h3 className="text-2xl font-extrabold text-[var(--foreground)]">{t(language, 'impact_visibility_value')}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
