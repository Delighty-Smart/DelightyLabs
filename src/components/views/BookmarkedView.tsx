import React from 'react';
import { Bookmark, Compass, Sparkles } from 'lucide-react';
import { BetaApp } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { AppCard } from '../gallery/AppCard';

interface BookmarkedViewProps {
  onSelectApp: (app: BetaApp) => void;
}

export const BookmarkedView: React.FC<BookmarkedViewProps> = ({ onSelectApp }) => {
  const { user, apps, setActiveNav, setAuthModalOpen } = useAuth();

  const savedApps = apps.filter(app => user?.bookmarkedAppIds.includes(app.id));

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-16">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Saved Apps</h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Library ({savedApps.length})
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Apps pinned to your personal library for quick access.
          </p>
        </div>

        <button
          onClick={() => setActiveNav('gallery')}
          className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          <Compass className="w-4 h-4 text-blue-400" />
          <span>Explore Apps</span>
        </button>
      </div>

      {!user ? (
        <div className="py-16 text-center rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
          <Bookmark className="w-12 h-12 text-zinc-500 mx-auto" />
          <h3 className="text-base font-semibold text-white">Sign in to save apps</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Create an account to pin your favorite apps for quick launch.
          </p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-glow-sm"
          >
            Sign in
          </button>
        </div>
      ) : savedApps.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
          <Bookmark className="w-12 h-12 text-zinc-500 mx-auto" />
          <h3 className="text-base font-semibold text-white">No saved apps</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Click the bookmark icon on any app card to pin it here.
          </p>
          <button
            onClick={() => setActiveNav('gallery')}
            className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold"
          >
            Browse Apps
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedApps.map((app) => (
            <AppCard key={app.id} app={app} onOpen={onSelectApp} />
          ))}
        </div>
      )}
    </div>
  );
};
