import { MetadataRoute } from 'next'
import { createClient } from '@/lib/contentful/contentful'

// Base URL for the website
const baseUrl = 'https://www.brandkernel.io'

// Static pages configuration with SEO priorities
const staticPages = [
  {
    url: '',
    priority: 1.0,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/about',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/blog',
    priority: 0.9,
    changeFrequency: 'daily' as const,
  },
  {
    url: '/approach',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/how-it-works',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/features',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/pricing',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/manifest',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/waitlist',
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/founder',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/founders',
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/freelancer',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/freelancers',
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/creator',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/creators',
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/contact',
    priority: 0.5,
    changeFrequency: 'yearly' as const,
  },
  {
    url: '/privacy-policy',
    priority: 0.3,
    changeFrequency: 'yearly' as const,
  },
  {
    url: '/imprint',
    priority: 0.3,
    changeFrequency: 'yearly' as const,
  },
]

// Function to get blog posts from Contentful
async function getBlogPosts() {
  try {
    const client = createClient()
    if (!client) {
      console.log('Contentful client not available, skipping blog posts in sitemap')
      return []
    }

    const entries = await client.getEntries({
      content_type: 'blogPost'
    })

    return entries.items.map((item: any) => ({
      slug: item.fields.slug,
      lastModified: item.sys.updatedAt,
      publishedAt: item.sys.createdAt,
    }))
  } catch (error) {
    console.log('Error fetching blog posts for sitemap:', error)
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
  const blogPosts = await getBlogPosts()
  const blogSitemapEntries: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Combine all entries
  return [
    ...staticSitemapEntries,
    ...blogSitemapEntries,
  ]
}