"use client";
import React from "react";
import { useQuote } from "./QuoteContext";

export default function QuoteButton({ productName }: { productName: string }) {
    const { openQuote } = useQuote();

    return (
        <button
            onClick={() => openQuote(productName)}
            className="w-full rounded-full bg-primary-dark px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 transition-colors cursor-pointer"
        >
            Request Quote
        </button>
    );
}
