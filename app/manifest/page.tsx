import CtaButton from "@/components/CtaButton";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Clarity Manifesto: Why Every Founder is One Conversation Away | BrandKernel',
  description: 'Read BrandKernel\'s manifesto on why 997 out of 1,000 startups fail due to lack of clarity. Stop building in the dark. Start with the conversation that changes everything.',
  openGraph: {
    title: 'The Clarity Manifesto: Why Every Founder is One Conversation Away | BrandKernel',
    description: 'Read BrandKernel\'s manifesto on why 997 out of 1,000 startups fail due to lack of clarity. Stop building in the dark. Start with the conversation that changes everything.',
    type: 'website',
    url: 'https://brandkernel.io/manifest',
    siteName: 'BrandKernel',
    images: [
      {
        url: '/og-manifest.jpg',
        width: 1200,
        height: 630,
        alt: 'BrandKernel Clarity Manifesto - The Conversation That Changes Everything',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Clarity Manifesto: Why Every Founder is One Conversation Away | BrandKernel',
    description: 'Read BrandKernel\'s manifesto on why 997 out of 1,000 startups fail due to lack of clarity. Stop building in the dark. Start with the conversation that changes everything.',
    images: ['/og-manifest.jpg'],
  },
  keywords: 'startup manifesto, founder clarity, brand strategy philosophy, startup failure reasons, brand-first approach',
  authors: [{ name: 'Maximilian Appelt', url: 'https://brandkernel.io' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://brandkernel.io/manifest',
  }
};

export default function ManifestPage() {
  return (
    <div className="min-h-screen bg-white text-brand-black py-32">
      <div className="max-w-4xl mx-auto px-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-brand-black mb-8 font-normal leading-tight">
            The Clarity Manifesto
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-12 text-left">
          
          {/* Opening Statement */}
          <div className="text-center">
            <p style={{ 
              fontSize: '1.5rem', 
              lineHeight: '2rem',
              fontWeight: 'bold'
            }} className="text-brand-black">
              We believe every founder is one conversation away from changing everything.
            </p>
            <p style={{ 
              fontSize: '1.25rem', 
              lineHeight: '1.75rem'
            }} className="text-brand-black mt-4">
              Not one feature away. Not one investor away. Not one viral post away.
            </p>
            <p style={{ 
              fontSize: '1.25rem', 
              lineHeight: '1.75rem',
              fontWeight: 'bold'
            }} className="text-brand-black mt-2">
              One. Conversation. Away.
            </p>
          </div>

          {/* The Lie We've All Bought */}
          <div>
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-6">
              The Lie We've All Bought
            </h2>
            <div style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.75rem'
            }} className="text-brand-black space-y-4">
              <p>They told you to build first, brand later. To focus on product-market fit before finding your voice. To copy what works until you figure out what's yours.</p>
              <p className="font-bold">That's why 997 out of 1,000 startups disappear.</p>
              <p>They built in the dark. They never found their light.</p>
            </div>
          </div>

          {/* The Truth About Breakthrough */}
          <div>
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-6">
              The Truth About Breakthrough
            </h2>
            <div style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.75rem'
            }} className="text-brand-black space-y-4">
              <p>Your breakthrough isn't hiding in another course, template, or AI tool. It's buried inside you, waiting for the right questions to set it free.</p>
              <p>We've watched it happen over and over:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The moment a founder realizes WHY they're really building this.</li>
                <li>The second a freelancer discovers what makes them irreplaceable.</li>
                <li>The instant a creator sees their true value beyond the likes.</li>
              </ul>
              <p className="font-bold">That moment? That's clarity. And clarity changes everything.</p>
            </div>
          </div>

          {/* What We Stand For */}
          <div>
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-6">
              What We Stand For
            </h2>
            <div style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.75rem'
            }} className="text-brand-black space-y-4">
              <p><strong>Deep over surface.</strong> We ask the questions others are afraid to ask.</p>
              <p><strong>Identity before strategy.</strong> Know who you are, and the strategy writes itself.</p>
              <p><strong>Guided discovery over generic frameworks.</strong> Your truth can't be found in someone else's template.</p>
              <p><strong>Transformation over information.</strong> We're not here to teach. We're here to unlock.</p>
              <p className="font-bold text-center mt-8">One conversation. That's all it takes to begin.</p>
            </div>
          </div>

          {/* The Invitation */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-6 text-center">
              The Invitation
            </h2>
            <div style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.75rem'
            }} className="text-brand-black space-y-4 text-center">
              <p>Stop building in the dark. Stop copying what works for others. Stop wondering why you're still invisible.</p>
              <p className="font-bold">Start with the conversation that changes everything.</p>
              <p className="font-bold">Your clarity is waiting.</p>
            </div>
            
            {/* CTA */}
            <div className="flex justify-center mt-8">
              <a href="/waitlist" style={{ 
                fontSize: '1rem', 
                lineHeight: '1.5rem', 
                fontWeight: 'bold' 
              }} className="bg-[#957FFF] text-white px-10 py-3 rounded-full hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block">
                Join the Waitlist →
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}