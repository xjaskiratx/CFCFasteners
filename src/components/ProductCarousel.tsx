"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProductCard, { Product } from "./ProductCard";

interface ProductCarouselProps {
    products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
    const [durationFactor, setDurationFactor] = useState(1); // Default

    useEffect(() => {
        const handleResize = () => {
            // Speed 5 for desktop, Speed 12 for mobile
            if (window.innerWidth < 1024) {
                setDurationFactor(12);
            } else {
                setDurationFactor(7);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Duplicate products for infinite scroll effect (using 2 sets for standard loop)
    const doubledProducts = [...products, ...products];

    return (
        <div className="relative w-full overflow-hidden py-10">
            <motion.div
                key={`carousel-${durationFactor}`}
                className="flex gap-6 sm:gap-8"
                initial={{ x: 0 }}
                animate={{
                    x: "-50%",
                }}
                transition={{
                    x: {
                        duration: products.length * durationFactor,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }
                }}
                style={{ width: "max-content" }}
                // Pause on hover
                whileHover={{ animationPlayState: "paused" }}
            >
                {doubledProducts.map((product, index) => (
                    <div key={`${product.id}-${index}`} className="w-[280px] sm:w-[320px] shrink-0">
                        <ProductCard product={product} showQuoteButton={false} />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
