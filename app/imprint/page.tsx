import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Imprint | BrandKernel Legal Information',
  description: 'Legal information and contact details for BrandKernel. Founded by Maximilian Appelt in Münster, Germany.',
  openGraph: {
    title: 'Imprint | BrandKernel Legal Information',
    description: 'Legal information and contact details for BrandKernel. Founded by Maximilian Appelt in Münster, Germany.',
    type: 'website',
    url: 'https://brandkernel.io/imprint',
    siteName: 'BrandKernel',
  },
  twitter: {
    card: 'summary',
    title: 'Imprint | BrandKernel Legal Information',
    description: 'Legal information and contact details for BrandKernel. Founded by Maximilian Appelt in Münster, Germany.',
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://brandkernel.io/imprint',
  }
};

export default function ImprintPage() {
  return (
    <div className="min-h-screen bg-white text-brand-black py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-brand-black mb-8 font-normal leading-tight">
            Imprint
          </h1>
          <p className="text-xl text-brand-black max-w-3xl mx-auto">
            Legal information and contact details for BrandKernel.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-brand-black mb-6">Legal Information</h2>
            <div className="text-brand-black space-y-4">
              <div>
                <p className="font-bold">Company:</p>
                <p>BrandKernel.io</p>
              </div>
              
              <div>
                <p className="font-bold">Founder & CEO:</p>
                <p>Maximilian Appelt</p>
              </div>
              
              <div>
                <p className="font-bold">Address:</p>
                <p>
                  Wolbecker Str. 94<br/>
                  48155 Münster<br/>
                  Germany
                </p>
              </div>
              
              <div>
                <p className="font-bold">Contact:</p>
                <p>Email: <a href="mailto:hello@brandkernel.io" className="text-[#957FFF] hover:underline font-bold">hello@brandkernel.io</a></p>
              </div>
              
              <div>
                <p className="font-bold">Website:</p>
                <p><a href="https://brandkernel.io" className="text-[#957FFF] hover:underline font-bold">https://brandkernel.io</a></p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-brand-black mb-4">About the Founder</h2>
            <p className="text-brand-black mb-6">
              BrandKernel was founded by Maximilian Appelt, a brand strategist and entrepreneur passionate about helping founders find clarity in their brand positioning.
            </p>
            <p className="text-brand-black">
              Connect with Max on <a href="https://twitter.com/maxappelt" target="_blank" rel="noopener noreferrer" className="text-[#957FFF] hover:underline font-bold">Twitter</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}