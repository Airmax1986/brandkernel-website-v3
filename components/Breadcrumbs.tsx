'use client'

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

// Generate breadcrumb schema markup
const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  const listItems = items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@id": `https://www.brandkernel.io${item.href}`,
      "name": item.label
    }
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": listItems
  };
};

export default function Breadcrumbs({ 
  items, 
  className = '',
  showHome = true 
}: BreadcrumbsProps) {
  // Build complete breadcrumb path including home
  const allItems = showHome 
    ? [{ label: 'Home', href: '/' }, ...items.filter(item => item.href !== '/')]
    : items;

  // Generate schema markup
  const schema = generateBreadcrumbSchema(allItems);

  return (
    <nav
      className={`flex ${className}`}
      aria-label="Breadcrumb"
      role="navigation"
    >
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Breadcrumb navigation */}
        <ol className="flex items-center space-x-2 text-sm">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight 
                  className="mx-2 h-4 w-4 text-gray-400 flex-shrink-0" 
                  aria-hidden="true"
                />
              )}
              
              {item.current || index === allItems.length - 1 ? (
                <span 
                  className="text-gray-600 font-medium flex items-center"
                  aria-current="page"
                >
                  {index === 0 && showHome ? (
                    <Home className="h-4 w-4" aria-label={item.label} />
                  ) : (
                    item.label
                  )}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center"
                >
                  {index === 0 && showHome ? (
                    <Home className="h-4 w-4" aria-label={item.label} />
                  ) : (
                    item.label
                  )}
                </Link>
              )}
            </li>
          ))}
        </ol>
    </nav>
  );
}

// Auto-generate breadcrumbs from path
export function AutoBreadcrumbs({ 
  path, 
  pageTitle, 
  className,
  customLabels = {}
}: {
  path: string;
  pageTitle?: string;
  className?: string;
  customLabels?: Record<string, string>;
}) {
  const segments = path.split('/').filter(Boolean);
  
  // Default labels for common paths
  const defaultLabels: Record<string, string> = {
    'features': 'Features',
    'pricing': 'Pricing',
    'blog': 'Blog',
    'about': 'About',
    'contact': 'Contact',
    'how-it-works': 'How It Works',
    'approach': 'Our Approach',
    'founders': 'For Founders',
    'freelancers': 'For Freelancers',
    'creators': 'For Creators',
    'waitlist': 'Join Waitlist',
    'manifest': 'Manifesto',
    'privacy-policy': 'Privacy Policy',
    'imprint': 'Imprint',
    ...customLabels
  };
  
  const items: BreadcrumbItem[] = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;
    
    let label = defaultLabels[segment] || 
      segment.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    
    // Use custom page title for the last item if provided
    if (isLast && pageTitle) {
      label = pageTitle;
    }
    
    return {
      label,
      href,
      current: isLast
    };
  });
  
  // Don't show breadcrumbs for homepage or single-level pages
  if (segments.length === 0 || (segments.length === 1 && !pageTitle)) {
    return null;
  }
  
  return <Breadcrumbs items={items} className={className} />;
}

// Specialized breadcrumbs for blog posts
export function BlogBreadcrumbs({ 
  postTitle,
  className 
}: {
  postTitle: string;
  className?: string;
}) {
  const items: BreadcrumbItem[] = [
    { label: 'Blog', href: '/blog' },
    { label: postTitle, href: '#', current: true }
  ];
  
  return <Breadcrumbs items={items} className={className} />;
}