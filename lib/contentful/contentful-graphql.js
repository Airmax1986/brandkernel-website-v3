// GraphQL-basierte Contentful API (empfohlen von Vercel)
async function fetchGraphQL(query, preview = false, variables = {}) {
  const token = preview 
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN 
    : process.env.CONTENTFUL_ACCESS_TOKEN
  
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables }),
    }
  ).then((response) => response.json())
}

// GraphQL Queries - simplified without preview parameter issues
const GET_ALL_POSTS = `
  query GetAllPosts {
    blogPostCollection(order: sys_firstPublishedAt_DESC) {
      items {
        sys { id, firstPublishedAt }
        slug
        title
        summary
        date
        headerImage {
          url
          title
        }
        author {
          ... on Author2 {
            name
          }
          ... on BlogAuthors {
            name
          }
          ... on Category {
            name
          }
        }
        description
        tags
      }
    }
  }
`

const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: String!) {
    blogPostCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys { id, firstPublishedAt }
        slug
        title
        summary
        content
        date
        headerImage {
          url
          title
        }
        author {
          ... on Author2 {
            name
          }
          ... on BlogAuthors {
            name
          }
          ... on Category {
            name
          }
        }
        description
        tags
      }
    }
  }
`

const GET_ALL_SLUGS = `
  query GetAllSlugs {
    blogPostCollection {
      items {
        slug
      }
    }
  }
`

// GraphQL-basierte Funktionen
export async function getAllPostsGraphQL(isDraftMode = false) {
  try {
    console.log(`🔍 Fetching posts via GraphQL (draft mode: ${isDraftMode})...`)
    const response = await fetchGraphQL(GET_ALL_POSTS, isDraftMode)
    
    if (response.errors) {
      console.error('GraphQL errors:', response.errors)
      throw new Error('Failed to fetch posts')
    }
    
    console.log('🔍 Full GraphQL response:', JSON.stringify(response, null, 2))
    const posts = response.data?.blogPostCollection?.items || []
    console.log(`✅ Found ${posts.length} posts via GraphQL`)
    console.log('📊 Raw posts data:', posts.map(p => ({ slug: p.slug, title: p.title, hasContent: !!p.content })))
    return posts.map((post) => ({
      slug: post.slug,
      title: post.title || 'Untitled Post',
      date: post.date || post.sys.firstPublishedAt,
      summary: post.summary || '',
      description: post.description || '',
      headerImage: post.headerImage?.url || null,
      tags: post.tags ? post.tags.split(',').map(tag => tag.trim()) : [],
      author: post.author ? { name: post.author.name } : { name: 'BrandKernel Team' },
    }))
  } catch (error) {
    console.error('❌ Error fetching posts via GraphQL:', error)
    return []
  }
}

export async function getPostGraphQL(slug, isDraftMode = false) {
  try {
    console.log(`🔍 Fetching post via GraphQL: ${slug} (draft mode: ${isDraftMode})`)
    const response = await fetchGraphQL(GET_POST_BY_SLUG, isDraftMode, { slug })
    
    if (response.errors) {
      console.error('GraphQL errors:', response.errors)
      return null
    }
    
    console.log('🔍 Full single post GraphQL response:', JSON.stringify(response, null, 2))
    const posts = response.data?.blogPostCollection?.items || []
    if (posts.length === 0) return null
    const post = posts[0]
    console.log(`✅ Found post via GraphQL: ${post.title}`)
    console.log('📊 Raw post data:', { 
      slug: post.slug, 
      title: post.title, 
      hasContent: !!post.content, 
      contentLength: post.content?.length || 0,
      hasAuthor: !!post.author,
      authorData: post.author,
      hasImages: { header: !!post.headerImage, hero: !!post.heroImage }
    })
    return {
      slug: post.slug,
      title: post.title || 'Untitled Post',
      date: post.date || post.sys.firstPublishedAt,
      content: post.content || '',
      summary: post.summary || '',
      description: post.description || '',
      headerImage: post.headerImage?.url || null,
      tags: post.tags ? post.tags.split(',').map(tag => tag.trim()) : [],
      author: post.author ? { name: post.author.name } : { name: 'BrandKernel Team' },
    }
  } catch (error) {
    console.error(`❌ Error fetching post via GraphQL ${slug}:`, error)
    return null
  }
}

export async function getAllPostSlugsGraphQL() {
  try {
    const response = await fetchGraphQL(GET_ALL_SLUGS)
    if (response.errors) {
      console.error('GraphQL errors:', response.errors)
      return []
    }
    const posts = response.data?.blogPostCollection?.items || []
    console.log(`✅ Found ${posts.length} slugs via GraphQL for static generation`)
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('❌ Error fetching slugs via GraphQL:', error)
    return []
  }
}

/**
 * Get related articles based on shared tags
 * Returns up to 3 articles with the most tag overlap
 */
export async function getRelatedPostsGraphQL(currentSlug, currentTags = [], limit = 3) {
  try {
    // Fetch all posts
    const allPosts = await getAllPostsGraphQL()

    // Filter out current post and calculate relevance score
    const postsWithScore = allPosts
      .filter(post => post.slug !== currentSlug)
      .map(post => {
        // Calculate how many tags overlap
        const postTags = post.tags || []
        const sharedTags = postTags.filter(tag => currentTags.includes(tag))
        return {
          ...post,
          relevanceScore: sharedTags.length
        }
      })
      // Sort by relevance (most shared tags first), then by date
      .sort((a, b) => {
        if (b.relevanceScore !== a.relevanceScore) {
          return b.relevanceScore - a.relevanceScore
        }
        return new Date(b.date) - new Date(a.date)
      })
      .slice(0, limit)

    return postsWithScore
  } catch (error) {
    console.error('❌ Error fetching related posts:', error)
    return []
  }
}