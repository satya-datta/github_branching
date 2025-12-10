import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase';

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Handle redirect result from Google Sign-In
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          await handleGoogleUserCreation(result);
        }
      } catch (error) {
        setError(getErrorMessage(error.code));
      }
    };

    handleRedirectResult();

    return unsubscribe;
  }, []);

  const handleGoogleUserCreation = async (result) => {
    // Check if user document exists, create if not
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    
    if (!userDoc.exists()) {
      // New Google user, create document
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || '',
        photoURL: result.user.photoURL || '',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        onboardingCompleted: false,
        preferences: {
          learningGoal: '',
          dailyGoalMinutes: 10,
          reminderEnabled: true,
          darkMode: false
        },
        progress: {
          currentStreak: 0,
          longestStreak: 0,
          totalMinutes: 0,
          totalSessions: 0,
          masteredPhrases: 0
        }
      });
      navigate('/onboarding');
    } else {
      // Existing user, update last login
      await setDoc(doc(db, 'users', result.user.uid), {
        lastLoginAt: new Date().toISOString()
      }, { merge: true });
      
      const userData = userDoc.data();
      if (userData?.onboardingCompleted) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    }
  };

  const register = async (email, password, name) => {
    try {
      setError(null);
      setLoading(true);
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with name
      if (name) {
        await updateProfile(result.user, {
          displayName: name
        });
      }
      
      // Store user details in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        displayName: name || '',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        onboardingCompleted: false,
        preferences: {
          learningGoal: '',
          dailyGoalMinutes: 10,
          reminderEnabled: true,
          darkMode: false
        },
        progress: {
          currentStreak: 0,
          longestStreak: 0,
          totalMinutes: 0,
          totalSessions: 0,
          masteredPhrases: 0
        }
      });
      
      // Navigate to onboarding after successful registration
      navigate('/onboarding');
      return result.user;
    } catch (error) {
      setError(getErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login time
      await setDoc(doc(db, 'users', result.user.uid), {
        lastLoginAt: new Date().toISOString()
      }, { merge: true });
      
      // Check if onboarding is completed
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      const userData = userDoc.data();
      
      if (userData?.onboardingCompleted) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
      
      return result.user;
    } catch (error) {
      setError(getErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    try {
      setError(null);
      setLoading(true);
      
      // Use redirect instead of popup to avoid popup blockers
      signInWithRedirect(auth, googleProvider);
    } catch (error) {
      setError(getErrorMessage(error.code));
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError(getErrorMessage(error.code));
      throw error;
    }
  };

  const clearError = () => setError(null);

  return {
    user,
    loading,
    error,
    register,
    login,
    loginWithGoogle,
    logout,
    clearError
  };
};

const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please sign in instead or use a different email.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled. Please try again.';
    case 'auth/popup-blocked':
      return 'Pop-up was blocked by your browser. Please allow pop-ups for this site or try again.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    default:
      return 'An error occurred. Please try again.';
  }
};