import Image from "next/image";
import QuoteButton from "@/components/QuoteButton";

export interface Product {
    id: string;
    name: string;
    category: string;
    material: string;
    grade: string;
    standard: string;
    description: string;
    imageUrl: string;
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="product-card group relative flex flex-col overflow-hidden rounded-3xl bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-sm border border-primary/20 hover:border-primary/50 hover:scale-110 transition-all duration-300 z-0 hover:z-10 hover:shadow-2xl">
            <div className="h-48 sm:h-64 sm:aspect-none relative overflow-hidden bg-transparent w-full">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
    );
}
