import { useState } from 'react';
import { Map, Layers, Users, BarChart2 } from 'lucide-react';
import SwipeScreen from './screens/SwipeScreen';
import RoadmapScreen from './screens/RoadmapScreen';

function BridgeScreen() {
  return <div className="flex-1 flex items-center justify-center text-slate-400">Bridge Screen</div>;
}

function ImpactScreen() {
  return <div className="flex-1 flex items-center justify-center text-slate-400">Impact Screen</div>;
}

// --- Navigation Config ---
const TABS = [
  { id: 'roadmap', label: 'Roadmap', Icon: Map,      Screen: RoadmapScreen },
  { id: 'swipe',   label: 'Discover', Icon: Layers,  Screen: SwipeScreen   },
  { id: 'bridge',  label: 'Connect',  Icon: Users,   Screen: BridgeScreen  },
  { id: 'impact',  label: 'Impact',   Icon: BarChart2, Screen: ImpactScreen },
];

// --- App Shell ---
export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap');

  const { Screen: ActiveScreen } = TABS.find((t) => t.id === activeTab);

  return (
    // Outer centering wrapper — fills the full viewport on desktop
    <div className="min-h-[100dvh] bg-slate-200 flex items-center justify-center">

      {/* Mobile container — simulates a native app frame */}
      <div className="relative w-full max-w-md h-[100dvh] md:h-[85dvh] mx-auto flex flex-col overflow-hidden bg-slate-50 shadow-2xl md:rounded-3xl">

        {/* Screen content */}
        <main className="flex-1 overflow-y-auto flex flex-col">
          <ActiveScreen />
        </main>

        {/* Fixed bottom navigation */}
        <nav className="shrink-0 border-t border-slate-200 bg-white/80 backdrop-blur-md">
          <ul className="flex">
            {TABS.map(({ id, label, Icon }) => {
              const isActive = activeTab === id;
              return (
                <li key={id} className="flex-1">
                  <button
                    onClick={() => setActiveTab(id)}
                    aria-label={label}
                    aria-current={isActive ? 'page' : undefined}
                    className={[
                      'w-full flex flex-col items-center gap-1 py-3 text-[10px] font-medium tracking-wide transition-colors',
                      isActive
                        ? 'text-violet-600'
                        : 'text-slate-400 hover:text-slate-600',
                    ].join(' ')}
                  >
                    <Icon
                      size={22}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      className={isActive ? 'drop-shadow-[0_0_6px_rgba(124,58,237,0.5)]' : ''}
                    />
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

      </div>
    </div>
  );
}
