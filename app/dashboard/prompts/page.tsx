"use client";

import {
    Plus,
    Search,
    Sparkles,
} from "lucide-react";
import {
    useEffect,
    useMemo,
    useState,
} from "react";

import { PromptCard } from "@/components/dashboard/PromptCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { prompts as defaultPrompts } from "@/data/prompts";
import {
    deletePrompt,
    getStoredPrompts,
} from "@/lib/promptStorage";
import type { PromptCategory } from "@/types/prompt";
import Link from "next/link";

type CategoryFilter = "all" | PromptCategory;

const categories: CategoryFilter[] = [
    "all",
    "Marketing",
    "Sales",
    "Support",
    "Research",
    "Productivity",
];

export default function PromptsPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] =
        useState<CategoryFilter>("all");

    const [promptList, setPromptList] =
        useState(defaultPrompts);

    // Load saved prompts from localStorage after hydration.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPromptList(getStoredPrompts(defaultPrompts));
    }, []);

    const filteredPrompts = useMemo(() => {
        const normalizedSearch =
            search.trim().toLowerCase();

        return promptList.filter((prompt) => {
            const matchesSearch =
                normalizedSearch === "" ||
                prompt.title
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                prompt.description
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                prompt.content
                    .toLowerCase()
                    .includes(normalizedSearch);

            const matchesCategory =
                category === "all" ||
                prompt.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [search, category, promptList]);

    function handleDeletePrompt(promptId: string) {
        deletePrompt(promptId);

        window.location.reload();
    }

    return (
        <main className="min-h-screen bg-[var(--surface-secondary)]">
            <div className="mx-auto max-w-[1280px] px-5 py-8 lg:px-10">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Sparkles
                                size={22}
                                className="text-[var(--primary)]"
                            />

                            <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                                Prompt Library
                            </h1>
                        </div>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            Create, organize, and reuse your best AI prompts.
                        </p>
                    </div>

                    <Link href="/dashboard/prompts/new">
                        <Button>
                            <Plus size={18} />
                            New Prompt
                        </Button>
                    </Link>
                </div>

                <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-4">
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <Search
                                size={18}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                            />

                            <Input
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search prompts..."
                                aria-label="Search prompts"
                                className="pl-10"
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {categories.map((item) => {
                                const active =
                                    category === item;

                                return (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() =>
                                            setCategory(item)
                                        }
                                        aria-pressed={active}
                                        className={[
                                            "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                                            active
                                                ? "bg-[var(--primary)] text-white"
                                                : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:bg-slate-100 hover:text-[var(--text-primary)]",
                                        ].join(" ")}
                                    >
                                        {item === "all"
                                            ? "All prompts"
                                            : item}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <section className="mt-6">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-medium text-[var(--text-secondary)]">
                            {filteredPrompts.length}{" "}
                            {filteredPrompts.length === 1
                                ? "prompt"
                                : "prompts"}
                        </p>
                    </div>

                    {filteredPrompts.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {filteredPrompts.map((prompt) => (
                                <PromptCard
                                    key={prompt.id}
                                    prompt={prompt}
                                    onDelete={handleDeletePrompt}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--border-strong)] bg-white px-6 py-16 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-light)]">
                                <Search
                                    size={21}
                                    className="text-[var(--primary)]"
                                />
                            </div>

                            <h2 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
                                No prompts found
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-secondary)]">
                                Try changing your search or selecting a
                                different category.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setCategory("all");
                                }}
                                className="mt-5 text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}