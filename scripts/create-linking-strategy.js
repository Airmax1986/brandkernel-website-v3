// Enhanced script to create comprehensive internal linking strategy
const fs = require('fs');
const path = require('path');

// All blog slugs extracted from next.config.mjs redirects
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

// Convert slugs to human-readable titles
function slugToTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Detailed theme categorization
const themeDefinitions = {
  'AI & Automation': {
    keywords: ['ai', 'chatgpt', 'claude', 'gemini', 'tool', 'generator', 'automation'],
    description: 'Articles about using AI tools for branding and brand strategy'
  },
  'Personal Branding': {
    keywords: ['personal-brand', 'personal-branding', 'authentic-voice', 'authentic-brand'],
    description: 'Building and developing personal brands'
  },
  'Freelancers & Solopreneurs': {
    keywords: ['freelancer', 'freelancers', 'freelance', 'solopreneur', 'solo'],
    description: 'Branding specifically for independent professionals'
  },
  'Founders & Startups': {
    keywords: ['founder', 'startup', 'micro-saas', 'saas', 'scale-up', 'minimum-viable', 'mvp'],
    description: 'Brand strategy for founders and growing companies'
  },
  'Brand Strategy & Core': {
    keywords: ['brand-strategy', 'brand-core', 'positioning', 'brand-identity', 'strategy-package'],
    description: 'Fundamental brand strategy and positioning work'
  },
  'Brand Building & Implementation': {
    keywords: ['build-brand', 'build-personal', 'activation', 'implementation'],
    description: 'Practical steps to build and activate brands'
  },
  'Industry-Specific': {
    keywords: ['therapist', 'coach', 'digital-nomad', 'introvert', 'service'],
    description: 'Branding for specific professional niches'
  },
  'Content & Marketing': {
    keywords: ['content-marketing', 'content-repurposing', 'marketing-strategies', 'user-generated-content', 'marketing'],
    description: 'Content strategy and marketing tactics for brand building'
  },
  'LinkedIn Strategy': {
    keywords: ['linkedin'],
    description: 'LinkedIn-specific personal branding and professional presence'
  },
  'Brand Measurement': {
    keywords: ['metrics', 'kpi', 'equity', 'measurement', 'calculate', 'score'],
    description: 'Measuring and tracking brand performance'
  },
  'Brand Voice & Messaging': {
    keywords: ['voice', 'messaging', 'personality', 'consistency', 'consistent'],
    description: 'Developing authentic brand voice and consistent messaging'
  },
  'Resources & Tools': {
    keywords: ['cost', 'budget', 'affordable', 'resources', 'portfolio', 'services'],
    description: 'Practical resources, budgeting, and tools for branding'
  },
  'Competitor Analysis': {
    keywords: ['competitor', 'competitive', 'unique-angle', 'differentiation'],
    description: 'Competitive positioning and market differentiation'
  },
  'Brand Theory & Frameworks': {
    keywords: ['esch', 'steering-wheel', 'markensteuerrad', 'corporate-identity', 'framework', 'theory'],
    description: 'Academic and theoretical branding frameworks'
  },
  'BrandKernel Platform': {
    keywords: ['brandkernel', 'brand-kernel', 'case-study', 'review', 'community'],
    description: 'Content about BrandKernel product and community'
  },
};

// Categorize articles into topic clusters
const topicClusters = {};
const articleMetadata = {};

slugs.forEach(slug => {
  const matchedThemes = [];
  const keywords = [];

  Object.entries(themeDefinitions).forEach(([theme, def]) => {
    const matches = def.keywords.filter(kw => slug.includes(kw));
    if (matches.length > 0) {
      matchedThemes.push(theme);
      keywords.push(...matches);
    }
  });

  // Default to general if no matches
  if (matchedThemes.length === 0) {
    matchedThemes.push('General Branding');
  }

  // Remove duplicates
  const uniqueThemes = [...new Set(matchedThemes)];
  const uniqueKeywords = [...new Set(keywords)];

  articleMetadata[slug] = {
    title: slugToTitle(slug),
    themes: uniqueThemes,
    keywords: uniqueKeywords,
    slug: slug,
    url: `/blog/${slug}`
  };

  // Add to topic clusters
  uniqueThemes.forEach(theme => {
    if (!topicClusters[theme]) {
      topicClusters[theme] = [];
    }
    topicClusters[theme].push(slug);
  });
});

// Generate linking recommendations for each article
const linkingRecommendations = {};

slugs.forEach(slug => {
  const article = articleMetadata[slug];
  const recommendations = [];

  // Find related articles based on:
  // 1. Shared themes (highest priority)
  // 2. Keyword overlap
  // 3. Semantic relationships

  slugs.forEach(otherSlug => {
    if (slug === otherSlug) return;

    const other = articleMetadata[otherSlug];

    // Calculate relevance score
    let score = 0;
    let sharedThemes = article.themes.filter(t => other.themes.includes(t));
    let sharedKeywords = article.keywords.filter(k => other.keywords.includes(k));

    score += sharedThemes.length * 3; // Themes worth 3 points each
    score += sharedKeywords.length * 1; // Keywords worth 1 point each

    // Bonus for complementary content
    if (article.themes.includes('Brand Strategy & Core') && other.themes.includes('Brand Building & Implementation')) {
      score += 2;
    }
    if (article.themes.includes('AI & Automation') && other.themes.includes('Brand Strategy & Core')) {
      score += 2;
    }
    if (article.themes.includes('Freelancers & Solopreneurs') && other.themes.includes('Personal Branding')) {
      score += 1;
    }

    if (score > 0) {
      recommendations.push({
        slug: otherSlug,
        title: other.title,
        score: score,
        sharedThemes: sharedThemes,
        reason: sharedThemes.length > 0 ? `Shares ${sharedThemes.join(', ')} theme(s)` : 'Related content'
      });
    }
  });

  // Sort by score and take top 5
  recommendations.sort((a, b) => b.score - a.score);
  const topRecommendations = recommendations.slice(0, 5);

  // Generate anchor text suggestions
  const anchorTextSuggestions = topRecommendations.map(rec => {
    const other = articleMetadata[rec.slug];
    const suggestions = [];

    // Extract key phrases from the slug
    if (other.slug.includes('how-to-build')) {
      suggestions.push('how to build a personal brand', 'building your personal brand');
    } else if (other.slug.includes('linkedin')) {
      suggestions.push('LinkedIn personal branding', 'optimizing your LinkedIn profile', 'LinkedIn strategy');
    } else if (other.slug.includes('ai')) {
      suggestions.push('AI branding tools', 'using AI for brand strategy', 'AI-powered branding');
    } else if (other.slug.includes('freelancer')) {
      suggestions.push('branding for freelancers', 'freelance brand strategy', 'freelancer branding guide');
    } else {
      // Generate generic suggestions from title
      suggestions.push(
        other.title.toLowerCase(),
        other.slug.split('-').slice(0, 4).join(' ')
      );
    }

    return {
      ...rec,
      anchorTextOptions: suggestions.slice(0, 3)
    };
  });

  linkingRecommendations[slug] = {
    article: article,
    recommendations: anchorTextSuggestions
  };
});

// Calculate article importance (how often it's recommended)
const articleImportance = {};
Object.values(linkingRecommendations).forEach(entry => {
  entry.recommendations.forEach(rec => {
    articleImportance[rec.slug] = (articleImportance[rec.slug] || 0) + 1;
  });
});

// Identify hub articles (highly connected)
const hubArticles = Object.entries(articleImportance)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)
  .map(([slug, count]) => ({
    slug,
    title: articleMetadata[slug].title,
    recommendationCount: count,
    themes: articleMetadata[slug].themes,
    impact: count > 15 ? 'High' : count > 10 ? 'Medium' : 'Low'
  }));

// Identify quick wins (articles that should be easy to link)
const quickWins = slugs
  .filter(slug => {
    const recs = linkingRecommendations[slug].recommendations;
    return recs.length >= 3 && recs[0].score >= 6;
  })
  .map(slug => ({
    slug,
    title: articleMetadata[slug].title,
    topLinks: linkingRecommendations[slug].recommendations.slice(0, 3),
    reason: 'High number of strongly related articles'
  }));

// Create final report data
const reportData = {
  summary: {
    totalArticles: slugs.length,
    totalClusters: Object.keys(topicClusters).length,
    averageLinksPerArticle: Math.round((Object.values(linkingRecommendations).reduce((sum, r) => sum + r.recommendations.length, 0) / slugs.length) * 10) / 10,
    hubArticlesCount: hubArticles.length,
    quickWinsCount: quickWins.length
  },
  topicClusters: Object.entries(topicClusters).map(([theme, articles]) => ({
    theme,
    description: themeDefinitions[theme]?.description || 'General branding content',
    articleCount: articles.length,
    articles: articles.map(slug => ({
      slug,
      title: articleMetadata[slug].title,
      url: `/blog/${slug}`
    }))
  })).sort((a, b) => b.articleCount - a.articleCount),
  hubArticles,
  quickWins,
  linkingRecommendations: Object.entries(linkingRecommendations).map(([slug, data]) => ({
    slug,
    title: data.article.title,
    themes: data.article.themes,
    url: data.article.url,
    recommendations: data.recommendations
  }))
};

// Save JSON file
const jsonPath = path.join(__dirname, '..', 'internal-linking-strategy.json');
fs.writeFileSync(jsonPath, JSON.stringify(reportData, null, 2));
console.log(`✅ Saved detailed analysis to ${jsonPath}`);

// Output summary to console
console.log('\n=== INTERNAL LINKING STRATEGY SUMMARY ===\n');
console.log(`Total Articles Analyzed: ${reportData.summary.totalArticles}`);
console.log(`Topic Clusters: ${reportData.summary.totalClusters}`);
console.log(`Average Links per Article: ${reportData.summary.averageLinksPerArticle}`);
console.log(`Hub Articles (high-priority): ${reportData.summary.hubArticlesCount}`);
console.log(`Quick Win Opportunities: ${reportData.summary.quickWinsCount}`);

console.log('\n=== TOP TOPIC CLUSTERS ===\n');
reportData.topicClusters.slice(0, 5).forEach(cluster => {
  console.log(`${cluster.theme}: ${cluster.articleCount} articles`);
});

console.log('\n=== TOP HUB ARTICLES (Most Recommended) ===\n');
hubArticles.slice(0, 10).forEach((hub, i) => {
  console.log(`${i + 1}. ${hub.title}`);
  console.log(`   Recommendations: ${hub.recommendationCount} | Themes: ${hub.themes.join(', ')}`);
});

console.log('\n✅ Complete! Ready to generate markdown report.');

module.exports = { reportData };
