import { createClient } from 'contentful'

// Debug-Funktion für Environment Variables
function validateEnvironmentVariables() {
  const requiredVars = {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  }

  const missing = Object.entries(requiredVars)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missing.length > 0) {
    console.error('❌ Missing environment variables:', missing)
    console.error('Available env vars:', Object.keys(process.env).filter(key => key.startsWith('CONTENTFUL')))
    
    // In Production: Return empty data instead of crashing
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️ Missing Contentful credentials - returning empty data')
      return false
    }
    
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }

  console.log('✅ All Contentful environment variables are loaded')
  return true
}

// Sichere Client-Erstellung mit Fallback
function createContentfulClient() {
  if (!validateEnvironmentVariables()) {
    // Return mock client for production builds without env vars
    return null
  }

  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })
}

function createPreviewClient() {
  if (!process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
    return null
  }

  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    host: 'preview.contentful.com',
  })
}

const client = createContentfulClient()
const previewClient = createPreviewClient()

const getClient = (preview = false) => {
  if (preview && previewClient) return previewClient
  return client
}

// Blog Posts abrufen mit Fallback für fehlende Credentials
export async function getAllPosts(isDraftMode = false) {
  // Fallback wenn keine Contentful Credentials
  if (!client) {
    console.warn('⚠️ Contentful client not available - returning empty posts array')
    return []
  }

  try {
    console.log(`🔍 Fetching posts (draft mode: ${isDraftMode})...`)
    
    const entries = await getClient(isDraftMode).getEntries({
      content_type: 'blogPost',
      order: '-sys.createdAt',
    })

    console.log(`✅ Found ${entries.items.length} posts`)

    return entries.items.map((item) => ({
      slug: item.fields.slug,
      title: item.fields.title,
      date: item.fields.date || item.sys.createdAt,
      summary: item.fields.summary,
      description: item.fields.description,
      headerImage: item.fields.headerImage?.fields?.file?.url,
      heroImage: item.fields.heroImage?.fields?.file?.url,
      content: item.fields.content,
      tags: item.fields.tags,
      author: item.fields.author ? {
        name: item.fields.author.fields?.name,
      } : null,
    }))
  } catch (error) {
    console.error('❌ Error fetching posts:', error)
    // In Production: Return empty array instead of crashing
    return []
  }
}

// Einzelnen Post abrufen mit Fallback
export async function getPost(slug, isDraftMode = false) {
  if (!client) {
    console.warn('⚠️ Contentful client not available - returning null for post')
    return null
  }

  try {
    console.log(`🔍 Fetching post with slug: ${slug} (draft mode: ${isDraftMode})`)
    
    const entries = await getClient(isDraftMode).getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    })

    if (entries.items.length === 0) {
      console.log(`❌ Post not found: ${slug}`)
      return null
    }

    const post = entries.items[0]
    console.log(`✅ Found post: ${post.fields.title}`)

    return {
      slug: post.fields.slug,
      title: post.fields.title,
      date: post.fields.date || post.sys.createdAt,
      content: post.fields.content,
      summary: post.fields.summary,
      description: post.fields.description,
      headerImage: post.fields.headerImage?.fields?.file?.url,
      heroImage: post.fields.heroImage?.fields?.file?.url,
      tags: post.fields.tags,
      author: post.fields.author ? {
        name: post.fields.author.fields?.name,
      } : null,
    }
  } catch (error) {
    console.error(`❌ Error fetching post ${slug}:`, error)
    return null
  }
}

// Alle Slugs für Static Generation mit Fallback
export async function getAllPostSlugs() {
  if (!client) {
    console.warn('⚠️ Contentful client not available - returning empty slugs array')
    return []
  }

  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      select: 'fields.slug',
    })

    console.log(`✅ Found ${entries.items.length} slugs for static generation`)

    return entries.items.map((item) => ({
      params: {
        slug: item.fields.slug,
      },
    }))
  } catch (error) {
    console.error('❌ Error fetching slugs:', error)
    return []
  }
}

// Autoren abrufen mit Fallback
export async function getAllAuthors(isDraftMode = false) {
  if (!client) return []

  try {
    const entries = await getClient(isDraftMode).getEntries({
      content_type: 'author',
      order: 'fields.name',
    })

    return entries.items.map((item) => ({
      name: item.fields.name,
      bio: item.fields.bio,
    }))
  } catch (error) {
    console.error('❌ Error fetching authors:', error)
    return []
  }
}

// Posts nach Kategorie filtern mit Fallback
export async function getPostsByCategory(category, isDraftMode = false) {
  if (!client) return []

  try {
    const entries = await getClient(isDraftMode).getEntries({
      content_type: 'blogPost',
      'fields.category.sys.id': category,
      order: '-sys.createdAt',
    })

    return entries.items.map((item) => ({
      slug: item.fields.slug,
      title: item.fields.title,
      date: item.fields.date || item.sys.createdAt,
      summary: item.fields.summary,
      headerImage: item.fields.headerImage?.fields?.file?.url,
    }))
  } catch (error) {
    console.error('❌ Error fetching posts by category:', error)
    return []
  }
}
