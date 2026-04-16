import { Sparkles, Users, TrendingUp, CheckCircle2, Lock, ChevronRight, Star } from 'lucide-react';
import { t } from '../i18n';

const STAGES = [
  {
    key: 'discovery',
    nameKey: 'stage_discovery_name',
    yearsKey: 'stage_discovery_years',
    descKey: 'stage_discovery_desc',
    Icon: Sparkles,
    status: 'completed',
  },
  {
    key: 'community',
    nameKey: 'stage_community_name',
    yearsKey: 'stage_community_years',
    descKey: 'stage_community_desc',
    Icon: Users,
    status: 'active',
  },
  {
    key: 'transition',
    nameKey: 'stage_transition_name',
    yearsKey: 'stage_transition_years',
    descKey: 'stage_transition_desc',
    Icon: TrendingUp,
    status: 'locked',
    xpRequired: 500,
  },
];

function getPet(xp) {
  if (xp < 100) return { emoji: '🥚', msgKey: 'pet_egg' };
  if (xp < 200) return { emoji: '🐣', msgKey: 'pet_hatching' };
  if (xp < 400) return { emoji: '🐥', msgKey: 'pet_chick' };
  if (xp < 600) return { emoji: '🐦', msgKey: 'pet_fledgling' };
  return { emoji: '⭐', msgKey: 'pet_champion' };
}

export default function RoadmapScreen({ onNavigate, globalXp, language }) {
  const pet = getPet(globalXp);
  const petLevel = Math.floor(globalXp / 100);
  const XP_MAX = 600;

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] screen-enter px-5 pb-8">
      <div className="pt-12 pb-5 flex justify-between items-end">
        <div>
          <p className="text-[var(--muted-foreground)] text-xs font-medium">{t(language, 'roadmap_greeting')}</p>
          <h1 className="text-[var(--foreground)] text-2xl font-extrabold mt-0.5">{t(language, 'roadmap_title')}</h1>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-4xl animate-bounce">{pet.emoji}</div>
          <span className="text-[10px] font-bold text-[var(--primary)] uppercase">{t(language, 'roadmap_pet_level')} {petLevel}</span>
          <span className="text-[9px] text-[var(--muted-foreground)]">{t(language, pet.msgKey)}</span>
        </div>
      </div>

      <div className="mb-6 bg-[var(--primary)] rounded-2xl p-4 shadow-lg text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star size={14} fill="white" />
            <span className="font-bold text-sm">{t(language, 'roadmap_level')} 8</span>
          </div>
          <span className="text-white/70 text-xs font-semibold">
            {globalXp} / {XP_MAX} {t(language, 'roadmap_xp_label')}
          </span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all"
            style={{ width: `${Math.min((globalXp / XP_MAX) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div className="flex-1">
        {STAGES.map((stage, i) => {
          const isLocked = stage.status === 'locked' && globalXp < (stage.xpRequired ?? 0);
          return (
            <div key={stage.key} className="flex items-stretch gap-4 mb-4">
              <div className="flex flex-col items-center w-10 shrink-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${stage.status === 'completed' ? 'bg-emerald-500' : stage.status === 'active' ? 'bg-[var(--primary)]' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  {stage.status === 'completed'
                    ? <CheckCircle2 size={18} />
                    : isLocked
                    ? <Lock size={18} className="text-slate-400" />
                    : <stage.Icon size={18} />}
                </div>
                {i < STAGES.length - 1 && (
                  <div className="w-0.5 flex-1 my-1 bg-slate-200 dark:bg-slate-700" />
                )}
              </div>
              <div className={`flex-1 p-4 rounded-2xl border ${stage.status === 'active' ? 'bg-indigo-50 border-indigo-100 dark:bg-slate-800 dark:border-indigo-900' : 'bg-[var(--card)] border-[var(--border)]'}`}>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-[var(--foreground)] text-sm">{t(language, stage.nameKey)}</p>
                  <span className="text-[9px] font-bold text-[var(--muted-foreground)] uppercase">{t(language, stage.yearsKey)}</span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-snug">{t(language, stage.descKey)}</p>
                {stage.status === 'active' && (
                  <button
                    onClick={() => onNavigate('swipe')}
                    className="mt-3 w-full bg-[var(--primary)] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-all"
                  >
                    {t(language, 'stage_continue')} <ChevronRight size={14} />
                  </button>
                )}
                {isLocked && (
                  <p className="mt-2 text-[10px] text-[var(--muted-foreground)]">
                    🔒 {stage.xpRequired} {t(language, 'roadmap_xp_label')} required
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
