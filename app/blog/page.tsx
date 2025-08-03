// app/blog/page.tsx

import { getAllPostsGraphQL } from "@/lib/contentful/contentful-graphql";
import BlogPost from "@/components/BlogPost";
import { Post as PostType } from "@/lib/types"; // Import the type definition

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 bg-white/70 rounded-lg p-4 inline-block shadow-lg">Our Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogPost key={post.slug} post={post} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-neutral-600">Blog posts coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
