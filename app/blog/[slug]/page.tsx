// app/blog/[slug]/page.tsx

import { getPostGraphQL, getAllPostSlugsGraphQL } from "@/lib/contentful/contentful-graphql";
import { Post as PostType } from "@/lib/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";
import { Metadata } from "next";

// This function now receives the correctly formatted data.
export async function generateStaticParams() {
  const slugs = await getAllPostSlugsGraphQL();
  return slugs;
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post: PostType | null = await getPostGraphQL(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found - BrandKernel',
      description: 'The requested blog post could not be found.',
    };
  }

  const baseUrl = 'https://www.brandkernel.io';
  const postUrl = `${baseUrl}/blog/${params.slug}`;
  const imageUrl = post.headerImage;
  const publishedDate = new Date(post.date).toISOString();
  const description = post.summary || post.description || `Read "${post.title}" on BrandKernel - Your empathetic AI brand consultant for authentic brand positioning.`;

  return {
    title: `${post.title} - BrandKernel`,
    description: description,
    keywords: post.tags?.join(', ') || 'branding, brand strategy, AI consultant, positioning, authentic branding',
    authors: [{ name: post.author?.name || 'BrandKernel Team' }],
    creator: post.author?.name || 'BrandKernel Team',
    publisher: 'BrandKernel',
    category: 'Business',
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: description,
      url: postUrl,
      siteName: 'BrandKernel',
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedDate,
      authors: [post.author?.name || 'BrandKernel Team'],
      tags: post.tags || ['branding', 'brand strategy'],
      images: imageUrl ? [
        {
          url: imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [
        {
          url: `${baseUrl}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      creator: '@brandkernel',
      site: '@brandkernel',
      images: imageUrl ? [imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl] : [`${baseUrl}/og-default.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// This component definition is correct and will now work.
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post: PostType | null = await getPostGraphQL(params.slug);

  if (!post) {
    notFound();
  }

  const baseUrl = 'https://www.brandkernel.io';
  const postUrl = `${baseUrl}/blog/${params.slug}`;
  const imageUrl = post.headerImage;
  const publishedDate = new Date(post.date).toISOString();

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.summary || post.description || `Read "${post.title}" on BrandKernel`,
    "image": imageUrl ? (imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl) : `${baseUrl}/og-default.jpg`,
    "author": {
      "@type": "Person",
      "name": post.author?.name || 'BrandKernel Team',
      "url": `${baseUrl}/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": "BrandKernel",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "datePublished": publishedDate,
    "dateModified": publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "url": postUrl,
    "keywords": post.tags?.join(', ') || 'branding, brand strategy, AI consultant',
    "articleSection": "Business",
    "wordCount": post.content ? post.content.split(' ').length : 0
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light/50">
        <article className="container mx-auto px-6 py-8 md:px-12 md:py-12 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            
            {/* Hero Image */}
            {imageUrl && (
              <div className="relative h-64 md:h-96 overflow-hidden">
                <Image
                  src={imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            
            <div className="p-8 md:p-12">
              <header className="mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {post.title}
                </h1>
                
                {post.summary && (
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {post.summary}
                  </p>
                )}
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-500 text-sm border-b border-gray-200 pb-6">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">
                      By <span itemProp="author">{post.author?.name || 'BrandKernel Team'}</span>
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-brand-light text-brand-black px-2 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <time dateTime={post.date} className="mt-2 sm:mt-0" itemProp="datePublished">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </header>

              <div itemProp="articleBody">
                <MarkdownContent content={post.content || 'No content available.'} />
              </div>

              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Published on BrandKernel
                  </div>
                  <div className="flex space-x-4">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-purple hover:text-brand-purple/80 transition-colors"
                    >
                      Share on Twitter
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-purple hover:text-brand-purple/80 transition-colors"
                    >
                      Share on LinkedIn
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
