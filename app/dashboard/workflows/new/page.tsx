"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    Bot,
    Check,
    GitBranch,
    Play,
    Zap,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type {
    Workflow,
    WorkflowNode,
    WorkflowNodeType,
} from "@/types/workflow";

import {
    getSavedWorkflows,
    saveWorkflows,
} from "@/lib/workflowStorage";
import { useRouter } from "next/navigation";

const nodeOptions: Array<{
    type: WorkflowNodeType;
    title: string;
    description: string;
    icon: typeof Zap;
}> = [
        {
            type: "trigger",
            title: "Trigger",
            description: "Choose what starts the workflow.",
            icon: Zap,
        },
        {
            type: "condition",
            title: "Condition",
            description: "Add rules to control the workflow.",
            icon: GitBranch,
        },
        {
            type: "agent",
            title: "AI Agent",
            description: "Choose an AI agent to perform a task.",
            icon: Bot,
        },
        {
            type: "action",
            title: "Action",
            description: "Choose what happens after the workflow.",
            icon: Play,
        },
    ];

export default function CreateWorkflowPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [selectedNodes, setSelectedNodes] =
        useState<WorkflowNodeType[]>([
            "trigger",
            "agent",
            "action",
        ]);

    const [created, setCreated] = useState(false);

    function toggleNode(type: WorkflowNodeType) {
        setSelectedNodes((current) => {
            if (current.includes(type)) {
                return current.filter(
                    (item) => item !== type,
                );
            }

            return [...current, type];
        });

        setCreated(false);
    }

    function handleCreate() {
        if (!name.trim()) {
            return;
        }

        const nodes: WorkflowNode[] = selectedNodes.map(
            (type, index) => ({
                id: `${type}-${Date.now()}-${index}`,
                type,
                title:
                    type === "trigger"
                        ? "Workflow Trigger"
                        : type === "condition"
                            ? "Workflow Condition"
                            : type === "agent"
                                ? "AI Agent"
                                : "Workflow Action",
                description:
                    type === "trigger"
                        ? "Starts the workflow"
                        : type === "condition"
                            ? "Checks a condition"
                            : type === "agent"
                                ? "Runs an AI agent"
                                : "Performs an action",
            }),
        );

        const newWorkflow: Workflow = {
            id: `workflow-${Date.now()}`,
            name: name.trim(),
            description:
                description.trim() ||
                "A new AI automation workflow.",
            status: "draft",
            runs: 0,
            successRate: 0,
            updatedAt: "Just now",
            nodes,
        };

        const savedWorkflows = getSavedWorkflows();

        saveWorkflows([
            ...savedWorkflows,
            newWorkflow,
        ]);

        setCreated(true);

        window.setTimeout(() => {
            router.push(
                `/dashboard/workflows/${newWorkflow.id}`,
            );
        }, 700);
    }

    return (
        <div className="mx-auto max-w-6xl space-y-8">
            <div>
                <Link
                    href="/dashboard/workflows"
                    className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                    <ArrowLeft size={16} />
                    Workflows
                </Link>

                <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                    Create Workflow
                </h1>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Build an automation by combining triggers,
                    conditions, AI agents, and actions.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
                {/* Form */}
                <Card>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                            Workflow Details
                        </h2>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            Give your workflow a name and
                            description.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label
                                htmlFor="workflow-name"
                                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                            >
                                Workflow Name
                            </label>

                            <input
                                id="workflow-name"
                                value={name}
                                onChange={(event) =>
                                    setName(
                                        event.target.value,
                                    )
                                }
                                placeholder="e.g. Customer Support Automation"
                                className="h-12 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 text-sm text-[var(--text-primary)] outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="workflow-description"
                                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                            >
                                Description
                            </label>

                            <textarea
                                id="workflow-description"
                                value={description}
                                onChange={(event) =>
                                    setDescription(
                                        event.target.value,
                                    )
                                }
                                placeholder="Describe what this workflow should automate..."
                                rows={5}
                                className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                            />
                        </div>
                    </div>

                    <div className="mt-8 border-t border-[var(--border)] pt-6">
                        <div className="mb-4">
                            <h2 className="font-semibold text-[var(--text-primary)]">
                                Workflow Steps
                            </h2>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Select the types of steps you
                                want to use.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {nodeOptions.map((node) => {
                                const Icon = node.icon;
                                const selected =
                                    selectedNodes.includes(
                                        node.type,
                                    );

                                return (
                                    <button
                                        key={node.type}
                                        type="button"
                                        onClick={() =>
                                            toggleNode(
                                                node.type,
                                            )
                                        }
                                        className={[
                                            "flex items-start gap-3 rounded-[var(--radius-md)] border p-4 text-left transition-all",
                                            selected
                                                ? "border-[var(--primary)] bg-[var(--primary-light)]"
                                                : "border-[var(--border)] bg-white hover:border-[var(--border-strong)]",
                                        ].join(" ")}
                                    >
                                        <div
                                            className={[
                                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                                                selected
                                                    ? "bg-white text-[var(--primary)]"
                                                    : "bg-[var(--surface-secondary)] text-[var(--text-secondary)]",
                                            ].join(
                                                " ",
                                            )}
                                        >
                                            <Icon size={18} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-sm font-semibold text-[var(--text-primary)]">
                                                    {
                                                        node.title
                                                    }
                                                </p>

                                                {selected && (
                                                    <Check
                                                        size={
                                                            17
                                                        }
                                                        className="text-[var(--primary)]"
                                                    />
                                                )}
                                            </div>

                                            <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                                                {
                                                    node.description
                                                }
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:justify-end">
                        <Link href="/dashboard/workflows">
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </Link>

                        <Button
                            onClick={handleCreate}
                            disabled={!name.trim()}
                        >
                            Create Workflow
                            <ArrowRight size={17} />
                        </Button>
                    </div>

                    {created && (
                        <div className="mt-4 rounded-[var(--radius-md)] bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                            Workflow created successfully.
                        </div>
                    )}
                </Card>

                {/* Preview */}
                <Card
                    padding="lg"
                    className="h-fit"
                >
                    <div className="mb-6">
                        <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                            Live Preview
                        </p>

                        <h2 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
                            {name.trim() ||
                                "Your Workflow"}
                        </h2>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            {description.trim() ||
                                "Workflow preview will appear here."}
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        {selectedNodes.length > 0 ? (
                            selectedNodes.map(
                                (type, index) => {
                                    const node =
                                        nodeOptions.find(
                                            (item) =>
                                                item.type ===
                                                type,
                                        );

                                    if (!node) {
                                        return null;
                                    }

                                    const Icon =
                                        node.icon;

                                    return (
                                        <div
                                            key={type}
                                            className="flex w-full flex-col items-center"
                                        >
                                            <div className="flex w-full items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-white p-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                                                    <Icon
                                                        size={
                                                            17
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-[var(--text-primary)]">
                                                        {
                                                            node.title
                                                        }
                                                    </p>

                                                    <p className="text-xs text-[var(--text-muted)]">
                                                        {
                                                            node.description
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            {index <
                                                selectedNodes.length -
                                                1 && (
                                                    <div className="h-8 w-px bg-[var(--border-strong)]" />
                                                )}
                                        </div>
                                    );
                                },
                            )
                        ) : (
                            <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--border-strong)] p-8 text-center">
                                <p className="text-sm font-medium text-[var(--text-primary)]">
                                    No steps selected
                                </p>

                                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                                    Select workflow steps to
                                    see the preview.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 rounded-[var(--radius-md)] bg-[var(--surface-secondary)] p-4">
                        <p className="text-xs font-medium text-[var(--text-primary)]">
                            Template Demo
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                            This is a frontend demonstration.
                            Connect your own automation backend
                            to execute real workflow steps.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}