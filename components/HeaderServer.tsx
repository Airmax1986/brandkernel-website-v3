// Server Component - Static Navigation (SSR)
import { HeaderProps } from '@/types';
import MobileMenuClient from './MobileMenuClient';

/**
 * Server-Rendered Header Component
 * - Navigation links are server-rendered for SEO and performance
 * - Interactive parts (mobile menu, animations) are client components
 */
export default function HeaderServer({
  variant = 'default',
  fixed = true
}: HeaderProps) {
  // Navigation items - rendered server-side
  const navItems = [
    { name: 'Manifest', href: '/manifest' },
    { name: 'Approach', href: '/approach' },
    { name: 'How it works', href: '/how-it-works' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const secondaryNavItems = [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <header
        className={`w-full z-50 transition-all duration-300 ${fixed ? 'fixed' : 'relative'} top-0 left-0 right-0 bg-transparent`}
        style={{ zIndex: 2 }}
      >
        <div className="w-full">
          <div className="flex" style={{ height: '5rem', paddingTop: '2.5rem' }}>

            {/* Left 50% - Logo + Main Navigation */}
            <div className="w-[50vw] flex items-center justify-between px-10">
              {/* Logo - Server Rendered */}
              <div className="flex-shrink-0">
                <a
                  href="/"
                  style={{ fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 'normal' }}
                  className="text-brand-black hover:text-brand-purple hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 rounded-md px-3 py-2 border border-transparent hover:border-gray-200"
                  aria-label="BrandKernel Home"
                >
                  BrandKernel
                </a>
              </div>

              {/* Desktop Navigation - Server Rendered */}
              <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    style={{ fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 'normal' }}
                    className="text-brand-black hover:text-brand-purple transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 rounded-md px-2 py-2"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Right 50% - Secondary Nav + Sign Up + Mobile Menu */}
            <div className="w-[50vw] flex items-center justify-end px-10">
              {/* Secondary Nav + Sign Up - Server Rendered */}
              <div className="hidden md:flex items-center space-x-3">
                {secondaryNavItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    style={{ fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 'normal' }}
                    className="text-brand-black hover:text-brand-purple transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 rounded-md px-2 py-2"
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="#waitlist"
                  style={{ fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 'normal' }}
                  className="bg-brand-white text-brand-black px-3 py-1.5 rounded-full border border-neutral-200 hover:bg-neutral-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2"
                >
                  Sign up
                </a>
              </div>

              {/* Mobile Menu - Client Component for interactivity */}
              <MobileMenuClient
                navItems={navItems}
                secondaryNavItems={secondaryNavItems}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
