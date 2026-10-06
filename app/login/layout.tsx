import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Log in",
    description: "Log in to your NovaLiAi workspace.",
};

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}