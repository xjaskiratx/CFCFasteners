"use client";

import { motion } from "framer-motion";

export default function WhatsAppWidget() {
    const whatsappUrl = `https://wa.me/919464506000`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
                scale: 1, 
                opacity: 1,
                filter: ["brightness(1)", "brightness(1.15)", "brightness(1)"],
            }}
            transition={{
                filter: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                },
                scale: { duration: 0.3 },
                opacity: { duration: 0.3 }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/20 hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:ring-offset-zinc-950"
            aria-label="Direct chat on WhatsApp"
        >
            <svg 
                viewBox="0 0 24 24" 
                width="32" 
                height="32" 
                fill="currentColor" 
                className="text-white"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.399-4.301 9.79-9.864 9.86l.003.003zm8.44-16.851A11.854 11.854 0 0012.05 1.104C5.432 1.104.05 6.485.048 13.102c0 2.113.55 4.176 1.597 6.01L0 24l4.98-1.306a11.83 11.83 0 005.626 1.432h.005c6.617 0 12-5.382 12.002-12.001a11.853 11.853 0 00-3.173-8.814"/>
            </svg>
        </motion.a>
    );
}
