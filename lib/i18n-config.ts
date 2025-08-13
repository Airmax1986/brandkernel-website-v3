export const i18nConfig = {
  defaultLocale: 'en-US',
  locales: [
    { code: 'en-US', name: 'English (US)', region: 'United States', currency: 'USD' },
    { code: 'en-GB', name: 'English (UK)', region: 'United Kingdom', currency: 'GBP' },
    { code: 'de-DE', name: 'Deutsch', region: 'Deutschland', currency: 'EUR' },
    { code: 'en', name: 'English (International)', region: 'International', currency: 'USD' }
  ],
  domains: {
    'en-US': 'https://www.brandkernel.io',
    'en-GB': 'https://uk.brandkernel.io',
    'de-DE': 'https://de.brandkernel.io',
    'en': 'https://www.brandkernel.io'
  }
} as const;

export type Locale = typeof i18nConfig.locales[number]['code'];

export function getHreflangLinks(currentPath: string) {
  return i18nConfig.locales.map(locale => ({
    hreflang: locale.code,
    href: `${i18nConfig.domains[locale.code]}${currentPath}`
  }));
}

export function getAlternateLinks(currentPath: string) {
  const links: Record<string, string> = {};
  
  i18nConfig.locales.forEach(locale => {
    links[locale.code] = `${i18nConfig.domains[locale.code]}${currentPath}`;
  });
  
  links['x-default'] = `${i18nConfig.domains['en']}${currentPath}`;
  
  return links;
}

export const regionConfig = {
  'en-US': {
    dateFormat: 'MM/DD/YYYY',
    currencySymbol: '$',
    currencyPosition: 'before',
    decimalSeparator: '.',
    thousandSeparator: ',',
    phoneFormat: '+1 (XXX) XXX-XXXX',
    addressFormat: 'us',
    spellingVariant: 'american'
  },
  'en-GB': {
    dateFormat: 'DD/MM/YYYY',
    currencySymbol: '£',
    currencyPosition: 'before',
    decimalSeparator: '.',
    thousandSeparator: ',',
    phoneFormat: '+44 XXXX XXXXXX',
    addressFormat: 'uk',
    spellingVariant: 'british'
  },
  'de-DE': {
    dateFormat: 'DD.MM.YYYY',
    currencySymbol: '€',
    currencyPosition: 'after',
    decimalSeparator: ',',
    thousandSeparator: '.',
    phoneFormat: '+49 XXX XXXXXXXX',
    addressFormat: 'de',
    spellingVariant: 'german'
  }
};

export const seoConfig = {
  'en-US': {
    keywords: [
      'brand strategy',
      'AI brand consultant',
      'brand positioning tool',
      'brand identity generator',
      'personal branding platform',
      'brand audit tool',
      'competitor analysis',
      'brand personality quiz'
    ],
    metaDescription: 'AI-powered brand strategy platform for US businesses. Create professional brand positioning, identity, and messaging in minutes.',
    targetMarket: 'US entrepreneurs, startups, and small businesses'
  },
  'en-GB': {
    keywords: [
      'brand strategy UK',
      'AI brand consultant UK',
      'brand positioning tool UK',
      'brand identity generator UK',
      'personal branding platform UK',
      'brand audit tool UK',
      'competitor analysis UK',
      'brand personality quiz UK'
    ],
    metaDescription: 'AI-powered brand strategy platform for UK businesses. Create professional brand positioning, identity, and messaging in minutes.',
    targetMarket: 'UK entrepreneurs, startups, and SMEs'
  },
  'de-DE': {
    keywords: [
      'Markenstrategie',
      'KI Markenberater',
      'Markenpositionierung Tool',
      'Markenidentität Generator',
      'Personal Branding Plattform',
      'Markenaudit Tool',
      'Wettbewerbsanalyse',
      'Markenpersönlichkeit Test'
    ],
    metaDescription: 'KI-gestützte Markenstrategie-Plattform für deutsche Unternehmen. Erstellen Sie professionelle Markenpositionierung, Identität und Messaging in Minuten.',
    targetMarket: 'Deutsche Unternehmer, Startups und KMUs'
  }
};