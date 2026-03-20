import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | CFC Fasteners",
    description: "Get in touch with CFC Fasteners for bulk quotations, technical inquiries, and industrial manufacturing support. We serve global clients from our Ludhiana facility.",
    openGraph: {
        title: "Contact CFC Fasteners - Sales & Support",
        description: "Reach out via email, phone, or WhatsApp for high-grade industrial fasteners.",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
