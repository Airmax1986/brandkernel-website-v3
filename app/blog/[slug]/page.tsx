// app/blog/[slug]/page.tsx

import { getPostGraphQL, getAllPostSlugsGraphQL, getAllPostsGraphQL } from "@/lib/contentful/contentful-graphql";
import { Post as PostType } from "@/lib/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";
import { Metadata } from "next";
import { createBlogPostMetadata } from "@/lib/metadata";
import { BlogBreadcrumbs } from "@/components/Breadcrumbs";
import { getRelatedPosts } from "@/lib/related-posts";
import { calculateReadingTime } from "@/lib/reading-time";
import { extractHeadings, generateTOCStructuredData } from "@/lib/table-of-contents";
import AuthorBio from "@/components/AuthorBio";
import TableOfContents from "@/components/TableOfContents";
import Link from "next/link";

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

  const description = post.summary || post.description || `Read "${post.title}" on BrandKernel - Your empathetic AI brand consultant for authentic brand positioning.`;
  const imageUrl = post.headerImage ? (post.headerImage.startsWith('//') ? `https:${post.headerImage}` : post.headerImage) : undefined;

  return createBlogPostMetadata({
    title: post.title,
    description: description,
    slug: params.slug,
    image: imageUrl,
    publishedTime: new Date(post.date).toISOString(),
    modifiedTime: new Date(post.date).toISOString(),
    authors: [post.author?.name || 'BrandKernel Team'],
    tags: post.tags || ['branding', 'brand strategy', 'AI consultant', 'positioning', 'authentic branding']
  });
}

// This component definition is correct and will now work.
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post: PostType | null = await getPostGraphQL(params.slug);

  if (!post) {
    notFound();
  }

  // Get all posts for related articles
  const allPosts = await getAllPostsGraphQL();
  const relatedPosts = getRelatedPosts(post, allPosts, 3);

  // Calculate reading time
  const readingTime = calculateReadingTime(post.content || '');

  // Extract headings for Table of Contents
  const headings = extractHeadings(post.content || '');
  const showTOC = headings.length >= 3; // Only show TOC if there are at least 3 headings

  const baseUrl = 'https://www.brandkernel.io';
  const postUrl = `${baseUrl}/blog/${params.slug}`;
  const imageUrl = post.headerImage;
  const publishedDate = new Date(post.date).toISOString();

  // Structured Data (JSON-LD) for SEO - BlogPosting + Article
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["BlogPosting", "Article"],
    "headline": post.title,
    "description": post.summary || post.description || `Read "${post.title}" on BrandKernel`,
    "image": {
      "@type": "ImageObject",
      "url": imageUrl ? (imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl) : `${baseUrl}/og-default.jpg`,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": post.author?.name || 'BrandKernel Team',
      "url": `${baseUrl}/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": "BrandKernel",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
        "width": 600,
        "height": 60
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
    "wordCount": post.content ? post.content.split(' ').length : 0,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "commentCount": 0
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container mx-auto px-6 pt-20 pb-8 md:px-12 md:pt-24 md:pb-12 max-w-7xl">
          {/* Breadcrumbs */}
          <BlogBreadcrumbs postTitle={post.title} className="mb-6" />

          {/* Grid Layout: Article + TOC */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Main Article Content */}
            <article className={`${showTOC ? 'lg:col-span-8' : 'lg:col-span-12 max-w-4xl mx-auto'}`}>
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
                  <div className="flex items-center flex-wrap gap-4">
                    <span className="font-medium">
                      By <span itemProp="author">{post.author?.name || 'BrandKernel Team'}</span>
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {readingTime.text}
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

              {/* Author Bio */}
              <div className="mt-12">
                <AuthorBio
                  name={post.author?.name || 'Maximilian Appelt'}
                  bio="Founder of BrandKernel with 20+ years of brand consulting experience. Master of Arts in Visual Communication. Helping founders, freelancers, and creators discover their authentic brand identity through AI-powered strategic dialogue."
                  linkedin="https://www.linkedin.com/in/maximilian-appelt/"
                  website="https://www.brandkernel.io"
                />
              </div>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <section className="mt-16 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                    Related Articles
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="group"
                      >
                        <article className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white h-full flex flex-col">
                          {relatedPost.headerImage && (
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={relatedPost.headerImage.startsWith('//') ? `https:${relatedPost.headerImage}` : relatedPost.headerImage}
                                alt={relatedPost.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-purple transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h3>
                            {relatedPost.summary && (
                              <p className="text-gray-600 text-sm line-clamp-3 flex-1">
                                {relatedPost.summary}
                              </p>
                            )}
                            {relatedPost.tags && relatedPost.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {relatedPost.tags.slice(0, 2).map((tag, index) => (
                                  <span
                                    key={index}
                                    className="bg-brand-light text-brand-black px-2 py-1 rounded-full text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

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

        {/* Table of Contents Sidebar - Only on desktop */}
        {showTOC && (
          <aside className="hidden lg:block lg:col-span-4">
            <TableOfContents headings={headings} />
          </aside>
        )}

        </div>
      </div>
    </div>
  );
}
