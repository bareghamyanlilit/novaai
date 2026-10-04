import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ",
    description:
        "Find answers about NovaAI, customization, integrations, authentication, billing, and template usage.",
};

export default function FAQLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}