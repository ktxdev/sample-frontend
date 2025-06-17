import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Loader, 
  Check, 
  X, 
  ChevronRight,
  RefreshCw,
  Download
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
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
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'processing' | 'complete'>('idle');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

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
    setQuiz(mockQuiz);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      
      if (currentQuestion < quiz!.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizComplete(true);
        calculateResults(newAnswers);
      }
    }
  };

  const calculateResults = (finalAnswers: number[]) => {
    const correct = finalAnswers.reduce((count, answer, index) => {
      return count + (answer === quiz!.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    setTimeout(() => setShowResult(true), 500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setQuizComplete(false);
  };

  const score = answers.reduce((count, answer, index) => {
    return count + (answer === quiz?.questions[index].correctAnswer ? 1 : 0);
  }, 0);

  const percentage = quiz ? Math.round((score / quiz.questions.length) * 100) : 0;

  if (uploadState === 'idle') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Quiz from PDF</h1>
          <p className="text-gray-600">Upload a PDF document and our AI will create a comprehensive quiz for you</p>
        </div>

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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Document</h3>
                <p className="text-gray-600">Our AI is analyzing your PDF and generating quiz questions...</p>
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

  if (quizComplete && showResult) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <div className="mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              percentage >= 70 ? 'bg-emerald-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              {percentage >= 70 ? (
                <Check className="w-8 h-8 text-emerald-600" />
              ) : (
                <X className="w-8 h-8 text-red-600" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600 mb-6">Here are your results:</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">{percentage}%</div>
            <div className="text-gray-600 mb-4">
              {score} out of {quiz.questions.length} questions correct
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${
                  percentage >= 70 ? 'bg-emerald-600' : percentage >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-gray-900">Review Answers:</h3>
            {quiz.questions.map((question, index) => (
              <div key={index} className="text-left bg-white rounded-lg p-4 border">
                <div className="flex items-start space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    answers[index] === question.correctAnswer ? 'bg-emerald-100' : 'bg-red-100'
                  }`}>
                    {answers[index] === question.correctAnswer ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">{question.question}</p>
                    <p className="text-sm text-gray-600">
                      Your answer: {question.options[answers[index]]}
                    </p>
                    {answers[index] !== question.correctAnswer && (
                      <p className="text-sm text-emerald-600">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={resetQuiz}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
            <Button variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
          <span className="text-sm text-gray-600">
            {currentQuestion + 1} of {quiz.questions.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <Card className="p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQ.question}
          </h2>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="font-medium text-gray-900">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button variant="ghost" disabled={currentQuestion === 0}>
            Previous
          </Button>
          
          <Button 
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="group"
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Card>
    </div>
  );
}