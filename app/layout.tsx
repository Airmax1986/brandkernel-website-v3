import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderServer from "@/components/HeaderServer";
import { createMetadata } from "@/lib/metadata";
import dynamic from "next/dynamic";

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

        {/* Lazy load Google Analytics to prevent render blocking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              // Load Google Analytics after page load
              window.addEventListener('load', function() {
                var script = document.createElement('script');
                script.async = true;
                script.src = 'https://www.googletagmanager.com/gtag/js?id=G-DH4KGB266D';
                document.head.appendChild(script);
                script.onload = function() {
                  gtag('config', 'G-DH4KGB266D', {
                    'transport_type': 'beacon',
                    'page_view': true
                  });
                };
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <HeaderServer />
        <main>{children}</main>
        <CookieConsent />
      </body>
    </html>
  );
}