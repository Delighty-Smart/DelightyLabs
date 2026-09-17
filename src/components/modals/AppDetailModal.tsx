import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Users, 
  Bookmark, 
  Share2, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Laptop,
  Smartphone,
  MessageSquare,
  Play,
  RotateCcw,
  Zap
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
    markAsTested, 
    trackAppLaunch,
    feedbackList, 
    submitFeedback, 
    showToast,
    setAuthModalOpen 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'sandbox' | 'feedback' | 'changelog'>('sandbox');
  const [testInput, setTestInput] = useState<string>(app.interactiveConfig.samplePrompts[0] || '');
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testLatency, setTestLatency] = useState<number | null>(null);

  // Feedback form state
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'ux' | 'praise'>('praise');
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackDevice, setFeedbackDevice] = useState('Desktop Chrome');

  const bookmarked = isBookmarked(app.id);
  const currentFeedbacks = feedbackList[app.id] || [];

  const handleRunSimulator = () => {
    if (!testInput.trim()) return;
    setIsRunningTest(true);
    setTestOutput(null);

    // Realistic simulation with variable latency
    const start = performance.now();
    setTimeout(() => {
      const end = performance.now();
      setTestLatency(Math.round(end - start + 120));
      setTestOutput(
        `[${app.modelOrEngine} Stream Output]\n` +
        `Query: "${testInput}"\n\n` +
        app.interactiveConfig.responseTemplate +
        `\n\n✓ Diagnostics: Execution finished without faults. Model inference token count: 184.`
      );
      setIsRunningTest(false);
      markAsTested(app.id);
    }, 850);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackComment.trim()) {
      showToast('Please provide feedback or report details.');
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
    setActiveTab('feedback');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${app.title} - DelightyLabs Beta`,
        text: app.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Beta link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#11141c] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top App Header & Hero Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-zinc-950 flex-shrink-0">
          <img 
            src={app.bannerImage || app.thumbnail} 
            alt={app.title}
            className="w-full h-full object-cover opacity-60 filter blur-[1px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11141c] via-[#11141c]/60 to-black/50" />

          {/* Controls top-right */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <a
              href={app.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAppLaunch(app.id)}
              className="px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <span>Launch App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-black/50 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-black/80 transition-colors"
              title="Share App"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleBookmark(app.id)}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                bookmarked 
                  ? 'bg-blue-600 text-white shadow-glow-sm' 
                  : 'bg-black/50 text-zinc-300 hover:text-white hover:bg-black/80'
              }`}
              title={bookmarked ? 'Remove from saved' : 'Save app'}
            >
              <Bookmark className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/50 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-black/80 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* App title & metadata in banner */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {app.version}
                </span>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {app.modelOrEngine}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {app.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 line-clamp-1">
                {app.tagline}
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-4 text-xs font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{app.rating.toFixed(1)}</span>
                <span className="text-zinc-500">({currentFeedbacks.length + app.reviewsCount})</span>
              </div>
              <div className="w-[1px] h-3 bg-zinc-700" />
              <div className="flex items-center gap-1 text-zinc-300">
                <Users className="w-3.5 h-3.5" />
                <span>{app.testersCount.toLocaleString()} testers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-4 px-6 border-b border-zinc-800 bg-[#141822] text-sm">
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`py-3 font-medium transition-all relative ${
              activeTab === 'sandbox' ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              Interactive Test Sandbox
            </span>
            {activeTab === 'sandbox' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`py-3 font-medium transition-all relative ${
              activeTab === 'feedback' ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Tester Feedback ({currentFeedbacks.length})
            </span>
            {activeTab === 'feedback' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('changelog')}
            className={`py-3 font-medium transition-all relative ${
              activeTab === 'changelog' ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              What's New & Build Info
            </span>
            {activeTab === 'changelog' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB 1: INTERACTIVE TEST SANDBOX */}
          {activeTab === 'sandbox' && (
            <div className="space-y-6">
              {/* App Overview Description */}
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Beta Objective
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {app.description}
                </p>

                {/* Features list */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {app.interactiveConfig.features.map((feat, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-300 px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60"
                    >
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Runner Sandbox */}
              <div className="p-5 rounded-2xl bg-[#141720] border border-blue-900/40 shadow-glow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-white tracking-wide uppercase">
                      Live Beta Simulator ({app.modelOrEngine})
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    Ready for testing
                  </span>
                </div>

                {/* Sample Prompt Chips */}
                <div>
                  <p className="text-xs text-zinc-400 mb-2">Preset Test Scenarios:</p>
                  <div className="flex flex-wrap gap-2">
                    {app.interactiveConfig.samplePrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => setTestInput(prompt)}
                        className="text-xs text-left px-3 py-1.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-all hover:border-zinc-500"
                      >
                        "{prompt}"
                      </button>
                    ))}
                  </div>
                </div>

                {/* Test Input Area */}
                <div className="space-y-2">
                  <textarea
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    placeholder={app.interactiveConfig.placeholder}
                    rows={3}
                    className="w-full p-3.5 rounded-xl bg-[#0c0e12] border border-zinc-700/80 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-blue-500 font-mono resize-none"
                  />

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => { setTestInput(''); setTestOutput(null); }}
                      className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Clear input
                    </button>

                    <button
                      onClick={handleRunSimulator}
                      disabled={isRunningTest || !testInput.trim()}
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-xs flex items-center gap-2 transition-all shadow-glow-sm"
                    >
                      {isRunningTest ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Streaming inference...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{app.interactiveConfig.actionLabel || 'Run Interactive Test'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Simulation Output Window */}
                {testOutput && (
                  <div className="p-4 rounded-xl bg-[#0a0c10] border border-zinc-800/80 space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-xs text-zinc-400 font-mono border-b border-zinc-800 pb-2">
                      <span className="text-emerald-400">● Simulated Inference Response</span>
                      {testLatency && <span>Latency: {testLatency}ms</span>}
                    </div>
                    <pre className="text-xs text-zinc-200 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
                      {testOutput}
                    </pre>
                  </div>
                )}
              </div>

              {/* Supported Platforms */}
              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-white">Desktop & Mobile Ready</h5>
                    <p className="text-[11px] text-zinc-400">Tested across Web, Safari iOS, Chrome Android, and macOS.</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                  100% Responsive
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: TESTER FEEDBACK & BUG REPORT */}
          {activeTab === 'feedback' && (
            <div className="space-y-6">
              {/* Form to submit feedback */}
              <form onSubmit={handleFeedbackSubmit} className="p-5 rounded-2xl bg-[#141720] border border-zinc-800 space-y-4">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  Submit Tester Report or Feedback
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category select */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Feedback Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'praise', label: 'Praise & Review' },
                        { id: 'bug', label: 'Bug Report' },
                        { id: 'feature', label: 'Feature Request' },
                        { id: 'ux', label: 'UX / Performance' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFeedbackType(item.id as any)}
                          className={`py-1.5 px-2 rounded-xl text-xs font-medium border transition-all ${
                            feedbackType === item.id
                              ? 'bg-blue-600/20 border-blue-500/60 text-blue-300'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Star Rating & Device */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Overall Rating</label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFeedbackRating(star)}
                            className="p-1 text-zinc-600 hover:text-amber-400 transition-colors"
                          >
                            <Star 
                              className={`w-5 h-5 ${
                                star <= feedbackRating ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'
                              }`} 
                            />
                          </button>
                        ))}
                        <span className="text-xs text-zinc-400 ml-2">{feedbackRating} / 5</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Testing Device / OS</label>
                      <input 
                        type="text"
                        value={feedbackDevice}
                        onChange={(e) => setFeedbackDevice(e.target.value)}
                        placeholder="e.g. iPhone 16 Pro, Windows 11 Chrome"
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Comment Textarea */}
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Observations / Repro Steps</label>
                  <textarea
                    rows={3}
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    placeholder="Describe how the app behaved, any performance hiccups, or suggested enhancements..."
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-xs focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Tester Report</span>
                  </button>
                </div>
              </form>

              {/* Feedbacks list */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Community Feedback & Bug Reports ({currentFeedbacks.length})
                </h4>

                {currentFeedbacks.length === 0 ? (
                  <p className="text-xs text-zinc-500 italic">No feedback submitted yet. Be the first beta tester to review!</p>
                ) : (
                  currentFeedbacks.map((fb) => (
                    <div key={fb.id} className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={fb.userAvatar} alt={fb.userName} className="w-6 h-6 rounded-full bg-zinc-700" />
                          <span className="text-xs font-semibold text-zinc-200">{fb.userName}</span>
                          {fb.device && (
                            <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.2 rounded-md">
                              {fb.device}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-amber-400 text-xs">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span className="ml-1">{fb.rating}</span>
                          </div>
                          <span className="text-[10px] text-zinc-400">{fb.timestamp}</span>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {fb.comment}
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          fb.type === 'bug' 
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : fb.type === 'feature'
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {fb.type}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CHANGELOG */}
          {activeTab === 'changelog' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-white">{app.version} Release Notes</span>
                  <span className="text-xs text-zinc-400">{app.releaseDate}</span>
                </div>
                <ul className="space-y-2 text-xs text-zinc-300">
                  {app.whatsNew.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 text-xs space-y-2">
                <span className="font-semibold text-zinc-300">Developer & Model Architecture</span>
                <p className="text-zinc-400">Created by <span className="text-white font-medium">{app.creator.name}</span> ({app.creator.handle}). Powered by {app.modelOrEngine}.</p>
                <div className="flex gap-3 pt-2">
                  <span className="text-zinc-400">Status: <span className="text-emerald-400 font-semibold uppercase">{app.status}</span></span>
                  <span className="text-zinc-400">Total Testers: <span className="text-white font-semibold">{app.testersCount}</span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-[#0e1117] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 hidden sm:inline">Have feedback?</span>
            <button
              onClick={() => setActiveTab('feedback')}
              className="text-xs text-blue-400 hover:text-blue-300 underline underline-offset-4"
            >
              Report a bug or suggestion
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                handleRunSimulator();
                setActiveTab('sandbox');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors"
            >
              Test Simulator
            </button>
            <a
              href={app.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAppLaunch(app.id)}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-glow-sm flex items-center gap-1.5"
            >
              <span>Launch Application</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
