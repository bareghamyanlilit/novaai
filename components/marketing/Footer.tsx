import Link from "next/link";

const footerColumns = [
    {
        title: "Product",
        links: [
            { label: "Features", href: "/features" },
            { label: "AI Agents", href: "/agents" },
            { label: "Solutions", href: "/solutions" },
            { label: "Pricing", href: "/pricing" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Blog", href: "/blog" },
            { label: "FAQ", href: "/faq" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Login", href: "/login" },
            { label: "Get Started", href: "/register" },
        ],
    },
];

export function Footer() {
    return (
        <footer className="border-t border-[var(--border)] bg-white">
            <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-10">
                <div className="grid gap-12 md:grid-cols-[1.5fr_2fr]">
                    <div>
                        <Link
                            href="/"
                            className="text-xl font-bold tracking-tight text-[var(--text-primary)]"
                        >
                            Nova
                            <span className="text-[var(--primary)]">
                                AI
                            </span>
                        </Link>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
                            A modern AI agents and automation workspace
                            template for teams building the future with AI.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                        {footerColumns.map((column) => (
                            <div key={column.title}>
                                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                                    {column.title}
                                </h3>

                                <ul className="mt-4 space-y-3">
                                    {column.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} NovaLiAi. All rights
                        reserved.
                    </p>

                    <div className="flex gap-5">
                        <Link
                            href="/privacy"
                            className="transition hover:text-[var(--text-primary)]"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/terms"
                            className="transition hover:text-[var(--text-primary)]"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}