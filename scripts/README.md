# Contentful Slug Migration Script

This script automatically shortens all blog post slugs in Contentful for better SEO.

## What it does

- Removes redundant suffixes like `-guide`, `-tutorial`, `-tips`
- Removes keyword stuffing patterns like `-brand-core-guide`, `-strategic-ai`
- Limits slugs to max 5 segments (words)
- Preserves slug uniqueness

**Example transformations:**
- `personal-branding-freelancers-brand-core-guide` → `personal-branding-freelancers`
- `chatgpt-branding-freelancers-strategic-ai` → `chatgpt-branding-freelancers`
- `brand-strategy-packages-small-business-guide` → `brand-strategy-packages-small-business`

## Prerequisites

### 1. Get Contentful Management Token

1. Go to: https://app.contentful.com/spaces/YOUR_SPACE_ID/api/keys
2. Click "Add API Key" → "Content Management Token"
3. Name it "Slug Migration Script"
4. Copy the token (you won't see it again!)

### 2. Add to Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   ```
   CONTENTFUL_MANAGEMENT_TOKEN=your_token_here
   ```
3. Select all environments (Production, Preview, Development)
4. Save

### 3. Pull environment variables locally

```bash
vercel env pull .env.development.local
```

## Usage

### Step 1: Dry Run (Preview changes)

```bash
npm run shorten-slugs:dry-run
```

This shows you:
- How many slugs will be changed
- Preview of top 10 changes
- Total characters saved
- **No changes are made to Contentful**

### Step 2: Apply changes

```bash
npm run shorten-slugs
```

This will:
- Update all blog post slugs in Contentful
- Publish the changes
- Show progress for each update

### Step 3: Add 301 redirects

After the migration, you MUST add redirects in `next.config.mjs`:

```javascript
// next.config.mjs
async redirects() {
  return [
    // ... existing redirects

    // Slug migrations (generated from script output)
    {
      source: '/blog/personal-branding-freelancers-brand-core-guide',
      destination: '/blog/personal-branding-freelancers',
      permanent: true,
    },
    // ... add all other changed slugs
  ];
}
```

## Safety

✅ **Safe features:**
- Dry run mode to preview changes
- Each change is logged
- Failed updates are reported but don't stop the script
- Original slugs are preserved in Contentful version history

⚠️ **Important notes:**
- This modifies production content in Contentful
- Make sure to run dry-run first
- Add 301 redirects immediately after migration
- Update any hardcoded internal links

## Troubleshooting

### Error: "Missing CONTENTFUL_MANAGEMENT_TOKEN"

→ Make sure you added the token to Vercel and pulled it locally

### Error: "403 Forbidden"

→ Your Management Token doesn't have write permissions. Create a new token with "Content Management" scope.

### Some slugs didn't update

→ Check the error messages. Common issues:
- Slug already exists (uniqueness constraint)
- Entry is in draft state
- Insufficient permissions

## Rollback

If something goes wrong, you can rollback in Contentful:

1. Go to Content → Blog Posts
2. For each affected entry, click "..." → "Version history"
3. Restore the previous version

Or restore all at once via Contentful Management API (contact Contentful support).

## Support

If you encounter issues, check:
- Contentful Space ID is correct
- Management Token has proper permissions
- Environment variables are loaded
- Run with `--dry-run` first to catch errors
