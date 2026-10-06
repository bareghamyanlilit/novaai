import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://novaliai.vercel.app"),

    title: {
        default: "NovaLiAi — AI Agents & Automation Workspace",
        template: "%s | NovaLiAi",
    },

    description:
        "A modern AI agents and automation workspace template for teams building AI-powered products.",

    keywords: [
        "AI",
        "AI SaaS",
        "AI Agents",
        "AI Automation",
        "Next.js",
        "Dashboard",
        "SaaS Template",
        "Workflow",
        "AI Workspace",
    ],

    authors: [
        {
            name: "NovaLiAi",
        },
    ],

    creator: "NovaLiAi",
    publisher: "NovaLiAi",

    alternates: {
        canonical: "/",
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "NovaLiAi — AI Agents & Automation Workspace",
        description:
            "A modern AI agents and automation workspace template for teams building AI-powered products.",
        url: "https://novaliai.vercel.app",
        siteName: "NovaLiAi",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "NovaLiAi — AI Agents & Automation Workspace",
            },
        ],
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
            <body className={inter.variable}>
                {children}
            </body>
        </html>
    );
}