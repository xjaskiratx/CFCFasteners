"use client";

import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProductCard, { Product } from "./ProductCard";

interface ProductCarouselProps {
    products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
    const [durationFactor, setDurationFactor] = useState(7);
    const controls = useAnimation();
    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Duplicate products for infinite scroll effect (using 3 sets for smoother drag buffer)
    const displayProducts = [...products, ...products, ...products];
    const productWidth = 320 + 32; // card width + gap (approximate, refined below)

    useEffect(() => {
        const handleResize = () => {
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

    const startAutoScroll = () => {
        const totalWidth = products.length * productWidth;
        controls.start({
            x: -totalWidth,
            transition: {
                duration: products.length * durationFactor,
                ease: "linear",
                repeat: Infinity,
            },
        });
    };

    useEffect(() => {
        if (!isDragging) {
            startAutoScroll();
        } else {
            controls.stop();
        }
    }, [isDragging, products.length, durationFactor]);

    // Handle Wrapping for Infinite Loop
    useEffect(() => {
        const unsubscribe = x.on("change", (latest) => {
            const totalWidth = products.length * productWidth;
            if (latest <= -totalWidth * 2) {
                x.set(latest + totalWidth);
            } else if (latest >= 0) {
                x.set(latest - totalWidth);
            }
        });
        return () => unsubscribe();
    }, [products.length]);

    return (
        <div className="relative w-full overflow-hidden py-6 cursor-grab active:cursor-grabbing" ref={containerRef}>
            <motion.div
                style={{ x, width: "max-content" }}
                className="flex gap-6 sm:gap-8"
                drag="x"
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => {
                    setIsDragging(false);
                }}
                animate={controls}
            >
                {displayProducts.map((product, index) => (
                    <div key={`${product.id}-${index}`} className="w-[280px] sm:w-[320px] shrink-0 pointer-events-none sm:pointer-events-auto">
                        <ProductCard product={product} showQuoteButton={false} />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
