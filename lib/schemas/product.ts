export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "BrandKernel Pro",
  "alternateName": "BrandKernel AI Brand Strategy Platform",
  "description": "AI-powered brand strategy platform that helps businesses and individuals develop authentic, compelling brand identities through guided conversations with an AI brand consultant.",
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
      "name": "AI Marketing Tools"
    }
  ],
  "offers": {
    "@type": "Offer",
    "name": "Early Adopter Special",
    "price": "297",
    "priceCurrency": "USD",
    "priceValidUntil": "2024-12-31",
    "availability": "https://schema.org/InStock",
    "url": "https://www.brandkernel.io/pricing",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "297",
      "priceCurrency": "USD",
      "billingDuration": "P1M",
      "billingIncrement": "P1M"
    },
    "seller": {
      "@type": "Organization",
      "name": "BrandKernel",
      "url": "https://www.brandkernel.io"
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "US",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 14,
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
        "ratingValue": "4",
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
    "ratingValue": "4.8",
    "reviewCount": "250",
    "bestRating": "5",
    "worstRating": "1"
  }
}