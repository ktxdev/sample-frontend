import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  User,
  Award,
  BarChart3,
  Download,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Timer,
  Percent,
  Hash
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface QuizAttempt {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // in seconds
  completedAt: Date;
  answers: {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    timeSpent: number;
  }[];
}

const mockQuiz = {
  id: '1',
  title: 'Introduction to React Components',
  description: 'Test your knowledge of React components and their lifecycle',
  difficulty: 'medium',
  category: 'Programming',
  totalQuestions: 10
};

const mockAttempts: QuizAttempt[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2',
    score: 87,
    totalQuestions: 10,
    correctAnswers: 8,
    timeSpent: 420,
    completedAt: new Date(Date.now() - 3600000),
    answers: []
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Smith',
    score: 92,
    totalQuestions: 10,
    correctAnswers: 9,
    timeSpent: 380,
    completedAt: new Date(Date.now() - 7200000),
    answers: []
  },
  {
    id: '3',
    userId: '3',
    userName: 'Mike Johnson',
    score: 75,
    totalQuestions: 10,
    correctAnswers: 7,
    timeSpent: 520,
    completedAt: new Date(Date.now() - 86400000),
    answers: []
  },
  {
    id: '4',
    userId: '4',
    userName: 'Sarah Wilson',
    score: 95,
    totalQuestions: 10,
    correctAnswers: 9,
    timeSpent: 350,
    completedAt: new Date(Date.now() - 172800000),
    answers: []
  },
  {
    id: '5',
    userId: '5',
    userName: 'David Brown',
    score: 68,
    totalQuestions: 10,
    correctAnswers: 6,
    timeSpent: 600,
    completedAt: new Date(Date.now() - 259200000),
    answers: []
  }
];

export function QuizAttempts() {
  const { quizId } = useParams();
  const [attempts] = useState<QuizAttempt[]>(mockAttempts);
  const [sortBy, setSortBy] = useState<'recent' | 'score' | 'time'>('recent');
  const [filterBy, setFilterBy] = useState<'all' | 'passed' | 'failed'>('all');

  const sortedAttempts = [...attempts].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.completedAt.getTime() - a.completedAt.getTime();
      case 'score':
        return b.score - a.score;
      case 'time':
        return a.timeSpent - b.timeSpent;
      default:
        return 0;
    }
  });

  const filteredAttempts = sortedAttempts.filter(attempt => {
    if (filterBy === 'all') return true;
    if (filterBy === 'passed') return attempt.score >= 70;
    if (filterBy === 'failed') return attempt.score < 70;
    return true;
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <Award className="w-4 h-4" />;
    if (score >= 70) return <CheckCircle className="w-4 h-4" />;
    return <XCircle className="w-4 h-4" />;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate statistics
  const totalAttempts = attempts.length;
  const averageScore = Math.round(attempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalAttempts);
  const passRate = Math.round((attempts.filter(a => a.score >= 70).length / totalAttempts) * 100);
  const averageTime = Math.round(attempts.reduce((sum, attempt) => sum + attempt.timeSpent, 0) / totalAttempts);
  const highestScore = Math.max(...attempts.map(a => a.score));
  const lowestScore = Math.min(...attempts.map(a => a.score));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/quiz-history">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quizzes
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{mockQuiz.title}</h1>
            <p className="text-gray-600">Quiz attempts and analytics</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="secondary" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Quiz Info Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{mockQuiz.title}</h2>
              <p className="text-gray-600">{mockQuiz.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center">
                  <Hash className="w-4 h-4 mr-1" />
                  {mockQuiz.totalQuestions} questions
                </span>
                <span className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {mockQuiz.difficulty}
                </span>
                <span>{mockQuiz.category}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <Card className="p-4 text-center">
          <Users className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{totalAttempts}</div>
          <div className="text-sm text-gray-600">Total Attempts</div>
        </Card>
        <Card className="p-4 text-center">
          <Target className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{averageScore}%</div>
          <div className="text-sm text-gray-600">Average Score</div>
        </Card>
        <Card className="p-4 text-center">
          <Percent className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{passRate}%</div>
          <div className="text-sm text-gray-600">Pass Rate</div>
        </Card>
        <Card className="p-4 text-center">
          <Timer className="w-6 h-6 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{formatTime(averageTime)}</div>
          <div className="text-sm text-gray-600">Avg Time</div>
        </Card>
        <Card className="p-4 text-center">
          <TrendingUp className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{highestScore}%</div>
          <div className="text-sm text-gray-600">Highest Score</div>
        </Card>
        <Card className="p-4 text-center">
          <AlertCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{lowestScore}%</div>
          <div className="text-sm text-gray-600">Lowest Score</div>
        </Card>
      </div>

      {/* Score Distribution Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Distribution</h3>
        <div className="space-y-3">
          {[
            { range: '90-100%', count: attempts.filter(a => a.score >= 90).length, color: 'bg-emerald-500' },
            { range: '80-89%', count: attempts.filter(a => a.score >= 80 && a.score < 90).length, color: 'bg-blue-500' },
            { range: '70-79%', count: attempts.filter(a => a.score >= 70 && a.score < 80).length, color: 'bg-yellow-500' },
            { range: '60-69%', count: attempts.filter(a => a.score >= 60 && a.score < 70).length, color: 'bg-orange-500' },
            { range: '0-59%', count: attempts.filter(a => a.score < 60).length, color: 'bg-red-500' }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-20 text-sm text-gray-600">{item.range}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                <div 
                  className={`${item.color} h-4 rounded-full transition-all duration-500`}
                  style={{ width: `${(item.count / totalAttempts) * 100}%` }}
                />
              </div>
              <div className="w-12 text-sm text-gray-600 text-right">{item.count}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Filters and Controls */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'score' | 'time')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="recent">Most Recent</option>
              <option value="score">Highest Score</option>
              <option value="time">Fastest Time</option>
            </select>
            
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as 'all' | 'passed' | 'failed')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Attempts</option>
              <option value="passed">Passed (≥70%)</option>
              <option value="failed">Failed (&lt;70%)</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredAttempts.length} of {totalAttempts} attempts
          </div>
        </div>
      </Card>

      {/* Attempts List */}
      <div className="space-y-4">
        {filteredAttempts.map((attempt, index) => (
          <motion.div
            key={attempt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {attempt.userAvatar ? (
                    <img
                      src={attempt.userAvatar}
                      alt={attempt.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{attempt.userName}</h3>
                    <p className="text-sm text-gray-600">{formatDate(attempt.completedAt)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(attempt.score)}`}>
                      {getScoreIcon(attempt.score)}
                      <span className="ml-1">{attempt.score}%</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {attempt.correctAnswers}/{attempt.totalQuestions} correct
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatTime(attempt.timeSpent)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Time spent</div>
                  </div>

                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredAttempts.length === 0 && (
        <Card className="p-12 text-center">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No attempts found</h3>
          <p className="text-gray-600">
            {filterBy !== 'all' 
              ? 'Try adjusting your filter criteria'
              : 'No one has attempted this quiz yet'
            }
          </p>
        </Card>
      )}
    </div>
  );
}