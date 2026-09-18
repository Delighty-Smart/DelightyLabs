import React from 'react';
import { ArrowUpRight, FileText, Receipt, Globe2, Download } from 'lucide-react';
import { BetaApp } from '../../types';

interface BaseClubBlueprintProps {
  apps: BetaApp[];
  onSelectApp: (app: BetaApp) => void;
}

export const BaseClubBlueprint: React.FC<BaseClubBlueprintProps> = ({ apps, onSelectApp }) => {
  const app = apps.find(a => a.id === 'refloww') || apps[3];

  const features = [
    {
      icon: FileText,
      title: 'Professional Invoices',
      desc: 'Branded client invoices in seconds with customizable templates.',
    },
    {
      icon: Receipt,
      title: 'Receipts & Delivery Notes',
      desc: 'Every transaction documented and ready to send instantly.',
    },
    {
      icon: Globe2,
      title: 'Multi-Currency & Tax',
      desc: 'Automatic currency conversion with country-specific tax presets.',
    },
    {
      icon: Download,
      title: 'Instant PDF Export',
      desc: 'One-click polished PDF documents — ready to email clients.',
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#0038ff] text-white overflow-hidden
      bg-blueprint-grid px-4 sm:px-12 lg:px-24 py-10 sm:py-16
      flex flex-col justify-between gap-8 sm:gap-10 shadow-2xl select-none">

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-[#ccff00] text-[#0b0d12] text-[10px] sm:text-xs font-black uppercase font-mono leading-none">
            DELIGHTY LABS
          </span>
          <span className="text-[11px] text-white/70 font-bold hidden sm:inline">Open Beta Suite</span>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-white/15 text-white text-[10px] sm:text-xs font-black uppercase border border-white/25">
          Finance Tool
        </span>
      </div>

      {/* Center — Outline Typography */}
      <div className="relative z-10 text-center">
        {/* Giant outlined text - Marquee */}
        <div className="relative w-full overflow-hidden flex flex-col gap-2 pt-4 pb-2" style={{ fontFamily: "'Futura', 'Century Gothic', sans-serif" }}>
          
          {/* Top Marquee: REFLOWW */}
          <div className="flex w-max animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={`refloww-${i}`} className="flex shrink-0 items-center gap-8 px-4">
                {[...Array(4)].map((_, j) => (
                  <h2 key={j} className="text-[min(14vw,7rem)] font-black tracking-tighter text-outline-white uppercase leading-[0.9] select-none">
                    REFLOWW
                  </h2>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom Marquee: Multiple words */}
          <div className="flex w-max animate-marquee-reverse">
            {[...Array(2)].map((_, i) => (
              <div key={`words-${i}`} className="flex shrink-0 items-center gap-8 px-4">
                {['INVOICES', 'RECEIPTS', 'DELIVERY NOTES', 'POS STORE', 'STOREFRONTS'].map((word, j) => (
                  <h2 key={j} className="text-[min(14vw,7rem)] font-black tracking-tighter uppercase leading-[0.9] select-none [-webkit-text-stroke:2px_#ccff00] text-transparent whitespace-nowrap">
                    {word}
                  </h2>
                ))}
              </div>
            ))}
          </div>

        </div>
        {/* Floating Badges — positioned relative to this block, hidden on very small */}
        <div className="hidden sm:flex absolute -top-3 right-0 lg:-right-8 p-2.5 sm:p-3 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl items-center gap-2 animate-float-slow">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#ccff00] flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-[#0b0d12]" />
          </div>
          <div className="text-left text-xs font-bold">
            <p className="text-white font-mono text-[10px]">INV-2026-089</p>
            <p className="text-[#ccff00] text-[9px]">Generated ✓</p>
          </div>
        </div>

        <div className="hidden sm:flex absolute -bottom-3 left-0 lg:-left-8 p-2.5 sm:p-3 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl items-center gap-2 animate-float-slow" style={{ animationDelay: '2s' }}>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
            <Globe2 className="w-4 h-4 text-[#0038ff]" />
          </div>
          <div className="text-left text-xs font-bold">
            <p className="text-white font-mono text-[10px]">Multi-Currency</p>
            <p className="text-[#ccff00] text-[9px]">USD · GBP · EUR · NGN</p>
          </div>
        </div>

        {/* Mobile-only compact badges (inline, no absolute positioning) */}
        <div className="flex sm:hidden items-center justify-center gap-2 mt-4 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/20 border border-white/30">
            <FileText className="w-3.5 h-3.5 text-[#ccff00]" />
            <span className="text-[10px] font-black text-white">INV-2026-089 ✓</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/20 border border-white/30">
            <Globe2 className="w-3.5 h-3.5 text-[#ccff00]" />
            <span className="text-[10px] font-black text-white">USD · GBP · EUR · NGN</span>
          </div>
        </div>

        <p className="mt-5 sm:mt-8 text-xs sm:text-sm text-white/70 max-w-md mx-auto font-semibold leading-relaxed">
          {app?.painPoint || 'Creating client invoices manually in spreadsheets is slow, error-prone, and looks unpolished.'}
        </p>

        {/* Rotating badge — desktop only */}
        <div
          className="absolute right-4 bottom-0 hidden lg:flex items-center justify-center w-20 h-20 xl:w-24 xl:h-24 rounded-full bg-[#ccff00] text-[#0b0d12] shadow-2xl cursor-pointer hover:scale-110 transition-transform"
          onClick={() => app && onSelectApp(app)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <svg className="w-full h-full animate-spin-slow p-2" viewBox="0 0 100 100">
              <path id="reflowwCirclePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
              <text className="text-[10px] font-black uppercase tracking-widest fill-[#0b0d12]">
                <textPath href="#reflowwCirclePath">INVOICING MADE EASY • REFLOWW •</textPath>
              </text>
            </svg>
            <ArrowUpRight className="absolute w-6 h-6 xl:w-7 xl:h-7 text-[#0b0d12]" />
          </div>
        </div>
      </div>

      {/* Feature White Box */}
      <div className="relative z-10 w-full rounded-2xl sm:rounded-[2rem] bg-white text-zinc-900 p-4 sm:p-7 shadow-2xl border border-zinc-100">
        
        {/* 2-col on mobile, 4-col on lg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2 text-left hover:border-[#0038ff]/60 hover:shadow-sm transition-all">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#0038ff] flex items-center justify-center">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-tight text-zinc-900 leading-tight">{title}</h4>
              <p className="text-[9px] sm:text-[11px] text-zinc-500 font-medium leading-relaxed hidden sm:block">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-zinc-100">
          <p className="text-[10px] sm:text-xs text-zinc-400 font-semibold text-center sm:text-left">
            Generate polished financial documents instantly.
          </p>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={() => app && onSelectApp(app)}
              className="px-5 py-2.5 rounded-full bg-[#0038ff] hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Explore Refloww</span>
              <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
            </button>
            <a
              href="https://refloww.delightylabs.space"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#d8ff1a] text-[#0b0d12] font-extrabold text-xs shadow-neon-glow transition-all active:scale-95"
            >
              Launch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
