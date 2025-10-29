'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  name: string;
  href: string;
}

interface MobileMenuClientProps {
  navItems: NavItem[];
  secondaryNavItems: NavItem[];
}

/**
 * Client Component for Mobile Menu
 * - Handles interactive state (open/close)
 * - Animations with framer-motion
 * - Only loaded on client for interactivity
 */
export default function MobileMenuClient({ navItems, secondaryNavItems }: MobileMenuClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleJoinWaitlist = () => {
    const waitlistElement = document.getElementById('waitlist');
    if (waitlistElement) {
      waitlistElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          type="button"
          className="text-brand-black hover:text-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 rounded-md p-2 transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span className="sr-only">
            {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          </span>

          {/* Hamburger Icon */}
          <motion.div
            className="w-6 h-6 flex flex-col justify-center items-center space-y-1"
            animate={isMobileMenuOpen ? 'open' : 'closed'}
          >
            <motion.span
              className="w-6 h-0.5 bg-current origin-center"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 6 }
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-current"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-current origin-center"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -6 }
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-brand-black/50 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              className="fixed top-16 left-0 right-0 bg-brand-white border-b border-brand-light shadow-lg z-50 md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="container-ultra py-4">
                <div className="flex flex-col space-y-4">

                  {/* Mobile Navigation Links */}
                  {navItems.map((item, index) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-nav text-brand-black hover:text-brand-purple transition-colors duration-200 font-normal py-2 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 rounded-md px-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}

                  {/* Divider */}
                  <div className="border-t border-brand-light my-2"></div>

                  {/* Mobile Secondary Navigation Links */}
                  {secondaryNavItems.map((item, index) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-nav text-brand-black hover:text-brand-purple transition-colors duration-200 font-normal py-2 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 rounded-md px-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}

                  {/* Mobile Join Waitlist Button */}
                  <motion.button
                    onClick={() => {
                      handleJoinWaitlist();
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-brand-green text-brand-black font-semibold px-10 py-3 rounded-brand hover:shadow-brand-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 w-full text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join Waitlist
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
