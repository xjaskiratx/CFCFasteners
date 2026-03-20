import ProductSkeleton from "@/components/ProductSkeleton";

export default function CatalogLoading() {
    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen flex flex-col w-full">
            <div className="relative overflow-hidden bg-zinc-950 text-white pt-24 pb-12 sm:pt-32 sm:pb-16 h-[300px]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="h-10 bg-zinc-800 rounded w-48 animate-pulse mb-4" />
                    <div className="h-6 bg-zinc-800 rounded w-96 animate-pulse" />
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {[...Array(6)].map((_, i) => (
                        <ProductSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
