import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import { t } from '../i18n';
import { PATHWAYS, calcMatch } from '../lib/matchEngine';

function matchColor(pct) {
  if (pct >= 80) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30';
  if (pct >= 60) return 'text-[var(--primary)] bg-indigo-50 dark:bg-indigo-900/30';
  if (pct >= 40) return 'text-amber-600 bg-amber-50 dark:bg-amber-900/30';
  return 'text-red-500 bg-red-50 dark:bg-red-900/30';
}

export default function BridgeScreen({ language, swipeResults, ageGroup }) {
  const [expanded, setExpanded] = useState(null);
  const [activeTab, setActiveTab] = useState('university');

  const filtered = PATHWAYS.filter(p => p.type === activeTab);

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] p-6 screen-enter">
      <div className="pt-8 mb-4">
        <h1 className="text-[var(--foreground)] text-3xl font-[800]">{t(language, 'bridge_title')}</h1>
        <p className="text-[var(--muted-foreground)] text-sm">{t(language, 'bridge_subtitle')}</p>
      </div>

      <div className="flex bg-[var(--card)] rounded-2xl p-1 border border-[var(--border)] mb-5">
        {['university', 'vocational'].map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setExpanded(null); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === tab ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-[var(--muted-foreground)]'}`}
          >
            {t(language, tab === 'university' ? 'bridge_universities' : 'bridge_vocational')}
          </button>
        ))}
      </div>

      {ageGroup === '16plus' && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-2xl p-4 mb-4 shadow-md">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🏆</span>
            <p className="font-extrabold text-sm text-white">{t(language, 'bridge_scholarship_title')}</p>
          </div>
          <p className="text-xs text-white/90 mb-3">{t(language, 'bridge_scholarship_desc')}</p>
          <button className="bg-white text-amber-600 font-bold text-xs py-2 px-4 rounded-xl active:scale-95 transition-all">
            {t(language, 'bridge_scholarship_cta')}
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {filtered.map(pathway => {
          const match = calcMatch(pathway, swipeResults);
          const isOpen = expanded === pathway.id;
          return (
            <div key={pathway.id} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
              <button
                onClick={() => setExpanded(isOpen ? null : pathway.id)}
                className="w-full p-4 flex items-center gap-3 text-left active:scale-[0.99] transition-all"
              >
                <span className="text-3xl">{pathway.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[var(--foreground)] truncate">
                    {pathway.name[language] ?? pathway.name.en}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="text-[var(--muted-foreground)]" />
                    <span className="text-[10px] text-[var(--muted-foreground)]">{pathway.location}</span>
                  </div>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${matchColor(match)}`}>
                  {match}% {t(language, 'bridge_match')}
                </div>
                {isOpen
                  ? <ChevronUp size={16} className="text-[var(--muted-foreground)] shrink-0" />
                  : <ChevronDown size={16} className="text-[var(--muted-foreground)] shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-[var(--border)] pt-3">
                  <p className="text-[10px] font-bold uppercase text-emerald-600 tracking-widest mb-2">
                    {t(language, 'bridge_pros')}
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {(pathway.pros[language] ?? pathway.pros.en).map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-xs text-[var(--foreground)]">{pro}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[10px] font-bold uppercase text-amber-600 tracking-widest mb-2">
                    {t(language, 'bridge_cons')}
                  </p>
                  <ul className="space-y-1.5">
                    {(pathway.cons[language] ?? pathway.cons.en).map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertCircle size={13} className="text-amber-500 mt-0.5 shrink-0" />
                        <span className="text-xs text-[var(--foreground)]">{con}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-widest mb-2 mt-4">
                    {t(language, 'bridge_steps')}
                  </p>
                  <ol className="space-y-1.5">
                    {(pathway.steps[language] ?? pathway.steps.en).map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[10px] font-extrabold text-[var(--primary)] mt-0.5 w-4 shrink-0">{i + 1}.</span>
                        <span className="text-xs text-[var(--foreground)]">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
