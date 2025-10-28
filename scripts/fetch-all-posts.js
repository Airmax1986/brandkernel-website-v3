// Script to fetch all blog posts from Contentful for internal linking analysis
const { getAllPostsGraphQL, getPostGraphQL } = require('../lib/contentful/contentful-graphql.js');
const fs = require('fs');
const path = require('path');

async function fetchAllPosts() {
  console.log('🚀 Starting to fetch all blog posts from Contentful...');

  try {
    // Fetch all posts with summary information
    const posts = await getAllPostsGraphQL(false);
    console.log(`✅ Successfully fetched ${posts.length} posts`);

    // For detailed analysis, also fetch the full content of each post
    console.log('📝 Fetching full content for each post...');
    const postsWithContent = [];

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      console.log(`  [${i + 1}/${posts.length}] Fetching: ${post.title}`);

      const fullPost = await getPostGraphQL(post.slug, false);
      if (fullPost) {
        postsWithContent.push(fullPost);
      } else {
        // If we can't get full post, use the summary version
        postsWithContent.push(post);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Save to JSON file
    const outputPath = path.join(__dirname, '..', 'blog-posts-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(postsWithContent, null, 2));
    console.log(`\n💾 Saved ${postsWithContent.length} posts to ${outputPath}`);

    // Print summary statistics
    console.log('\n📊 Summary Statistics:');
    console.log(`   Total posts: ${postsWithContent.length}`);
    console.log(`   Posts with tags: ${postsWithContent.filter(p => p.tags && p.tags.length > 0).length}`);
    console.log(`   Posts with content: ${postsWithContent.filter(p => p.content && p.content.length > 0).length}`);

    // Count tags
    const tagCounts = {};
    postsWithContent.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    console.log(`\n🏷️  Tag distribution:`);
    Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .forEach(([tag, count]) => {
        console.log(`   ${tag}: ${count} posts`);
      });

  } catch (error) {
    console.error('❌ Error fetching posts:', error);
    process.exit(1);
  }
}

fetchAllPosts();
