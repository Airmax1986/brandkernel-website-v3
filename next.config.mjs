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
              connect-src 'self' https://www.google-analytics.com https://images.ctfassets.net https://cdn.contentful.com https://www.googletagmanager.com;
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
    return [
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
      // Handle trailing slashes (but exclude root)
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
      // Old blog URLs if any
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