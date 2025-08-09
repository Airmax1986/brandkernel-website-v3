import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Brand Strategy for Founders - Scale Your Startup Brand Identity ● Brand Kernel',
  description: 'Build a powerful startup brand that attracts investors & customers with AI guidance. Personal branding for founders & entrepreneurs. Join 250+ founders →',
  keywords: 'founder branding, startup brand strategy, entrepreneur brand, startup positioning, founder personal brand, AI brand strategy founders',
  authors: [{ name: 'BrandKernel Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'AI Brand Strategy for Founders - Scale Your Startup Brand Identity ● Brand Kernel',
    description: 'Build a powerful startup brand that attracts investors & customers with AI guidance. Personal branding for founders & entrepreneurs. Join 250+ founders →',
    type: 'website',
    url: 'https://www.brandkernel.io/founders',
    siteName: 'BrandKernel',
    images: [
      {
        url: '/og-founders.jpg',
        width: 1200,
        height: 630,
        alt: 'Brand Kernel - AI Brand Strategy for Founders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Brand Strategy for Founders - Scale Your Startup Brand Identity ● Brand Kernel',
    description: 'Build a powerful startup brand that attracts investors & customers with AI guidance. Personal branding for founders & entrepreneurs. Join 250+ founders →',
    images: ['/og-founders.jpg'],
  },
  alternates: {
    canonical: 'https://www.brandkernel.io/founders',
  }
};

export default function FoundersPage() {
  return (
    <div className="min-h-screen pt-48 bg-white text-brand-blue">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold">For Creators</h1>
        <p className="mt-4 text-xl max-w-2xl mx-auto">
          This page will contain content specifically tailored for founders, helping them build an authentic brand that attracts the right audience.
        </p>
      </div>
    </div>
  );
}