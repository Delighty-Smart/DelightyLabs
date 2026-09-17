import React from 'react';
import { Clock, MessageSquare, Star, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { BetaApp } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface HistoryViewProps {
  onSelectApp: (app: BetaApp) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onSelectApp }) => {
  const { user, apps, feedbackList, setActiveNav } = useAuth();

  const testedApps = apps.filter(app => user?.testedAppIds.includes(app.id));

  // Collect all feedback submitted by this user
  const userFeedbacks = Object.values(feedbackList).flat().filter(
    fb => fb.userId === user?.id || fb.userName.includes(user?.name || '---')
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-16">
      <div className="pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">Recently Opened Apps</h1>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {testedApps.length} Opened
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Review applications you have recently launched and accessed in Delighty Hub.
        </p>
      </div>

      {/* Tested Apps Row/List */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span>Recently Accessed Applications</span>
        </h2>

        {testedApps.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-2">
            <p className="text-xs text-zinc-400">You haven't run tests on any beta applications yet.</p>
            <button
              onClick={() => setActiveNav('gallery')}
              className="px-4 py-2 rounded-xl bg-blue-600 text-xs font-semibold text-white"
            >
              Start Testing Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testedApps.map((app) => (
              <div
                key={app.id}
                onClick={() => onSelectApp(app)}
                className="p-4 rounded-2xl bg-[#14171f] border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer flex items-center gap-4 group"
              >
                <img
                  src={app.thumbnail}
                  alt={app.title}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 truncate">
                      {app.title}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{app.tagline}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-zinc-800 text-zinc-300">
                      {app.version}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {app.modelOrEngine}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Submitted Feedback List */}
      <section className="space-y-4 pt-4">
        <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>My Bug Reports & Feedback ({userFeedbacks.length})</span>
        </h2>

        {userFeedbacks.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800 text-xs text-zinc-400">
            No feedback logs found. Open any beta app to submit reports or suggestions.
          </div>
        ) : (
          <div className="space-y-3">
            {userFeedbacks.map((fb) => (
              <div key={fb.id} className="p-4 rounded-2xl bg-[#14171f] border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      fb.type === 'bug' 
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {fb.type}
                    </span>
                    <span className="text-xs text-zinc-400">Submitted {fb.timestamp}</span>
                  </div>
                  <div className="flex items-center text-amber-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="ml-1">{fb.rating} / 5</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-zinc-200">{fb.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
