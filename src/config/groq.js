import Groq from 'groq-sdk';

// Check if Groq API key is properly set
const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!groqApiKey || groqApiKey === 'your-groq-api-key-here') {
  console.warn('Groq API key not configured. Please add VITE_GROQ_API_KEY to your .env file.');
}

// Initialize Groq client
export const groq = groqApiKey && groqApiKey !== 'your-groq-api-key-here' 
  ? new Groq({ 
      apiKey: groqApiKey,
      dangerouslyAllowBrowser: true // Required for client-side usage
    })
  : null;

// System prompt for AI conversation partner
export const PRACTICE_SESSION_PROMPT = `You are an AI English Conversation Partner. 
Your job is to engage the user in **fast, natural, and context-rich English conversations**. 
Keep your responses short (2–4 sentences), friendly, and supportive.

### Rules:
1. **Role-play realistically** depending on user's chosen goal:
   - Fluency → everyday small talk, deeper casual topics.
   - Interview → ask job-related questions, simulate recruiter style.
   - Academic → ask presentation, debate, or classroom-style questions.
   - Travel → simulate real travel scenarios like ordering food, asking directions.
2. **Adapt difficulty**:
   - If the user makes mistakes, gently correct and re-ask.
   - If fluent, introduce slightly harder words or phrases.
3. **Feedback tags** (for developer to parse):
   - After each reply, include a JSON block with:
     {
       "grammarFix": "suggested grammar correction or 'None'",
       "betterPhrase": "improved version of user's sentence or 'None'",
       "fluencyTip": "tip on speaking naturally, or 'None'"
     }
4. **Keep it encouraging**:
   - Always end with a positive nudge ("Good try!", "Let's keep going!").

### Style:
- Warm, encouraging, student-friendly.
- Responses should feel human-like and **fast**.
- No long paragraphs, keep it conversational.`;

// API function to start practice session
export async function startPractice(userMessage, learningGoal = 'fluency', conversationHistory = []) {
  if (!groq) {
    throw new Error('Groq API not configured. Please add your API key to the .env file.');
  }

  try {
    const systemPrompt = `${PRACTICE_SESSION_PROMPT}

Current learning goal: ${learningGoal}
Keep the conversation focused on ${learningGoal} practice.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: userMessage }
    ];

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192", // Fast, cost-efficient Groq model
      messages: messages,
      temperature: 0.7,
      max_tokens: 300,
      stream: false
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Groq API Error:', error);
    throw new Error('Failed to get AI response. Please try again.');
  }
}

// Helper function to parse feedback from AI response
export function parseFeedback(aiResponse) {
  try {
    // Look for JSON block in the response
    const jsonMatch = aiResponse.match(/\{[\s\S]*?"grammarFix"[\s\S]*?\}/);
    if (jsonMatch) {
      const feedback = JSON.parse(jsonMatch[0]);
      const cleanResponse = aiResponse.replace(jsonMatch[0], '').trim();
      return { response: cleanResponse, feedback };
    }
  } catch (error) {
    console.warn('Could not parse feedback from AI response');
  }
  
  return { response: aiResponse, feedback: null };
}