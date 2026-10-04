"use client";

import Link from "next/link";
import { ArrowLeft, Bot, FileSearch, Globe, Calculator } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

const tools = [
    {
        id: "web-search",
        name: "Web Search",
        description: "Search the web for up-to-date information.",
        icon: Globe,
    },
    {
        id: "file-search",
        name: "File Search",
        description: "Search connected documents and knowledge.",
        icon: FileSearch,
    },
    {
        id: "calculator",
        name: "Calculator",
        description: "Perform mathematical calculations.",
        icon: Calculator,
    },
];

export default function CreateAgentPage() {
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [created, setCreated] = useState(false);

    function toggleTool(toolId: string) {
        setSelectedTools((current) =>
            current.includes(toolId)
                ? current.filter((id) => id !== toolId)
                : [...current, toolId],
        );
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setCreated(true);
    }

    return (
        <main className="min-h-screen bg-[var(--surface-secondary)]">
            <div className="mx-auto max-w-[900px] px-5 py-8 lg:px-10">
                <Link
                    href="/dashboard/agents"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                    <ArrowLeft size={17} />
                    Back to Agents
                </Link>

                <div className="mt-8">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-light)]">
                            <Bot
                                size={24}
                                className="text-[var(--primary)]"
                            />
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                                Create AI Agent
                            </h1>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Configure a new AI agent for your workspace.
                            </p>
                        </div>
                    </div>
                </div>

                {created && (
                    <div className="mt-6 rounded-[var(--radius-md)] border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                        Agent created successfully.
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6"
                >
                    <Card>
                        <div>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                                Basic Information
                            </h2>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Define the basic information for your agent.
                            </p>
                        </div>

                        <div className="mt-6 space-y-5">
                            <Input
                                label="Agent Name"
                                name="name"
                                placeholder="e.g. Marketing Agent"
                                required
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
                                    name="description"
                                    rows={4}
                                    placeholder="Describe what this agent does..."
                                    className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                                    required
                                />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                                AI Configuration
                            </h2>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Choose the model and instructions for this agent.
                            </p>
                        </div>

                        <div className="mt-6 space-y-5">
                            <div>
                                <label
                                    htmlFor="model"
                                    className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                >
                                    AI Model
                                </label>

                                <select
                                    id="model"
                                    name="model"
                                    defaultValue="GPT"
                                    className="h-12 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 text-sm text-[var(--text-primary)] outline-none transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                                >
                                    <option value="GPT">
                                        GPT
                                    </option>

                                    <option value="Claude">
                                        Claude
                                    </option>

                                    <option value="Custom">
                                        Custom Model
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="instructions"
                                    className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                >
                                    Agent Instructions
                                </label>

                                <textarea
                                    id="instructions"
                                    name="instructions"
                                    rows={7}
                                    placeholder="Tell your agent how it should behave..."
                                    className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                                    required
                                />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                                Tools
                            </h2>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Select the tools this agent can use.
                            </p>
                        </div>

                        <div className="mt-6 space-y-3">
                            {tools.map((tool) => {
                                const Icon = tool.icon;
                                const selected = selectedTools.includes(tool.id);

                                return (
                                    <button
                                        key={tool.id}
                                        type="button"
                                        onClick={() => toggleTool(tool.id)}
                                        className={[
                                            "flex w-full items-center gap-4 rounded-[var(--radius-md)] border p-4 text-left transition-all duration-200",
                                            selected
                                                ? "border-[var(--primary)] bg-[var(--primary-light)]"
                                                : "border-[var(--border)] bg-white hover:border-[var(--border-strong)]",
                                        ].join(" ")}
                                    >
                                        <div
                                            className={[
                                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                                                selected
                                                    ? "bg-white"
                                                    : "bg-[var(--surface-secondary)]",
                                            ].join(" ")}
                                        >
                                            <Icon
                                                size={19}
                                                className="text-[var(--primary)]"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-[var(--text-primary)]">
                                                {tool.name}
                                            </p>

                                            <p className="mt-1 text-xs text-[var(--text-secondary)]">
                                                {tool.description}
                                            </p>
                                        </div>

                                        <span
                                            className={[
                                                "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                                                selected
                                                    ? "border-[var(--primary)] bg-[var(--primary)]"
                                                    : "border-[var(--border-strong)] bg-white",
                                            ].join(" ")}
                                        >
                                            {selected && (
                                                <span className="h-2 w-2 rounded-sm bg-white" />
                                            )}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </Card>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link href="/dashboard/agents">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full sm:w-auto"
                            >
                                Cancel
                            </Button>
                        </Link>

                        <Button
                            type="submit"
                            className="w-full sm:w-auto"
                        >
                            <Bot size={18} />
                            Create Agent
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}