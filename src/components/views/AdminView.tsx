import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  Plus, 
  Search, 
  Download, 
  Upload, 
  RotateCcw, 
  Edit3, 
  Trash2, 
  Copy, 
  Eye, 
  Star, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  MessageSquare, 
  ShieldCheck, 
  ChevronDown, 
  Flame, 
  Clock, 
  ArrowUpRight,
  X,
  FileCode
} from 'lucide-react';
import { BetaApp, AppCategory } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { AdminAppModal } from '../modals/AdminAppModal';

interface AdminViewProps {
  onSelectApp: (app: BetaApp) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onSelectApp }) => {
  const { 
    apps, 
    addApp, 
    updateApp, 
    deleteApp, 
    resetAppsToDefault, 
    toggleAppStatus,
    importAppsJSON,
    feedbackList,
    activityLogs,
    clearActivityLogs,
    showToast 
  } = useAuth();

  // Navigation / View Tabs inside Admin
  const [adminTab, setAdminTab] = useState<'apps' | 'feedback' | 'activity'>('apps');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'testers' | 'rating' | 'version'>('testers');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<BetaApp | null>(null);

  // JSON Import Modal
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [jsonText, setJsonText] = useState('');

  // Delete Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Compute Stats Overview
  const stats = useMemo(() => {
    const totalApps = apps.length;
    const activeApps = apps.filter(a => a.status === 'active' || a.status === 'trending').length;
    const totalTesters = apps.reduce((acc, a) => acc + (a.testersCount || 0), 0);
    const avgRating = totalApps > 0 
      ? (apps.reduce((acc, a) => acc + (a.rating || 0), 0) / totalApps).toFixed(2)
      : '0.00';
    const totalFeedbacks = Object.values(feedbackList).reduce((acc, list) => acc + list.length, 0);

    return { totalApps, activeApps, totalTesters, avgRating, totalFeedbacks };
  }, [apps, feedbackList]);

  // Filter & Sort Apps
  const filteredApps = useMemo(() => {
    let result = [...apps];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(q) ||
        a.tagline.toLowerCase().includes(q) ||
        a.creator.name.toLowerCase().includes(q) ||
        a.modelOrEngine.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(a => a.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      result = result.filter(a => a.status === selectedStatus);
    }

    if (selectedSection !== 'all') {
      result = result.filter(a => a.section === selectedSection);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'testers') return b.testersCount - a.testersCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'version') return b.version.localeCompare(a.version);
      return 0;
    });

    return result;
  }, [apps, searchQuery, selectedCategory, selectedStatus, selectedSection, sortBy]);

  // All Feedback List Flattened
  const allFeedbacks = useMemo(() => {
    const list: { appTitle: string; appId: string; feedback: any }[] = [];
    Object.entries(feedbackList).forEach(([appId, items]) => {
      const parentApp = apps.find(a => a.id === appId);
      const title = parentApp ? parentApp.title : appId;
      items.forEach(fb => {
        list.push({ appTitle: title, appId, feedback: fb });
      });
    });
    return list;
  }, [feedbackList, apps]);

  // Handlers
  const handleOpenAdd = () => {
    setEditingApp(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (app: BetaApp) => {
    setEditingApp(app);
    setModalOpen(true);
  };

  const handleDuplicate = (app: BetaApp) => {
    const dup: BetaApp = {
      ...app,
      id: `${app.id}-copy-${Date.now().toString(36)}`,
      title: `${app.title} (Copy)`,
      status: 'new',
      testersCount: 0,
      upvotesCount: 0
    };
    addApp(dup);
  };

  const handleSaveModal = (appToSave: BetaApp) => {
    if (editingApp) {
      updateApp(editingApp.id, appToSave);
    } else {
      addApp(appToSave);
    }
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(apps, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `delightylabs_apps_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Apps configuration exported to JSON file!');
  };

  const handleImportSubmit = () => {
    if (importAppsJSON(jsonText)) {
      setImportModalOpen(false);
      setJsonText('');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-20">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#222733]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-[1.5px] shadow-glow-sm">
              <div className="w-full h-full bg-[#0d1017] rounded-[10px] flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                App Admin
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">
                Manage metadata, status, categories, and reviews.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-zinc-700/50"
            title="Export catalog JSON"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={() => setImportModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-zinc-700/50"
            title="Import catalog JSON"
          >
            <Upload className="w-4 h-4 text-indigo-400" />
            <span>Import JSON</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Reset apps to default dataset?')) {
                resetAppsToDefault();
              }
            }}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-amber-400 transition-colors border border-zinc-700/50"
            title="Reset to default"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-glow-sm flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New App</span>
          </button>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-[#141720] border border-[#222733] space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Total Apps</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white tracking-tight">{stats.totalApps}</p>
          <span className="text-[10px] text-zinc-500">In Catalog</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#141720] border border-[#222733] space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Active</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-amber-400 tracking-tight">{stats.activeApps}</p>
          <span className="text-[10px] text-zinc-500">Publicly Listed</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#141720] border border-[#222733] space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Launches</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-cyan-300 tracking-tight">{stats.totalTesters.toLocaleString()}</p>
          <span className="text-[10px] text-zinc-500">Total Views</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#141720] border border-[#222733] space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Rating</span>
            <Star className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400 tracking-tight">{stats.avgRating} <span className="text-xs text-zinc-500">/ 5.0</span></p>
          <span className="text-[10px] text-zinc-500">Average Score</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#141720] border border-[#222733] space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Feedback</span>
            <MessageSquare className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-indigo-300 tracking-tight">{stats.totalFeedbacks}</p>
          <span className="text-[10px] text-zinc-500">User Reports</span>
        </div>
      </div>

      {/* Main View Tabs: Apps List vs Community Feedback Stream vs Real-Time Activity Feed */}
      <div className="flex items-center justify-between border-b border-[#222733] pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setAdminTab('apps')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              adminTab === 'apps'
                ? 'bg-blue-600 text-white shadow-glow-sm'
                : 'bg-zinc-800/60 text-zinc-400 hover:text-white'
            }`}
          >
            Catalog ({filteredApps.length})
          </button>

          <button
            onClick={() => setAdminTab('feedback')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              adminTab === 'feedback'
                ? 'bg-blue-600 text-white shadow-glow-sm'
                : 'bg-zinc-800/60 text-zinc-400 hover:text-white'
            }`}
          >
            <span>Feedback Stream</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {allFeedbacks.length}
            </span>
          </button>

          <button
            onClick={() => setAdminTab('activity')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              adminTab === 'activity'
                ? 'bg-blue-600 text-white shadow-glow-sm'
                : 'bg-zinc-800/60 text-zinc-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Activity Stream</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {activityLogs.length}
            </span>
          </button>
        </div>
      </div>

      {adminTab === 'apps' ? (
        <>
          {/* Search & Multi-Filter Controls */}
          <div className="p-4 rounded-2xl bg-[#141720] border border-[#222733] space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, tagline, creator, engine model, or tags..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-zinc-400 whitespace-nowrap">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="testers">Testers Count</option>
                  <option value="rating">Rating Score</option>
                  <option value="title">App Title</option>
                  <option value="version">Version</option>
                </select>
              </div>
            </div>

            {/* Filter Dropdowns Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-zinc-800/60 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1">Category Filter</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="gemini">Gemini 3.8</option>
                  <option value="creative">GenMedia & Design</option>
                  <option value="games">Games & Visualizations</option>
                  <option value="multimodal">Multimodal Understanding</option>
                  <option value="dev-tools">Tools and MCP</option>
                  <option value="research">Science & Research</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1">Status Filter</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active (Live)</option>
                  <option value="trending">Trending</option>
                  <option value="new">New Release</option>
                  <option value="invite-only">Invite Only</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1">Hub Section</label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Sections</option>
                  <option value="gemini-flash">Create with Gemini Flash</option>
                  <option value="nano-banana">Design with Nano Banana 2</option>
                  <option value="landing-pages">Beautiful landing pages</option>
                  <option value="community">Community Showcase</option>
                </select>
              </div>
            </div>
          </div>

          {/* Apps Data Table */}
          <div className="rounded-2xl bg-[#141720] border border-[#222733] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0f121a] border-b border-[#222733] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    <th className="py-3 px-4">App Details</th>
                    <th className="py-3 px-4">Category & Section</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Engine / Model</th>
                    <th className="py-3 px-4">Stats</th>
                    <th className="py-3 px-4">Creator</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800/60 text-xs">
                  {filteredApps.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-zinc-400">
                        No published apps match your search filter parameters.
                      </td>
                    </tr>
                  ) : (
                    filteredApps.map((app) => (
                      <tr key={app.id} className="hover:bg-zinc-800/30 transition-colors">
                        {/* App Title & Thumbnail */}
                        <td className="py-3 px-4 min-w-[220px]">
                          <div className="flex items-center gap-3">
                            <img
                              src={app.thumbnail}
                              alt={app.title}
                              className="w-12 h-12 rounded-xl object-cover flex-shrink-0 bg-zinc-800 border border-zinc-700/50"
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-white truncate hover:text-blue-400 cursor-pointer" onClick={() => onSelectApp(app)}>
                                {app.title}
                              </p>
                              <p className="text-[11px] text-zinc-400 truncate max-w-[200px]">{app.tagline}</p>
                              <span className="text-[10px] font-mono text-zinc-500">{app.version}</span>
                            </div>
                          </div>
                        </td>

                        {/* Category & Section */}
                        <td className="py-3 px-4 min-w-[150px]">
                          <div className="space-y-1">
                            <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              {app.category}
                            </span>
                            <p className="text-[10px] text-zinc-400 truncate">{app.section}</p>
                          </div>
                        </td>

                        {/* Status Toggle Dropdown */}
                        <td className="py-3 px-4">
                          <select
                            value={app.status}
                            onChange={(e) => toggleAppStatus(app.id, e.target.value as BetaApp['status'])}
                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                              app.status === 'active'
                                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                                : app.status === 'trending'
                                ? 'bg-amber-950/40 text-amber-400 border-amber-500/30'
                                : app.status === 'new'
                                ? 'bg-cyan-950/40 text-cyan-400 border-cyan-500/30'
                                : 'bg-purple-950/40 text-purple-400 border-purple-500/30'
                            }`}
                          >
                            <option value="active" className="bg-zinc-900 text-white">Active</option>
                            <option value="trending" className="bg-zinc-900 text-white">Trending</option>
                            <option value="new" className="bg-zinc-900 text-white">New</option>
                            <option value="invite-only" className="bg-zinc-900 text-white">Invite Only</option>
                          </select>
                        </td>

                        {/* Model / Engine */}
                        <td className="py-3 px-4 font-mono text-[11px] text-cyan-300 min-w-[140px]">
                          {app.modelOrEngine}
                        </td>

                        {/* Stats */}
                        <td className="py-3 px-4 min-w-[120px]">
                          <div className="space-y-0.5">
                            <p className="text-zinc-200 font-medium">{app.testersCount.toLocaleString()} testers</p>
                            <div className="flex items-center text-[10px] text-amber-400">
                              <Star className="w-3 h-3 fill-amber-400 mr-1" />
                              <span>{app.rating} ({app.reviewsCount})</span>
                            </div>
                          </div>
                        </td>

                        {/* Creator Info */}
                        <td className="py-3 px-4 min-w-[130px]">
                          <div className="flex items-center gap-2">
                            <img src={app.creator.avatar} alt={app.creator.name} className="w-6 h-6 rounded-full bg-zinc-800" />
                            <div className="min-w-0">
                              <p className="text-zinc-200 truncate font-medium text-[11px]">{app.creator.name}</p>
                              <p className="text-[10px] text-zinc-500 truncate">{app.creator.handle}</p>
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right min-w-[140px]">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => onSelectApp(app)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                              title="Preview public app detail page"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleOpenEdit(app)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-blue-400 hover:bg-zinc-800 transition-colors"
                              title="Edit app details"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDuplicate(app)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800 transition-colors"
                              title="Duplicate app configuration"
                            >
                              <Copy className="w-4 h-4" />
                            </button>

                            {deleteConfirmId === app.id ? (
                              <button
                                onClick={() => { deleteApp(app.id); setDeleteConfirmId(null); }}
                                className="px-2 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold animate-pulse"
                              >
                                Confirm
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setDeleteConfirmId(app.id);
                                  setTimeout(() => setDeleteConfirmId(prev => prev === app.id ? null : prev), 3000);
                                }}
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                                title="Delete app"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
        </div>
      </>
      ) : adminTab === 'feedback' ? (
        /* Community Feedback Moderation Stream */
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#141720] border border-[#222733] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Tester Feedback Stream & Bug Reports</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Review qualitative comments and bug logs submitted by registered testers across all published apps.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {allFeedbacks.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#141720] border border-[#222733] text-zinc-400 text-xs">
                No tester feedback submitted yet.
              </div>
            ) : (
              allFeedbacks.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#141720] border border-[#222733] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={item.feedback.userAvatar} alt={item.feedback.userName} className="w-7 h-7 rounded-full bg-zinc-800" />
                      <div>
                        <span className="text-xs font-semibold text-white">{item.feedback.userName}</span>
                        <span className="text-xs text-zinc-500 ml-2">on app <strong className="text-blue-400">{item.appTitle}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        item.feedback.type === 'bug'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {item.feedback.type}
                      </span>
                      <div className="flex items-center text-amber-400 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                        <span>{item.feedback.rating} / 5</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-200 leading-relaxed pl-9">
                    "{item.feedback.comment}"
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-zinc-500 pl-9 pt-1">
                    <span>Submitted {item.feedback.timestamp} • Device: {item.feedback.device || 'Web Browser'}</span>
                    <button
                      onClick={() => showToast(`Moderated feedback item from ${item.feedback.userName}`)}
                      className="text-xs text-zinc-400 hover:text-white"
                    >
                      Acknowledge & Flag
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Real-Time Activity Log Stream */
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#141720] border border-[#222733] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Live Real-Time Activity Stream</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Calculated live user events: app launches, reviews submitted, bookmarking, and status modifications.
              </p>
            </div>
            {activityLogs.length > 0 && (
              <button
                onClick={clearActivityLogs}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium border border-zinc-700/60 transition-colors"
              >
                Clear Log
              </button>
            )}
          </div>

          <div className="space-y-3">
            {activityLogs.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#141720] border border-[#222733] text-zinc-400 text-xs">
                No activity logged yet. Launch apps or post reviews to generate live events!
              </div>
            ) : (
              activityLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-2xl bg-[#141720] border border-[#222733] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={log.userAvatar} alt={log.userName} className="w-7 h-7 rounded-full bg-zinc-800 flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">{log.userName}</span>
                        <span className={`text-[9px] uppercase font-bold px-2 py-0.2 rounded ${
                          log.type === 'launch'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : log.type === 'review'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : log.type === 'bookmark'
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {log.type}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 mt-0.5">{log.details}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 whitespace-nowrap ml-4">{log.timestamp}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Admin App Add/Edit Modal */}
      {modalOpen && (
        <AdminAppModal
          app={editingApp}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveModal}
        />
      )}

      {/* JSON Import Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setImportModalOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-[#131620] border border-zinc-800 rounded-3xl p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Import Published Apps JSON</h3>
              </div>
              <button 
                onClick={() => setImportModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Paste your JSON array of `BetaApp` objects to overwrite or import published app configurations into DelightyLabs.
            </p>

            <textarea
              rows={8}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder='[ { "id": "my-custom-app", "title": "My Custom App", ... } ]'
              className="w-full p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-cyan-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportSubmit}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow-sm"
              >
                Import Apps Catalog
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
