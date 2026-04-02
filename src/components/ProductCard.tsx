import Image from "next/image";
import Link from "next/link";
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
    sizeChart?: string;
    finish?: string;
    application?: string;
}

interface ProductCardProps {
    product: Product;
    showQuoteButton?: boolean;
}

export default function ProductCard({ product, showQuoteButton = true }: ProductCardProps) {
    return (
        <Link href={`/product/${product.id}`} className="block h-full">
            <div className="product-card group relative flex flex-col h-full overflow-hidden rounded-3xl bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-sm border border-primary/20 hover:border-primary/50 hover:scale-[1.02] transition-all duration-300 z-0 hover:z-10 hover:shadow-2xl">
                {/* Image Container with Fixed Height */}
                <div className="h-48 sm:h-56 relative overflow-hidden bg-white/90 dark:bg-zinc-800/20 w-full p-4">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                    />
                </div>
                {/* Text Content with Flex Grow to Push Buttons Down */}
                <div className="flex flex-1 flex-col p-6 text-left">
                    <h3 className="text-lg font-bold text-white min-h-[2.5rem] line-clamp-2">
                        {product.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
                        <span className="bg-primary/20 text-primary-light border border-primary/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                            {product.standard}
                        </span>
                        <span className="text-zinc-500 font-medium text-xs truncate whitespace-nowrap">{product.material}</span>
                    </div>
                    <p className="mt-4 text-sm text-zinc-400 line-clamp-3 min-h-[3rem]">
                        {product.description}
                    </p>
                    {showQuoteButton && (
                        <div className="mt-auto pt-6 border-t border-zinc-200/5 dark:border-zinc-800">
                            <QuoteButton productName={product.name} />
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
