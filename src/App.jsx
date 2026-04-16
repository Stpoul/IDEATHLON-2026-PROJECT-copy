import { useState, useEffect } from 'react';
import { Map, Layers, Users, MessageCircle, BarChart2, Accessibility, X, Moon, Sun, Type, Eye, Move } from 'lucide-react';

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
  const [showAccess, setShowAccess] = useState(false);
  
  // Accessibility State
  const [darkMode, setDarkMode] = useState(false);
  const [dyslexic, setDyslexic] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState('normal'); // normal, large, xlarge
  const [reduceMotion, setReduceMotion] = useState(false);

  const { Screen: ActiveScreen } = TABS.find((t) => t.id === activeTab);

  const appClasses = `
    ${darkMode ? 'dark' : ''} 
    ${dyslexic ? 'font-dyslexic' : ''} 
    ${highContrast ? 'high-contrast' : ''} 
    ${reduceMotion ? 'reduce-motion' : ''} 
    text-size-${textSize}
  `;

  return (
    <div className={`${appClasses} bg-slate-200 flex items-center justify-center min-h-[100dvh]`}>
      <div className="relative w-full max-w-md h-[100dvh] md:h-[90vh] md:max-h-[800px] mx-auto flex flex-col overflow-hidden bg-[var(--background)] shadow-2xl md:rounded-[40px] text-[var(--foreground)]">
        
        {/* Floating Access Button */}
        <button 
          onClick={() => setShowAccess(true)}
          className="absolute top-4 right-4 z-50 p-3 bg-[var(--primary)] text-white rounded-full shadow-lg"
        >
          <Accessibility size={24} />
        </button>

        {/* Access Menu Backdrop */}
        {showAccess && (
          <div className="absolute inset-0 bg-black/40 z-[60] flex items-end justify-center">
            <div className="bg-[var(--card)] w-full p-6 rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Accessibility</h2>
                <button onClick={() => setShowAccess(false)}><X /></button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <AccessToggle icon={<Moon size={20}/>} label="Dark Mode" active={darkMode} onClick={() => setDarkMode(!darkMode)} />
                <AccessToggle icon={<Type size={20}/>} label="Dyslexia Font" active={dyslexic} onClick={() => setDyslexic(!dyslexic)} />
                <AccessToggle icon={<Eye size={20}/>} label="High Contrast" active={highContrast} onClick={() => setHighContrast(!highContrast)} />
                <AccessToggle icon={<Move size={20}/>} label="Reduce Motion" active={reduceMotion} onClick={() => setReduceMotion(!reduceMotion)} />
              </div>

              <div className="flex gap-2">
                 {['normal', 'large', 'xlarge'].map(size => (
                   <button 
                    key={size}
                    onClick={() => setTextSize(size)}
                    className={`flex-1 py-2 rounded-xl border font-bold capitalize ${textSize === size ? 'bg-[var(--primary)] text-white' : 'bg-[var(--background)]'}`}
                   >
                     {size}
                   </button>
                 ))}
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto flex flex-col">
          <ActiveScreen onNavigate={setActiveTab} />
        </main>

        <nav className="shrink-0 border-t border-[var(--border)] bg-[var(--card)]">
          <ul className="flex">
            {TABS.map(({ id, label, Icon }) => {
              const active = activeTab === id;
              return (
                <li key={id} className="flex-1">
                  <button onClick={() => setActiveTab(id)} className="w-full flex flex-col items-center gap-1 py-3 transition-all duration-150 active:scale-95">
                    <Icon size={22} className={active ? 'text-[var(--primary)]' : 'text-gray-400'} />
                    <span className={`text-[10px] font-semibold ${active ? 'text-[var(--primary)]' : 'text-gray-400'}`}>{label}</span>
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

function AccessToggle({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 p-3 rounded-xl border ${active ? 'bg-[var(--primary)] text-white' : 'bg-[var(--background)]'}`}>
      {icon} <span className="text-xs font-bold">{label}</span>
    </button>
  );
}