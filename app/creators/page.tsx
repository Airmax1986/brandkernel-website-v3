import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Brand Strategy for Creators - Build Your Authentic Brand Identity ● Brand Kernel',
  description: 'Transform your content into a powerful brand identity with AI guidance. Personal branding for creators, influencers & digital artists. Join 250+ creators →',
  keywords: 'creator branding, content creator brand, influencer branding, digital artist brand, personal brand creator, AI brand strategy creators',
  authors: [{ name: 'BrandKernel Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'AI Brand Strategy for Creators - Build Your Authentic Brand Identity ● Brand Kernel',
    description: 'Transform your content into a powerful brand identity with AI guidance. Personal branding for creators, influencers & digital artists. Join 250+ creators →',
    type: 'website',
    url: 'https://www.brandkernel.io/creators',
    siteName: 'BrandKernel',
    images: [
      {
        url: '/og-creators.jpg',
        width: 1200,
        height: 630,
        alt: 'Brand Kernel - AI Brand Strategy for Creators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Brand Strategy for Creators - Build Your Authentic Brand Identity ● Brand Kernel',
    description: 'Transform your content into a powerful brand identity with AI guidance. Personal branding for creators, influencers & digital artists. Join 250+ creators →',
    images: ['/og-creators.jpg'],
  },
  alternates: {
    canonical: 'https://www.brandkernel.io/creators',
  }
};

export default function CreatorsPage() {
  return (
    <div className="min-h-screen pt-48 bg-white text-brand-blue">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold">For Creators</h1>
        <p className="mt-4 text-xl max-w-2xl mx-auto">
          This page will contain content specifically tailored for creators, helping them build an authentic brand that attracts the right audience.
        </p>
      </div>
    </div>
  );
}