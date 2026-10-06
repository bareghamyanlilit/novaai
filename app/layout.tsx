import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "NovaLiAi — AI Agents & Automation Workspace",
        template: "%s | NovaLiAi",
    },

    description:
        "A modern AI agents and automation workspace template for teams building AI-powered products.",

    keywords: [
        "AI",
        "AI SaaS",
        "AI Agent",
        "Automation",
        "Next.js",
        "Dashboard",
        "Template",
        "Workflow",
    ],

    authors: [
        {
            name: "NovaLiAi",
        },
    ],

    openGraph: {
        title: "NovaLiAi — AI Agents & Automation Workspace",
        description:
            "A modern AI agents and automation workspace template for teams building AI-powered products.",
        type: "website",
        images: ["/og-image.png"],
    },

    twitter: {
        card: "summary_large_image",
        title: "NovaLiAi — AI Agents & Automation Workspace",
        description:
            "A modern AI agents and automation workspace template for teams building AI-powered products.",
        images: ["/og-image.png"],
    },
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.variable}>{children}</body>
        </html>
    );
}