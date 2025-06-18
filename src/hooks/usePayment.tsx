import { createContext, useContext, useState, ReactNode } from 'react';
import { Plan } from '../types';
import { useAuth } from './useAuth';

interface PaymentContextType {
  processPayment: (plan: Plan, annual?: boolean) => Promise<PaymentResult>;
  isProcessing: boolean;
  lastTransaction: PaymentResult | null;
}

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  plan?: Plan;
  amount?: number;
  annual?: boolean;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<PaymentResult | null>(null);

  const processPayment = async (plan: Plan, annual = false): Promise<PaymentResult> => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate payment success/failure (90% success rate)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        const amount = annual ? plan.price * 10 : plan.price;
        const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const result: PaymentResult = {
          success: true,
          transactionId,
          plan,
          amount,
          annual
        };
        
        setLastTransaction(result);
        
        // Update user subscription in localStorage (simulate backend update)
        if (user) {
          const updatedUser = {
            ...user,
            subscription: {
              ...user.subscription,
              plan: plan.id,
              status: 'active' as const,
              currentPeriodEnd: new Date(Date.now() + (annual ? 365 : 30) * 24 * 60 * 60 * 1000),
              cancelAtPeriodEnd: false
            }
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          // Trigger a page reload to update the auth context
          window.location.reload();
        }
        
        return result;
      } else {
        const result: PaymentResult = {
          success: false,
          error: 'Payment failed. Please check your payment method and try again.'
        };
        
        setLastTransaction(result);
        return result;
      }
    } catch (error) {
      const result: PaymentResult = {
        success: false,
        error: 'An unexpected error occurred. Please try again.'
      };
      
      setLastTransaction(result);
      return result;
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PaymentContext.Provider value={{
      processPayment,
      isProcessing,
      lastTransaction
    }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}