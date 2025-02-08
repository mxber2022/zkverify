import React from "react";
import { Heart, MessageCircle, Repeat } from "lucide-react";
import type { Comment } from "../types";

interface CommentsListProps {
  comments: Comment[];
  loading?: boolean;
}

export function CommentsList({ comments, loading }: CommentsListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 rounded w-1/4"></div>
                <div className="h-3 bg-white/10 rounded w-3/4"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex gap-3">
            <img
              src={comment.profileImage}
              alt={comment.username}
              className="w-10 h-10 rounded-full ring-2 ring-white/10 group-hover:ring-blue-500/30 transition-all duration-300"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-800 truncate">
                  @{comment.username}
                </span>
                <span className="text-xs text-gray-600">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{comment.content}</p>
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-1.5 text-gray-600 hover:text-red-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs">{comment.likes}</span>
                </button>
                {comment.retweets !== undefined && (
                  <button className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors">
                    <Repeat className="w-4 h-4" />
                    <span className="text-xs">{comment.retweets}</span>
                  </button>
                )}
                {comment.replies !== undefined && (
                  <button className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{comment.replies}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
