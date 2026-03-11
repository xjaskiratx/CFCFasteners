import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QuoteProvider } from "@/components/QuoteContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CFC Fasteners | Premium Industrial Fasteners",
  description: "Manufacturer and supplier of high-quality bolts, nuts, screws, anchors, and hooks for industrial applications.",
  openGraph: {
    title: "CFC Fasteners | Premium Industrial Fasteners",
    description: "Manufacturer and supplier of high-quality bolts, nuts, screws, anchors, and hooks for industrial applications.",
    siteName: "CFC Fasteners",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CFC Fasteners | Premium Industrial Fasteners",
    description: "Manufacturer and supplier of high-quality bolts, nuts, screws, anchors, and hooks for industrial applications.",
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
    <html lang="en" className="dark scroll-smooth">
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
        </QuoteProvider>
      </body>
    </html>
  );
}
