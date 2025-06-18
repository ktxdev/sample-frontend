import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, CreditCard, Shield, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PlanCard } from '../components/subscription/PlanCard';
import { CheckoutModal } from '../components/payment/CheckoutModal';
import { useSubscription } from '../hooks/useSubscription';
import { useAuth } from '../hooks/useAuth';
import { usePayment } from '../hooks/usePayment';
import { Plan } from '../types';

export function Pricing() {
  const { plans, currentPlan } = useSubscription();
  const { user } = useAuth();
  const { processPayment } = usePayment();
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleSelectPlan = async (planId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (planId === 'free' || planId === currentPlan.id) return;

    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  const handlePaymentSuccess = () => {
    setShowCheckout(false);
    setSelectedPlan(null);
    setLoadingPlan(null);
    navigate('/dashboard');
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    setLoadingPlan(null);
  };

  const benefits = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Instant AI Generation',
      description: 'Generate quizzes, flashcards, and mind maps in seconds'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Secure & Private',
      description: 'Your data is encrypted and never shared with third parties'
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Cancel Anytime',
      description: 'No long-term commitments, cancel your subscription anytime'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">Back to {user ? "Dashboard" : "Home"}</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                QuizCraft
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Choose Your Perfect Plan
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Unlock the full potential of AI-powered learning with our flexible pricing plans
          </motion.p>

          {/* Billing Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-4 mb-12"
          >
            <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                Save 17%
              </span>
            )}
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <PlanCard
                plan={plan}
                isCurrentPlan={user?.subscription?.plan === plan.id}
                onSelectPlan={handleSelectPlan}
                isLoading={loadingPlan === plan.id}
                annual={isAnnual}
              />
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose QuizCraft?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-indigo-600">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'Can I change my plan anytime?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades, or at the end of your billing cycle for downgrades.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start your trial.'
              },
              {
                question: 'What happens to my data if I cancel?',
                answer: 'Your data remains accessible for 30 days after cancellation. You can export all your content during this period.'
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already using QuizCraft to study smarter and achieve better results.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-indigo-600 hover:bg-gray-50"
              onClick={() => handleSelectPlan('pro')}
            >
              Start Your Free Trial
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && selectedPlan && (
        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => {
            setShowCheckout(false);
            setSelectedPlan(null);
          }}
          plan={selectedPlan}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          annual={isAnnual}
        />
      )}
    </div>
  );
}