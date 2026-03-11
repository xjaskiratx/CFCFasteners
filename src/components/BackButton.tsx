"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-full bg-primary-dark px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary transition-colors"
        >
            Back
        </button>
    );
}
