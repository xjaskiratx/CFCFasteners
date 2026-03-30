import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | CFC Fasteners",
    description: "Get in touch with CFC Fasteners for bulk quotations, technical inquiries, and industrial manufacturing support. We serve global clients from our Ludhiana facility.",
    keywords: ["contact CFC Fasteners", "fastener wholesale quotation", "bulk industrial fasteners", "Ludhiana fastener supplier contact"],
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: "Contact CFC Fasteners - Sales & Support",
        description: "Reach out via email, phone, or WhatsApp for high-grade industrial fasteners.",
        url: 'https://cfc-fasteners.vercel.app/contact',
    },
    twitter: {
        title: "Contact CFC Fasteners - Sales & Support",
        description: "Reach out via email, phone, or WhatsApp for high-grade industrial fasteners.",
    }
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
