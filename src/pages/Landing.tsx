import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  MessageCircle, 
  CreditCard, 
  GitBranch, 
  Zap, 
  Users, 
  Trophy,
  ArrowRight,
  CheckCircle,
  Sun,
  Moon,
  Monitor,
  Play,
  Star,
  Sparkles,
  Brain,
  Target,
  Clock,
  TrendingUp,
  Shield,
  Smartphone,
  Globe,
  BookOpen,
  Award,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useTheme } from '../hooks/useTheme';

const features = [
  {
    icon: FileText,
    title: 'Smart Quiz Generation',
    description: 'Transform any PDF into interactive quizzes in seconds with our advanced AI technology.',
    color: 'from-blue-500 to-blue-600',
    delay: 0.1
  },
  {
    icon: MessageCircle,
    title: 'AI Study Assistant',
    description: 'Chat with your documents and get instant answers to any question about your content.',
    color: 'from-emerald-500 to-emerald-600',
    delay: 0.2
  },
  {
    icon: CreditCard,
    title: 'Smart Flashcards',
    description: 'Master any subject with AI-generated flashcards and spaced repetition learning.',
    color: 'from-purple-500 to-purple-600',
    delay: 0.3
  },
  {
    icon: GitBranch,
    title: 'Visual Mind Maps',
    description: 'Create stunning visual mind maps to organize and connect your ideas effortlessly.',
    color: 'from-orange-500 to-orange-600',
    delay: 0.4
  },
  {
    icon: Brain,
    title: 'AI Note Generation',
    description: 'Convert videos, PDFs, and documents into comprehensive study notes automatically.',
    color: 'from-pink-500 to-pink-600',
    delay: 0.5
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    description: 'Track your learning progress with detailed analytics and performance insights.',
    color: 'from-indigo-500 to-indigo-600',
    delay: 0.6
  }
];

const stats = [
  { label: 'Quizzes Generated', value: '50,000+', icon: FileText },
  { label: 'Happy Students', value: '15,000+', icon: Users },
  { label: 'Documents Processed', value: '100,000+', icon: BookOpen },
  { label: 'Success Rate', value: '98%', icon: Trophy }
];

const benefits = [
  {
    title: 'Save 10+ Hours Weekly',
    description: 'Automate quiz creation and note-taking to focus on actual learning',
    icon: Clock
  },
  {
    title: 'Boost Retention by 3x',
    description: 'Proven spaced repetition and active recall techniques',
    icon: Brain
  },
  {
    title: 'Improve Grades by 25%',
    description: 'Students report significant grade improvements within weeks',
    icon: TrendingUp
  },
  {
    title: 'Study Anywhere',
    description: 'Access your materials on any device, online or offline',
    icon: Smartphone
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Medical Student',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    content: 'QuizCraft transformed my study routine. I went from struggling with textbooks to acing my exams. The AI-generated quizzes are incredibly accurate!',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    role: 'Engineering Student',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    content: 'The mind mapping feature is a game-changer. I can visualize complex engineering concepts and remember them so much better.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Law Student',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    content: 'Being able to chat with my case law documents saves me hours of research. It\'s like having a personal study assistant 24/7.',
    rating: 5
  }
];

export function Landing() {
  const { theme, setTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      case 'system':
        return <Monitor className="w-4 h-4" />;
      default:
        return <Sun className="w-4 h-4" />;
    }
  };

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                QuizCraft
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={cycleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title={`Current theme: ${theme}. Click to cycle through themes.`}
              >
                {getThemeIcon()}
              </button>
              
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative">
            {/* Floating elements for visual appeal */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
            />
            <motion.div
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full opacity-20 blur-xl"
            />
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight"
            >
              Study Smarter with
              <br />
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Learning
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Transform any document into interactive quizzes, flashcards, and study materials. 
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> Join 15,000+ students</span> already studying smarter.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-6 mb-12"
            >
              <Link to="/register">
                <Button size="lg" className="group text-lg px-8 py-4 shadow-2xl hover:shadow-3xl">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4 group">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
                <span className="ml-2 text-xs bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full">2 min</span>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-600 dark:text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>Used in 50+ Countries</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-purple-500" />
                <span>EdTech Award Winner</span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Lightbulb className="w-4 h-4" />
                <span>Powered by Advanced AI</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Everything You Need to
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Master Any Subject
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our AI-powered platform transforms how you study, making learning more efficient and enjoyable than ever before.
              </p>
            </motion.div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="p-8 h-full text-center group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Why Students Love
                  <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    QuizCraft
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                  Join thousands of students who have transformed their study habits and achieved better results with our AI-powered platform.
                </p>
              </motion.div>
              
              <div className="space-y-6 mb-10">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start space-x-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/register">
                  <Button size="lg" className="text-lg px-8 py-4 shadow-xl hover:shadow-2xl">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative bg-gradient-to-r from-indigo-600/10 to-purple-600/10 dark:from-indigo-600/20 dark:to-purple-600/20 rounded-3xl p-8">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Student learning with QuizCraft"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Floating success metrics */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">98% Success Rate</span>
                  </div>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">+25% Grade Improvement</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Loved by Students
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Worldwide
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See how QuizCraft is helping students achieve their academic goals and transform their study experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="p-8 h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Trusted by students at top universities worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              <div className="text-2xl font-bold text-gray-400">Harvard</div>
              <div className="text-2xl font-bold text-gray-400">MIT</div>
              <div className="text-2xl font-bold text-gray-400">Stanford</div>
              <div className="text-2xl font-bold text-gray-400">Oxford</div>
              <div className="text-2xl font-bold text-gray-400">Cambridge</div>
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Ace Your
              <span className="block">Next Exam?</span>
            </h2>
            <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join 15,000+ students who are already studying smarter and achieving better grades with QuizCraft.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="bg-white text-indigo-600 hover:bg-gray-50 text-lg px-10 py-4 shadow-2xl hover:shadow-3xl group">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/10 text-lg px-10 py-4">
                  View Pricing
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-indigo-200 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">Q</span>
                </div>
                <span className="text-2xl font-bold">QuizCraft</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Transform your study experience with AI-powered learning tools. Join thousands of students achieving better results.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 QuizCraft. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}