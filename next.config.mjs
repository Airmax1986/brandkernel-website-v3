import { createHash } from 'crypto';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  swcMinify: true, // Enable SWC minification for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'framer-motion', 
      'react-markdown',
      'contentful',
      'lucide-react',
    ],
  },
  async headers() {
    return [
      // Security headers for all routes
      {
        source: '/:path*',
        headers: [
          // HSTS - Critical for SEO trust
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.jsdelivr.net;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;
              font-src 'self' https://fonts.gstatic.com data:;
              img-src 'self' data: https: blob:;
              media-src 'self';
              connect-src 'self' https://*.google-analytics.com https://images.ctfassets.net https://cdn.contentful.com https://www.googletagmanager.com;
              frame-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              upgrade-insecure-requests;
            `.replace(/\s+/g, ' ').trim()
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()'
          },
          // Additional security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ],
      },
      // Cache headers for static assets
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // HTML pages - shorter cache with revalidation
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ]
      },
      // API routes - prevent indexing
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, stale-while-revalidate=600'
          }
        ]
      },
      // User content - prevent indexing
      {
        source: '/dashboard/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive'
          }
        ]
      },
      {
        source: '/user/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive'
          }
        ]
      },
      // Documents - prevent indexing
      {
        source: '/:all*(pdf|doc|docx|xls|xlsx)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, noarchive, noimageindex'
          }
        ]
      }
    ]
  },
  async redirects() {
    // Blog slug redirects (SEO optimization - shortened URLs)
    const blogSlugRedirects = [
      // Missing redirects for Google Search Console duplicates
      { source: '/blog/content-marketing-for-branding-guide', destination: '/blog/content-marketing-for-branding', permanent: true },
      { source: '/blog/brand-equity-score-freelancer-calculate-framework', destination: '/blog/brand-equity-score-freelancer-calculate', permanent: true },
      // Original redirects
      { source: '/blog/ai-impact-branding-jobs-future-designers', destination: '/blog/ai-impact-branding-jobs-future', permanent: true },
      { source: '/blog/30-day-brand-activation-challenge-freelancers', destination: '/blog/30-day-brand-activation-challenge', permanent: true },
      { source: '/blog/branding-perfectionism-define-brand-core-freelancers', destination: '/blog/branding-perfectionism-define-brand-core', permanent: true },
      { source: '/blog/chatgpt-claude-gemini-ai-tools-branding-text', destination: '/blog/chatgpt-claude-gemini-ai-tools', permanent: true },
      { source: '/blog/brandkernel-review-ai-brand-strategy-freelancers', destination: '/blog/brandkernel-review-ai-brand-strategy', permanent: true },
      { source: '/blog/brand-personality-examples-authentic-voice-freelancers', destination: '/blog/brand-personality-examples-authentic-voice', permanent: true },
      { source: '/blog/branding-cost-small-business-budget-guide', destination: '/blog/branding-cost-small-business-budget', permanent: true },
      { source: '/blog/content-repurposing-strategy-branding-5-channels', destination: '/blog/content-repurposing-strategy-branding-5', permanent: true },
      { source: '/blog/visibility-for-introverts-brand-strategies', destination: '/blog/visibility-for-introverts-brand', permanent: true },
      { source: '/blog/micro-saas-branding-memorable-brand-budget', destination: '/blog/micro-saas-branding-memorable-brand', permanent: true },
      { source: '/blog/freelance-portfolio-branding-guide', destination: '/blog/freelance-portfolio-branding', permanent: true },
      { source: '/blog/branding-for-therapists-coaches-trust-building', destination: '/blog/branding-for-therapists-coaches-trust', permanent: true },
      { source: '/blog/esch-brand-steering-wheel-markensteuerrad-english-guide', destination: '/blog/esch-brand-steering-wheel-markensteuerrad', permanent: true },
      { source: '/blog/brand-strategy-packages-small-business-guide', destination: '/blog/brand-strategy-packages-small-business', permanent: true },
      { source: '/blog/personal-branding-freelancers-brand-core-guide', destination: '/blog/personal-branding-freelancers-brand-core', permanent: true },
      { source: '/blog/chatgpt-branding-freelancers-strategic-ai', destination: '/blog/chatgpt-branding-freelancers', permanent: true },
      { source: '/blog/brandkernel-case-study-freelancer-tripled-clients', destination: '/blog/brandkernel-case-study-freelancer-tripled', permanent: true },
      { source: '/blog/competitor-analysis-branding-unique-angle-framework', destination: '/blog/competitor-analysis-branding-unique-angle', permanent: true },
      { source: '/blog/brand-consistency-importance-freelancers-trust-building', destination: '/blog/brand-consistency-importance-freelancers-trust', permanent: true },
      { source: '/blog/saas-scale-up-branding-evolve-brand-guide', destination: '/blog/saas-scale-up-branding-evolve', permanent: true },
      { source: '/blog/brand-metrics-kpis-business-growth-measurement', destination: '/blog/brand-metrics-kpis-business-growth', permanent: true },
      { source: '/blog/user-generated-content-branding-trust-strategies', destination: '/blog/user-generated-content-branding-trust', permanent: true },
      { source: '/blog/brand-kernel-community-authentic-brand-network', destination: '/blog/brand-kernel-community-authentic-brand', permanent: true },
      { source: '/blog/affordable-branding-resources-freelancers-budget-tools', destination: '/blog/affordable-branding-resources-freelancers-budget', permanent: true },
      { source: '/blog/authentic-personal-brand-check-over-optimize-tips', destination: '/blog/authentic-personal-brand-check-over', permanent: true },
      { source: '/blog/ai-competitor-analysis-branding-tools-market-research', destination: '/blog/ai-competitor-analysis-branding-tools', permanent: true },
      { source: '/blog/brand-equity-score-freelancer-calculate-value-guide', destination: '/blog/brand-equity-score-freelancer-calculate', permanent: true },
      { source: '/blog/ai-branding-tools-solopreneurs-reality-check', destination: '/blog/ai-branding-tools-solopreneurs-reality', permanent: true },
      { source: '/blog/ai-brand-voice-generator-freelancers-authentic-guide', destination: '/blog/ai-brand-voice-generator-freelancers', permanent: true },
      { source: '/blog/branding-for-freelancers-examples', destination: '/blog/branding-for-freelancers', permanent: true },
      { source: '/blog/ai-for-brand-strategy-authentic-positioning', destination: '/blog/ai-for-brand-strategy-authentic', permanent: true },
      { source: '/blog/consistent-brand-messaging-freelancers-voice-guide', destination: '/blog/consistent-brand-messaging-freelancers-voice', permanent: true },
      { source: '/blog/how-to-build-personal-brand-freelance', destination: '/blog/how-to-build-personal-brand', permanent: true },
      { source: '/blog/guided-brand-strategy-tool-vs-chatgpt-comparison', destination: '/blog/guided-brand-strategy-tool-vs', permanent: true },
      { source: '/blog/minimum-viable-brand-startup-branding-essentials', destination: '/blog/minimum-viable-brand-startup-branding', permanent: true },
      { source: '/blog/brand-identity-guide-core-discovery-framework', destination: '/blog/brand-identity-guide-core-discovery', permanent: true },
      { source: '/blog/personal-branding-digital-nomads-build-reputation', destination: '/blog/personal-branding-digital-nomads-build', permanent: true },
      { source: '/blog/linkedin-personal-brand-guide-attract-clients', destination: '/blog/linkedin-personal-brand-guide-attract', permanent: true },
      { source: '/blog/what-is-brand-marketing-business-guide', destination: '/blog/what-is-brand-marketing-business', permanent: true },
      { source: '/blog/using-content-marketing-build-brand-strategy', destination: '/blog/using-content-marketing-build-brand', permanent: true },
      { source: '/blog/brand-marketing-strategies-small-business-growth', destination: '/blog/brand-marketing-strategies-small-business', permanent: true },
      { source: '/blog/linkedin-personal-branding-freelancers-guide', destination: '/blog/linkedin-personal-branding-freelancers', permanent: true },
      { source: '/blog/linkedin-profile-optimization-personal-branding-tips', destination: '/blog/linkedin-profile-optimization-personal-branding', permanent: true },
      { source: '/blog/brand-core-vs-corporate-identity-difference', destination: '/blog/brand-core-vs-corporate-identity', permanent: true },
      { source: '/blog/personal-brand-vs-business-brand-freelancers', destination: '/blog/personal-brand-vs-business-brand', permanent: true },
      { source: '/blog/professional-branding-services-freelancers-beyond-logo', destination: '/blog/professional-branding-services-freelancers-beyond', permanent: true },
      { source: '/blog/using-ai-for-branding-freelancers-guide', destination: '/blog/using-ai-for-branding-freelancers', permanent: true },
    ];

    return [
      // Blog slug redirects (48 redirects)
      ...blogSlugRedirects,

      // Redirect singular to plural paths
      {
        source: '/founder',
        destination: '/founders',
        permanent: true,
      },
      {
        source: '/freelancer',
        destination: '/freelancers',
        permanent: true,
      },
      {
        source: '/creator',
        destination: '/creators',
        permanent: true,
      },
      // Old blog URLs - redirect /posts/ to /blog/
      {
        source: '/posts/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
      {
        source: '/blog/posts/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
      // Common misspellings/alternatives
      {
        source: '/brandbuilder-alternative',
        destination: '/alternatives/brandbuildr',
        permanent: true,
      },
      {
        source: '/brand-ai-alternative',
        destination: '/alternatives/brand-ai',
        permanent: true,
      },
      // Non-www to www redirect - temporarily disabled to fix redirect loop
      // {
      //   source: '/:path*',
      //   has: [
      //     {
      //       type: 'host',
      //       value: 'brandkernel.io',
      //     },
      //   ],
      //   destination: 'https://www.brandkernel.io/:path*',
      //   permanent: true,
      // },
    ]
  },
  // Webpack optimization for better performance
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module) {
              return module.size() > 160000;
            },
            name(module) {
              const hash = createHash('sha1');
              hash.update(module.identifier());
              return hash.digest('hex').substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;