import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/types';

interface RelatedArticlesProps {
  articles: Post[];
  currentSlug: string;
}

/**
 * Related Articles Component
 * Displays up to 3 related blog posts at the bottom of each article
 */
export default function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  // Filter out current article and limit to 3
  const relatedPosts = articles
    .filter(post => post.slug !== currentSlug)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        Related Articles
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {relatedPosts.map((post) => {
          const imageUrl = post.headerImage
            ? (post.headerImage.startsWith('//') ? `https:${post.headerImage}` : post.headerImage)
            : '/images/blog-placeholder.jpg';

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Article Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Article Content */}
              <div className="p-6">
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-brand-light text-brand-black px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-purple transition-colors">
                  {post.title}
                </h3>

                {/* Summary */}
                {post.summary && (
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {post.summary}
                  </p>
                )}

                {/* Date */}
                <time className="text-xs text-gray-500">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
