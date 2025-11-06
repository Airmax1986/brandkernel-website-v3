/**
 * Blog Content Analyzer & Internal Linking Matrix Generator
 *
 * Usage: npx tsx scripts/analyze-blog-content.ts
 *
 * This script:
 * 1. Fetches all blog posts from Contentful
 * 2. Creates a content inventory
 * 3. Analyzes topics and keywords
 * 4. Generates internal linking recommendations
 * 5. Exports data for content hub planning
 */

import { getAllPostsGraphQL } from '../lib/contentful/contentful-graphql';
import fs from 'fs';
import path from 'path';

interface ContentAnalysis {
  slug: string;
  title: string;
  summary?: string;
  date: string;
  tags?: string[];
  wordCount: number;
  mainTopics: string[];
  suggestedLinks: string[];
  pillarCategory?: string;
}

// Define pillar content categories
const PILLAR_CATEGORIES = {
  'Brand Strategy': ['strategy', 'positioning', 'brand identity', 'brand foundation'],
  'Personal Branding': ['personal brand', 'founder', 'freelancer', 'creator'],
  'Brand Building': ['brand building', 'brand development', 'brand growth'],
  'AI & Technology': ['AI', 'artificial intelligence', 'technology', 'automation'],
  'Marketing & Content': ['marketing', 'content', 'social media', 'messaging'],
  'Business Growth': ['business', 'growth', 'scaling', 'startup']
};

// Extract main topics from content
function extractTopics(text: string): string[] {
  const allKeywords = Object.values(PILLAR_CATEGORIES).flat();
  const foundTopics: string[] = [];

  const lowerText = text.toLowerCase();

  for (const keyword of allKeywords) {
    if (lowerText.includes(keyword.toLowerCase())) {
      foundTopics.push(keyword);
    }
  }

  return [...new Set(foundTopics)]; // Remove duplicates
}

// Determine pillar category
function determinePillarCategory(topics: string[]): string | undefined {
  for (const [category, keywords] of Object.entries(PILLAR_CATEGORIES)) {
    const matches = topics.filter(topic =>
      keywords.some(keyword => topic.toLowerCase().includes(keyword.toLowerCase()))
    );

    if (matches.length > 0) {
      return category;
    }
  }

  return undefined;
}

// Calculate word count
function countWords(text: string): number {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

async function analyzeContent() {
  console.log('📊 Fetching all blog posts from Contentful...\n');

  try {
    const posts = await getAllPostsGraphQL();

    if (!posts || posts.length === 0) {
      console.log('❌ No blog posts found in Contentful');
      return;
    }

    console.log(`✅ Found ${posts.length} blog posts\n`);
    console.log('🔍 Analyzing content...\n');

    const analyses: ContentAnalysis[] = posts.map(post => {
      const contentText = `${post.title} ${post.summary || ''} ${post.description || ''} ${post.content || ''}`;
      const wordCount = countWords(post.content || '');
      const mainTopics = extractTopics(contentText);
      const pillarCategory = determinePillarCategory(mainTopics);

      return {
        slug: post.slug,
        title: post.title,
        summary: post.summary,
        date: post.date,
        tags: post.tags,
        wordCount,
        mainTopics,
        suggestedLinks: [], // Will be filled with linking suggestions
        pillarCategory
      };
    });

    // Generate linking suggestions
    analyses.forEach((analysis, index) => {
      const relatedPosts = analyses
        .filter((other, otherIndex) => otherIndex !== index)
        .filter(other => {
          // Check if they share topics
          const sharedTopics = analysis.mainTopics.filter(topic =>
            other.mainTopics.includes(topic)
          );
          return sharedTopics.length > 0;
        })
        .slice(0, 5) // Top 5 related posts
        .map(related => related.slug);

      analysis.suggestedLinks = relatedPosts;
    });

    // Group by pillar category
    const groupedByPillar = analyses.reduce((acc, analysis) => {
      const category = analysis.pillarCategory || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(analysis);
      return acc;
    }, {} as Record<string, ContentAnalysis[]>);

    // Generate outputs
    generateMarkdownReport(analyses, groupedByPillar);
    generateJSONExport(analyses, groupedByPillar);
    generateLinkingMatrix(analyses);

    console.log('\n✅ Analysis complete!');
    console.log('\n📄 Generated files:');
    console.log('   - content-analysis/blog-inventory.md');
    console.log('   - content-analysis/content-data.json');
    console.log('   - content-analysis/linking-matrix.md');
    console.log('   - content-analysis/pillar-strategy.md');

  } catch (error) {
    console.error('❌ Error analyzing content:', error);
  }
}

function generateMarkdownReport(analyses: ContentAnalysis[], groupedByPillar: Record<string, ContentAnalysis[]>) {
  const outputDir = path.join(process.cwd(), 'content-analysis');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Blog Inventory Report
  let inventory = `# Blog Content Inventory\n\n`;
  inventory += `Generated: ${new Date().toISOString()}\n\n`;
  inventory += `Total Posts: ${analyses.length}\n\n`;

  inventory += `## All Posts\n\n`;
  analyses.forEach(analysis => {
    inventory += `### ${analysis.title}\n\n`;
    inventory += `- **Slug:** \`${analysis.slug}\`\n`;
    inventory += `- **Date:** ${analysis.date}\n`;
    inventory += `- **Word Count:** ${analysis.wordCount}\n`;
    inventory += `- **Pillar Category:** ${analysis.pillarCategory || 'Uncategorized'}\n`;
    inventory += `- **Tags:** ${analysis.tags?.join(', ') || 'None'}\n`;
    inventory += `- **Main Topics:** ${analysis.mainTopics.join(', ')}\n`;
    inventory += `- **Summary:** ${analysis.summary || 'No summary'}\n`;
    inventory += `- **Suggested Internal Links:** ${analysis.suggestedLinks.map(s => `\`${s}\``).join(', ') || 'None'}\n\n`;
  });

  fs.writeFileSync(path.join(outputDir, 'blog-inventory.md'), inventory);

  // Pillar Strategy Report
  let pillarReport = `# Content Hub & Pillar Strategy\n\n`;
  pillarReport += `Generated: ${new Date().toISOString()}\n\n`;

  pillarReport += `## Pillar Categories Overview\n\n`;

  Object.entries(groupedByPillar).forEach(([category, posts]) => {
    pillarReport += `### ${category} (${posts.length} posts)\n\n`;
    posts.forEach(post => {
      pillarReport += `- [${post.title}](/blog/${post.slug}) - ${post.wordCount} words\n`;
    });
    pillarReport += `\n`;
  });

  pillarReport += `\n## Recommended Content Hubs\n\n`;
  pillarReport += `Based on the analysis, here are recommended pillar pages:\n\n`;

  Object.entries(groupedByPillar)
    .filter(([category]) => category !== 'Uncategorized')
    .forEach(([category, posts]) => {
      if (posts.length >= 3) {
        pillarReport += `### ${category} Hub\n\n`;
        pillarReport += `**URL:** \`/blog/${category.toLowerCase().replace(/\s+/g, '-')}\`\n\n`;
        pillarReport += `**Purpose:** Comprehensive guide on ${category}\n\n`;
        pillarReport += `**Cluster Articles (${posts.length}):**\n`;
        posts.forEach(post => {
          pillarReport += `- [${post.title}](/blog/${post.slug})\n`;
        });
        pillarReport += `\n**Content Hub Structure:**\n`;
        pillarReport += `1. Overview section explaining ${category}\n`;
        pillarReport += `2. Link to all ${posts.length} related articles\n`;
        pillarReport += `3. Visual content map/diagram\n`;
        pillarReport += `4. CTA to signup/waitlist\n`;
        pillarReport += `5. FAQ section\n\n`;
      }
    });

  fs.writeFileSync(path.join(outputDir, 'pillar-strategy.md'), pillarReport);
}

function generateJSONExport(analyses: ContentAnalysis[], groupedByPillar: Record<string, ContentAnalysis[]>) {
  const outputDir = path.join(process.cwd(), 'content-analysis');

  const data = {
    generated: new Date().toISOString(),
    totalPosts: analyses.length,
    posts: analyses,
    pillarCategories: groupedByPillar,
    statistics: {
      avgWordCount: Math.round(analyses.reduce((sum, a) => sum + a.wordCount, 0) / analyses.length),
      categoryCounts: Object.fromEntries(
        Object.entries(groupedByPillar).map(([cat, posts]) => [cat, posts.length])
      )
    }
  };

  fs.writeFileSync(
    path.join(outputDir, 'content-data.json'),
    JSON.stringify(data, null, 2)
  );
}

function generateLinkingMatrix(analyses: ContentAnalysis[]) {
  const outputDir = path.join(process.cwd(), 'content-analysis');

  let matrix = `# Internal Linking Matrix\n\n`;
  matrix += `Generated: ${new Date().toISOString()}\n\n`;
  matrix += `This matrix shows suggested internal links for each blog post.\n\n`;

  analyses.forEach(analysis => {
    matrix += `## ${analysis.title}\n\n`;
    matrix += `**URL:** \`/blog/${analysis.slug}\`\n\n`;
    matrix += `**Current Tags:** ${analysis.tags?.join(', ') || 'None'}\n\n`;

    if (analysis.suggestedLinks.length > 0) {
      matrix += `**Suggested Internal Links:**\n\n`;
      analysis.suggestedLinks.forEach(slug => {
        const relatedPost = analyses.find(a => a.slug === slug);
        if (relatedPost) {
          matrix += `- [ ] [${relatedPost.title}](/blog/${slug})\n`;
          matrix += `  - **Context:** Both discuss ${relatedPost.mainTopics[0] || 'related topics'}\n`;
          matrix += `  - **Anchor text suggestion:** "${relatedPost.title.substring(0, 50)}..."\n`;
        }
      });
    } else {
      matrix += `**No automatic suggestions** - Consider manual linking based on content.\n`;
    }

    matrix += `\n**Action Items:**\n`;
    matrix += `- [ ] Review content and identify natural link opportunities\n`;
    matrix += `- [ ] Add 2-4 contextual internal links in Contentful\n`;
    matrix += `- [ ] Link to relevant pillar page if applicable\n`;
    matrix += `- [ ] Consider CTA to /signup or /pricing\n\n`;
    matrix += `---\n\n`;
  });

  fs.writeFileSync(path.join(outputDir, 'linking-matrix.md'), matrix);
}

// Run the analysis
analyzeContent();
