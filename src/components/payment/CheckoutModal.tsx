import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CreditCard, 
  Lock, 
  Check, 
  AlertCircle,
  ArrowLeft,
  Shield,
  Calendar,
  User,
  Building
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plan } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan;
  onSuccess: () => void;
  onError: (error: string) => void;
  annual?: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple' | 'google';
  name: string;
  icon: React.ReactNode;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    type: 'card',
    name: 'Credit Card',
    icon: <CreditCard className="w-5 h-5" />,
    description: 'Visa, Mastercard, American Express'
  },
  {
    id: 'paypal',
    type: 'paypal',
    name: 'PayPal',
    icon: <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>,
    description: 'Pay with your PayPal account'
  },
  {
    id: 'apple',
    type: 'apple',
    name: 'Apple Pay',
    icon: <div className="w-5 h-5 bg-black rounded text-white text-xs flex items-center justify-center">🍎</div>,
    description: 'Touch ID or Face ID'
  },
  {
    id: 'google',
    type: 'google',
    name: 'Google Pay',
    icon: <div className="w-5 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">G</div>,
    description: 'Pay with Google'
  }
];

export function CheckoutModal({ isOpen, onClose, plan, onSuccess, onError, annual = false }: CheckoutModalProps) {
  const [step, setStep] = useState<'method' | 'details' | 'processing' | 'success' | 'error'>('method');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const price = annual ? plan.price * 10 : plan.price;
  const originalPrice = annual ? plan.price * 12 : plan.price;
  const savings = annual ? originalPrice - price : 0;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (selectedMethod?.type === 'card') {
      if (!formData.cardNumber || formData.cardNumber.length < 16) {
        newErrors.cardNumber = 'Please enter a valid card number';
      }
      if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
      if (!formData.cardholderName.trim()) {
        newErrors.cardholderName = 'Please enter the cardholder name';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    if (method.type !== 'card') {
      // For non-card payments, skip to processing
      setStep('processing');
      processPayment();
    } else {
      setStep('details');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep('processing');
      processPayment();
    }
  };

  const processPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate random success/failure (90% success rate)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        setStep('success');
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      } else {
        setStep('error');
        onError('Payment failed. Please try again.');
      }
    } catch (error) {
      setStep('error');
      onError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'cardNumber') {
      value = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      value = formatExpiryDate(value);
    } else if (field === 'cvv') {
      value = value.replace(/[^0-9]/g, '').substring(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const renderMethodSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Payment Method</h2>
        <p className="text-gray-600">Select how you'd like to pay for your subscription</p>
      </div>

      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleMethodSelect(method)}
            className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {method.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 group-hover:text-indigo-700">
                  {method.name}
                </h3>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full group-hover:border-indigo-500"></div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderPaymentDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setStep('method')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
          <p className="text-gray-600">Enter your card information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              className={`w-full pl-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.cardNumber ? 'border-red-300' : 'border-gray-300'
              }`}
              maxLength={19}
            />
            <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          {errors.cardNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              placeholder="MM/YY"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.expiryDate ? 'border-red-300' : 'border-gray-300'
              }`}
              maxLength={5}
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="text"
              value={formData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              placeholder="123"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.cvv ? 'border-red-300' : 'border-gray-300'
              }`}
              maxLength={4}
            />
            {errors.cvv && (
              <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            value={formData.cardholderName}
            onChange={(e) => handleInputChange('cardholderName', e.target.value)}
            placeholder="John Doe"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.cardholderName ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.cardholderName && (
            <p className="mt-1 text-sm text-red-600">{errors.cardholderName}</p>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Shield className="w-4 h-4" />
            <span>Your payment information is encrypted and secure</span>
          </div>
          
          <Button type="submit" className="w-full" size="lg">
            <Lock className="w-4 h-4 mr-2" />
            Pay ${price} {annual ? '/year' : '/month'}
          </Button>
        </div>
      </form>
    </div>
  );

  const renderProcessing = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
      <p className="text-gray-600">Please wait while we process your payment...</p>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-8 h-8 text-emerald-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
      <p className="text-gray-600 mb-6">
        Welcome to {plan.name}! Your subscription is now active.
      </p>
      <div className="bg-emerald-50 rounded-lg p-4">
        <p className="text-emerald-800 font-medium">
          You now have access to all {plan.name} features
        </p>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
      <p className="text-gray-600 mb-6">
        We couldn't process your payment. Please try again.
      </p>
      <div className="space-y-3">
        <Button onClick={() => setStep('method')} className="w-full">
          Try Again
        </Button>
        <Button variant="ghost" onClick={onClose} className="w-full">
          Cancel
        </Button>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg"
      >
        <Card className="relative">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Q</span>
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">QuizCraft {plan.name}</h1>
                <p className="text-sm text-gray-600">
                  ${price}{annual ? '/year' : '/month'}
                  {savings > 0 && (
                    <span className="ml-2 text-emerald-600 font-medium">
                      Save ${savings}
                    </span>
                  )}
                </p>
              </div>
            </div>
            {step !== 'processing' && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 'method' && renderMethodSelection()}
                {step === 'details' && renderPaymentDetails()}
                {step === 'processing' && renderProcessing()}
                {step === 'success' && renderSuccess()}
                {step === 'error' && renderError()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          {(step === 'method' || step === 'details') && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>Powered by Stripe</span>
                  <div className="flex space-x-1">
                    <div className="w-6 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">V</div>
                    <div className="w-6 h-4 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">M</div>
                    <div className="w-6 h-4 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">A</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}