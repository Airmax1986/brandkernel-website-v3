'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';

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

// Felix's brand consulting responses
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

export function BrandChatbot() {
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

    // Simulate Felix's brand consulting response
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
      {/* Header */}
      <ChatHeader />
      
      {/* Messages */}
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
      
      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </motion.div>
  );
}
