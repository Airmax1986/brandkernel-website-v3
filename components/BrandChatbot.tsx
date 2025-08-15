'use client';

import { useState, useRef, useEffect, memo, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDebounce } from '@/hooks';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const conversationFlow = [
  {
    id: '1',
    text: 'Welcome to BrandKernel! I\'m here to help you get clarity on your business and figure out what you\'re really worth. Before we dive in - what brings you here today?',
    isUser: false,
    timestamp: '2:30 PM',
    delay: 0
  },
  {
    id: '2',
    text: 'Just checking this out',
    isUser: true,
    timestamp: '2:31 PM',
    delay: 4000
  },
  {
    id: '3',
    text: 'I hear you. That\'s exactly what we\'ll work on together. Just so you know how this works - we\'ll have a conversation about your business, your clients, what you\'ve achieved. Most people are surprised by what we uncover. Ready to explore?',
    isUser: false,
    timestamp: '2:31 PM',
    delay: 7000
  },
  {
    id: '4',
    text: 'Sure',
    isUser: true,
    timestamp: '2:32 PM',
    delay: 12000
  },
  {
    id: '5',
    text: 'Great. Let\'s start with something easy - tell me about your work. What do you do?',
    isUser: false,
    timestamp: '2:32 PM',
    delay: 15000
  }
];

// Responses for after the animation completes
const consultantResponses = [
  "That's interesting. Tell me more about that - what's the most challenging part?",
  "I can see why that matters to you. What would change if you solved this completely?",
  "That's a powerful insight. How long have you been thinking about this?",
  "What you're describing is exactly what we help with. What's been holding you back?",
  "That makes perfect sense. What would success look like for you?"
];

const ChatHeader = memo(() => {
  const animationProps = useMemo(() => ({
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }), []);

  return (
    <motion.div
      {...animationProps}
      className="relative p-4 bg-white/10 backdrop-blur-sm border-b border-white/10"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#957FFF] rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-black">Consultant</h3>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-neutral-500">Online</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-neutral-400 font-medium">
          BrandKernel
        </div>
      </div>
    </motion.div>
  );
});

ChatHeader.displayName = 'ChatHeader';

const ChatMessage = memo(({ message, isUser, timestamp }: { message: string; isUser: boolean; timestamp: string }) => {
  const animationProps = useMemo(() => ({
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.3, ease: "easeOut" }
  }), []);

  const containerClass = useMemo(() => 
    `flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`, 
    [isUser]
  );

  const messageClass = useMemo(() => 
    `px-4 py-3 rounded-2xl shadow-lg ${
      isUser 
        ? 'bg-brand-purple/90 text-white backdrop-blur-sm' 
        : 'bg-white/20 text-brand-black backdrop-blur-sm border border-white/10'
    }`, 
    [isUser]
  );

  const timestampClass = useMemo(() => 
    `text-xs mt-1 text-neutral-500 ${isUser ? 'text-right' : 'text-left'}`, 
    [isUser]
  );

  return (
    <motion.div
      {...animationProps}
      className={containerClass}
    >
      <div className="max-w-[80%] flex flex-col">
        <div className={messageClass}>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        <span className={timestampClass}>
          {timestamp}
        </span>
      </div>
    </motion.div>
  );
});

ChatMessage.displayName = 'ChatMessage';

const ChatInput = memo(({ onSendMessage }: { onSendMessage: (message: string) => void }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const debouncedMessage = useDebounce(message, 300);
  
  // Track typing state
  useEffect(() => {
    if (message.length > 0 && !isTyping) {
      setIsTyping(true);
    } else if (message.length === 0 && isTyping) {
      setIsTyping(false);
    }
  }, [message, isTyping]);

  // Reset typing when debounced message changes
  useEffect(() => {
    if (debouncedMessage === message && isTyping) {
      setIsTyping(false);
    }
  }, [debouncedMessage, message, isTyping]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSendMessage(trimmedMessage);
      setMessage('');
      setIsTyping(false);
    }
  }, [message, onSendMessage]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  const buttonClass = useMemo(() => 
    `absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-brand flex items-center justify-center transition-all duration-200 ${
      message.trim() 
        ? 'bg-brand-green hover:shadow-brand text-brand-black' 
        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
    }`, 
    [message]
  );

  const buttonAnimations = useMemo(() => ({
    whileHover: { scale: message.trim() ? 1.05 : 1 },
    whileTap: { scale: message.trim() ? 0.95 : 1 }
  }), [message]);

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white/10 backdrop-blur-sm">
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="w-full px-4 py-3 pr-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple/50 transition-all duration-200 text-sm text-brand-black placeholder-neutral-500"
        />
        <motion.button
          type="submit"
          disabled={!message.trim()}
          {...buttonAnimations}
          className={buttonClass}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </motion.button>
      </div>
    </form>
  );
});

ChatInput.displayName = 'ChatInput';

export default function BrandChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current && messagesEndRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Start the animated conversation flow
  useEffect(() => {
    // Clear any existing timeouts
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];

    // Schedule each message
    conversationFlow.forEach((messageData) => {
      const timeout = setTimeout(() => {
        const message: Message = {
          id: messageData.id,
          text: messageData.text,
          isUser: messageData.isUser,
          timestamp: messageData.timestamp
        };
        
        setMessages(prev => [...prev, message]);
        
        // Mark animation as complete after the last message
        if (messageData.id === conversationFlow[conversationFlow.length - 1].id) {
          setTimeout(() => setIsAnimationComplete(true), 2000);
        }
      }, messageData.delay);
      
      timeoutRefs.current.push(timeout);
    });

    // Cleanup function
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  const handleSendMessage = useCallback((text: string) => {
    if (!isAnimationComplete) return; // Prevent sending during animation
    
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
  }, [isAnimationComplete]);

  const containerStyle = useMemo(() => ({
    background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    minHeight: '500px'
  }), []);

  const animationProps = useMemo(() => ({
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }), []);

  // Virtual scrolling for performance with large message lists
  const MAX_VISIBLE_MESSAGES = 50;
  const visibleMessages = useMemo(() => {
    if (messages.length <= MAX_VISIBLE_MESSAGES) {
      return messages;
    }
    return messages.slice(-MAX_VISIBLE_MESSAGES);
  }, [messages]);

  const renderedMessages = useMemo(() => 
    visibleMessages.map((message) => (
      <ChatMessage
        key={message.id}
        message={message.text}
        isUser={message.isUser}
        timestamp={message.timestamp}
      />
    )), 
    [visibleMessages]
  );

  return (
    <motion.div
      {...animationProps}
      className="w-full h-full max-h-full rounded-2xl overflow-hidden  backdrop-blur-md border border-white/30 flex flex-col"
      style={containerStyle}
    >
      <ChatHeader />
      
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-3 min-h-0">
        {renderedMessages}
        <div ref={messagesEndRef} />
      </div>
      
      {isAnimationComplete ? (
        <ChatInput onSendMessage={handleSendMessage} />
      ) : (
        <div className="p-4 bg-white/10 backdrop-blur-sm">
          <div className="relative">
            <input
              type="text"
              disabled
              placeholder="Consultant is demonstrating the conversation flow..."
              className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-brand-black placeholder-neutral-400 cursor-not-allowed opacity-60"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-brand flex items-center justify-center bg-neutral-200 text-neutral-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
