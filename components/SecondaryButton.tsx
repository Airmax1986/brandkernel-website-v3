import Link from 'next/link';
import React from 'react';

interface SecondaryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function SecondaryButton({ href, children, className }: SecondaryButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-block border-2 border-brand-blue text-brand-blue font-bold py-3 px-8 rounded-md text-lg hover:bg-brand-blue hover:text-white transition-colors ${className || ''}`}
    >
      {children}
    </Link>
  );
}