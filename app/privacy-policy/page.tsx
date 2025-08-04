import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | BrandKernel Data Protection & Privacy',
  description: 'Learn how BrandKernel collects, uses, and protects your data. Our privacy policy explains data handling practices for our AI brand strategy platform.',
  openGraph: {
    title: 'Privacy Policy | BrandKernel Data Protection & Privacy',
    description: 'Learn how BrandKernel collects, uses, and protects your data. Our privacy policy explains data handling practices for our AI brand strategy platform.',
    type: 'website',
    url: 'https://brandkernel.io/privacy-policy',
    siteName: 'BrandKernel',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | BrandKernel Data Protection & Privacy',
    description: 'Learn how BrandKernel collects, uses, and protects your data. Our privacy policy explains data handling practices for our AI brand strategy platform.',
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://brandkernel.io/privacy-policy',
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-brand-black py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-brand-black mb-8 font-normal leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xl text-brand-black max-w-3xl mx-auto">
            How we collect, use, and protect your data at BrandKernel.
          </p>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-brand-black mb-4"><strong>Last updated:</strong> January 2025</p>
            <p className="text-brand-black">
              At BrandKernel, we take your privacy seriously. This policy explains how we collect, use, and protect your information when you use our AI brand strategy platform.
            </p>
          </div>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-brand-black mb-4">Information We Collect</h2>
            <div className="text-brand-black space-y-4">
              <p><strong>Account Information:</strong> Email address, name, and profile information when you sign up.</p>
              <p><strong>Conversation Data:</strong> Your responses and insights from brand strategy conversations to provide personalized guidance.</p>
              <p><strong>Usage Data:</strong> How you interact with our platform to improve our services.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-brand-black mb-4">How We Use Your Information</h2>
            <div className="text-brand-black space-y-4">
              <p>• Provide personalized AI brand strategy guidance</p>
              <p>• Generate your Brand Kernel Book and insights</p>
              <p>• Improve our platform and services</p>
              <p>• Send important updates about your account</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-brand-black mb-4">Data Protection</h2>
            <div className="text-brand-black space-y-4">
              <p>Your brand strategy conversations and insights are private and secure. We use industry-standard encryption and security measures to protect your data.</p>
              <p>We will never sell your personal information or brand insights to third parties.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-brand-black mb-4">Your Rights</h2>
            <div className="text-brand-black space-y-4">
              <p>You have the right to access, update, or delete your personal information at any time.</p>
              <p>Contact us at <a href="mailto:privacy@brandkernel.io" className="text-[#957FFF] hover:underline font-bold">privacy@brandkernel.io</a> for any privacy-related requests.</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-brand-black mb-4">Contact Us</h2>
            <div className="text-brand-black">
              <p>If you have questions about this privacy policy, please contact us at:</p>
              <p className="mt-4">
                <strong>BrandKernel</strong><br/>
                Email: <a href="mailto:privacy@brandkernel.io" className="text-[#957FFF] hover:underline font-bold">privacy@brandkernel.io</a><br/>
                Address: Wolbecker Str. 94, 48155 Münster, Germany
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}