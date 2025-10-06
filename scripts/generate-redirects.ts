/**
 * Generate 301 redirects for shortened blog slugs
 *
 * This creates the redirect configuration to add to next.config.mjs
 */

import { shortenSlug } from '../lib/slug-utils'

// All old slugs that were changed
const changedSlugs = [
  'ai-impact-branding-jobs-future-designers',
  '30-day-brand-activation-challenge-freelancers',
  'branding-perfectionism-define-brand-core-freelancers',
  'chatgpt-claude-gemini-ai-tools-branding-text',
  'brandkernel-review-ai-brand-strategy-freelancers',
  'brand-personality-examples-authentic-voice-freelancers',
  'branding-cost-small-business-budget-guide',
  'content-repurposing-strategy-branding-5-channels',
  'visibility-for-introverts-brand-strategies',
  'micro-saas-branding-memorable-brand-budget',
  'freelance-portfolio-branding-guide',
  'branding-for-therapists-coaches-trust-building',
  'esch-brand-steering-wheel-markensteuerrad-english-guide',
  'brand-strategy-packages-small-business-guide',
  'personal-branding-freelancers-brand-core-guide',
  'chatgpt-branding-freelancers-strategic-ai',
  'brandkernel-case-study-freelancer-tripled-clients',
  'competitor-analysis-branding-unique-angle-framework',
  'brand-consistency-importance-freelancers-trust-building',
  'saas-scale-up-branding-evolve-brand-guide',
  'brand-metrics-kpis-business-growth-measurement',
  'user-generated-content-branding-trust-strategies',
  'brand-kernel-community-authentic-brand-network',
  'affordable-branding-resources-freelancers-budget-tools',
  'authentic-personal-brand-check-over-optimize-tips',
  'ai-competitor-analysis-branding-tools-market-research',
  'brand-equity-score-freelancer-calculate-value-guide',
  'ai-branding-tools-solopreneurs-reality-check',
  'ai-brand-voice-generator-freelancers-authentic-guide',
  'branding-for-freelancers-examples',
  'ai-for-brand-strategy-authentic-positioning',
  'consistent-brand-messaging-freelancers-voice-guide',
  'how-to-build-personal-brand-freelance',
  'guided-brand-strategy-tool-vs-chatgpt-comparison',
  'minimum-viable-brand-startup-branding-essentials',
  'brand-identity-guide-core-discovery-framework',
  'personal-branding-digital-nomads-build-reputation',
  'linkedin-personal-brand-guide-attract-clients',
  'what-is-brand-marketing-business-guide',
  'using-content-marketing-build-brand-strategy',
  'brand-marketing-strategies-small-business-growth',
  'content-marketing-for-branding-strategy',
  'linkedin-personal-branding-freelancers-guide',
  'linkedin-profile-optimization-personal-branding-tips',
  'brand-core-vs-corporate-identity-difference',
  'personal-brand-vs-business-brand-freelancers',
  'professional-branding-services-freelancers-beyond-logo',
  'using-ai-for-branding-freelancers-guide',
]

function generateRedirects() {
  console.log('// ========================================')
  console.log('// Blog Slug Redirects (SEO Optimization)')
  console.log('// Generated:', new Date().toISOString())
  console.log('// ========================================\n')

  const redirects = changedSlugs.map(oldSlug => {
    const newSlug = shortenSlug(oldSlug)
    return {
      source: `/blog/${oldSlug}`,
      destination: `/blog/${newSlug}`,
      permanent: true,
    }
  })

  // Output as JavaScript array for next.config.mjs
  console.log('const blogSlugRedirects = [')
  redirects.forEach((redirect, index) => {
    const comma = index < redirects.length - 1 ? ',' : ''
    console.log(`  {`)
    console.log(`    source: '${redirect.source}',`)
    console.log(`    destination: '${redirect.destination}',`)
    console.log(`    permanent: true,`)
    console.log(`  }${comma}`)
  })
  console.log('];')
  console.log()
  console.log('// Add to your redirects() function in next.config.mjs:')
  console.log('// return [...blogSlugRedirects, ...otherRedirects];')
}

generateRedirects()
