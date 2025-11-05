'use client';

import { useState, useEffect } from 'react';
import { TOCHeading } from '@/lib/table-of-contents';

export interface TableOfContentsProps {
  headings: TOCHeading[];
  className?: string;
}

/**
 * Table of Contents Component
 * Displays clickable TOC with smooth scrolling and active section highlighting
 */
export default function TableOfContents({ headings, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Intersection Observer to track which heading is currently visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px', // Trigger when heading is near top
      }
    );

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Smooth scroll to element
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav
      className={`sticky top-24 bg-white border border-gray-200 rounded-lg p-6 ${className}`}
      aria-label="Table of contents"
    >
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        Table of Contents
      </h2>

      <ul className="space-y-2">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const isH3 = heading.level === 3;

          return (
            <li key={heading.id} className={isH3 ? 'ml-4' : ''}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  block text-sm transition-colors duration-200 py-1
                  ${isActive
                    ? 'text-[#957FFF] font-semibold border-l-2 border-[#957FFF] pl-3'
                    : 'text-gray-600 hover:text-[#957FFF] pl-3 border-l-2 border-transparent hover:border-gray-300'
                  }
                  ${isH3 ? 'text-xs' : ''}
                `}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-6 w-full text-sm text-gray-500 hover:text-[#957FFF] transition-colors duration-200 flex items-center justify-center py-2 border-t border-gray-200 pt-4"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        Back to top
      </button>
    </nav>
  );
}
