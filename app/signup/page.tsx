import { Metadata } from 'next';
import Header from '@/components/Header';
import HeroWaitlistForm from '@/components/HeroWaitlistForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Join the Waitlist - Early Access ● Brand Kernel',
  description: 'Sign up for early access to BrandKernel. Join 250+ founders, freelancers, and creators waiting to transform their brand strategy with AI.',
  keywords: 'AI brand strategy signup, waitlist, early access, personal branding, brand consultant',
  authors: [{ name: 'BrandKernel Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Join the Waitlist - Early Access ● Brand Kernel',
    description: 'Sign up for early access to BrandKernel. Join 250+ founders, freelancers, and creators waiting to transform their brand strategy with AI.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join the Waitlist - Early Access ● Brand Kernel',
    description: 'Sign up for early access to BrandKernel. Join 250+ founders, freelancers, and creators waiting to transform their brand strategy with AI.',
  }
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-brand-white">
      <Header variant="dark" fixed={false} />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-10">
          <div className="max-w-3xl mx-auto text-center">

            {/* Heading */}
            <h1 className="text-brand-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6">
              Join the Waitlist
            </h1>

            {/* Subheading */}
            <p className="text-brand-black text-xl md:text-2xl leading-relaxed mb-4">
              We'll be open for early users soon.
            </p>

            {/* Body Text */}
            <div className="text-brand-black text-base md:text-lg leading-relaxed mb-12 space-y-4">
              <p>
                You're one conversation away from the clarity that changes everything.
                Be among the first to experience BrandKernel when we launch.
              </p>
              <p className="text-brand-black/80">
                Early users get special founder pricing and lifetime access to their Brand Kernel.
              </p>
            </div>

            {/* Waitlist Form */}
            <div className="mb-12">
              <HeroWaitlistForm variant="mobile" />
            </div>

            {/* Additional Info */}
            <div className="bg-white border-2 border-[#FF5A21] rounded-lg p-8 mb-8">
              <h2 className="font-bold text-xl mb-4 text-[#957FFF]">What You'll Get</h2>
              <ul className="text-brand-black text-left space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#FF5A21] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Early access notification</strong> when we launch</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#FF5A21] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Special founder pricing</strong> - $297 instead of $497</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#FF5A21] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Exclusive insights</strong> on brand strategy and positioning</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#FF5A21] mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span><strong>First look</strong> at new features and updates</span>
                </li>
              </ul>
            </div>

            {/* CTA to go back */}
            <div className="text-center">
              <Link
                href="/"
                className="text-[#957FFF] hover:text-[#8a73f5] font-medium transition-colors duration-200"
              >
                ← Back to Homepage
              </Link>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-brand-white py-12">
        <div className="container mx-auto px-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">

              {/* Brand */}
              <div className="mb-6 md:mb-0 text-center md:text-left">
                <h3 style={{ fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 'bold' }} className="text-brand-white mb-2">
                  BrandKernel
                </h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.5rem' }} className="text-neutral-400">
                  Your breakthrough starts with clarity.
                </p>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
                <a href="/about" style={{ fontSize: '1rem', lineHeight: '1.5rem' }} className="text-neutral-400 hover:text-brand-white transition-colors duration-200">About</a>
                <a href="/blog" style={{ fontSize: '1rem', lineHeight: '1.5rem' }} className="text-neutral-400 hover:text-brand-white transition-colors duration-200">Blog</a>
                <a href="/imprint" style={{ fontSize: '1rem', lineHeight: '1.5rem' }} className="text-neutral-400 hover:text-brand-white transition-colors duration-200">Imprint</a>
                <a href="/privacy-policy" style={{ fontSize: '1rem', lineHeight: '1.5rem' }} className="text-neutral-400 hover:text-brand-white transition-colors duration-200">Privacy Policy</a>
                <a href="/contact" style={{ fontSize: '1rem', lineHeight: '1.5rem' }} className="text-neutral-400 hover:text-brand-white transition-colors duration-200">Contact</a>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="#" className="text-neutral-400 hover:text-brand-white transition-colors duration-200" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="text-neutral-400 hover:text-brand-white transition-colors duration-200" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-neutral-400 hover:text-brand-white transition-colors duration-200" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.989.013 6.808.06 5.63.107 4.793.266 4.076.502 3.339.747 2.707 1.092 2.076 1.724.444 3.355.099 3.987-.145 4.724c-.236.717-.395 1.554-.442 2.732C-.04 8.637-.027 9.044-.027 12.664s-.013 4.027.06 5.208c.047 1.178.206 2.015.442 2.732.244.737.589 1.369 1.221 2.001.632.632 1.264.977 2.001 1.221.717.236 1.554.395 2.732.442 1.181.047 1.588.06 5.208.06s4.027-.013 5.208-.06c1.178-.047 2.015-.206 2.732-.442.737-.244 1.369-.589 2.001-1.221.632-.632.977-1.264 1.221-2.001.236-.717.395-1.554.442-2.732.047-1.181.06-1.588.06-5.208s-.013-4.027-.06-5.208c-.047-1.178-.206-2.015-.442-2.732C23.2.746 22.855.114 22.223.482c-.632-.632-1.264-.977-2.001-1.221C19.505.025 18.668-.134 17.49-.181 16.309-.228 15.902-.241 12.282-.241h-.265zm-.265 2.401c3.584 0 4.009.014 5.42.06 1.308.059 2.019.273 2.491.454.626.243 1.073.534 1.543 1.004.47.47.761.917 1.004 1.543.181.472.395 1.183.454 2.491.046 1.411.06 1.836.06 5.42s-.014 4.009-.06 5.42c-.059 1.308-.273 2.019-.454 2.491-.243.626-.534 1.073-1.004 1.543-.47.47-.917.761-1.543 1.004-.472.181-1.183.395-2.491.454-1.411.046-1.836.06-5.42.06s-4.009-.014-5.42-.06c-1.308-.059-2.019-.273-2.491-.454-.626-.243-1.073-.534-1.543-1.004-.47-.47-.761-.917-1.004-1.543-.181-.472-.395-1.183-.454-2.491-.046-1.411-.06-1.836-.06-5.42s.014-4.009.06-5.42c.059-1.308.273-2.019.454-2.491.243-.626.534-1.073 1.004-1.543.47-.47.917-.761 1.543-1.004.472-.181 1.183-.395 2.491-.454 1.411-.046 1.836-.06 5.42-.06z"/>
                    <path d="M12.017 15.33c-1.797 0-3.254-1.457-3.254-3.254s1.457-3.254 3.254-3.254 3.254 1.457 3.254 3.254-1.457 3.254-3.254 3.254zM12.017 7.729c-2.56 0-4.637 2.077-4.637 4.637s2.077 4.637 4.637 4.637 4.637-2.077 4.637-4.637-2.077-4.637-4.637-4.637z"/>
                    <circle cx="16.806" cy="7.207" r="1.078"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-neutral-800 mt-8 pt-6 text-center">
              <p style={{ fontSize: '1rem', lineHeight: '1.5rem' }} className="text-neutral-400">
                © 2025 BrandKernel. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
