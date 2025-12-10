import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Zap, MessageCircle, TrendingUp, Calendar, Play, BarChart3 } from 'lucide-react';
import PracticeSession from '../components/PracticeSession';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [showPractice, setShowPractice] = useState(false);
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user progress
  useEffect(() => {
    const loadUserProgress = async () => {
      if (!user) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserProgress(userDoc.data().progress || {
            currentStreak: 0,
            totalSessions: 0,
            totalMinutes: 0
          });
        }
      } catch (error) {
        console.error('Error loading user progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProgress();
  }, [user]);

  const handlePracticeComplete = (sessionData) => {
    setShowPractice(false);
    // Refresh user progress
    setUserProgress(prev => ({
      currentStreak: (prev?.currentStreak || 0) + 1,
      totalSessions: (prev?.totalSessions || 0) + 1,
      totalMinutes: (prev?.totalMinutes || 0) + sessionData.duration
    }));
  };

  if (showPractice) {
    return (
      <div className="h-screen">
        <PracticeSession onComplete={handlePracticeComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">FluentPulse</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Welcome, {user?.displayName || user?.email}!
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to practice?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your personalized English learning dashboard
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl mr-4">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {loading ? '...' : userProgress?.currentStreak || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl mr-4">
                <MessageCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {loading ? '...' : userProgress?.totalSessions || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Sessions</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl mr-4">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {loading ? '...' : userProgress?.totalMinutes || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Practice */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Start Your First Session</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Begin your English practice journey with a personalized conversation tailored to your goals.
          </p>
          <button 
            onClick={() => setShowPractice(true)}
            className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors inline-flex items-center space-x-2"
          >
            <Play className="h-6 w-6" />
            <span>Start Practice Session</span>
          </button>
        </div>

        {/* Coming Soon Features */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            More features coming soon...
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg opacity-75">
              <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Progress Calendar</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Track your daily practice</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg opacity-75">
              <BarChart3 className="h-8 w-8 text-gray-400 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Detailed Analytics</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">See your improvement over time</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg opacity-75">
              <MessageCircle className="h-8 w-8 text-gray-400 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Conversation History</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Review past sessions</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;