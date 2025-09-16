import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LEON - Visual Storytelling Photography",
  description: "Professional photography portfolio showcasing editorial, fashion, and architectural work. Capturing moments that transcend the ordinary through artistic vision.",
  keywords: "photography, portfolio, editorial, fashion, architecture, visual storytelling",
  authors: [{ name: "LEON" }],
  creator: "LEON",
  openGraph: {
    title: "LEON - Visual Storytelling Photography",
    description: "Professional photography portfolio showcasing editorial, fashion, and architectural work.",
    url: "https://LEON.com",
    siteName: "LEON Photography",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LEON Photography Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LEON - Visual Storytelling Photography",
    description: "Professional photography portfolio showcasing editorial, fashion, and architectural work.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
