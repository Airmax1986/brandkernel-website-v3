import { Post } from './types';

/**
 * Find related blog posts based on shared tags
 * @param currentPost - The current post being viewed
 * @param allPosts - All available posts
 * @param limit - Maximum number of related posts to return (default: 3)
 * @returns Array of related posts sorted by relevance
 */
export function getRelatedPosts(
  currentPost: Post,
  allPosts: Post[],
  limit: number = 3
): Post[] {
  if (!currentPost.tags || currentPost.tags.length === 0) {
    // If no tags, return most recent posts (excluding current)
    return allPosts
      .filter(post => post.slug !== currentPost.slug)
      .slice(0, limit);
  }

  // Calculate relevance score for each post
  const scoredPosts = allPosts
    .filter(post => post.slug !== currentPost.slug) // Exclude current post
    .map(post => {
      const postTags = post.tags || [];
      const sharedTags = currentPost.tags!.filter(tag => postTags.includes(tag));

      return {
        post,
        score: sharedTags.length,
        sharedTags
      };
    })
    .filter(item => item.score > 0) // Only posts with at least 1 shared tag
    .sort((a, b) => {
      // Sort by score (descending), then by date (newest first)
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    });

  // If we have enough posts with shared tags, return them
  if (scoredPosts.length >= limit) {
    return scoredPosts.slice(0, limit).map(item => item.post);
  }

  // If not enough posts with shared tags, fill with recent posts
  const relatedPosts = scoredPosts.map(item => item.post);
  const remainingSlots = limit - relatedPosts.length;

  if (remainingSlots > 0) {
    const recentPosts = allPosts
      .filter(post =>
        post.slug !== currentPost.slug &&
        !relatedPosts.some(rp => rp.slug === post.slug)
      )
      .slice(0, remainingSlots);

    relatedPosts.push(...recentPosts);
  }

  return relatedPosts;
}
