"use client";
import React, { useEffect } from "react";
import { useQuote } from "./QuoteContext";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, MessageCircle } from "lucide-react";
// Supabase import removed; using Formspree instead

const rfqSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(5, "Phone is required"),
    company: z.string().optional(),
    productName: z.string().min(1, "Product is required"),
    quantity: z.string().min(1, "Quantity is required"),
    message: z.string().optional(),
});

type RFQFormValues = z.infer<typeof rfqSchema>;

export default function RFQModal() {
    const { isOpen, closeQuote, prefillProduct } = useQuote();

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<RFQFormValues>({
        resolver: zodResolver(rfqSchema),
        defaultValues: { productName: prefillProduct },
    });

    // Keep form in sync when prefill changes
    useEffect(() => {
        if (isOpen) {
            reset({ productName: prefillProduct, name: "", email: "", phone: "+91 ", company: "", quantity: "", message: "" });

            // Smart IP detection for country code
            const fetchIp = async () => {
                try {
                    const res = await fetch('https://ipapi.co/json/');
                    if (!res.ok) return;
                    const data = await res.json();
                    if (data.country_calling_code) {
                        setValue("phone", `${data.country_calling_code} `);
                    }
                } catch (err) {
                    // Ignore network errors (adblockers/CORS) silently
                    console.warn("IP fetch skipped or blocked.");
                }
            };
            fetchIp();
        }
    }, [prefillProduct, isOpen, reset, setValue]);

    const onSubmit = async (data: RFQFormValues) => {
        try {
            const res = await fetch('https://formspree.io/f/xjgelpnn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    company: data.company || null,
                    "productName": data.productName,
                    quantity: data.quantity,
                    message: data.message || null
                })
            });
            const respData = await res.json();
            if (respData.error) {
                console.error("Formspree submission error:", respData.error);
            }
        } catch (err) {
            console.warn("Failed to ping /api/rfq endpoint:", err);
            // Continue to WhatsApp anyway so the user request isn't lost
        }

        const text = `*New RFQ from CFC Fasteners Website*%0A%0A*Name:* ${data.name}%0A*Company:* ${data.company || 'N/A'}%0A*Email:* ${data.email}%0A*Phone:* ${data.phone}%0A*Product:* ${data.productName}%0A*Quantity:* ${data.quantity}%0A*Message:* ${data.message || 'N/A'}`;
        const whatsappUrl = `https://wa.me/919646506000?text=${text}`; // Changed to client's Indian number since +91 was shown
        window.open(whatsappUrl, '_blank');
        closeQuote();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeQuote}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                    >
                        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 px-6 py-4">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Request a Quote</h2>
                            <button
                                onClick={closeQuote}
                                className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Product</label>
                                    <input
                                        {...register("productName")}
                                        className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                    />
                                    {errors.productName && <p className="mt-1 text-xs text-red-500">{errors.productName.message}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</label>
                                        <input
                                            {...register("name")}
                                            className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                        />
                                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Company (Optional)</label>
                                        <input
                                            {...register("company")}
                                            className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
                                        <input
                                            type="email"
                                            {...register("email")}
                                            className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                        />
                                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">WhatsApp / Phone</label>
                                        <input
                                            type="tel"
                                            {...register("phone")}
                                            className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                        />
                                        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Estimated Quantity</label>
                                    <input
                                        {...register("quantity")}
                                        placeholder="e.g., 5000 pcs"
                                        className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                    />
                                    {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Additional Message</label>
                                    <textarea
                                        {...register("message")}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                        placeholder="Any specific grades, finishes, or custom requirements?"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeQuote}
                                    className="rounded-md px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-[#25D366] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
                                >
                                    <MessageCircle size={18} /> Send via WhatsApp
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
