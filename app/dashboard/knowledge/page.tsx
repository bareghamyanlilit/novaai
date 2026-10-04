"use client";

import {
    AlertCircle,
    CheckCircle2,
    FileText,
    Globe,
    HelpCircle,
    Plus,
    Search,
} from "lucide-react";
import {
    useMemo,
    useState,
    useSyncExternalStore,
} from "react";

import { AddSourceModal } from "@/components/dashboard/AddSourceModal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
    getKnowledgeServerSnapshot,
    getKnowledgeSnapshot,
    saveKnowledgeSources,
    subscribeToKnowledgeStore,
} from "@/lib/knowledgeStorage";
import { SourceActions } from "@/components/dashboard/SourceActions";

import type {
    KnowledgeSource,
    KnowledgeSourceStatus,
    KnowledgeSourceType,
} from "@/types/knowledge";

type SourceFilter = "all" | KnowledgeSourceType;

const filters: {
    value: SourceFilter;
    label: string;
}[] = [
        { value: "all", label: "All sources" },
        { value: "document", label: "Documents" },
        { value: "website", label: "Websites" },
        { value: "faq", label: "FAQs" },
    ];

const typeLabels: Record<KnowledgeSourceType, string> = {
    document: "Document",
    website: "Website",
    faq: "FAQ",
};

const statusLabels: Record<KnowledgeSourceStatus, string> = {
    ready: "Ready",
    processing: "Processing",
    failed: "Failed",
};

function SourceIcon({
    type,
}: {
    type: KnowledgeSourceType;
}) {
    if (type === "website") {
        return <Globe size={19} />;
    }

    if (type === "faq") {
        return <HelpCircle size={19} />;
    }

    return <FileText size={19} />;
}

function StatusBadge({
    status,
}: {
    status: KnowledgeSourceStatus;
}) {
    const styles = {
        ready: "bg-green-50 text-green-700",
        processing: "bg-amber-50 text-amber-700",
        failed: "bg-red-50 text-red-700",
    };

    const icons = {
        ready: <CheckCircle2 size={14} />,
        processing: <AlertCircle size={14} />,
        failed: <AlertCircle size={14} />,
    };

    return (
        <span
            className={[
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
                "text-xs font-medium",
                styles[status],
            ].join(" ")}
        >
            {icons[status]}
            {statusLabels[status]}
        </span>
    );
}

function getSourceName(
    type: KnowledgeSourceType,
    fileName: string,
    url: string,
) {
    if (type === "document") {
        return fileName || "New Document";
    }

    if (type === "website") {
        return url || "New Website";
    }

    return "FAQ Knowledge Base";
}

export default function KnowledgePage() {
    const knowledgeSnapshot =
        useSyncExternalStore(
            subscribeToKnowledgeStore,
            getKnowledgeSnapshot,
            getKnowledgeServerSnapshot,
        );

    const sources = useMemo(() => {
        if (!knowledgeSnapshot) {
            return [];
        }

        try {
            return JSON.parse(
                knowledgeSnapshot,
            ) as KnowledgeSource[];
        } catch {
            return [];
        }
    }, [knowledgeSnapshot]);

    const [search, setSearch] = useState("");

    const [filter, setFilter] =
        useState<SourceFilter>("all");

    const [addSourceOpen, setAddSourceOpen] =
        useState(false);

    function saveSources(
        nextSources: KnowledgeSource[],
    ) {
        saveKnowledgeSources(nextSources);
    }

    function handleSourceAdded({
        type,
        fileName,
        url,
        faqText,
    }: {
        type: KnowledgeSourceType;
        fileName?: string;
        url?: string;
        faqText?: string;
    }) {
        const source: KnowledgeSource = {
            id: `${type}-${Date.now()}`,
            name: getSourceName(
                type,
                fileName ?? "",
                url ?? "",
            ),
            type,
            status: "ready",
            size:
                type === "document"
                    ? "1.2 MB"
                    : type === "website"
                        ? "856 KB"
                        : "128 KB",
            items:
                type === "faq"
                    ? Math.max(
                        1,
                        faqText
                            ?.split("\n")
                            .filter(Boolean)
                            .length ?? 1,
                    )
                    : type === "website"
                        ? 38
                        : 72,
            updatedAt: "Just now",
        };

        saveSources([source, ...sources]);
        setAddSourceOpen(false);
    }

    function handleDelete(id: string) {
        const nextSources = sources.filter(
            (source) => source.id !== id,
        );

        saveSources(nextSources);
    }

    const filteredSources = useMemo(() => {
        const normalizedSearch = search
            .trim()
            .toLowerCase();

        return sources.filter((source) => {
            const matchesSearch =
                normalizedSearch === "" ||
                source.name
                    .toLowerCase()
                    .includes(normalizedSearch);

            const matchesFilter =
                filter === "all" ||
                source.type === filter;

            return matchesSearch && matchesFilter;
        });
    }, [sources, search, filter]);

    return (
        <main className="min-h-screen bg-[var(--surface-secondary)]">
            <div className="mx-auto max-w-[1280px] px-5 py-8 lg:px-10">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                            Knowledge Base
                        </h1>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            Manage the information your AI agents can use.
                        </p>
                    </div>

                    <Button
                        onClick={() =>
                            setAddSourceOpen(true)
                        }
                    >
                        <Plus size={18} />
                        Add Source
                    </Button>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-3">
                    <Card
                        padding="md"
                        className="md:col-span-2"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[var(--text-secondary)]">
                                    Storage Used
                                </p>

                                <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
                                    7.3 GB
                                </p>
                            </div>

                            <span className="text-sm text-[var(--text-muted)]">
                                10 GB
                            </span>
                        </div>

                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-[var(--primary)]"
                                style={{
                                    width: "73%",
                                }}
                            />
                        </div>

                        <p className="mt-3 text-xs text-[var(--text-muted)]">
                            2.7 GB remaining
                        </p>
                    </Card>

                    <Card padding="md">
                        <p className="text-sm font-medium text-[var(--text-secondary)]">
                            Total Sources
                        </p>

                        <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
                            {sources.length}
                        </p>

                        <p className="mt-2 text-xs text-[var(--text-muted)]">
                            Across all source types
                        </p>
                    </Card>
                </div>

                <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-4">
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <Search
                                size={18}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                            />

                            <Input
                                value={search}
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value,
                                    )
                                }
                                placeholder="Search sources..."
                                aria-label="Search knowledge sources"
                                className="pl-10"
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {filters.map((item) => {
                                const active =
                                    filter === item.value;

                                return (
                                    <button
                                        key={item.value}
                                        type="button"
                                        onClick={() =>
                                            setFilter(
                                                item.value,
                                            )
                                        }
                                        aria-pressed={active}
                                        className={[
                                            "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                                            active
                                                ? "bg-[var(--primary)] text-white"
                                                : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:bg-slate-100 hover:text-[var(--text-primary)]",
                                        ].join(" ")}
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <Card
                    padding="none"
                    className="mt-6 overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] text-left">
                            <thead>
                                <tr className="border-b border-[var(--border)] bg-[var(--surface-secondary)]">
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                                        Source
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                                        Type
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                                        Size
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                                        Items
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                                        Updated
                                    </th>

                                    <th className="w-12 px-4 py-4" />
                                </tr>
                            </thead>

                            <tbody>
                                {filteredSources.map(
                                    (source) => (
                                        <tr
                                            key={source.id}
                                            className="border-b border-[var(--border)] last:border-0 hover:bg-slate-50"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-light)] text-[var(--primary)]">
                                                        <SourceIcon
                                                            type={
                                                                source.type
                                                            }
                                                        />
                                                    </div>

                                                    <p className="max-w-[280px] truncate text-sm font-medium text-[var(--text-primary)]">
                                                        {source.name}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                                                {
                                                    typeLabels[
                                                    source
                                                        .type
                                                    ]
                                                }
                                            </td>

                                            <td className="px-6 py-4">
                                                <StatusBadge
                                                    status={
                                                        source.status
                                                    }
                                                />
                                            </td>

                                            <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                                                {source.size}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                                                {source.items.toLocaleString(
                                                    "en-US",
                                                )}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-[var(--text-muted)]">
                                                {
                                                    source.updatedAt
                                                }
                                            </td>

                                            <td className="px-4 py-4">
                                                <SourceActions
                                                    sourceName={source.name}
                                                    onDelete={() =>
                                                        handleDelete(source.id)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                    </div>

                    {filteredSources.length === 0 && (
                        <div className="px-6 py-16 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-light)]">
                                <Search
                                    size={21}
                                    className="text-[var(--primary)]"
                                />
                            </div>

                            {sources.length === 0 ? (
                                <>
                                    <h2 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
                                        No knowledge sources yet
                                    </h2>

                                    <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-secondary)]">
                                        Add documents, websites, or FAQs to give
                                        your AI agents more context.
                                    </p>

                                    <Button
                                        type="button"
                                        onClick={() =>
                                            setAddSourceOpen(true)
                                        }
                                        className="mt-5"
                                    >
                                        <Plus size={17} />
                                        Add Source
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <h2 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
                                        No sources found
                                    </h2>

                                    <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-secondary)]">
                                        Try changing your search or filter.
                                    </p>

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
                                </>
                            )}
                        </div>
                    )}
                </Card>
            </div>

            <AddSourceModal
                open={addSourceOpen}
                onClose={() =>
                    setAddSourceOpen(false)
                }
                onAdd={handleSourceAdded}
            />
        </main>
    );
}