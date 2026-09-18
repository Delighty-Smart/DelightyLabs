import React from 'react';
import { ArrowRight, Sparkles, Zap, Mail, PenTool, Flame } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeroBannerProps {
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  const { setSelectedAppId } = useAuth();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0a0c10] border border-zinc-800/80 p-8 sm:p-12 lg:p-14 shadow-2xl transition-all">
      {/* Subtle radial neon glows in background */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#ccff00]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Sparkle Accents (4-point stars) */}
      <div className="absolute top-12 left-10 text-[#ccff00] animate-sparkle pointer-events-none opacity-80">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute bottom-14 right-12 text-[#ccff00] animate-sparkle pointer-events-none opacity-80" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
        
        {/* Top Header Badge */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#161a24] border border-[#ccff00]/30 text-[#ccff00] text-xs font-extrabold tracking-wider uppercase shadow-neon-glow">
            <Zap className="w-4 h-4 fill-current text-[#ccff00]" />
            <span>DelightyLabs Studio</span>
          </div>
        </div>

        {/* Main Bold Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
          Transform Your Vision into Reality!
        </h1>

        {/* 3D Stacked Neon Lime Card (Matching User Reference Image) */}
        <div className="w-full max-w-2xl pill-3d-card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 text-left transition-transform hover:scale-[1.02]">
          {/* Dark rounded icon badge */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#0c0e12] flex items-center justify-center text-white flex-shrink-0 shadow-xl">
            <PenTool className="w-7 h-7 text-[#ccff00]" />
          </div>

          {/* Description Content */}
          <div className="flex-1 text-[#0b0d12]">
            <p className="text-sm sm:text-base font-bold leading-relaxed">
              We offer top-notch intelligent apps & design tools tailored to your needs. Let's create something amazing together.
            </p>
          </div>
        </div>

        {/* CTA Buttons Row */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="px-7 py-3.5 rounded-2xl bg-[#ccff00] hover:bg-[#d8ff1a] text-[#0c0e12] font-extrabold text-sm transition-all shadow-neon-glow hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Browse All Apps</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setSelectedAppId('lucent')}
            className="px-6 py-3.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700/80 font-bold text-sm transition-all hover:border-[#ccff00]/50"
          >
            Open Lucent (Expendx)
          </button>

          <button
            onClick={() => setSelectedAppId('scribera')}
            className="px-6 py-3.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700/80 font-bold text-sm transition-all hover:border-cyan-400/50"
          >
            Open Scribera
          </button>
        </div>

        {/* Contact Email Capsule Pill (Matching Reference Footer Badge) */}
        <div className="pt-4 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white shadow-lg">
            <Mail className="w-5 h-5 text-zinc-300" />
          </div>
          <a
            href="mailto:tayyabqazi221@gmail.com"
            className="px-8 py-2.5 rounded-full bg-white text-zinc-900 font-bold text-xs shadow-xl transition-all hover:bg-zinc-100 hover:scale-105 tracking-wide"
          >
            tayyabqazi221@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
};

