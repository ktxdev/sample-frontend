import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  EyeOff,
  Star,
  Clock,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Flashcard } from '../types';

const mockFlashcards: Flashcard[] = [
  {
    id: '1',
    front: 'What is React?',
    back: 'React is a JavaScript library for building user interfaces, particularly single-page applications where you need fast, interactive UIs.',
    difficulty: 'easy',
    correctStreak: 3,
    lastReviewed: new Date(),
    nextReview: new Date(Date.now() + 86400000)
  },
  {
    id: '2',
    front: 'What is the difference between state and props?',
    back: 'Props are read-only data passed from parent to child components, while state is mutable data managed within a component.',
    difficulty: 'medium',
    correctStreak: 1,
    lastReviewed: new Date(),
    nextReview: new Date(Date.now() + 172800000)
  },
  {
    id: '3',
    front: 'What is the virtual DOM?',
    back: 'The virtual DOM is a JavaScript representation of the actual DOM. React uses it to optimize updates by comparing changes and updating only what\'s necessary.',
    difficulty: 'hard',
    correctStreak: 0,
    lastReviewed: new Date(),
    nextReview: new Date(Date.now() + 86400000)
  }
];

export function Flashcards() {
  const [flashcards] = useState<Flashcard[]>(mockFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<'create' | 'study'>('study');
  const [newCard, setNewCard] = useState({ front: '', back: '' });

  const currentCard = flashcards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    // Update card difficulty and schedule next review
    console.log(`Marked as ${difficulty}`);
    handleNext();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-emerald-600 bg-emerald-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const stats = {
    total: flashcards.length,
    reviewed: flashcards.filter(card => card.lastReviewed).length,
    mastered: flashcards.filter(card => card.correctStreak >= 3).length,
    streak: Math.max(...flashcards.map(card => card.correctStreak))
  };

  if (studyMode === 'create') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create Flashcards</h1>
          <Button variant="ghost" onClick={() => setStudyMode('study')}>
            Back to Study
          </Button>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Front (Question)
              </label>
              <textarea
                value={newCard.front}
                onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
                placeholder="Enter the question or term..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Back (Answer)
              </label>
              <textarea
                value={newCard.back}
                onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
                placeholder="Enter the answer or definition..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="secondary">Save & Create Another</Button>
              <Button>Save & Return</Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Flashcards</h1>
          <p className="text-gray-600">Study with spaced repetition for better retention</p>
        </div>
        <Button onClick={() => setStudyMode('create')}>
          <Plus className="w-4 h-4 mr-2" />
          Create New
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center">
          <BookOpen className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Cards</div>
        </Card>
        <Card className="p-4 text-center">
          <Eye className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.reviewed}</div>
          <div className="text-sm text-gray-600">Reviewed</div>
        </Card>
        <Card className="p-4 text-center">
          <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.mastered}</div>
          <div className="text-sm text-gray-600">Mastered</div>
        </Card>
        <Card className="p-4 text-center">
          <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.streak}</div>
          <div className="text-sm text-gray-600">Best Streak</div>
        </Card>
      </div>

      {/* Flashcard */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Card {currentIndex + 1} of {flashcards.length}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentCard.difficulty)}`}>
              {currentCard.difficulty}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleFlip}>
            {isFlipped ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {isFlipped ? 'Hide Answer' : 'Show Answer'}
          </Button>
        </div>

        <div className="relative h-80 mb-6" onClick={handleFlip}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isFlipped ? 'back' : 'front'}
              initial={{ rotateY: 90 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: -90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 cursor-pointer"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <Card className="h-full p-8 flex items-center justify-center text-center hover:shadow-xl transition-shadow">
                <div>
                  <div className="text-sm text-gray-500 mb-4">
                    {isFlipped ? 'Answer' : 'Question'}
                  </div>
                  <div className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed">
                    {isFlipped ? currentCard.back : currentCard.front}
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation and Difficulty */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handlePrevious}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button variant="ghost" onClick={handleNext}>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {isFlipped && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 mr-2">How was this?</span>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => handleDifficultySelect('hard')}
                className="text-red-600 hover:bg-red-50"
              >
                Hard
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => handleDifficultySelect('medium')}
                className="text-yellow-600 hover:bg-yellow-50"
              >
                Medium
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => handleDifficultySelect('easy')}
                className="text-emerald-600 hover:bg-emerald-50"
              >
                Easy
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(((currentIndex + 1) / flashcards.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}