"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Hexagon } from "lucide-react";

// A custom "Bolt" icon built from SVG
const Bolt = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 14v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4" />
        <path d="M8 8v6" />
        <path d="M16 8v6" />
        <polygon points="12 2 19 6 19 10 12 14 5 10 5 6 12 2" fill="currentColor" fillOpacity="0.2" />
    </svg>
);

// A custom "Nut" icon built from SVG
const Nut = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 20.66 7 20.66 17 12 22 3.34 17 3.34 7 12 2" />
        <circle cx="12" cy="12" r="4" />
    </svg>
);

export default function HeroAnimatedBackground() {
    const rootRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax mappings
    const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
    const y3 = useTransform(scrollY, [0, 1000], [0, 400]);
    const y4 = useTransform(scrollY, [0, 1000], [0, -350]);

    const rotate1 = useTransform(scrollY, [0, 1000], [0, 360]);
    const rotate2 = useTransform(scrollY, [0, 1000], [0, -280]);
    const rotate3 = useTransform(scrollY, [0, 1000], [0, 180]);
    const rotate4 = useTransform(scrollY, [0, 1000], [0, -360]);

    useEffect(() => {
        const node = rootRef.current;
        if (!node) return;

        const handleVisibilityChange = () => {
            if (document.visibilityState !== "visible") {
                node.style.visibility = "hidden";
            } else {
                node.style.visibility = "visible";
            }
        };

        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                node.style.visibility = entry?.isIntersecting ? "visible" : "hidden";
            },
            { root: null, threshold: 0.1 }
        );

        intersectionObserver.observe(node);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            intersectionObserver.disconnect();
        };
    }, []);

    return (
        <div
            ref={rootRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen opacity-25"
        >
            <motion.div style={{ y: y1, rotate: rotate1 }} className="absolute top-[10%] left-[5%] text-primary blur-[3px] scale-150">
                <Nut className="w-32 h-32" />
            </motion.div>
            <motion.div style={{ y: y2, rotate: rotate2 }} className="absolute top-[25%] right-[8%] text-primary-light blur-[1px]">
                <Bolt className="w-32 h-32" />
            </motion.div>
            <motion.div style={{ y: y3, rotate: rotate3 }} className="absolute top-[60%] left-[10%] text-white blur-[5px] scale-[2]">
                <Hexagon className="w-24 h-24" />
            </motion.div>
            <motion.div style={{ y: y4, rotate: rotate4 }} className="absolute top-[75%] right-[15%] text-primary blur-[2px] scale-125">
                <Nut className="w-24 h-24" />
            </motion.div>
            <motion.div style={{ y: y1, rotate: rotate2 }} className="absolute top-[5%] right-[40%] text-primary-light">
                <Bolt className="w-12 h-12" />
            </motion.div>
            <motion.div style={{ y: y2, rotate: rotate4 }} className="absolute top-[50%] right-[35%] text-primary blur-sm scale-[2.5] opacity-60">
                <Bolt className="w-40 h-40" />
            </motion.div>

            {/* Additional Bolts and Hardware */}
            <motion.div style={{ y: y3, rotate: rotate1 }} className="absolute top-[20%] left-[45%] text-white blur-xs scale-[1.5] opacity-50">
                <Bolt className="w-20 h-20" />
            </motion.div>
            <motion.div style={{ y: y4, rotate: rotate3 }} className="absolute top-[85%] left-[25%] text-primary-light blur-[2px] scale-100 opacity-70">
                <Bolt className="w-24 h-24" />
            </motion.div>
            <motion.div style={{ y: y2, rotate: rotate1 }} className="absolute top-[35%] left-[80%] text-primary blur-[6px] scale-[1.8] opacity-60">
                <Bolt className="w-28 h-28" />
            </motion.div>
            <motion.div style={{ y: y1, rotate: rotate2 }} className="absolute top-[70%] right-[45%] text-white blur-[3px] scale-125 opacity-40">
                <Hexagon className="w-16 h-16" />
            </motion.div>
        </div>
    );
}
