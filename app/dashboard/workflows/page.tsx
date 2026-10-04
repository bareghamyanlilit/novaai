"use client";

import {
    useMemo,
    useState,
    useSyncExternalStore,
} from "react";
import Link from "next/link";
import {
    ArrowRight,
    GitBranch,
    Plus,
    Search,
    Workflow as WorkflowIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { workflows } from "@/data/workflows";
import {
    getWorkflowServerSnapshot,
    getWorkflowSnapshot,
    subscribeToWorkflowStore,
} from "@/lib/workflowStorage";
import type { Workflow } from "@/types/workflow";
import type { WorkflowStatus } from "@/types/workflow";

const statusFilters: Array<"all" | WorkflowStatus> = [
    "all",
    "active",
    "draft",
    "inactive",
];

const statusLabels: Record<
    "all" | WorkflowStatus,
    string
> = {
    all: "All",
    active: "Active",
    draft: "Draft",
    inactive: "Inactive",
};

const statusVariants: Record<
    WorkflowStatus,
    "success" | "warning" | "default"
> = {
    active: "success",
    draft: "warning",
    inactive: "default",
};
export default function WorkflowsPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<
        "all" | WorkflowStatus
    >("all");

    const workflowSnapshot =
        useSyncExternalStore(
            subscribeToWorkflowStore,
            getWorkflowSnapshot,
            getWorkflowServerSnapshot,
        );

    const allWorkflows = useMemo(() => {
        if (!workflowSnapshot) {
            return workflows;
        }

        try {
            const savedWorkflows =
                JSON.parse(
                    workflowSnapshot,
                ) as Workflow[];

            return [
                ...workflows,
                ...savedWorkflows.filter(
                    (savedWorkflow) =>
                        !workflows.some(
                            (demoWorkflow) =>
                                demoWorkflow.id ===
                                savedWorkflow.id,
                        ),
                ),
            ];
        } catch {
            return workflows;
        }
    }, [workflowSnapshot]);

    const filteredWorkflows = useMemo(() => {
        const query = search.trim().toLowerCase();

        return allWorkflows.filter((workflow) => {
            const matchesSearch =
                !query ||
                workflow.name
                    .toLowerCase()
                    .includes(query) ||
                workflow.description
                    .toLowerCase()
                    .includes(query);

            const matchesStatus =
                status === "all" ||
                workflow.status === status;

            return matchesSearch && matchesStatus;
        });
    }, [allWorkflows, search, status]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-[var(--text-muted)]">
                        <WorkflowIcon size={16} />
                        Automation
                    </div>

                    <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                        Workflows
                    </h1>

                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Automate repetitive tasks with AI-powered workflows.
                    </p>
                </div>

                <Link href="/dashboard/workflows/new">
                    <Button>
                        <Plus size={18} />
                        Create Workflow
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[var(--text-secondary)]">
                    {filteredWorkflows.length}{" "}
                    {filteredWorkflows.length === 1
                        ? "workflow"
                        : "workflows"}
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative">
                        <Search
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                        />

                        <input
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search workflows..."
                            className="h-10 w-full rounded-xl border border-[var(--border)] bg-white pl-10 pr-4 text-sm outline-none transition-colors focus:border-[var(--primary)] sm:w-60"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={(event) =>
                            setStatus(
                                event.target.value as
                                | "all"
                                | WorkflowStatus,
                            )
                        }
                        className="h-10 rounded-xl border border-[var(--border)] bg-white px-3 text-sm outline-none focus:border-[var(--primary)]"
                    >
                        {statusFilters.map((filter) => (
                            <option
                                key={filter}
                                value={filter}
                            >
                                {statusLabels[filter]}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredWorkflows.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredWorkflows.map((workflow) => (
                        <Card
                            key={workflow.id}
                            className="group transition-shadow duration-200 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-light)] text-[var(--primary)]">
                                    <GitBranch size={21} />
                                </div>

                                <Badge
                                    variant={
                                        statusVariants[
                                        workflow.status
                                        ]
                                    }
                                >
                                    {statusLabels[
                                        workflow.status
                                    ]}
                                </Badge>
                            </div>

                            <h2 className="mt-5 text-lg font-semibold text-[var(--text-primary)]">
                                {workflow.name}
                            </h2>

                            <p className="mt-2 min-h-10 text-sm leading-6 text-[var(--text-secondary)]">
                                {workflow.description}
                            </p>

                            <div className="mt-6 flex items-center gap-2 overflow-hidden">
                                {workflow.nodes.map(
                                    (node, index) => (
                                        <div
                                            key={node.id}
                                            className="flex min-w-0 items-center gap-2"
                                        >
                                            <div className="flex h-8 shrink-0 items-center rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] px-2.5 text-xs font-medium text-[var(--text-secondary)]">
                                                {node.title}
                                            </div>

                                            {index <
                                                workflow.nodes
                                                    .length -
                                                1 && (
                                                    <ArrowRight
                                                        size={14}
                                                        className="shrink-0 text-[var(--text-muted)]"
                                                    />
                                                )}
                                        </div>
                                    ),
                                )}
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--border)] pt-5">
                                <div>
                                    <p className="text-xs text-[var(--text-muted)]">
                                        Runs
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                                        {workflow.runs.toLocaleString(
                                            "en-US",
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-[var(--text-muted)]">
                                        Success Rate
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                                        {workflow.successRate}%
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-5">
                                <p className="text-xs text-[var(--text-muted)]">
                                    Updated{" "}
                                    {workflow.updatedAt}
                                </p>

                                <Link
                                    href={`/dashboard/workflows/${workflow.id}`}
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
                                >
                                    View workflow
                                    <ArrowRight size={15} />
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-light)] text-[var(--primary)]">
                        <WorkflowIcon size={22} />
                    </div>

                    <h2 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                        No workflows found
                    </h2>

                    <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-secondary)]">
                        Try changing your search or status
                        filter.
                    </p>
                </Card>
            )}
        </div>
    );
}