import { motion } from 'framer-motion';

export function ChatHeader() {
  return (
    <div className="flex items-center justify-between p-4 bg-black/30 rounded-2xl border border-white/10">
      <div className="flex items-center gap-4">
        {/* Avatar Icon */}
        <div className="w-12 h-12 rounded-xl bg-purple-500/100 flex items-center justify-center border border-white/20">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white">Felix</h1>
          <div className="flex items-center gap-2 text-sm text-lime-300">
            <div className="w-2 h-2 bg-lime-300 rounded-full"></div>
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