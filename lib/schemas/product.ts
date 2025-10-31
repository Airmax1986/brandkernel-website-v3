export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "BrandKernel - AI Brand Strategy Journey",
  "alternateName": "BrandKernel AI Brand Consultant Platform",
  "description": "BrandKernel is a one-time investment AI brand strategy platform (not a subscription service or consulting agency) that helps entrepreneurs, freelancers, and creators uncover their authentic brand identity through 3-4 hours of guided AI conversation. Complete with lifetime access, Brand Kernel Book, and activation blueprints.",
  "image": [
    "https://www.brandkernel.io/product-hero.jpg",
    "https://www.brandkernel.io/dashboard-preview.jpg",
    "https://www.brandkernel.io/features-overview.jpg"
  ],
  "brand": {
    "@type": "Brand",
    "name": "BrandKernel"
  },
  "category": "Software",
  "isRelatedTo": [
    {
      "@type": "Product",
      "name": "Brand Strategy Consulting"
    },
    {
      "@type": "Product",
      "name": "AI Business Tools"
    },
    {
      "@type": "Product",
      "name": "Personal Branding Tools"
    }
  ],
  "offers": {
    "@type": "Offer",
    "name": "Early Adopter Lifetime Access",
    "price": "297",
    "priceCurrency": "USD",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/PreOrder",
    "url": "https://www.brandkernel.io/pricing",
    "seller": {
      "@type": "Organization",
      "name": "BrandKernel",
      "@id": "https://www.brandkernel.io/#organization"
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": ["US", "DE", "GB"],
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn"
    }
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Sarah Chen"
      },
      "datePublished": "2024-01-15",
      "reviewBody": "BrandKernel transformed how I approach brand strategy. The AI insights are incredibly valuable and have helped me clarify my brand positioning in ways I never imagined."
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Michael Torres"
      },
      "datePublished": "2024-01-20",
      "reviewBody": "As a freelancer, BrandKernel helped me clarify my personal brand and attract better clients. The AI consultant asks the right questions and provides actionable insights."
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Lisa Johnson"
      },
      "datePublished": "2024-02-01",
      "reviewBody": "Great platform for brand strategy. The templates and frameworks are comprehensive. Would love to see more industry-specific features, but overall excellent value."
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "250",
    "bestRating": "5",
    "worstRating": "1"
  }
}