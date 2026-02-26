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
                    </nav>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-zinc-500">
                        &copy; {new Date().getFullYear()} CFC Fasteners. All rights reserved.
                    </p>
                    <p className="text-sm text-zinc-500">
                        Developed & Managed by <span className="font-semibold text-zinc-700 dark:text-zinc-300">JSX W&D</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
