'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const BrandChatbot = dynamic(() => import('./BrandChatbot'), {
  loading: () => (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md border border-white/30 flex flex-col min-h-[500px] animate-pulse"
         style={{
           background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
           backdropFilter: 'blur(20px)',
           boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
         }}>
      <div className="p-4 bg-white/10 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
            <div>
              <div className="h-4 bg-gray-300 rounded w-12 mb-1 animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded w-16 animate-pulse"></div>
            </div>
          </div>
          <div className="h-3 bg-gray-300 rounded w-20 animate-pulse"></div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-purple-500 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm">Loading chat...</p>
        </div>
      </div>
    </div>
  ),
  ssr: false
});

export default function DynamicBrandChatbot() {
  return (
    <Suspense fallback={
      <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md border border-white/30 flex flex-col min-h-[500px] animate-pulse"
           style={{
             background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
             backdropFilter: 'blur(20px)',
             boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
           }}>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-purple-500 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm">Loading chat...</p>
          </div>
        </div>
      </div>
    }>
      <BrandChatbot />
    </Suspense>
  );
}