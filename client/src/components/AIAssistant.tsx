import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { getAIResponse } from '../services/openai';

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

    try {
      const response = await getAIResponse(userMessage);
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
          className="fixed bottom-16 right-2 md:bottom-24 md:right-4 max-w-[280px] md:max-w-xs animate-fade-in cursor-pointer" 
          onClick={() => {
            setShowWelcomeBubble(false);
            onClose();
          }}
        >
          <div className="bg-blue-600 text-white p-3 md:p-4 rounded-lg shadow-lg flex items-center gap-2">
            <CommandLineIcon className="w-5 h-5 md:w-6 md:h-6" />
            <p className="text-sm md:text-base">Need help with trading? Click here to chat with me!</p>
          </div>
          <div className="w-4 h-4 bg-blue-600 transform rotate-45 translate-x-[260px] md:translate-x-[300px] translate-y-[-8px]" />
        </div>
      )}
      {isVisible && (
        <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-4 w-full md:w-96 h-full md:h-[600px] bg-[#1e222d] md:rounded-lg shadow-xl flex flex-col border border-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <CommandLineIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
              <h3 className="text-base md:text-lg font-semibold text-white">AI Assistant</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
              <XMarkIcon className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] rounded-lg p-2.5 md:p-3 text-sm md:text-base ${
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
          <form onSubmit={handleSubmit} className="p-3 md:p-4 border-t border-gray-800">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#131722] text-white text-sm md:text-base rounded-lg px-3 py-2 md:px-4 md:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white p-1.5 md:p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <PaperAirplaneIcon className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
