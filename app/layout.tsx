import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { createMetadata } from "@/lib/metadata";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Lazy load CookieConsent to prevent layout shift
const CookieConsent = dynamic(
  () => import("@/components/CookieConsentOptimized"),
  {
    ssr: false,
    loading: () => null // Prevents layout shift during loading
  }
);

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["300", "500", "700"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  adjustFontFallback: true, // Reduces CLS
});

export const metadata: Metadata = createMetadata({});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow zooming for accessibility
  userScalable: true,
  viewportFit: 'cover', // For iPhone X+ notch
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Critical preconnects first */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.ctfassets.net" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS prefetch for other domains */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.contentful.com" />
      </head>
      <body className={inter.className}>
        {/* Skip Navigation Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-purple focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>

        {/* Google Analytics with Consent Mode */}
        <Script
          id="google-analytics-consent"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              // Default consent mode - TEMPORARILY GRANTED FOR TESTING
              gtag('consent', 'default', {
                'analytics_storage': 'granted',
                'ad_storage': 'denied',
                'wait_for_update': 500
              });

              // Check if user already gave consent
              if (localStorage.getItem('cookieConsent') === 'accepted') {
                gtag('consent', 'update', {
                  'analytics_storage': 'granted'
                });
              }
            `,
          }}
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-DH4KGB266D`}
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('js', new Date());
              gtag('config', 'G-DH4KGB266D', {
                'send_page_view': true
              });

              // Debug: Log GA initialization
              console.log('✅ Google Analytics initialized:', 'G-DH4KGB266D');
              console.log('📊 Consent status:', localStorage.getItem('cookieConsent'));
            `,
          }}
        />

        <Header />
        <main id="main-content">{children}</main>
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}