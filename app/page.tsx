import { Metadata } from 'next';
import Header from '@/components/Header';
import SolutionsSection from '@/components/SolutionsSection';
import ClientCtaButtons from '@/components/ClientCtaButtons';
import CtaButton from '@/components/CtaButton';
import BrandChatbot from '@/components/BrandChatbot';
import { formatWaitlistCount } from '@/lib/waitlist-counter';

export const metadata: Metadata = {
  title: 'BrandKernel - Finally. The Conversation That Changes Everything.',
  description: 'You\'re a brilliant founder lost in the noise. One strategic dialogue away from the clarity that makes you unstoppable. Welcome to your breakthrough.',
  keywords: 'brand clarity, founder positioning, strategic dialogue, brand strategy, personal branding, startup clarity',
  authors: [{ name: 'Max, Founder' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'BrandKernel - Finally. The Conversation That Changes Everything.',
    description: 'You\'re a brilliant founder lost in the noise. One strategic dialogue away from the clarity that makes you unstoppable.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrandKernel - Finally. The Conversation That Changes Everything.',
    description: 'You\'re a brilliant founder lost in the noise. One strategic dialogue away from the clarity that makes you unstoppable.',
  }
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-white">
      
      {/* Hero Section with Chatbot */}
      <main>
        {/* Mobile Layout: Chat first, then content below */}
        <div className="lg:hidden relative">
          {/* Mobile Chat Section with Gradient Background */}
          <section className="min-h-screen flex items-center justify-center relative" style={{
            background: 'linear-gradient(180deg, #DAFF96 0%, #957FFF 100%)'
          }}>
            <Header variant="transparent" fixed={true} />
            <div className="w-full max-w-sm h-full max-h-[600px] p-6 pt-20">
              <BrandChatbot />
            </div>
          </section>
          
          {/* Mobile Content Section - Below Chat */}
          <section className="bg-white py-12 px-4">
            <div className="max-w-2xl mx-auto text-center">
              {/* Hero Heading */}
              <h1 className="text-brand-black text-3xl sm:text-4xl font-normal leading-tight pb-8">
                Finally. The Conversation That Changes Everything.
              </h1>
              
              {/* Hero Subheadline */}
              <div className="text-brand-black text-base font-bold leading-relaxed pb-8">
                <p>You're a brilliant founder lost in the noise. One strategic dialogue away from the clarity that makes you unstoppable. Welcome to your breakthrough.</p>
              </div>

              {/* Profession Selection */}
              <div className="mb-8">
                <p className="text-brand-black text-base font-bold leading-relaxed mb-6">First, choose your profession</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a href="/freelancer" className="bg-[#957FFF] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block text-sm">
                    Freelancer
                  </a>
                  <a href="/founder" className="bg-[#957FFF] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block text-sm">
                    Founder
                  </a>
                  <a href="/creator" className="bg-[#957FFF] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block text-sm">
                    Creator
                  </a>
                </div>
              </div>

              {/* Waitlist Form */}
              <div className="w-full">
                <div className="flex flex-col items-center gap-4">
                  <p className="text-brand-black text-base font-bold">Join our Waitlist</p>
                  <div className="w-full max-w-md">
                    <input
                      type="email"
                      placeholder="name@email.com"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAFF96] focus:border-transparent text-base shadow-sm"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="bg-[#DAFF96] text-brand-black p-3 rounded-lg hover:bg-[#DAFF96]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <p className="text-brand-black/80 text-base">{formatWaitlistCount()}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Desktop Layout: Side by side */}
        <section id="home" className="hidden lg:flex min-h-screen absolute top-0 left-0 right-0" style={{ zIndex: 1 }}>
          <Header variant="transparent" fixed={true} />
          {/* Desktop: Text content on left */}
          <div className="w-[50vw] bg-white flex flex-col relative min-h-screen">
            <div className="flex-1 flex flex-col justify-between items-center px-6" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
              {/* Text Block - Center of left side */}
              <div className="text-center max-w-2xl">
                {/* Hero Heading */}
                <h1 className="text-brand-black text-6xl xl:text-7xl 2xl:text-8xl font-normal leading-tight pt-24 pb-12 px-8">
                  Finally. The Conversation That Changes Everything.
                </h1>
                
                {/* Hero Subheadline */}
                <div className="text-brand-black text-xl font-bold leading-relaxed pb-8 px-8">
                  <p>You're a brilliant founder lost in the noise. One strategic dialogue away from the clarity that makes you unstoppable. Welcome to your breakthrough.</p>
                </div>

                {/* Profession Selection */}
                <div className="mb-8 px-8">
                  <p className="text-brand-black text-lg font-bold leading-relaxed mb-6">First, choose your profession</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <a href="/freelancer" className="bg-[#957FFF] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block text-base">
                      Freelancer
                    </a>
                    <a href="/founder" className="bg-[#957FFF] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block text-base">
                      Founder
                    </a>
                    <a href="/creator" className="bg-[#957FFF] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block text-base">
                      Creator
                    </a>
                  </div>
                </div>
              </div>

              {/* Waitlist Form - Bottom of Hero */}
              <div className="w-full max-w-2xl px-8">
                <div className="flex items-center gap-4">
                  <p className="text-brand-black text-base font-bold whitespace-nowrap">Join our Waitlist</p>
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
                  <p className="text-brand-black/80 text-base whitespace-nowrap">{formatWaitlistCount()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Chat on right */}
          <div className="w-[50vw] relative min-h-screen" style={{
            background: 'linear-gradient(180deg, #DAFF96 0%, #957FFF 100%)'
          }}>
            {/* Chat Window - Medium */}
            <div className="absolute inset-0 flex items-center justify-center p-8" style={{ paddingTop: '5rem' }}>
              <div className="w-full max-w-lg h-full max-h-[500px]">
                <BrandChatbot />
              </div>
            </div>
          </div>
        </section>

        {/* Body Content Section */}
        <section className="py-20 bg-white lg:mt-[calc(100vh+3rem)]">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              
              {/* Body Copy */}
              <div style={{ 
                fontSize: '1.125rem', 
                lineHeight: '1.75rem'
              }} className="text-brand-black space-y-6 mb-16">
                <p>You've tried everything.</p>
                <p>But you're still stuck. Still invisible. Still wondering why your brilliance isn't breaking through.</p>
                <p>Here's what nobody tells you: You're not missing tactics. You're missing clarity.</p>
                <p>The breakthrough you need isn't in another framework. It's in the conversation you haven't had yet. The one that uncovers who you really are, why you're building this, and how to make the world finally pay attention.</p>
                
                <div className="grid md:grid-cols-3 gap-8 mt-12 mb-12">
                  <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-6 text-center">
                    <h3 className="font-bold text-lg mb-3 text-[#957FFF]">For Founders</h3>
                    <p>Transform from invisible builder to industry voice</p>
                  </div>
                  <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-6 text-center">
                    <h3 className="font-bold text-lg mb-3 text-[#957FFF]">For Freelancers</h3>
                    <p>Escape the commodity trap with crystal-clear positioning</p>
                  </div>
                  <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-6 text-center">
                    <h3 className="font-bold text-lg mb-3 text-[#957FFF]">For Creators</h3>
                    <p>Turn followers into a real business with strategic clarity</p>
                  </div>
                </div>
                
                <p className="font-bold text-xl">Your breakthrough is waiting.</p>
              </div>

              {/* Max Quote - Big */}
              <div className="w-full max-w-6xl mx-auto bg-white p-8 lg:p-16 rounded-lg text-center">
                <blockquote className="text-[#957FFF] mb-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight lg:leading-tight">
                  « After 20 years of brand consulting, I discovered the secret: The best brands aren't built. They're uncovered through the right conversation. BrandKernel is that conversation. »
                </blockquote>
                <p className="text-lg lg:text-xl xl:text-2xl text-[#957FFF] font-medium">
                  - Max, Founder
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Manifest Section */}
        <section id="manifest" className="py-20 bg-white" style={{ marginTop: '3rem' }}>
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-brand-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight mb-8 sm:mb-12 px-4 sm:px-6 md:px-8">
                The Clarity Manifesto
              </h2>
              <p style={{ fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: 'bold' }} className="text-brand-black mb-6">
                We believe every founder is one conversation away from changing everything.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: '1.5rem' }} className="text-brand-black mb-12">
                Not one feature away. Not one investor away. Not one viral post away. One. Conversation. Away. The breakthrough you've been searching for isn't in another tactic, template, or framework. It's in the strategic dialogue that uncovers who you really are, why you're building this, and how to make the world finally pay attention. We reject the template trap and the copy-paste culture that makes everyone sound the same. Instead, we believe in deep work, uncomfortable questions, and the transformative power of discovering your authentic truth.
              </p>
              
              {/* Key Points */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">The Truth About Breakthrough</h3>
                  <p className="text-brand-black">Your breakthrough isn't hiding in another course, template, or AI tool. It's buried inside you, waiting for the right questions to set it free.</p>
                </div>
                <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">What We Stand For</h3>
                  <p className="text-brand-black">Deep over surface. Identity before strategy. Guided discovery over generic frameworks. Transformation over information.</p>
                </div>
              </div>
              
              <a href="/manifest" style={{ fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 'bold' }} className="bg-[#957FFF] text-white px-8 py-3 rounded-full hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block">
                Read Full Manifesto
              </a>
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section id="approach" className="py-20 bg-white" style={{ marginTop: '3rem' }}>
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-brand-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight mb-8 sm:mb-12 px-4 sm:px-6 md:px-8">
                Guided Discovery, Not Generic Answers
              </h2>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.75rem' }} className="text-brand-black mb-6">
                Courses give you someone else's framework. Templates force you into someone else's box. Coaches tell you what worked for someone else. AI tools regurgitate what everyone else is saying. We start with a different question: Who the hell are you, really?
              </p>
              <p style={{ fontSize: '1rem', lineHeight: '1.5rem' }} className="text-brand-black mb-12">
                Through systematic dialogue and strategic archaeology, we dig past the surface story you tell at networking events, past the LinkedIn bio you've tweaked 47 times, down to the bedrock truth of why you're building this. We uncover your authentic foundation, transform it into crystal-clear positioning through careful alchemy, and build the bridge from revelation to reality with concrete activation blueprints. This isn't therapy—it's strategic discovery that leads to breakthrough positioning.
              </p>
              
              {/* Method Steps */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">Phase 1: Archaeology of You</h3>
                  <p className="text-brand-black text-sm">We dig deep. Past the surface story to the bedrock truth of why you're building this.</p>
                </div>
                <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">Phase 2: Alchemy of Positioning</h3>
                  <p className="text-brand-black text-sm">Raw truth becomes crystal-clear positioning that feels like finally exhaling.</p>
                </div>
                <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">Phase 3: Architecture of Activation</h3>
                  <p className="text-brand-black text-sm">Clarity becomes action with your complete Brand Kernel and activation blueprints.</p>
                </div>
              </div>
              
              <a href="/approach" style={{ fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 'bold' }} className="bg-[#957FFF] text-white px-8 py-3 rounded-full hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block">
                Learn Our Method
              </a>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white" style={{ marginTop: '3rem' }}>
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-brand-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight mb-8 sm:mb-12 px-4 sm:px-6 md:px-8">
                From Lost to Laser-Focused
              </h2>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.75rem' }} className="text-brand-black mb-6">
                Your clarity breakthrough in 4 progressive levels: Foundation Discovery → Position Clarification → Voice Activation → Strategy Crystallization.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: '1.5rem' }} className="text-brand-black mb-12">
                In 3-4 hours of guided dialogue, you go from lost to laser-focused. From invisible to inevitable. From confused to clear. Each level builds on the last, creating compound insights that lead to breakthrough moments. We start with the questions you've been avoiding, map your unique position in the market, unlock your authentic voice, and transform insight into actionable strategy. This isn't a course you take—it's a conversation that changes everything about how you see yourself and your business.
              </p>
              
              {/* 4 Levels */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-4 text-center">
                  <div className="bg-[#DAFF96] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-brand-black font-bold">1</span>
                  </div>
                  <h3 className="font-bold text-sm mb-2">Foundation Discovery</h3>
                  <p className="text-brand-black text-xs">45-60 minutes</p>
                </div>
                <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-4 text-center">
                  <div className="bg-[#957FFF] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="font-bold text-sm mb-2">Position Clarification</h3>
                  <p className="text-brand-black text-xs">30-45 minutes</p>
                </div>
                <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-4 text-center">
                  <div className="bg-[#DAFF96] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-brand-black font-bold">3</span>
                  </div>
                  <h3 className="font-bold text-sm mb-2">Voice Activation</h3>
                  <p className="text-brand-black text-xs">30-45 minutes</p>
                </div>
                <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-4 text-center">
                  <div className="bg-[#957FFF] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <h3 className="font-bold text-sm mb-2">Strategy Crystallization</h3>
                  <p className="text-brand-black text-xs">30-45 minutes</p>
                </div>
              </div>
              
              <a href="/how-it-works" style={{ fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 'bold' }} className="bg-[#957FFF] text-white px-8 py-3 rounded-full hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block">
                See the Journey
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white" style={{ marginTop: '3rem' }}>
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-brand-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight mb-8 sm:mb-12 px-4 sm:px-6 md:px-8">
                Features That Transform
              </h2>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.75rem' }} className="text-brand-black mb-6">
                Not another template tool. Not another AI chatbot. Not another generic framework. A strategic AI guide trained on thousands of breakthrough conversations and decades of brand wisdom.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: '1.5rem' }} className="text-brand-black mb-12">
                Our AI Brand Consultant doesn't just ask questions—it listens for what you're not saying, connects dots you didn't see, and guides you to your own truth. Complete with your comprehensive Brand Kernel Book that captures every insight, visual clarity maps that help you see your breakthrough, and detailed activation blueprints that turn clarity into concrete action. The experience adapts to your communication style, celebrates your breakthrough moments, and provides reflection spaces for deep integration. This is what 20 years of brand consulting, distilled into one transformative dialogue, looks like.
              </p>
              
              {/* Key Features */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">Strategic AI Guide</h3>
                  <p className="text-brand-black mb-3">Not a chatbot. A trained brand strategist that asks the questions that unlock breakthrough, listens for what you're not saying, and guides you to your own truth.</p>
                  <p className="text-sm text-brand-black/70">Because the best answers come from the right questions.</p>
                </div>
                <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">Your Brand Kernel Book</h3>
                  <p className="text-brand-black mb-3">Your living strategic document that captures every breakthrough insight, your crystallized positioning, your authentic voice, and your action framework.</p>
                  <p className="text-sm text-brand-black/70">Because clarity deserves documentation.</p>
                </div>
                <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">Activation Blueprints</h3>
                  <p className="text-brand-black mb-3">Turn clarity into action with content strategy frameworks, network building plans, message templates, and growth roadmaps.</p>
                  <p className="text-sm text-brand-black/70">Because insight without action is just expensive therapy.</p>
                </div>
                <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">Visual Clarity Maps</h3>
                  <p className="text-brand-black mb-3">See your breakthrough in positioning matrices, voice spectrums, audience alignment charts, and competition landscapes.</p>
                  <p className="text-sm text-brand-black/70">Because sometimes you need to see it to believe it.</p>
                </div>
              </div>
              
              <a href="/features" style={{ fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 'bold' }} className="bg-[#957FFF] text-white px-8 py-3 rounded-full hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block">
                See All Features
              </a>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white" style={{ marginTop: '3rem' }}>
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-brand-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight mb-8 sm:mb-12 px-4 sm:px-6 md:px-8">
                Your Clarity Investment
              </h2>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.75rem' }} className="text-brand-black mb-6">
                €297 (Early founder pricing, soon to be €497) - One investment. Lifetime clarity. Your identity doesn't expire, and neither does your access.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: '1.5rem' }} className="text-brand-black mb-12">
                What confusion costs you monthly: 40+ hours building the wrong things, countless missed opportunities because you can't articulate your value, competitors pulling ahead with clearer positioning, and immeasurable creative energy drained by uncertainty. What clarity creates immediately: knowing exactly what to build next, articulating your value in one powerful sentence, attracting the right opportunities automatically, and feeling confident in every founder conversation. Complete 4-level guided journey, your personal AI brand strategist, comprehensive Brand Kernel Book, all visual clarity maps, complete activation blueprints, and lifetime access to your strategic foundation. The math is simple. The transformation is profound.
              </p>
              
              {/* Value Proposition */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">What You Get</h3>
                  <ul className="text-brand-black text-sm space-y-2 text-left">
                    <li>✓ Complete 4-level guided journey</li>
                    <li>✓ Your personal AI brand strategist</li>
                    <li>✓ Full Brand Kernel Book</li>
                    <li>✓ All visual clarity maps</li>
                    <li>✓ Complete activation blueprints</li>
                    <li>✓ Lifetime access to your foundation</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-[#DAFF96] rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3">The ROI Reality</h3>
                  <div className="text-brand-black text-sm space-y-2 text-left">
                    <p>Win one ideal client → <span className="font-bold text-[#957FFF]">10x return</span></p>
                    <p>Raise your rates with confidence → <span className="font-bold text-[#957FFF]">100x return</span></p>
                    <p>Build audience that converts → <span className="font-bold text-[#957FFF]">1000x return</span></p>
                    <p>Find product-market fit faster → <span className="font-bold text-[#957FFF]">Priceless</span></p>
                  </div>
                </div>
              </div>
              
              <a href="/pricing" style={{ fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 'bold' }} className="bg-[#957FFF] text-white px-8 py-3 rounded-full hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block">
                See Investment Details
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-brand-white py-12">
        <div className="container mx-auto px-6">
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
