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
  "Tell me about a moment in the last few months where you thought: 'Damn, I'm really good at this' - what was that project or situation?",
  "What would you think about yourself and your offering if you assumed for a moment that your personal way of working and thinking already contains everything you need for a distinctive brand?",
  "If your absolute dream client - someone who working with would feel like a gift - had to describe you to a friend, what do you think they would say? Not your deliverables, but WHO you are to them.",
  "That sounds fascinating. What do you think made the difference in that moment?",
  "If you could have that same feeling in every project - what would need to be different?",
  "I hear something special in that. Can you say that in a different way?",
  "What would happen if more people knew THAT about you?",
  "How does it feel to hear that?",
  "What part of what you just said surprises you?",
  "That's a powerful insight. Let's dig deeper into what makes that approach uniquely yours..."
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
            <h3 className="text-sm font-semibold text-brand-black">Felix</h3>
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
        ? 'bg-gradient-brand hover:shadow-brand text-brand-black' 
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
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback((text: string) => {
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
  }, []);

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
      className="w-full h-full rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md border border-white/30 flex flex-col"
      style={containerStyle}
    >
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
        {renderedMessages}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </motion.div>
  );
}
