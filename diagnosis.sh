#!/bin/bash

echo "🔍 BrandKernel.io Redirect Diagnosis"
echo "===================================="
echo ""

# Test 1: /posts/ redirect (should be 301)
echo "📋 Test 1: /posts/ → /blog/ redirect:"
echo "URL: https://www.brandkernel.io/posts/brand-core-vs-corporate-identity-freelancers"
curl -sI "https://www.brandkernel.io/posts/brand-core-vs-corporate-identity-freelancers" | head -5
echo ""

# Test 2: non-www redirect
echo "📋 Test 2: non-www → www redirect:"
echo "URL: https://brandkernel.io/"
curl -sI "https://brandkernel.io/" | head -5
echo ""

# Test 3: Check if blog URL works
echo "📋 Test 3: /blog/ URL accessibility:"
echo "URL: https://www.brandkernel.io/blog/brand-core-vs-corporate-identity-freelancers"
curl -sI "https://www.brandkernel.io/blog/brand-core-vs-corporate-identity-freelancers" | head -5
echo ""

# Test 4: Check canonical on homepage
echo "📋 Test 4: Canonical tag on homepage:"
curl -s "https://www.brandkernel.io/" | grep -i "canonical" || echo "❌ No canonical tag found"
echo ""

# Test 5: Check sitemap
echo "📋 Test 5: Sitemap accessibility:"
curl -sI "https://www.brandkernel.io/sitemap.xml" | head -3
echo ""

# Test 6: Check robots.txt
echo "📋 Test 6: robots.txt check:"
curl -s "https://www.brandkernel.io/robots.txt" | head -10
echo ""

echo "🎯 Expected Results:"
echo "- /posts/ URLs: 301 Redirect to /blog/"
echo "- non-www: 301 Redirect to www"
echo "- /blog/ URLs: 200 OK"
echo "- canonical tags: Present on all pages"
echo "- robots.txt: Should disallow /posts/"