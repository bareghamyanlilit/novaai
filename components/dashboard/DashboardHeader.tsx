"use client";

import {
    Bell,
    ChevronDown,
    LogOut,
    Menu,
    Search,
    Settings,
    User,
} from "lucide-react";
import Link from "next/link";
import {
    useEffect,
    useRef,
    useState,
    useSyncExternalStore,
} from "react";

import { getSavedNotifications } from "@/lib/notificationStorage";
import {
    getSettingsServerSnapshot,
    getSettingsSnapshot,
    subscribeToSettingsStore,
} from "@/lib/settingsStorage";

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

export function DashboardHeader({
    onMenuClick,
}: DashboardHeaderProps) {
    const settingsSnapshot =
        useSyncExternalStore(
            subscribeToSettingsStore,
            getSettingsSnapshot,
            getSettingsServerSnapshot,
        );

    const settings = settingsSnapshot
        ? JSON.parse(settingsSnapshot)
        : {
            name: "Alex Morgan",
            email: "novaaiproject@gmail.com",
        };

    const initials = settings.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part: string) => part[0])
        .join("")
        .toUpperCase();

    const [unreadNotifications, setUnreadNotifications] =
        useState(0);

    const [profileOpen, setProfileOpen] =
        useState(false);

    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function updateUnreadCount() {
            const notifications =
                getSavedNotifications();

            setUnreadNotifications(
                notifications?.filter(
                    (notification) =>
                        !notification.read,
                ).length ?? 0,
            );
        }

        updateUnreadCount();

        window.addEventListener(
            "storage",
            updateUnreadCount,
        );

        return () => {
            window.removeEventListener(
                "storage",
                updateUnreadCount,
            );
        };
    }, []);

    useEffect(() => {
        function handleClickOutside(
            event: MouseEvent,
        ) {
            if (
                profileRef.current &&
                !profileRef.current.contains(
                    event.target as Node,
                )
            ) {
                setProfileOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside,
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside,
            );
        };
    }, []);

    function handleLogout() {
        setProfileOpen(false);

        // Demo action.
        // Connect your authentication logic here.
        console.log("Logout clicked");
    }

    return (
        <header className="flex h-20 items-center justify-between border-b border-[var(--border)] bg-white px-5 lg:px-8">
            <button
                type="button"
                onClick={onMenuClick}
                className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] lg:hidden"
                aria-label="Open menu"
            >
                <Menu size={22} />
            </button>

            <div className="relative hidden w-full max-w-md md:block">
                <Search
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />

                <input
                    type="search"
                    placeholder="Search..."
                    className="h-10 w-full rounded-lg border border-transparent bg-[var(--surface-secondary)] pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--border-strong)] focus:bg-white"
                />
            </div>

            <div className="ml-auto flex items-center gap-2">
                <Link
                    href="/dashboard/notifications"
                    className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-secondary)]"
                    aria-label="Notifications"
                >
                    <Bell size={19} />

                    {unreadNotifications > 0 && (
                        <span className="absolute right-1 top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-[var(--danger)] px-1 text-[9px] font-semibold text-white">
                            {unreadNotifications > 9
                                ? "9+"
                                : unreadNotifications}
                        </span>
                    )}
                </Link>

                <div
                    ref={profileRef}
                    className="relative"
                >
                    <button
                        type="button"
                        onClick={() =>
                            setProfileOpen(
                                (open) => !open,
                            )
                        }
                        className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-[var(--surface-secondary)]"
                        aria-expanded={profileOpen}
                        aria-haspopup="menu"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-white">
                            {initials}
                        </div>

                        <div className="hidden text-left xl:block">
                            <p className="text-sm font-medium text-[var(--text-primary)]">
                                {settings.name}
                            </p>

                            <p className="text-xs text-[var(--text-muted)]">
                                {settings.email}
                            </p>
                        </div>

                        <ChevronDown
                            size={16}
                            className={`hidden text-[var(--text-muted)] transition-transform xl:block ${profileOpen
                                ? "rotate-180"
                                : ""
                                }`}
                        />
                    </button>

                    {profileOpen && (
                        <div
                            role="menu"
                            className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                        >
                            <div className="border-b border-[var(--border)] p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-white">
                                        {initials}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                                            {settings.name}
                                        </p>

                                        <p className="truncate text-xs text-[var(--text-muted)]">
                                            {settings.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-2">
                                <Link
                                    href="/dashboard/settings"
                                    onClick={() =>
                                        setProfileOpen(
                                            false,
                                        )
                                    }
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                                    role="menuitem"
                                >
                                    <User size={17} />
                                    Profile
                                </Link>

                                <Link
                                    href="/dashboard/settings"
                                    onClick={() =>
                                        setProfileOpen(
                                            false,
                                        )
                                    }
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                                    role="menuitem"
                                >
                                    <Settings
                                        size={17}
                                    />
                                    Settings
                                </Link>
                            </div>

                            <div className="border-t border-[var(--border)] p-2">
                                <button
                                    type="button"
                                    onClick={
                                        handleLogout
                                    }
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--danger)] transition-colors hover:bg-red-50"
                                    role="menuitem"
                                >
                                    <LogOut size={17} />
                                    Log out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}