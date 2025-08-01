"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hi! I\'m Felix, your Brand Consultant. I help businesses create powerful brands that connect with their audience. How can I help with your brand today?',
    isUser: false,
    timestamp: '2:30 PM'
  },
  {
    id: '2',
    text: 'Hi Felix! I need help with my brand strategy.',
    isUser: true,
    timestamp: '2:31 PM'
  },
  {
    id: '3',
    text: 'Perfect! Let\'s dive into your brand strategy. Tell me about your business - what industry are you in, and what makes you different from your competitors?',
    isUser: false,
    timestamp: '2:31 PM'
  }
];

const felixResponses = [
  "That's an excellent brand question! Let me share some strategic insights about positioning your unique value proposition in the market...",
  "From a brand positioning perspective, I'd recommend focusing on what genuinely differentiates you from competitors in your space...",
  "Great question! Brand consistency is absolutely key to building trust. Here's what I'd suggest for your brand guidelines...",
  "That's where strong brand storytelling comes in. Your brand story should connect emotionally with your target audience...",
  "Excellent point about brand differentiation! Consider these strategic approaches to stand out in your market...",
  "Perfect timing for brand optimization! Here's my professional take on strengthening your brand foundation...",
  "Brand perception is crucial for long-term success. I'd recommend analyzing your target audience's current perceptions...",
  "That's a smart branding consideration. Let's explore your brand architecture and how all elements work together...",
  "From my consulting experience, successful brands always focus on authentic connection with their audience...",
  "Let's talk about your brand's visual identity and how it supports your strategic positioning in the market..."
];

// Chat Header Component
function ChatHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 bg-white/95 backdrop-blur-sm border-b border-brand-green/20 rounded-t-brand-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar with brand colors */}
          <div className="w-11 h-11 rounded-brand bg-gradient-brand flex items-center justify-center shadow-brand">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-black">Felix</h3>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
              <span className="text-neutral-600">Brand Consultant</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-neutral-500 font-medium">
          BrandKernel
        </div>
      </div>
    </motion.div>
  );
}

// Chat Message Component
interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className="max-w-[85%] flex flex-col">
        <div
          className={`px-4 py-3 rounded-brand-lg shadow-brand-sm ${
            isUser 
              ? 'bg-gradient-brand text-white shadow-brand-purple/20' 
              : 'bg-white border border-brand-green/30 text-brand-black shadow-brand-green/10'
          }`}
        >
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        <span 
          className={`text-xs mt-1.5 text-neutral-500 ${isUser ? 'text-right' : 'text-left'}`}
        >
          {timestamp}
        </span>
      </div>
    </motion.div>
  );
}

// Chat Input Component
interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      setIsLoading(true);
      onSendMessage(message.trim());
      setMessage('');
      // Reset loading state after Felix responds
      setTimeout(() => setIsLoading(false), 1200);
    }
  };

  const isDisabled = !message.trim() || isLoading;

  return (
    <div className="p-4 bg-white/95 backdrop-blur-sm border-t border-brand-green/20 rounded-b-brand-lg">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask Felix about your brand..."
          disabled={isLoading}
          className="w-full px-4 py-3 pr-14 rounded-brand bg-brand-light/50 border border-brand-green/30 
                     focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple 
                     transition-all duration-200 text-sm text-brand-black placeholder:text-neutral-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <motion.button
          type="submit"
          disabled={isDisabled}
          whileHover={{ scale: isDisabled ? 1 : 1.05 }}
          whileTap={{ scale: isDisabled ? 1 : 0.95 }}
          className={`absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-brand 
                     flex items-center justify-center transition-all duration-200 ${
            isDisabled 
              ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed' 
              : 'bg-gradient-brand hover:shadow-brand text-white shadow-brand-sm'
          }`}
        >
          {isLoading ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          )}
        </motion.button>
      </form>
    </div>
  );
}

// Main Optimized Chat Component
export default function OptimizedBrandChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp
    };

    setMessages(prev => [...prev, userMessage]);

    // Felix response with typing delay
    setTimeout(() => {
      const felixResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: felixResponses[Math.floor(Math.random() * felixResponses.length)],
        isUser: false,
        timestamp
      };
      setMessages(prev => [...prev, felixResponse]);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-brand-lg shadow-brand-lg 
                 border border-brand-green/20 overflow-hidden
                 sm:max-w-lg md:max-w-md lg:max-w-lg xl:max-w-md"
    >
      <ChatHeader />
      
      <div className="h-80 sm:h-96 md:h-80 lg:h-96 overflow-y-auto px-4 py-4 
                      bg-gradient-to-b from-white/50 to-brand-light/30 scrollbar-thin">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </motion.div>
  );
}