import Image from "next/image";
import { notFound } from "next/navigation";
import ClientBackgrounds from "@/components/ClientBackgrounds";
import QuoteButton from "@/components/QuoteButton";
import BackButton from "@/components/BackButton";
import ShareButton from "@/components/ShareButton";
import productsData from "@/data/products.json";
import type { Product } from "@/components/ProductCard";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { id } = await params;
    const productId = decodeURIComponent(id);
    const product = (productsData as Product[]).find((item) => item.id === productId);

    if (!product) return { title: "Product Not Found" };

    return {
        title: `${product.name} | CFC Fasteners`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [
                {
                    url: product.imageUrl,
                    width: 800,
                    height: 600,
                    alt: product.name,
                },
            ],
        },
    };
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
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20">
                <div className="mb-8">
                    <BackButton />
                </div>

                <div className="mx-auto w-full max-w-7xl flex flex-col gap-12 lg:flex-row lg:items-stretch lg:justify-center">
                    <div className="w-full lg:w-[390px] lg:h-[600px] bg-white/5 backdrop-blur-md shadow-xl p-6 rounded-3xl flex flex-col justify-between">
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
                                priority
                            />
                        </div>
                        <div className="pt-6 flex flex-col gap-3">
                            <QuoteButton productName={product.name} />
                            <div className="flex justify-center">
                                <ShareButton 
                                    title={product.name} 
                                    text={`Check out ${product.name} from CFC Fasteners`} 
                                    url="" 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[450px] bg-black/40 backdrop-blur-md shadow-xl p-6 sm:p-8 rounded-3xl flex flex-col">
                        <h2 className="text-xl font-semibold text-white mb-6">Technical Specifications</h2>
                        <div className="flex-1 overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <tbody className="divide-y divide-white/10">
                                    <tr className="group">
                                        <th className="py-3 font-bold text-zinc-400 group-hover:text-white transition-colors">Category</th>
                                        <td className="py-3 text-white text-right capitalize">{product.category}</td>
                                    </tr>
                                    <tr className="group">
                                        <th className="py-3 font-bold text-zinc-400 group-hover:text-white transition-colors">Material</th>
                                        <td className="py-3 text-white text-right">{product.material}</td>
                                    </tr>
                                    <tr className="group">
                                        <th className="py-3 font-bold text-zinc-400 group-hover:text-white transition-colors">Grade</th>
                                        <td className="py-3 text-white text-right">{product.grade}</td>
                                    </tr>
                                    <tr className="group">
                                        <th className="py-3 font-bold text-zinc-400 group-hover:text-white transition-colors">Standard</th>
                                        <td className="py-3 text-white text-right">{product.standard}</td>
                                    </tr>
                                    {product.sizeChart && (
                                        <tr className="group">
                                            <th className="py-3 font-bold text-zinc-400 group-hover:text-white transition-colors">Size Range</th>
                                            <td className="py-3 text-white text-right">{product.sizeChart}</td>
                                        </tr>
                                    )}
                                    {product.finish && (
                                        <tr className="group">
                                            <th className="py-3 font-bold text-zinc-400 group-hover:text-white transition-colors">Finish</th>
                                            <td className="py-3 text-white text-right">{product.finish}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            
                            {product.application && (
                                <div className="mt-8">
                                    <h3 className="text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Application</h3>
                                    <p className="text-zinc-200 text-sm leading-relaxed">{product.application}</p>
                                </div>
                            )}
                            
                            <div className="mt-8">
                                <h3 className="text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">Description</h3>
                                <p className="text-zinc-200 text-sm leading-relaxed">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-16 lg:h-24 bg-gradient-to-t from-zinc-100 dark:from-zinc-900 to-transparent z-10 pointer-events-none"></div>
        </section>
    );
}

export function generateStaticParams() {
    return (productsData as Product[]).map((product) => ({
        id: product.id,
    }));
}
