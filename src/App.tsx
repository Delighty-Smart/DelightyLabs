import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { GalleryView } from './components/views/GalleryView';
import { PlaygroundView } from './components/views/PlaygroundView';
import { BookmarkedView } from './components/views/BookmarkedView';
import { HistoryView } from './components/views/HistoryView';
import { DashboardView } from './components/views/DashboardView';
import { AdminView } from './components/views/AdminView';
import { AppDetailModal } from './components/modals/AppDetailModal';
import { AuthModal } from './components/modals/AuthModal';
import { Toast } from './components/ui/Toast';
import type { BetaApp } from './types';
import { Settings, X, Key } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeNav, apps, selectedAppId, setSelectedAppId } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKeysModalOpen, setApiKeysModalOpen] = useState(false);

  // Locate currently selected app if any
  const selectedApp: BetaApp | undefined = apps.find(a => a.id === selectedAppId);

  return (
    <div className="flex h-screen bg-[#0c0e12] text-zinc-100 overflow-hidden font-sans">
      {/* Left Collapsible Sidebar (Desktop) */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenApiKeys={() => setApiKeysModalOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Top Header & Bottom Bar */}
        <MobileNav />

        {/* Scrollable Content Viewport */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
          {activeNav === 'gallery' && (
            <GalleryView onSelectApp={(app) => setSelectedAppId(app.id)} />
          )}

          {activeNav === 'playground' && (
            <PlaygroundView />
          )}

          {activeNav === 'bookmarked' && (
            <BookmarkedView onSelectApp={(app) => setSelectedAppId(app.id)} />
          )}

          {(activeNav === 'history' || activeNav === 'my-feedback') && (
            <HistoryView onSelectApp={(app) => setSelectedAppId(app.id)} />
          )}

          {activeNav === 'admin' && (
            <AdminView onSelectApp={(app) => setSelectedAppId(app.id)} />
          )}

          {(activeNav === 'dashboard' || activeNav === 'docs') && (
            <DashboardView />
          )}
        </main>
      </div>

      {/* Interactive App Detail Modal */}
      {selectedApp && (
        <AppDetailModal
          app={selectedApp}
          onClose={() => setSelectedAppId(null)}
        />
      )}

      {/* Sign In & Sign Up Modal */}
      <AuthModal />

      {/* Floating Action Toast Notifications */}
      <Toast />

      {/* Settings Modal */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSettingsOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-[#131620] border border-zinc-800 rounded-3xl p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white">Lab Preferences</h3>
              </div>
              <button 
                onClick={() => setSettingsOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-200">Theme</span>
                <span className="font-semibold text-blue-400">Studio Dark (Default)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-200">Experimental Models</span>
                <span className="text-emerald-400 font-semibold">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-200">Simulator Sound Effects</span>
                <span className="text-zinc-400">Off</span>
              </div>
            </div>

            <button
              onClick={() => setSettingsOpen(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs mt-2"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* API Keys Modal */}
      {apiKeysModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setApiKeysModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-[#131620] border border-zinc-800 rounded-3xl p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">DelightyLabs API Access</h3>
              </div>
              <button 
                onClick={() => setApiKeysModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Use your beta tester credentials to connect third-party Model Context Protocol (MCP) clients and automated test runner suites directly to DelightyLabs.
            </p>

            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Sandbox API Key</span>
              <code className="text-xs font-mono text-cyan-300 block truncate">
                dl_beta_9a4340df224e14b33e8b54d6994510
              </code>
            </div>

            <button
              onClick={() => setApiKeysModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
