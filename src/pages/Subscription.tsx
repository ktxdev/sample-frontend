import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Calendar, 
  CreditCard, 
  Download, 
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
  MessageCircle,
  Zap,
  GitBranch,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { UsageCard } from '../components/subscription/UsageCard';
import { useSubscription } from '../hooks/useSubscription';
import { useAuth } from '../hooks/useAuth';

export function Subscription() {
  const { user } = useAuth();
  const { currentPlan, getRemainingUsage, cancelSubscription } = useSubscription();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    try {
      await cancelSubscription();
      setShowCancelModal(false);
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-emerald-600 bg-emerald-50';
      case 'trialing':
        return 'text-blue-600 bg-blue-50';
      case 'canceled':
        return 'text-red-600 bg-red-50';
      case 'past_due':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'trialing':
        return <Zap className="w-4 h-4" />;
      case 'canceled':
        return <XCircle className="w-4 h-4" />;
      case 'past_due':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const usageData = [
    {
      title: 'Quizzes',
      used: getRemainingUsage('quizzes') === 'unlimited' ? 'unlimited' : 5 - (getRemainingUsage('quizzes') as number),
      limit: currentPlan.limits.quizzesPerMonth,
      icon: <FileText className="w-5 h-5 text-white" />,
      color: 'bg-blue-500'
    },
    {
      title: 'AI Questions',
      used: getRemainingUsage('aiQuestions') === 'unlimited' ? 'unlimited' : 50 - (getRemainingUsage('aiQuestions') as number),
      limit: currentPlan.limits.aiQuestions,
      icon: <MessageCircle className="w-5 h-5 text-white" />,
      color: 'bg-emerald-500'
    },
    {
      title: 'Flashcards',
      used: getRemainingUsage('flashcards') === 'unlimited' ? 'unlimited' : 25 - (getRemainingUsage('flashcards') as number),
      limit: currentPlan.limits.flashcards,
      icon: <CreditCard className="w-5 h-5 text-white" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Mind Maps',
      used: getRemainingUsage('mindMaps') === 'unlimited' ? 'unlimited' : 3 - (getRemainingUsage('mindMaps') as number),
      limit: currentPlan.limits.mindMaps,
      icon: <GitBranch className="w-5 h-5 text-white" />,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription</h1>
          <p className="text-gray-600">Manage your subscription and billing</p>
        </div>
        <Link to="/pricing">
          <Button>
            <TrendingUp className="w-4 h-4 mr-2" />
            Upgrade Plan
          </Button>
        </Link>
      </div>

      {/* Current Plan */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{currentPlan.name} Plan</h2>
              <p className="text-gray-600">
                {currentPlan.id === 'free' ? 'Free forever' : `$${currentPlan.price}/month`}
              </p>
            </div>
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user?.subscription?.status || 'active')}`}>
            {getStatusIcon(user?.subscription?.status || 'active')}
            <span className="ml-1 capitalize">{user?.subscription?.status || 'active'}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Plan Features</h3>
            <div className="space-y-2">
              {currentPlan.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>{feature}</span>
                </div>
              ))}
              {currentPlan.features.length > 4 && (
                <p className="text-sm text-gray-500">
                  +{currentPlan.features.length - 4} more features
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Billing Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {user?.subscription?.status === 'canceled' ? 'Expires' : 'Renews'} on {formatDate(user?.subscription?.currentPeriodEnd || new Date())}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {currentPlan.id === 'free' ? 'No payment method required' : 'Visa ending in 4242'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {user?.subscription?.cancelAtPeriodEnd && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <p className="text-yellow-800 font-medium">
                Your subscription will be canceled on {formatDate(user.subscription.currentPeriodEnd)}
              </p>
            </div>
            <p className="text-yellow-700 text-sm mt-1">
              You'll continue to have access to all features until then.
            </p>
          </div>
        )}
      </Card>

      {/* Usage Overview */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {usageData.map((usage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <UsageCard
                title={usage.title}
                used={usage.used}
                limit={usage.limit}
                icon={usage.icon}
                color={usage.color}
                onUpgrade={() => window.location.href = '/pricing'}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Billing History</h2>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>

        <div className="space-y-4">
          {currentPlan.id === 'free' ? (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No billing history</h3>
              <p className="text-gray-600 mb-4">You're currently on the free plan</p>
              <Link to="/pricing">
                <Button>Upgrade to Pro</Button>
              </Link>
            </div>
          ) : (
            [
              { date: new Date(), amount: currentPlan.price, status: 'paid' },
              { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), amount: currentPlan.price, status: 'paid' },
              { date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), amount: currentPlan.price, status: 'paid' }
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      ${invoice.amount} - {currentPlan.name} Plan
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(invoice.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                    Paid
                  </span>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Danger Zone */}
      {currentPlan.id !== 'free' && !user?.subscription?.cancelAtPeriodEnd && (
        <Card className="p-6 border-red-200">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div>
              <h3 className="font-medium text-red-900">Cancel Subscription</h3>
              <p className="text-sm text-red-700">
                You'll continue to have access until {formatDate(user?.subscription?.currentPeriodEnd || new Date())}
              </p>
            </div>
            <Button 
              variant="danger" 
              onClick={() => setShowCancelModal(true)}
            >
              Cancel Subscription
            </Button>
          </div>
        </Card>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Cancel Subscription</h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to cancel your subscription? You'll lose access to all Pro features at the end of your billing period.
              </p>
              
              <div className="flex space-x-3">
                <Button 
                  variant="secondary" 
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1"
                >
                  Keep Subscription
                </Button>
                <Button 
                  variant="danger" 
                  onClick={handleCancelSubscription}
                  loading={isLoading}
                  className="flex-1"
                >
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}