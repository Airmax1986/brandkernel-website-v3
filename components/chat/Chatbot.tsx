"use client";

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
  "Interesting perspective. What results are you hoping to see?",
];

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current && messagesEndRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[390px] h-[650px] flex flex-col 
                 rounded-3xl shadow-2xl overflow-hidden
                 bg-black/10 backdrop-blur-2xl
                 border border-white/10"
    >
      {/* Header */}
      <div>
        <ChatHeader />
      </div>
      
      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
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
      <div className="p-4 border-t border-white/10">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </motion.div>
  );
}