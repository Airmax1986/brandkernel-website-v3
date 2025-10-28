// app/blog/[slug]/page.tsx

import { getPostGraphQL, getAllPostSlugsGraphQL, getAllPostsGraphQL } from "@/lib/contentful/contentful-graphql";
import { Post as PostType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";
import { Metadata } from "next";
import { createBlogPostMetadata } from "@/lib/metadata";
import { BlogBreadcrumbs } from "@/components/Breadcrumbs";
import HeaderNav from "@/components/HeaderNav";

// Static generation hints for better SEO
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

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

/**
 * Get related posts based on tag similarity
 * This creates automatic internal linking between blog posts - CRITICAL for SEO
 */
async function getRelatedPosts(currentSlug: string, currentTags: string[] = []): Promise<PostType[]> {
  try {
    // Fetch all posts
    const allPosts = await getAllPostsGraphQL();

    if (!allPosts || allPosts.length === 0) {
      return [];
    }

    // Calculate relevance score for each post
    const postsWithScores = allPosts
      .filter((post: PostType) => post.slug !== currentSlug) // Exclude current post
      .map((post: PostType) => {
        // Count matching tags
        const postTags = post.tags || [];
        const matchingTags = postTags.filter((tag: string) =>
          currentTags.some((currentTag: string) =>
            currentTag.toLowerCase() === tag.toLowerCase()
          )
        );

        return {
          post,
          score: matchingTags.length
        };
      })
      .filter(item => item.score > 0) // Only posts with at least 1 matching tag
      .sort((a, b) => b.score - a.score) // Sort by relevance
      .slice(0, 3) // Take top 3
      .map(item => item.post); // Return just the posts without score

    return postsWithScores;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

// This component definition is correct and will now work.
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post: PostType | null = await getPostGraphQL(params.slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts for internal linking
  const relatedPosts = await getRelatedPosts(params.slug, post.tags || []);

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
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeaderNav />
      <div className="min-h-screen bg-brand-green">
        <article className="container mx-auto px-10 pt-20 pb-8 md:px-12 md:pt-24 md:pb-12 max-w-4xl">
          {/* Breadcrumbs */}
          <BlogBreadcrumbs postTitle={post.title} className="mb-6" />
          
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

              {/* Related Posts Section - CRITICAL FOR SEO INTERNAL LINKING */}
              {relatedPosts.length > 0 && (
                <section className="mt-12 pt-12 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-brand-black mb-6">
                    Related Articles
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="group border-2 border-gray-200 rounded-lg p-6 hover:border-brand-purple hover:shadow-lg transition-all duration-200"
                      >
                        <h3 className="font-semibold text-lg text-brand-black mb-3 group-hover:text-brand-purple transition-colors">
                          {relatedPost.title}
                        </h3>
                        {relatedPost.summary && (
                          <p className="text-sm text-gray-600 line-clamp-3">
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
                        <div className="mt-4 text-brand-purple text-sm font-medium group-hover:underline">
                          Read more →
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
