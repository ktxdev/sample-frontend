import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface UsageCardProps {
  title: string;
  used: number | 'unlimited';
  limit: number | 'unlimited';
  icon: React.ReactNode;
  color: string;
  onUpgrade?: () => void;
}

export function UsageCard({ title, used, limit, icon, color, onUpgrade }: UsageCardProps) {
  const isUnlimited = limit === 'unlimited';
  const percentage = isUnlimited ? 0 : Math.min(100, ((used as number) / (limit as number)) * 100);
  const isNearLimit = percentage > 80;
  const isAtLimit = percentage >= 100;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${color}`}>
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">
              {isUnlimited ? 'Unlimited' : `${used} of ${limit} used`}
            </p>
          </div>
        </div>
        {(isNearLimit || isAtLimit) && !isUnlimited && (
          <AlertTriangle className={`w-5 h-5 ${isAtLimit ? 'text-red-500' : 'text-yellow-500'}`} />
        )}
      </div>

      {!isUnlimited && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Usage</span>
            <span>{percentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-2 rounded-full ${
                isAtLimit 
                  ? 'bg-red-500' 
                  : isNearLimit 
                    ? 'bg-yellow-500' 
                    : 'bg-emerald-500'
              }`}
            />
          </div>
        </div>
      )}

      {isAtLimit && onUpgrade && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg">
          <p className="text-sm text-red-700 mb-2">
            You've reached your {title.toLowerCase()} limit
          </p>
          <Button size="sm" onClick={onUpgrade}>
            <TrendingUp className="w-4 h-4 mr-2" />
            Upgrade Plan
          </Button>
        </div>
      )}

      {isNearLimit && !isAtLimit && onUpgrade && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-700 mb-2">
            You're close to your {title.toLowerCase()} limit
          </p>
          <Button size="sm" variant="secondary" onClick={onUpgrade}>
            <TrendingUp className="w-4 h-4 mr-2" />
            Upgrade Plan
          </Button>
        </div>
      )}
    </Card>
  );
}