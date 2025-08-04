import { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Brand Strategy for Creators | Turn Followers into Real Business',
  description: 'Build authentic, engaging personal brands that convert. BrandKernel helps creators develop strategic clarity and turn followers into sustainable business.',
  keywords: 'creator branding, content creator brand, personal brand creator, creator business strategy, influencer branding',
  authors: [{ name: 'BrandKernel Team' }],
  openGraph: {
    title: 'Brand Strategy for Creators - Turn Followers into Real Business',
    description: 'Build authentic, engaging personal brands that convert with BrandKernel\'s creator-focused strategy.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Strategy for Creators - Turn Followers into Real Business',
    description: 'Build authentic, engaging personal brands that convert with BrandKernel\'s creator-focused strategy.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CreatorPage() {
  return (
    <div className="min-h-screen bg-brand-white">
      <Header variant="transparent" fixed={true} />
      
      <main className="min-h-screen flex items-center justify-center" style={{ paddingTop: '3rem' }}>
        <div className="text-center max-w-2xl px-6">
          <h1 className="text-brand-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight mb-8 px-4">
            Brand Strategy for Creators
          </h1>
          
          <p style={{ 
            fontSize: '1rem', 
            lineHeight: '1.5rem',
            fontWeight: 'bold'
          }} className="text-brand-black mb-8">
            Brand solutions tailored specifically for creators who want to build authentic, engaging personal brands.
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
              We're crafting something special for creators. Get ready for tools and strategies designed specifically for content creators, influencers, and digital artists.
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