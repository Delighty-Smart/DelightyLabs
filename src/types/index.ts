export type AppCategory = 
  | 'featured'
  | 'all'
  | 'gemini'
  | 'creative'
  | 'games'
  | 'multimodal'
  | 'dev-tools'
  | 'research';

export interface Creator {
  name: string;
  avatar: string;
  handle: string;
  verified?: boolean;
}

export interface InteractiveConfig {
  samplePrompts: string[];
  placeholder: string;
  responseTemplate: string;
  actionLabel?: string;
  features: string[];
}

export interface BetaApp {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: AppCategory;
  section: 'gemini-flash' | 'nano-banana' | 'landing-pages' | 'community';
  tags: string[];
  version: string;
  status: 'active' | 'invite-only' | 'trending' | 'new';
  modelOrEngine: string;
  thumbnail: string;
  bannerImage?: string;
  featuredScreenshots: string[];
  creator: Creator;
  testersCount: number;
  upvotesCount: number;
  rating: number;
  reviewsCount: number;
  demoType: 'interactive-simulator' | 'embed' | 'prototype';
  interactiveConfig: InteractiveConfig;
  demoUrl?: string;
  githubUrl?: string;
  releaseDate: string;
  whatsNew: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  tier: 'PRO' | 'TESTER' | 'CORE LABS';
  credits: number;
  bookmarkedAppIds: string[];
  testedAppIds: string[];
}

export interface TesterFeedback {
  id: string;
  appId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  type: 'bug' | 'feature' | 'ux' | 'praise';
  comment: string;
  timestamp: string;
  likes: number;
  device?: string;
}

export interface ActivityLog {
  id: string;
  appId: string;
  appTitle: string;
  type: 'launch' | 'review' | 'bookmark' | 'status_change' | 'create' | 'edit' | 'delete';
  userName: string;
  userAvatar: string;
  details: string;
  timestamp: string;
}

export interface CategoryItem {
  id: AppCategory;
  label: string;
  icon: string;
  count?: number;
}
