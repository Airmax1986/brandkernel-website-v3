import { Metadata } from 'next';
import { AutoBreadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact BrandKernel | Get in Touch About Brand Strategy',
  description: 'Get in touch with the BrandKernel team. Questions about our AI brand strategist? Ready to join the waitlist? We\'re here to help founders find their clarity.',
  openGraph: {
    title: 'Contact BrandKernel | Get in Touch About Brand Strategy',
    description: 'Get in touch with the BrandKernel team. Questions about our AI brand strategist? Ready to join the waitlist? We\'re here to help founders find their clarity.',
    type: 'website',
    url: 'https://www.brandkernel.io/contact',
    siteName: 'BrandKernel',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact BrandKernel Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact BrandKernel | Get in Touch About Brand Strategy',
    description: 'Get in touch with the BrandKernel team. Questions about our AI brand strategist? Ready to join the waitlist? We\'re here to help founders find their clarity.',
    images: ['/og-contact.jpg'],
  },
  keywords: 'contact BrandKernel, brand strategy support, founder help, AI brand consultant contact',
  authors: [{ name: 'Maximilian Appelt', url: 'https://www.brandkernel.io' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.brandkernel.io/contact',
  }
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-brand-black py-32">
      <div className="max-w-4xl mx-auto px-10">
        {/* Breadcrumbs */}
        <AutoBreadcrumbs path="/contact" pageTitle="Contact" className="mb-8" />

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-brand-black mb-8 font-normal leading-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-brand-black max-w-3xl mx-auto">
            Questions about BrandKernel? Ready to join the waitlist? We're here to help founders find their clarity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-brand-black mb-6">For Founders</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-brand-black mb-2">Join the Waitlist</h3>
                <p className="text-brand-black mb-4">Ready to transform your brand clarity?</p>
                <a href="/waitlist" className="bg-[#957FFF] text-white px-10 py-3 rounded-full hover:bg-[#957FFF]/90 transition-all inline-block font-bold">
                  Join Waitlist →
                </a>
              </div>
              <div className="pt-6">
                <h3 className="font-bold text-brand-black mb-2">Questions?</h3>
                <p className="text-brand-black">Email us at: <a href="mailto:hello@brandkernel.io" className="text-[#957FFF] hover:underline font-bold">hello@brandkernel.io</a></p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-brand-black mb-6">For Partnerships</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-brand-black mb-2">Collaborate</h3>
                <p className="text-brand-black mb-4">Interested in partnering or collaborating?</p>
                <p className="text-brand-black">Reach out: <a href="mailto:partnerships@brandkernel.io" className="text-[#957FFF] hover:underline font-bold">partnerships@brandkernel.io</a></p>
              </div>
              <div className="pt-6">
                <h3 className="font-bold text-brand-black mb-2">Follow Our Journey</h3>
                <p className="text-brand-black">Connect with founder Maximilian Appelt on <a href="https://twitter.com/maxappelt" target="_blank" rel="noopener noreferrer" className="text-[#957FFF] hover:underline font-bold">Twitter</a></p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16 bg-brand-green p-8 rounded-lg text-brand-black">
          <h2 className="text-2xl font-bold mb-4">Ready for Your Breakthrough?</h2>
          <p className="mb-6">Join 400+ founders who are waiting for the conversation that changes everything.</p>
          <a href="/waitlist" className="bg-white text-[#957FFF] px-10 py-3 rounded-full hover:bg-gray-100 transition-all inline-block font-bold">
            Join the Waitlist →
          </a>
        </div>
      </div>
    </div>
  );
}