// app/blog/[slug]/page.tsx

import { getPostGraphQL, getAllPostSlugsGraphQL } from "@/lib/contentful/contentful-graphql";
import { Post as PostType } from "@/lib/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";

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
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light/50">
      <article className="container mx-auto px-6 py-8 md:px-12 md:py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {post.heroImage && (
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={post.heroImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/20"></div>
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
                <span className="font-medium">
                  By {post.author?.name || 'BrandKernel Team'}
                </span>
                <time dateTime={post.date} className="mt-2 sm:mt-0">
                  {new Date(post.date).toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </header>

            <MarkdownContent content={post.content} />
          </div>
        </div>
      </article>
    </div>
  );
}
