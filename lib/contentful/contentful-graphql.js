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
        slug, title, summary, date
        headerImage { url, title }
        author
      }
    }
  }
`

const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: String!) {
    blogPostCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys { id, firstPublishedAt }
        slug, title, summary, content, date
        headerImage { url, title }
        heroImage { url, title }
        author
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
      headerImage: post.headerImage?.url || null,
      author: post.author || 'Cleo',
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
      headerImage: post.headerImage?.url || null,
      heroImage: post.heroImage?.url || null,
      author: post.author || 'Cleo',
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