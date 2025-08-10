export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.brandkernel.io/#organization",
  "name": "BrandKernel",
  "alternateName": "BrandKernel.io",
  "url": "https://www.brandkernel.io",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.brandkernel.io/logo.png",
    "width": 512,
    "height": 512,
    "caption": "BrandKernel Logo"
  },
  "description": "AI-powered brand strategy platform helping businesses and individuals build authentic brands",
  "email": "hello@brandkernel.io",
  "foundingDate": "2023-01-01",
  "sameAs": [
    "https://linkedin.com/company/brandkernel",
    "https://twitter.com/brandkernel"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@brandkernel.io",
    "availableLanguage": ["English"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  }
}