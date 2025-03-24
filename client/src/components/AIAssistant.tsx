import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon, CommandLineIcon } from '@heroicons/react/24/outline';

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGE: Message = {
  type: 'assistant',
  content: 'Hello! I\'m XenoTrade\'s AI assistant. How can I help you today?'
};

const AIAssistant: React.FC<{ 
  onClose: () => void;
  isVisible: boolean;
}> = ({ onClose, isVisible }) => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Show welcome bubble after 2 seconds
    const timer = setTimeout(() => {
      setShowWelcomeBubble(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);

    // TODO: Replace with actual AI service call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = `I understand you're asking about "${userMessage}". As this is a demo, I can only provide basic responses. In the full version, I'll be able to help with trading questions, market analysis, and platform guidance.`;
      
      setMessages(prev => [...prev, { type: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible && !showWelcomeBubble) {
    return null;
  }

  return (
    <>
      {showWelcomeBubble && !isVisible && (
        <div 
          className="fixed bottom-24 right-4 max-w-xs animate-fade-in cursor-pointer" 
          onClick={() => {
            setShowWelcomeBubble(false);
            onClose(); // This should toggle the chat visibility in parent
          }}
        >
          <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-2">
            <CommandLineIcon className="w-6 h-6" />
            <p>Need help with trading? Click here to chat with me!</p>
          </div>
          <div className="w-4 h-4 bg-blue-600 transform rotate-45 translate-x-[300px] translate-y-[-8px]" />
        </div>
      )}
      {isVisible && (
        <div className="fixed bottom-24 right-4 w-96 h-[600px] bg-[#1e222d] rounded-lg shadow-xl flex flex-col border border-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <CommandLineIcon className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#131722] text-gray-200'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#131722] text-gray-200 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#131722] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
