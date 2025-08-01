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
        <section id="home" className="h-screen flex flex-col lg:flex-row z-1">
          {/* Left Side - White Background */}
          <div className="w-full lg:w-[50vw] bg-white flex flex-col order-2 lg:order-1 relative">
            <div className="flex-1 flex flex-col justify-center items-center px-6">
              {/* Text Block - Center of left side */}
              <div className="text-center max-w-2xl">
                {/* Hero Heading */}
                <h1 style={{ 
                  fontSize: '8.5rem', 
                  lineHeight: '9.2rem',
                  fontWeight: 'normal',
                  paddingBottom: '100px'
                }} className="text-brand-black">
                  Your Breakthrough<br />
                  Starts With Clarity.
                </h1>
                
                {/* Hero Description */}
                <div style={{ 
                  fontSize: '1.25rem', 
                  lineHeight: '2.2rem',
                  fontWeight: 'bold',
                  paddingBottom: '100px'
                }} className="text-brand-black">
                  <p>You're a brilliant entrepreneur lost in the noise.</p>
                  <p>One dialogue away from the clarity that makes you unstoppable.</p>
                  <p>Welcome to your breakthrough.</p>
                </div>

                {/* Profession Selection */}
                <div>
                  <p style={{ 
                    fontSize: '1.25rem', 
                    lineHeight: '2.2rem',
                    fontWeight: 'bold'
                  }} className="text-brand-black mb-6">First, choose your profession</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button style={{ fontSize: '1.25rem' }} className="bg-[#957FFF] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      Freelancer
                    </button>
                    <button style={{ fontSize: '1.25rem' }} className="bg-[#957FFF] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      Founder
                    </button>
                    <button style={{ fontSize: '1.25rem' }} className="bg-[#957FFF] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      Creator
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Gradient Background */}
          <div className="w-full lg:w-[50vw] order-1 lg:order-2 relative" style={{
            background: 'linear-gradient(180deg, #DAFF96 0%, #957FFF 100%)'
          }}>
            {/* Chat Window - Larger and responsive */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full max-w-lg h-full max-h-[600px]">
                <BrandChatbot />
              </div>
            </div>
          </div>
        </section>

        {/* Manifest Section */}
        <section id="manifest" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 'bold' }} className="text-brand-black mb-6">
                Our Manifest
              </h2>
              <p style={{ fontSize: '1.25rem' }} className="text-neutral-600 mb-8 leading-relaxed">
                We believe that every brand has a unique story to tell. Our mission is to help you discover, 
                refine, and share that story with the world in a way that resonates with your audience and drives growth.
              </p>
              <button className="bg-[#957FFF] text-white px-8 py-3 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all">
                <a href="/manifest" className="text-white">Read Full Manifest</a>
              </button>
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section id="approach" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 'bold' }} className="text-brand-black mb-6">
                Our Approach
              </h2>
              <p style={{ fontSize: '1.25rem' }} className="text-neutral-600 mb-8 leading-relaxed">
                We take a strategic, research-driven approach to branding. Every project begins with deep discovery 
                to understand your business, audience, and market position before we craft your brand identity.
              </p>
              <button className="bg-[#957FFF] text-white px-8 py-3 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all">
                <a href="/approach" className="text-white">Learn About Our Approach</a>
              </button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 'bold' }} className="text-brand-black mb-6">
                How It Works
              </h2>
              <p style={{ fontSize: '1.25rem' }} className="text-neutral-600 mb-8 leading-relaxed">
                Our proven 4-step process takes you from brand confusion to brand clarity. 
                We guide you through discovery, strategy, design, and implementation phases.
              </p>
              <button className="bg-[#957FFF] text-white px-8 py-3 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all">
                <a href="/how-it-works" className="text-white">See Our Process</a>
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 'bold' }} className="text-brand-black mb-6">
                Features
              </h2>
              <p style={{ fontSize: '1.25rem' }} className="text-neutral-600 mb-8 leading-relaxed">
                From logo design to complete brand systems, we offer comprehensive branding solutions 
                that cover every aspect of your brand identity and communications.
              </p>
              <button className="bg-[#957FFF] text-white px-8 py-3 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all">
                <a href="/features" className="text-white">Explore Features</a>
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 'bold' }} className="text-brand-black mb-6">
                Pricing
              </h2>
              <p style={{ fontSize: '1.25rem' }} className="text-neutral-600 mb-8 leading-relaxed">
                Transparent, value-based pricing that scales with your needs. 
                From startup packages to enterprise solutions, we have options for every business size.
              </p>
              <button className="bg-[#957FFF] text-white px-8 py-3 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all">
                <a href="/pricing" className="text-white">View Pricing Plans</a>
              </button>
            </div>
          </div>
        </section>

        {/* Waitlist Section - Centered */}
        <section className="py-20 bg-gradient-to-br from-[#DAFF96] to-[#957FFF]">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 'bold' }} className="text-brand-black mb-6">
                Join Our Waitlist
              </h2>
              <p style={{ fontSize: '1.25rem' }} className="text-brand-black mb-8 leading-relaxed">
                Be the first to access our branding services when we launch. 
                Get exclusive early access, special pricing, and priority support.
              </p>
              <div className="flex items-center gap-2 mb-3 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="name@email.com"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-base shadow-sm"
                  />
                </div>
                <button className="bg-white text-brand-black p-3 rounded-lg hover:bg-neutral-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-brand-black/80">247 people already joined</p>
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
