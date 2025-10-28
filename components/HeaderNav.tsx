/**
 * HeaderNav - Server-Side Rendered Navigation
 *
 * This component provides SEO-friendly navigation links that are
 * rendered server-side and immediately visible to search engine crawlers.
 *
 * Progressive Enhancement: The HeaderClient component enhances this
 * with animations and interactivity for real users.
 */

export const navItems = [
  { name: 'Manifest', href: '/manifest' },
  { name: 'Approach', href: '/approach' },
  { name: 'How it works', href: '/how-it-works' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
] as const;

export const secondaryNavItems = [
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
] as const;

interface HeaderNavProps {
  variant?: 'default' | 'transparent';
  fixed?: boolean;
}

/**
 * Server-Side Rendered Header Navigation
 * Ensures all navigation links are immediately visible to search engines
 */
export default function HeaderNav({
  variant = 'default',
  fixed = true
}: HeaderNavProps) {
  const headerPosition = fixed ? 'fixed' : 'relative';

  return (
    <header
      className={`
        w-full z-50 transition-all duration-300
        ${headerPosition} top-0 left-0 right-0
        bg-transparent
      `}
      style={{ zIndex: 2 }}
    >
      <div className="w-full">
        <div className="flex" style={{ height: '5rem', paddingTop: '2.5rem' }}>

          {/* Left 50% - Logo + Main Navigation */}
          <div className="w-[50vw] flex items-center justify-between px-10">
            {/* Logo */}
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

            {/* Desktop Navigation - SSR for SEO */}
            <nav
              className="hidden md:flex items-center space-x-1"
              role="navigation"
              aria-label="Main navigation"
            >
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

          {/* Right 50% - Secondary Nav + Sign Up */}
          <div className="w-[50vw] flex items-center justify-end px-10">
            {/* Secondary Nav + Sign Up - SSR for SEO */}
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

            {/* Mobile Menu Toggle - Placeholder for SSR */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-brand-black hover:text-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 rounded-md p-2 transition-colors duration-200"
                aria-label="Toggle navigation menu"
              >
                {/* Hamburger Icon */}
                <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                  <span className="w-6 h-0.5 bg-current"></span>
                  <span className="w-6 h-0.5 bg-current"></span>
                  <span className="w-6 h-0.5 bg-current"></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - SSR for SEO */}
      <nav
        className="md:hidden bg-brand-white border-b border-brand-light"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-brand-black hover:text-brand-purple transition-colors duration-200 font-normal py-2 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 rounded-md px-3"
              >
                {item.name}
              </a>
            ))}
            <div className="border-t border-brand-light my-2"></div>
            {secondaryNavItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-brand-black hover:text-brand-purple transition-colors duration-200 font-normal py-2 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 rounded-md px-3"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
