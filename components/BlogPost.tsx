// components/BlogPost.tsx
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/types"; // Importieren Sie den neuen Typ

export default function BlogPost({ post }: { post: Post }) { // Verwenden Sie den 'Post' Typ statt 'any'
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="blog-post-card border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {post.headerImage && (
          <Image
            src={post.headerImage}
            alt={post.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-700">{post.summary}</p>
        </div>
      </div>
    </Link>
  );
}
