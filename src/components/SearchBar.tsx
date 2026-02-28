"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import productsData from "@/data/products.json";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import QuoteButton from "./QuoteButton";

const ANIMATION_ITEMS = ["bolts", "nuts", "screws", "anchors", "hooks"];

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const searchResults = query.trim()
        ? productsData.filter((p: any) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 4) // Show up to 4 results in the row
        : [];

    useEffect(() => {
        if (isFocused) {
            setPlaceholder("Search...");
            return;
        }

        let currentIndex = 0;
        let currentText = "";
        let isDeleting = false;
        let timeout: NodeJS.Timeout;

        const type = () => {
            const currentItem = ANIMATION_ITEMS[currentIndex];

            if (isDeleting) {
                currentText = currentItem.substring(0, currentText.length - 1);
            } else {
                currentText = currentItem.substring(0, currentText.length + 1);
            }

            setPlaceholder(`Search for ${currentText}|`);

            let typeSpeed = isDeleting ? 30 : 100;

            if (!isDeleting && currentText === currentItem) {
                typeSpeed = 1500; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && currentText === "") {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % ANIMATION_ITEMS.length;
                typeSpeed = 300; // Pause before new word
            }

            timeout = setTimeout(type, typeSpeed);
        };

        timeout = setTimeout(type, 300);

        return () => clearTimeout(timeout);
    }, [isFocused]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Default form submission is prevented so results remain visible inline.
    };

    return (
        <div className="relative w-full">
            <form onSubmit={handleSearch} className="relative mt-4 w-full flex items-center">
                <div className="relative w-full shadow-2xl rounded-full group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none z-10">
                        <Search className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-primary' : 'text-zinc-400'}`} />
                    </div>
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="block w-full p-4 pl-14 text-sm text-zinc-900 border border-zinc-700 rounded-full bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-zinc-900/80 dark:border-zinc-800 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-primary/50 dark:focus:border-primary transition-all duration-300 outline-none backdrop-blur-md"
                        placeholder={placeholder}
                    />
                    <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2 bg-primary-dark hover:bg-primary font-medium rounded-full text-sm px-8 py-2.5 transition-colors shadow-lg shadow-primary/20 backdrop-blur-sm cursor-pointer"
                    >
                        Search
                    </button>
                </div>
            </form>

            <AnimatePresence>
                {query.trim().length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute left-0 right-0 top-full mt-4 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 pb-20 z-50 overflow-hidden"
                    >
                        {searchResults.length > 0 ? (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Search Results</h3>
                                    <Link href={`/catalog?q=${encodeURIComponent(query)}`} className="text-sm text-primary hover:text-primary-light transition-colors">
                                        View all results &rarr;
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {searchResults.map((product: any) => (
                                        <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 transition-all duration-300">
                                            <div className="aspect-h-3 aspect-w-4 bg-transparent sm:aspect-none h-40 relative overflow-hidden">
                                                <Image
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    fill
                                                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col p-4 text-left">
                                                <h3 className="text-base font-semibold text-zinc-900 dark:text-white line-clamp-1">
                                                    {product.name}
                                                </h3>
                                                <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                                    <span className="bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-medium text-zinc-700 dark:text-zinc-300">
                                                        {product.standard}
                                                    </span>
                                                </div>
                                                <div className="mt-4">
                                                    <QuoteButton productName={product.name} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                                No products found for &quot;{query}&quot;. Try a different search term.
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
