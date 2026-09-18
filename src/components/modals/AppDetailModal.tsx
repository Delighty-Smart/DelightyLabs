import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Bookmark, 
  Share2, 
  Send, 
  Sparkles, 
  ExternalLink,
  MessageSquare,
  Target,
  ArrowRight
} from 'lucide-react';
import { BetaApp } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface AppDetailModalProps {
  app: BetaApp;
  onClose: () => void;
}

export const AppDetailModal: React.FC<AppDetailModalProps> = ({ app, onClose }) => {
  const { 
    user, 
    toggleBookmark, 
    isBookmarked, 
    trackAppLaunch,
    feedbackList, 
    submitFeedback, 
    showToast,
    setAuthModalOpen 
  } = useAuth();

  // Feedback form state
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'ux' | 'praise'>('praise');
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackDevice, setFeedbackDevice] = useState('Desktop Chrome');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const bookmarked = isBookmarked(app.id);
  const currentFeedbacks = feedbackList[app.id] || [];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackComment.trim()) {
      showToast('Please enter your feedback thoughts or bug details.');
      return;
    }

    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    submitFeedback({
      appId: app.id,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      rating: feedbackRating,
      type: feedbackType,
      comment: feedbackComment.trim(),
      device: feedbackDevice
    });

    setFeedbackComment('');
    setShowFeedbackForm(false);
    showToast('Thank you! Your feedback has been recorded.');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${app.title} - DelightyLabs`,
        text: app.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('App link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#11141c] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top App Header Banner */}
        <div className="relative p-6 bg-gradient-to-br from-[#1a2030] via-[#11141c] to-[#0d0f17] border-b border-zinc-800 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <img 
                src={app.thumbnail} 
                alt={app.title}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-zinc-700/60 shadow-lg flex-shrink-0"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {app.version}
                  </span>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {app.modelOrEngine}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {app.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                  {app.tagline}
                </p>
              </div>
            </div>

            {/* Quick Action Controls top-right */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                title="Share App"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleBookmark(app.id)}
                className={`p-2 rounded-full transition-all ${
                  bookmarked 
                    ? 'bg-blue-600 text-white shadow-glow-sm' 
                    : 'bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700'
                }`}
                title={bookmarked ? 'Saved' : 'Save app'}
              >
                <Bookmark className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Main Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          
          {/* SECTION 1: PAIN POINT FOCUS (THE CORE PROBLEM SOLVED) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-transparent border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wide uppercase">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Pain Point Solved</span>
            </div>
            <p className="text-zinc-200 text-sm font-medium leading-relaxed">
              {app.painPoint || app.description}
            </p>
          </div>

          {/* SECTION 2: WHAT YOU CAN DO IMMEDIATELY */}
          {app.immediateValue && app.immediateValue.length > 0 && (
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wide uppercase">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>What You Can Do Immediately</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {app.immediateValue.map((action, idx) => (
                  <li 
                    key={idx}
                    className="flex items-start gap-2 text-xs text-zinc-300 p-2.5 rounded-xl bg-[#161a24] border border-zinc-800"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SECTION 3: APP OVERVIEW */}
          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              About {app.title}
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {app.description}
            </p>
          </div>

          {/* SECTION 4: USER RATING & FEEDBACK */}
          <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  Feedback & Reviews ({currentFeedbacks.length})
                </span>
              </div>
              <button
                onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4"
              >
                {showFeedbackForm ? 'Cancel' : '+ Leave Feedback'}
              </button>
            </div>

            {/* Inline Feedback Form */}
            {showFeedbackForm && (
              <form onSubmit={handleFeedbackSubmit} className="p-4 rounded-xl bg-[#141720] border border-zinc-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200">Your Rating</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRating(star)}
                        className="p-1 text-zinc-600 hover:text-amber-400 transition-colors"
                      >
                        <Star 
                          className={`w-4 h-4 ${
                            star <= feedbackRating ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    placeholder="Tell us what you liked or what needs improvement..."
                    className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 text-xs focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5"
                  >
                    <Send className="w-3 h-3" />
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            )}

            {/* Existing Feedback List */}
            {currentFeedbacks.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {currentFeedbacks.map((fb) => (
                  <div key={fb.id} className="p-3 rounded-xl bg-[#141720] border border-zinc-800/80 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img src={fb.userAvatar} alt={fb.userName} className="w-5 h-5 rounded-full bg-zinc-700" />
                        <span className="font-semibold text-zinc-200">{fb.userName}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{fb.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed pl-7">
                      {fb.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-[#0e1117] flex items-center justify-between flex-shrink-0">
          <div className="text-xs text-zinc-400">
            Created by <span className="text-white font-medium">{app.creator.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 transition-colors"
            >
              Close
            </button>
            <a
              href={app.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAppLaunch(app.id)}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-glow-sm flex items-center gap-1.5"
            >
              <span>Launch App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
