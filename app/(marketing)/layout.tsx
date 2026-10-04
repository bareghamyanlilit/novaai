import type { ReactNode } from "react";

import { Footer } from "@/components/marketing/Footer";
import { Navbar } from "@/components/marketing/Navbar";

interface MarketingLayoutProps {
    children: ReactNode;
}

export default function MarketingLayout({
    children,
}: MarketingLayoutProps) {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main>{children}</main>

            <Footer />
        </div>
    );
}