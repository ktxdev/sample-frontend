export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'email';
  subscription: Subscription;
}

export interface Subscription {
  plan: 'free' | 'pro' | 'pro_plus';
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  trialEnd?: Date;
}

export interface Plan {
  id: 'free' | 'pro' | 'pro_plus';
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    quizzesPerMonth: number | 'unlimited';
    documentsStorage: string;
    aiQuestions: number | 'unlimited';
    flashcards: number | 'unlimited';
    mindMaps: number | 'unlimited';
    exportFormats: string[];
    prioritySupport: boolean;
    advancedAnalytics: boolean;
    teamCollaboration: boolean;
  };
  popular?: boolean;
  badge?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: Date;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  completedCount: number;
  averageScore: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: Date;
  nextReview?: Date;
  correctStreak: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  tags: string[];
  fileName?: string;
}

export interface MindMapNode {
  id: string;
  text: string;
  x: number;
  y: number;
  children: string[];
  color: string;
}

export interface DocumentGroup {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: Date;
  documentIds: string[];
  isDefault?: boolean;
}

export interface Document {
  id: string;
  name: string;
  size: string;
  uploadedAt: Date;
  type: 'pdf' | 'doc' | 'txt';
  groupIds: string[];
  content?: string;
}