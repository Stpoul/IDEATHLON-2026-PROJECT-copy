import { useState } from 'react';
import { Map, Layers, Users, MessageCircle, BarChart2 } from 'lucide-react';

import RoadmapScreen from './screens/RoadmapScreen';
import SwipeScreen from './screens/SwipeScreen';
import BridgeScreen from './screens/BridgeScreen';
import FAQScreen from './screens/FAQScreen';
import ImpactScreen from './screens/ImpactScreen';

const TABS = [
  { id: 'roadmap', label: 'Journey',  Icon: Map,           Screen: RoadmapScreen },
  { id: 'swipe',   label: 'Discover', Icon: Layers,        Screen: SwipeScreen   },
  { id: 'bridge',  label: 'Connect',  Icon: Users,         Screen: BridgeScreen  },
  { id: 'faq',     label: 'FAQ',      Icon: MessageCircle, Screen: FAQScreen     },
  { id: 'impact',  label: 'Impact',   Icon: BarChart2,     Screen: ImpactScreen  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap');
  const { Screen: ActiveScreen } = TABS.find((t) => t.id === activeTab);

  return (
    <div className="bg-slate-200 flex items-center justify-center min-h-[100dvh]">
      <div className="relative w-full max-w-md h-[100dvh] md:h-[90vh] md:max-h-[800px] mx-auto flex flex-col overflow-hidden bg-[var(--background)] shadow-2xl md:rounded-[40px]">

        <main className="flex-1 overflow-y-auto flex flex-col">
          <ActiveScreen onNavigate={setActiveTab} />
        </main>

        <nav className="shrink-0 border-t border-[var(--border)] bg-white/80 backdrop-blur-lg">
          <ul className="flex">
            {TABS.map(({ id, label, Icon }) => {
              const active = activeTab === id;
              return (
                <li key={id} className="flex-1">
                  <button
                    onClick={() => setActiveTab(id)}
                    className="w-full flex flex-col items-center gap-1 py-3 transition-all duration-150 active:scale-95"
                  >
                    <Icon
                      size={22}
                      strokeWidth={active ? 2.5 : 2}
                      className={active ? 'text-[var(--primary)]' : 'text-gray-400'}
                    />
                    <span className={`text-[10px] font-semibold ${active ? 'text-[var(--primary)]' : 'text-gray-400'}`}>
                      {label}
                    </span>
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