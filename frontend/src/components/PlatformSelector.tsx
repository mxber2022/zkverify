import React from 'react';
import { Twitter, Sparkles, Pen as Lens } from 'lucide-react';
import { Platform } from '../types';

interface PlatformSelectorProps {
  selected: Platform;
  onSelect: (platform: Platform) => void;
}

export function PlatformSelector({ selected, onSelect }: PlatformSelectorProps) {
  return (
    <div className="flex gap-4 mb-8">
      {[
        { id: 'twitter' as Platform, icon: Twitter, label: 'Twitter' },
        { id: 'farcaster' as Platform, icon: Sparkles, label: 'Farcaster' },
        { id: 'lens' as Platform, icon: Lens, label: 'Lens Protocol' },
      ].map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl backdrop-blur-xl transition-all duration-300 border ${
            selected === id
              ? 'bg-white/20 border-white/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-105'
              : 'bg-white/5 border-white/10 hover:bg-white/10'
          }`}
        >
          <Icon className={`w-5 h-5 ${selected === id ? 'text-white' : 'text-white/60'}`} />
          <span className={`font-medium ${selected === id ? 'text-white' : 'text-white/60'}`}>
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}