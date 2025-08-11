import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Add webhook validation for security
const WEBHOOK_SECRET = process.env.CONTENTFUL_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  try {
    // Debug: Log all headers to see what Contentful is sending
    console.log('🔍 Webhook headers:', Object.fromEntries(request.headers.entries()))
    
    // Verify webhook secret if configured
    if (WEBHOOK_SECRET) {
      const signature = request.headers.get('x-contentful-webhook-signature')
      console.log('🔐 Expected secret:', WEBHOOK_SECRET)
      console.log('🔐 Received signature:', signature)
      
      if (!signature || signature !== WEBHOOK_SECRET) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const body = await request.json()
    console.log('📝 Contentful webhook received:', body)

    // Check if it's a blog post
    if (body.sys?.contentType?.sys?.id === 'blogPost') {
      const slug = body.fields?.slug?.['en-US'] || body.fields?.slug

      console.log(`🔄 Revalidating blog content for slug: ${slug}`)
      
      // Revalidate specific paths
      revalidatePath('/blog')
      if (slug) {
        revalidatePath(`/blog/${slug}`)
      }
      
      // Revalidate sitemap
      revalidatePath('/sitemap.xml')
      
      return NextResponse.json({ 
        message: 'Blog post revalidated successfully',
        slug,
        revalidated: true 
      })
    }

    // For other content types, revalidate general paths
    console.log('🔄 Revalidating general content')
    revalidatePath('/')
    revalidatePath('/blog')

    return NextResponse.json({ 
      message: 'Content revalidated successfully',
      revalidated: true 
    })

  } catch (error) {
    console.error('❌ Webhook error:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate content' }, 
      { status: 500 }
    )
  }
}