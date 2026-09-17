import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Clock, 
  Bookmark, 
  MessageSquareCode, 
  BarChart3, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Bell, 
  Settings, 
  Key, 
  LogOut, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Zap,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onOpenSettings?: () => void;
  onOpenApiKeys?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  setCollapsed,
  onOpenSettings,
  onOpenApiKeys
}) => {
  const { 
    user, 
    activeNav, 
    setActiveNav, 
    redeemCredits, 
    hasRedeemedCredits, 
    setAuthModalOpen, 
    logout
  } = useAuth();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const directoryLinks = [
    { id: 'gallery', label: 'App Directory', icon: Compass, badge: 'Hub' },
    { id: 'history', label: 'Recently Opened', icon: Clock },
  ];

  const workspaceLinks = [
    { id: 'bookmarked', label: 'Saved Apps', icon: Bookmark, count: user?.bookmarkedAppIds.length || 0 },
    { id: 'my-feedback', label: 'Reviews & Feedback', icon: MessageSquareCode, count: user?.testedAppIds.length || 0 },
  ];

  const manageLinks = [
    { id: 'docs', label: 'Hub Guidelines', icon: FileText, external: true },
  ];

  return (
    <aside 
      className={`relative hidden md:flex flex-col h-screen bg-[#0c0e12] border-r border-[#222733] transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Top Header Logo */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-[#222733]/70">
        {!collapsed ? (
          <div 
            onClick={() => setActiveNav('gallery')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-glow-sm">
              <div className="w-full h-full bg-[#0d1017] rounded-[10px] flex items-center justify-center">
                <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-white text-base">DelightyLabs</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  HUB
                </span>
              </div>
              <span className="text-[10px] text-zinc-400">Apps Directory & Portal</span>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => setActiveNav('gallery')}
            className="mx-auto cursor-pointer"
            title="DelightyLabs Apps Directory"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px]">
              <div className="w-full h-full bg-[#0d1017] rounded-[10px] flex items-center justify-center">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
          </div>
        )}

        {/* Sidebar Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 transition-colors ${
            collapsed ? 'mx-auto mt-2 hidden' : ''
          }`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Nav Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* DIRECTORY SECTION */}
        <div>
          {!collapsed && (
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
              Directory
            </div>
          )}
          <nav className="space-y-1">
            {directoryLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group relative ${
                    isActive
                      ? 'bg-zinc-800/90 text-white font-semibold shadow-sm border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  } ${collapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-400' : 'text-zinc-400'}`} />
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                  {isActive && collapsed && (
                    <div className="absolute right-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* MY WORKSPACE / SAVED */}
        <div>
          {!collapsed && (
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
              My Workspace
            </div>
          )}
          <nav className="space-y-1">
            {workspaceLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group relative ${
                    isActive
                      ? 'bg-zinc-800/90 text-white font-semibold border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  } ${collapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-zinc-400'}`} />
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span>{item.label}</span>
                      {item.count !== undefined && item.count > 0 && (
                        <span className="text-xs px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                          {item.count}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* MANAGE SECTION */}
        <div>
          {!collapsed && (
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
              Management
            </div>
          )}
          <nav className="space-y-1">
            {manageLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-zinc-800/90 text-white font-semibold border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  } ${collapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-indigo-400' : 'text-zinc-400'}`} />
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span>{item.label}</span>
                      {item.external && <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer Area */}
      <div className="p-3 border-t border-[#222733] space-y-3 bg-[#0c0e12]/95 backdrop-blur-md">

        {/* Action icons row (Notification, Settings, Quick Search, Keys) */}
        <div className={`flex items-center text-zinc-400 ${collapsed ? 'flex-col gap-2' : 'justify-between px-1'}`}>
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-1.5 rounded-lg hover:text-zinc-200 hover:bg-zinc-800/80 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#0c0e12]" />
            </button>

            {notificationsOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-[#171a22] border border-[#2c3240] rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-xs font-semibold text-white mb-2 flex items-center justify-between">
                  <span>Lab Notifications</span>
                  <span className="text-[10px] text-blue-400">2 new</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-zinc-800/60 border border-zinc-700/40">
                    <p className="text-zinc-200 font-medium">Apps Directory Updated</p>
                    <p className="text-[11px] text-zinc-400">Explore live apps: Scribera, Refresh Studio, Refloww, and Lucent.</p>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-800/60 border border-zinc-700/40">
                    <p className="text-zinc-200 font-medium">New app: Window Seat AI</p>
                    <p className="text-[11px] text-zinc-400">Nano Banana 2 model beta testing is now open.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg hover:text-zinc-200 hover:bg-zinc-800/80 transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              const searchInput = document.getElementById('global-search-input');
              searchInput?.focus();
            }}
            className="p-1.5 rounded-lg hover:text-zinc-200 hover:bg-zinc-800/80 transition-colors"
            title="Quick Search"
          >
            <Compass className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenApiKeys}
            className="p-1.5 rounded-lg hover:text-zinc-200 hover:bg-zinc-800/80 transition-colors"
            title="API Keys & Tester Tokens"
          >
            <Key className="w-4 h-4" />
          </button>
        </div>

        {/* User profile pill */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className={`w-full flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-zinc-800/70 border border-zinc-800 transition-colors ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full bg-zinc-700 object-cover flex-shrink-0 ring-1 ring-zinc-600"
              />
              {!collapsed && (
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-medium text-zinc-200 truncate">{user.email}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                      {user.tier}
                    </span>
                    <span className="text-[10px] text-zinc-400">${user.credits}.00 credits</span>
                  </div>
                </div>
              )}
            </button>

            {/* Profile popover menu */}
            {profileMenuOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-56 p-2 bg-[#171a22] border border-[#2c3240] rounded-xl shadow-2xl z-50 text-xs">
                <div className="px-2 py-1.5 border-b border-zinc-700/50 mb-1">
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                </div>
                <div className="pt-1">
                  <button
                    onClick={() => { logout(); setProfileMenuOpen(false); }}
                    className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-red-500/10 text-red-400 flex items-center gap-2 transition-colors font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setAuthModalOpen(true)}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center justify-center gap-1.5 ${
              collapsed ? 'px-0' : ''
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            {!collapsed && <span>Sign In / Join Beta</span>}
          </button>
        )}
      </div>
    </aside>
  );
};
