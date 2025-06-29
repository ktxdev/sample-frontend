import React from 'react';
import { HelpCircle, Book, MessageCircle, Mail } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function Help() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-12">
        <HelpCircle className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Help & Support</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Find answers to your questions and get the help you need</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card className="p-6 hover:shadow-xl transition-shadow">
          <Book className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Getting Started</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Learn the basics and get up and running quickly with our comprehensive guides.</p>
          <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors p-0">
            View Guides →
          </Button>
        </Card>

        <Card className="p-6 hover:shadow-xl transition-shadow">
          <MessageCircle className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">FAQ</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Find quick answers to the most commonly asked questions.</p>
          <Button variant="ghost" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors p-0">
            Browse FAQ →
          </Button>
        </Card>

        <Card className="p-6 hover:shadow-xl transition-shadow">
          <Mail className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Contact Support</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Need personalized help? Our support team is here to assist you.</p>
          <Button variant="ghost" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors p-0">
            Contact Us →
          </Button>
        </Card>
      </div>

      <Card className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">How do I get started?</h3>
            <p className="text-gray-600 dark:text-gray-400">Getting started is easy! Simply create an account, complete your profile, and begin exploring the features available to you.</p>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">How can I reset my password?</h3>
            <p className="text-gray-600 dark:text-gray-400">You can reset your password by clicking the "Forgot Password" link on the login page and following the instructions sent to your email.</p>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Is my data secure?</h3>
            <p className="text-gray-600 dark:text-gray-400">Yes, we take data security seriously. All data is encrypted and stored securely using industry-standard practices.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">How do I contact support?</h3>
            <p className="text-gray-600 dark:text-gray-400">You can reach our support team through the contact form, email, or live chat. We typically respond within 24 hours.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}