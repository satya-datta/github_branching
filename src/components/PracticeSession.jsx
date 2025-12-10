import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';
import { startPractice, parseFeedback } from '../config/groq';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  Zap,
  Clock,
  Target
} from 'lucide-react';

const PracticeSession = ({ onComplete, demoMode = false, mockUser = null, mockPreferences = null }) => {
  const { user: authUser } = useAuth();
  const user = demoMode ? mockUser : authUser;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [voiceMode, setVoiceMode] = useState(true);
  const [silenceTimer, setSilenceTimer] = useState(null);
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const [sessionStartTime] = useState(Date.now());
  const [userPreferences, setUserPreferences] = useState(demoMode ? mockPreferences : null);
  const [sessionStats, setSessionStats] = useState({
    messagesCount: 0,
    correctGrammar: 0,
    improvements: 0
  });
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);

  // Load user preferences
  useEffect(() => {
    if (demoMode) {
      setUserPreferences(mockPreferences);
      return;
    }
    
    const loadUserPreferences = async () => {
      if (!user) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserPreferences(userDoc.data().preferences);
        }
      } catch (error) {
        console.error('Error loading user preferences:', error);
      }
    };

    loadUserPreferences();
  }, [user]);

  // Initialize conversation
  useEffect(() => {
    if (userPreferences && messages.length === 0) {
      initializeConversation();
    }
  }, [userPreferences]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setInputText(finalTranscript.trim());
          // Clear any existing silence timer
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }
          // Start new silence timer for auto-submit
          silenceTimerRef.current = setTimeout(() => {
            if (finalTranscript.trim() && micEnabled) {
              handleAutoSubmit(finalTranscript.trim());
            }
          }, 1500); // 1.5 seconds of silence before auto-submit
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          // Restart recognition after brief pause
          setTimeout(() => {
            if (voiceMode && recognitionRef.current) {
              try {
                recognitionRef.current.start();
              } catch (e) {
                // Recognition already started
              }
            }
          }, 1000);
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current.onend = () => {
        // Recognition will restart automatically due to continuous: true
        setIsListening(false);
      };

      // Start continuous listening when component mounts
      if (voiceMode && micEnabled) {
        startContinuousListening();
      }
    }

    return () => {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startContinuousListening = () => {
    if (recognitionRef.current && voiceMode && micEnabled) {
      try {
        setIsListening(true);
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  const stopContinuousListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
  };

  const toggleMicrophone = () => {
    const newMicEnabled = !micEnabled;
    setMicEnabled(newMicEnabled);
    
    if (newMicEnabled && voiceMode) {
      startContinuousListening();
    } else {
      stopContinuousListening();
    }
  };

  const toggleVoiceMode = () => {
    const newVoiceMode = !voiceMode;
    setVoiceMode(newVoiceMode);
    
    if (newVoiceMode && micEnabled) {
      startContinuousListening();
    } else {
      stopContinuousListening();
    }
  };

  const initializeConversation = async () => {
    const goal = userPreferences?.learningGoal || 'fluency';
    const welcomeMessages = {
      fluency: "Hi! I'm excited to practice English with you today. Let's start with something simple - how has your day been so far?",
      interview: "Hello! I'm here to help you practice for job interviews. Let's begin with a common question: Can you tell me a bit about yourself and your background?",
      travel: "Hi there! Let's practice English for travel situations. Imagine you just arrived at a hotel - can you tell me about your reservation?",
      academic: "Hello! I'm here to help you practice academic English. Let's start by discussing a topic you're studying - what subject interests you most right now?"
    };

    const welcomeMessage = welcomeMessages[goal] || welcomeMessages.fluency;
    
    setMessages([{
      id: 1,
      type: 'ai',
      content: welcomeMessage,
      timestamp: Date.now(),
      feedback: null
    }]);
  };

  const handleAutoSubmit = async (messageText) => {
    if (!messageText || isLoading) return;
    
    setIsProcessingVoice(true);
    stopContinuousListening();
    
    await processMessage(messageText);
    
    setInputText('');
    setIsProcessingVoice(false);
    
    // Restart listening after processing
    if (voiceMode) {
      setTimeout(() => {
        startContinuousListening();
      }, 1000);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;
    
    await processMessage(inputText.trim());
    setInputText('');
  };

  const processMessage = async (messageText) => {
    if (!messageText || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare conversation history for AI
      const conversationHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const aiResponse = await startPractice(
        userMessage.content,
        userPreferences?.learningGoal || 'fluency',
        conversationHistory
      );

      const { response, feedback } = parseFeedback(aiResponse);

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response,
        timestamp: Date.now(),
        feedback
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Auto-play AI response immediately
      setTimeout(() => {
        speakText(response);
      }, 100); // Reduced delay since we now handle listening properly
      
      // Update session stats
      setSessionStats(prev => ({
        messagesCount: prev.messagesCount + 1,
        correctGrammar: prev.correctGrammar + (feedback?.grammarFix === 'None' ? 1 : 0),
        improvements: prev.improvements + (feedback?.betterPhrase !== 'None' ? 1 : 0)
      }));

    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm having trouble connecting right now. Could you try saying that again?",
        timestamp: Date.now(),
        feedback: null,
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndSession = async () => {
    stopContinuousListening();
    const sessionDuration = Math.round((Date.now() - sessionStartTime) / 1000 / 60); // minutes
    
    if (demoMode) {
      onComplete({
        duration: sessionDuration,
        messagesCount: sessionStats.messagesCount,
        correctGrammar: sessionStats.correctGrammar,
        improvements: sessionStats.improvements
      });
      return;
    }
    
    try {
      // Update user progress in Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        'progress.totalMinutes': increment(sessionDuration),
        'progress.totalSessions': increment(1),
        'progress.currentStreak': increment(1), // Simplified - you might want more complex streak logic
        lastPracticeAt: new Date().toISOString()
      });

      onComplete({
        duration: sessionDuration,
        messagesCount: sessionStats.messagesCount,
        correctGrammar: sessionStats.correctGrammar,
        improvements: sessionStats.improvements
      });
    } catch (error) {
      console.error('Error saving session data:', error);
      onComplete({
        duration: sessionDuration,
        messagesCount: sessionStats.messagesCount,
        correctGrammar: sessionStats.correctGrammar,
        improvements: sessionStats.improvements
      });
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      // Stop listening while AI is speaking to prevent feedback loop
      const wasListening = isListening;
      if (wasListening) {
        stopContinuousListening();
      }
      
      // Stop any current speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // Slightly slower for clarity
      utterance.pitch = 1.2; // Higher pitch for female voice
      utterance.volume = 0.8;
      
      // Resume listening after AI finishes speaking
      utterance.onend = () => {
        if (wasListening && voiceMode && micEnabled) {
          setTimeout(() => {
            startContinuousListening();
          }, 500); // Small delay to ensure clean restart
        }
      };
      
      // Wait for voices to load, then select best female voice
      const setVoice = () => {
        const voices = speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice => 
          (voice.name.toLowerCase().includes('female') || 
           voice.name.toLowerCase().includes('samantha') ||
           voice.name.toLowerCase().includes('karen') ||
           voice.name.toLowerCase().includes('susan') ||
           voice.name.toLowerCase().includes('zira') ||
           voice.name.toLowerCase().includes('hazel') ||
           voice.gender === 'female') &&
          voice.lang.startsWith('en')
        ) || voices.find(voice => voice.lang.startsWith('en') && voice.default);
        
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        
        speechSynthesis.speak(utterance);
      };

      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.onvoiceschanged = setVoice;
      } else {
        setVoice();
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {demoMode ? 'Demo Practice Session' : 'Practice Session'}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {userPreferences?.learningGoal || 'fluency'} practice • {voiceMode ? (micEnabled ? 'Voice Active' : 'Voice Muted') : 'Text Mode'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {voiceMode && (
              <button
                onClick={toggleMicrophone}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  micEnabled
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                }`}
                title={micEnabled ? 'Turn off microphone' : 'Turn on microphone'}
              >
                {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </button>
            )}
            <button
              onClick={toggleVoiceMode}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                voiceMode
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {voiceMode ? 'Voice' : 'Text'}
            </button>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-1" />
              {Math.round((Date.now() - sessionStartTime) / 1000 / 60)}m
            </div>
            <button
              onClick={handleEndSession}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              End Session
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              message.type === 'user'
                ? 'bg-indigo-600 text-white'
                : message.isError
                ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
            }`}>
              <p className="text-sm">{message.content}</p>
              
              {/* Feedback */}
              {message.feedback && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 space-y-2">
                  {message.feedback.grammarFix !== 'None' && (
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        <strong>Grammar:</strong> {message.feedback.grammarFix}
                      </p>
                    </div>
                  )}
                  
                  {message.feedback.betterPhrase !== 'None' && (
                    <div className="flex items-start space-x-2">
                      <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        <strong>Better:</strong> {message.feedback.betterPhrase}
                      </p>
                    </div>
                  )}
                  
                  {message.feedback.fluencyTip !== 'None' && (
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        <strong>Tip:</strong> {message.feedback.fluencyTip}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        {voiceMode ? (
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 transition-all ${
              isListening && micEnabled
                ? 'bg-red-100 dark:bg-red-900/30 animate-pulse' 
                : !micEnabled
                ? 'bg-gray-100 dark:bg-gray-700'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}>
              {isListening && micEnabled ? (
                <div className="relative">
                  <Mic className="h-10 w-10 text-red-600 dark:text-red-400" />
                  <div className="absolute inset-0 rounded-full border-2 border-red-600 dark:border-red-400 animate-ping opacity-75"></div>
                  <div className="absolute inset-2 rounded-full border border-red-600 dark:border-red-400 animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
                </div>
              ) : !micEnabled ? (
                <MicOff className="h-10 w-10 text-gray-400" />
              ) : (
                <Mic className="h-10 w-10 text-gray-400" />
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {!micEnabled 
                  ? 'Microphone Off' 
                  : isListening 
                  ? 'Listening...' 
                  : isProcessingVoice 
                  ? 'Processing...' 
                  : 'Ready to Listen'
                }
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {!micEnabled
                  ? 'Click the mic button above to enable voice input'
                  : isListening 
                  ? 'Speak naturally, I\'ll auto-submit after you pause'
                  : isProcessingVoice
                  ? 'Processing your response...'
                  : 'Voice recognition ready'
                }
              </p>
              
              {inputText && micEnabled && (
                <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-700">
                  <p className="text-sm text-indigo-800 dark:text-indigo-300 italic">
                    "{inputText}"
                  </p>
                </div>
              )}
              
              <button
                onClick={toggleVoiceMode}
                className="mt-6 text-sm text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1"
              >
                Switch to text input
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your response..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-xl font-medium transition-colors disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
            
            <button
              onClick={toggleVoiceMode}
              className="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              title="Switch to voice mode"
            >
              <Mic className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeSession;