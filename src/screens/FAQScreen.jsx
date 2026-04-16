import { useState } from 'react';
import { Send, Info, CheckCircle2 } from 'lucide-react';

const FAQ_DATA = [
  {
    q: "Jak těžké je přijímací řízení na TUL?",
    a: "Záleží na oboru. Na informatiku stačí maturita a motivační dopis. Není to tak strašné!",
    by: "Tomáš, 2. ročník FT TUL"
  },
  {
    q: "Musím umět perfektně anglicky?",
    a: "Základy stačí. Angličtinu se naučíš během studia, věř mi.",
    by: "Karolína, 3. ročník EF TUL"
  },
  {
    q: "Dá se studovat a zároveň pracovat?",
    a: "Ano! Já pracuji 20h týdně a zvládám to. Klíč je dobrý rozvrh.",
    by: "Marek, 4. ročník FS TUL"
  }
];

export default function FAQScreen() {
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim().length > 5) {
      setSubmitted(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] screen-enter">
      <div className="px-6 pt-14 pb-6">
        <p className="text-[var(--muted-foreground)] text-sm font-medium">Zeptej se někoho staršího</p>
        <h1 className="text-[var(--foreground)] text-3xl font-[800] mt-1">FAQ</h1>
      </div>

      <div className="mx-6 mb-6 bg-purple-100/70 p-4 rounded-2xl flex items-start gap-3 border border-purple-200">
        <Info size={20} className="text-[var(--primary)] shrink-0 mt-0.5" />
        <p className="text-sm text-purple-800 leading-relaxed">
          Tvoje otázka je anonymní. Odpovídají studenti VŠ z Libereckého kraje.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="flex flex-col gap-4">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 shadow-lg shadow-gray-500/5">
              <p className="font-bold text-[var(--foreground)] mb-3">{item.q}</p>
              <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-4">{item.a}</p>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-purple-100 text-[var(--primary)]">{item.by}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-4 bg-white/80 backdrop-blur-lg border-t border-[var(--border)]">
        {submitted ? (
          <div className="text-center py-4 text-[var(--success)] font-bold flex items-center justify-center gap-2">
            <CheckCircle2 size={20} />
            <span>Otázka odeslána! Odpovíme do 48 hodin.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Napiš svou otázku..."
              className="flex-1 w-full bg-gray-100 border-2 border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
            <button
              type="submit"
              className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center shrink-0 shadow-lg shadow-purple-200 active:scale-95 transition-all duration-150"
            >
              <Send size={20} className="text-white" />
            </button>
          </form>
        )}
      </div>
      
      <p className="text-center text-gray-400 text-[10px] px-6 py-3">
        Všechny otázky jsou anonymní · V souladu s GDPR (zákon č. 110/2019 Sb.)
      </p>
    </div>
  );
}