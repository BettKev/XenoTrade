const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const getAIResponse = async (message: string): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: 'You are a helpful trading assistant for XenoTrade platform. Provide concise and accurate responses about trading, market analysis, and platform usage.'
        }, {
          role: 'user',
          content: message
        }],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (response.status === 429) {
        throw new Error('API quota exceeded. Please try again later or contact support for upgraded access.');
      }
      throw new Error(`API error: ${response.status} ${errorData?.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    if (!data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from OpenAI API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to get AI response');
  }
};
