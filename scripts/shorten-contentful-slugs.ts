/**
 * Contentful Slug Migration Script
 *
 * This script uses the Contentful Management API to automatically shorten
 * all blog post slugs for better SEO.
 *
 * Usage:
 *   npm run shorten-slugs -- --dry-run  # Preview changes without applying
 *   npm run shorten-slugs              # Apply changes to Contentful
 *
 * Environment Variables Required:
 *   - CONTENTFUL_SPACE_ID
 *   - CONTENTFUL_MANAGEMENT_TOKEN (CMA token, not CDA token!)
 */

import { createClient } from 'contentful-management'
import { shortenSlug, createSlugMapping } from '../lib/slug-utils'

interface BlogPostEntry {
  sys: {
    id: string
    version: number
  }
  fields: {
    slug: {
      'en-US': string
    }
    title: {
      'en-US': string
    }
  }
}

async function main() {
  const isDryRun = process.argv.includes('--dry-run')

  console.log('🚀 Starting Contentful slug migration...')
  console.log(`Mode: ${isDryRun ? 'DRY RUN (no changes will be made)' : 'LIVE (changes will be applied)'}`)
  console.log('')

  // Validate environment variables
  const spaceId = process.env.CONTENTFUL_SPACE_ID
  const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN

  if (!spaceId || !managementToken) {
    console.error('❌ Error: Missing required environment variables')
    console.error('Required:')
    console.error('  - CONTENTFUL_SPACE_ID')
    console.error('  - CONTENTFUL_MANAGEMENT_TOKEN')
    console.error('')
    console.error('Get your Management Token from:')
    console.error('https://app.contentful.com/spaces/' + (spaceId || 'YOUR_SPACE') + '/api/keys')
    process.exit(1)
  }

  try {
    // Initialize Contentful Management API client
    const client = createClient({
      accessToken: managementToken,
    })

    const space = await client.getSpace(spaceId)
    const environment = await space.getEnvironment('master')

    console.log('✅ Connected to Contentful')
    console.log(`   Space: ${space.name} (${spaceId})`)
    console.log('')

    // Fetch all blog posts
    console.log('📥 Fetching all blog posts...')
    const entries = await environment.getEntries({
      content_type: 'blogPost',
      limit: 1000,
    })

    console.log(`   Found ${entries.items.length} blog posts`)
    console.log('')

    // Analyze slugs
    const changes: Array<{
      id: string
      title: string
      oldSlug: string
      newSlug: string
      saved: number // Characters saved
    }> = []

    entries.items.forEach((entry: any) => {
      const oldSlug = entry.fields.slug?.['en-US']
      const title = entry.fields.title?.['en-US'] || 'Untitled'

      if (!oldSlug) {
        console.warn(`⚠️  Skipping entry without slug: ${title}`)
        return
      }

      const newSlug = shortenSlug(oldSlug)

      if (oldSlug !== newSlug) {
        changes.push({
          id: entry.sys.id,
          title,
          oldSlug,
          newSlug,
          saved: oldSlug.length - newSlug.length,
        })
      }
    })

    // Report findings
    console.log('📊 Analysis Results:')
    console.log(`   Total posts: ${entries.items.length}`)
    console.log(`   Posts to update: ${changes.length}`)
    console.log(`   Posts unchanged: ${entries.items.length - changes.length}`)
    console.log('')

    if (changes.length === 0) {
      console.log('✨ All slugs are already optimized!')
      return
    }

    // Show top 10 changes
    console.log('🔍 Preview of changes (top 10):')
    console.log('─'.repeat(80))
    changes.slice(0, 10).forEach((change, index) => {
      console.log(`${index + 1}. ${change.title}`)
      console.log(`   Old: /blog/${change.oldSlug}`)
      console.log(`   New: /blog/${change.newSlug}`)
      console.log(`   Saved: ${change.saved} characters`)
      console.log('')
    })

    if (changes.length > 10) {
      console.log(`   ... and ${changes.length - 10} more`)
      console.log('')
    }

    // Calculate total characters saved
    const totalSaved = changes.reduce((sum, c) => sum + c.saved, 0)
    console.log(`💾 Total characters saved: ${totalSaved}`)
    console.log('')

    if (isDryRun) {
      console.log('✅ Dry run complete - no changes were made')
      console.log('   Run without --dry-run to apply these changes')
      return
    }

    // Apply changes
    console.log('🔄 Applying changes to Contentful...')
    let successCount = 0
    let errorCount = 0

    for (const change of changes) {
      try {
        const entry = await environment.getEntry(change.id)

        // Update slug field
        entry.fields.slug = {
          'en-US': change.newSlug,
        }

        // Save and publish
        const updatedEntry = await entry.update()
        await updatedEntry.publish()

        successCount++
        console.log(`   ✅ Updated: ${change.newSlug}`)
      } catch (error) {
        errorCount++
        console.error(`   ❌ Failed: ${change.oldSlug}`)
        console.error(`      Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    console.log('')
    console.log('✨ Migration complete!')
    console.log(`   Successful: ${successCount}`)
    console.log(`   Failed: ${errorCount}`)
    console.log('')
    console.log('⚠️  Next steps:')
    console.log('   1. Add 301 redirects in next.config.mjs')
    console.log('   2. Test the new URLs')
    console.log('   3. Update internal links if needed')
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error')
    process.exit(1)
  }
}

// Run the script
main()
