import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Zap, Star } from 'lucide-react';
import { Plan } from '../../types';
import { Button } from '../ui/Button';

interface PlanCardProps {
  plan: Plan;
  isCurrentPlan: boolean;
  onSelectPlan: (planId: string) => void;
  isLoading?: boolean;
  annual?: boolean;
}

export function PlanCard({ plan, isCurrentPlan, onSelectPlan, isLoading, annual = false }: PlanCardProps) {
  const getIcon = () => {
    switch (plan.id) {
      case 'free':
        return <Star className="w-6 h-6" />;
      case 'pro':
        return <Crown className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getGradient = () => {
    switch (plan.id) {
      case 'free':
        return 'from-gray-500 to-gray-600';
      case 'pro':
        return 'from-indigo-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const price = annual ? plan.price * 10 : plan.price; // 2 months free on annual
  const originalPrice = annual ? plan.price * 12 : plan.price;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={`relative bg-white dark:bg-gray-800/70 rounded-2xl shadow-lg border-2 transition-all duration-300 ${
        isCurrentPlan 
          ? 'border-indigo-500 shadow-indigo-200 dark:shadow-indigo-900/50' 
          : plan.popular 
            ? 'border-indigo-200 dark:border-indigo-700 shadow-xl' 
            : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
      } ${plan.popular ? 'scale-105' : ''}`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}

      {plan.badge && (
        <div className="absolute -top-4 right-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {plan.badge}
          </div>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-16 h-16 bg-gradient-to-r ${getGradient()} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white`}>
            {getIcon()}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{plan.name}</h3>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              ${plan.id === 'free' ? '0' : price}
            </span>
            {plan.id !== 'free' && (
              <div className="text-left">
                {annual && originalPrice > price && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    ${originalPrice}
                  </div>
                )}
                <div className="text-gray-600 dark:text-gray-400">
                  /{annual ? 'year' : 'month'}
                </div>
              </div>
            )}
          </div>
          {annual && plan.id !== 'free' && (
            <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              Save ${originalPrice - price} per year
            </div>
          )}
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="space-y-3">
          {isCurrentPlan ? (
            <Button 
              variant="secondary" 
              className="w-full" 
              disabled
            >
              Current Plan
            </Button>
          ) : (
            <Button
              onClick={() => onSelectPlan(plan.id)}
              loading={isLoading}
              className={`w-full ${
                plan.popular 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700' 
                  : ''
              }`}
              variant={plan.popular ? 'primary' : 'secondary'}
            >
              {plan.id === 'free' ? 'Current Plan' : `Upgrade to ${plan.name}`}
            </Button>
          )}
          
          {plan.id !== 'free' && (
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Cancel anytime • No setup fees
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}