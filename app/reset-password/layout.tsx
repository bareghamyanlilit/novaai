import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset password",
    description: "Set a new password for your NovaLiAi account.",
};

export default function ResetPasswordLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}