"use client";

import Link from "next/link";
import { ArrowLeft, Check, Copy, Save } from "lucide-react";
import { use, useState } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { prompts } from "@/data/prompts";
import type { PromptCategory } from "@/types/prompt";

interface PromptDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const categories: PromptCategory[] = [
    "Marketing",
    "Sales",
    "Support",
    "Research",
    "Productivity",
];

export default function PromptDetailsPage({
    params,
}: PromptDetailsPageProps) {
    const { id } = use(params);

    const prompt = prompts.find(
        (item) => item.id === id,
    );

    const [title, setTitle] = useState(
        prompt?.title ?? "",
    );

    const [description, setDescription] = useState(
        prompt?.description ?? "",
    );

    const [category, setCategory] =
        useState<PromptCategory>(
            prompt?.category ?? "Marketing",
        );

    const [content, setContent] = useState(
        prompt?.content ?? "",
    );

    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);

    if (!prompt) {
        return (
            <main className="min-h-screen bg-[var(--surface-secondary)]">
                <div className="mx-auto max-w-[1000px] px-5 py-16 text-center lg:px-10">
                    <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
                        Prompt not found
                    </h1>

                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        The prompt you are looking for does not exist.
                    </p>

                    <Link
                        href="/dashboard/prompts"
                        className="mt-6 inline-flex"
                    >
                        <Button>
                            <ArrowLeft size={18} />
                            Back to Prompts
                        </Button>
                    </Link>
                </div>
            </main>
        );
    }

    async function handleCopy() {
        await navigator.clipboard.writeText(content);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    }

    function handleSave() {
        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2500);
    }

    return (
        <main className="min-h-screen bg-[var(--surface-secondary)]">
            <div className="mx-auto max-w-[1000px] px-5 py-8 lg:px-10">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard/prompts"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-white text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                            aria-label="Back to Prompt Library"
                        >
                            <ArrowLeft size={18} />
                        </Link>

                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                                    {prompt.title}
                                </h1>

                                <Badge variant="info">
                                    {prompt.category}
                                </Badge>
                            </div>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Edit and manage this reusable prompt.
                            </p>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={handleCopy}
                    >
                        {copied ? (
                            <>
                                <Check size={18} />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy size={18} />
                                Copy Prompt
                            </>
                        )}
                    </Button>
                </div>

                <div className="mt-8 space-y-6">
                    <Card>
                        <CardHeader>
                            <div>
                                <CardTitle>
                                    Prompt Information
                                </CardTitle>

                                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                    Update the prompt metadata.
                                </p>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-5">
                                <Input
                                    label="Prompt Name"
                                    value={title}
                                    onChange={(event) =>
                                        setTitle(
                                            event.target.value,
                                        )
                                    }
                                />

                                <div>
                                    <label
                                        htmlFor="description"
                                        className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                    >
                                        Description
                                    </label>

                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(event) =>
                                            setDescription(
                                                event.target.value,
                                            )
                                        }
                                        rows={3}
                                        className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all duration-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="category"
                                        className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                    >
                                        Category
                                    </label>

                                    <select
                                        id="category"
                                        value={category}
                                        onChange={(event) =>
                                            setCategory(
                                                event.target.value as PromptCategory,
                                            )
                                        }
                                        className="h-12 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                                    >
                                        {categories.map(
                                            (item) => (
                                                <option
                                                    key={item}
                                                    value={item}
                                                >
                                                    {item}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div>
                                <CardTitle>
                                    Prompt Content
                                </CardTitle>

                                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                    Edit the instructions used by your AI
                                    agents.
                                </p>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <textarea
                                value={content}
                                onChange={(event) =>
                                    setContent(
                                        event.target.value,
                                    )
                                }
                                rows={14}
                                className="w-full resize-y rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none transition-all duration-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                            />

                            <div className="mt-3 flex justify-between">
                                <p className="text-xs text-[var(--text-muted)]">
                                    {content.length} characters
                                </p>

                                <p className="text-xs text-[var(--text-muted)]">
                                    Used{" "}
                                    {prompt.usageCount.toLocaleString(
                                        "en-US",
                                    )}{" "}
                                    times
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {saved && (
                        <div
                            role="status"
                            className="flex items-center gap-3 rounded-[var(--radius-md)] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                        >
                            <Check size={18} />
                            Changes saved successfully.
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link href="/dashboard/prompts">
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto"
                            >
                                Cancel
                            </Button>
                        </Link>

                        <Button
                            onClick={handleSave}
                            disabled={
                                !title.trim() ||
                                !content.trim()
                            }
                            className="w-full sm:w-auto"
                        >
                            <Save size={18} />
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}