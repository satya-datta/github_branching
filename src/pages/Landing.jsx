import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Zap, 
  TrendingUp, 
  Mic, 
  Calendar, 
  Target,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Users,
  Clock,
  Award,
  BookOpen,
  Briefcase,
  Plane,
  GraduationCap,
  BarChart3,
  RefreshCw,
  Shield
} from 'lucide-react';

import Navbar from '../components/Navbar';
import PrimaryButton from '../components/PrimaryButton';
import MutedButton from '../components/MutedButton';
import SectionHeading from '../components/SectionHeading';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import FAQItem from '../components/FAQItem';
import Footer from '../components/Footer';

const Landing = () => {
  const [activeTab, setActiveTab] = useState('fluency');

  // Prefetch register route
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = '/register';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const useCases = {
    fluency: {
      title: 'General Fluency',
      scenario: 'Discussing weekend plans with a friend',
      outcomes: ['Natural conversation flow', 'Reduced hesitation', 'Confident expression']
    },
    interview: {
      title: 'Job Interviews',
      scenario: 'Answering "Tell me about yourself"',
      outcomes: ['Professional vocabulary', 'Clear articulation', 'Structured responses']
    },
    travel: {
      title: 'Travel & Tourism',
      scenario: 'Ordering food at a restaurant',
      outcomes: ['Practical phrases', 'Cultural context', 'Real-world confidence']
    },
    academic: {
      title: 'Academic English',
      scenario: 'Presenting research findings',
      outcomes: ['Academic vocabulary', 'Formal structures', 'Presentation skills']
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "FluentPulse",
          "applicationCategory": "Education",
          "operatingSystem": "Web",
          "description": "Practice English with real AI conversations, instant feedback, and streaks.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free"
          }
        })}
      </script>

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 lg:pt-24 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-sm font-medium">
                    <Users className="h-4 w-4 mr-1" />
                    100+ early learners
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium">
                    <Award className="h-4 w-4 mr-1" />
                    Research-inspired design
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Your 10-Minute Daily Practice Partner
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  Real conversations. Instant feedback. Visible progress.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                  <PrimaryButton to="/register" size="large" className="inline-flex items-center space-x-2">
                    <span>Start Free Practice Now</span>
                    <ArrowRight className="h-5 w-5" />
                  </PrimaryButton>
                  <PrimaryButton to="/practice-demo" size="large" className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700">
                    <Play className="h-5 w-5" />
                    <span>Demo Practice Session</span>
                  </PrimaryButton>
                  <MutedButton href="#how-it-works" size="large" className="inline-flex items-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>See how it works</span>
                  </MutedButton>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No credit card required. Cancel anytime.
                </p>
              </div>
              
              {/* Hero Visual */}
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 max-w-md mx-auto">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl p-3">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Hi! Let's practice talking about your weekend plans. What did you do?
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 justify-end">
                      <div className="flex-1">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-3 ml-8">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            I went to the park with my friends and we had a picnic.
                          </p>
                        </div>
                        <div className="flex gap-2 mt-2 ml-8">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs">
                            ✓ Grammar
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs">
                            Better: "had a lovely picnic"
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 blur-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Strip */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Trusted by learners preparing for interviews, travel, and studies
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">CAMPUS</div>
              <div className="text-2xl font-bold text-gray-400">BOOTCAMP</div>
              <div className="text-2xl font-bold text-gray-400">CAREER+</div>
              <div className="text-2xl font-bold text-gray-400">STUDYCO</div>
            </div>
          </div>
        </section>

        {/* Value Prop Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Why FluentPulse Works"
              subtitle="Five key advantages that make daily practice actually stick"
              className="mb-16"
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<MessageCircle />}
                title="Real conversations, not exercises"
                description="Practice with natural dialogue that adapts to your interests and goals, not rigid fill-in-the-blank worksheets."
                learnMoreHref="#features"
                variant="gradient"
              />
              
              <FeatureCard
                icon={<Zap />}
                title="Learn faster with instant feedback"
                description="Get immediate grammar corrections and better phrase suggestions right in the conversation flow."
                learnMoreHref="#features"
              />
              
              <FeatureCard
                icon={<TrendingUp />}
                title="Track your streak, watch your progress"
                description="Visual progress tracking and streak counters that make daily practice rewarding and motivating."
                learnMoreHref="#features"
                variant="highlight"
              />
              
              <FeatureCard
                icon={<Mic />}
                title="Voice and text — practice your way"
                description="Speak naturally or type your responses. Switch between modes based on your environment and comfort."
                learnMoreHref="#features"
              />
              
              <FeatureCard
                icon={<Calendar />}
                title="Daily reminders that keep you consistent"
                description="Smart notifications that respect your schedule and help you maintain your learning momentum."
                learnMoreHref="#features"
                variant="gradient"
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="How It Works"
              subtitle="Three simple steps to better English, every day"
              className="mb-16"
            />
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  1. Pick a goal
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose from Fluency, Interview prep, Travel, or Academic English to personalize your practice.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  2. Talk to your AI companion
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Have natural conversations for 5–15 minutes about topics that interest you.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  3. Get instant feedback
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Receive grammar fixes and better phrase suggestions to improve your expression.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <PrimaryButton to="/register" size="large">
                Start Free Practice Now
              </PrimaryButton>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                See FluentPulse in Action
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                This is a preview. The app adapts to your level.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl p-4">
                      <p className="text-gray-700 dark:text-gray-300">
                        Great! Let's practice job interview questions. Can you tell me about a challenging project you worked on?
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 justify-end">
                  <div className="flex-1">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 ml-12">
                      <p className="text-gray-700 dark:text-gray-300">
                        I worked on a website project that was very difficult because the deadline was tight and I had to learn new technologies.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3 ml-12">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm">
                        ✓ Grammar Fix: "challenging" instead of "difficult"
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm">
                        Better Phrase: "under a tight deadline"
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl p-4">
                      <p className="text-gray-700 dark:text-gray-300">
                        Excellent! Can you tell me more about what specific technologies you learned?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Practice for Your Goals"
              subtitle="Tailored conversations for every learning objective"
              className="mb-16"
            />
            
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {Object.entries(useCases).map(([key, useCase]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === key
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                  }`}
                >
                  {useCase.title}
                </button>
              ))}
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {useCases[activeTab].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    <strong>Scenario:</strong> {useCases[activeTab].scenario}
                  </p>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What you'll master:</h4>
                    <ul className="space-y-2">
                      {useCases[activeTab].outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
                  <div className="flex items-center mb-4">
                    {activeTab === 'fluency' && <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />}
                    {activeTab === 'interview' && <Briefcase className="h-6 w-6 text-indigo-600 mr-2" />}
                    {activeTab === 'travel' && <Plane className="h-6 w-6 text-indigo-600 mr-2" />}
                    {activeTab === 'academic' && <GraduationCap className="h-6 w-6 text-indigo-600 mr-2" />}
                    <span className="font-medium text-gray-900 dark:text-white">Practice Preview</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    "{useCases[activeTab].scenario}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Streaks & Habits */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Build a daily rhythm that compounds — keep your streak alive
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                  Small daily sessions create lasting improvement. Our streak system and gentle reminders help you stay consistent without pressure.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Reminders are optional. You control notifications.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
                    <span className="text-3xl">🔥</span>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">7</div>
                  <div className="text-gray-600 dark:text-gray-400">Day Streak</div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>Daily Goal</span>
                      <span>10 min</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                          i < 5 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : i === 5 
                            ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                        }`}
                      >
                        {i < 5 ? '✓' : i === 5 ? '•' : ''}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Features */}
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Everything You Need to Improve"
              subtitle="Comprehensive features designed for real progress"
              className="mb-16"
            />
            
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Instant Feedback, Not Afterthoughts
                </h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 dark:text-white">Grammar corrections</strong>
                      <p className="text-gray-600 dark:text-gray-400">Real-time fixes for tense, agreement, and structure</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 dark:text-white">Better phrase suggestions</strong>
                      <p className="text-gray-600 dark:text-gray-400">More natural, native-like expressions</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 dark:text-white">Pronunciation guidance</strong>
                      <p className="text-gray-600 dark:text-gray-400">Tips for clearer, more confident speech</p>
                    </div>
                  </li>
                </ul>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Voice or Text Input
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Practice speaking naturally or type your responses. Switch modes anytime based on your environment and comfort level.
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Session Recap</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="text-sm">Used "challenging" correctly</span>
                    </div>
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="text-sm">Great use of past tense</span>
                    </div>
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="text-sm">Natural conversation flow</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                      <div className="flex items-center text-blue-600 dark:text-blue-400">
                        <RefreshCw className="h-5 w-5 mr-2" />
                        <span className="text-sm">Try: "under pressure" instead of "with pressure"</span>
                      </div>
                      <div className="flex items-center text-blue-600 dark:text-blue-400">
                        <RefreshCw className="h-5 w-5 mr-2" />
                        <span className="text-sm">Consider: "I had to quickly adapt"</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Progress Tracking</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">7</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">142</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">23</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Phrases</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Why Choose FluentPulse?"
              subtitle="See how we compare to other learning methods"
              className="mb-16"
            />
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">FluentPulse</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">Worksheets</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">Tutor Marketplace</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Time to first value</td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 dark:text-green-400">Immediate</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">Hours</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">Days</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Cost per session</td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 dark:text-green-400">Free</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">$5-15</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">$20-50</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Feedback speed</td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 dark:text-green-400">Instant</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">Never</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">After session</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Consistency</td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 dark:text-green-400">Daily habits</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">Sporadic</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">Weekly</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Convenience</td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 dark:text-green-400">24/7 available</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">Self-paced</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">Scheduled</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Simple, Transparent Pricing"
              subtitle="Start free, upgrade when you're ready"
              className="mb-16"
            />
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-indigo-200 dark:border-indigo-700">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Start Free</h3>
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">$0</div>
                  <p className="text-gray-600 dark:text-gray-400">Perfect for getting started</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Daily 10-minute conversations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Instant feedback & corrections</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Basic progress tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Voice & text input</span>
                  </li>
                </ul>
                
                <PrimaryButton to="/register" className="w-full justify-center">
                  Start Free Practice Now
                </PrimaryButton>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl opacity-75">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pro</h3>
                  <div className="text-4xl font-bold text-gray-400 mb-2">Coming Soon</div>
                  <p className="text-gray-600 dark:text-gray-400">Advanced features for serious learners</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <div className="h-5 w-5 bg-gray-300 rounded-full mr-3"></div>
                    <span className="text-gray-500">Advanced habit analytics</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 bg-gray-300 rounded-full mr-3"></div>
                    <span className="text-gray-500">Custom AI voice personalities</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 bg-gray-300 rounded-full mr-3"></div>
                    <span className="text-gray-500">Unlimited session length</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 bg-gray-300 rounded-full mr-3"></div>
                    <span className="text-gray-500">Priority support</span>
                  </li>
                </ul>
                
                <button className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-xl font-semibold cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="What Learners Say"
              subtitle="Real feedback from our early users"
              className="mb-16"
            />
            
            <div className="grid md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="FluentPulse helped me feel confident in job interviews. The instant feedback made all the difference."
                author="Sarah Chen"
                role="Software Engineer"
                avatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
              />
              
              <TestimonialCard
                quote="I love how it adapts to my schedule. Just 10 minutes a day and I'm already seeing improvement."
                author="Miguel Rodriguez"
                role="Graduate Student"
                avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
              />
              
              <TestimonialCard
                quote="Perfect for travel prep! The conversations feel natural and the feedback is spot-on."
                author="Emma Thompson"
                role="Travel Blogger"
                avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about FluentPulse"
              className="mb-16"
            />
            
            <div className="space-y-4">
              <FAQItem
                question="How is this different from other language learning apps?"
                answer="Unlike apps with repetitive exercises, FluentPulse focuses on real conversations with instant feedback. You practice speaking naturally about topics that interest you, not filling in blanks or matching words."
              />
              
              <FAQItem
                question="Can I practice by speaking out loud?"
                answer="Absolutely! FluentPulse supports both voice and text input. You can speak naturally and get pronunciation feedback, or type your responses if you're in a quiet environment. Switch between modes anytime."
              />
              
              <FAQItem
                question="What happens after each practice session?"
                answer="You'll get a personalized recap showing 3 things you did well and 2 areas for improvement. All corrections and suggestions are saved to your Review Bank for later practice."
              />
              
              <FAQItem
                question="Is my conversation data private and secure?"
                answer="Yes, your privacy is our priority. All conversations are encrypted and used only to provide you with personalized feedback. We never share your data with third parties, and you can delete your data anytime."
              />
              
              <FAQItem
                question="Do I need a credit card to start?"
                answer="No credit card required! Start practicing immediately with our free plan. You'll get full access to daily conversations, instant feedback, and basic progress tracking."
              />
              
              <FAQItem
                question="Can I change my daily practice goal?"
                answer="Yes, you're in complete control. Set your daily goal anywhere from 5 to 30 minutes based on your schedule and learning pace. You can adjust it anytime in your settings."
              />
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Have more questions?
              </p>
              <MutedButton to="/help">
                Visit our Help Center
              </MutedButton>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to build your streak?
            </h2>
            <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
              Join thousands of learners who are improving their English 10 minutes at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryButton 
                to="/register" 
                size="large" 
                className="bg-white text-indigo-600 hover:bg-gray-50 inline-flex items-center space-x-2"
              >
                <span>Start Free Practice Now</span>
                <ArrowRight className="h-5 w-5" />
              </PrimaryButton>
              <MutedButton 
                href="#features" 
                size="large" 
                className="text-indigo-100 hover:text-white hover:bg-white/10"
              >
                Browse Features
              </MutedButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;