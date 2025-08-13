import { Metadata } from 'next';
import { i18nConfig, getAlternateLinks, seoConfig, type Locale } from './i18n-config';

const baseUrl = 'https://www.brandkernel.io';

interface IntlSEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  locale?: Locale;
}

export function createIntlMetadata({
  title = "BrandKernel - AI-Powered Brand Strategy Platform",
  description,
  path = '',
  image = `${baseUrl}/og-image.jpg`,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  locale = 'en-US'
}: IntlSEOProps): Metadata {
  const localizedDescription = description || seoConfig[locale]?.metaDescription || 
    "Your empathetic AI brand consultant guides you through a deep, personal brand discovery.";
  
  const url = `${i18nConfig.domains[locale]}${path}`;
  const alternateLinks = getAlternateLinks(path);
  
  const metadata: Metadata = {
    title,
    description: localizedDescription,
    openGraph: {
      title,
      description: localizedDescription,
      url,
      siteName: 'BrandKernel',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale.replace('-', '_'),
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: localizedDescription,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    authors: authors?.map(name => ({ name })),
    keywords: [...(seoConfig[locale]?.keywords || []), ...(tags || [])],
    alternates: {
      canonical: url,
      languages: alternateLinks
    },
  };

  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: authors,
      tags,
    };
  }

  return metadata;
}

export function generateHreflangTags(path: string): string {
  const links = i18nConfig.locales.map(locale => 
    `<link rel="alternate" hreflang="${locale.code}" href="${i18nConfig.domains[locale.code]}${path}" />`
  );
  
  links.push(`<link rel="alternate" hreflang="x-default" href="${i18nConfig.domains['en']}${path}" />`);
  
  return links.join('\n');
}

export function generateStructuredData(locale: Locale, path: string) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${i18nConfig.domains[locale]}/#organization`,
    "name": "BrandKernel",
    "url": i18nConfig.domains[locale],
    "logo": {
      "@type": "ImageObject",
      "url": `${i18nConfig.domains[locale]}/logo.png`,
      "width": 600,
      "height": 60
    },
    "description": seoConfig[locale]?.metaDescription,
    "sameAs": [
      "https://linkedin.com/company/brandkernel",
      "https://twitter.com/brandkernel"
    ],
    "address": locale === 'en-US' ? {
      "@type": "PostalAddress",
      "addressCountry": "US"
    } : locale === 'en-GB' ? {
      "@type": "PostalAddress",
      "addressCountry": "GB"
    } : locale === 'de-DE' ? {
      "@type": "PostalAddress",
      "addressCountry": "DE"
    } : undefined,
    "areaServed": locale === 'en-US' ? "US" : 
                   locale === 'en-GB' ? "GB" : 
                   locale === 'de-DE' ? "DE" : "Worldwide",
    "availableLanguage": [
      {
        "@type": "Language",
        "name": "English",
        "alternateName": "en"
      },
      {
        "@type": "Language",
        "name": "German",
        "alternateName": "de"
      }
    ]
  };

  if (path === '') {
    return {
      ...baseStructuredData,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${i18nConfig.domains[locale]}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };
  }

  if (path.startsWith('/blog/')) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${i18nConfig.domains[locale]}${path}`
      },
      "publisher": baseStructuredData,
      "inLanguage": locale
    };
  }

  return baseStructuredData;
}