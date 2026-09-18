import React from 'react';
import { Sparkles, ArrowRight, SearchX } from 'lucide-react';
import { BetaApp, AppCategory } from '../../types';
import { TopSearchBar } from '../gallery/TopSearchBar';
import { CategoryPills } from '../gallery/CategoryPills';
import { AppCard } from '../gallery/AppCard';

interface AppsDirectoryGridProps {
  apps: BetaApp[];
  filteredApps: BetaApp[];
  categoriesWithCounts: any[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: AppCategory;
  setSelectedCategory: (c: AppCategory) => void;
  sortBy: 'popular' | 'rating' | 'newest';
  setSortBy: (s: 'popular' | 'rating' | 'newest') => void;
  onSelectApp: (app: BetaApp) => void;
}

export const AppsDirectoryGrid: React.FC<AppsDirectoryGridProps> = ({
  apps,
  filteredApps,
  categoriesWithCounts,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  onSelectApp,
}) => {
  return (
    <section id="apps-directory-grid" className="relative w-full min-h-screen bg-[#0b0d12] text-white px-6 sm:px-14 lg:px-24 py-16 border-b border-zinc-800 space-y-10 shadow-2xl">
      
      {/* Search & Sort Navigation Bar */}
      <TopSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Horizontally Scrollable Category Pills */}
      <CategoryPills
        categories={categoriesWithCounts}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Directory Grid Content */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#ccff00] animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
              All Applications Directory
            </h2>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30 font-mono">
              {filteredApps.length} APPS
            </span>
          </div>

          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs font-bold text-zinc-400 hover:text-white underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredApps.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <SearchX className="w-12 h-12 text-zinc-500 mx-auto" />
            <h3 className="text-lg font-bold text-zinc-200">No applications match your criteria</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Try searching for "Lucent", "Scribera", or selecting "All" categories.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-5 py-2.5 rounded-2xl bg-[#ccff00] text-[#0b0d12] font-black text-xs hover:bg-[#d8ff1a] transition-all"
            >
              View All Applications
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <AppCard key={app.id} app={app} onOpen={onSelectApp} />
            ))}
          </div>
        )}
      </div>

    </section>
  );
};
