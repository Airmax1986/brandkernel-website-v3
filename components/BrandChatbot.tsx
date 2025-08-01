'use client';

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
    text: 'Hello! I\'m Felix, your Brand Consultant. I\'m here to help you build stronger brands, develop strategic positioning, and create meaningful connections with your audience. How can I assist you today?',
    isUser: false,
    timestamp: '2:30 PM'
  }
];

const felixResponses = [
  "That's an excellent brand question! Let me share some strategic insights...",
  "From a brand positioning perspective, I'd recommend focusing on your unique value proposition...",
  "Great question! Brand consistency is key. Here's what I'd suggest...",
  "That's where strong brand storytelling comes in. Your brand story should...",
  "Excellent point about brand differentiation! Consider these strategic approaches...",
  "Perfect timing for brand optimization! Here's my professional take...",
  "Brand perception is crucial. I'd recommend analyzing your target audience's...",
  "That's a smart branding consideration. Let's explore your brand architecture...",
  "From my consulting experience, successful brands always...",
  "Let's talk about your brand's visual identity and how it supports your strategy..."
];

function ChatHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative p-4 bg-white/10 backdrop-blur-sm border-b border-white/10"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-sm font-semibold text-brand-black">Felix</h3>
          </div>
        </div>
        <div className="text-xs text-neutral-400 font-medium">
          BrandKernel
        </div>
      </div>
    </motion.div>
  );
}

function ChatMessage({ message, isUser, timestamp }: { message: string; isUser: boolean; timestamp: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <div className="max-w-[80%] flex flex-col">
        <div
          className={`px-4 py-3 rounded-2xl shadow-lg ${
            isUser 
              ? 'bg-brand-purple/90 text-white backdrop-blur-sm' 
              : 'bg-white/20 text-brand-black backdrop-blur-sm border border-white/10'
          }`}
        >
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        <span 
          className={`text-xs mt-1 text-neutral-500 ${isUser ? 'text-right' : 'text-left'}`}
        >
          {timestamp}
        </span>
      </div>
    </motion.div>
  );
}

function ChatInput({ onSendMessage }: { onSendMessage: (message: string) => void }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white/10 backdrop-blur-sm">
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full px-4 py-3 pr-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple/50 transition-all duration-200 text-sm text-brand-black placeholder-neutral-500"
        />
        <motion.button
          type="submit"
          disabled={!message.trim()}
          whileHover={{ scale: message.trim() ? 1.05 : 1 }}
          whileTap={{ scale: message.trim() ? 0.95 : 1 }}
          className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-brand flex items-center justify-center transition-all duration-200 ${
            message.trim() 
              ? 'bg-gradient-brand hover:shadow-brand text-brand-black' 
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </motion.button>
      </div>
    </form>
  );
}

export default function BrandChatbot() {
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

    setTimeout(() => {
      const felixResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: felixResponses[Math.floor(Math.random() * felixResponses.length)],
        isUser: false,
        timestamp
      };
      setMessages(prev => [...prev, felixResponse]);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-full rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md border border-white/20 flex flex-col"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        minHeight: '500px'
      }}
    >
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
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
