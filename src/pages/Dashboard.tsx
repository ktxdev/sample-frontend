import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  MessageCircle, 
  CreditCard, 
  GitBranch,
  TrendingUp,
  Clock,
  Target,
  BookOpen,
  Plus,
  Upload
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const stats = [
  {
    label: 'Quizzes Generated',
    value: '24',
    change: '+12%',
    icon: FileText,
    color: 'text-blue-600'
  },
  {
    label: 'Study Sessions',
    value: '156',
    change: '+8%',
    icon: BookOpen,
    color: 'text-emerald-600'
  },
  {
    label: 'Flashcards Created',
    value: '89',
    change: '+23%',
    icon: CreditCard,
    color: 'text-purple-600'
  },
  {
    label: 'Average Score',
    value: '87%',
    change: '+5%',
    icon: Target,
    color: 'text-orange-600'
  }
];

const recentActivity = [
  {
    type: 'quiz',
    title: 'Biology Chapter 5 Quiz',
    subtitle: 'Completed with 92% score',
    time: '2 hours ago',
    icon: FileText
  },
  {
    type: 'flashcard',
    title: 'Spanish Vocabulary',
    subtitle: 'Reviewed 25 cards',
    time: '4 hours ago',
    icon: CreditCard
  },
  {
    type: 'chat',
    title: 'History Notes Discussion',
    subtitle: 'Asked 3 questions',
    time: '6 hours ago',
    icon: MessageCircle
  },
  {
    type: 'mindmap',
    title: 'Physics Concepts Map',
    subtitle: 'Created new mind map',
    time: '1 day ago',
    icon: GitBranch
  }
];

const quickActions = [
  {
    title: 'Upload PDF & Generate Quiz',
    description: 'Transform your documents into interactive quizzes',
    icon: Upload,
    href: '/quiz',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Chat with Notes',
    description: 'Ask questions about your uploaded documents',
    icon: MessageCircle,
    href: '/chat',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    title: 'Create Flashcards',
    description: 'Build flashcard decks for spaced repetition',
    icon: CreditCard,
    href: '/flashcards',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Design Mind Map',
    description: 'Visualize concepts and relationships',
    icon: GitBranch,
    href: '/mindmap',
    color: 'from-orange-500 to-orange-600'
  }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600">
            Here's your learning progress overview
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="group">
            <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
            Create New
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-emerald-600 font-medium">
                    {stat.change} from last week
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Link to={action.href}>
                <Card className="p-6 cursor-pointer group h-full">
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {action.description}
                  </p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <Card className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <activity.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.subtitle}</p>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Study Streak</h2>
          <Card className="p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔥</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">7 Days</p>
              <p className="text-sm text-gray-600">Current streak</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">This week</span>
                <span className="font-medium">5/7 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full" style={{ width: '71%' }}></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}