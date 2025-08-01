import CtaButton from "@/components/CtaButton";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-brand-black py-32">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 style={{ 
            fontSize: '6rem', 
            lineHeight: '6rem',
            fontWeight: 'normal'
          }} className="text-brand-black mb-8">
            The Founder Behind the Breakthrough
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-16">
          
          {/* Introduction */}
          <section className="text-center">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8">
              Hi, I'm Max.
            </h2>
            
            <div style={{ 
              fontSize: '1.25rem', 
              lineHeight: '1.75rem'
            }} className="text-brand-black space-y-6 max-w-3xl mx-auto">
              <p>For 20 years, I've had the same conversation with brilliant founders:</p>
              <p className="italic">"I know I'm good at what I do. But I can't explain what makes me different. I feel invisible, and I don't know why."</p>
              <p>I've heard it from designers in Berlin. Developers in London. Consultants in Silicon Valley. Creators with millions of followers who still feel lost.</p>
              <p>The pattern is always the same: <strong>Brilliant people building in the dark because they never found their light.</strong></p>
            </div>
          </section>

          {/* Everything Makes Sense Now Moment */}
          <section className="bg-gray-50 p-8 rounded-lg">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8 text-center">
              My "Everything Makes Sense Now" Moment
            </h2>
            
            <div style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.75rem'
            }} className="text-brand-black space-y-6">
              <p>I spent two decades as a brand consultant. Big projects. Big budgets. Big documents that nobody really read.</p>
              <p>But the magic never happened in the 50-page strategy deck.</p>
              <p><strong>It happened in the conversation.</strong> That moment when a founder's eyes light up and they say: "Oh my god. THAT'S what I've been trying to say."</p>
              <p>That breakthrough. That clarity. That's what actually matters.</p>
            </div>
          </section>

          {/* The Painful Truth */}
          <section>
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8 text-center">
              The Painful Truth I Discovered
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-bold text-xl text-red-600 mb-4">Traditional brand consulting is broken for founders:</h3>
                <ul className="space-y-3 text-brand-black">
                  <li>• It's built for corporations, not individuals</li>
                  <li>• It's about external perception, not inner truth</li>
                  <li>• It's prohibitively expensive</li>
                  <li>• It takes months you don't have</li>
                  <li>• It often misses the essence of who you really are</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-xl text-red-600 mb-4">Meanwhile, DIY solutions are equally broken:</h3>
                <ul className="space-y-3 text-brand-black">
                  <li>• Templates force you into someone else's framework</li>
                  <li>• Courses teach you someone else's success</li>
                  <li>• AI tools produce generic, soulless content</li>
                  <li>• You end up sounding like everyone else</li>
                </ul>
              </div>
            </div>
            
            <p className="text-center mt-8 font-bold text-brand-black text-lg">There had to be a better way.</p>
          </section>

          {/* The Bridge I'm Building */}
          <section className="bg-gradient-to-r from-[#DAFF96] to-[#957FFF] p-8 rounded-lg text-white">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="mb-8 text-center">
              The Bridge I'm Building
            </h2>
            
            <div style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.75rem'
            }} className="space-y-6">
              <p>BrandKernel is the conversation I wish every founder could have.</p>
              <p>It's 20 years of asking the right questions, distilled into a guided journey. The depth of high-end consulting made accessible. The personal breakthrough, systematized but not sanitized.</p>
              <p>Because I believe every founder deserves:</p>
              <ul className="space-y-2 ml-6">
                <li>• To know exactly who they are</li>
                <li>• To see their unique value clearly</li>
                <li>• To communicate with authentic confidence</li>
                <li>• To build from a place of clarity, not confusion</li>
              </ul>
            </div>
          </section>

          {/* My Journey to This Moment */}
          <section>
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8 text-center">
              My Journey to This Moment
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-bold text-xl text-brand-black mb-4">The credentials:</h3>
                <ul className="space-y-2 text-brand-black">
                  <li>• M.A. in Visual Communication</li>
                  <li>• 20+ years in brand and design</li>
                  <li>• 100+ brand development projects</li>
                  <li>• 2 startups (failed forward beautifully)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-xl text-brand-black mb-4">The real education:</h3>
                <ul className="space-y-2 text-brand-black">
                  <li>• Every late-night conversation with a struggling founder</li>
                  <li>• Every moment of watching brilliance go unrecognized</li>
                  <li>• Every time the "right" strategy felt wrong</li>
                  <li>• Every breakthrough that came from going deeper</li>
                </ul>
              </div>
            </div>
          </section>

          {/* The Current Reality */}
          <section className="bg-gray-50 p-8 rounded-lg">
            <h2 style={{ 
              fontSize: '2rem', 
              lineHeight: '2.5rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-6 text-center">
              The current reality:
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-center">
              <div>
                <ul className="space-y-3 text-brand-black">
                  <li>• Building BrandKernel as a solopreneur</li>
                  <li>• Working in Business Development (bills don't pay themselves)</li>
                  <li>• Dad to an amazing human</li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3 text-brand-black">
                  <li>• Trail runner (where my best ideas emerge)</li>
                  <li>• Coffee-dependent life form</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why This Matters More Than Ever */}
          <section>
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8 text-center">
              Why This Matters More Than Ever
            </h2>
            
            <div style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.75rem'
            }} className="text-brand-black space-y-6 max-w-3xl mx-auto text-center">
              <p>We're drowning in a sea of sameness. AI-generated everything. Formulaic positioning. Founders all trying to sound like the last unicorn.</p>
              <p><strong>But the world doesn't need another copy. It needs you</strong> - the real you, with your unique perspective, your irreplaceable experience, your only-you way of solving problems.</p>
              <p>That's what we uncover. That's what we clarify. That's what we help you build on.</p>
            </div>
          </section>

          {/* The Vision */}
          <section className="bg-[#957FFF] p-8 rounded-lg text-white">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="mb-8 text-center">
              The Vision
            </h2>
            
            <div className="text-center max-w-3xl mx-auto">
              <p className="mb-6">A world where:</p>
              <ul className="space-y-3 text-left inline-block">
                <li>• Every founder knows their unique value</li>
                <li>• Authentic voices cut through the noise</li>
                <li>• Building happens from clarity, not confusion</li>
                <li>• The best ideas get the attention they deserve</li>
              </ul>
              <p className="mt-6 font-bold">One conversation at a time.</p>
            </div>
          </section>

          {/* Your Invitation */}
          <section className="text-center">
            <h2 style={{ 
              fontSize: '2.5rem', 
              lineHeight: '3rem',
              fontWeight: 'bold'
            }} className="text-brand-black mb-8">
              Your Invitation
            </h2>
            
            <div style={{ 
              fontSize: '1.25rem', 
              lineHeight: '1.75rem'
            }} className="text-brand-black space-y-6 max-w-3xl mx-auto mb-12">
              <p>I've guided hundreds through this journey. Each one unique. Each one transformative. Each one starting with the same simple belief:</p>
              <p className="font-bold">You're one conversation away from everything making sense.</p>
              <p>Ready for yours?</p>
            </div>
            
            <div className="mb-8">
              <a href="/waitlist" style={{ 
                fontSize: '1rem', 
                lineHeight: '1.5rem', 
                fontWeight: 'bold' 
              }} className="bg-[#957FFF] text-white px-8 py-3 rounded-full hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block">
                Join the Waitlist →
              </a>
            </div>
            
            <div className="text-center">
              <p className="text-brand-black font-bold">Max</p>
              <p className="text-gray-600">Founder, BrandKernel</p>
              <p className="text-gray-600 mt-4">P.S. - Follow my #BuildInPublic journey on LinkedIn. Watch me practice what I preach about building with clarity.</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}