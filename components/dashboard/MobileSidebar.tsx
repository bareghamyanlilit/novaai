"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    Bell,
    Bot,
    CreditCard,
    Database,
    FileText,
    LayoutDashboard,
    MessageSquare,
    Settings,
    Users,
    Workflow,
    X,
} from "lucide-react";
import {
    getSettingsServerSnapshot,
    getSettingsSnapshot,
    subscribeToSettingsStore,
} from "@/lib/settingsStorage";

import { defaultSettings } from "@/data/settings";
import type { UserSettings } from "@/types/settings";
import { useSyncExternalStore } from "react";
interface MobileSidebarProps {
    open: boolean;
    onClose: () => void;
}

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

export function MobileSidebar({
    open,
    onClose,
}: MobileSidebarProps) {
    const pathname = usePathname();
    const settingsSnapshot = useSyncExternalStore(
        subscribeToSettingsStore,
        getSettingsSnapshot,
        getSettingsServerSnapshot,
    );

    const settings = settingsSnapshot
        ? (JSON.parse(settingsSnapshot) as UserSettings)
        : defaultSettings;

    const initials = settings.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Overlay */}
            <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="absolute inset-0 bg-black/30"
            />

            {/* Drawer */}
            <aside className="relative flex h-full w-[280px] flex-col bg-white shadow-xl">
                <div className="flex h-20 items-center justify-between border-b border-[var(--border)] px-6">
                    <Link
                        href="/dashboard"
                        onClick={onClose}
                        className="flex items-center gap-2"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)]">
                            <Bot
                                size={20}
                                className="text-white"
                            />
                        </div>

                        <span className="text-lg font-semibold text-[var(--text-primary)]">
                            NovaLiAi
                        </span>
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]"
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                </div>

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
                                    onClick={onClose}
                                    className={[
                                        "flex items-center gap-3 rounded-lg px-3 py-2.5",
                                        "text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-[var(--primary-light)] text-[var(--primary)]"
                                            : "text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]",
                                    ].join(" ")}
                                >
                                    <Icon size={19} />
                                    {item.label}
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
                                    onClick={onClose}
                                    className={[
                                        "flex items-center gap-3 rounded-lg px-3 py-2.5",
                                        "text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-[var(--primary-light)] text-[var(--primary)]"
                                            : "text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]",
                                    ].join(" ")}
                                >
                                    <Icon size={19} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                <div className="border-t border-[var(--border)] p-4">
                    <div className="flex items-center gap-3 rounded-lg p-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-light)] text-sm font-semibold text-[var(--primary)]">
                            {initials}
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                                {settings.name}
                            </p>

                            <p className="truncate text-xs text-[var(--text-muted)]">
                                Admin
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}