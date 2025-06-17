import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  Search,
  Filter,
  MoreVertical,
  Play,
  Eye,
  Share,
  Trash2,
  Download,
  Star,
  Users,
  BarChart3,
  Award,
  RefreshCw
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Quiz } from '../types';

const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Introduction to React Components',
    description: 'Test your knowledge of React components and their lifecycle',
    difficulty: 'medium',
    category: 'Programming',
    createdAt: new Date(Date.now() - 86400000 * 2),
    completedCount: 15,
    averageScore: 87,
    questions: []
  },
  {
    id: '2',
    title: 'JavaScript ES6 Features',
    description: 'Modern JavaScript features and syntax',
    difficulty: 'hard',
    category: 'Programming',
    createdAt: new Date(Date.now() - 86400000 * 5),
    completedCount: 8,
    averageScore: 72,
    questions: []
  },
  {
    id: '3',
    title: 'CSS Grid and Flexbox',
    description: 'Master modern CSS layout techniques',
    difficulty: 'easy',
    category: 'Web Design',
    createdAt: new Date(Date.now() - 86400000 * 7),
    completedCount: 23,
    averageScore: 91,
    questions: []
  },
  {
    id: '4',
    title: 'Node.js Fundamentals',
    description: 'Backend development with Node.js',
    difficulty: 'medium',
    category: 'Backend',
    createdAt: new Date(Date.now() - 86400000 * 10),
    completedCount: 12,
    averageScore: 79,
    questions: []
  },
  {
    id: '5',
    title: 'Database Design Principles',
    description: 'Relational database design and normalization',
    difficulty: 'hard',
    category: 'Database',
    createdAt: new Date(Date.now() - 86400000 * 14),
    completedCount: 6,
    averageScore: 68,
    questions: []
  }
];

export function QuizHistory() {
  const [quizzes] = useState<Quiz[]>(mockQuizzes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'score'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['all', ...Array.from(new Set(quizzes.map(q => q.category)))];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || quiz.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'popular':
        return b.completedCount - a.completedCount;
      case 'score':
        return b.averageScore - a.averageScore;
      default:
        return 0;
    }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-emerald-600 bg-emerald-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const totalQuizzes = quizzes.length;
  const totalAttempts = quizzes.reduce((sum, quiz) => sum + quiz.completedCount, 0);
  const averageScore = Math.round(quizzes.reduce((sum, quiz) => sum + quiz.averageScore, 0) / quizzes.length);
  const bestScore = Math.max(...quizzes.map(quiz => quiz.averageScore));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz History</h1>
          <p className="text-gray-600">View and manage your created quizzes</p>
        </div>
        <Link to="/quiz">
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Create New Quiz
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Quizzes</p>
              <p className="text-2xl font-bold text-gray-900">{totalQuizzes}</p>
            </div>
            <FileText className="w-8 h-8 text-indigo-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attempts</p>
              <p className="text-2xl font-bold text-gray-900">{totalAttempts}</p>
            </div>
            <Users className="w-8 h-8 text-emerald-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
            </div>
            <Target className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Best Score</p>
              <p className="text-2xl font-bold text-gray-900">{bestScore}%</p>
            </div>
            <Award className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Difficulties' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular' | 'score')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="score">Highest Score</option>
            </select>
            
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600'}`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600'}`}
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Quiz List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {sortedQuizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {viewMode === 'grid' ? (
              <Card className="p-6 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {quiz.description}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {quiz.category}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Attempts</span>
                    <span className="font-medium">{quiz.completedCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Avg Score</span>
                    <span className={`font-medium ${getScoreColor(quiz.averageScore)}`}>
                      {quiz.averageScore}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Created</span>
                    <span className="font-medium">{formatDate(quiz.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Link to={`/quiz-attempts/${quiz.id}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Attempts
                    </Button>
                  </Link>
                  <Button size="sm" variant="ghost">
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{quiz.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{quiz.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className={`px-2 py-1 rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
                          {quiz.difficulty}
                        </span>
                        <span>{quiz.category}</span>
                        <span>{quiz.completedCount} attempts</span>
                        <span className={getScoreColor(quiz.averageScore)}>
                          {quiz.averageScore}% avg
                        </span>
                        <span>{formatDate(quiz.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link to={`/quiz-attempts/${quiz.id}`}>
                      <Button size="sm" variant="secondary">
                        <Eye className="w-4 h-4 mr-2" />
                        View Attempts
                      </Button>
                    </Link>
                    <Button size="sm" variant="ghost">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        ))}
      </div>

      {sortedQuizzes.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all'
              ? 'Try adjusting your search criteria'
              : 'Create your first quiz to get started'
            }
          </p>
          <Link to="/quiz">
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Create Quiz
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}