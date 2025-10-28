// Script to analyze blog slugs and create internal linking strategy
const fs = require('fs');
const path = require('path');

// Extract slugs from next.config.mjs redirects
const slugs = [
  'ai-impact-branding-jobs-future',
  '30-day-brand-activation-challenge',
  'branding-perfectionism-define-brand-core',
  'chatgpt-claude-gemini-ai-tools',
  'brandkernel-review-ai-brand-strategy',
  'brand-personality-examples-authentic-voice',
  'branding-cost-small-business-budget',
  'content-repurposing-strategy-branding-5',
  'visibility-for-introverts-brand',
  'micro-saas-branding-memorable-brand',
  'freelance-portfolio-branding',
  'branding-for-therapists-coaches-trust',
  'esch-brand-steering-wheel-markensteuerrad',
  'brand-strategy-packages-small-business',
  'personal-branding-freelancers-brand-core',
  'chatgpt-branding-freelancers',
  'brandkernel-case-study-freelancer-tripled',
  'competitor-analysis-branding-unique-angle',
  'brand-consistency-importance-freelancers-trust',
  'saas-scale-up-branding-evolve',
  'brand-metrics-kpis-business-growth',
  'user-generated-content-branding-trust',
  'brand-kernel-community-authentic-brand',
  'affordable-branding-resources-freelancers-budget',
  'authentic-personal-brand-check-over',
  'ai-competitor-analysis-branding-tools',
  'brand-equity-score-freelancer-calculate',
  'ai-branding-tools-solopreneurs-reality',
  'ai-brand-voice-generator-freelancers',
  'branding-for-freelancers',
  'ai-for-brand-strategy-authentic',
  'consistent-brand-messaging-freelancers-voice',
  'how-to-build-personal-brand',
  'guided-brand-strategy-tool-vs',
  'minimum-viable-brand-startup-branding',
  'brand-identity-guide-core-discovery',
  'personal-branding-digital-nomads-build',
  'linkedin-personal-brand-guide-attract',
  'what-is-brand-marketing-business',
  'using-content-marketing-build-brand',
  'brand-marketing-strategies-small-business',
  'linkedin-personal-branding-freelancers',
  'linkedin-profile-optimization-personal-branding',
  'brand-core-vs-corporate-identity',
  'personal-brand-vs-business-brand',
  'professional-branding-services-freelancers-beyond',
  'using-ai-for-branding-freelancers',
];

// Keywords and themes to look for
const themeKeywords = {
  'AI & Tools': ['ai', 'chatgpt', 'claude', 'gemini', 'tool', 'generator'],
  'Personal Branding': ['personal-brand', 'personal-branding', 'authentic'],
  'Freelancers': ['freelancer', 'freelancers', 'freelance', 'solopreneur'],
  'Founders & Startups': ['founder', 'startup', 'micro-saas', 'saas', 'scale-up', 'mvp', 'minimum-viable'],
  'Brand Strategy': ['brand-strategy', 'brand-core', 'positioning', 'strategy-package', 'brand-identity'],
  'Brand Building': ['branding-for', 'build-brand', 'build-personal', 'create-brand'],
  'Professionals': ['therapist', 'coach', 'digital-nomad', 'introvert'],
  'Marketing & Content': ['content-marketing', 'content-repurposing', 'marketing-strategies', 'user-generated-content'],
  'LinkedIn': ['linkedin'],
  'Brand Analysis': ['competitor-analysis', 'brand-metrics', 'brand-equity', 'kpi'],
  'Brand Voice & Messaging': ['brand-voice', 'messaging', 'personality', 'consistency'],
  'Resources & Guides': ['cost', 'budget', 'affordable', 'resources', 'portfolio'],
  'Brand Theory': ['esch', 'steering-wheel', 'markensteuerrad', 'corporate-identity'],
  'BrandKernel Product': ['brandkernel', 'brand-kernel'],
};

// Categorize slugs
const categories = {};
const slugToCategories = {};

slugs.forEach(slug => {
  const matchedThemes = [];

  Object.entries(themeKeywords).forEach(([theme, keywords]) => {
    keywords.forEach(keyword => {
      if (slug.includes(keyword)) {
        matchedThemes.push(theme);
      }
    });
  });

  // Remove duplicates
  const uniqueThemes = [...new Set(matchedThemes)];
  slugToCategories[slug] = uniqueThemes.length > 0 ? uniqueThemes : ['General Branding'];

  // Add to categories
  uniqueThemes.forEach(theme => {
    if (!categories[theme]) {
      categories[theme] = [];
    }
    categories[theme].push(slug);
  });
});

// Generate linking opportunities
const linkingStrategy = {};

slugs.forEach(slug => {
  const relatedArticles = [];
  const myThemes = slugToCategories[slug];

  // Find articles with overlapping themes
  slugs.forEach(otherSlug => {
    if (slug === otherSlug) return;

    const otherThemes = slugToCategories[otherSlug];
    const overlap = myThemes.filter(theme => otherThemes.includes(theme));

    if (overlap.length > 0) {
      relatedArticles.push({
        slug: otherSlug,
        sharedThemes: overlap,
        relevanceScore: overlap.length
      });
    }
  });

  // Sort by relevance and take top 5
  const topRelated = relatedArticles
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5);

  linkingStrategy[slug] = {
    themes: myThemes,
    relatedArticles: topRelated
  };
});

// Calculate article importance (how many times it's recommended)
const articleImportance = {};
Object.values(linkingStrategy).forEach(article => {
  article.relatedArticles.forEach(related => {
    articleImportance[related.slug] = (articleImportance[related.slug] || 0) + 1;
  });
});

// Output results
console.log('\n=== TOPIC CLUSTERS ===\n');
Object.entries(categories).forEach(([theme, articles]) => {
  console.log(`\n${theme} (${articles.length} articles):`);
  articles.slice(0, 10).forEach(slug => console.log(`  - ${slug}`));
  if (articles.length > 10) console.log(`  ... and ${articles.length - 10} more`);
});

console.log('\n\n=== PRIORITY ARTICLES (Most Recommended) ===\n');
const priorityArticles = Object.entries(articleImportance)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20);

priorityArticles.forEach(([slug, count]) => {
  console.log(`${count} recommendations: ${slug}`);
});

console.log('\n\n=== SAMPLE LINKING STRATEGY ===\n');
const sampleArticles = Object.keys(linkingStrategy).slice(0, 5);
sampleArticles.forEach(slug => {
  console.log(`\n${slug}:`);
  console.log(`  Themes: ${linkingStrategy[slug].themes.join(', ')}`);
  console.log(`  Should link to:`);
  linkingStrategy[slug].relatedArticles.forEach(related => {
    console.log(`    - ${related.slug} (${related.sharedThemes.join(', ')})`);
  });
});

// Save full analysis to file
const fullAnalysis = {
  topicClusters: categories,
  articleCategories: slugToCategories,
  linkingStrategy: linkingStrategy,
  priorityArticles: priorityArticles.map(([slug, count]) => ({ slug, recommendationCount: count }))
};

const outputPath = path.join(__dirname, '..', 'blog-linking-analysis.json');
fs.writeFileSync(outputPath, JSON.stringify(fullAnalysis, null, 2));
console.log(`\n\nFull analysis saved to ${outputPath}`);
