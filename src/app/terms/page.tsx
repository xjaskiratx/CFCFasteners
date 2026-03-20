import ClientBackgrounds from "@/components/ClientBackgrounds";

export const metadata = {
    title: "Terms of Service | CFC Fasteners",
    description: "CFC Fasteners terms and conditions for business and manufacturing services.",
};

export default function TermsOfService() {
    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen py-16 sm:py-24 relative overflow-hidden text-zinc-900 dark:text-zinc-100">
            <ClientBackgrounds showHero />
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
                <h1 className="text-4xl font-bold mb-8 text-primary">Terms of Service</h1>
                <div className="space-y-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    <p>By using this website, you agree to the following terms and conditions.</p>
                    
                    <h2 className="text-xl font-bold text-white mt-8">1. Manufacturing Standards</h2>
                    <p>All fasteners are manufactured to match the specifications requested (DIN, ISO, etc.). Variations within standard tolerances are acceptable globally.</p>
                    
                    <h2 className="text-xl font-bold text-white mt-8">2. Quotations & Orders</h2>
                    <p>Quotations are valid for 15 days unless otherwise specified. Orders are confirmed only after written acceptance and payment terms are met.</p>
                    
                    <h2 className="text-xl font-bold text-white mt-8">3. Liability</h2>
                    <p>CFC Fasteners is not liable for indirect or consequential damages resulting from the use of our products. Users must verify suitability for their specific applications.</p>
                    
                    <h2 className="text-xl font-bold text-white mt-8">4. Governing Law</h2>
                    <p>These terms are governed by the laws of Ludhiana, Punjab, India.</p>
                </div>
            </div>
        </div>
    );
}
