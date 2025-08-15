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
    text: 'Welcome to BrandKernel! I\'m here to help you get clarity on your business and figure out what you\'re really worth. Before we dive in - what brings you here today?',
    isUser: false,
    timestamp: '2:30 PM'
  },
  {
    id: '2',
    text: 'Just checking this out',
    isUser: true,
    timestamp: '2:31 PM'
  },
  {
    id: '3',
    text: 'I hear you. That\'s exactly what we\'ll work on together. Just so you know how this works - we\'ll have a conversation about your business, your clients, what you\'ve achieved. Most people are surprised by what we uncover. Ready to explore?',
    isUser: false,
    timestamp: '2:31 PM'
  },
  {
    id: '4',
    text: 'Sure',
    isUser: true,
    timestamp: '2:32 PM'
  },
  {
    id: '5',
    text: 'Great. Let\'s start with something easy - tell me about your work. What do you do?',
    isUser: false,
    timestamp: '2:32 PM'
  }
];

const consultantResponses = [
  "That's interesting. Tell me more about that - what's the most challenging part?",
  "I can see why that matters to you. What would change if you solved this completely?",
  "That's a powerful insight. How long have you been thinking about this?",
  "What you're describing is exactly what we help with. What's been holding you back?",
  "That makes perfect sense. What would success look like for you?",
  "I hear that a lot from our clients. What's your biggest priority right now?",
  "That's exactly the kind of clarity we can help you achieve. What questions do you have?",
  "You're thinking about this the right way. What's your timeline for making this happen?",
  "That's valuable experience. How can we help you leverage that?",
  "Interesting perspective. What results are you hoping to see?"
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
          <div className="w-11 h-11 rounded-brand bg-brand-green flex items-center justify-center shadow-brand">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-black">Consultant</h3>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
              <span className="text-neutral-600">Brand Specialist</span>
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
              ? 'bg-brand-green text-white shadow-brand-purple/20' 
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

    // Consultant response with typing delay
    setTimeout(() => {
      const consultantResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: consultantResponses[Math.floor(Math.random() * consultantResponses.length)],
        isUser: false,
        timestamp
      };
      setMessages(prev => [...prev, consultantResponse]);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-sm mx-auto bg-white/90 backdrop-blur-sm shadow-brand-lg 
                 overflow-hidden
                 sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg"
      style={{ 
        borderRadius: '15px',
        boxShadow: 'inset 0 0 0 2px white, 0 8px 32px rgba(31, 38, 135, 0.37)'
      }}
    >
      <ChatHeader />
      
      <div className="h-72 sm:h-80 md:h-96 lg:h-80 xl:h-96 overflow-y-auto px-4 py-4 
                      bg-brand-green scrollbar-thin">
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