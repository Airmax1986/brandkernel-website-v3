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
    text: 'Hello! I\'m Felix, your Brand Consultant. I\'m here to help you build stronger brands, develop strategic positioning, and create meaningful connections with your audience. How can I assist you today?',
    isUser: false,
    timestamp: '2:30 PM'
  }
];

const felixResponses = [
  "That's an excellent brand question! Let me share some strategic insights...",
  "From a brand positioning perspective, I'd recommend considering...",
  "That's a common branding challenge. Here's how I'd approach it strategically...",
  "Great question! Brand consistency is key here. Let me explain...",
  "I love discussing brand identity! From my consulting experience...",
  "That's where strong brand storytelling comes in. Here's what I'd suggest...",
  "Excellent point about brand differentiation! Let me share some insights...",
  "Brand perception is crucial here. From a strategic standpoint...",
  "That's a smart branding consideration. I'd recommend focusing on...",
  "Perfect timing for brand optimization! Here's my professional take...",
];

export function Chatbot() {
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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