import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot password",
    description: "Reset your NovaLiAi account password.",
};

export default function ForgotPasswordLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}