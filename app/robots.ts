import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.brandkernel.io'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/dashboard/',
          '/user/',
          '/account/',
          '/checkout/',
          '/thank-you',
          '/unsubscribe',
          '*.json',
          '/tmp/',
          '/private/',
          '/*?*sort=',
          '/*?*filter=',
          '/*?*page=',
          '/search',
          '/print/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/dashboard/',
          '/user/',
        ],
        crawlDelay: 0,
      },
      {
        userAgent: 'bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/dashboard/',
          '/user/',
        ],
        crawlDelay: 0,
      },
      {
        userAgent: 'Slurp',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
        ],
        crawlDelay: 1,
      },
      // Block AI crawlers if desired
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}