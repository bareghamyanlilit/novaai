"use client";

import {
    use,
    useMemo,
    useState,
    useSyncExternalStore,
} from "react";
import Link from "next/link";
import {
    ArrowDown,
    ArrowLeft,
    Bot,
    Check,
    CircleHelp,
    GitBranch,
    Play,
    Plus,
    Save,
    Trash2,
    Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { WorkflowNodeConfig } from "@/components/dashboard/WorkflowNodeConfig";
import { workflows } from "@/data/workflows";
import {
    getSavedWorkflows,
    getWorkflowServerSnapshot,
    getWorkflowSnapshot,
    saveWorkflows,
    subscribeToWorkflowStore,
} from "@/lib/workflowStorage";
import type {
    WorkflowNode,
    WorkflowNodeType,
} from "@/types/workflow";

interface WorkflowDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const nodeLabels: Record<WorkflowNodeType, string> = {
    trigger: "Trigger",
    condition: "Condition",
    agent: "AI Agent",
    action: "Action",
};

const nodeDescriptions: Record<WorkflowNodeType, string> = {
    trigger: "Starts the workflow",
    condition: "Checks a condition",
    agent: "Runs an AI agent",
    action: "Performs an action",
};

const nodeIcons: Record<
    WorkflowNodeType,
    typeof Zap
> = {
    trigger: Zap,
    condition: GitBranch,
    agent: Bot,
    action: Play,
};

const nodeColors: Record<WorkflowNodeType, string> = {
    trigger:
        "bg-amber-50 text-amber-600 border-amber-200",
    condition:
        "bg-sky-50 text-sky-600 border-sky-200",
    agent:
        "bg-indigo-50 text-indigo-600 border-indigo-200",
    action:
        "bg-green-50 text-green-600 border-green-200",
};

export default function WorkflowDetailsPage({
    params,
}: WorkflowDetailsPageProps) {
    const router = useRouter();
    const { id } = use(params);

    const workflowSnapshot =
        useSyncExternalStore(
            subscribeToWorkflowStore,
            getWorkflowSnapshot,
            getWorkflowServerSnapshot,
        );

    const savedWorkflows = useMemo(() => {
        if (!workflowSnapshot) {
            return [];
        }

        try {
            return JSON.parse(
                workflowSnapshot,
            ) as typeof workflows;
        } catch {
            return [];
        }
    }, [workflowSnapshot]);

    const currentWorkflow = useMemo(() => {
        return (
            savedWorkflows.find(
                (item) => item.id === id,
            ) ??
            workflows.find(
                (item) => item.id === id,
            ) ??
            null
        );
    }, [id, savedWorkflows]);

    const [editingDetails, setEditingDetails] =
        useState(false);

    const [workflowName, setWorkflowName] =
        useState("");

    const [workflowDescription, setWorkflowDescription] =
        useState("");

    const [nodes, setNodes] =
        useState<WorkflowNode[]>([]);

    const [saved, setSaved] =
        useState(false);

    const [selectedNode, setSelectedNode] =
        useState<WorkflowNode | null>(null);

    const [editingWorkflowId, setEditingWorkflowId] =
        useState<string | null>(null);

    /*
     * The editable workflow state is initialized lazily
     * from the current workflow.
     *
     * We intentionally keep this state separate from the
     * external localStorage store so user edits do not
     * immediately overwrite the saved workflow.
     */
    const displayedNodes =
        editingWorkflowId === id
            ? nodes
            : currentWorkflow?.nodes ?? [];

    function startEditingWorkflow() {
        if (!currentWorkflow) {
            return;
        }

        setEditingWorkflowId(
            currentWorkflow.id,
        );

        setWorkflowName(
            currentWorkflow.name,
        );

        setWorkflowDescription(
            currentWorkflow.description,
        );

        setNodes(currentWorkflow.nodes);
        setEditingDetails(true);
    }

    function addNode(type: WorkflowNodeType) {
        if (!currentWorkflow) {
            return;
        }

        if (editingWorkflowId !== currentWorkflow.id) {
            setEditingWorkflowId(
                currentWorkflow.id,
            );

            setWorkflowName(
                currentWorkflow.name,
            );

            setWorkflowDescription(
                currentWorkflow.description,
            );

            setNodes(currentWorkflow.nodes);
        }

        const newNode: WorkflowNode = {
            id: `${type}-${crypto.randomUUID()}`,
            type,
            title: `New ${nodeLabels[type]}`,
            description: nodeDescriptions[type],
        };

        setNodes((current) => [
            ...current,
            newNode,
        ]);

        setSaved(false);
    }

    function deleteNode(nodeId: string) {
        setNodes((current) =>
            current.filter(
                (node) => node.id !== nodeId,
            ),
        );

        setSaved(false);
    }

    function saveWorkflowDetails() {
        if (!currentWorkflow) {
            return;
        }

        const storedWorkflows =
            getSavedWorkflows();

        const updatedWorkflow = {
            ...currentWorkflow,
            name:
                workflowName.trim() ||
                currentWorkflow.name,
            description:
                workflowDescription.trim() ||
                currentWorkflow.description,
            nodes: displayedNodes,
            updatedAt: "Just now",
        };

        const existingIndex =
            storedWorkflows.findIndex(
                (item) =>
                    item.id ===
                    currentWorkflow.id,
            );

        if (existingIndex === -1) {
            storedWorkflows.push(
                updatedWorkflow,
            );
        } else {
            storedWorkflows[
                existingIndex
            ] = updatedWorkflow;
        }

        saveWorkflows(storedWorkflows);

        setEditingDetails(false);
        setEditingWorkflowId(null);
        setSaved(true);

        window.setTimeout(() => {
            setSaved(false);
        }, 2500);
    }

    function saveWorkflow() {
        if (!currentWorkflow) {
            return;
        }

        const storedWorkflows =
            getSavedWorkflows();

        const updatedWorkflow = {
            ...currentWorkflow,
            nodes: displayedNodes,
        };

        const existingWorkflowIndex =
            storedWorkflows.findIndex(
                (item) =>
                    item.id ===
                    currentWorkflow.id,
            );

        if (existingWorkflowIndex === -1) {
            storedWorkflows.push(
                updatedWorkflow,
            );
        } else {
            storedWorkflows[
                existingWorkflowIndex
            ] = updatedWorkflow;
        }

        saveWorkflows(storedWorkflows);

        setEditingWorkflowId(null);
        setSaved(true);

        window.setTimeout(() => {
            setSaved(false);
        }, 2500);
    }

    function resetWorkflow() {
        if (!currentWorkflow) {
            return;
        }

        setEditingWorkflowId(
            currentWorkflow.id,
        );

        setWorkflowName(
            currentWorkflow.name,
        );

        setWorkflowDescription(
            currentWorkflow.description,
        );

        setNodes(currentWorkflow.nodes);

        const storedWorkflows =
            getSavedWorkflows();

        const filteredWorkflows =
            storedWorkflows.filter(
                (item) =>
                    item.id !==
                    currentWorkflow.id,
            );

        saveWorkflows(filteredWorkflows);

        setSelectedNode(null);
        setSaved(false);
    }

    function deleteWorkflow() {
        if (!currentWorkflow) {
            return;
        }

        const confirmed = window.confirm(
            "Delete this workflow?",
        );

        if (!confirmed) {
            return;
        }

        const storedWorkflows =
            getSavedWorkflows();

        const updatedWorkflows =
            storedWorkflows.filter(
                (item) =>
                    item.id !==
                    currentWorkflow.id,
            );

        saveWorkflows(updatedWorkflows);

        router.push(
            "/dashboard/workflows",
        );
    }

    if (!workflowSnapshot) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-sm text-[var(--text-secondary)]">
                    Loading workflow...
                </div>
            </div>
        );
    }

    if (!currentWorkflow) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Card className="max-w-md text-center">
                    <h1 className="text-xl font-semibold text-[var(--text-primary)]">
                        Workflow not found
                    </h1>

                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        The workflow you are looking for
                        does not exist.
                    </p>

                    <Link
                        href="/dashboard/workflows"
                        className="mt-6 inline-flex text-sm font-medium text-[var(--primary)]"
                    >
                        Back to workflows
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <Link
                        href="/dashboard/workflows"
                        className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                    >
                        <ArrowLeft size={16} />
                        Workflows
                    </Link>

                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                            {currentWorkflow.name}
                        </h1>

                        <Badge
                            variant={
                                currentWorkflow.status ===
                                "active"
                                    ? "success"
                                    : "warning"
                            }
                        >
                            {currentWorkflow.status}
                        </Badge>
                    </div>

                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        {
                            currentWorkflow.description
                        }
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={
                            startEditingWorkflow
                        }
                    >
                        Edit
                    </Button>

                    <Button
                        variant="outline"
                        onClick={resetWorkflow}
                    >
                        Reset
                    </Button>

                    <Button
                        onClick={saveWorkflow}
                    >
                        {saved ? (
                            <>
                                <Check size={18} />
                                Saved
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Save Workflow
                            </>
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        onClick={
                            deleteWorkflow
                        }
                        className="text-red-600 hover:text-red-700"
                    >
                        <Trash2 size={17} />
                        Delete
                    </Button>
                </div>
            </div>

            {editingDetails && (
                <Card>
                    <div className="space-y-5">
                        <div>
                            <label
                                htmlFor="edit-workflow-name"
                                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                            >
                                Workflow Name
                            </label>

                            <input
                                id="edit-workflow-name"
                                value={workflowName}
                                onChange={(event) =>
                                    setWorkflowName(
                                        event.target.value,
                                    )
                                }
                                className="h-12 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="edit-workflow-description"
                                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                            >
                                Description
                            </label>

                            <textarea
                                id="edit-workflow-description"
                                value={
                                    workflowDescription
                                }
                                onChange={(event) =>
                                    setWorkflowDescription(
                                        event.target
                                            .value,
                                    )
                                }
                                rows={4}
                                className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() =>
                                    setEditingDetails(
                                        false,
                                    )
                                }
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={
                                    saveWorkflowDetails
                                }
                                disabled={
                                    !workflowName.trim()
                                }
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
                <Card
                    padding="lg"
                    className="min-h-[700px] overflow-hidden"
                >
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                                Workflow Builder
                            </h2>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Connect steps to automate your
                                workflow.
                            </p>
                        </div>

                        <Badge>
                            {displayedNodes.length}{" "}
                            {displayedNodes.length === 1
                                ? "step"
                                : "steps"}
                        </Badge>
                    </div>

                    <div className="mx-auto flex max-w-xl flex-col items-center">
                        {displayedNodes.map(
                            (node, index) => {
                                const Icon =
                                    nodeIcons[
                                        node.type
                                    ];

                                return (
                                    <div
                                        key={node.id}
                                        className="flex w-full flex-col items-center"
                                    >
                                        <div className="w-full rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:border-[var(--primary)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className={[
                                                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] border",
                                                        nodeColors[
                                                            node.type
                                                        ],
                                                    ].join(
                                                        " ",
                                                    )}
                                                >
                                                    <Icon
                                                        size={
                                                            20
                                                        }
                                                    />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="min-w-0">
                                                            <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                                                                {
                                                                    nodeLabels[
                                                                        node
                                                                            .type
                                                                    ]
                                                                }
                                                            </p>

                                                            <h3 className="mt-1 font-semibold text-[var(--text-primary)]">
                                                                {
                                                                    node.title
                                                                }
                                                            </h3>
                                                        </div>

                                                        <div className="flex shrink-0 items-center gap-1">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setSelectedNode(
                                                                        node,
                                                                    )
                                                                }
                                                                className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[var(--primary)] transition-colors hover:bg-[var(--primary-light)]"
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    deleteNode(
                                                                        node.id,
                                                                    )
                                                                }
                                                                aria-label={`Delete ${node.title}`}
                                                                className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-red-50 hover:text-red-600"
                                                            >
                                                                <Trash2
                                                                    size={
                                                                        17
                                                                    }
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                                                        {
                                                            node.description
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {index <
                                            displayedNodes.length -
                                                1 && (
                                            <div className="flex h-12 flex-col items-center justify-center">
                                                <div className="h-6 w-px bg-[var(--border-strong)]" />

                                                <ArrowDown
                                                    size={
                                                        16
                                                    }
                                                    className="text-[var(--text-muted)]"
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            },
                        )}

                        {displayedNodes.length === 0 && (
                            <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--border-strong)] text-center">
                                <CircleHelp
                                    size={28}
                                    className="text-[var(--text-muted)]"
                                />

                                <h3 className="mt-4 font-semibold text-[var(--text-primary)]">
                                    Your workflow is empty
                                </h3>

                                <p className="mt-2 max-w-sm text-sm text-[var(--text-secondary)]">
                                    Add a trigger to start
                                    building your
                                    automation.
                                </p>
                            </div>
                        )}
                    </div>
                </Card>

                <Card
                    padding="md"
                    className="h-fit"
                >
                    <div className="mb-5">
                        <h2 className="font-semibold text-[var(--text-primary)]">
                            Add Node
                        </h2>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            Add a step to your workflow.
                        </p>
                    </div>

                    <div className="space-y-2">
                        {(
                            Object.keys(
                                nodeLabels,
                            ) as WorkflowNodeType[]
                        ).map((type) => {
                            const Icon =
                                nodeIcons[type];

                            return (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() =>
                                        addNode(type)
                                    }
                                    className="flex w-full items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-white p-3 text-left transition-all hover:border-[var(--primary)] hover:bg-[var(--primary-light)]"
                                >
                                    <div
                                        className={[
                                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                                            nodeColors[
                                                type
                                            ],
                                        ].join(
                                            " ",
                                        )}
                                    >
                                        <Icon size={17} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-[var(--text-primary)]">
                                            {
                                                nodeLabels[
                                                    type
                                                ]
                                            }
                                        </p>

                                        <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                                            {
                                                nodeDescriptions[
                                                    type
                                                ]
                                            }
                                        </p>
                                    </div>

                                    <Plus
                                        size={16}
                                        className="text-[var(--text-muted)]"
                                    />
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-6 rounded-[var(--radius-md)] bg-[var(--surface-secondary)] p-4">
                        <p className="text-xs font-medium text-[var(--text-primary)]">
                            Demo Builder
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                            This template demonstrates the
                            workflow interface. Connect your
                            own backend or automation service
                            to execute real workflows.
                        </p>
                    </div>
                </Card>
            </div>

            {selectedNode && (
                <WorkflowNodeConfig
                    type={selectedNode.type}
                    title={selectedNode.title}
                    description={
                        selectedNode.description
                    }
                    onClose={() =>
                        setSelectedNode(null)
                    }
                    onSave={(data) => {
                        setNodes((current) =>
                            current.map(
                                (node) =>
                                    node.id ===
                                    selectedNode.id
                                        ? {
                                            ...node,
                                            title:
                                                data.title,
                                            description:
                                                data.description,
                                        }
                                        : node,
                            ),
                        );

                        setSelectedNode(null);
                        setSaved(false);
                    }}
                />
            )}
        </div>
    );
}