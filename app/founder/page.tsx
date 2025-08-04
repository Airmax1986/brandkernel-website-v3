import { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Brand Strategy for Founders | Build Authority & Clear Positioning',
  description: 'Transform from invisible builder to industry voice. BrandKernel helps founders develop compelling company brands and personal authority through strategic clarity.',
  keywords: 'founder branding, startup brand strategy, personal authority, company positioning, founder positioning, startup marketing',
  authors: [{ name: 'BrandKernel Team' }],
  openGraph: {
    title: 'Brand Strategy for Founders - Build Authority & Clear Positioning',
    description: 'Transform from invisible builder to industry voice with BrandKernel\'s founder-focused brand strategy.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Strategy for Founders - Build Authority & Clear Positioning',
    description: 'Transform from invisible builder to industry voice with BrandKernel\'s founder-focused brand strategy.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-brand-white">
      <Header variant="transparent" fixed={true} />
      
      <main className="min-h-screen flex items-center justify-center" style={{ paddingTop: '3rem' }}>
        <div className="text-center max-w-2xl px-6">
          <h1 className="text-brand-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight mb-8 px-4">
            Brand Strategy for Founders
          </h1>
          
          <p style={{ 
            fontSize: '1rem', 
            lineHeight: '1.5rem',
            fontWeight: 'bold'
          }} className="text-brand-black mb-8">
            Brand solutions tailored specifically for founders who want to build compelling company brands and personal authority.
          </p>
          
          <div className="bg-gray-50 rounded-2xl p-12 mb-8">
            <h2 style={{ 
              fontSize: '3rem', 
              lineHeight: '3rem',
              fontWeight: 'normal'
            }} className="text-brand-black mb-4">
              Coming Soon
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.5rem'
            }} className="text-neutral-600">
              We're creating comprehensive branding solutions for founders. Look forward to strategies for company branding, thought leadership, and market positioning.
            </p>
          </div>
          
          <a href="/" style={{ 
            fontSize: '1rem', 
            lineHeight: '1.5rem', 
            fontWeight: 'bold' 
          }} className="bg-[#957FFF] text-white px-8 py-3 rounded-full hover:bg-[#957FFF]/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-block">
            Back to Home
          </a>
        </div>
      </main>
    </div>
  );
}