import React from 'react';
import { HelpCircle, Book, MessageCircle, Mail } from 'lucide-react';

export default function Help() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
          <p className="text-xl text-gray-600">Find answers to your questions and get the help you need</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <Book className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Getting Started</h3>
            <p className="text-gray-600 mb-4">Learn the basics and get up and running quickly with our comprehensive guides.</p>
            <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
              View Guides →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <MessageCircle className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">FAQ</h3>
            <p className="text-gray-600 mb-4">Find quick answers to the most commonly asked questions.</p>
            <button className="text-green-600 font-medium hover:text-green-700 transition-colors">
              Browse FAQ →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <Mail className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact Support</h3>
            <p className="text-gray-600 mb-4">Need personalized help? Our support team is here to assist you.</p>
            <button className="text-purple-600 font-medium hover:text-purple-700 transition-colors">
              Contact Us →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I get started?</h3>
              <p className="text-gray-600">Getting started is easy! Simply create an account, complete your profile, and begin exploring the features available to you.</p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How can I reset my password?</h3>
              <p className="text-gray-600">You can reset your password by clicking the "Forgot Password" link on the login page and following the instructions sent to your email.</p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my data secure?</h3>
              <p className="text-gray-600">Yes, we take data security seriously. All data is encrypted and stored securely using industry-standard practices.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I contact support?</h3>
              <p className="text-gray-600">You can reach our support team through the contact form, email, or live chat. We typically respond within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Help }