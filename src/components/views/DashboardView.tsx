import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Key, 
  ShieldCheck, 
  Award, 
  ExternalLink,
  BookOpen,
  DollarSign,
  Clock,
  Layers,
  Users,
  Star,
  MessageSquare,
  Bookmark
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const DashboardView: React.FC = () => {
  const { user, apps, feedbackList, activityLogs, redeemCredits, hasRedeemedCredits, showToast } = useAuth();
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const mockApiKey = 'dl_live_994a8f3b21c499872e817c';

  const copyKey = () => {
    navigator.clipboard.writeText(mockApiKey);
    setApiKeyCopied(true);
    showToast('Tester API Key copied to clipboard');
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  // Real-time calculated hub statistics
  const hubStats = useMemo(() => {
    const totalApps = apps.length;
    const totalAccesses = apps.reduce((acc, a) => acc + (a.testersCount || 0), 0);
    const totalSaved = user?.bookmarkedAppIds.length || 0;
    const totalFeedbacks = Object.values(feedbackList).reduce((acc, list) => acc + list.length, 0);
    const avgRating = totalApps > 0 
      ? (apps.reduce((acc, a) => acc + (a.rating || 0), 0) / totalApps).toFixed(2)
      : '0.00';

    return { totalApps, totalAccesses, totalSaved, totalFeedbacks, avgRating };
  }, [apps, user, feedbackList]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-16">
      <div className="pb-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Hub Metrics & Activity Dashboard</h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              REAL-TIME
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real-time telemetry and calculated activity metrics for published applications across Delighty Hub.
          </p>
        </div>

        <span className="text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 self-start sm:self-auto">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Telemetry Active</span>
        </span>
      </div>

      {/* Grid of Real-Time Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#141720] border border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Catalog Apps</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-2xl font-extrabold text-white">{hubStats.totalApps}</span>
          <p className="text-[11px] text-zinc-500">Published applications</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#141720] border border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Accesses</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-2xl font-extrabold text-cyan-300">{hubStats.totalAccesses.toLocaleString()}</span>
          <p className="text-[11px] text-zinc-500">Calculated launch events</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#141720] border border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Catalog Score</span>
            <Star className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-extrabold text-amber-400">{hubStats.avgRating} <span className="text-xs text-zinc-500">/ 5.0</span></span>
          <p className="text-[11px] text-zinc-500">From real user reviews</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#141720] border border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Reviews</span>
            <MessageSquare className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-2xl font-extrabold text-indigo-300">{hubStats.totalFeedbacks}</span>
          <p className="text-[11px] text-zinc-500">Submitted reviews & feedback</p>
        </div>
      </div>

      {/* Real-time Recent Activity Log Feed */}
      <div className="p-6 rounded-3xl bg-[#141720] border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span>Real-Time Activity Feed</span>
          </h2>
          <span className="text-xs font-mono text-zinc-400">{activityLogs.length} events logged</span>
        </div>

        <div className="space-y-2.5">
          {activityLogs.length === 0 ? (
            <p className="text-xs text-zinc-500 italic p-4 text-center">No activity recorded yet. Launch apps or submit reviews to see real-time updates.</p>
          ) : (
            activityLogs.slice(0, 6).map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={log.userAvatar} alt={log.userName} className="w-7 h-7 rounded-full bg-zinc-800 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">{log.userName}</span>
                      <span className={`text-[9px] uppercase font-bold px-2 py-0.2 rounded ${
                        log.type === 'launch'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : log.type === 'review'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : log.type === 'bookmark'
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {log.type}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 mt-0.5">{log.details}</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-zinc-500 whitespace-nowrap ml-4">{log.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Developer Keys & Guidelines Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-3xl bg-[#14171f] border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Developer Access Token</span>
            <Key className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-xs text-zinc-400">Personal bearer token for API access and automated launcher suites.</p>
          <div className="flex items-center gap-2 p-2 bg-[#0c0e12] rounded-xl border border-zinc-800">
            <code className="text-[11px] font-mono text-zinc-300 truncate flex-1">{mockApiKey}</code>
            <button
              onClick={copyKey}
              className="p-1 text-zinc-400 hover:text-white"
              title="Copy API Key"
            >
              {apiKeyCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#14171f] border border-zinc-800 space-y-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>Delighty Hub Publishing Guidelines</span>
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            All submitted applications must adhere to web standards, responsive design guidelines, and HTTPS deployment requirements before public catalog listing.
          </p>
        </div>
      </div>
    </div>
  );
};
