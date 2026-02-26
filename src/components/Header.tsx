"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/catalog" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-primary">
                        <Image src="/BrandMark.svg" alt="CFC Fasteners Logo" width={32} height={32} />
                        <span>CFC<span className="text-zinc-900 dark:text-white">Fasteners</span></span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden items-center space-x-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-zinc-600 transition-colors hover:text-primary dark:text-zinc-300 dark:hover:text-primary-light"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex items-center md:hidden gap-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                        <span className="sr-only">Toggle menu</span>
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="space-y-1 px-4 pb-3 pt-2 shadow-lg bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-zinc-700 hover:bg-zinc-50 hover:text-primary dark:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/catalog"
                            className="mt-4 block w-full rounded-md bg-primary px-3 py-2 text-center text-base font-medium text-white hover:bg-primary-dark"
                            onClick={() => setIsOpen(false)}
                        >
                            Get a Quote
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
