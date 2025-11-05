export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.brandkernel.io/#website",
  "url": "https://www.brandkernel.io",
  "name": "BrandKernel - AI Brand Strategy Platform",
  "alternateName": "Brand Kernel",
  "description": "BrandKernel.io - AI-powered brand strategy platform for entrepreneurs, freelancers, and creators. Uncover your authentic brand identity through guided AI conversations. Not a consulting service, but a SaaS platform for personal branding and strategic clarity.",
  "publisher": {
    "@id": "https://www.brandkernel.io/#organization"
  },
  "about": {
    "@type": "Thing",
    "name": "AI Brand Strategy",
    "description": "Artificial intelligence-powered brand strategy development for personal branding"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.brandkernel.io/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": ["en-US", "de-DE"]
}