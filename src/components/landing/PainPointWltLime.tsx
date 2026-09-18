import React from 'react';
import { BookOpen, Users, Feather, MessageSquare, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { BetaApp } from '../../types';

interface PainPointWltLimeProps {
  onSelectApp: (app: BetaApp) => void;
  apps: BetaApp[];
}

export const PainPointWltLime: React.FC<PainPointWltLimeProps> = ({ onSelectApp, apps }) => {
  const app = apps.find(a => a.id === 'scribera') || apps[1];

  const features = [
    { icon: Feather, label: 'Daily Devotional Feed', desc: 'Serene, distraction-free daily reflections curated for you.' },
    { icon: BookOpen, label: 'Scripture Study Notes', desc: 'Your personal faith journal with rich-text writing tools.' },
    { icon: Users, label: 'Christ-Centered Community', desc: 'Share and connect with supportive Christian writers.' },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#ccff00] text-[#0b0d12] overflow-hidden
      px-4 sm:px-12 lg:px-24 py-14 sm:py-20 flex flex-col justify-between items-center
      shadow-2xl select-none border-b border-black/10 gap-8 sm:gap-10">

      {/* Background Layer: Sparkles & Looping Rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Decorative sparkles */}
        <div className="absolute top-10 left-8 sm:top-14 sm:left-12 animate-sparkle opacity-40">
          <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 fill-[#0b0d12] text-[#0b0d12]" />
        </div>
        <div className="absolute bottom-12 right-8 sm:bottom-16 sm:right-12 animate-sparkle opacity-30" style={{ animationDelay: '3s' }}>
          <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 fill-[#0b0d12] text-[#0b0d12]" />
        </div>

        {/* Looping Pulsing Rings */}
        <div className="absolute w-[60vw] h-[60vw] border-[1px] border-[#0b0d12]/5 rounded-full animate-pulse-glow" />
        <div className="absolute w-[90vw] h-[90vw] border-[1px] border-[#0b0d12]/5 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute w-[120vw] h-[120vw] border-[1px] border-[#0b0d12]/5 rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center space-y-3 max-w-2xl w-full mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b0d12] text-[#ccff00] text-[10px] sm:text-xs font-black uppercase tracking-wider">
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#ccff00] flex-shrink-0" />
          <span>Faith Writing Platform</span>
        </div>

        <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0b0d12] leading-tight">
          A Quiet Place for Faith,{' '}
          <span className="block sm:inline">Writing & Community.</span>
        </h2>

        <p className="text-xs sm:text-sm font-bold text-[#0b0d12]/70 leading-relaxed max-w-lg mx-auto">
          Social media is loud and distracting. Scribera is a peaceful sanctuary for Christian devotional 
          writing, scripture reflections, and Christ-centered stories.
        </p>
      </div>

      {/* Pain vs Solution Pills */}
      <div className="relative z-10 w-full max-w-xl space-y-3 sm:space-y-4">

        <div className="rounded-[1.8rem] sm:rounded-[2.2rem] bg-[#0b0d12] text-white p-4 sm:p-7 flex items-start gap-3 sm:gap-5 shadow-2xl border border-zinc-800 hover:-translate-y-0.5 transition-transform">
          <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#ccff00] text-[#0b0d12] flex items-center justify-center flex-shrink-0 mt-0.5">
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="space-y-1 min-w-0">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#ccff00] block">
              The Problem
            </span>
            <p className="text-xs sm:text-sm font-extrabold text-zinc-100 leading-snug">
              {app?.painPoint || '"Social platforms are noisy and distracting when you want a quiet space for faith writing and daily devotionals."'}
            </p>
          </div>
        </div>

        <div className="rounded-[1.8rem] sm:rounded-[2.2rem] bg-[#0b0d12] text-white p-4 sm:p-7 flex items-start gap-3 sm:gap-5 shadow-2xl border border-zinc-800 hover:-translate-y-0.5 transition-transform">
          <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#ccff00] text-[#0b0d12] flex items-center justify-center flex-shrink-0 mt-0.5">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="space-y-1 min-w-0">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#ccff00] block">
              The Scribera Way
            </span>
            <p className="text-xs sm:text-sm font-extrabold text-zinc-100 leading-snug">
              A clutter-free sanctuary with a daily devotional feed, rich scripture editor, and a Christ-centered community — built for writers of faith.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="relative z-10 w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
        {features.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="rounded-2xl bg-[#0b0d12]/10 border border-[#0b0d12]/15 p-4 space-y-2 hover:bg-[#0b0d12]/15 transition-colors">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0b0d12] flex items-center justify-center">
              <Icon className="w-4 h-4 text-[#ccff00]" />
            </div>
            <p className="text-[11px] sm:text-xs font-black text-[#0b0d12] uppercase tracking-tight leading-tight">{label}</p>
            <p className="text-[10px] sm:text-[11px] text-[#0b0d12]/70 font-bold leading-snug">{desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
        <button
          onClick={() => app && onSelectApp(app)}
          className="px-6 py-3 rounded-full bg-[#0b0d12] hover:bg-black text-[#ccff00] font-black text-sm flex items-center justify-center gap-2 shadow-2xl transition-all active:scale-95"
        >
          <span>Enter the Sanctuary</span>
          <ArrowRight className="w-4 h-4 flex-shrink-0" />
        </button>
        <a
          href="https://scribera.delightylabs.space"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full bg-transparent border-2 border-[#0b0d12] text-[#0b0d12] font-black text-sm flex items-center justify-center gap-2 hover:bg-[#0b0d12]/10 transition-all active:scale-95"
        >
          Launch Scribera
        </a>
      </div>
    </section>
  );
};
