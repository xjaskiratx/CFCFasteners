import Image from "next/image";
import { Building2, Award, History } from "lucide-react";
import HeroAnimatedBackground from "@/components/HeroAnimatedBackground";

export const metadata = {
    title: "About Us | CFC Fasteners",
    description: "Learn about the history and manufacturing excellence of CFC Fasteners.",
};

export default function AboutPage() {
    return (
        <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen py-16 sm:py-24 relative pb-24 lg:pb-32 overflow-hidden">
            <HeroAnimatedBackground />
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                        Forging Strength Since 2018
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        CFC Fasteners has been at the forefront of precision engineering, delivering critical bolts and nuts to the aerospace, automotive, and heavy machinery industries worldwide.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                            <History className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Our Heritage</h3>
                        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                            Starting from a small workshop over three decades ago, we have rapidly expanded into a multi-facility global leader built on rigorous standards.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                            <Building2 className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Manufacturing Capabilities</h3>
                        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                            Our state-of-the-art 150,000 sq ft facility utilizes the latest hot-forging, cold-heading, and CNC precision turning technologies.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                            <Award className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Global Compliance</h3>
                        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                            We are ISO 9001:2015 certified, manufacturing fasteners explicitly matching DIN, ISO, ANSI, and ASME stringent requirements.
                        </p>
                    </div>
                </div>

            </div>
            {/* Bottom Fade Transition into Footer */}
            <div className="absolute bottom-0 left-0 w-full h-16 lg:h-24 bg-gradient-to-t from-zinc-100 dark:from-zinc-900 to-transparent z-10 pointer-events-none"></div>
        </div>
    );
}
