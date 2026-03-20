import React from "react";

export default function ProductSkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 animate-pulse border border-zinc-200 dark:border-zinc-800 h-[450px]">
            <div className="h-64 bg-zinc-200 dark:bg-zinc-800 w-full" />
            <div className="flex flex-1 flex-col p-6 space-y-4">
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
                <div className="flex gap-4">
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-16" />
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20" />
                </div>
                <div className="space-y-2 flex-1">
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
                </div>
                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-full w-full" />
                </div>
            </div>
        </div>
    );
}
