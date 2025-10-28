// app/blog/page.tsx

import { getAllPostsGraphQL } from "@/lib/contentful/contentful-graphql";
import BlogPost from "@/components/BlogPost";
import { Post as PostType } from "@/lib/types"; // Import the type definition
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: 'BrandKernel Blog: Brand Strategy Insights for Founders',
  description: 'Discover actionable brand strategy insights, positioning tips, and clarity frameworks for founders. Learn from real founder journeys and brand transformation stories.',
  path: '/blog',
  image: 'https://www.brandkernel.io/og-blog.jpg',
  tags: ['brand strategy blog', 'founder insights', 'startup positioning', 'brand clarity tips', 'brand strategy articles'],
  authors: ['Maximilian Appelt']
});

export default async function Blog() {
  let posts: PostType[] = [];

  console.log('🔧 Blog page loading...');
  console.log('Environment check:', {
    hasSpaceId: !!process.env.CONTENTFUL_SPACE_ID,
    hasAccessToken: !!process.env.CONTENTFUL_ACCESS_TOKEN,
    spaceIdLength: process.env.CONTENTFUL_SPACE_ID?.length || 0,
    tokenLength: process.env.CONTENTFUL_ACCESS_TOKEN?.length || 0
  });

  try {
    // Only fetch posts if Contentful is configured
    if (process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN) {
      console.log('✅ Contentful configured, fetching posts...');
      posts = await getAllPostsGraphQL();
      console.log('📊 Posts fetched:', posts.length);
    } else {
      console.log('❌ Contentful not configured');
    }
  } catch (error) {
    console.error('❌ Blog posts error:', error);
    posts = [];
  }

  // Generate structured data for blog listing page
  const baseUrl = 'https://www.brandkernel.io';

  // Blog CollectionPage schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${baseUrl}/blog#blog`,
    "url": `${baseUrl}/blog`,
    "name": "BrandKernel Blog - Brand Strategy Insights",
    "description": "Discover actionable brand strategy insights, positioning tips, and clarity frameworks for founders, freelancers, and creators.",
    "publisher": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": "BrandKernel",
      "url": baseUrl
    },
    "inLanguage": "en-US"
  };

  // ItemList schema for blog posts
  const itemListSchema = posts.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": posts.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${baseUrl}/blog/${post.slug}`,
      "name": post.title,
      "item": {
        "@type": "BlogPosting",
        "@id": `${baseUrl}/blog/${post.slug}#article`,
        "headline": post.title,
        "description": post.summary || post.description || `Read ${post.title} on BrandKernel`,
        "image": post.headerImage ? (post.headerImage.startsWith('//') ? `https:${post.headerImage}` : post.headerImage) : `${baseUrl}/og-blog.jpg`,
        "datePublished": new Date(post.date).toISOString(),
        "dateModified": new Date(post.date).toISOString(),
        "author": {
          "@type": "Person",
          "name": post.author?.name || 'BrandKernel Team'
        },
        "publisher": {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`
        }
      }
    }))
  } : null;

  // Combine schemas using @graph
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [blogSchema, itemListSchema].filter(Boolean)
  };

  return (
    <>
      {/* Structured Data for Blog Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      <div className="min-h-screen bg-white text-brand-black py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-brand-black mb-4 font-normal leading-tight">Brand Strategy Insights</h1>
            <p className="text-xl text-brand-black max-w-3xl mx-auto">
              Actionable insights, positioning frameworks, and clarity breakthroughs for founders ready to transform their brand.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.length > 0 ? (
              posts.map((post) => (
                <BlogPost key={post.slug} post={post} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-brand-black">Blog posts coming soon!</p>
                <p className="text-lg text-gray-600 mt-4">We're preparing insightful content about brand strategy, founder positioning, and clarity breakthroughs.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
