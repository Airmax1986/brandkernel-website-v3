import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.brandkernel.io'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/posts/',
        '/api/',
        '/_next/',
        '/admin/',
        '*.json',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}