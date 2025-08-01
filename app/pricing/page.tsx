import CtaButton from "@/components/CtaButton";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-brand-black py-32">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 style={{ 
            fontSize: '6rem', 
            lineHeight: '6rem',
            fontWeight: 'normal'
          }} className="text-brand-black mb-8">
            Your Clarity Investment
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-16">
          
          {/* The Math of Staying Lost */}
          <section className="bg-gray-50 p-8 rounded-lg">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8 text-center">
              The Math of Staying Lost
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-bold text-xl text-brand-black mb-4">What confusion costs monthly:</h3>
                <ul className="space-y-3 text-brand-black">
                  <li>• 40+ hours building the wrong things</li>
                  <li>• 10+ opportunities missed because you can't articulate value</li>
                  <li>• 5+ competitors pulling ahead with clearer positioning</li>
                  <li>• Countless moments of imposter syndrome</li>
                  <li>• Immeasurable creative energy drained</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-xl text-brand-black mb-4">What clarity creates immediately:</h3>
                <ul className="space-y-3 text-brand-black">
                  <li>• Know exactly what to build next</li>
                  <li>• Articulate your value in one sentence</li>
                  <li>• Attract the right opportunities automatically</li>
                  <li>• Feel confident in every founder conversation</li>
                  <li>• Channel all energy toward your true mission</li>
                </ul>
              </div>
            </div>
          </section>

          {/* The Breakthrough Investment */}
          <section className="text-center">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-12">
              The Breakthrough Investment
            </h2>
            
            <div className="bg-gradient-to-r from-[#DAFF96] to-[#957FFF] p-12 rounded-lg text-white max-w-4xl mx-auto">
              <h3 style={{ 
                fontSize: '2rem', 
                lineHeight: '2.5rem',
                fontWeight: 'bold'
              }} className="mb-4">
                Brand Kernel Journey
              </h3>
              
              <div className="mb-6">
                <p style={{ 
                  fontSize: '4rem', 
                  lineHeight: '4.5rem',
                  fontWeight: 'bold'
                }} className="mb-2">
                  €297
                </p>
                <p className="text-lg">(Early founder pricing)</p>
                <p className="text-sm opacity-90 mt-2">Soon to be €497</p>
              </div>
              
              <p style={{ 
                fontSize: '1.25rem', 
                lineHeight: '1.75rem',
                fontWeight: 'bold'
              }} className="mb-8">
                One investment. Lifetime clarity.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <ul className="space-y-3">
                    <li>✓ Complete 4-level guided journey</li>
                    <li>✓ Your personal AI brand strategist</li>
                    <li>✓ Full Brand Kernel Book</li>
                    <li>✓ All visual clarity maps</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-3">
                    <li>✓ Complete activation blueprints</li>
                    <li>✓ Lifetime access to your foundation</li>
                    <li>✓ Free updates as we evolve</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <h4 className="font-bold text-lg text-brand-black mb-4">Compare to:</h4>
              <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
                <div>Brand consultant: €10,000-50,000</div>
                <div>Executive coach: €500/hour minimum</div>
                <div>Positioning workshop: €5,000+</div>
                <div>Staying lost: Priceless opportunities missed daily</div>
              </div>
            </div>
          </section>

          {/* Why One-Time Pricing */}
          <section className="bg-gray-50 p-8 rounded-lg">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8 text-center">
              Why One-Time Pricing?
            </h2>
            <div className="text-center max-w-3xl mx-auto">
              <p style={{ 
                fontSize: '1.25rem', 
                lineHeight: '1.75rem'
              }} className="text-brand-black mb-6">
                Your identity doesn't expire. Your truth doesn't need a subscription. Your breakthrough shouldn't have recurring fees.
              </p>
              <p style={{ 
                fontSize: '1.125rem', 
                lineHeight: '1.75rem',
                fontWeight: 'bold'
              }} className="text-brand-black">
                Once you have clarity, you have it forever.
              </p>
            </div>
          </section>

          {/* The ROI Reality */}
          <section>
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8 text-center">
              The ROI Reality
            </h2>
            
            <div className="bg-white border-2 border-gray-200 p-8 rounded-lg max-w-4xl mx-auto">
              <p className="text-brand-black mb-6 text-center">If BrandKernel helps you:</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Win one ideal client</span>
                    <span className="font-bold text-[#957FFF]">→ 10x return</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Raise your rates with confidence</span>
                    <span className="font-bold text-[#957FFF]">→ 100x return</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Build an audience that converts</span>
                    <span className="font-bold text-[#957FFF]">→ 1000x return</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Find product-market fit faster</span>
                    <span className="font-bold text-[#957FFF]">→ Incalculable return</span>
                  </div>
                </div>
              </div>
              
              <p className="text-center mt-8 font-bold text-brand-black">The math is simple. The transformation is profound.</p>
            </div>
          </section>

          {/* Zero-Risk Clarity */}
          <section className="bg-[#DAFF96] p-8 rounded-lg">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8 text-center">
              Zero-Risk Clarity
            </h2>
            
            <div className="text-center max-w-3xl mx-auto">
              <h3 style={{ 
                fontSize: '1.5rem', 
                lineHeight: '2rem',
                fontWeight: 'bold'
              }} className="text-brand-black mb-4">
                30-Day Breakthrough Guarantee
              </h3>
              <p className="text-brand-black mb-6">
                If you complete the journey and don't experience a genuine breakthrough in how you see yourself and your business, get a full refund.
              </p>
              <p className="font-bold text-brand-black">No questions. No hassle. No risk.</p>
              <p className="text-brand-black mt-4 italic">
                That's how confident we are in the conversation that changes everything.
              </p>
            </div>
          </section>

          {/* Early Founder Advantages */}
          <section className="bg-[#957FFF] p-8 rounded-lg text-white">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="mb-8 text-center">
              Early Founder Advantages
            </h2>
            
            <div className="text-center max-w-3xl mx-auto">
              <h3 style={{ 
                fontSize: '1.5rem', 
                lineHeight: '2rem',
                fontWeight: 'bold'
              }} className="mb-6">
                Join the Waitlist Today:
              </h3>
              
              <ul className="space-y-3 text-left inline-block">
                <li>✓ Lock in €297 pricing (save €200)</li>
                <li>✓ First access when we launch</li>
                <li>✓ Founding member status</li>
                <li>✓ Direct input on development</li>
                <li>✓ Exclusive founder community</li>
              </ul>
            </div>
          </section>

          {/* Coming Next */}
          <section className="bg-gray-50 p-8 rounded-lg">
            <h2 style={{ 
              fontSize: '2rem', 
              lineHeight: '2.5rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8 text-center">
              Coming Next: Clarity Activation Suite
            </h2>
            <p className="text-gray-600 text-center mb-6">(Post-launch addition)</p>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-brand-black mb-4">Monthly tools to activate your clarity:</p>
              <ul className="text-brand-black space-y-2 mb-6">
                <li>• AI-powered content generation using your Brand Kernel</li>
                <li>• Campaign frameworks</li>
                <li>• Pitch deck builders</li>
                <li>• Network strategies</li>
                <li>• New tools monthly</li>
              </ul>
              <p className="text-center text-gray-600">Estimated: €29/month (optional after your journey)</p>
            </div>
          </section>

          {/* The Decision */}
          <section className="text-center">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-12">
              The Decision
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-12">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="font-bold text-xl text-brand-black mb-4">Path 1: Keep Searching</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Another course that doesn't fit</li>
                  <li>Another template that feels fake</li>
                  <li>Another year of being invisible</li>
                  <li>Another competitor pulling ahead</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="font-bold text-xl text-brand-black mb-4">Path 2: Find Your Clarity</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>One conversation that changes everything</li>
                  <li>Your truth, systematically uncovered</li>
                  <li>Your position, crystal clear</li>
                  <li>Your future, finally focused</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-12">
              <p style={{ 
                fontSize: '1.25rem', 
                lineHeight: '1.75rem'
              }} className="text-brand-black mb-4">
                The breakthrough you've been searching for isn't in another tactic.
              </p>
              <p style={{ 
                fontSize: '1.25rem', 
                lineHeight: '1.75rem',
                fontWeight: 'bold'
              }} className="text-brand-black">
                It's in the conversation you haven't had yet.
              </p>
            </div>
            
            <div className="mb-8">
              <a href="/waitlist" style={{ 
                fontSize: '1.25rem', 
                lineHeight: '1.75rem', 
                fontWeight: 'bold' 
              }} className="bg-[#957FFF] text-white px-12 py-4 rounded-full hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block">
                Join Waitlist - Start Your Breakthrough →
              </a>
            </div>
            
            <div className="text-center text-gray-600">
              <p>Joining founders: 400+</p>
              <p>Waitlist spots remaining: Limited</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}