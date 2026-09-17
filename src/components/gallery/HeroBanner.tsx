import React from 'react';
import { ArrowRight, Sparkles, Zap, Flame } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeroBannerProps {
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  const { setActiveNav, setSelectedAppId } = useAuth();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#12151d] via-[#10131a] to-[#161a24] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl transition-all">
      {/* Background radial glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Column Text & Action */}
        <div className="max-w-xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Central Apps Directory</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Delighty Hub — Central Apps Directory
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Your single destination to explore, launch, bookmark, and manage published applications across ecological data visualizations, interactive tools, and creative experiences.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreClick}
              className="px-6 py-3 rounded-2xl bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-sm transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
            >
              <span>Explore Directory</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setSelectedAppId('scribera');
              }}
              className="px-5 py-3 rounded-2xl bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/60 font-medium text-sm transition-all hover:border-zinc-500"
            >
              Open Scribera App
            </button>
          </div>
        </div>

        {/* Right Column: Layered Card Stack Visual featuring Real Apps */}
        <div className="relative w-full lg:w-[460px] h-48 sm:h-56 flex items-center justify-center select-none">
          {/* Layer 1: Left Tilted Card - Refresh Studio */}
          <div 
            onClick={() => setSelectedAppId('refresh-studio')}
            className="absolute left-0 sm:left-4 -rotate-6 w-36 sm:w-44 h-40 sm:h-48 rounded-2xl overflow-hidden border border-white/15 bg-zinc-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer group"
          >
            <img 
              src="/apps/refresh-studio.png" 
              alt="Refresh Studio preview"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2.5 flex flex-col justify-end">
              <span className="text-[10px] font-semibold text-white truncate">Refresh Studio</span>
              <span className="text-[9px] text-zinc-300">Design Trainer</span>
            </div>
          </div>

          {/* Layer 2: Center Featured Card - Scribera */}
          <div 
            onClick={() => setSelectedAppId('scribera')}
            className="absolute z-10 w-44 sm:w-52 h-44 sm:h-52 rounded-2xl overflow-hidden border border-white/20 bg-zinc-800 shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer group"
          >
            <img 
              src="/apps/scribera.png" 
              alt="Scribera preview"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 flex flex-col justify-end">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold text-white truncate">Scribera</span>
              </div>
              <span className="text-[10px] text-emerald-300">Devotional Platform</span>
            </div>
          </div>

          {/* Layer 3: Right Tilted Card - Refloww */}
          <div 
            onClick={() => setSelectedAppId('refloww')}
            className="absolute right-0 sm:right-4 rotate-6 w-40 sm:w-48 h-40 sm:h-48 rounded-2xl overflow-hidden border border-white/15 bg-zinc-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer group"
          >
            <img 
              src="/apps/refloww.png" 
              alt="Refloww preview"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 text-[9px] text-zinc-100 font-medium">
              Invoices
            </div>
            <div className="absolute bottom-5 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 text-[9px] text-zinc-100 font-medium">
              Finance
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
