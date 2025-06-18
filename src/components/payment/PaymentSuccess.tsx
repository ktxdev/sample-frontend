import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plan } from '../../types';

interface PaymentSuccessProps {
  plan: Plan;
  transactionId: string;
  amount: number;
  annual?: boolean;
}

export function PaymentSuccess({ plan, transactionId, amount, annual = false }: PaymentSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-8 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-emerald-600" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to {plan.name}!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your payment was successful and your subscription is now active.
            </p>
          </motion.div>

          {/* Plan Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Crown className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-900">{plan.name} Plan</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-sm text-gray-600">
                      +{plan.features.length - 4} more features
                    </li>
                  )}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Payment Details:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span className="font-medium">{plan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Billing:</span>
                    <span className="font-medium">{annual ? 'Annual' : 'Monthly'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-medium">${amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <span className="font-mono text-xs">{transactionId}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-indigo-600 font-bold">1</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Explore Features</h4>
                <p className="text-sm text-gray-600">Start using all the premium features available in your plan</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-indigo-600 font-bold">2</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Create Content</h4>
                <p className="text-sm text-gray-600">Generate unlimited quizzes and study materials</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-indigo-600 font-bold">3</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Get Support</h4>
                <p className="text-sm text-gray-600">Access priority support whenever you need help</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="group">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button variant="secondary" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
            </div>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to your email address. 
                You can manage your subscription anytime from your account settings.
              </p>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}