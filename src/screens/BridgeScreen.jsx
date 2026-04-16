import { MessageSquare, Users, Globe, Hash, ArrowRight } from 'lucide-react';

const HUBS = [
  { id: 1, name: 'Tech & AI Hub', members: 42, lastActive: '2m ago' },
  { id: 2, name: 'Creative Arts', members: 28, lastActive: '15m ago' },
  { id: 3, name: 'Science Circle', members: 19, lastActive: '1h ago' },
];

export default function BridgeScreen() {
  return (
    <div className="flex-1 flex flex-col bg-[var(--background)] p-6 screen-enter">
      <div className="pt-8 mb-6">
        <h1 className="text-[var(--foreground)] text-3xl font-[800]">Student Hub</h1>
        <p className="text-[var(--muted-foreground)] text-sm">Connect with students across Liberec</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-br from-[var(--primary)] to-indigo-600 p-5 rounded-2xl text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <Globe size={24} />
            <span className="bg-white/20 text-[10px] font-bold uppercase px-2 py-1 rounded-full">Regional Hub</span>
          </div>
          <h3 className="text-xl font-bold">Community Forum</h3>
          <p className="text-white/80 text-xs mt-1">Discuss paths and share advice with peers from Semily, Turnov, and Liberec.</p>
          <button className="mt-4 w-full bg-white text-[var(--primary)] font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2">
            Enter Forum <ArrowRight size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-bold uppercase text-[var(--muted-foreground)] tracking-widest mt-4">Active Groups</p>
          {HUBS.map(hub => (
            <div key={hub.id} className="bg-[var(--card)] border border-[var(--border)] p-4 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center text-[var(--primary)]">
                  <Hash size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-[var(--foreground)]">{hub.name}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)]">{hub.members} members · {hub.lastActive}</p>
                </div>
              </div>
              <button className="p-2 text-[var(--primary)]">
                <MessageSquare size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}