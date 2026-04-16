import { useState } from 'react';
import { Flame, Zap, X, Heart } from 'lucide-react';
import { t } from '../i18n';

const SCENARIOS = [
  // 12 Vocational cards
  { e: '🔧', text: { en: 'Dismantle a radio to see how it works', cz: 'Rozebrat rádio, abys viděl/a jak funguje' }, c: 'Technical' },
  { e: '🎨', text: { en: 'Design a professional logo for a local business', cz: 'Navrhnout profesionální logo pro místní firmu' }, c: 'Creative' },
  { e: '🔬', text: { en: 'Perform a chemistry experiment at home', cz: 'Provést chemický pokus doma' }, c: 'Science' },
  { e: '🏗️', text: { en: 'Create a 3D floor plan for a modern house', cz: 'Vytvořit 3D půdorys moderního domu' }, c: 'Technical' },
  { e: '🧬', text: { en: 'Study how DNA determines biological traits', cz: 'Studovat, jak DNA určuje biologické vlastnosti' }, c: 'Science' },
  { e: '🌲', text: { en: 'Work outdoors in a national park or forest', cz: 'Pracovat venku v národním parku nebo lese' }, c: 'Outdoors' },
  { e: '🏥', text: { en: 'Volunteer at a hospital to assist patients', cz: 'Dobrovolničit v nemocnici a pomáhat pacientům' }, c: 'Healthcare' },
  { e: '⚖️', text: { en: 'Debate ethics in a modern mock courtroom', cz: 'Diskutovat o etice v simulovaném soudním procesu' }, c: 'Social' },
  { e: '📊', text: { en: 'Analyze complex data to solve a regional problem', cz: 'Analyzovat komplexní data k řešení regionálního problému' }, c: 'Logic' },
  { e: '✍️', text: { en: 'Write a short story about a sci-fi adventure', cz: 'Napsat povídku o sci-fi dobrodružství' }, c: 'Creative' },
  { e: '💊', text: { en: 'Research how medicines are developed and tested', cz: 'Zkoumat, jak se vyvíjejí a testují léky' }, c: 'Healthcare' },
  { e: '📈', text: { en: 'Launch a small business idea and pitch it to a panel', cz: 'Spustit nápad na malý podnik a prezentovat ho porotě' }, c: 'Business' },
  // 6 Teaching Style cards
  { e: '📚', text: { en: '"I wish my teachers used more hands-on experiments in class."', cz: '"Přál/a bych si, aby učitelé používali více praktických pokusů."' }, c: 'ts_experiments' },
  { e: '💡', text: { en: '"I find it easier to learn through videos than lectures."', cz: '"Snáze se učím přes videa než přednášky."' }, c: 'ts_video' },
  { e: '🖥️', text: { en: '"I learn better when we work in groups rather than alone."', cz: '"Lépe se učím, když pracujeme ve skupinách."' }, c: 'ts_group' },
  { e: '📝', text: { en: '"I prefer digital assignments over paper-based ones."', cz: '"Preferuji digitální zadání před papírovými."' }, c: 'ts_digital' },
  { e: '📱', text: { en: '"I would like more interactive apps like this to help me learn."', cz: '"Chtěl/a bych více interaktivních aplikací jako tato."' }, c: 'ts_apps' },
  { e: '🧪', text: { en: '"I prefer learning by doing rather than reading from a book."', cz: '"Raději se učím praxí než čtením z knihy."' }, c: 'ts_practical' },
];

export default function SwipeScreen({ onNavigate, globalStreak, language, onSwipeResult }) {
  const [idx, setIdx] = useState(0);

  const handleSwipe = (liked) => {
    onSwipeResult(SCENARIOS[idx].c, liked);
    if (idx < SCENARIOS.length - 1) {
      setIdx(idx + 1);
    } else {
      onNavigate('bridge');
    }
  };

  const card = SCENARIOS[idx];
  const isTeachingStyle = card.c.startsWith('ts_');

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] screen-enter p-6">
      <div className="pt-8 pb-4">
        <h1 className="text-[var(--foreground)] text-3xl font-[800]">{t(language, 'swipe_title')}</h1>
        <p className="text-[var(--muted-foreground)] text-sm">{t(language, 'swipe_subtitle')}</p>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2.5 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl p-3">
          <Zap size={18} className="text-indigo-600 dark:text-indigo-300" />
          <span className="text-indigo-700 dark:text-indigo-200 text-sm font-bold">{t(language, 'roadmap_level')} 8</span>
        </div>
        <div className="flex-1 flex items-center gap-2.5 bg-orange-100 dark:bg-orange-900/40 rounded-2xl p-3">
          <Flame size={18} className="text-orange-500" />
          <span className="text-orange-600 dark:text-orange-300 text-sm font-bold">{globalStreak} {t(language, 'swipe_streak')}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-[10px] font-bold text-[var(--muted-foreground)] mb-1">
          <span>{t(language, 'swipe_progress', { current: idx + 1, total: SCENARIOS.length })}</span>
          <span>{Math.round(((idx + 1) / SCENARIOS.length) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--primary)] rounded-full transition-all duration-300"
            style={{ width: `${((idx + 1) / SCENARIOS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full bg-[var(--card)] rounded-3xl p-8 shadow-xl border border-[var(--border)] text-center transition-colors">
          <div className="text-6xl mb-4">{card.e}</div>
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-2 block">
            {isTeachingStyle ? t(language, 'swipe_teaching_label') : t(language, `cat_${card.c}`)}
          </span>
          <p className="text-[var(--foreground)] text-xl font-bold leading-snug">
            {card.text[language] ?? card.text.en}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-6 py-8">
        <button
          onClick={() => handleSwipe(false)}
          className="w-16 h-16 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--danger)] flex items-center justify-center active:scale-95 transition-all shadow-md"
        >
          <X size={28} />
        </button>
        <button
          onClick={() => handleSwipe(true)}
          className="w-20 h-20 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
        >
          <Heart size={36} fill="white" strokeWidth={0} />
        </button>
      </div>
    </div>
  );
}
