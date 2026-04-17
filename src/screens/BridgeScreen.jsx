import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import { t } from '../i18n';
import { PATHWAYS, calcMatch } from '../lib/matchEngine';

const SKILL_THEMES = [
  {
    id: 'tech',
    emoji: '💻',
    nameKey: 'bridge_theme_tech',
    descKey: 'bridge_theme_tech_desc',
    matchCategories: ['Technical', 'Logic'],
  },
  {
    id: 'creative',
    emoji: '🎨',
    nameKey: 'bridge_theme_creative',
    descKey: 'bridge_theme_creative_desc',
    matchCategories: ['Creative'],
  },
  {
    id: 'science',
    emoji: '🔬',
    nameKey: 'bridge_theme_science',
    descKey: 'bridge_theme_science_desc',
    matchCategories: ['Science'],
  },
  {
    id: 'social',
    emoji: '🤝',
    nameKey: 'bridge_theme_social',
    descKey: 'bridge_theme_social_desc',
    matchCategories: ['Healthcare', 'Social'],
  },
  {
    id: 'business',
    emoji: '📈',
    nameKey: 'bridge_theme_business',
    descKey: 'bridge_theme_business_desc',
    matchCategories: ['Business'],
  },
  {
    id: 'outdoors',
    emoji: '🌲',
    nameKey: 'bridge_theme_outdoors',
    descKey: 'bridge_theme_outdoors_desc',
    matchCategories: ['Outdoors'],
  },
];

function calcThemeMatch(theme, swipeResults) {
  let liked = 0;
  let total = 0;
  theme.matchCategories.forEach(cat => {
    const r = swipeResults[cat];
    if (r) { liked += r.liked; total += r.total; }
  });
  if (total === 0) return 0;
  return Math.round((liked / total) * 100);
}

function matchColor(pct) {
  if (pct >= 80) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30';
  if (pct >= 60) return 'text-[var(--primary)] bg-indigo-50 dark:bg-indigo-900/30';
  if (pct >= 40) return 'text-amber-600 bg-amber-50 dark:bg-amber-900/30';
  return 'text-red-500 bg-red-50 dark:bg-red-900/30';
}

export default function BridgeScreen({ language, swipeResults, ageGroup }) {
  const [expanded, setExpanded] = useState(null);
  const [activeTab, setActiveTab] = useState('university');
  const [showCvModal, setShowCvModal] = useState(false);

  const filtered = PATHWAYS.filter(p => p.type === activeTab);
  const hasSwipeData = Object.keys(swipeResults).length > 0;

  return (
    <>
      <div className="flex-1 flex flex-col bg-[var(--background)] p-6 screen-enter">
        <div className="pt-8 mb-4">
          <h1 className="text-[var(--foreground)] text-3xl font-[800]">
            {ageGroup === 'under16' ? t(language, 'bridge_themes_title') : t(language, 'bridge_title')}
          </h1>
          <p className="text-[var(--muted-foreground)] text-sm">
            {ageGroup === 'under16' ? t(language, 'bridge_themes_subtitle') : t(language, 'bridge_subtitle')}
          </p>
        </div>

        {ageGroup === 'under16' ? (
          /* ── JUNIOR VIEW: Skill Themes ── */
          <div className="flex-1 overflow-y-auto pb-4">
            {!hasSwipeData ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="text-5xl mb-4">🃏</span>
                <p className="text-sm font-bold text-[var(--foreground)]">{t(language, 'bridge_themes_no_swipes')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {SKILL_THEMES.map(theme => {
                  const match = calcThemeMatch(theme, swipeResults);
                  return (
                    <div key={theme.id} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{theme.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-[var(--foreground)]">{t(language, theme.nameKey)}</p>
                          <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5 leading-snug">{t(language, theme.descKey)}</p>
                        </div>
                        <div className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${matchColor(match)}`}>
                          {match}%
                        </div>
                      </div>
                      <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                          style={{ width: `${match}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* ── SENIOR VIEW: University / Vocational Pathways ── */
          <>
            <div className="flex bg-[var(--card)] rounded-2xl p-1 border border-[var(--border)] mb-4">
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

            <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-2xl p-4 mb-3 shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">🏆</span>
                <p className="font-extrabold text-sm text-white">{t(language, 'bridge_scholarship_title')}</p>
              </div>
              <p className="text-xs text-white/90 mb-3">{t(language, 'bridge_scholarship_desc')}</p>
              <button className="bg-white text-amber-600 font-bold text-xs py-2 px-4 rounded-xl active:scale-95 transition-all">
                {t(language, 'bridge_scholarship_cta')}
              </button>
            </div>

            <button
              onClick={() => setShowCvModal(true)}
              className="w-full mb-4 flex items-center justify-center gap-2 bg-[var(--primary)] text-white font-bold text-sm py-3.5 rounded-2xl active:scale-95 transition-all shadow-md"
            >
              📄 {t(language, 'bridge_cv_btn')}
            </button>

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
          </>
        )}
      </div>

      {showCvModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-end justify-center backdrop-blur-sm">
          <div className="bg-[var(--card)] w-full max-w-[448px] p-6 rounded-t-[30px] shadow-2xl">
            <h2 className="text-xl font-bold mb-3">{t(language, 'bridge_cv_modal_title')}</h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-6 leading-relaxed">
              {t(language, 'bridge_cv_modal_body')}
            </p>
            <button
              className="w-full bg-[var(--primary)] text-white font-bold py-3.5 rounded-2xl mb-3 active:scale-95 transition-all"
              onClick={() => setShowCvModal(false)}
            >
              {t(language, 'bridge_cv_modal_cta')}
            </button>
            <button
              className="w-full border-2 border-[var(--border)] text-[var(--muted-foreground)] font-bold py-3 rounded-2xl active:scale-95 transition-all"
              onClick={() => setShowCvModal(false)}
            >
              {t(language, 'bridge_cv_modal_close')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
