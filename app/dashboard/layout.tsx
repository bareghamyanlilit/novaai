"use client";

import { useState, type ReactNode } from "react";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import { Sidebar } from "@/components/dashboard/Sidebar";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const [mobileSidebarOpen, setMobileSidebarOpen] =
        useState(false);

    return (
        <div className="flex min-h-screen bg-[var(--surface-secondary)]">
            <Sidebar />

            <MobileSidebar
                open={mobileSidebarOpen}
                onClose={() => setMobileSidebarOpen(false)}
            />

            <div className="flex min-w-0 flex-1 flex-col">
                <DashboardHeader
                    onMenuClick={() =>
                        setMobileSidebarOpen(true)
                    }
                />

                <main className="min-w-0 flex-1">
                    <div className="mx-auto w-full max-w-[1440px] px-5 py-6 md:px-8 md:py-8 xl:px-10 xl:py-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}