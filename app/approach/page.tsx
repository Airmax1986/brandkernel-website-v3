import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Approach - Guided Discovery Method | BrandKernel",
  description: "Discover BrandKernel's unique approach to brand strategy. Unlike generic templates, we use guided discovery to uncover your authentic positioning through strategic dialogue.",
  keywords: "brand approach, guided discovery, authentic branding, strategic positioning, brand methodology, unique brand strategy",
  authors: [{ name: "BrandKernel Team" }],
  openGraph: {
    title: "Our Approach - Guided Discovery, Not Generic Answers",
    description: "Learn how BrandKernel's guided discovery method helps founders uncover their authentic brand positioning through strategic dialogue.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Approach - Guided Discovery, Not Generic Answers",
    description: "Learn how BrandKernel's guided discovery method helps founders uncover their authentic brand positioning through strategic dialogue.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ApproachPage() {
  return (
    <div className="min-h-screen bg-white text-brand-black py-32">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-brand-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal leading-tight mb-8 px-4 sm:px-6 md:px-8">
            Guided Discovery, Not Generic Answers
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-16">
          
          {/* The Problem With Every Other Solution */}
          <section>
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8">
              The Problem With Every Other Solution
            </h2>
            <div style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.75rem'
            }} className="text-brand-black space-y-4">
              <p>Courses give you someone else's framework. Templates force you into someone else's box. Coaches tell you what worked for someone else. AI tools regurgitate what everyone else is saying.</p>
              <p className="font-bold text-center text-xl mt-8">No wonder you're still lost.</p>
            </div>
          </section>

          {/* The BrandKernel Method */}
          <section>
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8">
              The BrandKernel Method: Your Truth, Systematically Uncovered
            </h2>
            
            {/* We Start Where Others Fear to Go */}
            <div className="mb-12">
              <h3 style={{ 
                fontSize: '1.5rem', 
                lineHeight: '2rem',
                fontWeight: 'bold'
              }} className="text-brand-black mb-4">
                We Start Where Others Fear to Go
              </h3>
              <p style={{ 
                fontSize: '1.125rem', 
                lineHeight: '1.75rem'
              }} className="text-brand-black mb-4">
                Most approaches start with tactics. "Here's how to position yourself." "Here's your personal brand template." "Here's what your website should say."
              </p>
              <p style={{ 
                fontSize: '1.125rem', 
                lineHeight: '1.75rem',
                fontWeight: 'bold'
              }} className="text-brand-black">
                We start with a different question: Who the hell are you, really?
              </p>
            </div>

            {/* Three Phases */}
            <div className="grid gap-12 md:gap-16">
              
              {/* Phase 1 */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 style={{ 
                  fontSize: '1.75rem', 
                  lineHeight: '2.25rem',
                  fontWeight: 'bold'
                }} className="text-brand-black mb-6">
                  Phase 1: The Archaeology of You
                </h3>
                <div style={{ 
                  fontSize: '1.125rem', 
                  lineHeight: '1.75rem'
                }} className="text-brand-black space-y-4">
                  <p>We dig deep. Past the surface story you tell at networking events. Past the LinkedIn bio you've tweaked 47 times. Down to the bedrock truth of why you're building this.</p>
                  <p>Through strategic dialogue, we uncover:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>The moment you knew you had to build this</li>
                    <li>The problem that keeps you up at night</li>
                    <li>The change you must see in the world</li>
                    <li>The unique lens only you possess</li>
                  </ul>
                  <p className="font-bold italic">This isn't therapy. It's strategic archaeology.</p>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 style={{ 
                  fontSize: '1.75rem', 
                  lineHeight: '2.25rem',
                  fontWeight: 'bold'
                }} className="text-brand-black mb-6">
                  Phase 2: The Alchemy of Positioning
                </h3>
                <div style={{ 
                  fontSize: '1.125rem', 
                  lineHeight: '1.75rem'
                }} className="text-brand-black space-y-4">
                  <p>Raw truth isn't enough. It needs to be refined, shaped, focused into something the market can understand and value.</p>
                  <p>We transform your discovery into:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Crystal-clear positioning that feels like finally exhaling</li>
                    <li>A value proposition that makes competitors irrelevant</li>
                    <li>An authentic voice that can't be copied</li>
                    <li>A strategic narrative that attracts your perfect people</li>
                  </ul>
                  <p className="font-bold italic">This isn't wordsmithing. It's alchemy.</p>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 style={{ 
                  fontSize: '1.75rem', 
                  lineHeight: '2.25rem',
                  fontWeight: 'bold'
                }} className="text-brand-black mb-6">
                  Phase 3: The Architecture of Activation
                </h3>
                <div style={{ 
                  fontSize: '1.125rem', 
                  lineHeight: '1.75rem'
                }} className="text-brand-black space-y-4">
                  <p>Clarity without action is just expensive insight. We build the bridge from revelation to reality.</p>
                  <p>Your breakthrough becomes:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>A complete Brand Kernel - your single source of truth</li>
                    <li>Message frameworks that write themselves</li>
                    <li>Content strategies that flow naturally</li>
                    <li>Network approaches that feel authentic</li>
                  </ul>
                  <p className="font-bold italic">This isn't theory. It's architecture for action.</p>
                </div>
              </div>

            </div>
          </section>

          {/* Why This Works */}
          <section>
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8">
              Why This Works When Everything Else Failed
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">It's a dialogue, not a download.</h4>
                  <p className="text-gray-700">We don't give you answers. We help you uncover them.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">It's systematic, not random.</h4>
                  <p className="text-gray-700">Every question builds on the last, leading inevitably to breakthrough.</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">It's yours, not borrowed.</h4>
                  <p className="text-gray-700">The clarity you find can't be copied because it comes from your truth.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">It's immediate, not someday.</h4>
                  <p className="text-gray-700">One conversation. Real breakthrough. Today.</p>
                </div>
              </div>
            </div>
          </section>

          {/* The Guide Makes the Difference */}
          <section className="bg-gradient-to-r from-[#DAFF96] to-[#957FFF] p-8 rounded-lg text-white">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="mb-6">
              The Guide Makes the Difference
            </h2>
            <div style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.75rem'
            }} className="space-y-4">
              <p>Our AI Brand Consultant isn't just smart. It's wise. Trained on thousands of breakthrough conversations. Programmed to ask what others won't. Designed to hear what you're not saying.</p>
              <p className="font-bold">This is what 20 years of brand consulting, distilled into one transformative dialogue, looks like.</p>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <p style={{ 
              fontSize: '1.5rem', 
              lineHeight: '2rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8">
              Your breakthrough is one conversation away.
            </p>
            <a href="/waitlist" style={{ 
              fontSize: '1rem', 
              lineHeight: '1.5rem', 
              fontWeight: 'bold' 
            }} className="bg-[#957FFF] text-white px-8 py-3 rounded-full hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block">
              Join the Waitlist →
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}