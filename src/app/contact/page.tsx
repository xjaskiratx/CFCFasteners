"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import ClientBackgrounds from "@/components/ClientBackgrounds";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Valid email is required"),
    phone: z.string().refine((val) => val.replace(/\D/g, '').length >= 10, "Valid phone number is required"),
    company: z.string().optional(),
    productName: z.string().min(1, "Product is required"),
    quantity: z.string().min(1, "Quantity is required"),
    message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// Removed metadata export as it conflicts with "use client" in the same file. Instead, we would handle SEO in a layout or wrapper, but since this is page.tsx and now client-side, we can drop metadata or move it.
// To keep things simple and avoid a build error, we've dropped it for now, or you can extract it to layout.tsx if you want.

export default function ContactPage() {
    const [method, setMethod] = useState<"email" | "whatsapp">("email");
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            phone: "+91 94645 06000",
            productName: "Contact Form Inquiry",
        }
    });

    useEffect(() => {
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
                // Ignore network errors (adblockers/CORS) silently so it doesn't break the page
            }
        };
        fetchIp();
    }, [setValue]);

    // Removed handleChange as we use react-hook-form now

    const onFormSubmit = async (data: ContactFormValues) => {
        setSubmitStatus("idle");
        const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

        try {
            const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
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
                    message: data.message
                })
            });
            const respData = await res.json();
            if (respData.error || !res.ok) {
                console.error("Formspree submission error:", respData.error || res.statusText);
                setSubmitStatus("error");
            } else {
                setSubmitStatus("success");
            }
        } catch (err) {
            // Client fetch caught (ad-blocker or dropped connection)
            setSubmitStatus("error");
        }

        if (method === "whatsapp") {
            const text = `Hi, I'm ${data.name}.\n\n${data.message}`;
            const url = `https://wa.me/919464506000?text=${encodeURIComponent(text)}`;
            window.open(url, "_blank", "noopener,noreferrer");
        } else {
            // Formspree handles the email
            if (submitStatus !== "error") {
                alert("Message sent successfully! We will get back to you soon.");
            }
            reset();
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen py-16 sm:py-24 relative pb-24 lg:pb-32 overflow-hidden">
            <ClientBackgrounds showHero />
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                        Contact Sales & Support
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400 max-sm:text-justify max-sm:[text-align-last:center]">
                        Need a bulk quotation or technical inquiry? Reach out to our manufacturing specialists.
                    </p>
                </div>

                <div className="mx-auto mt-16 flex flex-col gap-12 max-w-4xl">
                    {/* Contact Info */}
                    <div className="rounded-[2rem] bg-white dark:bg-black p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-center">
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-8 text-center">Ways to Contact Us</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=1595/890,+Ground+Floor,+Gali+No.+3,+Muradpura,+Gill+Road,+141003,+Ludhiana"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/40 p-2 rounded-2xl transition-colors"
                            >
                                <div className="bg-primary/10 p-3 rounded-2xl shrink-0">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <strong className="block text-zinc-900 dark:text-white mb-2 font-semibold text-sm">Manufacturing Facility - CFC Fasteners</strong>
                                    <span className="block text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                        1595/890, Ground Floor, Gali No. 3<br />
                                        Muradpura, Gill Road<br />
                                        141003, Ludhiana
                                    </span>
                                </div>
                            </a>
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                                <div className="bg-primary/10 p-3 rounded-2xl shrink-0">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <strong className="block text-zinc-900 dark:text-white mb-2 font-semibold text-sm">Phone Inquiries</strong>
                                    <div className="flex flex-col gap-1">
                                        <a href="tel:+919464506000" className="text-zinc-900 dark:text-white text-sm font-bold hover:text-primary transition-colors">+91 94645 06000</a>
                                        <a href="tel:+919646506000" className="text-zinc-600 dark:text-zinc-400 text-sm hover:text-primary transition-colors">+91 96465 06000</a>
                                        <a href="tel:+919464306000" className="text-zinc-600 dark:text-zinc-400 text-sm hover:text-primary transition-colors">+91 94643 06000</a>
                                        <span className="text-zinc-500 text-[10px] mt-1">Mon-Sat, 10am - 10pm IST</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                                <div className="bg-primary/10 p-3 rounded-2xl shrink-0">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <strong className="block text-zinc-900 dark:text-white mb-2 font-semibold text-sm">Email Addresses</strong>
                                    <span className="block text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                        <a href="mailto:cfcfastners@gmail.com" className="hover:text-primary transition-colors block leading-relaxed">cfcfastners@gmail.com</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Maps Iframe */}
                    <div className="rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm h-[400px] w-full relative group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.34185145!2d75.861!3d30.901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a837462319dfb%3A0x1a837462319dfb!2sMuradpura%2C+Ludhiana%2C+Punjab+141003!5e0!3m2!1sen!2sin!4v1622548000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="CFC Fasteners Location"
                            className="w-full h-full transition-all duration-300"
                        ></iframe>
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=1595/890,+Ground+Floor,+Gali+No.+3,+Muradpura,+Gill+Road,+141003,+Ludhiana"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-10 cursor-pointer"
                            aria-label="Open location in Google Maps"
                        ></a>
                    </div>

                    {/* Contact Form Placeholder */}
                    <div className="rounded-[2rem] bg-white dark:bg-black p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6 text-center">Send a Message</h3>
                        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
                            {submitStatus === "success" && (
                                <div className="rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
                                    Message sent successfully.
                                </div>
                            )}
                            {submitStatus === "error" && (
                                <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-700">
                                    Message failed to send by email. You can still contact us via WhatsApp.
                                </div>
                            )}
                            {/* Method Toggle */}
                            <div className="flex bg-zinc-100 dark:bg-zinc-900/60 p-1.5 rounded-full mb-6 relative border border-zinc-200/50 dark:border-zinc-800/50">
                                <button
                                    type="button"
                                    onClick={() => setMethod("email")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-semibold transition-all relative z-10 ${method === "email" ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-200/50 dark:border-zinc-700/50" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border border-transparent"}`}
                                >
                                    <Mail size={16} /> Email
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMethod("whatsapp")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-semibold transition-all relative z-10 ${method === "whatsapp" ? "bg-white dark:bg-zinc-800 text-[#25D366] dark:text-[#25D366] shadow-sm border border-zinc-200/50 dark:border-zinc-700/50" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border border-transparent"}`}
                                >
                                    <MessageCircle size={16} /> WhatsApp
                                </button>
                            </div>

                            <div>
                                <label htmlFor="contact-name" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Name *</label>
                                <input id="contact-name" {...register("name")} className="w-full px-5 h-11 border border-zinc-300 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="John Doe" />
                                {errors.name && <p className="mt-1 text-xs text-red-500 ml-4">{errors.name.message}</p>}
                            </div>

                            {method === "email" ? (
                                <div>
                                    <label htmlFor="contact-email" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Email Address *</label>
                                    <input id="contact-email" type="email" {...register("email")} className="w-full px-5 h-11 border border-zinc-300 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="john@example.com" />
                                    {errors.email && <p className="mt-1 text-xs text-red-500 ml-4">{errors.email.message}</p>}
                                </div>
                            ) : (
                                <div>
                                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">WhatsApp Number *</label>
                                    <input id="contact-phone" type="tel" {...register("phone")} className="w-full px-5 h-11 border border-zinc-300 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="+91 94645 06000" />
                                    {errors.phone && <p className="mt-1 text-xs text-red-500 ml-4">{errors.phone.message}</p>}
                                </div>
                            )}

                            <div>
                                <label htmlFor="contact-company" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Company Name (Optional)</label>
                                <input id="contact-company" type="text" {...register("company")} className="w-full px-5 h-11 border border-zinc-300 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="Your Company Ltd." />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="contact-product" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Product Requirement *</label>
                                    <input id="contact-product" type="text" {...register("productName")} className="w-full px-5 h-11 border border-zinc-300 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="e.g. Hex Bolts M12" />
                                    {errors.productName && <p className="mt-1 text-xs text-red-500 ml-4">{errors.productName.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="contact-quantity" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Quantity *</label>
                                    <input id="contact-quantity" type="text" {...register("quantity")} className="w-full px-5 h-11 border border-zinc-300 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="e.g. 10,000 pcs" />
                                    {errors.quantity && <p className="mt-1 text-xs text-red-500 ml-4">{errors.quantity.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="contact-message" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Message *</label>
                                <textarea id="contact-message" {...register("message")} rows={3} className="w-full px-5 py-3 border border-zinc-300 dark:border-zinc-700 rounded-3xl bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y text-sm" placeholder="Additional details or technical specifications..." />
                                {errors.message && <p className="mt-1 text-xs text-red-500 ml-4">{errors.message.message}</p>}
                            </div>
                            <div className="pt-1">
                                <button type="submit" className="w-full py-3 px-6 bg-primary hover:bg-primary-light text-white font-bold text-base rounded-full transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2">
                                    <Send size={18} /> {method === "whatsapp" ? "Send to WhatsApp" : "Send Message"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Bottom Fade Transition into Footer */}
            <div className="absolute bottom-0 left-0 w-full h-16 lg:h-24 bg-gradient-to-t from-zinc-100 dark:from-zinc-900 to-transparent z-10 pointer-events-none"></div>
        </div>
    );
}
