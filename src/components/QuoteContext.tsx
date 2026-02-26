"use client";
import React, { createContext, useContext, useState } from "react";
import RFQModal from "./RFQModal";

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
        </QuoteContext.Provider>
    );
}

export function useQuote() {
    const context = useContext(QuoteContext);
    if (!context) throw new Error("useQuote must be used within a QuoteProvider");
    return context;
}
