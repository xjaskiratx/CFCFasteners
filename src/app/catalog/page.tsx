import productsData from "@/data/products.json";
import Image from "next/image";
import Link from "next/link";
import { Filter } from "lucide-react";
import QuoteButton from "@/components/QuoteButton";
import HeroAnimatedBackground from "@/components/HeroAnimatedBackground";
import RippleBackground from "@/components/RippleBackground";
export const metadata = {
    title: "Product Catalog | CFC Fasteners",
    description: "Browse our extensive catalog of premium industrial bolts, nuts, screws, anchors, and hooks.",
};

export default async function CatalogPage({
    searchParams
}: {
    searchParams: Promise<{ category?: string; q?: string }>
}) {
    const resolvedParams = await searchParams;
    const activeCategory = resolvedParams?.category || "all";
    const searchQuery = resolvedParams?.q?.toLowerCase() || "";

    const filteredProducts = productsData.filter((p: any) => {
        const matchesCategory = activeCategory === "all" ? true : p.category === activeCategory;
        const matchesQuery = searchQuery
            ? p.name.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery)
            : true;
        return matchesCategory && matchesQuery;
    });

    const categories = [
        { id: "all", name: "All Products" },
        { id: "bolts", name: "Bolts" },
        { id: "nuts", name: "Nuts" },
        { id: "screws", name: "Screws" },
        { id: "anchors", name: "Anchors" },
        { id: "hooks", name: "Hooks" }
    ];

    const activeCategoryName = categories.find((c) => c.id === activeCategory)?.name || "All Products";

    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen relative pb-16 lg:pb-24">
            {/* Hero Section with 3D Background */}
            <section id="catalog-hero" className="relative overflow-hidden bg-zinc-950 text-white pt-24 pb-12 sm:pt-32 sm:pb-16">
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                <HeroAnimatedBackground />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col gap-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                        {/* Full Width Hero Text */}
                        <div className="w-full">
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white drop-shadow-2xl">
                                Product Catalog
                            </h1>
                            <p className="mt-4 text-xl leading-8 text-zinc-100 drop-shadow-lg font-medium max-w-3xl">
                                Browse our inventory of premium industrial fasteners. Need something specific? Request a quote for custom dimensions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Fade Transition */}
                <div className="absolute bottom-0 left-0 w-full h-24 lg:h-32 bg-linear-to-t from-zinc-50 dark:from-black to-transparent z-10 pointer-events-none"></div>
            </section>

            {/* Sticky Categories Section */}
            <div className="sticky top-16 z-40 bg-zinc-50/95 dark:bg-black/95 backdrop-blur-md py-4 transition-colors">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Left Aligned Categories */}
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-zinc-500 hidden sm:block" />
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mr-2 hidden sm:block">Category:</span>
                        <div className="flex flex-wrap gap-4">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/catalog?category=${cat.id}`}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 transform shadow-sm border cursor-pointer ${activeCategory === cat.id
                                        ? "bg-primary text-white border-transparent shadow-md shadow-primary/20 scale-105"
                                        : "bg-zinc-800/80 text-zinc-100 border-white/5 hover:bg-primary hover:border-transparent hover:shadow-md hover:shadow-primary/20 hover:scale-105"
                                        }`}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid Section */}
            <div className="relative w-full min-h-screen">
                <RippleBackground />
                {/* Top Fade Transition from Sticky Header */}
                <div className="absolute top-0 left-0 w-full h-16 lg:h-24 bg-linear-to-b from-zinc-50/95 dark:from-black/95 to-transparent z-10 pointer-events-none"></div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                    {/* Active Category Title */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white capitalize">
                            {activeCategoryName}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 product-grid">
                        {filteredProducts.map((product: any) => (
                            <div key={product.id} className="product-card group relative flex flex-col overflow-hidden rounded-3xl bg-black/40 backdrop-blur-md shadow-sm border border-primary/20 hover:border-primary/50 hover:scale-110 transition-all duration-300 z-0 hover:z-10 hover:shadow-2xl">
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
                        {filteredProducts.length === 0 && (
                            <div className="col-span-full py-12 text-center">
                                <p className="text-zinc-400 text-lg">No products found in this category.</p>
                                <Link href="/catalog" className="text-primary hover:underline mt-2 inline-block">
                                    Clear filters
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Bottom Fade Transition into Footer */}
            <div className="absolute bottom-0 left-0 w-full h-16 lg:h-24 bg-linear-to-t from-zinc-100 dark:from-zinc-900 to-transparent z-10 pointer-events-none"></div>
        </div>
    );
}
