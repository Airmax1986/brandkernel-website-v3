/**
 * Slug optimization utilities for SEO-friendly URLs
 */

/**
 * Shortens blog post slugs by removing redundant keywords
 *
 * Examples:
 * - "personal-branding-freelancers-brand-core-guide" → "personal-branding-freelancers"
 * - "chatgpt-branding-freelancers-strategic-ai" → "chatgpt-branding-freelancers"
 * - "brand-strategy-packages-small-business-guide" → "brand-strategy-packages"
 */
export function shortenSlug(slug: string): string {
  if (!slug) return slug

  // Step 1: Remove common suffixes that add no SEO value
  const suffixesToRemove = [
    '-guide',
    '-tutorial',
    '-tips',
    '-examples',
    '-strategies',
    '-methods',
    '-techniques',
    '-approach',
    '-framework',
    '-system',
    '-process',
    '-steps',
  ]

  let shortened = slug
  suffixesToRemove.forEach(suffix => {
    if (shortened.endsWith(suffix)) {
      shortened = shortened.replace(new RegExp(`${suffix}$`), '')
    }
  })

  // Step 2: Remove redundant keyword repetitions at the end
  const redundantPatterns = [
    /-brand-core-guide$/,
    /-branding-guide$/,
    /-strategy-guide$/,
    /-freelancers-guide$/,
    /-business-guide$/,
    /-strategic-ai$/,
    /-ai-tools$/,
  ]

  redundantPatterns.forEach(pattern => {
    shortened = shortened.replace(pattern, '')
  })

  // Step 3: Limit to max 5 segments (words)
  const segments = shortened.split('-')
  if (segments.length > 5) {
    shortened = segments.slice(0, 5).join('-')
  }

  // Step 4: Remove trailing dashes
  shortened = shortened.replace(/-+$/, '')

  return shortened
}

/**
 * Creates a mapping of old slugs to new shortened slugs for redirects
 */
export function createSlugMapping(oldSlugs: string[]): Record<string, string> {
  const mapping: Record<string, string> = {}

  oldSlugs.forEach(oldSlug => {
    const newSlug = shortenSlug(oldSlug)
    if (oldSlug !== newSlug) {
      mapping[oldSlug] = newSlug
    }
  })

  return mapping
}

/**
 * Generates 301 redirect configuration for next.config.mjs
 */
export function generateRedirectConfig(slugMapping: Record<string, string>): Array<{
  source: string
  destination: string
  permanent: boolean
}> {
  return Object.entries(slugMapping).map(([oldSlug, newSlug]) => ({
    source: `/blog/${oldSlug}`,
    destination: `/blog/${newSlug}`,
    permanent: true, // 301 redirect
  }))
}
