import { Metadata } from 'next';

const baseUrl = 'https://www.brandkernel.io';

interface SEOProps {
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
}

export function createMetadata({
  title = "BrandKernel - Stand out with positioning that feels like you",
  description = "Your empathetic AI brand consultant guides you through a deep, personal brand discovery.",
  path = '',
  image = `${baseUrl}/og-image.jpg`,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags
}: SEOProps): Metadata {
  const url = `${baseUrl}${path}`;
  
  const metadata: Metadata = {
    title,
    description,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { rel: 'mask-icon', url: '/favicon.svg', color: '#A364FF' },
      ],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      title,
      description,
      url,
      siteName: 'BrandKernel.io',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
    keywords: tags,
    alternates: {
      canonical: url,
    },
  };

  // Add article-specific metadata
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

  // Add structured data for homepage
  if (path === '') {
    metadata.other = {
      'application/ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "BrandKernel.io",
        "url": baseUrl,
        "description": description,
        "sameAs": [
          "https://linkedin.com/company/brandkernel"
        ]
      })
    };
  }

  return metadata;
}

export function createBlogPostMetadata({
  title,
  description,
  slug,
  image,
  publishedTime,
  modifiedTime,
  authors = ['BrandKernel Team'],
  tags
}: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}): Metadata {
  return createMetadata({
    title: `${title} | BrandKernel Blog`,
    description,
    path: `/blog/${slug}`,
    image,
    type: 'article',
    publishedTime,
    modifiedTime,
    authors,
    tags
  });
}