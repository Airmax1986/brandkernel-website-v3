import React from 'react';

export default function GridContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`
        w-full max-w-[1920px] mx-auto px-page-margin 
        grid grid-cols-8 gap-x-page-gutter
        ${className || ''}
      `}
    >
      {children}
    </div>
  );
}