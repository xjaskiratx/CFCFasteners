import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QuoteProvider } from "@/components/QuoteContext";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cfc-fasteners.vercel.app'),
  title: {
    default: "CFC Fasteners | Premium Industrial Fasteners",
    template: "%s | CFC Fasteners",
  },
  description: "Manufacturer and supplier of high-quality bolts, nuts, screws, anchors, and hooks for industrial applications. Global delivery and precision engineering.",
  keywords: ["industrial fasteners", "bolts", "nuts", "screws", "anchors", "hooks", "fastener manufacturer", "drywall screws", "chipboard screws", "self drilling screws", "CFC Fasteners", "Ludhiana fasteners"],
  authors: [{ name: "CFC Fasteners" }],
  creator: "CFC Fasteners",
  publisher: "CFC Fasteners",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "CFC Fasteners | Premium Industrial Fasteners",
    description: "Manufacturer and supplier of high-quality bolts, nuts, screws, anchors, and hooks for industrial applications. Premium manufacturing for global excellence.",
    url: 'https://cfc-fasteners.vercel.app',
    siteName: "CFC Fasteners",
    images: [
      {
        url: '/CFC.png',
        width: 1600,
        height: 900,
        alt: 'CFC Fasteners Brand Logo',
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CFC Fasteners | Premium Industrial Fasteners",
    description: "Manufacturer and supplier of high-quality bolts, nuts, screws, anchors, and hooks for industrial applications.",
    images: ['/CFC.png'],
  },
  icons: {
    icon: [
      { url: '/BrandMark.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/BrandMark.svg' }
    ]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") || undefined;
  return (
    <html lang="en" className="dark">
      <body
        nonce={nonce}
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <QuoteProvider>
          <Header />
          <main className="grow flex flex-col">
            {children}
          </main>
          <Footer />
          <WhatsAppWidget />
        </QuoteProvider>
      </body>
    </html>
  );
}
