export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.brandkernel.io/#website",
  "url": "https://www.brandkernel.io",
  "name": "BrandKernel",
  "alternateName": "Brand Kernel",
  "description": "AI-powered brand strategy platform for businesses and individuals",
  "publisher": {
    "@id": "https://www.brandkernel.io/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.brandkernel.io/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "en-US"
}