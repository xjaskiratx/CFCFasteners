"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import ClientBackgrounds from "@/components/ClientBackgrounds";
// Supabase import removed; using Formspree instead

// Removed metadata export as it conflicts with "use client" in the same file. Instead, we would handle SEO in a layout or wrapper, but since this is page.tsx and now client-side, we can drop metadata or move it.
// To keep things simple and avoid a build error, we've dropped it for now, or you can extract it to layout.tsx if you want.

export default function ContactPage() {
    const [method, setMethod] = useState<"email" | "whatsapp">("email");
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "+91 ",
        company: "",
        productName: "",
        quantity: "",
        message: ""
    });

    useEffect(() => {
        // Smart IP detection for country code
        const fetchIp = async () => {
            try {
                const res = await fetch('https://ipapi.co/json/');
                if (!res.ok) return;
                const data = await res.json();
                if (data.country_calling_code) {
                    setFormData(prev => ({
                        ...prev,
                        phone: `${data.country_calling_code} `
                    }));
                }
            } catch (err) {
                // Ignore network errors (adblockers/CORS) silently so it doesn't break the page
                console.warn("IP fetch skipped or blocked.");
            }
        };
        fetchIp();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus("idle");

        try {
            const res = await fetch('https://formspree.io/f/xjgelpnn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    company: formData.company || null,
                    "productName": formData.productName || "Contact Form Inquiry",
                    quantity: formData.quantity || "N/A",
                    message: formData.message || null
                })
            });
            const data = await res.json();
            if (data.error || !res.ok) {
                console.error("Formspree submission error:", data.error || res.statusText);
                setSubmitStatus("error");
            } else {
                setSubmitStatus("success");
            }
        } catch (err) {
            // Client fetch caught (ad-blocker or dropped connection)
            console.warn("Failed to ping /api/rfq endpoint:", err);
            setSubmitStatus("error");
        }

        if (method === "whatsapp") {
            const text = `Hi, I'm ${formData.name}.\n\n${formData.message}`;
            const url = `https://wa.me/919646506000?text=${encodeURIComponent(text)}`; // Changed to client's Indian number
            window.open(url, "_blank", "noopener,noreferrer");
        } else {
            // Formspree handles the email, no need to open local mail app.
            if (submitStatus !== "error") {
                alert("Message sent successfully! We will get back to you soon.");
            }
            setFormData({ name: "", email: "", phone: "+91 ", company: "", productName: "", quantity: "", message: "" });
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
                    <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        Have a blueprint drawing or need a bulk quotation? Reach out to our direct manufacturing specialists.
                    </p>
                </div>

                <div className="mx-auto mt-16 flex flex-col gap-12 max-w-4xl">
                    {/* Contact Info */}
                    <div className="rounded-[2rem] bg-white dark:bg-black p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-center">
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-8 text-center">Ways to Contact Us</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
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
                            </div>
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                                <div className="bg-primary/10 p-3 rounded-2xl shrink-0">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <strong className="block text-zinc-900 dark:text-white mb-2 font-semibold text-sm">Phone Inquiries</strong>
                                    <span className="block text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                        +91 96465-06000<br />
                                        +91 94645-06000<br />
                                        +91 94643-06000<br />
                                        Mon-Sat, 10am - 10pm IST
                                    </span>
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

                    {/* Contact Form Placeholder */}
                    <div className="rounded-[2rem] bg-white dark:bg-black p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6 text-center">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
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
                                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Name *</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-5 h-11 border border-zinc-300 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="John Doe" />
                            </div>

                            {method === "email" ? (
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Email Address *</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-5 h-11 border border-zinc-300 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="john@example.com" />
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">WhatsApp Number *</label>
                                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-5 h-11 border border-zinc-300 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="+91 98765 43210" />
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Company Name (Optional)</label>
                                <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-5 h-11 border border-zinc-300 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="Your Company Ltd." />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Product Requirement *</label>
                                    <input type="text" name="productName" required value={formData.productName} onChange={handleChange} className="w-full px-5 h-11 border border-zinc-300 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="e.g. Hex Bolts M12" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Quantity *</label>
                                    <input type="text" name="quantity" required value={formData.quantity} onChange={handleChange} className="w-full px-5 h-11 border border-zinc-300 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" placeholder="e.g. 10,000 pcs" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Message *</label>
                                <textarea name="message" required rows={3} value={formData.message} onChange={handleChange} className="w-full px-5 py-3 border border-zinc-300 dark:border-zinc-700 rounded-3xl bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y text-sm" placeholder="Additional details or specific requirements..." />
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
