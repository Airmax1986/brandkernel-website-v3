import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"], weight: ["300", "500", "700"] });

export const metadata: Metadata = {
  title: "BrandKernel - Stand out with positioning that feels like you",
  description: "Your empathetic AI brand consultant guides you through a deep, personal brand discovery.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}