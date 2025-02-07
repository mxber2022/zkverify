export type Platform = 'twitter' | 'farcaster' | 'lens';
export type EngagementType = 'comments' | 'likes' | 'retweets' | 'all';

export interface Winner {
  id: string;
  platform: Platform;
  username: string;
  profileImage: string;
  timestamp: string;
  engagementType: EngagementType;
}

export interface Comment {
  id: string;
  username: string;
  profileImage: string;
  content: string;
  timestamp: string;
  likes: number;
  retweets?: number;
  replies?: number;
}

export interface GiveawayConfig {
  url: string;
  platform: Platform;
  winnerCount: number;
  engagementType: EngagementType;
}