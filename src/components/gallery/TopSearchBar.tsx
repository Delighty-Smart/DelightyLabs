import React, { useEffect, useRef } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface TopSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'popular' | 'rating' | 'newest';
  setSortBy: (sort: 'popular' | 'rating' | 'newest') => void;
}

export const TopSearchBar: React.FC<TopSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global hotkey Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-3">
      {/* Search Input Bar */}
      <div className="relative flex-1 w-full group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-blue-400 transition-colors">
          <Search className="w-4 h-4" />
        </div>

        <input
          ref={inputRef}
          id="global-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search across hundreds of apps created for DelightyLabs beta testing..."
          className="w-full pl-11 pr-24 py-3 rounded-2xl bg-[#14171f] border border-zinc-800 text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-blue-500/40 transition-all shadow-inner"
        />

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 rounded-md">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Sort Dropdown / Selector */}
      <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
        <div className="flex items-center gap-1.5 bg-[#14171f] border border-zinc-800 rounded-2xl p-1 text-xs">
          <div className="px-2 py-1 text-zinc-400 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Sort:</span>
          </div>
          <button
            onClick={() => setSortBy('popular')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              sortBy === 'popular'
                ? 'bg-zinc-800 text-white font-medium border border-zinc-700/60'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => setSortBy('rating')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              sortBy === 'rating'
                ? 'bg-zinc-800 text-white font-medium border border-zinc-700/60'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Highest Rated
          </button>
          <button
            onClick={() => setSortBy('newest')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              sortBy === 'newest'
                ? 'bg-zinc-800 text-white font-medium border border-zinc-700/60'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Newest
          </button>
        </div>
      </div>
    </div>
  );
};
