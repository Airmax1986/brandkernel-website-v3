import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Brand Kernel Works - 4-Level Journey to Brand Clarity',
  description: 'Discover how BrandKernel\'s 4-level system transforms founders from confusion to clarity. Foundation Discovery → Position Clarification → Voice Activation → Strategy Crystallization in 3-4 hours total.',
  openGraph: {
    title: 'How BrandKernel Works: 4-Level Journey From Lost to Laser-Focused',
    description: 'Discover how BrandKernel\'s 4-level system transforms founders from confusion to clarity. Foundation Discovery → Position Clarification → Voice Activation → Strategy Crystallization in 3-4 hours total.',
    type: 'website',
    url: 'https://www.brandkernel.io/how-it-works',
    siteName: 'BrandKernel',
    images: [
      {
        url: '/og-how-it-works.jpg',
        width: 1200,
        height: 630,
        alt: 'How BrandKernel Works - 4-Level Brand Clarity Journey',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How BrandKernel Works: 4-Level Journey From Lost to Laser-Focused',
    description: 'Discover how BrandKernel\'s 4-level system transforms founders from confusion to clarity. Foundation Discovery → Position Clarification → Voice Activation → Strategy Crystallization in 3-4 hours total.',
    images: ['/og-how-it-works.jpg'],
  },
  keywords: 'brand strategy process, founder brand journey, brand clarity method, startup positioning system, brand development steps',
  authors: [{ name: 'Maximilian Appelt', url: 'https://www.brandkernel.io' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.brandkernel.io/how-it-works',
  }
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white text-brand-black py-32">
      <div className="max-w-5xl mx-auto px-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-brand-black mb-8 font-normal leading-tight">
            From Lost to Laser-Focused in One Guided Journey
          </h1>
          <p className="text-xl md:text-2xl text-brand-black font-bold">
            Your Clarity Breakthrough in 4 Levels
          </p>
        </div>

        {/* Content */}
        <div className="space-y-16">
          
          {/* Level 1 */}
          <section>
            <div className="bg-gradient-to-r from-[#FF5A21] to-[#957FFF] p-8 rounded-lg text-white mb-8">
              <h2 style={{ 
                fontSize: '2rem', 
                lineHeight: '2.5rem',
                fontWeight: 'bold'
              }} className="mb-4">
                Level 1: Foundation Discovery
              </h2>
              <p style={{ 
                fontSize: '1.125rem', 
                lineHeight: '1.75rem'
              }}>
                Time: 45-60 minutes
              </p>
              <p style={{ 
                fontSize: '1.5rem', 
                lineHeight: '2rem',
                fontWeight: 'bold'
              }} className="mt-4">
                The Conversation That Changes Everything
              </p>
            </div>
            
            <div style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.75rem'
            }} className="text-brand-black space-y-6">
              <p>We start with the questions you've been avoiding:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>What drove you to build this? (The real reason, not the pitch deck version)</li>
                <li>What breaks your heart about your industry?</li>
                <li>What would the world lose if you quit tomorrow?</li>
                <li>What truth do you see that others miss?</li>
              </ul>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-bold text-[#957FFF]">Your Breakthrough:</p>
                <p>The authentic foundation everything else builds on.</p>
              </div>
            </div>
          </section>

          {/* Level 2 */}
          <section>
            <div className="bg-gradient-to-r from-[#957FFF] to-[#FF5A21] p-8 rounded-lg text-white mb-8">
              <h2 style={{ 
                fontSize: '2rem', 
                lineHeight: '2.5rem',
                fontWeight: 'bold'
              }} className="mb-4">
                Level 2: Position Clarification
              </h2>
              <p style={{ 
                fontSize: '1.125rem', 
                lineHeight: '1.75rem'
              }}>
                Time: 30-45 minutes
              </p>
              <p style={{ 
                fontSize: '1.5rem', 
                lineHeight: '2rem',
                fontWeight: 'bold'
              }} className="mt-4">
                From Invisible to Inevitable
              </p>
            </div>
            
            <div style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.75rem'
            }} className="text-brand-black space-y-6">
              <p>We map your unique position in the market:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your only-you perspective</li>
                <li>Your dream client's deepest need</li>
                <li>Your unfair advantages</li>
                <li>Your competition-proof angle</li>
              </ul>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-bold text-[#957FFF]">Your Breakthrough:</p>
                <p>Positioning so clear, competition becomes irrelevant.</p>
              </div>
            </div>
          </section>

          {/* Level 3 */}
          <section>
            <div className="bg-gradient-to-r from-[#FF5A21] to-[#957FFF] p-8 rounded-lg text-white mb-8">
              <h2 style={{ 
                fontSize: '2rem', 
                lineHeight: '2.5rem',
                fontWeight: 'bold'
              }} className="mb-4">
                Level 3: Voice Activation
              </h2>
              <p style={{ 
                fontSize: '1.125rem', 
                lineHeight: '1.75rem'
              }}>
                Time: 30-45 minutes
              </p>
              <p style={{ 
                fontSize: '1.5rem', 
                lineHeight: '2rem',
                fontWeight: 'bold'
              }} className="mt-4">
                From Mute to Magnetic
              </p>
            </div>
            
            <div style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.75rem'
            }} className="text-brand-black space-y-6">
              <p>We unlock your authentic voice:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your natural communication style</li>
                <li>Your core message themes</li>
                <li>Your story structures</li>
                <li>Your connection patterns</li>
              </ul>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-bold text-[#957FFF]">Your Breakthrough:</p>
                <p>A voice so authentic, it attracts the right people automatically.</p>
              </div>
            </div>
          </section>

          {/* Level 4 */}
          <section>
            <div className="bg-gradient-to-r from-[#957FFF] to-[#FF5A21] p-8 rounded-lg text-white mb-8">
              <h2 style={{ 
                fontSize: '2rem', 
                lineHeight: '2.5rem',
                fontWeight: 'bold'
              }} className="mb-4">
                Level 4: Strategy Crystallization
              </h2>
              <p style={{ 
                fontSize: '1.125rem', 
                lineHeight: '1.75rem'
              }}>
                Time: 30-45 minutes
              </p>
              <p style={{ 
                fontSize: '1.5rem', 
                lineHeight: '2rem',
                fontWeight: 'bold'
              }} className="mt-4">
                From Clarity to Conquest
              </p>
            </div>
            
            <div style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.75rem'
            }} className="text-brand-black space-y-6">
              <p>We transform insight into action:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Content pillars that flow naturally</li>
                <li>Network strategies that feel authentic</li>
                <li>Growth approaches aligned with who you are</li>
                <li>Daily practices that reinforce your positioning</li>
              </ul>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-bold text-[#957FFF]">Your Breakthrough:</p>
                <p>A complete playbook for building on your clarity.</p>
              </div>
            </div>
          </section>

          {/* What You Walk Away With */}
          <section className="bg-gray-50 p-8 rounded-lg">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8 text-center">
              What You Walk Away With
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  lineHeight: '2rem',
                  fontWeight: 'bold'
                }} className="text-brand-black mb-4">
                  Your Brand Kernel Book
                </h3>
                <p className="text-brand-black mb-4">Your complete strategic foundation in one place:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-brand-black">
                  <li><strong>Identity Core:</strong> Who you are, crystallized</li>
                  <li><strong>Position Map:</strong> Where you win, clarified</li>
                  <li><strong>Voice Guide:</strong> How you speak, captured</li>
                  <li><strong>Action Plan:</strong> What you do next, outlined</li>
                </ul>
              </div>
              
              <div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  lineHeight: '2rem',
                  fontWeight: 'bold'
                }} className="text-brand-black mb-4">
                  But More Importantly...
                </h3>
                <ul className="space-y-3 text-brand-black">
                  <li><strong>Confidence</strong> that comes from knowing exactly who you are</li>
                  <li><strong>Clarity</strong> that makes every decision easier</li>
                  <li><strong>Conviction</strong> that attracts the right opportunities</li>
                  <li><strong>Calm</strong> that comes from finally understanding your path</li>
                </ul>
              </div>
            </div>
          </section>

          {/* The Experience */}
          <section>
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8 text-center">
              The Experience
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-bold text-xl mb-4 text-red-600">Start: Confusion</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>"I don't know how to stand out"</li>
                  <li>"Everyone sounds the same"</li>
                  <li>"I'm brilliant but invisible"</li>
                </ul>
              </div>
              
              <div className="text-center">
                <h3 className="font-bold text-xl mb-4 text-yellow-600">Middle: Conversation</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Guided questions that go deep</li>
                  <li>Moments of recognition</li>
                  <li>Connections you didn't see coming</li>
                  <li>The "holy shit, that's it" moment</li>
                </ul>
              </div>
              
              <div className="text-center">
                <h3 className="font-bold text-xl mb-4 text-green-600">End: Clarity</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>"I know exactly who I am"</li>
                  <li>"I see my unique position"</li>
                  <li>"I understand why I matter"</li>
                  <li>"I know what to do next"</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why Founders Call It */}
          <section className="text-center">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8">
              Why Founders Call It "The Conversation That Changed Everything"
            </h2>
            <div style={{ 
              fontSize: '1.25rem', 
              lineHeight: '1.75rem'
            }} className="text-brand-black space-y-4 max-w-4xl mx-auto">
              <p>Because in 3-4 hours of guided dialogue, you go from lost to laser-focused. From invisible to inevitable. From confused to clear.</p>
              <p className="font-bold">No courses. No templates. No generic frameworks.</p>
              <p>Just you, the right questions, and the breakthrough waiting to happen.</p>
            </div>
            
            {/* CTA */}
            <div className="mt-12">
              <p style={{ 
                fontSize: '1.5rem', 
                lineHeight: '2rem',
                fontWeight: 'bold'
              }} className="text-brand-black mb-8">
                Ready for your clarity conversation?
              </p>
              <a href="/waitlist" style={{ 
                fontSize: '1rem', 
                lineHeight: '1.5rem', 
                fontWeight: 'bold' 
              }} className="bg-[#957FFF] text-white px-10 py-3 rounded-full hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block">
                Join the Waitlist →
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}