import React, { useState } from 'react';
import { Bookmark, Star, Users, CheckCircle2, ExternalLink } from 'lucide-react';
import { BetaApp } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface AppCardProps {
  app: BetaApp;
  onOpen: (app: BetaApp) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onOpen }) => {
  const { toggleBookmark, isBookmarked, user, trackAppLaunch, submitFeedback, showToast } = useAuth();
  const bookmarked = isBookmarked(app.id);
  const isTested = user?.testedAppIds.includes(app.id);

  const [hoverStar, setHoverStar] = useState<number>(0);

  const handleRate = (e: React.MouseEvent, ratingValue: number) => {
    e.stopPropagation();

    submitFeedback({
      appId: app.id,
      userId: user?.id || 'guest-user',
      rating: ratingValue,
      comment: `Rated ${ratingValue} star${ratingValue > 1 ? 's' : ''} directly from app card`,
      type: 'praise',
      userName: user?.name || 'Tester',
      userAvatar: user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.email || 'guest')}`
    });

    showToast(`Submitted ${ratingValue}-star rating for ${app.title}! ⭐`);
  };

  const hasRating = app.reviewsCount > 0 || app.rating > 0;
  const hasTesters = app.testersCount > 0;

  return (
    <div 
      onClick={() => {
        trackAppLaunch(app.id);
        onOpen(app);
      }}
      className="group flex flex-col rounded-3xl bg-[#12151d] border border-zinc-800/90 hover:border-[#ccff00]/60 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-neon-glow relative select-none"
    >
      {/* Thumbnail Aspect Box */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
        <img
          src={app.thumbnail}
          alt={app.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12151d] via-transparent to-black/30 opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[#ccff00] border border-[#ccff00]/30">
              {app.version}
            </span>
            {isTested && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-950/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                Visited
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(app.id);
            }}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
              bookmarked
                ? 'bg-[#ccff00] text-[#0b0d12] shadow-neon-glow'
                : 'bg-black/50 text-zinc-300 hover:text-white hover:bg-black/80'
            }`}
            title={bookmarked ? 'Remove from saved' : 'Save app'}
          >
            <Bookmark className="w-3.5 h-3.5" fill={bookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Hover quick action overlay buttons & direct rating flow */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/70 backdrop-blur-[3px] z-10 p-4">
          <div className="flex items-center gap-2">
            <a
              href={app.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                trackAppLaunch(app.id);
              }}
              className="px-4 py-2 rounded-xl bg-[#ccff00] hover:bg-[#d8ff1a] text-[#0b0d12] font-extrabold text-xs shadow-neon-glow flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <span>Launch App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                trackAppLaunch(app.id);
                onOpen(app);
              }}
              className="px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-zinc-900 font-bold text-xs shadow-xl flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <span>Details</span>
            </button>
          </div>

          {/* Card Hover Quick Rating Bar */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 shadow-2xl text-xs backdrop-blur-md"
          >
            <span className="text-[10px] font-semibold text-zinc-400 mr-0.5">Rate:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverStar(star)}
                  onMouseLeave={() => setHoverStar(0)}
                  onClick={(e) => handleRate(e, star)}
                  className="p-0.5 transition-transform hover:scale-125 focus:outline-none"
                  title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                  <Star
                    className={`w-3.5 h-3.5 transition-colors ${
                      star <= (hoverStar || app.rating)
                        ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]'
                        : 'text-zinc-600 hover:text-zinc-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 p-4 flex flex-col justify-between space-y-3">
        <div>
          {/* Title */}
          <h3 className="text-base font-bold text-zinc-100 group-hover:text-[#ccff00] transition-colors line-clamp-1">
            {app.title}
          </h3>

          {/* Tags row */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {app.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#1f2430] text-zinc-300 border border-zinc-700/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description line clamped */}
          <p className="mt-2.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {app.description}
          </p>
        </div>

        {/* Card Footer info */}
        <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 min-h-[36px]">
          <div className="flex items-center gap-1.5 truncate max-w-[130px]">
            <img 
              src={app.creator.avatar} 
              alt={app.creator.name} 
              className="w-4 h-4 rounded-full bg-zinc-700" 
            />
            <span className="truncate text-[11px] text-zinc-400">{app.creator.handle}</span>
          </div>

          {/* Dynamic Metrics Section (Invisible when 0, reappears on activity) */}
          <div className="flex items-center gap-2 text-[11px]">
            {/* Rating Flow or Rating Badge */}
            {hasRating ? (
              <div 
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full font-medium transition-all"
                title={`${app.rating.toFixed(1)} average rating (${app.reviewsCount} review${app.reviewsCount > 1 ? 's' : ''})`}
              >
                <Star className="w-3 h-3 fill-amber-400" />
                <span className="font-semibold">{app.rating.toFixed(1)}</span>
                {app.reviewsCount > 1 && (
                  <span className="text-[10px] text-amber-300/70">({app.reviewsCount})</span>
                )}
              </div>
            ) : (
              /* Inline interactive 5-star quick rate when no ratings yet */
              <div 
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-0.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                title="Rate this app"
              >
                <span className="text-[10px] font-medium text-zinc-500 mr-0.5">Rate:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverStar(star)}
                    onMouseLeave={() => setHoverStar(0)}
                    onClick={(e) => handleRate(e, star)}
                    className="p-0.5 transition-transform hover:scale-125 focus:outline-none"
                    title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`w-3 h-3 transition-colors ${
                        star <= hoverStar
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-zinc-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Access / Testers count badge (Only visible when testersCount > 0) */}
            {hasTesters && (
              <div 
                className="flex items-center gap-1 text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 px-2 py-0.5 rounded-full font-medium transition-all"
                title={`${app.testersCount} total visitors`}
              >
                <Users className="w-3 h-3 text-cyan-400" />
                <span>
                  {app.testersCount >= 1000 
                    ? `${(app.testersCount / 1000).toFixed(1)}k` 
                    : app.testersCount}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

