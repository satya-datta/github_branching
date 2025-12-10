import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import PrimaryButton from './PrimaryButton';
import MutedButton from './MutedButton';

const AuthPage = ({ mode = 'register' }) => {
  const navigate = useNavigate();
  const { register, login, loginWithGoogle, error, loading, clearError } = useAuth();
  
  const [isRegister, setIsRegister] = useState(mode === 'register');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    clearError();
    setFormErrors({});
  }, [isRegister, clearError]);

  const validateForm = () => {
    const errors = {};

    if (isRegister && !formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (isRegister && formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (isRegister && !agreedToTerms) {
      errors.terms = 'You must agree to the Terms & Privacy Policy';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (isRegister) {
        await register(formData.email, formData.password, formData.name);
      } else {
        await login(formData.email, formData.password);
      }
      // Navigation is handled in useAuth hook after successful auth
    } catch (error) {
      // Error is handled by the useAuth hook
      console.error('Auth error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      // Navigation is handled in useAuth hook after successful auth
    } catch (error) {
      // Error is handled by the useAuth hook
      console.error('Google sign-in error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setFormData({ name: '', email: '', password: '' });
    setAgreedToTerms(false);
    setFormErrors({});
    clearError();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">FluentPulse</span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isRegister 
              ? 'Start your English practice journey today' 
              : 'Continue your learning streak'
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Global Error */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <div className="text-red-800 dark:text-red-300 text-sm">
                  <p>{error}</p>
                  {error.includes('email already exists') && (
                    <p className="mt-2 text-xs">
                      <button
                        onClick={toggleMode}
                        className="text-red-600 dark:text-red-400 underline hover:no-underline"
                      >
                        Switch to Sign In
                      </button>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Name Field (Register only) */}
            {isRegister && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`
                      block w-full pl-10 pr-3 py-3 border rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                      transition-colors
                      ${formErrors.name 
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      }
                      text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                    `}
                    placeholder="Enter your full name"
                  />
                </div>
                {formErrors.name && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`
                    block w-full pl-10 pr-3 py-3 border rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    transition-colors
                    ${formErrors.email 
                      ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                    }
                    text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                  `}
                  placeholder="Enter your email"
                />
              </div>
              {formErrors.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`
                    block w-full pl-10 pr-10 py-3 border rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    transition-colors
                    ${formErrors.password 
                      ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                    }
                    text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                  `}
                  placeholder={isRegister ? 'Create a password (6+ characters)' : 'Enter your password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formErrors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formErrors.password}</p>
              )}
            </div>

            {/* Terms Checkbox (Register only) */}
            {isRegister && (
              <div>
                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                    I agree to the{' '}
                    <Link to="/terms" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {formErrors.terms && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formErrors.terms}</p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <PrimaryButton
              type="submit"
              disabled={loading}
              className="w-full justify-center"
              size="large"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isRegister ? 'Creating Account...' : 'Signing In...'}
                </div>
              ) : (
                isRegister ? 'Create Account' : 'Sign In'
              )}
            </PrimaryButton>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign-In */}
            <MutedButton
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full justify-center border border-gray-300 dark:border-gray-600"
              size="large"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                  Redirecting...
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </MutedButton>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={toggleMode}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
              >
                {isRegister ? 'Sign in' : 'Create one'}
              </button>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            ← Back to FluentPulse
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;