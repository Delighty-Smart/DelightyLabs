import React, { useState, useMemo } from 'react';
import { Sparkles, Layers, ArrowRight, SearchX } from 'lucide-react';
import { BetaApp, AppCategory } from '../../types';
import { CATEGORIES } from '../../data/mockApps';
import { useAuth } from '../../context/AuthContext';
import { TopSearchBar } from '../gallery/TopSearchBar';
import { CategoryPills } from '../gallery/CategoryPills';
import { HeroBanner } from '../gallery/HeroBanner';
import { AppCard } from '../gallery/AppCard';

interface GalleryViewProps {
  onSelectApp: (app: BetaApp) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onSelectApp }) => {
  const { apps } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>('featured');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');

  // Filter apps based on search query, category, and sorting
  const filteredApps = useMemo(() => {
    let result = [...apps];

    // Filter by text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(app =>
        app.title.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        app.modelOrEngine.toLowerCase().includes(q) ||
        app.creator.name.toLowerCase().includes(q) ||
        app.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Filter by category
    if (selectedCategory !== 'featured' && selectedCategory !== 'all') {
      result = result.filter(app => app.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'popular') {
      result.sort((a, b) => b.testersCount - a.testersCount);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.version.localeCompare(a.version));
    }

    return result;
  }, [apps, searchQuery, selectedCategory, sortBy]);

  // Specific section slices matching the Google AI Studio screenshots
  const geminiFlashApps = useMemo(() => {
    return apps.filter(app => app.section === 'gemini-flash');
  }, [apps]);

  const nanoBananaApps = useMemo(() => {
    return apps.filter(app => app.section === 'nano-banana');
  }, [apps]);

  const landingPageApps = useMemo(() => {
    return apps.filter(app => app.section === 'landing-pages');
  }, [apps]);

  // Compute dynamic category counts from live apps list
  const categoriesWithCounts = useMemo(() => {
    return CATEGORIES.map(cat => {
      let count = apps.length;
      if (cat.id === 'creative') {
        count = apps.filter(a => a.category === 'creative').length;
      } else if (cat.id === 'dev-tools') {
        count = apps.filter(a => a.category === 'dev-tools').length;
      } else if (cat.id === 'research') {
        count = apps.filter(a => a.category === 'research').length;
      } else if (cat.id === 'games') {
        count = apps.filter(a => a.category === 'games').length;
      } else if (cat.id === 'multimodal') {
        count = apps.filter(a => a.category === 'multimodal').length;
      } else if (cat.id === 'gemini') {
        count = apps.filter(a => a.category === 'gemini').length;
      }
      return { ...cat, count };
    });
  }, [apps]);

  const isFiltering = searchQuery.trim().length > 0 || (selectedCategory !== 'featured' && selectedCategory !== 'all');

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-16">
      {/* Top Search Bar */}
      <TopSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Horizontally scrollable category filter pills */}
      <CategoryPills
        categories={categoriesWithCounts}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Hero Showcase Banner (Visible when not actively searching) */}
      {!isFiltering && (
        <HeroBanner onExploreClick={() => setSelectedCategory('all')} />
      )}

      {/* FILTERED OR SEARCH RESULTS VIEW */}
      {isFiltering ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Matching Beta Apps ({filteredApps.length})</span>
            </h2>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('featured');
              }}
              className="text-xs text-zinc-400 hover:text-white underline"
            >
              Reset Filters
            </button>
          </div>

          {filteredApps.length === 0 ? (
            <div className="py-16 text-center rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3">
              <SearchX className="w-10 h-10 text-zinc-500 mx-auto" />
              <h3 className="text-base font-semibold text-zinc-200">No matching beta apps found</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Try searching for different keywords, like "Gemini", "Nano", "Interactive", or reset category filters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-200 hover:text-white hover:bg-zinc-700"
              >
                Show all apps
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredApps.map((app) => (
                <AppCard key={app.id} app={app} onOpen={onSelectApp} />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* STRUCTURED SECTIONS FOR PUBLISHED APPS DIRECTORY */
        <div className="space-y-12">
          {/* SECTION 1: All Published Applications */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-100">
                  Published Applications Directory
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {apps.length} Apps Live
                </span>
              </div>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="text-xs font-medium text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {apps.map((app) => (
                <AppCard key={app.id} app={app} onOpen={onSelectApp} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
