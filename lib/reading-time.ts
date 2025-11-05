/**
 * Calculate reading time for blog content
 * Average reading speed: 200-250 words per minute
 * We use 225 as a balanced average
 */

export interface ReadingTimeResult {
  minutes: number;
  words: number;
  text: string;
}

export function calculateReadingTime(content: string): ReadingTimeResult {
  // Remove markdown syntax for accurate word count
  const cleanedContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Keep link text only
    .replace(/[#*_~`]/g, '') // Remove markdown formatting
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  // Count words (split by whitespace and filter empty strings)
  const words = cleanedContent.split(/\s+/).filter(word => word.length > 0).length;

  // Calculate reading time (average 225 words per minute)
  const wordsPerMinute = 225;
  const minutes = Math.ceil(words / wordsPerMinute);

  // Generate human-readable text
  const text = minutes === 1 ? '1 min read' : `${minutes} min read`;

  return {
    minutes,
    words,
    text
  };
}

/**
 * Format reading time for display
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return 'Less than 1 min read';
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
}

/**
 * Get reading time from content length
 * Useful when you only have character count
 */
export function estimateReadingTimeFromLength(characterCount: number): ReadingTimeResult {
  // Average word length is ~5 characters + 1 space
  const estimatedWords = Math.floor(characterCount / 6);
  const minutes = Math.ceil(estimatedWords / 225);

  return {
    minutes,
    words: estimatedWords,
    text: formatReadingTime(minutes)
  };
}
