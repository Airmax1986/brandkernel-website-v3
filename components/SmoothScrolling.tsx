'use client';

import { useEffect, useRef } from 'react';

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    let locomotiveScroll: any = null;

    const initScroll = async () => {
      try {
        // Dynamically import Locomotive Scroll v5
        const LocomotiveScroll = (await import('locomotive-scroll')).default;

        locomotiveScroll = new LocomotiveScroll({
          lenisOptions: {
            duration: 1.2,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          },
        });

        scrollRef.current = locomotiveScroll;
      } catch (error) {
        console.error('Failed to initialize Locomotive Scroll v5:', error);
      }
    };

    initScroll();

    // Cleanup
    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy();
        scrollRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
