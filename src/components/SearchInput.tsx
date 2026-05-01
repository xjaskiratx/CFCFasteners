"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export default function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    
    const initialQuery = searchParams.get("q") || "";
    const [query, setQuery] = useState(initialQuery);
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        // Prevent infinite loop by checking if the query is already in sync with URL
        const currentQ = searchParams.get("q") || "";
        if (debouncedQuery === currentQ) return;

        const params = new URLSearchParams(searchParams.toString());
        if (debouncedQuery) {
            params.set("q", debouncedQuery);
        } else {
            params.delete("q");
        }
        
        startTransition(() => {
            router.push(`/catalog?${params.toString()}`, { scroll: false });
        });
    }, [debouncedQuery, router, searchParams]);

    return (
        <div className="relative w-full sm:max-w-xs group">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${isPending ? "text-primary animate-pulse" : "text-zinc-500 group-focus-within:text-primary"}`}>
                <Search size={18} />
            </div>
            <input
                id="search-input-header"
                name="q"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="block w-full pl-10 pr-10 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all shadow-sm"
            />
            {query && (
                <button
                    onClick={() => setQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
}
