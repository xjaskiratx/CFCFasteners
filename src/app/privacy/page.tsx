import ClientBackgrounds from "@/components/ClientBackgrounds";

export const metadata = {
    title: "Privacy Policy | CFC Fasteners",
    description: "CFC Fasteners privacy policy regarding data collection and usage.",
};

export default function PrivacyPolicy() {
    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen py-16 sm:py-24 relative overflow-hidden text-zinc-900 dark:text-zinc-100">
            <ClientBackgrounds showHero />
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
                <h1 className="text-4xl font-bold mb-8 text-primary">Privacy Policy</h1>
                <div className="space-y-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    <p>At CFC Fasteners, we are committed to protecting your privacy. This policy outlines how we handle your information when you use our website or services.</p>
                    
                    <h2 className="text-xl font-bold text-white mt-8">1. Information Collection</h2>
                    <p>We collect information you provide directly through our contact forms and RFQ (Request for Quotation) modules, including your name, email, phone number, and company details.</p>
                    
                    <h2 className="text-xl font-bold text-white mt-8">2. Use of Information</h2>
                    <p>Your information is used solely to respond to your inquiries, provide quotations, and manage our business relationship with you. We do not sell your data to third parties.</p>
                    
                    <h2 className="text-xl font-bold text-white mt-8">3. Data Security</h2>
                    <p>We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>
                    
                    <h2 className="text-xl font-bold text-white mt-8">4. Contact Us</h2>
                    <p>If you have questions about this policy, please contact us at cfcfastners@gmail.com.</p>
                </div>
            </div>
        </div>
    );
}
