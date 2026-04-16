import { Send, Info } from 'lucide-react';

export default function FAQScreen() {
  return (
    <div className="flex-1 p-6 bg-[var(--background)] screen-enter flex flex-col">
      <h1 className="text-[var(--foreground)] text-3xl font-extrabold mb-6">FAQ</h1>
      
      <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex gap-3 mb-6">
        <Info size={20} className="text-indigo-600 shrink-0" />
        <p className="text-xs text-indigo-800 leading-tight">Your identity is hidden. Answers are provided by regional university students.</p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="bg-[var(--card)] p-4 rounded-2xl border border-[var(--border)]">
          <p className="font-bold text-sm text-[var(--foreground)]">Is the entrance exam hard?</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-2">Depends on the field, but motivation is key!</p>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-[var(--border)] flex gap-2">
        <input type="text" placeholder="Ask a question..." className="flex-1 bg-white border border-[var(--border)] rounded-xl px-4 py-2 text-sm" />
        <button className="bg-[var(--primary)] text-white p-3 rounded-xl"><Send size={18}/></button>
      </div>
    </div>
  );
}