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
      className="relative p-4 rounded-t-brand-lg bg-brand-light border-b border-brand-light/50"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-brand bg-gradient-brand flex items-center justify-center shadow-brand">
            <svg className="w-5 h-5 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-black">Felix</h3>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2 h-2 bg-brand-green rounded-full"></div>
              <span className="text-neutral-600">Brand Consultant</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-neutral-400">
          Online
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
          className={`px-4 py-3 rounded-brand-lg shadow-brand ${
            isUser 
              ? 'bg-brand-purple text-brand-white' 
              : 'bg-brand-white text-brand-black border-1 border-brand-light'
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
    <form onSubmit={handleSubmit} className="p-4 bg-brand-light rounded-b-brand-lg">
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask Felix about your brand..."
          className="w-full px-4 py-3 pr-12 rounded-brand bg-brand-white border-1 border-brand-light focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all duration-200 text-sm"
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
      initial={{ opacity: 0, scale: 0.95, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md bg-brand-white rounded-brand-lg shadow-brand-lg border-1 border-brand-light overflow-hidden"
    >
      <ChatHeader />
      
      <div className="h-80 overflow-y-auto px-4 py-2 bg-gradient-to-b from-brand-white to-brand-light/30">
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
