"use client";

import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AgentCard } from "@/components/dashboard/AgentCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { agents } from "@/data/agents";
import type { AgentStatus } from "@/types/agent";

type FilterValue = "all" | AgentStatus;

export default function AgentsPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<FilterValue>("all");

    const filteredAgents = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return agents.filter((agent) => {
            const matchesSearch =
                normalizedSearch === "" ||
                agent.name.toLowerCase().includes(normalizedSearch) ||
                agent.description.toLowerCase().includes(normalizedSearch);

            const matchesStatus =
                status === "all" ||
                agent.status === status;

            return matchesSearch && matchesStatus;
        });
    }, [search, status]);

    return (
        <main className="min-h-screen bg-[var(--surface-secondary)]">
            <div className="mx-auto max-w-[1280px] px-5 py-8 lg:px-10">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                            AI Agents
                        </h1>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            Create and manage your AI agents.
                        </p>
                    </div>

                    <Link href="/dashboard/agents/new">
                        <Button>
                            <Plus size={18} />
                            Create Agent
                        </Button>
                    </Link>
                </div>

                <div className="mt-8 flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-4 sm:flex-row">
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                        />

                        <Input
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search agents..."
                            className="pl-10"
                            aria-label="Search agents"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={(event) =>
                            setStatus(
                                event.target.value as FilterValue,
                            )
                        }
                        aria-label="Filter agents by status"
                        className="h-12 rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                    >
                        <option value="all">
                            All agents
                        </option>

                        <option value="active">
                            Active
                        </option>

                        <option value="training">
                            Training
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>
                    </select>
                </div>

                <section className="mt-6">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-medium text-[var(--text-secondary)]">
                            {filteredAgents.length}{" "}
                            {filteredAgents.length === 1
                                ? "agent"
                                : "agents"}
                        </p>
                    </div>

                    {filteredAgents.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {filteredAgents.map((agent) => (
                                <AgentCard
                                    key={agent.id}
                                    agent={agent}
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
                                No agents found
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-secondary)]">
                                Try changing your search or selecting a
                                different status filter.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setStatus("all");
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