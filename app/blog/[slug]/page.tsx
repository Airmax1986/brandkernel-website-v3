// app/blog/[slug]/page.tsx

import { getPostGraphQL, getAllPostSlugsGraphQL } from "@/lib/contentful/contentful-graphql";
import { Post as PostType } from "@/lib/types";
import Image from "next/image";
import { notFound } from "next/navigation";

// This function now receives the correctly formatted data.
export async function generateStaticParams() {
  const slugs = await getAllPostSlugsGraphQL();
  return slugs;
}

// This component definition is correct and will now work.
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post: PostType | null = await getPostGraphQL(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-6 py-8 md:px-12 md:py-12 my-8 bg-white text-gray-800 rounded-lg shadow-2xl">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{post.title}</h1>
      <div className="flex justify-between items-center text-gray-600 mb-8 border-b pb-4">
        <span>By {post.author?.name || 'BrandKernel Team'}</span>
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
      </div>

      {post.heroImage && (
        <div className="relative w-full h-64 md:h-96 mb-8">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
        </div>
      )}

      <div className="prose lg:prose-xl max-w-none">
        {post.content}
      </div>
    </article>
  );
}
