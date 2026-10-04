"use client";

import {
    Bot,
    GitBranch,
    Play,
    Save,
    X,
    Zap,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import type { WorkflowNodeType } from "@/types/workflow";

interface WorkflowNodeConfigProps {
    type: WorkflowNodeType;
    title: string;
    description: string;
    onClose: () => void;
    onSave: (data: {
        title: string;
        description: string;
    }) => void;
}

const icons = {
    trigger: Zap,
    condition: GitBranch,
    agent: Bot,
    action: Play,
};

const labels = {
    trigger: "Trigger",
    condition: "Condition",
    agent: "AI Agent",
    action: "Action",
};

export function WorkflowNodeConfig({
    type,
    title,
    description,
    onClose,
    onSave,
}: WorkflowNodeConfigProps) {
    const Icon = icons[type];

    const [nodeTitle, setNodeTitle] = useState(title);
    const [nodeDescription, setNodeDescription] =
        useState(description);

    return (
        <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-[var(--border)] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-light)] text-[var(--primary)]">
                        <Icon size={19} />
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                            {labels[type]}
                        </p>

                        <h2 className="text-base font-semibold text-[var(--text-primary)]">
                            Configure Node
                        </h2>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close configuration"
                    className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                >
                    <X size={19} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-5">
                    <div>
                        <label
                            htmlFor="node-title"
                            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                        >
                            Node Name
                        </label>

                        <input
                            id="node-title"
                            value={nodeTitle}
                            onChange={(event) =>
                                setNodeTitle(
                                    event.target.value,
                                )
                            }
                            className="h-12 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 text-sm text-[var(--text-primary)] outline-none transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="node-description"
                            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                        >
                            Description
                        </label>

                        <textarea
                            id="node-description"
                            value={nodeDescription}
                            onChange={(event) =>
                                setNodeDescription(
                                    event.target.value,
                                )
                            }
                            rows={4}
                            className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                        />
                    </div>

                    {type === "trigger" && (
                        <div>
                            <label
                                htmlFor="trigger-type"
                                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                            >
                                Trigger Type
                            </label>

                            <select
                                id="trigger-type"
                                className="h-12 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                            >
                                <option>
                                    New Message
                                </option>
                                <option>
                                    Schedule
                                </option>
                                <option>
                                    Webhook
                                </option>
                                <option>
                                    New Form Submission
                                </option>
                            </select>
                        </div>
                    )}

                    {type === "condition" && (
                        <div>
                            <label
                                htmlFor="condition-type"
                                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                            >
                                Condition
                            </label>

                            <select
                                id="condition-type"
                                className="h-12 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                            >
                                <option>
                                    If priority is high
                                </option>
                                <option>
                                    If lead score is above 80
                                </option>
                                <option>
                                    If message contains keyword
                                </option>
                            </select>
                        </div>
                    )}

                    {type === "agent" && (
                        <div>
                            <label
                                htmlFor="agent-type"
                                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                            >
                                AI Agent
                            </label>

                            <select
                                id="agent-type"
                                className="h-12 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                            >
                                <option>
                                    Support Agent
                                </option>
                                <option>
                                    Marketing Agent
                                </option>
                                <option>
                                    Research Agent
                                </option>
                                <option>
                                    Sales Agent
                                </option>
                            </select>
                        </div>
                    )}

                    {type === "action" && (
                        <div>
                            <label
                                htmlFor="action-type"
                                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                            >
                                Action
                            </label>

                            <select
                                id="action-type"
                                className="h-12 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                            >
                                <option>
                                    Send Email
                                </option>
                                <option>
                                    Send Message
                                </option>
                                <option>
                                    Update CRM
                                </option>
                                <option>
                                    Create Task
                                </option>
                                <option>
                                    Webhook Request
                                </option>
                            </select>
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t border-[var(--border)] p-6">
                <Button
                    className="w-full"
                    onClick={() =>
                        onSave({
                            title: nodeTitle,
                            description:
                                nodeDescription,
                        })
                    }
                >
                    <Save size={17} />
                    Save Node
                </Button>
            </div>
        </div>
    );
}