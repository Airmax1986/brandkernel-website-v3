import { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Freelancer - BrandKernel',
  description: 'Brand solutions tailored specifically for freelancers. Coming soon.',
};

export default function FreelancerPage() {
  return (
    <div className="min-h-screen bg-brand-white">
      <Header variant="transparent" fixed={true} />
      
      <main className="min-h-screen flex items-center justify-center" style={{ paddingTop: '3rem' }}>
        <div className="text-center max-w-2xl px-6">
          <h1 style={{ 
            fontSize: '6rem', 
            lineHeight: '6rem',
            fontWeight: 'normal'
          }} className="text-brand-black mb-8">
            Freelancer
          </h1>
          
          <p style={{ 
            fontSize: '1rem', 
            lineHeight: '1.5rem',
            fontWeight: 'bold'
          }} className="text-brand-black mb-8">
            Brand solutions tailored specifically for freelancers who want to stand out and attract premium clients.
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
              We're developing specialized branding tools for freelancers. Expect strategies for positioning, client attraction, and premium pricing.
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