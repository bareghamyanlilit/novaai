"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [
    { label: "Features", href: "/features" },
    { label: "AI Agents", href: "/agents" },
    { label: "Solutions", href: "/solutions" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="relative border-b border-[var(--border)] bg-white">
            <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 md:px-10">
                <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="text-xl font-bold tracking-tight text-[var(--text-primary)]"
                >
                    Nova<span className="text-[var(--primary)]">AI</span>
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                    >
                        Log in
                    </Link>

                    <Link
                        href="/register"
                        className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--primary)] px-5 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
                    >
                        Get Started
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <button
                    type="button"
                    aria-label={
                        mobileOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen((open) => !open)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-primary)] transition hover:bg-[var(--surface-secondary)] md:hidden"
                >
                    {mobileOpen ? (
                        <X size={21} />
                    ) : (
                        <Menu size={21} />
                    )}
                </button>
            </div>

            {mobileOpen && (
                <div className="border-t border-[var(--border)] bg-white md:hidden">
                    <nav className="mx-auto max-w-[1280px] px-5 py-5">
                        <div className="flex flex-col">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                    className="border-b border-[var(--border)] py-4 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-5 flex flex-col gap-3">
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="flex h-11 items-center justify-center rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-secondary)]"
                            >
                                Log in
                            </Link>

                            <Link
                                href="/register"
                                onClick={() => setMobileOpen(false)}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
                            >
                                Get Started
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}