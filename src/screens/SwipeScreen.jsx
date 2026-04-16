import { Flame, Zap, X, Heart, Radio, PenLine } from 'lucide-react';

function StatBadge({ icon: Icon, label, gradient, shadow }) {
  return (
    <div className={`flex items-center gap-1.5 ${gradient} text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg ${shadow}`}>
      <Icon size={14} fill="white" strokeWidth={0} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default function SwipeScreen() {
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-gradient-to-b from-slate-50 via-white to-violet-50/40">

      {/* ── Status Bar ── */}
      <div className="flex items-center justify-between px-6 pt-7 pb-4">

        <StatBadge
          icon={Zap}
          label="Level 8"
          gradient="bg-gradient-to-r from-violet-500 to-purple-600"
          shadow="shadow-violet-200/70"
        />
        <StatBadge
          icon={Flame}
          label="5 Day Streak"
          gradient="bg-gradient-to-r from-amber-400 to-orange-500"
          shadow="shadow-orange-200/70"
        />

      </div>

      {/* ── XP Progress Track ── */}
      <div className="mx-6 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full w-[58%] bg-gradient-to-r from-violet-500 to-purple-400 rounded-full"
          role="progressbar"
          aria-valuenow={58}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="XP progress"
        />
      </div>

      {/* ── Card Section ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-5">

        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.12em] mb-4 select-none">
          Question 3 of 5
        </p>

        {/* Main card */}
        <div className="w-full bg-white rounded-[2rem] border border-slate-100 shadow-[0_28px_72px_-12px_rgba(109,40,217,0.18),0_8px_24px_-8px_rgba(0,0,0,0.07)]">

          {/* Card header */}
          <div className="text-center pt-7 pb-5 px-6">
            <p className="text-[11px] font-bold text-violet-500 uppercase tracking-[0.14em] mb-2 select-none">
              What sounds more fun?
            </p>
            <div className="w-10 h-[2px] bg-gradient-to-r from-violet-400 to-purple-400 mx-auto rounded-full" />
          </div>

          {/* Two option tiles */}
          <div className="grid grid-cols-2 gap-3 px-5 pb-7">

            {/* Option A — Taking apart a radio */}
            <button
              aria-label="Taking apart a radio"
              className="group flex flex-col items-center gap-3 bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-5 border-2 border-blue-100 active:scale-[0.95] transition-transform duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-violet-200 rounded-xl flex items-center justify-center shadow-sm">
                <Radio
                  size={26}
                  strokeWidth={1.8}
                  className="text-violet-700"
                  aria-hidden="true"
                />
              </div>
              <span className="text-[13px] font-semibold text-slate-700 text-center leading-snug">
                Taking apart a radio
              </span>
            </button>

            {/* Option B — Writing a story */}
            <button
              aria-label="Writing a story"
              className="group flex flex-col items-center gap-3 bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-5 border-2 border-rose-100 active:scale-[0.95] transition-transform duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-amber-200 rounded-xl flex items-center justify-center shadow-sm">
                <PenLine
                  size={26}
                  strokeWidth={1.8}
                  className="text-rose-600"
                  aria-hidden="true"
                />
              </div>
              <span className="text-[13px] font-semibold text-slate-700 text-center leading-snug">
                Writing a story
              </span>
            </button>

          </div>

          {/* Subtle divider + "or" */}
          <div className="flex items-center gap-3 mx-6 mb-6">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[11px] font-medium text-slate-300 uppercase tracking-wider select-none">
              or
            </span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Skip this round */}
          <div className="text-center pb-6">
            <button className="text-[12px] text-slate-400 font-medium underline underline-offset-2 active:text-slate-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded">
              Skip this one
            </button>
          </div>

        </div>
      </div>

      {/* ── Floating Action Buttons ── */}
      <div className="flex items-center justify-center gap-14 pb-7" role="group" aria-label="Answer controls">

        {/* Discard — Red X */}
        <button
          aria-label="Discard — not interested"
          className="w-[70px] h-[70px] rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shadow-xl shadow-rose-300/60 active:scale-[0.88] transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
        >
          <X size={30} strokeWidth={2.5} className="text-white" aria-hidden="true" />
        </button>

        {/* Like — Green Heart */}
        <button
          aria-label="Like — sounds interesting"
          className="w-[70px] h-[70px] rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-xl shadow-emerald-300/60 active:scale-[0.88] transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
        >
          <Heart size={28} strokeWidth={2} fill="white" className="text-white" aria-hidden="true" />
        </button>

      </div>

    </div>
  );
}
