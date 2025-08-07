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
    text: 'Hi! I\'m Felix, your AI Brand Consultant. Most branding starts with the wrong questions. Let\'s try three that actually matter.',
    isUser: false,
    timestamp: '2:30 PM'
  },
  {
    id: '2',
    text: 'Tell me about a moment in the last few months where you thought: "Damn, I\'m really good at this" - what was that project or situation?',
    isUser: false,
    timestamp: '2:30 PM'
  }
];

const felixResponses = [
  "What would you think about yourself and your offering if you assumed for a moment that your personal way of working and thinking already contains everything you need for a distinctive brand?",
  "If your absolute dream client - someone who working with would feel like a gift - had to describe you to a friend, what do you think they would say? Not your deliverables, but WHO you are to them.",
  "That sounds fascinating. What do you think made the difference in that moment?",
  "If you could have that same feeling in every project - what would need to be different?",
  "I hear something special in that. Can you say that in a different way?",
  "What would happen if more people knew THAT about you?",
  "How does it feel to hear that?",
  "What part of what you just said surprises you?",
  "That's a powerful insight. Let's dig deeper into what makes that approach uniquely yours...",
  "I'm sensing there's something even more fundamental here. What would you say is the real transformation you create for people?"
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
  return (
    <div className="p-4 bg-white/95 backdrop-blur-sm border-t border-brand-green/20 rounded-b-brand-lg">
      <div className="relative">
        <input
          type="text"
          value=""
          readOnly
          placeholder="This is a demo - input is disabled"
          className="w-full px-4 py-3 pr-14 rounded-brand bg-neutral-100 border border-neutral-300 
                     text-sm text-neutral-500 placeholder:text-neutral-400
                     cursor-not-allowed opacity-60"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-brand 
                       flex items-center justify-center bg-neutral-200 text-neutral-400 cursor-not-allowed">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </div>
      </div>
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
      className="w-full max-w-sm mx-auto bg-white/90 backdrop-blur-sm shadow-brand-lg 
                 border-2 border-white overflow-hidden
                 sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg"
      style={{ borderRadius: '15px' }}
    >
      <ChatHeader />
      
      <div className="h-72 sm:h-80 md:h-96 lg:h-80 xl:h-96 overflow-y-auto px-4 py-4 
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