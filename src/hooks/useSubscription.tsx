import { createContext, useContext, ReactNode } from 'react';
import { Plan } from '../types';
import { useAuth } from './useAuth';

interface SubscriptionContextType {
  currentPlan: Plan;
  plans: Plan[];
  canUseFeature: (feature: string) => boolean;
  getRemainingUsage: (feature: string) => number | 'unlimited';
  upgradeToPlan: (planId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  isLoading: boolean;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      '5 quizzes per month',
      '100MB document storage',
      '50 AI-generated questions',
      '25 flashcards',
      '3 mind maps',
      'Basic export (PDF)',
      'Community support'
    ],
    limits: {
      quizzesPerMonth: 5,
      documentsStorage: '100MB',
      aiQuestions: 50,
      flashcards: 25,
      mindMaps: 3,
      exportFormats: ['PDF'],
      prioritySupport: false,
      advancedAnalytics: false,
      teamCollaboration: false
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    interval: 'month',
    features: [
      'Unlimited quizzes',
      'Unlimited document storage',
      'Unlimited AI questions',
      'Unlimited flashcards',
      'Unlimited mind maps',
      'All export formats',
      'Priority support',
      'Advanced analytics',
      'Team collaboration (up to 10 members)',
      'Custom branding',
      'White-label solution',
      'API access',
      'Custom integrations'
    ],
    limits: {
      quizzesPerMonth: 'unlimited',
      documentsStorage: 'unlimited',
      aiQuestions: 'unlimited',
      flashcards: 'unlimited',
      mindMaps: 'unlimited',
      exportFormats: ['PDF', 'Word', 'Excel', 'PowerPoint', 'SCORM'],
      prioritySupport: true,
      advancedAnalytics: true,
      teamCollaboration: true
    },
    popular: true,
    badge: 'Most Popular'
  }
];

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  
  const currentPlan = plans.find(plan => plan.id === user?.subscription?.plan) || plans[0];
  
  const canUseFeature = (feature: string): boolean => {
    if (!user) return false;
    
    switch (feature) {
      case 'prioritySupport':
        return currentPlan.limits.prioritySupport;
      case 'advancedAnalytics':
        return currentPlan.limits.advancedAnalytics;
      case 'teamCollaboration':
        return currentPlan.limits.teamCollaboration;
      default:
        return true;
    }
  };

  const getRemainingUsage = (feature: string): number | 'unlimited' => {
    if (!user) return 0;
    
    // Mock usage tracking - replace with actual backend data
    const mockUsage = {
      quizzesThisMonth: 3,
      aiQuestionsUsed: 25,
      flashcardsCreated: 15,
      mindMapsCreated: 2
    };

    switch (feature) {
      case 'quizzes':
        if (currentPlan.limits.quizzesPerMonth === 'unlimited') return 'unlimited';
        return Math.max(0, (currentPlan.limits.quizzesPerMonth as number) - mockUsage.quizzesThisMonth);
      case 'aiQuestions':
        if (currentPlan.limits.aiQuestions === 'unlimited') return 'unlimited';
        return Math.max(0, (currentPlan.limits.aiQuestions as number) - mockUsage.aiQuestionsUsed);
      case 'flashcards':
        if (currentPlan.limits.flashcards === 'unlimited') return 'unlimited';
        return Math.max(0, (currentPlan.limits.flashcards as number) - mockUsage.flashcardsCreated);
      case 'mindMaps':
        if (currentPlan.limits.mindMaps === 'unlimited') return 'unlimited';
        return Math.max(0, (currentPlan.limits.mindMaps as number) - mockUsage.mindMapsCreated);
      default:
        return 0;
    }
  };

  const upgradeToPlan = async (planId: string): Promise<void> => {
    // This would integrate with Stripe or your payment processor
    console.log(`Upgrading to plan: ${planId}`);
    // Mock upgrade process
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const cancelSubscription = async (): Promise<void> => {
    // This would cancel the subscription via your payment processor
    console.log('Canceling subscription');
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <SubscriptionContext.Provider value={{
      currentPlan,
      plans,
      canUseFeature,
      getRemainingUsage,
      upgradeToPlan,
      cancelSubscription,
      isLoading: false
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}