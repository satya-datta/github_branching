import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PracticeSession from '../components/PracticeSession';

const PracticeDemo = () => {
  const [showPractice, setShowPractice] = useState(true);

  // Mock user object for demo
  const mockUser = {
    uid: 'demo-user',
    email: 'demo@example.com',
    displayName: 'Demo User'
  };

  // Mock user preferences for demo
  const mockPreferences = {
    learningGoal: 'fluency',
    dailyGoalMinutes: 10
  };

  const handlePracticeComplete = (sessionData) => {
    console.log('Demo session completed:', sessionData);
    setShowPractice(false);
  };

  if (showPractice) {
    return (
      <div className="h-screen">
        {/* Demo header */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border-b border-yellow-200 dark:border-yellow-800 p-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-800 dark:text-yellow-300 text-sm font-medium">
                🚀 Demo Mode - Practice Session Preview
              </span>
            </div>
            <Link 
              to="/" 
              className="text-yellow-800 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-200 text-sm font-medium"
            >
              Exit Demo
            </Link>
          </div>
        </div>
        
        <PracticeSession 
          onComplete={handlePracticeComplete}
          demoMode={true}
          mockUser={mockUser}
          mockPreferences={mockPreferences}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Demo Session Completed!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This was a preview of the FluentPulse practice session.
        </p>
        <div className="space-y-4">
          <Link 
            to="/register"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors"
          >
            Sign Up to Start Learning
          </Link>
          <br />
          <Link 
            to="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PracticeDemo;