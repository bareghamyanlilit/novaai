"use client";

import Link from "next/link";
import {
    ArrowUpRight,
    Bot,
    MoreHorizontal,
    Trash2,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Agent } from "@/types/agent";

interface AgentCardProps {
    agent: Agent;
    onDelete?: (agentId: string) => void;
}
const statusVariant = {
    active: "success",
    inactive: "default",
    training: "warning",
} as const;

const statusLabel = {
    active: "Active",
    inactive: "Inactive",
    training: "Training",
} as const;

export function AgentCard({
    agent,
    onDelete,
}: AgentCardProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleDelete = () => {
        if (!onDelete) {
            return;
        }

        const confirmed = window.confirm(
            `Delete "${agent.name}"? This action cannot be undone.`,
        );

        if (!confirmed) {
            return;
        }

        onDelete(agent.id);
        setMenuOpen(false);
    };

    return (
        <Card className="group transition-shadow duration-200 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
            <div className="relative flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-light)]">
                    <Bot
                        size={22}
                        className="text-[var(--primary)]"
                    />
                </div>

                <div className="relative">
                    <button
                        type="button"
                        aria-label={`More options for ${agent.name}`}
                        aria-expanded={menuOpen}
                        onClick={() =>
                            setMenuOpen((current) => !current)
                        }
                        className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                    >
                        <MoreHorizontal size={20} />
                    </button>

                    {menuOpen && onDelete && (
                        <div className="absolute right-0 top-11 z-20 min-w-[160px] rounded-[var(--radius-md)] border border-[var(--border)] bg-white p-1.5 shadow-lg">
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                            >
                                <Trash2 size={16} />
                                Delete agent
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-5">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[var(--text-primary)]">
                        {agent.name}
                    </h3>

                    <Badge variant={statusVariant[agent.status]}>
                        {statusLabel[agent.status]}
                    </Badge>
                </div>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {agent.description}
                </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--border)] pt-5">
                <div>
                    <p className="text-xs text-[var(--text-muted)]">
                        Tasks
                    </p>

                    <p className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
                        {agent.tasks.toLocaleString("en-US")}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-[var(--text-muted)]">
                        Success rate
                    </p>

                    <p className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
                        {agent.successRate}%
                    </p>
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">
                    {agent.model}
                </span>

                <Link
                    href={`/dashboard/agents/${agent.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
                >
                    View agent
                    <ArrowUpRight size={16} />
                </Link>
            </div>
        </Card>
    );
}