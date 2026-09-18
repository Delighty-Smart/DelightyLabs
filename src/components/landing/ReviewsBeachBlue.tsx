import React from 'react';
import { Layout, Eye, Sliders, Star, ArrowUpRight, Monitor } from 'lucide-react';
import { BetaApp } from '../../types';

interface ReviewsBeachBlueProps {
  apps: BetaApp[];
  onSelectApp: (app: BetaApp) => void;
}

export const ReviewsBeachBlue: React.FC<ReviewsBeachBlueProps> = ({ apps, onSelectApp }) => {
  const app = apps.find(a => a.id === 'refresh-studio') || apps[2];

  const exercises = [
    { label: 'Alignment Drills', score: 98, color: '#ccff00' },
    { label: 'Color Contrast', score: 94, color: '#00f2fe' },
    { label: 'Layout Hierarchy', score: 87, color: '#a78bfa' },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#0047ff] text-white overflow-hidden
      px-4 sm:px-12 lg:px-24 py-14 sm:py-20 flex flex-col justify-between items-center text-center
      shadow-2xl select-none border-b border-blue-400/30 gap-8 sm:gap-10">

      {/* Background Looping Effect: Geometric Wireframes & Spheres */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Abstract Floating Shapes (Original Spheres) */}
        <div className="absolute top-10 left-10 animate-float-slow opacity-80" style={{ animationDelay: '0s' }}>
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 blur-sm shadow-[0_0_30px_rgba(34,211,238,0.4)] sphere-3d" />
        </div>
        <div className="absolute top-40 right-12 animate-float-slow opacity-60" style={{ animationDelay: '1.5s' }}>
          <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-white to-blue-200 blur-[2px] shadow-[0_0_20px_rgba(255,255,255,0.5)] sphere-3d" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float-slow opacity-70" style={{ animationDelay: '3s' }}>
          <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 blur-[1px] shadow-[0_0_25px_rgba(59,130,246,0.4)] sphere-3d" />
        </div>

        {/* Rotating Geometric Wireframes */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
          <div className="absolute w-[40vw] h-[40vw] border-[2px] border-white animate-spin-slow" style={{ animationDuration: '40s' }} />
          <div className="absolute w-[35vw] h-[35vw] border-[2px] border-white animate-spin-slow" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
          <div className="absolute w-[50vw] h-[50vw] border-[1px] border-white rounded-full animate-pulse-glow" />
        </div>
      </div>

      {/* Floating Spheres — tucked to edges so they don't block content */}
      <div className="absolute top-6 left-4 w-14 h-14 sm:w-24 sm:h-24 rounded-full sphere-3d-lime animate-float-slow opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 right-4 w-16 h-16 sm:w-32 sm:h-32 rounded-full sphere-3d-lime blur-sm animate-float-slow opacity-70 pointer-events-none" style={{ animationDelay: '1.5s' }} />
      <div className="absolute -bottom-6 left-1/3 w-24 h-24 sm:w-44 sm:h-44 rounded-full sphere-3d-lime blur-[4px] opacity-50 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 space-y-3 max-w-xl w-full mx-auto">
        <span className="inline-block text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/20 text-white backdrop-blur-md">
          Interactive UI Design Trainer
        </span>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Master UI Design Rules{' '}
          <span className="text-[#ccff00] block sm:inline">Through Hands-On Practice.</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto font-semibold leading-relaxed">
          {app?.painPoint || 'Reading UI guidelines is dry. Without interactive practice, spotting alignment and contrast errors is nearly impossible.'}
        </p>
      </div>

      {/* White Score Card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <div
          onClick={() => app && onSelectApp(app)}
          className="relative rounded-[2rem] sm:rounded-[2.5rem] bg-white text-zinc-900 px-5 py-7 sm:p-9 shadow-2xl border border-zinc-100 space-y-4 text-center cursor-pointer hover:scale-[1.02] transition-all"
        >
          {/* Icon Ring */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0047ff] flex items-center justify-center shadow-2xl ring-4 ring-white">
            <Monitor className="w-6 h-6 sm:w-7 sm:h-7 text-[#ccff00]" />
          </div>

          <div className="pt-4 space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-black text-zinc-900">Refresh Studio</h3>
            <p className="text-[10px] sm:text-xs text-zinc-500 font-semibold leading-relaxed">
              {app?.tagline || 'Visual Design Rules & UI Trainer'}
            </p>

            {/* Score Bars */}
            <div className="space-y-2.5 sm:space-y-3 text-left">
              {exercises.map(({ label, score, color }) => (
                <div key={label} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold">
                    <span className="text-zinc-700">{label}</span>
                    <span className="font-black" style={{ color }}>{score}%</span>
                  </div>
                  <div className="w-full h-1.5 sm:h-2 rounded-full bg-zinc-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${score}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#ccff00] text-[#ccff00]" />
              ))}
              <span className="text-[10px] sm:text-xs font-bold text-zinc-500 ml-1">v1.0.4</span>
            </div>

            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0047ff] text-white text-[10px] sm:text-xs font-black shadow">
              Design Rules Training Platform
            </span>
          </div>
        </div>
      </div>

      {/* Feature Pills — 3 columns, compact on mobile */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { icon: Layout, label: 'Alignment' },
          { icon: Eye, label: 'Contrast' },
          { icon: Sliders, label: 'Hierarchy' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/15 border border-white/20 space-y-1.5 hover:bg-white/25 transition-colors">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-[#ccff00]" />
            <p className="text-[9px] sm:text-[10px] font-bold text-white">{label}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
        <button
          onClick={() => app && onSelectApp(app)}
          className="px-6 py-3 rounded-full bg-[#ccff00] hover:bg-[#d8ff1a] text-[#0b0d12] font-extrabold text-sm shadow-neon-glow transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Start Training</span>
          <ArrowUpRight className="w-4 h-4 flex-shrink-0" />
        </button>
        <a
          href="https://refresh.delightylabs.space"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full border border-white/50 text-white font-extrabold text-sm hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center"
        >
          Launch Refresh Studio
        </a>
      </div>
    </section>
  );
};
