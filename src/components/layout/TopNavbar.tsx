import React, { useState } from 'react';
import { FlaskConical, ShieldCheck, Settings, X, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TopNavbarProps {
  onOpenSettings: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onOpenSettings }) => {
  const { user, setAuthModalOpen, logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0e12]/90 backdrop-blur-xl border-b border-zinc-800/60 px-4 sm:px-8 py-3 transition-all select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">

        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#ccff00] via-cyan-400 to-blue-500 p-[1.5px] shadow-neon-glow">
            <div className="w-full h-full bg-[#0b0d12] rounded-[10px] sm:rounded-[14px] flex items-center justify-center">
              <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 text-[#ccff00]" />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-tight text-white text-base sm:text-lg font-sans">
              Delighty<span className="text-[#ccff00]">Labs</span>
            </span>
            <span className="hidden sm:inline text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30 uppercase tracking-wider">
              Beta
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">

          <button
            onClick={onOpenSettings}
            className="p-1.5 sm:p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all border border-zinc-700/50 hidden sm:flex items-center justify-center"
            title="Preferences"
          >
            <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/60 transition-all"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full bg-zinc-700 object-cover ring-1 ring-[#ccff00]/60"
                />
                <span className="hidden sm:inline text-xs font-bold text-white px-1">
                  {user.name.split(' ')[0]}
                </span>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 p-3 bg-[#171a22] border border-[#2c3240] rounded-2xl shadow-2xl z-50 text-xs space-y-2">
                  <div className="border-b border-zinc-700/60 pb-2">
                    <p className="font-bold text-white">{user.name}</p>
                    <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { logout(); setProfileMenuOpen(false); }}
                    className="w-full text-left p-2 rounded-xl hover:bg-red-500/10 text-red-400 flex items-center gap-2 font-semibold transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-extrabold bg-[#ccff00] text-[#0b0d12] shadow-neon-glow hover:bg-[#d8ff1a] transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Sign In</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
