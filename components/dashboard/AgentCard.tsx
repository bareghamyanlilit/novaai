import Link from "next/link";
import { ArrowUpRight, Bot, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Agent } from "@/types/agent";

interface AgentCardProps {
    agent: Agent;
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

export function AgentCard({ agent }: AgentCardProps) {
    return (
        <Card className="group transition-shadow duration-200 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
            <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-light)]">
                    <Bot
                        size={22}
                        className="text-[var(--primary)]"
                    />
                </div>

                <button
                    type="button"
                    aria-label={`More options for ${agent.name}`}
                    className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                >
                    <MoreHorizontal size={20} />
                </button>
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