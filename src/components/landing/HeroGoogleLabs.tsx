import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { BetaApp, AppCategory } from '../../types';
import { CATEGORIES } from '../../data/mockApps';
import { useAuth } from '../../context/AuthContext';

interface HeroGoogleLabsProps {
  apps: BetaApp[];
  onSelectApp: (app: BetaApp) => void;
  selectedCategory: AppCategory;
  onSelectCategory: (cat: AppCategory) => void;
}

const GAP = 20; // px between cards

/** Number of clone cards prepended/appended for seamless looping */
const CLONES = 2;

/** Card width as a fraction of the container (or fixed max px on large screens) */
const getCardWidth = (containerWidth: number): number => {
  if (containerWidth < 480) return containerWidth * 0.72;
  if (containerWidth < 768) return containerWidth * 0.48;
  if (containerWidth < 1100) return containerWidth * 0.36;
  return Math.min(containerWidth * 0.26, 300);
};

export const HeroGoogleLabs: React.FC<HeroGoogleLabsProps> = ({
  apps,
  onSelectApp,
  selectedCategory,
  onSelectCategory,
}) => {
  const { trackAppLaunch } = useAuth();

  // Extended list: clones of last CLONES items prepended, first CLONES appended
  const extended = [
    ...apps.slice(-CLONES),
    ...apps,
    ...apps.slice(0, CLONES),
  ];

  // Index starts at CLONES (the first real card in the extended array)
  const [idx, setIdx] = useState(CLONES);
  const [animated, setAnimated] = useState(true);

  // The real app index (for dots / active detection)
  const realIdx = (idx - CLONES + apps.length) % apps.length;

  // Container measurement
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const measure = useCallback(() => {
    if (wrapperRef.current) {
      const w = wrapperRef.current.offsetWidth;
      setContainerWidth(w);
      setCardWidth(getCardWidth(w));
    }
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [measure]);

  // Re-enable animation after an instant (no-animation) position snap
  useEffect(() => {
    if (!animated) {
      const frame = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      );
      return () => cancelAnimationFrame(frame);
    }
  }, [animated]);

  // Touch / drag
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const minSwipeDistance = 40;

  const handleNext = () => setIdx((p) => p + 1);
  const handlePrev = () => setIdx((p) => p - 1);

  // After the CSS transition ends, snap back silently if we crossed a clone boundary
  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.propertyName !== 'transform') return;
      if (idx >= apps.length + CLONES) {
        // Crossed the end — jump to the real first card instantly
        setAnimated(false);
        setIdx(CLONES);
      } else if (idx < CLONES) {
        // Crossed the start — jump to the real last card instantly
        setAnimated(false);
        setIdx(apps.length + CLONES - 1);
      }
    },
    [idx, apps.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (d > minSwipeDistance) handleNext();
    else if (d < -minSwipeDistance) handlePrev();
  };

  const handleMouseDown = (e: React.MouseEvent) => { setIsDragging(true); setDragStartX(e.clientX); };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const d = dragStartX - e.clientX;
    if (d > minSwipeDistance) handleNext();
    else if (d < -minSwipeDistance) handlePrev();
  };
  const handleMouseLeave = () => { if (isDragging) setIsDragging(false); };

  // Center the active card
  const centerOffset = cardWidth > 0 ? (containerWidth - cardWidth) / 2 : 0;
  const trackOffset = centerOffset - idx * (cardWidth + GAP);

  return (
    <section className="relative w-full min-h-screen bg-[#f8f6f0] text-zinc-900 overflow-hidden
      py-8 sm:py-14 flex flex-col justify-between select-none border-b border-zinc-300/80">

      {/* Background Blobs */}
      <div className="absolute -bottom-32 -left-32 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#2563eb] rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -top-32 -right-20 w-[280px] sm:w-[580px] h-[280px] sm:h-[580px] bg-[#10b981] rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-[#ccff00] rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center space-y-2 max-w-3xl mx-auto px-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 shadow border border-black/10 text-[10px] sm:text-xs font-bold text-zinc-700 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-blue-600 flex-shrink-0" />
          <span>Interactive Experiments Deck</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-tight">
          Delighty Smart Labs
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 font-semibold">
          Four precision-built apps. One real everyday problem each.
        </p>
      </div>

      {/* ── CAROUSEL ── */}
      <div
        ref={wrapperRef}
        className="relative z-10 w-full overflow-hidden mt-8 sm:mt-12"
      >
        {/* Sliding track */}
        <div
          className={`flex ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${
            animated
              ? 'transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]'
              : 'transition-none'
          }`}
          style={{
            gap: `${GAP}px`,
            transform: `translateX(${trackOffset}px)`,
            touchAction: 'pan-y',
            willChange: 'transform',
          }}
          onTransitionEnd={handleTransitionEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {extended.map((app, i) => {
            const isActive = i === idx;
            return (
              <div
                key={`${app.id}-${i}`}
                style={{ width: `${cardWidth}px`, minWidth: `${cardWidth}px`, flexShrink: 0 }}
                className={`transition-all duration-500 ${
                  isActive
                    ? 'opacity-100 scale-100'
                    : 'opacity-60 scale-[0.96] hover:opacity-75'
                }`}
                onClick={() => {
                  if (!isDragging) {
                    const diff = i - idx;
                    if (diff === 0) onSelectApp(app);
                    else setIdx((p) => p + diff);
                  }
                }}
              >
                {/* Google Labs-style portrait card */}
                <div className="w-full rounded-[1.5rem] sm:rounded-[2rem] bg-white shadow-xl border border-zinc-100 overflow-hidden flex flex-col">

                  {/* Top: App Preview Image — portrait 4:5 ratio */}
                  <div className="relative w-full aspect-[4/5] bg-zinc-100 overflow-hidden flex-shrink-0">
                    <img
                      src={app.thumbnail}
                      alt={app.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    {/* Category chip overlay */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider">
                      {app.category}
                    </div>
                    {/* Version chip */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/90 text-zinc-800 text-[9px] font-extrabold">
                      {app.version}
                    </div>
                  </div>

                  {/* Bottom: Card content — Google Labs style */}
                  <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1">
                    {/* Live indicator + engine */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse flex-shrink-0" />
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-blue-600 font-mono truncate">
                        {app.modelOrEngine}
                      </span>
                    </div>

                    {/* App title */}
                    <h2 className="text-base sm:text-xl font-bold text-zinc-900 leading-snug">
                      {app.title}
                    </h2>

                    {/* Description */}
                    <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed line-clamp-3 flex-1">
                      {app.painPoint || app.description}
                    </p>

                    {/* Learn More CTA — Google Labs style */}
                    <button
                      onClick={(e) => { e.stopPropagation(); onSelectApp(app); }}
                      className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-zinc-900 hover:text-blue-600 transition-colors group mt-1 self-start"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

        {/* ── Controls: arrows + dots, centered below cards ── */}
      <div className="relative z-10 flex items-center justify-center gap-5 mt-6">
        {/* Left arrow — always enabled, wraps */}
        <button
          onClick={handlePrev}
          aria-label="Previous"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border
            bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-700 shadow-md
            hover:scale-105 active:scale-90 transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Dots — based on real index */}
        <div className="flex items-center gap-2">
          {apps.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i + CLONES)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === realIdx
                  ? 'w-6 h-2 bg-zinc-800'
                  : 'w-2 h-2 bg-zinc-300 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>

        {/* Right arrow — always enabled, wraps */}
        <button
          onClick={handleNext}
          aria-label="Next"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border
            bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-700 shadow-md
            hover:scale-105 active:scale-90 transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Category Pills */}
      <div className="relative z-10 flex items-center gap-2 overflow-x-auto no-scrollbar py-3 px-6 mt-3 justify-start sm:justify-center">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 whitespace-nowrap flex-shrink-0 border ${
                isActive
                  ? 'bg-zinc-900 text-[#ccff00] border-zinc-900 shadow-lg ring-2 ring-[#ccff00]'
                  : 'bg-white/80 text-zinc-600 border-zinc-200 hover:bg-white hover:border-zinc-300'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};
