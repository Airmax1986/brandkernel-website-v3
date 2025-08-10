import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/contentful/contentful'

const baseUrl = 'https://www.brandkernel.io'

// Enhanced page configuration with better SEO priorities
const staticPages = [
  { url: '', priority: 1.0, changeFrequency: 'daily' as const },
  { url: '/pricing', priority: 0.95, changeFrequency: 'weekly' as const },
  { url: '/features', priority: 0.9, changeFrequency: 'weekly' as const },
  { url: '/how-it-works', priority: 0.85, changeFrequency: 'monthly' as const },
  { url: '/blog', priority: 0.85, changeFrequency: 'daily' as const },
  { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/approach', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/founders', priority: 0.75, changeFrequency: 'monthly' as const },
  { url: '/freelancers', priority: 0.75, changeFrequency: 'monthly' as const },
  { url: '/creators', priority: 0.75, changeFrequency: 'monthly' as const },
  { url: '/manifest', priority: 0.7, changeFrequency: 'yearly' as const },
  { url: '/waitlist', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/contact', priority: 0.5, changeFrequency: 'yearly' as const },
  { url: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
  { url: '/imprint', priority: 0.3, changeFrequency: 'yearly' as const },
]

// Future dynamic pages that will be added
const futurePages = {
  tools: [
    { slug: 'brand-audit', priority: 0.9 },
    { slug: 'brand-personality-quiz', priority: 0.85 },
    { slug: 'competitor-analysis', priority: 0.85 },
    { slug: 'brand-name-generator', priority: 0.8 },
  ],
  alternatives: [
    { slug: 'brandbuildr', priority: 0.85 },
    { slug: 'brand-ai', priority: 0.85 },
    { slug: 'personalbrandpro', priority: 0.8 },
  ],
  guides: [
    { slug: 'ai-brand-strategy', priority: 0.8 },
    { slug: 'personal-branding', priority: 0.8 },
    { slug: 'startup-branding', priority: 0.75 },
  ],
  templates: [
    { slug: 'brand-strategy', priority: 0.75 },
    { slug: 'brand-audit-checklist', priority: 0.75 },
    { slug: 'positioning-statement', priority: 0.7 },
  ],
}

// Get blog posts from Contentful
async function getBlogPosts() {
  try {
    console.log('Fetching blog posts for sitemap...')
    const posts = await getAllPosts()
    
    if (!posts || posts.length === 0) {
      console.log('No blog posts found for sitemap')
      return []
    }

    console.log(`Found ${posts.length} blog posts for sitemap`)
    return posts.map((post: any) => ({
      slug: post.slug,
      lastModified: post.date || new Date().toISOString(),
    }))
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date()
  
  // Generate static pages
  const staticSitemapEntries: MetadataRoute.Sitemap = staticPages.map(page => ({
    url: `${baseUrl}${page.url}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // Get dynamic blog posts
  let blogSitemapEntries: MetadataRoute.Sitemap = []
  try {
    const blogPosts = await getBlogPosts()
    blogSitemapEntries = blogPosts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.lastModified),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Failed to generate blog sitemap entries:', error)
  }

  // Note: Add future dynamic pages here when they're created
  // const toolEntries = futurePages.tools.map(tool => ({
  //   url: `${baseUrl}/free-tools/${tool.slug}`,
  //   lastModified: currentDate,
  //   changeFrequency: 'weekly' as const,
  //   priority: tool.priority,
  // }))

  // Combine all entries
  return [
    ...staticSitemapEntries,
    ...blogSitemapEntries,
  ]
}