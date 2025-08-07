#!/bin/bash

echo "🧪 Testing Waitlist API Implementation"
echo "====================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:3000"

# Function to test API endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    local expected_status=$5
    
    echo -n "📋 Testing $description: "
    
    if [ "$method" = "POST" ]; then
        response=$(curl -s -w "HTTPSTATUS:%{http_code}" -X POST \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "HTTPSTATUS:%{http_code}" "$BASE_URL$endpoint")
    fi
    
    # Extract HTTP status code
    http_status=$(echo "$response" | tr -d '\n' | sed -E 's/.*HTTPSTATUS:([0-9]{3}).*/\1/')
    
    # Extract response body
    response_body=$(echo "$response" | sed -E 's/HTTPSTATUS:[0-9]{3}$//')
    
    if [ "$http_status" = "$expected_status" ]; then
        echo -e "${GREEN}✅ $http_status${NC}"
        if [ "$method" = "POST" ]; then
            echo "   Response: $(echo "$response_body" | head -c 100)..."
        fi
    else
        echo -e "${RED}❌ Expected $expected_status, got $http_status${NC}"
        echo "   Response: $response_body"
        return 1
    fi
    
    echo ""
    return 0
}

echo "🔍 Testing Waitlist API Endpoints..."
echo "-----------------------------------"

# Test 1: Add new email to waitlist
test_endpoint "POST" "/api/join-waitlist" \
    '{"email":"test@example.com","source":"api-test","sendWelcomeEmail":false}' \
    "Add new email to waitlist" "201"

# Test 2: Try to add duplicate email
test_endpoint "POST" "/api/join-waitlist" \
    '{"email":"test@example.com","source":"api-test","sendWelcomeEmail":false}' \
    "Add duplicate email (should fail)" "409"

# Test 3: Test invalid email format
test_endpoint "POST" "/api/join-waitlist" \
    '{"email":"invalid-email","source":"api-test","sendWelcomeEmail":false}' \
    "Add invalid email format" "400"

# Test 4: Test missing email
test_endpoint "POST" "/api/join-waitlist" \
    '{"source":"api-test","sendWelcomeEmail":false}' \
    "Add without email field" "400"

# Test 5: Get waitlist statistics
test_endpoint "GET" "/api/join-waitlist" \
    "" \
    "Get waitlist statistics" "200"

# Test 6: Add another valid email
test_endpoint "POST" "/api/join-waitlist" \
    '{"email":"another@example.com","source":"api-test","sendWelcomeEmail":false}' \
    "Add second valid email" "201"

echo ""
echo "✅ Waitlist API testing complete!"
echo ""
echo -e "${YELLOW}📝 Notes:${NC}"
echo "- The API uses fallback in-memory storage when Redis is not configured"
echo "- In production, set up Upstash Redis environment variables for persistence"
echo "- Welcome emails require RESEND_API_KEY to be configured"
echo ""
echo -e "${GREEN}🎯 Next Steps:${NC}"
echo "1. Set up Upstash Redis database in Vercel dashboard"
echo "2. Run 'vercel env pull .env.development.local' to get Redis credentials"
echo "3. Configure Resend API key for welcome emails (optional)"
echo "4. Deploy to production and test live functionality"