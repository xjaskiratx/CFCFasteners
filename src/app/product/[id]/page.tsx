import Image from "next/image";
import { notFound } from "next/navigation";
import ClientBackgrounds from "@/components/ClientBackgrounds";
import QuoteButton from "@/components/QuoteButton";
import BackButton from "@/components/BackButton";
import productsData from "@/data/products.json";
import type { Product } from "@/components/ProductCard";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const productId = decodeURIComponent(id);
    const product = (productsData as Product[]).find((item) => item.id === productId);

    if (!product) {
        notFound();
    }

    return (
        <section className="relative bg-zinc-950 text-white">
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            <ClientBackgrounds showHero />
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-20">
                <div className="mb-8">
                    <BackButton />
                </div>

                <div className="mx-auto w-full max-w-7xl flex flex-col gap-12 lg:flex-row lg:items-stretch lg:justify-center">
                    <div className="w-full lg:w-[390px] lg:h-[600px] bg-white/5 backdrop-blur-md shadow-xl p-6 rounded-3xl flex flex-col">
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                            {product.name}
                        </h1>
                        <div className="mt-6 flex-1 flex items-center justify-center rounded-3xl bg-white/95 overflow-hidden">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={360}
                                height={260}
                                sizes="(min-width: 1024px) 360px, 100vw"
                                className="h-full w-full object-contain"
                                unoptimized
                                priority
                            />
                        </div>
                        <div className="mt-auto pt-6">
                            <QuoteButton productName={product.name} />
                        </div>
                    </div>

                    <div className="w-full lg:w-[390px] lg:h-[600px] bg-black/40 backdrop-blur-md shadow-xl p-6 sm:p-8 rounded-3xl">
                        <h2 className="text-xl font-semibold text-white">Product Details</h2>
                        <div className="mt-6 space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <span className="text-base font-bold text-white">Product</span>
                                <span className="text-base text-zinc-200">{product.name}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <span className="text-base font-bold text-white">Category</span>
                                <span className="text-base text-zinc-200">[{product.category}]</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <span className="text-base font-bold text-white">Material</span>
                                <span className="text-base text-zinc-200">{product.material}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <span className="text-base font-bold text-white">Grade</span>
                                <span className="text-base text-zinc-200">{product.grade}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <span className="text-base font-bold text-white">Standard</span>
                                <span className="text-base text-zinc-200">{product.standard}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-base font-bold text-white">Description</span>
                                <span className="text-base text-zinc-200">{product.description}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function generateStaticParams() {
    return (productsData as Product[]).map((product) => ({
        id: product.id,
    }));
}
