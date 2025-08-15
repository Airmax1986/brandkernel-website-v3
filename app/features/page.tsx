import CtaButton from "@/components/CtaButton";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Brand Strategy Features - Transform Your Brand Identity ● Brand Kernel',
  description: 'Discover BrandKernel\'s breakthrough AI features: The Clarity Engine, 4-Level System, Visual Maps & Activation Blueprints. Transform confusion into crystal-clear positioning in hours, not months.',
  openGraph: {
    title: 'AI Brand Strategy Features That Transform Founders | BrandKernel',
    description: 'Discover BrandKernel\'s breakthrough AI features: The Clarity Engine, 4-Level System, Visual Maps & Activation Blueprints. Transform confusion into crystal-clear positioning in hours, not months.',
    type: 'website',
    url: 'https://www.brandkernel.io/features',
    siteName: 'BrandKernel',
    images: [
      {
        url: '/og-features.jpg',
        width: 1200,
        height: 630,
        alt: 'BrandKernel AI Brand Strategy Features',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Brand Strategy Features That Transform Founders | BrandKernel',
    description: 'Discover BrandKernel\'s breakthrough AI features: The Clarity Engine, 4-Level System, Visual Maps & Activation Blueprints. Transform confusion into crystal-clear positioning in hours, not months.',
    images: ['/og-features.jpg'],
  },
  keywords: 'AI brand strategy, founder positioning, brand clarity tools, startup branding, brand identity system, strategic positioning',
  authors: [{ name: 'Maximilian Appelt', url: 'https://www.brandkernel.io' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.brandkernel.io/features',
  }
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white text-brand-black py-32">
      <div className="max-w-6xl mx-auto px-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-brand-black mb-8 font-normal leading-tight">
            Features That Transform, Not Just Inform
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-20">
          
          {/* The Clarity Engine */}
          <section>
            <h2 style={{ 
              fontSize: '3rem', 
              lineHeight: '3.5rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-12 text-center">
              The Clarity Engine
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-[#FF5A21] to-[#957FFF] p-8 rounded-lg text-white">
                <h3 style={{ 
                  fontSize: '1.75rem', 
                  lineHeight: '2.25rem',
                  fontWeight: 'bold'
                }} className="mb-6">
                  Strategic AI Guide
                </h3>
                <p className="mb-4">Not a chatbot. A trained brand strategist that:</p>
                <ul className="space-y-2">
                  <li>• Asks the questions that unlock breakthrough</li>
                  <li>• Listens for what you're not saying</li>
                  <li>• Connects dots you didn't see</li>
                  <li>• Guides you to your own truth</li>
                </ul>
                <p className="mt-6 italic">Because the best answers come from the right questions.</p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 style={{ 
                  fontSize: '1.75rem', 
                  lineHeight: '2.25rem',
                  fontWeight: 'bold'
                }} className="text-brand-black mb-6">
                  Your Brand Kernel Book
                </h3>
                <p className="text-brand-black mb-4">Your living strategic document that captures:</p>
                <ul className="text-brand-black space-y-2">
                  <li>• Every breakthrough insight</li>
                  <li>• Your crystallized positioning</li>
                  <li>• Your authentic voice</li>
                  <li>• Your action framework</li>
                </ul>
                <p className="text-brand-black mt-6 italic">Because clarity deserves documentation.</p>
              </div>
            </div>
          </section>

          {/* The Level System */}
          <section className="bg-gray-50 p-12 rounded-lg">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8 text-center">
              The Level System
            </h2>
            <p className="text-center text-brand-black mb-12 text-lg">Four progressive conversations that build:</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-[#FF5A21] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-black font-bold text-xl">1</span>
                </div>
                <h4 className="font-bold text-brand-black mb-2">Foundation</h4>
                <p className="text-brand-black text-sm">(Who you really are)</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#957FFF] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h4 className="font-bold text-brand-black mb-2">Position</h4>
                <p className="text-brand-black text-sm">(Where you uniquely win)</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#FF5A21] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-black font-bold text-xl">3</span>
                </div>
                <h4 className="font-bold text-brand-black mb-2">Voice</h4>
                <p className="text-brand-black text-sm">(How you authentically speak)</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#957FFF] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h4 className="font-bold text-brand-black mb-2">Strategy</h4>
                <p className="text-brand-black text-sm">(What you do with clarity)</p>
              </div>
            </div>
            
            <p className="text-center text-brand-black mt-8 italic">Because transformation happens in stages, not single sessions.</p>
          </section>

          {/* The Breakthrough Tools */}
          <section>
            <h2 style={{ 
              fontSize: '3rem', 
              lineHeight: '3.5rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-12 text-center">
              The Breakthrough Tools
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white border-2 border-gray-200 p-8 rounded-lg">
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  lineHeight: '2rem',
                  fontWeight: 'bold'
                }} className="text-brand-black mb-6">
                  Insight Synthesis Engine
                </h3>
                <p className="text-brand-black mb-4">Transforms rambling thoughts into:</p>
                <ul className="text-brand-black space-y-2 text-sm">
                  <li>• Clear identity statements</li>
                  <li>• Crisp value propositions</li>
                  <li>• Compelling narratives</li>
                  <li>• Concrete action steps</li>
                </ul>
                <p className="text-brand-black mt-6 italic text-sm">Because raw insight needs refinement.</p>
              </div>
              
              <div className="bg-white border-2 border-gray-200 p-8 rounded-lg">
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  lineHeight: '2rem',
                  fontWeight: 'bold'
                }} className="text-brand-black mb-6">
                  Visual Clarity Maps
                </h3>
                <p className="text-brand-black mb-4">See your breakthrough in:</p>
                <ul className="text-brand-black space-y-2 text-sm">
                  <li>• Positioning matrices</li>
                  <li>• Voice spectrums</li>
                  <li>• Audience alignment charts</li>
                  <li>• Competition landscapes</li>
                </ul>
                <p className="text-brand-black mt-6 italic text-sm">Because sometimes you need to see it to believe it.</p>
              </div>
              
              <div className="bg-white border-2 border-gray-200 p-8 rounded-lg">
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  lineHeight: '2rem',
                  fontWeight: 'bold'
                }} className="text-brand-black mb-6">
                  Activation Blueprints
                </h3>
                <p className="text-brand-black mb-4">Turn clarity into action with:</p>
                <ul className="text-brand-black space-y-2 text-sm">
                  <li>• Content strategy frameworks</li>
                  <li>• Network building plans</li>
                  <li>• Message templates</li>
                  <li>• Growth roadmaps</li>
                </ul>
                <p className="text-brand-black mt-6 italic text-sm">Because insight without action is just expensive therapy.</p>
              </div>
            </div>
          </section>

          {/* The Experience Design */}
          <section className="bg-gradient-to-r from-[#FF5A21] to-[#957FFF] p-12 rounded-lg text-white">
            <h2 style={{ 
              fontSize: '3rem', 
              lineHeight: '3.5rem',
              fontWeight: 'bold'
            }} className="mb-12 text-center">
              The Experience Design
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  lineHeight: '2rem',
                  fontWeight: 'bold'
                }} className="mb-4">
                  Adaptive Conversation Flow
                </h3>
                <p className="mb-4">The AI adjusts to:</p>
                <ul className="space-y-2 text-sm">
                  <li>• Your communication style</li>
                  <li>• Your industry context</li>
                  <li>• Your specific challenges</li>
                  <li>• Your breakthrough moments</li>
                </ul>
                <p className="mt-4 italic text-sm">Because one size fits no one.</p>
              </div>
              
              <div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  lineHeight: '2rem',
                  fontWeight: 'bold'
                }} className="mb-4">
                  Progress Tracking
                </h3>
                <p className="mb-4">Always know where you are:</p>
                <ul className="space-y-2 text-sm">
                  <li>• Visual journey map</li>
                  <li>• Milestone celebrations</li>
                  <li>• Breakthrough markers</li>
                  <li>• Completion estimates</li>
                </ul>
                <p className="mt-4 italic text-sm">Because progress motivates.</p>
              </div>
              
              <div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  lineHeight: '2rem',
                  fontWeight: 'bold'
                }} className="mb-4">
                  Reflection Spaces
                </h3>
                <p className="mb-4">Process your insights with:</p>
                <ul className="space-y-2 text-sm">
                  <li>• Pause points for deep thinking</li>
                  <li>• Summary moments</li>
                  <li>• Integration exercises</li>
                  <li>• Clarity confirmations</li>
                </ul>
                <p className="mt-4 italic text-sm">Because breakthrough needs breathing room.</p>
              </div>
            </div>
          </section>

          {/* The Multiplier Effects */}
          <section>
            <h2 style={{ 
              fontSize: '3rem', 
              lineHeight: '3.5rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-12 text-center">
              The Multiplier Effects
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  lineHeight: '2rem',
                  fontWeight: 'bold'
                }} className="text-brand-black mb-4">
                  Cross-Level Intelligence
                </h3>
                <p className="text-brand-black mb-4">Each level builds on the last:</p>
                <ul className="text-brand-black space-y-2 text-sm">
                  <li>• Insights compound</li>
                  <li>• Connections emerge</li>
                  <li>• Patterns clarify</li>
                  <li>• Strategy crystallizes</li>
                </ul>
                <p className="text-brand-black mt-4 italic text-sm">Because real clarity is holistic.</p>
              </div>
              
              <div className="text-center">
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  lineHeight: '2rem',
                  fontWeight: 'bold'
                }} className="text-brand-black mb-4">
                  Founder-First Design
                </h3>
                <p className="text-brand-black mb-4">Built specifically for:</p>
                <ul className="text-brand-black space-y-2 text-sm">
                  <li>• Busy builders who need efficiency</li>
                  <li>• Deep thinkers who need substance</li>
                  <li>• Action-takers who need practical output</li>
                  <li>• Solopreneurs who need accessible expertise</li>
                </ul>
                <p className="text-brand-black mt-4 italic text-sm">Because this is for founders, by a founder.</p>
              </div>
              
              <div className="text-center">
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  lineHeight: '2rem',
                  fontWeight: 'bold'
                }} className="text-brand-black mb-4">
                  Outcome Optimization
                </h3>
                <p className="text-brand-black mb-4">Every feature drives toward:</p>
                <ul className="text-brand-black space-y-2 text-sm">
                  <li>• Clearer thinking</li>
                  <li>• Stronger positioning</li>
                  <li>• Authentic communication</li>
                  <li>• Confident action</li>
                </ul>
                <p className="text-brand-black mt-4 italic text-sm">Because features without outcomes are just friction.</p>
              </div>
            </div>
          </section>

          {/* What Makes This Different */}
          <section className="bg-gray-50 p-12 rounded-lg">
            <h2 style={{ 
              fontSize: '3rem', 
              lineHeight: '3.5rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-12 text-center">
              What Makes This Different
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-2 rounded">
                    <span className="text-red-600 font-bold">✗</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-black">Not Another Template Tool</h4>
                    <p className="text-gray-700 text-sm">Dynamic conversation vs. static forms</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-2 rounded">
                    <span className="text-red-600 font-bold">✗</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-black">Not Another AI Chatbot</h4>
                    <p className="text-gray-700 text-sm">Strategic guide vs. generic responses</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-2 rounded">
                    <span className="text-red-600 font-bold">✗</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-black">Not Another Course</h4>
                    <p className="text-gray-700 text-sm">Your truth vs. someone else's framework</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-2 rounded">
                    <span className="text-red-600 font-bold">✗</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-black">Not Another Assessment</h4>
                    <p className="text-gray-700 text-sm">Breakthrough dialogue vs. personality quiz</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p style={{ 
                fontSize: '1.5rem', 
                lineHeight: '2rem',
                fontWeight: 'bold'
              }} className="text-brand-black">
                This is the conversation that changes everything.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
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
  );
}