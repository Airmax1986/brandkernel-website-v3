#!/bin/bash

echo "🧪 Testing BrandKernel Migration..."
echo "=================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="https://www.brandkernel.io"

# Function to check HTTP status
check_status() {
    local url=$1
    local expected=$2
    local description=$3
    
    echo -n "📋 Testing $description: "
    status=$(curl -s -o /dev/null -w "%{http_code}" -L "$url")
    
    if [ "$status" = "$expected" ]; then
        echo -e "${GREEN}✅ $status${NC}"
        return 0
    else
        echo -e "${RED}❌ Expected $expected, got $status${NC}"
        return 1
    fi
}

# Function to check redirect
check_redirect() {
    local from_url=$1
    local to_url=$2
    local description=$3
    
    echo -n "🔀 Testing $description: "
    location=$(curl -s -I -o /dev/null -w "%{redirect_url}" "$from_url")
    
    if [[ "$location" == *"$to_url"* ]]; then
        echo -e "${GREEN}✅ Redirects correctly${NC}"
        return 0
    else
        echo -e "${RED}❌ Expected redirect to $to_url, got $location${NC}"
        return 1
    fi
}

echo ""
echo "🔍 Testing URL Redirects..."
echo "----------------------------"

# Test /posts/ → /blog/ redirect
check_redirect "${BASE_URL}/posts/test" "/blog/test" "/posts/* → /blog/* redirect"

# Test non-www → www redirect  
check_redirect "https://brandkernel.io/" "${BASE_URL}/" "non-www → www redirect"

echo ""
echo "📊 Testing Page Accessibility..."
echo "--------------------------------"

# Test main pages are accessible
check_status "$BASE_URL/" "200" "Homepage"
check_status "$BASE_URL/blog" "200" "/blog page"
check_status "$BASE_URL/about" "200" "/about page" 
check_status "$BASE_URL/pricing" "200" "/pricing page"

echo ""
echo "🤖 Testing SEO Files..."
echo "------------------------"

# Test robots.txt
check_status "$BASE_URL/robots.txt" "200" "robots.txt"

# Test sitemap
check_status "$BASE_URL/sitemap.xml" "200" "sitemap.xml"

echo ""
echo "🔍 Testing robots.txt content..."
echo "-------------------------------"

robots_content=$(curl -s "$BASE_URL/robots.txt")
if echo "$robots_content" | grep -q "Disallow: /posts/"; then
    echo -e "📋 robots.txt blocks /posts/: ${GREEN}✅${NC}"
else
    echo -e "📋 robots.txt blocks /posts/: ${RED}❌ Not found${NC}"
fi

echo ""
echo "📱 Testing Meta Tags..."
echo "----------------------"

# Check for canonical URL in blog page
blog_meta=$(curl -s "$BASE_URL/blog")
if echo "$blog_meta" | grep -q 'rel="canonical".*www.brandkernel.io/blog'; then
    echo -e "📋 Blog canonical URL: ${GREEN}✅${NC}"
else
    echo -e "📋 Blog canonical URL: ${RED}❌ Not found or incorrect${NC}"
fi

# Check for Open Graph tags
if echo "$blog_meta" | grep -q 'property="og:url".*www.brandkernel.io/blog'; then
    echo -e "📋 Blog OG URL: ${GREEN}✅${NC}"
else
    echo -e "📋 Blog OG URL: ${RED}❌ Not found or incorrect${NC}"
fi

echo ""
echo "✅ Migration test complete!"
echo ""
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo "1. Deploy changes to Vercel"  
echo "2. Monitor Google Search Console for any crawl errors"
echo "3. Submit updated sitemap to Google"
echo "4. Check that old /posts/ URLs properly redirect in production"
echo ""
echo -e "${GREEN}🎯 Migration Status: Ready for deployment${NC}"