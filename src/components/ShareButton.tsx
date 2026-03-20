"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
    title: string;
    text: string;
    url: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url: window.location.href,
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy:", err);
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all border border-white/5 active:scale-95"
            title="Share this product"
        >
            {copied ? (
                <>
                    <Check size={18} className="text-green-500" />
                    <span className="text-sm font-medium">Copied!</span>
                </>
            ) : (
                <>
                    <Share2 size={18} />
                    <span className="text-sm font-medium">Share</span>
                </>
            )}
        </button>
    );
}
