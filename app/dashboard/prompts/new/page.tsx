"use client";

import Link from "next/link";
import { ArrowLeft, Check, Save } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import type { PromptCategory } from "@/types/prompt";

const categories: PromptCategory[] = [
    "Marketing",
    "Sales",
    "Support",
    "Research",
    "Productivity",
];

export default function NewPromptPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] =
        useState<PromptCategory>("Marketing");
    const [content, setContent] = useState("");
    const [saved, setSaved] = useState(false);

    function handleSave() {
        if (!title.trim() || !content.trim()) {
            return;
        }

        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2500);
    }

    return (
        <main className="min-h-screen bg-[var(--surface-secondary)]">
            <div className="mx-auto max-w-[1000px] px-5 py-8 lg:px-10">
                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/prompts"
                        className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-white text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                        aria-label="Back to Prompt Library"
                    >
                        <ArrowLeft size={18} />
                    </Link>

                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                            Create Prompt
                        </h1>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            Create a reusable prompt for your AI workflows.
                        </p>
                    </div>
                </div>

                <div className="mt-8 space-y-6">
                    <Card>
                        <CardHeader>
                            <div>
                                <CardTitle>
                                    Prompt Information
                                </CardTitle>

                                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                    Add the basic information for your prompt.
                                </p>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-5">
                                <Input
                                    label="Prompt Name"
                                    placeholder="e.g. Marketing Copy Generator"
                                    value={title}
                                    onChange={(event) =>
                                        setTitle(event.target.value)
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
                                        placeholder="Describe what this prompt is used for..."
                                        rows={3}
                                        className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
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
                                        {categories.map((item) => (
                                            <option
                                                key={item}
                                                value={item}
                                            >
                                                {item}
                                            </option>
                                        ))}
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
                                    Write the instructions that your AI agent
                                    will use.
                                </p>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <textarea
                                value={content}
                                onChange={(event) =>
                                    setContent(event.target.value)
                                }
                                placeholder="Write your prompt here..."
                                rows={12}
                                className="w-full resize-y rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                            />

                            <div className="mt-3 flex items-center justify-between">
                                <p className="text-xs text-[var(--text-muted)]">
                                    {content.length} characters
                                </p>

                                <p className="text-xs text-[var(--text-muted)]">
                                    Keep your instructions clear and specific.
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
                            Prompt saved successfully.
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
                            Save Prompt
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}