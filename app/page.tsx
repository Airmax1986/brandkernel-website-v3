import { Metadata } from 'next';
import Header from '@/components/Header';
import SolutionsSection from '@/components/SolutionsSection';
import WaitlistForm from '@/components/WaitlistForm';
import ClientCtaButtons from '@/components/ClientCtaButtons';
import CtaButton from '@/components/CtaButton';
import BrandChatbot from '@/components/BrandChatbot';

export const metadata: Metadata = {
  title: 'BrandKernel - Transform Your Brand',
  description: 'Professional branding solutions that help your business stand out. Join our waitlist for early access.',
  keywords: 'branding, brand strategy, visual identity, digital presence, brand design',
  authors: [{ name: 'BrandKernel Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'BrandKernel - Transform Your Brand',
    description: 'Professional branding solutions that help your business stand out.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrandKernel - Transform Your Brand',
    description: 'Professional branding solutions that help your business stand out.',
  }
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-white">
      
      {/* Header */}
      <Header variant="transparent" fixed={true} />

      {/* Hero Section with Chatbot */}
      <main>
        <section id="home" className="relative min-h-screen" style={{
          background: 'linear-gradient(135deg, #DAFF96 0%, #ffffff 50%, #957FFF 100%)'
        }}>
          <div className="container-ultra pt-20 pb-20">
            <div className="relative min-h-screen flex items-center">
              {/* Left: Hero Content */}
              <div className="text-left max-w-2xl lg:max-w-xl z-10">
                {/* Hero Heading */}
                <h1 className="text-6xl lg:text-9xl font-black text-brand-black leading-[0.85] mb-12 tracking-tight">
                  Your Breakthrough<br />
                  Starts With Clarity.
                </h1>
                
                {/* Hero Description */}
                <div className="text-lg text-brand-black mb-12 text-center space-y-1 max-w-md mx-auto lg:mx-0">
                  <p className="font-bold">You're a brilliant entrepreneur lost in the noise.</p>
                  <p className="font-normal">One dialogue away from the clarity that makes you unstoppable.</p>
                  <p className="font-bold">Welcome to your breakthrough.</p>
                </div>

                {/* Profession Selection */}
                <div className="mb-12 text-center">
                  <p className="text-lg font-semibold text-brand-black mb-6">First, choose your profession</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button className="bg-[#957FFF] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm">
                      Freelancer
                    </button>
                    <button className="bg-[#957FFF] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm">
                      Founder
                    </button>
                    <button className="bg-[#957FFF] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm">
                      Creator
                    </button>
                  </div>
                </div>

                {/* Waitlist Form */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3 max-w-md">
                    <div className="flex-1 relative">
                      <input
                        type="email"
                        placeholder="name@email.com"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAFF96] focus:border-transparent text-base shadow-sm"
                      />
                    </div>
                    <button className="bg-[#DAFF96] text-brand-black p-3 rounded-lg hover:bg-[#DAFF96]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-neutral-600">247 people already joined</p>
                </div>

              </div>
              
              {/* Right: Brand Chatbot - Absolutely positioned */}
              <div className="absolute top-20 right-8 lg:right-20 hidden lg:block z-20">
                <BrandChatbot />
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <SolutionsSection />

        {/* About Section */}
        <section id="about" className="py-section-padding bg-brand-white">
          <div className="container-ultra">
            <div className="max-w-4xl mx-auto text-center">
              
              <h2 className="text-hero-lg text-brand-black h1-spacing">
                Why Choose BrandKernel?
              </h2>
              
              <p className="text-body-lg text-neutral-600 mb-16 leading-relaxed">
                We're not just another design agency. We're brand strategists who understand 
                that great branding goes beyond beautiful visuals—it's about creating meaningful 
                connections between your business and your customers.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="text-left">
                  <div className="text-3xl mb-4">🎯</div>
                  <h3 className="text-subheading text-brand-black mb-4">Strategic Approach</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Every brand we create is backed by thorough research, strategic thinking, 
                    and a deep understanding of your market and audience.
                  </p>
                </div>
                
                <div className="text-left">
                  <div className="text-3xl mb-4">⚡</div>
                  <h3 className="text-subheading text-brand-black mb-4">Fast Delivery</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    We understand that time is money. Our streamlined process ensures 
                    you get exceptional results without the long wait times.
                  </p>
                </div>
                
                <div className="text-left">
                  <div className="text-3xl mb-4">🎨</div>
                  <h3 className="text-subheading text-brand-black mb-4">Creative Excellence</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Our team of experienced designers and strategists brings fresh, 
                    innovative ideas to every project we undertake.
                  </p>
                </div>
                
                <div className="text-left">
                  <div className="text-3xl mb-4">🤝</div>
                  <h3 className="text-subheading text-brand-black mb-4">Partnership Mindset</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    We don't just work for you—we work with you. Your success is our success, 
                    and we're committed to building long-term relationships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/Waitlist Section */}
        <section id="waitlist" className="py-section-padding bg-gradient-to-br from-brand-light to-brand-white">
          <div className="container-ultra">
            <div className="max-w-2xl mx-auto text-center">
              
              <h2 className="text-hero-lg text-brand-black h1-spacing">
                Ready to Transform Your Brand?
              </h2>
              
              <p className="text-body-lg text-neutral-600 mb-12 leading-relaxed">
                Join our waitlist to be the first to access our branding services when we launch. 
                Get exclusive early access, special pricing, and priority support.
              </p>

              {/* Waitlist Form */}
              <div className="max-w-md mx-auto">
                <WaitlistForm 
                  variant="inline" 
                  showCounter={false}
                />
              </div>

              {/* Alternative Contact */}
              <div className="mt-12 pt-8 border-t border-brand-light">
                <p className="text-neutral-500 mb-4">
                  Need to get in touch directly?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <CtaButton 
                    variant="ghost" 
                    href="mailto:hello@brandkernel.com"
                  >
                    hello@brandkernel.com
                  </CtaButton>
                  <CtaButton 
                    variant="ghost" 
                    href="tel:+1234567890"
                  >
                    +1 (234) 567-890
                  </CtaButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-brand-white py-12">
        <div className="container-ultra">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-brand-green">BrandKernel</h3>
              <p className="text-neutral-400 text-sm mt-1">
                Transform Your Brand Into a Powerful Story
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <a 
                href="#" 
                className="text-neutral-400 hover:text-brand-green transition-colors duration-200"
                aria-label="Twitter"
              >
                Twitter
              </a>
              <a 
                href="#" 
                className="text-neutral-400 hover:text-brand-green transition-colors duration-200"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a 
                href="#" 
                className="text-neutral-400 hover:text-brand-green transition-colors duration-200"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
            <p className="text-neutral-400 text-sm">
              © 2025 BrandKernel. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Waitlist Form (shows on scroll) */}
      <WaitlistForm 
        variant="floating"
        showCounter={true}
        isHidden={false}
      />
    </div>
  );
}
