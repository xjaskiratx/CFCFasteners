import Link from "next/link";
import ClientBackgrounds from "@/components/ClientBackgrounds";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
    return (
        <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden bg-zinc-950 text-white">
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            <ClientBackgrounds showRipple />

            <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
                <h1 className="text-9xl font-extrabold tracking-tight text-white/20 sm:text-[12rem] drop-shadow-2xl">
                    404
                </h1>
                <div className="relative -mt-16 sm:-mt-24">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl drop-shadow-lg">
                        Page not found
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-lg text-zinc-300 drop-shadow-md">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/"
                            className="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:scale-105"
                        >
                            Go back home
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/catalog"
                            className="text-sm font-semibold text-zinc-300 transition-colors hover:text-white"
                        >
                            Browse catalog <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-16 lg:h-24 bg-linear-to-t from-zinc-100 dark:from-zinc-900 to-transparent z-10 pointer-events-none"></div>
        </div>
    );
}
