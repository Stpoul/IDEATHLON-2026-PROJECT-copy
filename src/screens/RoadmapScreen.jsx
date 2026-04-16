import { Sparkles, Zap, Lock, CheckCircle2, Star, Trophy } from 'lucide-react';

// SVG canvas dimensions and node centres — pure constants, lifted to module scope
const PATH_W = 340;
const PATH_H = 480;
const N1 = { x: 100, y: 90  };
const N2 = { x: 240, y: 250 };
const N3 = { x: 100, y: 400 };

// ─── Node circle with state-specific visuals ────────────────────────────────
function NodeBadge({ status, Icon }) {
  if (status === 'completed') {
    return (
      <div className="relative">
        <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-200/80 flex items-center justify-center">
          <Icon size={30} strokeWidth={2} className="text-white" aria-hidden="true" />
        </div>
        {/* Completion tick badge */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
          <CheckCircle2 size={18} className="text-emerald-500" aria-hidden="true" />
        </div>
      </div>
    );
  }

  if (status === 'active') {
    return (
      <div className="relative">
        {/* Outer glow — respects prefers-reduced-motion */}
        <div className="absolute w-24 h-24 rounded-full bg-blue-400/20 motion-safe:animate-pulse blur-md" />
        {/* Ring halo */}
        <div className="absolute w-[84px] h-[84px] rounded-full ring-4 ring-blue-300/60" />
        <div className="relative w-[72px] h-[72px] rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 shadow-xl shadow-blue-300/70 flex items-center justify-center">
          <Icon size={30} strokeWidth={2} className="text-white" aria-hidden="true" />
        </div>
      </div>
    );
  }

  // locked
  return (
    <div className="w-[72px] h-[72px] rounded-full bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center">
      <Icon size={26} strokeWidth={1.5} className="text-slate-300" aria-hidden="true" />
    </div>
  );
}

// ─── Info card beside each node ─────────────────────────────────────────────
function NodeCard({ title, subtitle, xp, status }) {
  const pill = {
    completed: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    active:    'bg-blue-50   border-blue-200   text-blue-700',
    locked:    'bg-slate-50  border-slate-200  text-slate-400',
  }[status];

  const isLocked = status === 'locked';

  return (
    <div
      className={[
        'bg-white rounded-2xl border border-slate-100 p-3 shadow-sm w-[128px]',
        isLocked ? 'opacity-50' : '',
      ].join(' ')}
    >
      <p className={`text-[13px] font-bold leading-tight ${isLocked ? 'text-slate-400' : 'text-slate-800'}`}>
        {title}
      </p>
      <p className={`text-[11px] mt-0.5 ${isLocked ? 'text-slate-300' : 'text-slate-500'}`}>
        {subtitle}
      </p>
      <span className={`inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${pill}`}>
        {xp}
      </span>
    </div>
  );
}

// ─── RoadmapScreen ───────────────────────────────────────────────────────────
export default function RoadmapScreen() {
  const xpCurrent = 340;
  const xpTotal   = 600;
  const xpPct     = Math.round((xpCurrent / xpTotal) * 100);

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-gradient-to-b from-amber-50 to-white">

      {/* ── Header ── */}
      <div className="relative bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 px-6 pt-8 pb-8 rounded-b-[2.5rem] overflow-hidden shrink-0">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/10 rounded-full" aria-hidden="true" />
        <div className="absolute top-4 right-12 w-20 h-20 bg-white/10 rounded-full" aria-hidden="true" />

        {/* Greeting row */}
        <div className="relative flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-white/25 flex items-center justify-center shadow-inner shrink-0">
            <span className="text-white font-extrabold text-xl select-none">J</span>
          </div>
          <div>
            <p className="text-white/70 text-[11px] font-semibold tracking-widest uppercase">
              Welcome back
            </p>
            <h1 className="text-white text-xl font-extrabold leading-tight">
              Jan!
            </h1>
          </div>
          {/* XP badge */}
          <div className="ml-auto flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
            <Star size={13} fill="white" strokeWidth={0} className="text-white" aria-hidden="true" />
            <span className="text-white text-[13px] font-bold tabular-nums">340 XP</span>
          </div>
        </div>

        {/* XP progress bar */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-white/80 text-[11px] font-semibold">Progress to Level 9</span>
          <span className="text-white/80 text-[11px] font-semibold tabular-nums">
            {xpCurrent} / {xpTotal}
          </span>
        </div>
        <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full"
            style={{ width: `${xpPct}%` }}
            role="progressbar"
            aria-valuenow={xpCurrent}
            aria-valuemin={0}
            aria-valuemax={xpTotal}
            aria-label="XP progress to Level 9"
          />
        </div>
      </div>

      {/* ── Scrollable Path ── */}
      <div className="flex-1 overflow-y-auto pt-7 pb-10">

        <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-[0.14em] mb-6 select-none">
          Your Learning Path
        </p>

        {/* SVG + absolute-positioned nodes/cards */}
        <div
          className="relative mx-auto"
          style={{ width: PATH_W, height: PATH_H }}
        >
          {/* ── Winding path lines ── */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={PATH_W}
            height={PATH_H}
            viewBox={`0 0 ${PATH_W} ${PATH_H}`}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="rmGradientDone" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#34D399" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>

            {/* Gray dashed base (full path — background) */}
            <path
              d={`M ${N1.x} ${N1.y} C ${N1.x} ${N1.y + 80}, ${N2.x} ${N2.y - 80}, ${N2.x} ${N2.y}
                  C ${N2.x} ${N2.y + 80}, ${N3.x} ${N3.y - 80}, ${N3.x} ${N3.y}`}
              stroke="#E2E8F0"
              strokeWidth="5"
              strokeDasharray="10 7"
              strokeLinecap="round"
              fill="none"
            />

            {/* Colored overlay for completed segment (N1 → N2) */}
            <path
              d={`M ${N1.x} ${N1.y} C ${N1.x} ${N1.y + 80}, ${N2.x} ${N2.y - 80}, ${N2.x} ${N2.y}`}
              stroke="url(#rmGradientDone)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* ── Node 1: Curiosity (completed, left) ── */}
          <div
            className="absolute z-10"
            style={{ left: N1.x, top: N1.y, transform: 'translate(-50%, -50%)' }}
          >
            <NodeBadge status="completed" Icon={Sparkles} />
          </div>
          {/* Info card — right of node 1 */}
          <div className="absolute" style={{ left: N1.x + 52, top: N1.y - 36 }}>
            <NodeCard
              title="Curiosity"
              subtitle="Completed · 5/5"
              xp="+120 XP"
              status="completed"
            />
          </div>

          {/* ── Node 2: Core Skills (active, right) ── */}
          <div
            className="absolute z-10"
            style={{ left: N2.x, top: N2.y, transform: 'translate(-50%, -50%)' }}
          >
            <NodeBadge status="active" Icon={Zap} />
          </div>
          {/* Info card — left of node 2 */}
          <div className="absolute" style={{ left: N2.x - 52 - 128, top: N2.y - 36 }}>
            <NodeCard
              title="Core Skills"
              subtitle="In progress · 3/5"
              xp="+150 XP"
              status="active"
            />
          </div>
          {/* "Active" label above node 2 */}
          <div
            className="absolute flex justify-center"
            style={{ left: N2.x - 36, top: N2.y - 68, width: 72 }}
          >
            <span className="bg-blue-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm select-none">
              Active
            </span>
          </div>

          {/* ── Node 3: Logistics (locked, left) ── */}
          <div
            className="absolute z-10"
            style={{ left: N3.x, top: N3.y, transform: 'translate(-50%, -50%)' }}
          >
            <NodeBadge status="locked" Icon={Lock} />
          </div>
          {/* Info card — right of node 3 */}
          <div className="absolute" style={{ left: N3.x + 52, top: N3.y - 36 }}>
            <NodeCard
              title="Logistics"
              subtitle="Locked"
              xp="+200 XP"
              status="locked"
            />
          </div>
        </div>

        {/* ── Motivational footer chip ── */}
        <div className="flex justify-center mt-6 px-6">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-[12px] font-semibold px-4 py-2.5 rounded-full shadow-sm select-none">
            <Trophy size={14} aria-hidden="true" />
            <span>You're 58% to Level 9 — keep going!</span>
          </div>
        </div>

      </div>
    </div>
  );
}
