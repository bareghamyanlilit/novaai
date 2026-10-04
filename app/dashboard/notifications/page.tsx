"use client";

import {
    AlertCircle,
    Bell,
    Bot,
    Check,
    CheckCircle2,
    CreditCard,
    Search,
    Trash2,
    Users,
    Workflow,
} from "lucide-react";
import {
    useMemo,
    useState,
    useSyncExternalStore,
} from "react";

import { Card } from "@/components/ui/Card";
import {
    getNotificationServerSnapshot,
    getNotificationSnapshot,
    saveNotifications,
    subscribeToNotificationStore,
} from "@/lib/notificationStorage";
import type { Notification } from "@/types/notification";

type NotificationFilter =
    | "all"
    | "unread";

export default function NotificationsPage() {
    const notificationSnapshot =
        useSyncExternalStore(
            subscribeToNotificationStore,
            getNotificationSnapshot,
            getNotificationServerSnapshot,
        );

    const items = useMemo(() => {
        if (!notificationSnapshot) {
            return [];
        }

        try {
            return JSON.parse(
                notificationSnapshot,
            ) as Notification[];
        } catch {
            return [];
        }
    }, [notificationSnapshot]);

    const [filter, setFilter] =
        useState<NotificationFilter>("all");

    const [search, setSearch] = useState("");

    const unreadCount = items.filter(
        (item) => !item.read,
    ).length;

    const filteredNotifications =
        useMemo(() => {
            const query =
                search.trim().toLowerCase();

            return items.filter((item) => {
                const matchesSearch =
                    !query ||
                    item.title
                        .toLowerCase()
                        .includes(query) ||
                    item.message
                        .toLowerCase()
                        .includes(query);

                const matchesFilter =
                    filter === "all" ||
                    !item.read;

                return (
                    matchesSearch &&
                    matchesFilter
                );
            });
        }, [items, search, filter]);

    function updateNotifications(
        updated: Notification[],
    ) {
        saveNotifications(updated);
    }

    function markAsRead(
        notificationId: string,
    ) {
        updateNotifications(
            items.map((item) =>
                item.id === notificationId
                    ? {
                        ...item,
                        read: true,
                    }
                    : item,
            ),
        );
    }

    function markAllAsRead() {
        updateNotifications(
            items.map((item) => ({
                ...item,
                read: true,
            })),
        );
    }

    function deleteNotification(
        notificationId: string,
    ) {
        updateNotifications(
            items.filter(
                (item) =>
                    item.id !== notificationId,
            ),
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-[var(--primary)]">
                        Workspace
                    </p>

                    <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                        Notifications
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                        Stay updated with activity across
                        your NovaAI workspace.
                    </p>
                </div>

                {unreadCount > 0 && (
                    <button
                        type="button"
                        onClick={markAllAsRead}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-secondary)]"
                    >
                        <Check
                            size={16}
                        />
                        Mark all as read
                    </button>
                )}
            </div>

            {/* Summary */}
            <div className="grid gap-4 sm:grid-cols-3">
                <Card className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                            <Bell size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Total Notifications
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
                                {items.length}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <AlertCircle size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Unread
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
                                {unreadCount}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <CheckCircle2 size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Read
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
                                {items.length -
                                    unreadCount}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Notifications */}
            <Card className="overflow-hidden">
                <div className="border-b border-[var(--border)] p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                                Activity
                            </h2>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                {filteredNotifications.length}{" "}
                                notifications shown
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="relative">
                                <Search
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                                />

                                <input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Search notifications..."
                                    aria-label="Search notifications"
                                    className="h-10 w-full rounded-xl border border-[var(--border)] bg-white pl-10 pr-4 text-sm outline-none transition-colors focus:border-[var(--primary)] sm:w-64"
                                />
                            </div>

                            <select
                                value={filter}
                                onChange={(event) =>
                                    setFilter(
                                        event.target
                                            .value as NotificationFilter,
                                    )
                                }
                                className="h-10 rounded-xl border border-[var(--border)] bg-white px-3 text-sm outline-none focus:border-[var(--primary)]"
                            >
                                <option value="all">
                                    All
                                </option>

                                <option value="unread">
                                    Unread
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    {filteredNotifications.map(
                        (notification) => (
                            <NotificationRow
                                key={notification.id}
                                notification={
                                    notification
                                }
                                onRead={() =>
                                    markAsRead(
                                        notification.id,
                                    )
                                }
                                onDelete={() =>
                                    deleteNotification(
                                        notification.id,
                                    )
                                }
                            />
                        ),
                    )}
                </div>

                {filteredNotifications.length === 0 && (
                    <div className="px-6 py-16 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                            <Bell size={22} />
                        </div>

                        <p className="mt-4 text-sm font-medium text-[var(--text-primary)]">
                            {items.length === 0
                                ? "No notifications yet"
                                : "No notifications found"}
                        </p>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            {items.length === 0
                                ? "You&apos;re all caught up. New activity will appear here."
                                : "Try changing your search or filter."}
                        </p>

                        {items.length > 0 &&
                            (search || filter !== "all") && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch("");
                                        setFilter("all");
                                    }}
                                    className="mt-4 text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
                                >
                                    Clear filters
                                </button>
                            )}
                    </div>
                )}
            </Card>
        </div>
    );
}

interface NotificationRowProps {
    notification: Notification;
    onRead: () => void;
    onDelete: () => void;
}

function NotificationRow({
    notification,
    onRead,
    onDelete,
}: NotificationRowProps) {
    return (
        <div
            className={`flex gap-4 border-b border-[var(--border)] p-5 last:border-0 ${notification.read
                ? "bg-white"
                : "bg-[var(--primary-light)]/30"
                }`}
        >
            <NotificationIcon
                type={notification.type}
            />

            <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="truncate text-sm font-semibold text-[var(--text-primary)]">
                                {notification.title}
                            </h3>

                            {!notification.read && (
                                <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" />
                            )}
                        </div>

                        <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                            {notification.message}
                        </p>

                        <p className="mt-2 text-xs text-[var(--text-muted)]">
                            {notification.createdAt}
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                        {!notification.read && (
                            <button
                                type="button"
                                onClick={onRead}
                                className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-[var(--primary)] transition-colors hover:bg-[var(--primary-light)]"
                            >
                                <Check size={14} />
                                Mark read
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={onDelete}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-red-50 hover:text-[var(--danger)]"
                            aria-label="Delete notification"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NotificationIcon({
    type,
}: {
    type: Notification["type"];
}) {
    if (type === "agent") {
        return (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                <Bot size={19} />
            </div>
        );
    }

    if (type === "workflow") {
        return (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <Workflow size={19} />
            </div>
        );
    }

    if (type === "billing") {
        return (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <CreditCard size={19} />
            </div>
        );
    }

    if (type === "team") {
        return (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Users size={19} />
            </div>
        );
    }

    return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Bell size={19} />
        </div>
    );
}