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
    text: 'Hello! I\'m Felix, your Brand Consultant. I\'m here to help you build stronger brands, develop strategic positioning, and create meaningful connections with your audience. How can I assist you today?',
    isUser: false,
    timestamp: '2:30 PM'
  }
];

const felixResponses = [
  "EXAMPLE: That's an excellent brand question! Let me share some strategic insights...",
  "EXAMPLE: From a brand positioning perspective, I'd recommend considering...",
  "EXAMPLE: That's a common branding challenge. Here's how I'd approach it strategically...",
  "EXAMPLE: Great question! Brand consistency is key here. Let me explain...",
  "EXAMPLE: I love discussing brand identity! From my consulting experience...",
  "EXAMPLE: That's where strong brand storytelling comes in. Here's what I'd suggest...",
  "EXAMPLE: Excellent point about brand differentiation! Let me share some insights...",
  "EXAMPLE: Brand perception is crucial here. From a strategic standpoint...",
  "EXAMPLE: That's a smart branding consideration. I'd recommend focusing on...",
  "EXAMPLE: Perfect timing for brand optimization! Here's my professional take...",
];

// Chat Header Component
function ChatHeader() {
  return (
    // Der Header ist jetzt wieder ein solides Element für maximale Lesbarkeit.
    <div className="flex items-center justify-between p-4 bg-black/30 rounded-2xl border border-white/10">
      <div className="flex items-center gap-4">
        {/* Das Avatar-Icon */}
        <div className="w-12 h-12 rounded-xl bg-purple-500/100 flex items-center justify-center border border-white/20">
          {/* Bot icon from lucide-react */}
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white">Felix</h1>
          <div className="flex items-center gap-2 text-sm text-lime-300">
            {/* Circle icon from lucide-react with fill-current */}
            <svg className="w-2 h-2 fill-current" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
            </svg>
            <span>Online</span>
          </div>
        </div>
      </div>
      <div className="text-xs text-white/60">
        BrandKernel
      </div>
    </div>
  );
}

// Chat Message Component
interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  // --- START DER ÄNDERUNG ---
  // Die Benutzer-Nachricht wird jetzt auch glasig, mit einem violetten Schimmer.
  const userMessageStyle = "bg-black/30 backdrop-blur-md border border-purple-400/30 text-purple-100 rounded-br-lg";
  
  // Bot-Nachricht (bleibt wie im letzten Schritt)
  const botMessageStyle = "bg-black/30 backdrop-blur-md border border-white/10 text-neutral-100 rounded-bl-lg";
  // --- ENDE DER ÄNDERUNG ---

  const messageClasses = `px-4 py-3 rounded-2xl ${isUser ? userMessageStyle : botMessageStyle}`;
  const timestampClasses = `text-xs mt-1.5 ${isUser ? 'text-right' : 'text-left'} text-white/70`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
    >
      <div className={`max-w-[75%] ${messageClasses}`}>
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
      <span className={timestampClasses}>
        {timestamp}
      </span>
    </motion.div>
  );
}

// Chat Input Component
interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const isMessageEmpty = !message.trim();

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        // Dunkleres Glas und hellerer Platzhalter
        className="w-full px-5 py-3 pr-14 
                   bg-black/30 backdrop-blur-md 
                   border border-white/10 rounded-2xl 
                   text-white placeholder:text-neutral-400 
                   focus:outline-none focus:ring-2 focus:ring-purple-400/50"
      />
      <motion.button
        type="submit"
        disabled={isMessageEmpty}
        whileHover={{ scale: isMessageEmpty ? 1 : 1.1 }}
        whileTap={{ scale: isMessageEmpty ? 1 : 0.9 }}
        className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full 
                   flex items-center justify-center transition-all duration-300
                   border
                   ${isMessageEmpty 
                     ? 'bg-black/20 border-white/10 cursor-not-allowed' 
                     : 'bg-purple-600 border-purple-500 shadow-lg shadow-purple-600/50'}`}
      >
        {/* Send icon from lucide-react */}
        <svg 
          className={`w-4 h-4 transition-colors ${isMessageEmpty ? 'text-neutral-500' : 'text-white'}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m2 21 21-9L2 3v7l15 2-15 2v7z"/>
        </svg>
      </motion.button>
    </form>
  );
}

// Main Chatbot Component
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
      // Haupt-Glasfenster
      className="w-[390px] h-[650px] flex flex-col 
                 rounded-3xl shadow-2xl overflow-hidden
                 bg-black/10 backdrop-blur-2xl
                 border border-white/10"
    >
      {/* Header Bereich: Kein zusätzliches Padding hier */}
      <div>
        <ChatHeader />
      </div>
      
      {/* Nachrichtenliste */}
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
      
      {/* Input Bereich */}
      <div className="p-4 border-t border-white/10">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </motion.div>
  );
}

export default Chatbot;