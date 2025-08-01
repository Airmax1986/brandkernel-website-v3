// app/blog/page.tsx

import { getAllPostsGraphQL } from "@/lib/contentful/contentful-graphql";
import BlogPost from "@/components/BlogPost";
import { Post as PostType } from "@/lib/types"; // Import the type definition

export default async function Blog() {
  // Explicitly tell TypeScript that 'posts' is an array of our PostType
  const posts: PostType[] = await getAllPostsGraphQL();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 bg-white/70 rounded-lg p-4 inline-block shadow-lg">Our Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Now, TypeScript knows that each 'post' is of type PostType */}
        {posts.map((post) => (
          <BlogPost key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
