import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Compass, 
  Sparkles, 
  Clock, 
  Bookmark, 
  MessageSquareCode, 
  BarChart3, 
  FileText, 
  Zap, 
  CheckCircle2, 
  LogOut, 
  ShieldCheck,
  Search,
  ExternalLink,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const MobileNav: React.FC = () => {
  const { 
    user, 
    activeNav, 
    setActiveNav, 
    redeemCredits, 
    hasRedeemedCredits, 
    setAuthModalOpen,
    logout 
  } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { id: 'gallery', label: 'Directory', icon: Compass },
    { id: 'bookmarked', label: 'Saved', icon: Bookmark },
    { id: 'history', label: 'Recently Opened', icon: Clock },
  ];

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-[#0c0e12]/95 backdrop-blur-md border-b border-[#222733] px-4 py-3 flex items-center justify-between">
        <div 
          onClick={() => setActiveNav('gallery')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px]">
            <div className="w-full h-full bg-[#0d1017] rounded-[7px] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>
          <span className="font-bold tracking-tight text-white text-base">DelightyLabs</span>
          <span className="text-[9px] font-semibold px-1 py-0.2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
            BETA
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const input = document.getElementById('global-search-input');
              input?.focus();
            }}
            className="p-2 rounded-lg bg-zinc-800/60 text-zinc-300 hover:text-white"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 rounded-lg bg-zinc-800/60 text-zinc-300 hover:text-white"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Slide-over Drawer for Mobile */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative flex-1 max-w-xs w-full bg-[#0e1117] border-r border-zinc-800 h-full flex flex-col p-4 shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white">DelightyLabs</span>
              </div>
              <button 
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex-1 overflow-y-auto py-4 space-y-5">
              <div>
                <p className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider px-2 mb-2">Directory</p>
                <div className="space-y-1">
                  <button
                    onClick={() => handleNavClick('gallery')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                      activeNav === 'gallery' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400'
                    }`}
                  >
                    <Compass className="w-4 h-4 text-blue-400" />
                    <span>App Directory</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('history')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                      activeNav === 'history' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-zinc-400" />
                    <span>Recently Opened</span>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider px-2 mb-2">My Workspace</p>
                <div className="space-y-1">
                  <button
                    onClick={() => handleNavClick('bookmarked')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                      activeNav === 'bookmarked' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Bookmark className="w-4 h-4 text-cyan-400" />
                      <span>Saved Apps</span>
                    </div>
                    {user?.bookmarkedAppIds.length ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                        {user.bookmarkedAppIds.length}
                      </span>
                    ) : null}
                  </button>
                  <button
                    onClick={() => handleNavClick('my-feedback')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                      activeNav === 'my-feedback' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400'
                    }`}
                  >
                    <MessageSquareCode className="w-4 h-4 text-emerald-400" />
                    <span>Reviews & Feedback</span>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider px-2 mb-2">Management</p>
                <div className="space-y-1">
                  <button
                    onClick={() => handleNavClick('admin')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                      activeNav === 'admin' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400'
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                    <span>Admin Portal</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                      activeNav === 'dashboard' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                    <span>Hub Stats & Overview</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('docs')}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-purple-400" />
                      <span>Hub Guidelines</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* User footer in Drawer */}
            <div className="pt-3 border-t border-zinc-800">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-zinc-800/40 rounded-xl">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-zinc-700" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                      {user.tier}
                    </span>
                  </div>

                  <button
                    onClick={() => { logout(); setDrawerOpen(false); }}
                    className="w-full py-2 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/40 border border-red-800/40 text-red-400 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setAuthModalOpen(true); setDrawerOpen(false); }}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-blue-600 text-white flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In / Join Beta</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar on Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0e12]/95 backdrop-blur-lg border-t border-zinc-800/80 px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-blue-400' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-blue-400' : ''}`} />
              <span className={`text-[10px] ${isActive ? 'font-semibold text-white' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Profile / Auth trigger */}
        <button
          onClick={() => {
            if (user) {
              setActiveNav('dashboard');
            } else {
              setAuthModalOpen(true);
            }
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeNav === 'dashboard' ? 'text-blue-400' : 'text-zinc-400'
          }`}
        >
          {user ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className={`w-5 h-5 rounded-full ring-1 ${activeNav === 'dashboard' ? 'ring-blue-400' : 'ring-zinc-700'}`} 
            />
          ) : (
            <ShieldCheck className="w-5 h-5" />
          )}
          <span className={`text-[10px] ${activeNav === 'dashboard' ? 'font-semibold text-white' : ''}`}>
            {user ? 'Account' : 'Sign In'}
          </span>
        </button>
      </nav>
    </>
  );
};
