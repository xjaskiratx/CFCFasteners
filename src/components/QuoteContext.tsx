"use client";
import React, { createContext, useContext, useState } from "react";
import dynamic from "next/dynamic";
const RFQModal = dynamic(() => import("./RFQModal"), { ssr: false });
const WhatsAppWidget = dynamic(() => import("./WhatsAppWidget"), { ssr: false });

type QuoteContextType = {
    openQuote: (productName?: string) => void;
    closeQuote: () => void;
    isOpen: boolean;
    prefillProduct: string;
};

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [prefillProduct, setPrefillProduct] = useState("");

    const openQuote = (productName = "") => {
        setPrefillProduct(productName);
        setIsOpen(true);
    };

    const closeQuote = () => setIsOpen(false);

    return (
        <QuoteContext.Provider value={{ openQuote, closeQuote, isOpen, prefillProduct }}>
            {children}
            <RFQModal />
            <WhatsAppWidget />
        </QuoteContext.Provider>
    );
}

export function useQuote() {
    const context = useContext(QuoteContext);
    if (!context) throw new Error("useQuote must be used within a QuoteProvider");
    return context;
}
