#!/usr/bin/env node

import contentfulManagement from 'contentful-management'

// Content Model Definition für blogPost (basierend auf deinem bestehenden Model)
const contentModel = {
  // Author Content Type
  author: {
    displayField: 'name',
    name: 'Author',
    description: 'Author of blog posts',
    fields: [
      {
        id: 'name',
        name: 'Name',
        type: 'Symbol',
        required: true,
        validations: []
      },
      {
        id: 'picture',
        name: 'Picture',
        type: 'Link',
        linkType: 'Asset',
        required: false,
        validations: []
      },
      {
        id: 'bio',
        name: 'Bio',
        type: 'Text',
        required: false,
        validations: []
      }
    ]
  },
  
  // Blog Post Content Type
  blogPost: {
    displayField: 'title',
    name: 'Blog Post',
    description: 'A blog post entry',
    fields: [
      {
        id: 'slug',
        name: 'Slug',
        type: 'Symbol',
        required: true,
        validations: [
          {
            unique: true
          },
          {
            regexp: {
              pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
            },
            message: 'Slug must be lowercase, alphanumeric with hyphens only'
          }
        ]
      },
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true,
        validations: [
          {
            size: {
              min: 1,
              max: 200
            }
          }
        ]
      },
      {
        id: 'summary',
        name: 'Summary',
        type: 'Text',
        required: false,
        validations: [
          {
            size: {
              max: 500
            }
          }
        ]
      },
      {
        id: 'headerImage',
        name: 'Header Image',
        type: 'Link',
        linkType: 'Asset',
        required: false,
        validations: [
          {
            linkMimetypeGroup: ['image']
          }
        ]
      },
      {
        id: 'content',
        name: 'Content',
        type: 'Text',
        required: false,
        validations: []
      },
      {
        id: 'author',
        name: 'Author',
        type: 'Link',
        linkType: 'Entry',
        required: false,
        validations: [
          {
            linkContentType: ['author']
          }
        ]
      },
      {
        id: 'date',
        name: 'Date',
        type: 'Date',
        required: false,
        validations: []
      },
      {
        id: 'heroImage',
        name: 'Hero Image',
        type: 'Link',
        linkType: 'Asset',
        required: false,
        validations: [
          {
            linkMimetypeGroup: ['image']
          }
        ]
      },
      {
        id: 'description',
        name: 'Description',
        type: 'Text',
        required: false,
        validations: [
          {
            size: {
              max: 300
            }
          }
        ]
      },
      {
        id: 'tags',
        name: 'Tags',
        type: 'Array',
        items: {
          type: 'Symbol',
          validations: []
        },
        required: false,
        validations: []
      }
    ]
  }
}

async function createContentModel() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID
  const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN

  if (!spaceId || !managementToken) {
    console.error('❌ Missing required environment variables:')
    console.error('CONTENTFUL_SPACE_ID:', spaceId ? '✅' : '❌')
    console.error('CONTENTFUL_MANAGEMENT_TOKEN:', managementToken ? '✅' : '❌')
    console.error('\nPlease set these environment variables and try again.')
    process.exit(1)
  }

  try {
    console.log('🚀 Connecting to Contentful Management API...')
    
    const client = contentfulManagement.createClient({
      accessToken: managementToken
    })

    const space = await client.getSpace(spaceId)
    const environment = await space.getEnvironment('master')

    console.log(`✅ Connected to space: ${space.name}`)

    // Create Author content type first (needed for blogPost reference)
    console.log('📝 Creating Author content type...')
    try {
      const authorContentType = await environment.createContentType(contentModel.author)
      await authorContentType.publish()
      console.log('✅ Author content type created and published')
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('⚠️  Author content type already exists')
      } else {
        throw error
      }
    }

    // Create blogPost content type
    console.log('📝 Creating Blog Post content type...')
    try {
      const blogPostContentType = await environment.createContentType(contentModel.blogPost)
      await blogPostContentType.publish()
      console.log('✅ Blog Post content type created and published')
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('⚠️  Blog Post content type already exists')
      } else {
        throw error
      }
    }

    console.log('\n🎉 Content model setup complete!')
    console.log('Now you can:')
    console.log('1. Add content in your Contentful web app')
    console.log('2. Set up your .env.local file with API tokens')
    console.log('3. Run your Next.js application')

  } catch (error) {
    console.error('❌ Error setting up content model:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  createContentModel()
}

module.exports = { createContentModel, contentModel }
