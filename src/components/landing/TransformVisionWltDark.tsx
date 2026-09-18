import React from 'react';
import { Clock, TrendingUp, DollarSign, ArrowUpRight, Zap, BarChart3, Sparkles } from 'lucide-react';
import { BetaApp } from '../../types';

interface TransformVisionWltDarkProps {
  onSelectApp: (app: BetaApp) => void;
  apps: BetaApp[];
}

export const TransformVisionWltDark: React.FC<TransformVisionWltDarkProps> = ({ onSelectApp, apps }) => {
  const app = apps.find(a => a.id === 'lucent') || apps[0];

  const immediateValues = [
    { icon: Clock, text: 'See every purchase as real hours of your working life' },
    { icon: BarChart3, text: 'Live category spending charts with target tracking' },
    { icon: TrendingUp, text: 'Calculate your true hourly wage after all work costs' },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#0b0d12] text-white overflow-hidden
      px-4 sm:px-12 lg:px-24 py-14 sm:py-20 flex flex-col justify-between items-center
      shadow-2xl border-b border-zinc-800/80 select-none gap-8 sm:gap-10">

      {/* Background Looping Effect: Orbiting Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[800px] h-[800px] animate-spin-slow opacity-70">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#ccff00]/[0.08] rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-blue-600/15 rounded-full blur-[80px]" />
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-600/[0.08] rounded-full blur-[120px]" />
        </div>
      </div>

      {/* Sparkles */}
      <div className="absolute top-14 left-4 sm:top-20 sm:left-14 text-[#ccff00] animate-sparkle opacity-70 pointer-events-none">
        <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 fill-[#ccff00]" />
      </div>
      <div className="absolute bottom-14 right-4 sm:bottom-20 sm:right-14 text-[#ccff00] animate-sparkle opacity-50 pointer-events-none" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 fill-[#ccff00]" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center space-y-3 max-w-2xl w-full mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest">
          <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
          <span>Financial Clarity App</span>
        </div>

        <h2 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Stop Counting Money.{' '}
          <span className="text-[#ccff00] block sm:inline">Count the Hours of Your Life.</span>
        </h2>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg mx-auto">
          Lucent (Expendx) converts every purchase into what it truly costs — hours of your working life. 
          No more abstract numbers. Just radical financial clarity.
        </p>
      </div>

      {/* 3D Lime Pill Card */}
      <div className="relative z-10 w-full max-w-xl">
        <div
          onClick={() => app && onSelectApp(app)}
          className="pill-3d-card p-5 sm:p-8 flex flex-row items-center gap-4 sm:gap-6 cursor-pointer group"
        >
          <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-[#0b0d12] flex items-center justify-center flex-shrink-0 shadow-xl group-hover:rotate-6 transition-transform duration-300">
            <DollarSign className="w-7 h-7 sm:w-9 sm:h-9 text-[#ccff00]" />
          </div>

          <div className="flex-1 min-w-0 space-y-1.5 text-[#0b0d12]">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-xl font-black tracking-tight leading-tight">Lucent (Expendx)</h3>
              <span className="text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#0b0d12] text-[#ccff00] flex-shrink-0">v1.5</span>
            </div>
            <p className="text-[11px] sm:text-sm font-bold leading-relaxed line-clamp-3 opacity-90">
              {app?.painPoint || 'Traditional expense trackers only show currency numbers, making it hard to see what your spending actually costs you.'}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-black pt-0.5">
              <span>Open breakdown</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Value Pillars */}
      <div className="relative z-10 w-full max-w-xl grid grid-cols-1 sm:grid-cols-3 gap-3">
        {immediateValues.map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.05] border border-white/[0.08] hover:border-[#ccff00]/40 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-[#ccff00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon className="w-4 h-4 text-[#ccff00]" />
            </div>
            <p className="text-[11px] sm:text-xs font-bold text-zinc-300 leading-snug">{text}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
        <button
          onClick={() => app && onSelectApp(app)}
          className="px-6 py-3 rounded-full bg-[#ccff00] hover:bg-[#d8ff1a] text-[#0b0d12] font-extrabold text-sm shadow-neon-glow transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Explore Lucent</span>
          <ArrowUpRight className="w-4 h-4 flex-shrink-0" />
        </button>
        <a
          href="https://lucent.delightylabs.space"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full bg-transparent hover:bg-white/10 text-white border border-white/30 font-extrabold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          Launch App
        </a>
      </div>
    </section>
  );
};
