"use client";

import {
    Check,
    Copy,
    MoreHorizontal,
    Pencil,
    Star,
    Trash2,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Prompt } from "@/types/prompt";
import Link from "next/link";

interface PromptCardProps {
    prompt: Prompt;
    onDelete: (promptId: string) => void;
}
const categoryVariant = {
    Marketing: "info",
    Sales: "success",
    Support: "warning",
    Research: "default",
    Productivity: "default",
} as const;

export function PromptCard({
    prompt,
    onDelete,
}: PromptCardProps) {
    const [copied, setCopied] = useState(false);
    const [favorite, setFavorite] = useState(prompt.favorite);
    const [menuOpen, setMenuOpen] = useState(false);

    async function handleCopy() {
        await navigator.clipboard.writeText(prompt.content);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    }

    function handleDelete() {
        const confirmed = window.confirm(
            `Delete "${prompt.title}"? This action cannot be undone.`,
        );

        if (!confirmed) {
            return;
        }

        onDelete(prompt.id);
        setMenuOpen(false);
    }
    return (
        <Card className="group transition-shadow duration-200 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
            <div className="flex items-start justify-between gap-4">
                <Badge variant={categoryVariant[prompt.category]}>
                    {prompt.category}
                </Badge>

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        aria-label={
                            favorite
                                ? `Remove ${prompt.title} from favorites`
                                : `Add ${prompt.title} to favorites`
                        }
                        onClick={() =>
                            setFavorite((value) => !value)
                        }
                        className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-secondary)]"
                    >
                        <Star
                            size={18}
                            fill={
                                favorite
                                    ? "currentColor"
                                    : "none"
                            }
                            className={
                                favorite
                                    ? "text-amber-500"
                                    : undefined
                            }
                        />
                    </button>

                    <div className="relative">
                        <button
                            type="button"
                            aria-label={`More options for ${prompt.title}`}
                            aria-expanded={menuOpen}
                            onClick={() =>
                                setMenuOpen((value) => !value)
                            }
                            className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                        >
                            <MoreHorizontal size={18} />
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 top-11 z-30 min-w-[170px] rounded-[var(--radius-md)] border border-[var(--border)] bg-white p-1.5 shadow-lg">
                                <Link
                                    href={`/dashboard/prompts/${prompt.id}`}
                                    onClick={() =>
                                        setMenuOpen(false)
                                    }
                                    className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
                                >
                                    <Pencil size={16} />
                                    Edit prompt
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            prompt.content,
                                        );
                                        setMenuOpen(false);
                                    }}
                                    className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
                                >
                                    <Copy size={16} />
                                    Duplicate
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                                >
                                    <Trash2 size={16} />
                                    Delete prompt
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h3 className="font-semibold text-[var(--text-primary)]">
                    {prompt.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {prompt.description}
                </p>
            </div>

            <div className="mt-5 rounded-[var(--radius-md)] bg-[var(--surface-secondary)] p-4">
                <p className="line-clamp-3 text-sm leading-6 text-[var(--text-secondary)]">
                    {prompt.content}
                </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-5">
                <div>
                    <p className="text-xs text-[var(--text-muted)]">
                        Used
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                        {prompt.usageCount.toLocaleString("en-US")} times
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href={`/dashboard/prompts/${prompt.id}`}
                        className="inline-flex h-9 items-center rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
                    >
                        View
                    </Link>

                    <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex h-9 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--primary-light)] px-3 text-sm font-medium text-[var(--primary)] transition-colors hover:bg-[#e0e7ff]"
                    >
                        {copied ? (
                            <>
                                <Check size={16} />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy size={16} />
                                Copy
                            </>
                        )}
                    </button>
                </div>
            </div>

            <p className="mt-3 text-xs text-[var(--text-muted)]">
                Updated {prompt.updatedAt}
            </p>
        </Card>
    );
}