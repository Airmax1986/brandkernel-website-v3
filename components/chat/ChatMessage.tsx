import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  const userMessageStyle = "bg-black/30 backdrop-blur-md border border-purple-400/30 text-purple-100 rounded-br-lg";
  const botMessageStyle = "bg-black/30 backdrop-blur-md border border-white/10 text-neutral-100 rounded-bl-lg";

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