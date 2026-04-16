import { useState, useEffect } from 'react';
import { Map, Layers, Users, MessageCircle, BarChart2, Moon, Sun, X, Type, Eye, Palette, Activity, RotateCcw } from 'lucide-react';

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

const UniversalAccessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="4" r="2" />
    <path d="M20 13c-2-2-5-3-8-3s-6 1-8 3" />
    <path d="M12 10v6" />
    <path d="M7 22l5-6 5 6" />
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [showAccess, setShowAccess] = useState(false);
  
  // Accessibility States
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexic, setDyslexic] = useState(false);
  const [motion, setMotion] = useState(false);
  const [textSize, setTextSize] = useState('normal');
  const [cb, setCb] = useState('none');

  const { Screen: ActiveScreen } = TABS.find((t) => t.id === activeTab);

  // Sync classes to HTML for rem scaling and theme propagation
  useEffect(() => {
    const classes = [
      darkMode ? 'dark' : '',
      highContrast ? 'high-contrast' : '',
      dyslexic ? 'font-dyslexic' : '',
      motion ? 'reduce-motion' : '',
      cb !== 'none' ? `filter-${cb}` : '',
      `text-size-${textSize}`
    ].filter(Boolean);
    
    document.documentElement.className = classes.join(' ');
  }, [darkMode, highContrast, dyslexic, motion, textSize, cb]);

  const resetAccess = () => {
    setDarkMode(false);
    setHighContrast(false);
    setDyslexic(false);
    setMotion(false);
    setTextSize('normal');
    setCb('none');
  };

  return (
    <div className="bg-slate-200 flex items-center justify-center min-h-[100dvh]">
      {/* Container width fixed at max-w-[448px] to keep strict mobile look during font growth */}
      <div className="relative w-full max-w-[448px] h-[100dvh] md:h-[90vh] md:max-h-[800px] mx-auto flex flex-col overflow-hidden bg-[var(--background)] shadow-2xl md:rounded-[40px] text-[var(--foreground)] transition-all">
        
        {/* Top Control Bar */}
        <div className="absolute top-4 left-4 right-4 z-50 flex justify-between">
          <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-white/90 dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform">
            {darkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-slate-600" />}
          </button>
          <button onClick={() => setShowAccess(true)} className="p-3 bg-[var(--primary)] text-white rounded-full shadow-lg hover:scale-105 transition-transform">
            <UniversalAccessIcon />
          </button>
        </div>

        {/* Accessibility Modal */}
        {showAccess && (
          <div className="absolute inset-0 bg-black/50 z-[100] flex items-end justify-center backdrop-blur-sm">
            <div className="bg-[var(--card)] w-full p-6 rounded-t-[30px] shadow-2xl max-h-[85%] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-[var(--foreground)]">
                  <UniversalAccessIcon /> Settings
                </h2>
                <button onClick={() => setShowAccess(false)} className="p-2 text-[var(--muted-foreground)]"><X /></button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button onClick={() => setHighContrast(!highContrast)} className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-bold text-xs transition-all ${highContrast ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'border-[var(--border)]'}`}>
                  <Eye size={18}/> High Contrast
                </button>
                <button onClick={() => setDyslexic(!dyslexic)} className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-bold text-xs transition-all ${dyslexic ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'border-[var(--border)]'}`}>
                  <Type size={18}/> Dyslexic Font
                </button>
              </div>

              <div className="mb-6">
                <label className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] mb-3 block">Colorblindness Type</label>
                <select value={cb} onChange={(e) => setCb(e.target.value)} className="w-full p-3 rounded-xl bg-[var(--background)] border-2 border-[var(--border)] font-bold text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]">
                  <option value="none">Standard Color</option>
                  <option value="deuteranopia">Deuteranopia (Green-Weak)</option>
                  <option value="protanopia">Protanopia (Red-Weak)</option>
                  <option value="tritanopia">Tritanopia (Blue-Weak)</option>
                  <option value="achromatopsia">Achromatopsia (Grayscale)</option>
                </select>
              </div>

              <div className="mb-8">
                <h3 className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] mb-3">Font size</h3>
                <div className="flex gap-2">
                  {['normal', 'large', 'xlarge'].map(s => (
                    <button key={s} onClick={() => setTextSize(s)} className={`flex-1 py-3 rounded-xl border-2 font-bold capitalize transition-all ${textSize === s ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'border-[var(--border)] text-[var(--muted-foreground)]'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Button at the bottom */}
              <button onClick={resetAccess} className="w-full py-4 rounded-xl border-2 border-red-100 text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-all active:scale-95">
                <RotateCcw size={18} /> Reset to Defaults
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto flex flex-col pt-16">
          <ActiveScreen onNavigate={setActiveTab} />
        </main>

        <nav className="shrink-0 border-t border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md">
          <ul className="flex">
            {TABS.map(({ id, label, Icon }) => (
              <li key={id} className="flex-1">
                <button onClick={() => setActiveTab(id)} className="w-full flex flex-col items-center gap-1 py-3 transition-all duration-150 active:scale-95">
                  <Icon size={22} className={activeTab === id ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'} />
                  <span className={`text-[10px] font-semibold ${activeTab === id ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Global Colorblindness Filters */}
        <svg style={{ display: 'none' }}>
          <defs>
            <filter id="protanopia"><feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0" /></filter>
            <filter id="deuteranopia"><feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0" /></filter>
            <filter id="tritanopia"><feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0" /></filter>
            <filter id="achromatopsia"><feColorMatrix type="matrix" values="0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0, 0, 0, 1, 0" /></filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}