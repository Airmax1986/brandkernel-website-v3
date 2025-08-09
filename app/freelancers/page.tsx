import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Brand Strategy for Freelancers - Build Your Premium Personal Brand ● Brand Kernel',
  description: 'Stand out from competitors & command premium rates with AI-guided personal branding. Brand strategy for freelancers & consultants. Join 250+ professionals →',
  keywords: 'freelancer branding, personal brand freelancer, freelancer positioning, consultant brand, premium freelancing, AI brand strategy freelancers',
  authors: [{ name: 'BrandKernel Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'AI Brand Strategy for Freelancers - Build Your Premium Personal Brand ● Brand Kernel',
    description: 'Stand out from competitors & command premium rates with AI-guided personal branding. Brand strategy for freelancers & consultants. Join 250+ professionals →',
    type: 'website',
    url: 'https://www.brandkernel.io/freelancers',
    siteName: 'BrandKernel',
    images: [
      {
        url: '/og-freelancers.jpg',
        width: 1200,
        height: 630,
        alt: 'Brand Kernel - AI Brand Strategy for Freelancers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Brand Strategy for Freelancers - Build Your Premium Personal Brand ● Brand Kernel',
    description: 'Stand out from competitors & command premium rates with AI-guided personal branding. Brand strategy for freelancers & consultants. Join 250+ professionals →',
    images: ['/og-freelancers.jpg'],
  },
  alternates: {
    canonical: 'https://www.brandkernel.io/freelancers',
  }
};

export default function FreelancersPage() {
  return (
    <div className="min-h-screen pt-48 bg-white text-brand-blue">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold">For Freelancers</h1>
        <p className="mt-4 text-xl max-w-2xl mx-auto">
          This page will contain content specifically tailored for freelancers, helping them build an authentic brand that attracts the right audience.
        </p>
      </div>
    </div>
  );
}