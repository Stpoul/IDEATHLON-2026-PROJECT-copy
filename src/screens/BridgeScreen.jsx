import { Star, MessageCircle, School, Cpu } from 'lucide-react';

export default function BridgeScreen() {
  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] p-6 screen-enter">
      <h1 className="text-[var(--foreground)] text-3xl font-extrabold mb-6">Your Match</h1>
      
      <div className="bg-gradient-to-br from-[var(--primary)] to-indigo-600 rounded-3xl p-6 text-white shadow-xl mb-6 flex items-center gap-4">
        <Star size={40} fill="white" strokeWidth={0} />
        <div>
          <h2 className="text-2xl font-bold">94% Match</h2>
          <p className="text-white/80 text-sm">Great connection with Jakub!</p>
        </div>
      </div>

      <div className="bg-[var(--card)] rounded-3xl p-6 border border-[var(--border)] shadow-lg text-center mb-6">
        <div className="w-20 h-20 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center text-indigo-600 text-2xl font-bold">JN</div>
        <h3 className="text-[var(--foreground)] text-xl font-bold">Jakub Novak</h3>
        <p className="text-[var(--muted-foreground)] text-sm mb-4">Student at TUL University</p>
        <div className="flex justify-center gap-2 mb-6">
          <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">IT</span>
          <span className="bg-purple-50 text-purple-600 text-xs font-bold px-3 py-1 rounded-full">Logic</span>
        </div>
        <button className="w-full bg-[var(--primary)] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
          <MessageCircle size={20} /> Ask Anonymously
        </button>
      </div>
    </div>
  );
}