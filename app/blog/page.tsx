// app/blog/page.tsx

import { getAllPostsGraphQL } from "@/lib/contentful/contentful-graphql";
import BlogPost from "@/components/BlogPost";
import { Post as PostType } from "@/lib/types"; // Import the type definition

export default async function Blog() {
  let posts: PostType[] = [];
  
  try {
    // Only fetch posts if Contentful is configured
    if (process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN) {
      posts = await getAllPostsGraphQL();
    }
  } catch (error) {
    console.log('Blog posts not available:', error);
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
