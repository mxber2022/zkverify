import React from 'react';
import { Trophy, MessageCircle, Heart, Repeat, Sparkles } from 'lucide-react';
import { Winner, EngagementType } from '../types';

const engagementIcons: Record<EngagementType, typeof Heart> = {
  comments: MessageCircle,
  likes: Heart,
  retweets: Repeat,
  all: Sparkles,
};

export function WinnerCard({ winner }: { winner: Winner }) {
  const EngagementIcon = engagementIcons[winner.engagementType];

  return (
    <div className="group bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-white/20">
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full group-hover:animate-pulse"></div>
            <img
              src={winner.profileImage}
              alt={winner.username}
              className="relative w-14 h-14 rounded-full ring-2 ring-white/20 group-hover:ring-blue-500/50 transition-all duration-300"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
              @{winner.username}
            </h3>
            <p className="text-sm text-gray-600 flex items-center gap-1.5">
              <EngagementIcon className="w-3.5 h-3.5" />
              {winner.engagementType === 'all' ? 'All Engagement' : winner.engagementType}
            </p>
          </div>
          <Trophy className="ml-auto w-5 h-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Selected at: {new Date(winner.timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  );
}