import type { Metadata } from "next";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <QuoteProvider>
          <Header />
          <main className="grow">
            {children}
          </main>
          <Footer />
        </QuoteProvider>
      </body>
    </html>
  );
}
