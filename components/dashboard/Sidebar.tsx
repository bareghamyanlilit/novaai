"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    Bot,
    CreditCard,
    FileText,
    LayoutDashboard,
    MessageSquare,
    Settings,
    Users,
    Workflow,
    Database,
    Bell,
} from "lucide-react";

const navigation = [
    {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "AI Chat",
        href: "/dashboard/chat",
        icon: MessageSquare,
    },
    {
        label: "AI Agents",
        href: "/dashboard/agents",
        icon: Bot,
    },
    {
        label: "Prompt Library",
        href: "/dashboard/prompts",
        icon: FileText,
    },
    {
        label: "Knowledge Base",
        href: "/dashboard/knowledge",
        icon: Database,
    },
    {
        label: "Workflows",
        href: "/dashboard/workflows",
        icon: Workflow,
    },
    {
        label: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
    },
    {
        label: "Team",
        href: "/dashboard/team",
        icon: Users,
    },
    {
        label: "Billing",
        href: "/dashboard/billing",
        icon: CreditCard,
    },
];

const secondaryNavigation = [
    {
        label: "Notifications",
        href: "/dashboard/notifications",
        icon: Bell,
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden w-[280px] shrink-0 border-r border-[var(--border)] bg-white lg:flex lg:flex-col">
            {/* Logo */}
            <div className="flex h-20 items-center border-b border-[var(--border)] px-6">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)]">
                        <Bot
                            size={20}
                            className="text-white"
                        />
                    </div>

                    <span className="text-lg font-semibold text-[var(--text-primary)]">
                        NovaAI
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
                <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                    Workspace
                </p>

                <div className="space-y-1">
                    {navigation.map((item) => {
                        const Icon = item.icon;

                        const isActive =
                            pathname === item.href ||
                            pathname.startsWith(`${item.href}/`);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={[
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5",
                                    "text-sm font-medium transition-colors duration-150",
                                    isActive
                                        ? "bg-[var(--primary-light)] text-[var(--primary)]"
                                        : "text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]",
                                ].join(" ")}
                            >
                                <Icon size={19} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                <p className="mb-3 mt-8 px-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                    Account
                </p>

                <div className="space-y-1">
                    {secondaryNavigation.map((item) => {
                        const Icon = item.icon;

                        const isActive =
                            pathname === item.href ||
                            pathname.startsWith(`${item.href}/`);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={[
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5",
                                    "text-sm font-medium transition-colors duration-150",
                                    isActive
                                        ? "bg-[var(--primary-light)] text-[var(--primary)]"
                                        : "text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]",
                                ].join(" ")}
                            >
                                <Icon size={19} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* User */}
            <div className="border-t border-[var(--border)] p-4">
                <div className="flex items-center gap-3 rounded-lg p-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-light)] text-sm font-semibold text-[var(--primary)]">
                        LS
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                            Alex Johnson
                        </p>

                        <p className="truncate text-xs text-[var(--text-muted)]">
                            Admin
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}