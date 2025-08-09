import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join Brand Kernel Waitlist - Get Early Access to AI Brand Strategy Platform ● Brand Kernel',
  description: 'Join 250+ freelancers, founders & creators waiting for Brand Kernel. Get early access to AI-guided brand strategy & personal branding tools. Join now →',
  keywords: 'Brand Kernel waitlist, AI brand strategy early access, personal branding platform, brand identity tools, join waitlist, early access',
  authors: [{ name: 'BrandKernel Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Join Brand Kernel Waitlist - Get Early Access to AI Brand Strategy Platform ● Brand Kernel',
    description: 'Join 250+ freelancers, founders & creators waiting for Brand Kernel. Get early access to AI-guided brand strategy & personal branding tools. Join now →',
    type: 'website',
    url: 'https://www.brandkernel.io/waitlist',
    siteName: 'BrandKernel',
    images: [
      {
        url: '/og-waitlist.jpg',
        width: 1200,
        height: 630,
        alt: 'Brand Kernel Waitlist - Join Early Access',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Brand Kernel Waitlist - Get Early Access to AI Brand Strategy Platform ● Brand Kernel',
    description: 'Join 250+ freelancers, founders & creators waiting for Brand Kernel. Get early access to AI-guided brand strategy & personal branding tools. Join now →',
    images: ['/og-waitlist.jpg'],
  },
  alternates: {
    canonical: 'https://www.brandkernel.io/waitlist',
  }
};

export default function WaitlistPage() {
  return (
    <div className="min-h-screen pt-48 bg-white text-brand-blue">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold">Join the Waitlist</h1>
        <p className="mt-4 text-xl max-w-2xl mx-auto">
          You're one step away from gaining strategic clarity. The waitlist form is always available in the footer of every page.
        </p>
      </div>
    </div>
  );
}