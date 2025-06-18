import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  Loader, 
  Check, 
  X, 
  ChevronRight,
  RefreshCw,
  Download,
  Play,
  Save,
  Settings,
  Hash
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Quiz as QuizType, Question } from '../types';

const mockQuiz: QuizType = {
  id: '1',
  title: 'Introduction to React Components',
  description: 'Test your knowledge of React components and their lifecycle',
  difficulty: 'medium',
  category: 'Programming',
  createdAt: new Date(),
  completedCount: 0,
  averageScore: 0,
  questions: [
    {
      id: '1',
      question: 'What is a React component?',
      options: [
        'A JavaScript function or class that returns JSX',
        'A CSS stylesheet',
        'A database connection',
        'An HTML template'
      ],
      correctAnswer: 0,
      explanation: 'React components are JavaScript functions or classes that return JSX elements to describe what should appear on the screen.'
    },
    {
      id: '2',
      question: 'Which lifecycle method is called after a component is mounted?',
      options: [
        'componentWillMount',
        'componentDidMount',
        'componentWillUpdate',
        'componentDidUpdate'
      ],
      correctAnswer: 1,
      explanation: 'componentDidMount is called immediately after a component is mounted (inserted into the DOM tree).'
    },
    {
      id: '3',
      question: 'What is the purpose of useState hook?',
      options: [
        'To make HTTP requests',
        'To manage component state',
        'To handle routing',
        'To optimize performance'
      ],
      correctAnswer: 1,
      explanation: 'The useState hook allows you to add state to functional components in React.'
    }
  ]
};

export function Quiz() {
  const navigate = useNavigate();
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'processing' | 'complete'>('idle');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [quizSettings, setQuizSettings] = useState({
    name: '',
    numberOfQuestions: 10,
    difficulty: 'medium' as 'easy' | 'medium' | 'hard'
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFileUpload(acceptedFiles[0]);
      }
    }
  });

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setUploadState('uploading');
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploadState('processing');
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setUploadState('complete');
    
    // Generate quiz with user settings
    const generatedQuiz: QuizType = {
      ...mockQuiz,
      id: Date.now().toString(),
      title: quizSettings.name || `Quiz from ${file.name}`,
      difficulty: quizSettings.difficulty,
      questions: mockQuiz.questions.slice(0, quizSettings.numberOfQuestions),
      createdAt: new Date()
    };
    
    setQuiz(generatedQuiz);
  };

  const handleSaveQuiz = () => {
    // In a real app, this would save to the backend
    console.log('Saving quiz:', quiz);
    navigate('/quiz-history');
  };

  const handleTakeQuiz = () => {
    // Navigate to quiz taking interface
    navigate(`/quiz/${quiz?.id}/take`);
  };

  if (uploadState === 'idle') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Quiz from PDF</h1>
          <p className="text-gray-600">Upload a PDF document and our AI will create a comprehensive quiz for you</p>
        </div>

        {/* Quiz Settings */}
        <Card className="p-6 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <Settings className="w-6 h-6 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Quiz Settings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Quiz Name (Optional)"
              value={quizSettings.name}
              onChange={(e) => setQuizSettings(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter quiz name..."
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Questions
              </label>
              <select
                value={quizSettings.numberOfQuestions}
                onChange={(e) => setQuizSettings(prev => ({ ...prev, numberOfQuestions: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
                <option value={25}>25 Questions</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={quizSettings.difficulty}
                onChange={(e) => setQuizSettings(prev => ({ ...prev, difficulty: e.target.value as 'easy' | 'medium' | 'hard' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </Card>

        {/* File Upload */}
        <Card className="p-8">
          <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
          }`}>
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isDragActive ? 'Drop your PDF here' : 'Upload PDF Document'}
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your PDF file here, or click to browse
            </p>
            <Button>Choose File</Button>
          </div>
        </Card>
      </div>
    );
  }

  if (uploadState !== 'complete' || !quiz) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <div className="mb-6">
            {uploadState === 'uploading' && (
              <>
                <Upload className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Uploading File</h3>
                <p className="text-gray-600">Please wait while we upload your PDF...</p>
              </>
            )}
            {uploadState === 'processing' && (
              <>
                <div className="relative mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                    <Loader className="w-6 h-6 text-indigo-600 animate-spin" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating Quiz</h3>
                <p className="text-gray-600">Our AI is analyzing your PDF and creating {quizSettings.numberOfQuestions} {quizSettings.difficulty} questions...</p>
              </>
            )}
          </div>
          
          {uploadedFile && (
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
              <FileText className="w-4 h-4" />
              <span>{uploadedFile.name}</span>
              <span>({Math.round(uploadedFile.size / 1024)} KB)</span>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // Quiz Generated Successfully
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Generated Successfully!</h2>
          <p className="text-gray-600">Your quiz has been created and is ready to use</p>
        </div>

        {/* Quiz Preview */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{quiz.title}</h3>
              <p className="text-gray-600">{quiz.description}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Hash className="w-4 h-4" />
                  <span>{quiz.questions.length} questions</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  quiz.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' :
                  quiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {quiz.difficulty}
                </span>
              </div>
            </div>
          </div>

          {/* Sample Questions Preview */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Sample Questions:</h4>
            {quiz.questions.slice(0, 3).map((question, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-2">
                  {index + 1}. {question.question}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className={`text-sm p-2 rounded ${
                      optionIndex === question.correctAnswer 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-gray-50 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + optionIndex)}. {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {quiz.questions.length > 3 && (
              <p className="text-sm text-gray-600 text-center">
                +{quiz.questions.length - 3} more questions
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleSaveQuiz} variant="secondary" size="lg" className="group">
            <Save className="w-5 h-5 mr-2" />
            Save Quiz
          </Button>
          
          <Button onClick={handleTakeQuiz} size="lg" className="group">
            <Play className="w-5 h-5 mr-2" />
            Take Quiz Now
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Additional Options */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export as PDF</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Regenerate Quiz</span>
            </button>
            <button 
              onClick={() => navigate('/quiz-history')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>View All Quizzes</span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}