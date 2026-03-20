import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Box, ShieldCheck, Factory } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import productsData from "@/data/products.json";
import QuoteButton from "@/components/QuoteButton";
import ClientBackgrounds from "@/components/ClientBackgrounds";
import ProductCard, { Product } from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";

export const metadata = {
  title: "CFC Fasteners | Premium Industrial Fasteners Manufacturer",
  description: "Global supplier of high-grade bolts, nuts, screws, anchors, and hooks. Precision manufacturing for aerospace, automotive, and industrial excellence.",
  openGraph: {
    title: "CFC Fasteners | Industrial Manufacturing Excellence",
    description: "Premium manufacturer of industrial fasteners since 2018. Explore our massive inventory of bolts, nuts, and screws.",
    images: [{ url: '/CFC.png', width: 1200, height: 630, alt: 'CFC Fasteners Hero' }],
  },
};

export default function Home() {
  const featuredProducts: Product[] = productsData.slice(0, 6) as Product[];
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-zinc-950 text-white pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
        <ClientBackgrounds showHero />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Column Text Content */}
          <div className="w-full lg:w-[48%] drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white drop-shadow-2xl leading-tight text-center sm:text-left">
              Precision Fasteners for <br />
              <span className="text-primary-dark drop-shadow-md">Industrial Excellence</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-zinc-100 drop-shadow-lg font-medium text-justify [text-align-last:center] sm:text-left sm:[text-align-last:left]">
              Premium manufacturer and global supplier of high-grade bolts, nuts, screws, anchors, and hooks. Build with confidence.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 max-sm:grid max-sm:grid-cols-3 max-sm:gap-2">
              {/* <span className="text-base font-semibold text-zinc-300">Categories:</span> */}
              <Link href="/catalog?category=bolts" className="max-sm:w-full max-sm:text-center px-4 max-sm:px-2 py-1.5 rounded-full bg-zinc-800/80 text-sm max-sm:text-[11px] font-medium text-zinc-100 hover:bg-primary transition-all duration-300 hover:scale-105 transform shadow-sm hover:shadow-md hover:shadow-primary/20 border border-white/5 hover:border-transparent">Bolts</Link>
              <Link href="/catalog?category=nuts" className="max-sm:w-full max-sm:text-center px-4 max-sm:px-2 py-1.5 rounded-full bg-zinc-800/80 text-sm max-sm:text-[11px] font-medium text-zinc-100 hover:bg-primary transition-all duration-300 hover:scale-105 transform shadow-sm hover:shadow-md hover:shadow-primary/20 border border-white/5 hover:border-transparent">Nuts</Link>
              <Link href="/catalog?category=screws" className="max-sm:w-full max-sm:text-center px-4 max-sm:px-2 py-1.5 rounded-full bg-zinc-800/80 text-sm max-sm:text-[11px] font-medium text-zinc-100 hover:bg-primary transition-all duration-300 hover:scale-105 transform shadow-sm hover:shadow-md hover:shadow-primary/20 border border-white/5 hover:border-transparent">Screws</Link>
              <Link href="/catalog?category=anchors" className="max-sm:w-full max-sm:text-center px-4 max-sm:px-2 py-1.5 rounded-full bg-zinc-800/80 text-sm max-sm:text-[11px] font-medium text-zinc-100 hover:bg-primary transition-all duration-300 hover:scale-105 transform shadow-sm hover:shadow-md hover:shadow-primary/20 border border-white/5 hover:border-transparent">Anchors</Link>
              <Link href="/catalog?category=hooks" className="max-sm:w-full max-sm:text-center px-4 max-sm:px-2 py-1.5 rounded-full bg-zinc-800/80 text-sm max-sm:text-[11px] font-medium text-zinc-100 hover:bg-primary transition-all duration-300 hover:scale-105 transform shadow-sm hover:shadow-md hover:shadow-primary/20 border border-white/5 hover:border-transparent">Hooks</Link>
              <Link href="/catalog?category=Other" className="max-sm:w-full max-sm:text-center px-4 max-sm:px-2 py-1.5 rounded-full bg-zinc-800/80 text-sm max-sm:text-[11px] font-medium text-zinc-100 hover:bg-primary transition-all duration-300 hover:scale-105 transform shadow-sm hover:shadow-md hover:shadow-primary/20 border border-white/5 hover:border-transparent">Other</Link>
            </div>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
              <Link
                href="/catalog"
                className="rounded-full bg-primary-dark px-4 py-2 text-base font-semibold text-white shadow-sm hover:bg-primary transition-all focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary hover:scale-105 cursor-pointer"
              >
                Browse Catalog
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-white group flex items-center gap-2 transition-colors hover:text-zinc-300 cursor-pointer">
                Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="w-full max-w-xs h-px bg-primary/40 mt-16 mb-0 mx-auto block lg:hidden"></div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block shrink-0 min-w-px w-px h-105 bg-primary/40 self-center"></div>

          {/* Right Column Brand Image */}
          <div className="w-full lg:w-[48%] flex justify-end items-center mt-12 lg:mt-0">
            <div className="relative w-full max-w-lg flex items-center justify-center">
              <Image
                src="/CFC.png"
                alt="CFC Fasteners Brand Logo"
                width={1600}
                height={900}
                quality={100}
                className="w-full h-auto object-contain rounded-xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Full Width Search Bar Component */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-40 mt-0 lg:mt-2">
          <div className="w-full">
            <SearchBar />
          </div>
        </div>

        {/* Bottom Fade Transition */}
        <div className="absolute bottom-0 left-0 w-full h-32 lg:h-48 bg-linear-to-t from-white dark:from-black to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* Value Propositions */}
      <section className="pt-4 pb-8 sm:pt-6 sm:pb-12 bg-white dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Why Choose Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Strength in Every Connection
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl sm:mt-10 lg:mt-12 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <dt className="text-xl font-semibold leading-7 text-zinc-900 dark:text-white">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-6">
                    <Factory className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                  Direct Batch Manufacturing
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <p className="flex-auto text-justify [text-align-last:center] sm:[text-align-last:left]">
                    We control the complete manufacturing process from premium raw materials to finished precision components, ensuring consistent quality.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col items-center text-center">
                <dt className="text-xl font-semibold leading-7 text-zinc-900 dark:text-white">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-6">
                    <ShieldCheck className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                  Certified Quality
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <p className="flex-auto text-justify [text-align-last:center] sm:[text-align-last:left]">
                    All fasteners undergo rigorous tensile, yield, and dimensional tolerance tests to meet or exceed global standards (DIN, ISO, ASME).
                  </p>
                </dd>
              </div>
              <div className="flex flex-col items-center text-center">
                <dt className="text-xl font-semibold leading-7 text-zinc-900 dark:text-white">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-6">
                    <Box className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                  Massive Inventory
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <p className="flex-auto text-justify [text-align-last:center] sm:[text-align-last:left]">
                    We maintain extensive stock of standard sizes and grades ready for immediate worldwide dispatch, minimizing your downtime.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative w-full min-h-screen">
        <ClientBackgrounds showRipple />
        {/* Top Fade Transition */}
        <div className="absolute top-0 left-0 w-full h-20 lg:h-32 bg-linear-to-b from-white dark:from-black via-white/50 dark:via-black/50 to-transparent z-10 pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pt-12 sm:pb-24 relative z-10">
          <div className="mb-12 text-center sm:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Featured Products</h2>
            <p className="mt-4 text-lg text-zinc-300">We deal in all types of screws.</p>
          </div>

          <div className="product-grid">
            <ProductCarousel products={featuredProducts} />
          </div>

          <div className="mt-10 sm:hidden">
            <Link href="/catalog" className="flex items-center justify-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors border border-primary bg-black/40 backdrop-blur-md rounded-full py-3">
              View all products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        {/* Bottom Fade Transition into Footer */}
        <div className="absolute bottom-0 left-0 w-full h-16 lg:h-24 bg-linear-to-t from-zinc-100 dark:from-zinc-900 to-transparent z-10 pointer-events-none"></div>
      </section>
    </div>
  );
}
