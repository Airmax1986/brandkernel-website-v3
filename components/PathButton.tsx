import Link from 'next/link';
import React from 'react';

interface PathButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function PathButton({ href, children }: PathButtonProps) {
  return (
    <Link
      href={href}
      className="
        block w-full text-center py-4 px-8 
        rounded-full 
        text-white font-semibold text-2xl 
        bg-brand-green 
        transition-transform duration-200 ease-in-out hover:scale-105 
        shadow-lg
      "
    >
      {children}
    </Link>
  );
}