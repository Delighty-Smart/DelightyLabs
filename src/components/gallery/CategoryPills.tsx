import React, { useRef, useState, useEffect } from 'react';
import { 
  Sparkles, 
  Grid, 
  Zap, 
  Palette, 
  Gamepad2, 
  Eye, 
  Wrench, 
  Atom, 
  ChevronLeft, 
  ChevronRight,
  LucideIcon 
} from 'lucide-react';
import { AppCategory, CategoryItem } from '../../types';

interface CategoryPillsProps {
  categories: CategoryItem[];
  selectedCategory: AppCategory;
  onSelectCategory: (id: AppCategory) => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Grid,
  Zap,
  Palette,
  Gamepad2,
  Eye,
  Wrench,
  Atom,
};

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categories]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div className="relative flex items-center w-full py-2">
      {/* Left Scroll Arrow */}
      {canScrollLeft && (
        <div className="absolute left-0 z-10 flex items-center h-full pr-4 bg-gradient-to-r from-[#0c0e12] via-[#0c0e12]/90 to-transparent">
          <button
            onClick={() => handleScroll('left')}
            className="p-2 rounded-full bg-zinc-800/90 text-zinc-300 hover:text-white hover:bg-zinc-700 border border-zinc-700/60 shadow-lg transition-all"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth w-full px-1"
      >
        {categories.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || Sparkles;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-medium transition-all whitespace-nowrap select-none flex-shrink-0 ${
                isSelected
                  ? 'bg-zinc-800 text-white border border-zinc-600/80 shadow-sm font-semibold'
                  : 'bg-[#151820]/90 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-zinc-800/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-zinc-400'}`} />
              <span>{cat.label}</span>
              {cat.count !== undefined && (
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-800/60 text-zinc-300'
                }`}>
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right Scroll Arrow */}
      {canScrollRight && (
        <div className="absolute right-0 z-10 flex items-center h-full pl-4 bg-gradient-to-l from-[#0c0e12] via-[#0c0e12]/90 to-transparent">
          <button
            onClick={() => handleScroll('right')}
            className="p-2 rounded-full bg-zinc-800/90 text-zinc-300 hover:text-white hover:bg-zinc-700 border border-zinc-700/60 shadow-lg transition-all"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
