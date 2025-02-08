import React from "react";
import { MessageCircle, Heart, Repeat, Sparkles } from "lucide-react";
import type { EngagementType } from "../types";

interface EngagementSelectorProps {
  selected: EngagementType;
  onSelect: (type: EngagementType) => void;
}

export function EngagementSelector({
  selected,
  onSelect,
}: EngagementSelectorProps) {
  const options: { id: EngagementType; icon: typeof Heart; label: string }[] = [
    { id: "comments", icon: MessageCircle, label: "Comments" },
    { id: "likes", icon: Heart, label: "Likes" },
    { id: "retweets", icon: Repeat, label: "Retweets" },
    { id: "all", icon: Sparkles, label: "All Engagement" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {options.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl backdrop-blur-xl transition-all duration-300 border ${
            selected === id
              ? "bg-white/20 border-white/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-[1.02]"
              : "bg-white/5 border-white/10 hover:bg-white/10"
          }`}
        >
          <Icon
            className={`w-4 h-4 ${
              selected === id ? "text-gray-800" : "text-gray-600"
            }`}
          />
          <span
            className={`text-sm font-medium ${
              selected === id ? "text-gray-800" : "text-gray-600"
            }`}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
