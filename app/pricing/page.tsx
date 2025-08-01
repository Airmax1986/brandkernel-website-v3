import CtaButton from "@/components/CtaButton";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-brand-blue py-32">
      <div className="max-w-3xl mx-auto px-4 text-center space-y-12 prose prose-2xl">
        <h1>One Investment. Lifetime Clarity.</h1>
        
        <div className="border-2 border-orange-500 p-8 rounded-lg">
          <h2>The Brand Kernel Journey</h2>
          <p className="text-5xl font-bold my-4">€297 (Early Access via Waitlist)</p>
          <p className="font-bold">Stop competing on tactics. Start winning with strategy.</p>
          <p className="mt-6 text-left">Included:</p>
          <ul className="text-left">
            <li>Complete 4-level strategic dialogue process</li>
            <li>Unlimited access to your AI Brand Consultant</li>
            <li>Your comprehensive Brand Kernel Book</li>
            <li>Lifetime access to your strategic foundation</li>
            <li>Future updates and new features</li>
          </ul>
        </div>
        
        <div>
          <h2>Compare to:</h2>
          <ul className="list-none space-y-2">
            <li>Brand Strategy Consultant: €5,000-20,000</li>
            <li>Business Coach: €2,000-10,000</li>
            <li>Staying invisible: Incalculable</li>
          </ul>
        </div>
        
        <div>
          <h2>The Strategic ROI</h2>
          <ul className="list-none space-y-2">
            <li><strong>For Creators:</strong> One aligned brand partnership pays for this 10x over</li>
            <li><strong>For Consultants:</strong> One premium client at proper rates covers this 20x</li>
            <li><strong>For Founders:</strong> One clear pitch that resonates returns this 100x</li>
          </ul>
        </div>

        <p className="font-bold">Why We're Different</p>
        <p>Templates expire. Tactics fade. Your Brand Kernel is forever. No subscriptions. No recurring fees. Just the strategic clarity that compounds over time.</p>
        
        <CtaButton href="/waitlist">Join the Waitlist ← Lock in early access pricing</CtaButton>
      </div>
    </div>
  );
}