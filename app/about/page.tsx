import CtaButton from "@/components/CtaButton";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-brand-blue py-32">
      <div className="max-w-3xl mx-auto px-4 text-left space-y-8 prose prose-2xl">
        <h1>The Story Behind BrandKernel</h1>
        <p>I'm Max. After 20 years as a designer and brand consultant, I kept seeing the same tragedy:</p>
        <p className="font-bold">Brilliant professionals—creators, consultants, founders—losing the attention war. Not because they lacked talent. Not because they lacked effort. But because they lacked strategic clarity about who they are and why they matter.</p>
        
        <div>
          <h2>The Problem I Couldn't Ignore</h2>
          <p>High-end brand consultants (like me) could solve this. But at €15,000+ and months of workshops, we were only accessible to the 1%.</p>
          <p>The other 99%? Left to fight with templates, generic AI tools, and surface-level tactics in an attention economy that rewards depth and punishes sameness.</p>
        </div>

        <div>
          <h2>The Revelation</h2>
          <p>The transformation never happened in the 50-page strategy decks. It happened in the conversations. In those moments when someone said: "Oh my god, I never thought about it that way. THAT'S what makes me different."</p>
          <p>That insight is priceless. And it should be accessible to everyone.</p>
        </div>

        <div>
          <h2>The Mission</h2>
          <p>BrandKernel democratizes the strategic conversation that changes everything. We've distilled decades of brand strategy wisdom into an AI-guided dialogue that helps you find what's already there—your authentic strategic position.</p>
        </div>

        <p className="font-bold">While others fight the attention war with more content, better tactics, and louder voices, you'll win with something they can't copy: absolute clarity about who you are.</p>
        
        <p>Ready to have the conversation that changes everything?</p>
        <div className="text-center mt-12">
          <CtaButton href="/waitlist">Join the Waitlist</CtaButton>
        </div>
      </div>
    </div>
  );
}