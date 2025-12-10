import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { 
  CheckCircle, 
  Zap, 
  BookOpen, 
  Briefcase, 
  Plane, 
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  Clock,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import PrimaryButton from '../components/PrimaryButton';
import MutedButton from '../components/MutedButton';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Onboarding data
  const [onboardingData, setOnboardingData] = useState({
    learningGoal: '',
    dailyGoalMinutes: 10,
    skillCheckResponses: []
  });

  // Redirect if no user
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const learningGoals = [
    {
      id: 'fluency',
      title: 'General Fluency',
      description: 'Improve everyday conversation skills',
      icon: <MessageCircle className="h-8 w-8" />,
      color: 'bg-blue-500'
    },
    {
      id: 'interview',
      title: 'Job Interviews',
      description: 'Master professional communication',
      icon: <Briefcase className="h-8 w-8" />,
      color: 'bg-green-500'
    },
    {
      id: 'travel',
      title: 'Travel & Tourism',
      description: 'Navigate conversations abroad',
      icon: <Plane className="h-8 w-8" />,
      color: 'bg-purple-500'
    },
    {
      id: 'academic',
      title: 'Academic English',
      description: 'Excel in educational settings',
      icon: <GraduationCap className="h-8 w-8" />,
      color: 'bg-orange-500'
    }
  ];

  const timeOptions = [
    { value: 5, label: '5 minutes', description: 'Quick daily practice' },
    { value: 10, label: '10 minutes', description: 'Balanced approach' },
    { value: 15, label: '15 minutes', description: 'Deep practice sessions' }
  ];

  const skillCheckPrompts = [
    {
      id: 1,
      question: "Describe your favorite hobby in 2-3 sentences.",
      placeholder: "I enjoy... because it helps me..."
    },
    {
      id: 2,
      question: "What's one goal you want to achieve this year?",
      placeholder: "This year, I want to..."
    }
  ];

  const handleGoalSelect = (goalId) => {
    setOnboardingData(prev => ({
      ...prev,
      learningGoal: goalId
    }));
  };

  const handleTimeSelect = (minutes) => {
    setOnboardingData(prev => ({
      ...prev,
      dailyGoalMinutes: minutes
    }));
  };

  const handleSkillCheckChange = (promptId, value) => {
    setOnboardingData(prev => ({
      ...prev,
      skillCheckResponses: prev.skillCheckResponses.map(response => 
        response.promptId === promptId 
          ? { ...response, answer: value }
          : response
      ).concat(
        prev.skillCheckResponses.find(r => r.promptId === promptId) 
          ? [] 
          : [{ promptId, answer: value }]
      )
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return onboardingData.learningGoal !== '';
      case 2:
        return onboardingData.dailyGoalMinutes > 0;
      case 3:
        return true; // Step 3 is optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Update user document with onboarding data
      await updateDoc(doc(db, 'users', user.uid), {
        onboardingCompleted: true,
        preferences: {
          learningGoal: onboardingData.learningGoal,
          dailyGoalMinutes: onboardingData.dailyGoalMinutes,
          reminderEnabled: true,
          darkMode: false
        },
        onboardingData: {
          skillCheckResponses: onboardingData.skillCheckResponses,
          completedAt: new Date().toISOString()
        }
      });

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkipSkillCheck = () => {
    handleFinish();
  };

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">FluentPulse</span>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-colors ${
                  step <= currentStep
                    ? 'bg-indigo-600 dark:bg-indigo-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Step {currentStep} of 3
          </p>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
          {/* Step 1: Learning Goal */}
          {currentStep === 1 && (
            <div className="text-center">
              <div className="mb-8">
                <Sparkles className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  What brings you here?
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose your primary learning goal to personalize your experience
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {learningGoals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => handleGoalSelect(goal.id)}
                    className={`
                      p-6 rounded-2xl border-2 transition-all duration-200 text-left
                      hover:shadow-lg hover:-translate-y-1
                      ${onboardingData.learningGoal === goal.id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500'
                      }
                    `}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`${goal.color} p-3 rounded-xl text-white`}>
                        {goal.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {goal.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {goal.description}
                        </p>
                      </div>
                      {onboardingData.learningGoal === goal.id && (
                        <CheckCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Time Commitment */}
          {currentStep === 2 && (
            <div className="text-center">
              <div className="mb-8">
                <Clock className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  How much time can you commit daily?
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a realistic daily goal to build a sustainable habit
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {timeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleTimeSelect(option.value)}
                    className={`
                      w-full p-6 rounded-2xl border-2 transition-all duration-200 text-left
                      hover:shadow-lg hover:-translate-y-1
                      ${onboardingData.dailyGoalMinutes === option.value
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                          {option.label}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                      {onboardingData.dailyGoalMinutes === option.value && (
                        <CheckCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Skill Check */}
          {currentStep === 3 && (
            <div className="text-center">
              <div className="mb-8">
                <BookOpen className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Quick skill check
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Help us understand your current level with these optional prompts
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Don't worry about perfect grammar - just express yourself naturally!
                </p>
              </div>

              <div className="space-y-6 mb-8 text-left">
                {skillCheckPrompts.map((prompt) => (
                  <div key={prompt.id}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {prompt.question}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={prompt.placeholder}
                      value={
                        onboardingData.skillCheckResponses.find(r => r.promptId === prompt.id)?.answer || ''
                      }
                      onChange={(e) => handleSkillCheckChange(prompt.id, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                    />
                  </div>
                ))}
              </div>

              <div className="text-center">
                <MutedButton onClick={handleSkipSkillCheck} className="mb-4">
                  Skip this step
                </MutedButton>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              {currentStep > 1 && (
                <MutedButton onClick={handlePrevious} className="inline-flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </MutedButton>
              )}
            </div>

            <div>
              {currentStep < 3 ? (
                <PrimaryButton
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="inline-flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  onClick={handleFinish}
                  disabled={loading}
                  className="inline-flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      <span>Finishing...</span>
                    </>
                  ) : (
                    <>
                      <span>Start Learning</span>
                      <Sparkles className="h-4 w-4" />
                    </>
                  )}
                </PrimaryButton>
              )}
            </div>
          </div>
        </div>

        {/* Welcome message */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome to FluentPulse, {user?.displayName || 'there'}! 👋
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;