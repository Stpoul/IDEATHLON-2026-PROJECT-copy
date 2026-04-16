import { useState } from 'react';
import { Send, Info, MessageCircle, User } from 'lucide-react';

export default function FAQScreen() {
  const [question, setQuestion] = useState('');

  return (
    <div className="flex-1 p-6 bg-[var(--background)] screen-enter flex flex-col">
      <div className="pt-8 mb-6">
        <h1 className="text-[var(--foreground)] text-3xl font-[800]">FAQ & Help</h1>
        <p className="text-[var(--muted-foreground)] text-sm">Anonymous questions for regional mentors</p>
      </div>
      
      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 flex gap-3 mb-6">
        <Info size={20} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
        <p className="text-xs text-indigo-800 dark:text-indigo-200 leading-tight">
          Your identity is hidden. Questions are answered by students from Liberec universities.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-6">
        <p className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] tracking-widest">Recently Answered</p>
        
        {/* Answer Demo */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-[var(--border)]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-[var(--muted-foreground)]">
                <User size={12} />
              </div>
              <span className="text-[10px] font-bold text-[var(--muted-foreground)]">Anonymous Student</span>
            </div>
            <p className="text-sm font-bold text-[var(--foreground)]">Is the entrance exam at TUL very hard?</p>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center text-white">
                <MessageCircle size={12} fill="white" />
              </div>
              <span className="text-[10px] font-bold text-[var(--primary)]">Alumni Response</span>
            </div>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              "It varies by faculty, but the main focus is on your motivation. For IT, if you've been swiping technical skills in SkillSwipe, you're already on the right path!"
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-[var(--border)]">
        <p className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] mb-3 tracking-widest">Ask a Question</p>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="How do scholarships work?" 
            className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] transition-colors text-[var(--foreground)]" 
          />
          <button className="bg-[var(--primary)] text-white p-3 rounded-xl shadow-md active:scale-95 transition-all">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}