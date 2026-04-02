import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-zinc-100 dark:bg-zinc-900 mt-auto">
            <div className="mx-auto max-w-7xl px-4 pt-8 pb-8 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-6">
                    <span className="text-2xl font-bold tracking-tighter text-primary">
                        CFC<span className="text-zinc-900 dark:text-white">Fasteners</span>
                    </span>
                    <nav className="flex gap-6">
                        <Link href="/about" className="text-sm font-semibold text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-primary-light transition-colors">
                            About Us
                        </Link>
                        <Link href="/contact" className="text-sm font-semibold text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-primary-light transition-colors">
                            Contact Us
                        </Link>
                        <a href={`tel:+${process.env.NEXT_PUBLIC_BUSINESS_PHONE}`} className="text-sm font-semibold text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-primary-light transition-colors">
                            Call Us
                        </a>
                    </nav>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-zinc-500">
                        &copy; {new Date().getFullYear()} <span className="font-semibold text-zinc-700 dark:text-zinc-300">CFC Fasteners</span>. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-xs text-zinc-500">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                    <p className="text-sm text-zinc-500">
                        Developed & Managed by <a href="https://jsx-studios.vercel.app" target="_blank" rel="noopener noreferrer" className="font-semibold text-zinc-700 dark:text-zinc-300 hover:text-primary transition-colors">JSX Studios</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
