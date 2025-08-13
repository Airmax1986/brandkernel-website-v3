import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18nConfig } from './lib/i18n-config';

const locales = i18nConfig.locales.map(l => l.code);

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const acceptLanguage = request.headers.get('accept-language') || '';
  const geo = request.geo;
  
  if (geo?.country === 'US') {
    return 'en-US';
  } else if (geo?.country === 'GB') {
    return 'en-GB';
  } else if (geo?.country === 'DE') {
    return 'de-DE';
  }
  
  const languages = acceptLanguage.split(',').map(lang => {
    const [code] = lang.trim().split(';');
    return code.toLowerCase();
  });

  for (const lang of languages) {
    if (lang === 'en-us' || lang === 'en') return 'en-US';
    if (lang === 'en-gb') return 'en-GB';
    if (lang === 'de' || lang === 'de-de') return 'de-DE';
  }

  return i18nConfig.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    const response = NextResponse.next();
    
    response.headers.set('x-user-locale', locale);
    response.headers.set('x-user-country', request.geo?.country || 'US');
    
    response.headers.set('Link', 
      locales.map(loc => 
        `<${i18nConfig.domains[loc]}${pathname}>; rel="alternate"; hreflang="${loc}"`
      ).join(', ') + 
      `, <${i18nConfig.domains['en']}${pathname}>; rel="alternate"; hreflang="x-default"`
    );
    
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};