import { useState } from 'react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
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
        <svg 
          className={`w-4 h-4 transition-colors ${isMessageEmpty ? 'text-neutral-500' : 'text-white'}`}
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="m2 21 21-9L2 3v7l15 2-15 2v7z"/>
        </svg>
      </motion.button>
    </form>
  );
}