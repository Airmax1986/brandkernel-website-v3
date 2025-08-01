import { Metadata } from 'next';
import Header from '@/components/Header';
import SolutionsSection from '@/components/SolutionsSection';
import WaitlistForm from '@/components/WaitlistForm';
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
        <section id="home" className="relative pt-20 pb-section-padding bg-gradient-to-br from-brand-white via-brand-light to-brand-white">
          <div className="container-ultra">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left: Hero Content */}
              <div className="text-center lg:text-left">
                {/* Hero Heading with improved spacing */}
                <h1 className="text-hero-xl text-brand-black h1-spacing">
                  Transform Your Brand Into a 
                  <span className="text-gradient-brand"> Powerful Story</span>
                </h1>
                
                {/* Hero Description with more space from h1 */}
                <p className="text-body-lg text-neutral-600 mb-12 leading-relaxed max-w-xl lg:max-w-none">
                  We help businesses create memorable brands that connect with their audience, 
                  drive growth, and stand out in today's competitive marketplace.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-16">
                  <CtaButton 
                    variant="primary" 
                    size="lg"
                    onClick={() => {
                      const solutionsElement = document.getElementById('solutions');
                      if (solutionsElement) {
                        solutionsElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Explore Solutions
                  </CtaButton>
                  
                  <CtaButton 
                    variant="outline" 
                    size="lg"
                    onClick={() => {
                      const waitlistElement = document.getElementById('waitlist');
                      if (waitlistElement) {
                        waitlistElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Join Waitlist
                  </CtaButton>
                </div>

                {/* Social Proof */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 text-neutral-500">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div 
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-brand border-2 border-brand-white flex items-center justify-center text-xs font-semibold text-brand-black"
                        >
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-medium">247+ people already joined</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-brand-green fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm font-medium ml-2">Trusted by startups</span>
                  </div>
                </div>
              </div>

              {/* Right: Brand Chatbot */}
              <div className="flex justify-center lg:justify-end">
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
