import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Box, ShieldCheck, Factory } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import productsData from "@/data/products.json";
import QuoteButton from "@/components/QuoteButton";
import HeroAnimatedBackground from "@/components/HeroAnimatedBackground";
import RippleBackground from "@/components/RippleBackground";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-zinc-950 text-white pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
        <HeroAnimatedBackground />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Column Text Content */}
          <div className="w-full lg:w-[48%] drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white drop-shadow-2xl leading-tight">
              Precision Fasteners for <br className="hidden sm:block" />
              <span className="text-primary-light drop-shadow-md">Industrial Excellence</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-zinc-100 drop-shadow-lg font-medium">
              Premium manufacturer and global supplier of high-grade bolts, nuts, screws, anchors, and hooks. Build with confidence.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* <span className="text-base font-semibold text-zinc-300">Categories:</span> */}
              <Link href="/catalog?category=bolts" className="px-4 py-1.5 rounded-full bg-zinc-800/80 text-sm font-medium text-zinc-100 hover:bg-primary transition-all duration-300 hover:scale-105 transform shadow-sm hover:shadow-md hover:shadow-primary/20 border border-white/5 hover:border-transparent">Bolts</Link>
              <Link href="/catalog?category=nuts" className="px-4 py-1.5 rounded-full bg-zinc-800/80 text-sm font-medium text-zinc-100 hover:bg-primary transition-all duration-300 hover:scale-105 transform shadow-sm hover:shadow-md hover:shadow-primary/20 border border-white/5 hover:border-transparent">Nuts</Link>
              <Link href="/catalog?category=screws" className="px-4 py-1.5 rounded-full bg-zinc-800/80 text-sm font-medium text-zinc-100 hover:bg-primary transition-all duration-300 hover:scale-105 transform shadow-sm hover:shadow-md hover:shadow-primary/20 border border-white/5 hover:border-transparent">Screws</Link>
              <Link href="/catalog?category=anchors" className="px-4 py-1.5 rounded-full bg-zinc-800/80 text-sm font-medium text-zinc-100 hover:bg-primary transition-all duration-300 hover:scale-105 transform shadow-sm hover:shadow-md hover:shadow-primary/20 border border-white/5 hover:border-transparent">Anchors</Link>
              <Link href="/catalog?category=hooks" className="px-4 py-1.5 rounded-full bg-zinc-800/80 text-sm font-medium text-zinc-100 hover:bg-primary transition-all duration-300 hover:scale-105 transform shadow-sm hover:shadow-md hover:shadow-primary/20 border border-white/5 hover:border-transparent">Hooks</Link>
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
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block shrink-0 min-w-px w-px h-105 bg-primary/40 self-center"></div>

          {/* Right Column Brand Image */}
          <div className="w-full lg:w-[48%] flex justify-end items-center mt-12 lg:mt-0">
            <div className="relative w-full max-w-lg aspect-video shadow-[0_0_80px_rgba(139,0,0,0.2)] rounded-3xl flex items-center justify-center overflow-hidden">
              <Image
                src="/CFC.png"
                alt="CFC Fasteners Brand Logo"
                fill
                className="object-cover rounded-3xl"
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
                  <p className="flex-auto text-justify">
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
                  <p className="flex-auto text-justify">
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
                  <p className="flex-auto text-justify">
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
        <RippleBackground />
        {/* Top Fade Transition */}
        <div className="absolute top-0 left-0 w-full h-20 lg:h-32 bg-linear-to-b from-white dark:from-black via-white/50 dark:via-black/50 to-transparent z-10 pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pt-12 sm:pb-24 relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Featured Products</h2>
            <p className="mt-4 text-lg text-zinc-300">Discover our most popular precision fasteners.</p>
          </div>

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 product-grid">
            {[...productsData].sort(() => 0.5 - Math.random()).slice(0, 6).map((product: any) => (
              <div key={product.id} className="product-card group relative flex flex-col overflow-hidden rounded-3xl bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-sm border border-primary/20 hover:border-primary/50 hover:scale-110 transition-all duration-300 z-0 hover:z-10 hover:shadow-2xl">
                <div className="aspect-h-3 aspect-w-4 bg-transparent sm:aspect-none sm:h-64 relative overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 text-left">
                  <h3 className="text-lg font-semibold text-white">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-4 text-sm text-zinc-400">
                    <span className="bg-zinc-800 px-2 py-1 rounded text-xs font-medium text-white">
                      {product.standard}
                    </span>
                    <span className="text-zinc-300">{product.material}</span>
                  </div>
                  <p className="mt-4 text-sm text-zinc-400 flex-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-6 border-t border-zinc-800 pt-6">
                    <QuoteButton productName={product.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:hidden">
            <Link href="/catalog" className="flex items-center justify-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors border border-primary bg-black/40 backdrop-blur-md rounded-md py-3">
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
