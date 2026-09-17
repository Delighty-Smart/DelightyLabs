import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Image as ImageIcon, 
  User, 
  Code, 
  Eye, 
  Check, 
  Plus, 
  Trash2, 
  Link as LinkIcon, 
  Sliders, 
  Star,
  Users,
  Flame,
  Layers
} from 'lucide-react';
import { BetaApp, AppCategory } from '../../types';
import { AppCard } from '../gallery/AppCard';

interface AdminAppModalProps {
  app?: BetaApp | null; // If null/undefined -> Add New App mode
  isOpen: boolean;
  onClose: () => void;
  onSave: (app: BetaApp) => void;
}

const CATEGORIES_OPTIONS: { value: AppCategory; label: string }[] = [
  { value: 'gemini', label: 'Gemini 3.8' },
  { value: 'creative', label: 'GenMedia & Design' },
  { value: 'games', label: 'Games & Visualizations' },
  { value: 'multimodal', label: 'Multimodal Understanding' },
  { value: 'dev-tools', label: 'Tools and MCP' },
  { value: 'research', label: 'Science & Research' },
  { value: 'featured', label: 'Featured' }
];

const SECTION_OPTIONS: { value: BetaApp['section']; label: string }[] = [
  { value: 'gemini-flash', label: 'Create with Gemini Flash' },
  { value: 'nano-banana', label: 'Design with Nano Banana 2' },
  { value: 'landing-pages', label: 'Beautiful landing pages' },
  { value: 'community', label: 'Community Showcase' }
];

const STATUS_OPTIONS: { value: BetaApp['status']; label: string }[] = [
  { value: 'active', label: 'Active (Live)' },
  { value: 'trending', label: 'Trending' },
  { value: 'new', label: 'New Release' },
  { value: 'invite-only', label: 'Invite Only' }
];

export const AdminAppModal: React.FC<AdminAppModalProps> = ({
  app,
  isOpen,
  onClose,
  onSave
}) => {
  const isEdit = !!app;

  // Form State
  const [activeTab, setActiveTab] = useState<'details' | 'media' | 'creator' | 'interactive' | 'preview'>('details');

  const [id, setId] = useState(app?.id || `app-${Date.now().toString(36)}`);
  const [title, setTitle] = useState(app?.title || '');
  const [tagline, setTagline] = useState(app?.tagline || '');
  const [description, setDescription] = useState(app?.description || '');
  const [category, setCategory] = useState<AppCategory>(app?.category || 'gemini');
  const [section, setSection] = useState<BetaApp['section']>(app?.section || 'gemini-flash');
  const [status, setStatus] = useState<BetaApp['status']>(app?.status || 'active');
  const [version, setVersion] = useState(app?.version || 'v1.0.0-beta');
  const [modelOrEngine, setModelOrEngine] = useState(app?.modelOrEngine || 'Gemini 3.8 Flash');
  const [releaseDate, setReleaseDate] = useState(app?.releaseDate || 'Sept 2026');

  // Media
  const [thumbnail, setThumbnail] = useState(app?.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80');
  const [bannerImage, setBannerImage] = useState(app?.bannerImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80');
  const [screenshots, setScreenshots] = useState<string[]>(app?.featuredScreenshots || [thumbnail]);
  const [newScreenshotInput, setNewScreenshotInput] = useState('');

  // Tags
  const [tags, setTags] = useState<string[]>(app?.tags || ['Gemini 3.8', 'Interactive']);
  const [tagInput, setTagInput] = useState('');

  // Creator
  const [creatorName, setCreatorName] = useState(app?.creator.name || 'Delighty Studio Labs');
  const [creatorHandle, setCreatorHandle] = useState(app?.creator.handle || '@delighty_labs');
  const [creatorAvatar, setCreatorAvatar] = useState(app?.creator.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${id}`);
  const [creatorVerified, setCreatorVerified] = useState(app?.creator.verified ?? true);

  // Metrics
  const [testersCount, setTestersCount] = useState(app?.testersCount || 120);
  const [upvotesCount, setUpvotesCount] = useState(app?.upvotesCount || 85);
  const [rating, setRating] = useState(app?.rating || 4.8);
  const [reviewsCount, setReviewsCount] = useState(app?.reviewsCount || 18);

  // Links
  const [demoUrl, setDemoUrl] = useState(app?.demoUrl || '');
  const [githubUrl, setGithubUrl] = useState(app?.githubUrl || '');

  // Interactive Simulator Config
  const [prompts, setPrompts] = useState<string[]>(
    app?.interactiveConfig.samplePrompts || [
      'Run test benchmark simulation',
      'Analyze output latency'
    ]
  );
  const [promptInput, setPromptInput] = useState('');
  const [placeholder, setPlaceholder] = useState(app?.interactiveConfig.placeholder || 'Enter input to simulate model inference...');
  const [responseTemplate, setResponseTemplate] = useState(app?.interactiveConfig.responseTemplate || 'Simulator output synthesized in 42ms with 99.4% accuracy.');
  const [actionLabel, setActionLabel] = useState(app?.interactiveConfig.actionLabel || 'Run Interactive Test');
  const [features, setFeatures] = useState<string[]>(
    app?.interactiveConfig.features || ['Live model streaming', 'Multi-turn memory', 'JSON schema validation']
  );
  const [featureInput, setFeatureInput] = useState('');

  // Whats New
  const [whatsNew, setWhatsNew] = useState<string[]>(
    app?.whatsNew || ['Initial beta release', 'Added interactive model simulator']
  );
  const [whatsNewInput, setWhatsNewInput] = useState('');

  if (!isOpen) return null;

  // Handlers for dynamic array fields
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddPrompt = () => {
    if (promptInput.trim()) {
      setPrompts([...prompts, promptInput.trim()]);
      setPromptInput('');
    }
  };

  const handleRemovePrompt = (index: number) => {
    setPrompts(prompts.filter((_, i) => i !== index));
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleAddWhatsNew = () => {
    if (whatsNewInput.trim()) {
      setWhatsNew([...whatsNew, whatsNewInput.trim()]);
      setWhatsNewInput('');
    }
  };

  const handleRemoveWhatsNew = (index: number) => {
    setWhatsNew(whatsNew.filter((_, i) => i !== index));
  };

  const handleAddScreenshot = () => {
    if (newScreenshotInput.trim()) {
      setScreenshots([...screenshots, newScreenshotInput.trim()]);
      setNewScreenshotInput('');
    }
  };

  const handleRemoveScreenshot = (index: number) => {
    setScreenshots(screenshots.filter((_, i) => i !== index));
  };

  // Build Preview Object
  const draftApp: BetaApp = {
    id: id || `app-${Date.now()}`,
    title: title || 'Untitled Published App',
    tagline: tagline || 'No tagline provided',
    description: description || 'No description provided',
    category,
    section,
    tags: tags.length ? tags : ['Beta'],
    version: version || 'v1.0.0-beta',
    status,
    modelOrEngine: modelOrEngine || 'Gemini 3.8 Flash',
    thumbnail: thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
    bannerImage: bannerImage || thumbnail,
    featuredScreenshots: screenshots.length ? screenshots : [thumbnail],
    creator: {
      name: creatorName || 'Delighty Labs',
      avatar: creatorAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=delighty`,
      handle: creatorHandle || '@delighty',
      verified: creatorVerified
    },
    testersCount: Number(testersCount) || 0,
    upvotesCount: Number(upvotesCount) || 0,
    rating: Number(rating) || 5.0,
    reviewsCount: Number(reviewsCount) || 0,
    demoType: 'interactive-simulator',
    interactiveConfig: {
      samplePrompts: prompts,
      placeholder,
      responseTemplate,
      actionLabel,
      features
    },
    demoUrl: demoUrl || undefined,
    githubUrl: githubUrl || undefined,
    releaseDate,
    whatsNew
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('App Title is required.');
      setActiveTab('details');
      return;
    }
    onSave(draftApp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#11141d] border border-[#262c3b] rounded-3xl shadow-2xl z-10 flex flex-col max-h-[90vh] overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222733] bg-[#0d1017]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {isEdit ? `Edit Published App: ${app.title}` : 'Publish New Beta App'}
              </h2>
              <p className="text-xs text-zinc-400">
                Configure details, media assets, simulator prompts, and creator metadata.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 bg-[#0f121a] border-b border-[#222733] overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('details')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-colors border-b-2 ${
              activeTab === 'details'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10 font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>General Details</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-colors border-b-2 ${
              activeTab === 'media'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10 font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Media & Assets</span>
          </button>

          <button
            onClick={() => setActiveTab('creator')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-colors border-b-2 ${
              activeTab === 'creator'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10 font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Creator & Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('interactive')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-colors border-b-2 ${
              activeTab === 'interactive'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10 font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Interactive Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-colors border-b-2 ${
              activeTab === 'preview'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10 font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>Live Card Preview</span>
          </button>
        </div>

        {/* Tab Body Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: GENERAL DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Unique App ID <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isEdit}
                    value={id}
                    onChange={(e) => setId(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    placeholder="e.g. urban-hive-project"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">Slug identifier used in URLs & state.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    App Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. The Urban Hive Project"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Short punchy summary..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed description of features and usage..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as AppCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {CATEGORIES_OPTIONS.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Hub Section</label>
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value as BetaApp['section'])}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {SECTION_OPTIONS.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Status Badge</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as BetaApp['status'])}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Version</label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="v1.0.0-beta"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Model / Engine</label>
                  <input
                    type="text"
                    value={modelOrEngine}
                    onChange={(e) => setModelOrEngine(e.target.value)}
                    placeholder="Gemini 3.8 Flash"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Release Date</label>
                  <input
                    type="text"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    placeholder="Sept 2026"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 min-h-[42px]">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 flex items-center gap-1.5">
                      <span>{tag}</span>
                      <button type="button" onClick={() => handleRemoveTag(idx)} className="hover:text-white">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {tags.length === 0 && <span className="text-xs text-zinc-500">No tags added yet.</span>}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                    placeholder="Add a tag..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              {/* Whats New List */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Release Notes ("What's New")</label>
                <ul className="space-y-1.5 mb-2">
                  {whatsNew.map((item, idx) => (
                    <li key={idx} className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                      <span>• {item}</span>
                      <button type="button" onClick={() => handleRemoveWhatsNew(idx)} className="text-zinc-500 hover:text-red-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={whatsNewInput}
                    onChange={(e) => setWhatsNewInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddWhatsNew(); } }}
                    placeholder="Add release note bullet point..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddWhatsNew}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA & ASSETS */}
          {activeTab === 'media' && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Thumbnail Image URL</label>
                <input
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                {thumbnail && (
                  <div className="mt-2 w-32 h-20 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                    <img src={thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Banner Hero Image URL</label>
                <input
                  type="text"
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                {bannerImage && (
                  <div className="mt-2 w-full h-24 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                    <img src={bannerImage} alt="Banner preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Featured Screenshots URLs</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                  {screenshots.map((url, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 h-24">
                      <img src={url} alt={`Screenshot ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveScreenshot(idx)}
                        className="absolute top-1 right-1 p-1 rounded-lg bg-black/70 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newScreenshotInput}
                    onChange={(e) => setNewScreenshotInput(e.target.value)}
                    placeholder="Enter screenshot image URL..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddScreenshot}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium"
                  >
                    Add Screenshot
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CREATOR & METRICS */}
          {activeTab === 'creator' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-400" />
                  <span>Creator Metadata</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Creator Name</label>
                    <input
                      type="text"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      placeholder="e.g. Delighty Ecology Labs"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Handle</label>
                    <input
                      type="text"
                      value={creatorHandle}
                      onChange={(e) => setCreatorHandle(e.target.value)}
                      placeholder="@urbanhive_tech"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Avatar Image URL</label>
                    <input
                      type="text"
                      value={creatorAvatar}
                      onChange={(e) => setCreatorAvatar(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-4 sm:pt-0">
                    <input
                      type="checkbox"
                      id="verifiedCheck"
                      checked={creatorVerified}
                      onChange={(e) => setCreatorVerified(e.target.checked)}
                      className="w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="verifiedCheck" className="text-xs text-zinc-300 cursor-pointer">
                      Verified Creator Badge (Checkmark)
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>Public App Metrics & External Links</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Testers Count</label>
                    <input
                      type="number"
                      value={testersCount}
                      onChange={(e) => setTestersCount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Upvotes Count</label>
                    <input
                      type="number"
                      value={upvotesCount}
                      onChange={(e) => setUpvotesCount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Rating (1.0 - 5.0)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Reviews Count</label>
                    <input
                      type="number"
                      value={reviewsCount}
                      onChange={(e) => setReviewsCount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Live Demo / External URL</label>
                    <input
                      type="text"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      placeholder="https://my-app-demo.delighty.dev"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">GitHub / Source Repo URL</label>
                    <input
                      type="text"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INTERACTIVE SIMULATOR CONFIG */}
          {activeTab === 'interactive' && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Simulator Action Button Label</label>
                <input
                  type="text"
                  value={actionLabel}
                  onChange={(e) => setActionLabel(e.target.value)}
                  placeholder="e.g. Simulate Hive Sensor Query"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Simulator Input Placeholder</label>
                <input
                  type="text"
                  value={placeholder}
                  onChange={(e) => setPlaceholder(e.target.value)}
                  placeholder="Ask model simulator..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Default Simulated Response Template</label>
                <textarea
                  rows={3}
                  value={responseTemplate}
                  onChange={(e) => setResponseTemplate(e.target.value)}
                  placeholder="Text returned by interactive test runner when user sends a sample query..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Sample Prompts */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Sample Interactive Prompts</label>
                <div className="space-y-1.5 mb-2">
                  {prompts.map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-cyan-300 font-mono">
                      <span>"{p}"</span>
                      <button type="button" onClick={() => handleRemovePrompt(idx)} className="text-zinc-500 hover:text-red-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddPrompt(); } }}
                    placeholder="Enter sample prompt..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddPrompt}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium"
                  >
                    Add Prompt
                  </button>
                </div>
              </div>

              {/* Key Features list */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Key Feature Highlights</label>
                <div className="space-y-1.5 mb-2">
                  {features.map((f, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                      <span>✓ {f}</span>
                      <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-zinc-500 hover:text-red-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                    placeholder="Add key feature..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LIVE CARD PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
                <span>Real-time preview of how this published app card will look in the public Gallery view:</span>
                <span className="font-bold uppercase tracking-wider text-[10px]">Live Sync</span>
              </div>

              <div className="max-w-md mx-auto py-4">
                <AppCard app={draftApp} onOpen={() => {}} />
              </div>
            </div>
          )}

        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#222733] bg-[#0d1017]">
          <div className="text-xs text-zinc-500 font-mono">
            App ID: {id}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-glow-sm flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>{isEdit ? 'Save Changes' : 'Publish App'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
