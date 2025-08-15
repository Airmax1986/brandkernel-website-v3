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

// Consultant's brand consulting responses
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

    // Simulate Consultant's brand consulting response
    setTimeout(() => {
      const consultantResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: consultantResponses[Math.floor(Math.random() * consultantResponses.length)],
        isUser: false,
        timestamp
      };
      setMessages(prev => [...prev, consultantResponse]);
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
      <div className="h-80 overflow-y-auto px-4 py-2 bg-brand-green/10">
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
