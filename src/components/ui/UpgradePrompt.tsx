import React from 'react';
import { motion } from 'framer-motion';
import { Crown, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from './Card';
import { Button } from './Button';

interface UpgradePromptProps {
  title: string;
  description: string;
  feature: string;
  onClose?: () => void;
  compact?: boolean;
}

export function UpgradePrompt({ title, description, feature, onClose, compact = false }: UpgradePromptProps) {
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="w-5 h-5" />
            <div>
              <p className="font-medium text-sm">{title}</p>
              <p className="text-xs text-indigo-100">{description}</p>
            </div>
          </div>
          <Link to="/pricing">
            <Button size="sm" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-50">
              Upgrade
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <Card className="w-full max-w-md">
        <div className="p-6">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 mb-6">{description}</p>
            
            <div className="bg-indigo-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-indigo-700">
                <strong>{feature}</strong> is available in Pro and Pro Plus plans
              </p>
            </div>
            
            <div className="space-y-3">
              <Link to="/pricing" className="block">
                <Button className="w-full group">
                  Upgrade to Pro
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              {onClose && (
                <Button variant="ghost" onClick={onClose} className="w-full">
                  Maybe Later
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}