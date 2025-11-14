'use client';

import { useEffect, useRef, useState } from 'react';

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    let scrollInstance: any = null;

    const initScroll = async () => {
      try {
        if (!scrollRef.current) return;

        // Dynamically import LocomotiveScroll
        const LocomotiveScroll = (await import('locomotive-scroll')).default;

        scrollInstance = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          multiplier: 1,
          class: 'is-revealed',
        });

        locomotiveScrollRef.current = scrollInstance;
      } catch (error) {
        console.error('Failed to initialize Locomotive Scroll:', error);
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      initScroll();
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
        locomotiveScrollRef.current = null;
      }
    };
  }, [isMounted]);

  // Render children directly until mounted to prevent hydration issues
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <div data-scroll-container ref={scrollRef}>
      {children}
    </div>
  );
}
