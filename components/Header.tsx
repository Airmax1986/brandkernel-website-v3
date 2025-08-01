'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition, useKeyPress, useClickOutside } from '@/hooks';
import { HeaderProps } from '@/types';
import { cn } from '@/lib/utils';

/**
 * Enhanced Header Component with responsive navigation and accessibility
 */
export default function Header({ 
  variant = 'default', 
  fixed = true 
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { y: scrollY } = useScrollPosition();
  const menuRef = useClickOutside<HTMLDivElement>(() => setIsMobileMenuOpen(false));

  // Handle scroll effects
  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  // Close mobile menu on ESC key
  useKeyPress('Escape', () => setIsMobileMenuOpen(false));

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

  // Navigation items
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  // Header background styles based on variant and scroll
  const getHeaderBg = () => {
    if (variant === 'transparent' && !isScrolled) {
      return 'bg-transparent';
    }
    return 'bg-brand-white/95 backdrop-blur-md border-b border-brand-light';
  };

  // Header positioning
  const headerPosition = fixed ? 'fixed' : 'relative';

  const handleJoinWaitlist = () => {
    // Scroll to waitlist form or open modal
    const waitlistElement = document.getElementById('waitlist');
    if (waitlistElement) {
      waitlistElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        className={cn(
          'w-full z-50 transition-all duration-300',
          headerPosition,
          'top-0 left-0 right-0',
          getHeaderBg()
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container-ultra">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="#home" 
                className="text-2xl font-bold text-brand-black hover:text-brand-purple transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 rounded-md px-2 py-1"
                aria-label="BrandKernel Home"
              >
                BrandKernel
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-nav text-brand-black hover:text-brand-purple transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 rounded-md px-3 py-2"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            {/* Desktop CTA + Join Waitlist */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                onClick={handleJoinWaitlist}
                className="bg-gradient-brand text-brand-black font-semibold px-6 py-2.5 rounded-brand hover:shadow-brand-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                Join Waitlist
              </motion.button>
            </div>

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
          </div>
        </div>
      </motion.header>

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
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="text-nav text-brand-black hover:text-brand-purple transition-colors duration-200 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 rounded-md px-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}

                  {/* Mobile Join Waitlist Button */}
                  <motion.button
                    onClick={() => {
                      handleJoinWaitlist();
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-gradient-brand text-brand-black font-semibold px-6 py-3 rounded-brand hover:shadow-brand-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 w-full text-center"
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

      {/* Spacer for fixed header */}
      {fixed && <div className="h-16 lg:h-20" />}
    </>
  );
}
