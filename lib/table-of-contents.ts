/**
 * Table of Contents utility functions
 * Extracts headings from markdown content and generates TOC structure
 */

export interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * Generate a URL-friendly slug from heading text
 */
export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Extract headings from markdown content
 * Supports ## (h2) and ### (h3) headings
 */
export function extractHeadings(markdown: string): TOCHeading[] {
  if (!markdown) return [];

  const headings: TOCHeading[] = [];

  // Match markdown headings (## and ###)
  // Also handles headings with inline code, links, etc.
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;

  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length; // Number of # symbols
    const rawText = match[2];

    // Clean the text (remove markdown syntax)
    const cleanText = rawText
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove link markdown, keep text
      .replace(/`([^`]+)`/g, '$1') // Remove inline code markers
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold markers
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic markers
      .trim();

    const id = generateHeadingId(cleanText);

    headings.push({
      id,
      text: cleanText,
      level
    });
  }

  return headings;
}

/**
 * Add IDs to markdown headings for anchor links
 * This transforms markdown headings to include HTML IDs
 */
export function addHeadingIds(markdown: string): string {
  if (!markdown) return '';

  return markdown.replace(/^(#{2,3})\s+(.+)$/gm, (match, hashes, text) => {
    const cleanText = text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .trim();

    const id = generateHeadingId(cleanText);

    // Return heading with HTML anchor
    return `${hashes} <a id="${id}" class="heading-anchor"></a>${text}`;
  });
}

/**
 * Generate JSON-LD structured data for Table of Contents
 * This helps search engines understand content structure
 */
export function generateTOCStructuredData(headings: TOCHeading[], baseUrl: string): object {
  if (headings.length === 0) return {};

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Table of Contents",
    "itemListElement": headings.map((heading, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": heading.text,
      "url": `${baseUrl}#${heading.id}`
    }))
  };
}
