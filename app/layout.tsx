import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { createMetadata } from "@/lib/metadata";
import dynamic from "next/dynamic";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <CookieConsent />
      </body>
    </html>
  );
}