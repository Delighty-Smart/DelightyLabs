import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ExternalLink, Sparkles, Star } from 'lucide-react';
import { BetaApp } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface GoogleLabsCarouselProps {
  apps: BetaApp[];
  onSelectApp: (app: BetaApp) => void;
}

export const GoogleLabsCarousel: React.FC<GoogleLabsCarouselProps> = ({ apps, onSelectApp }) => {
  const { trackAppLaunch } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % apps.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + apps.length) % apps.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-[#f8f6f0] text-zinc-900 p-6 sm:p-10 lg:p-12 shadow-2xl transition-all select-none my-6">
      
      {/* Google Labs Signature Organic Colored Background Blobs */}
      <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-blue-500 rounded-full blur-2xl opacity-80 pointer-events-none" />
      <div className="absolute -top-28 right-10 w-[480px] h-[480px] bg-[#34d399] rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-[#ccff00] rounded-full blur-3xl opacity-40 pointer-events-none" />

      {/* Main Showcase Title */}
      <div className="relative z-10 text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 shadow-sm border border-black/10 text-xs font-bold text-zinc-800">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Featured Experiments</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 font-sans">
          Google Labs Style Interactive Deck
        </h2>
      </div>

      {/* Carousel Cards Track */}
      <div className="relative z-10 flex items-center justify-center min-h-[380px] py-4">
        <div className="flex items-center justify-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-6 px-4 w-full">
          {apps.map((app, idx) => {
            const isCenter = idx === currentIndex;
            const offset = idx - currentIndex;

            return (
              <div
                key={app.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  onSelectApp(app);
                }}
                className={`flex-shrink-0 w-[270px] sm:w-[310px] rounded-3xl bg-white p-4 shadow-xl border border-zinc-200/80 transition-all duration-500 cursor-pointer group hover:-translate-y-3 ${
                  isCenter 
                    ? 'scale-105 z-20 ring-4 ring-[#ccff00] shadow-2xl rotate-0' 
                    : Math.abs(offset) === 1
                    ? 'scale-95 opacity-90 z-10 rotate-1'
                    : 'scale-90 opacity-70 rotate-2'
                }`}
              >
                {/* App Hero Media Card */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-100 mb-4 border border-zinc-200">
                  <img
                    src={app.thumbnail}
                    alt={app.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[#ccff00] text-[10px] font-bold">
                    {app.version}
                  </div>
                </div>

                {/* Card Text Information */}
                <div className="space-y-2 text-left">
                  <h3 className="text-lg font-extrabold text-zinc-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {app.title}
                  </h3>

                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                    {app.painPoint || app.description}
                  </p>

                  <div className="pt-3 flex items-center justify-between text-xs font-bold border-t border-zinc-100">
                    <span className="text-blue-600 flex items-center gap-1 group-hover:underline">
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    
                    <a
                      href={app.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        trackAppLaunch(app.id);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-black text-white text-[11px] font-bold flex items-center gap-1 shadow-md transition-transform hover:scale-105"
                    >
                      <span>Launch</span>
                      <ExternalLink className="w-3 h-3 text-[#ccff00]" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Center Carousel Left/Right Arrow Controls (Matching Google Labs Screenshot!) */}
      <div className="relative z-10 flex items-center justify-center gap-3 mt-4">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-zinc-800 flex items-center justify-center shadow-lg border border-zinc-200 transition-all hover:scale-110 active:scale-95"
          aria-label="Previous experiment"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold text-zinc-600 px-2 font-mono">
          {currentIndex + 1} / {apps.length}
        </span>

        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-zinc-800 flex items-center justify-center shadow-lg border border-zinc-200 transition-all hover:scale-110 active:scale-95"
          aria-label="Next experiment"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
