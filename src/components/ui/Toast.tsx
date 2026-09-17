import React from 'react';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useAuth();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-16 md:bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#181c26] border border-blue-500/40 text-white shadow-2xl shadow-black/80">
        <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 animate-pulse" />
        <span className="text-xs font-medium text-zinc-200">{toastMessage}</span>
      </div>
    </div>
  );
};
