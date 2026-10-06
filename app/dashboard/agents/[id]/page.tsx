"use client";

import Link from "next/link";
import {
    Activity,
    ArrowLeft,
    Bot,
    CheckCircle2,
    Clock3,
    FileText,
    MoreHorizontal,
    Save,
    Settings,
    Trash2,
    TrendingUp,
} from "lucide-react";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { agents as defaultAgents } from "@/data/agents";
import { deleteAgent, getStoredAgents } from "@/lib/agentStorage";
import type { Agent } from "@/types/agent";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type Tab =
    | "overview"
    | "instructions"
    | "knowledge"
    | "activity"
    | "settings";

const tabs: {
    id: Tab;
    label: string;
}[] = [
        {
            id: "overview",
            label: "Overview",
        },
        {
            id: "instructions",
            label: "Instructions",
        },
        {
            id: "knowledge",
            label: "Knowledge",
        },
        {
            id: "activity",
            label: "Activity",
        },
        {
            id: "settings",
            label: "Settings",
        },
    ];

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

const activityItems = [
    {
        id: 1,
        title: "Completed customer analysis",
        time: "5 minutes ago",
        icon: CheckCircle2,
    },
    {
        id: 2,
        title: "Processed 18 new requests",
        time: "32 minutes ago",
        icon: Activity,
    },
    {
        id: 3,
        title: "Knowledge base updated",
        time: "2 hours ago",
        icon: FileText,
    },
    {
        id: 4,
        title: "Agent configuration updated",
        time: "Yesterday",
        icon: Settings,
    },
];

const performanceData = [
    { day: "Mon", value: 72 },
    { day: "Tue", value: 81 },
    { day: "Wed", value: 76 },
    { day: "Thu", value: 91 },
    { day: "Fri", value: 87 },
    { day: "Sat", value: 94 },
    { day: "Sun", value: 89 },
];

const knowledgeSources = [
    "Company Documentation",
    "Product Knowledge Base",
    "Customer FAQ",
];

export default function AgentDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);

    const [activeTab, setActiveTab] =
        useState<Tab>("overview");

    const [menuOpen, setMenuOpen] = useState(false);

    const router = useRouter();

    const [agent, setAgent] = useState<Agent | undefined>(() =>
        getStoredAgents(defaultAgents).find(
            (item) => item.id === id,
        ),
    );
    const handleDeleteAgent = () => {
        if (!agent) {
            return;
        }

        const confirmed = window.confirm(
            `Delete "${agent.name}"? This action cannot be undone.`,
        );

        if (!confirmed) {
            return;
        }

        deleteAgent(agent.id);
        setAgent(undefined);
        router.push("/dashboard/agents");
    };

    if (!agent) {
        return (
            <main className="min-h-screen bg-[var(--surface-secondary)]">
                <div className="mx-auto max-w-[1280px] px-5 py-12 lg:px-10">
                    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-white px-6 py-16 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                            <Bot
                                size={22}
                                className="text-[var(--danger)]"
                            />
                        </div>

                        <h1 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">
                            Agent not found
                        </h1>

                        <p className="mt-2 text-sm text-[var(--text-secondary)]">
                            The agent you are looking for does not exist.
                        </p>

                        <Link
                            href="/dashboard/agents"
                            className="mt-6 inline-flex"
                        >
                            <Button>
                                <ArrowLeft size={17} />
                                Back to Agents
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[var(--surface-secondary)]">
            <div className="mx-auto max-w-[1280px] px-5 py-8 lg:px-10">
                <Link
                    href="/dashboard/agents"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                    <ArrowLeft size={17} />
                    Back to Agents
                </Link>

                {/* Header */}
                <section className="mt-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-6 lg:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-light)]">
                                <Bot
                                    size={27}
                                    className="text-[var(--primary)]"
                                />
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                                        {agent.name}
                                    </h1>

                                    <Badge
                                        variant={
                                            statusVariant[agent.status]
                                        }
                                    >
                                        {statusLabel[agent.status]}
                                    </Badge>
                                </div>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                                    {agent.description}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--text-muted)]">
                                    <span>
                                        Model:{" "}
                                        <strong className="font-medium text-[var(--text-secondary)]">
                                            {agent.model}
                                        </strong>
                                    </span>

                                    <span>
                                        Updated{" "}
                                        {agent.updatedAt}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <button
                                    type="button"
                                    aria-label="More options"
                                    aria-expanded={menuOpen}
                                    onClick={() =>
                                        setMenuOpen((current) => !current)
                                    }
                                    className="rounded-[var(--radius-md)] border border-[var(--border)] p-2.5 text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                                >
                                    <MoreHorizontal size={20} />
                                </button>

                                {menuOpen && (
                                    <div className="absolute right-0 top-12 z-30 min-w-[180px] rounded-[var(--radius-md)] border border-[var(--border)] bg-white p-1.5 shadow-lg">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setMenuOpen(false);
                                                setActiveTab("settings");
                                            }}
                                            className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
                                        >
                                            <Settings size={16} />
                                            Configure
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setMenuOpen(false);
                                                handleDeleteAgent();
                                            }}
                                            className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                                        >
                                            <Trash2 size={16} />
                                            Delete agent
                                        </button>
                                    </div>
                                )}
                            </div>

                            <Button
                                onClick={() =>
                                    setActiveTab("settings")
                                }
                            >
                                <Settings size={17} />
                                Configure
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Tabs */}
                <nav className="mt-6 overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border)] bg-white">
                    <div className="flex min-w-max">
                        {tabs.map((tab) => {
                            const active =
                                activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() =>
                                        setActiveTab(tab.id)
                                    }
                                    className={[
                                        "border-b-2 px-5 py-4 text-sm font-medium transition-colors",
                                        active
                                            ? "border-[var(--primary)] text-[var(--primary)]"
                                            : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                                    ].join(" ")}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Tab Content */}
                <div className="mt-6">
                    {activeTab === "overview" && (
                        <OverviewTab agent={agent} />
                    )}

                    {activeTab === "instructions" && (
                        <InstructionsTab />
                    )}

                    {activeTab === "knowledge" && (
                        <KnowledgeTab />
                    )}

                    {activeTab === "activity" && (
                        <ActivityTab />
                    )}

                    {activeTab === "settings" && (
                        <SettingsTab
                            agentName={agent.name}
                            onDelete={handleDeleteAgent}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}

function OverviewTab({
    agent,
}: {
    agent: Agent;
}) {
    return (
        <>
            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                    label="Total Tasks"
                    value={agent.tasks.toLocaleString("en-US")}
                    change="+12.5%"
                    icon={Activity}
                />

                <MetricCard
                    label="Success Rate"
                    value={`${agent.successRate}%`}
                    change="+3.2%"
                    icon={TrendingUp}
                />

                <MetricCard
                    label="Avg. Response"
                    value="1.8s"
                    change="-0.4s"
                    icon={Clock3}
                />

                <MetricCard
                    label="Knowledge Sources"
                    value="24"
                    change="+4"
                    icon={FileText}
                />
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
                <Card>
                    <CardHeader>
                        <div>
                            <CardTitle>
                                Performance
                            </CardTitle>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Agent performance over the last 7 days.
                            </p>
                        </div>
                    </CardHeader>

                    <PerformanceChart />
                </Card>

                <ActivityList />
            </section>
        </>
    );
}

function PerformanceChart() {
    return (
        <div className="flex h-[280px] items-end gap-3 border-b border-l border-[var(--border)] px-4 pb-0 pt-8 sm:gap-5">
            {performanceData.map((item) => (
                <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                >
                    <div className="flex h-full w-full items-end">
                        <div
                            className="w-full rounded-t-md bg-[var(--primary)] transition-opacity hover:opacity-80"
                            style={{
                                height: `${item.value}%`,
                            }}
                            title={`${item.value}%`}
                        />
                    </div>

                    <span className="text-xs text-[var(--text-muted)]">
                        {item.day}
                    </span>
                </div>
            ))}
        </div>
    );
}

function InstructionsTab() {
    const [instructions, setInstructions] = useState(
        "You are a helpful AI assistant. Follow workspace instructions, provide accurate responses, and complete assigned tasks efficiently.",
    );

    const [saved, setSaved] = useState(false);

    return (
        <Card>
            <CardHeader>
                <div>
                    <CardTitle>
                        Agent Instructions
                    </CardTitle>

                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Define how this AI agent should behave.
                    </p>
                </div>

                <Button
                    size="sm"
                    onClick={() => setSaved(true)}
                >
                    <Save size={16} />
                    Save
                </Button>
            </CardHeader>

            <textarea
                value={instructions}
                onChange={(event) => {
                    setInstructions(event.target.value);
                    setSaved(false);
                }}
                rows={12}
                className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
            />

            {saved && (
                <p className="mt-3 text-sm font-medium text-green-600">
                    Instructions saved successfully.
                </p>
            )}
        </Card>
    );
}

function KnowledgeTab() {
    return (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
            <Card>
                <CardHeader>
                    <div>
                        <CardTitle>
                            Knowledge Sources
                        </CardTitle>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            Documents and resources connected to this agent.
                        </p>
                    </div>

                    <Button size="sm">
                        Add Source
                    </Button>
                </CardHeader>

                <div className="space-y-3">
                    {knowledgeSources.map((source) => (
                        <div
                            key={source}
                            className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[var(--border)] p-4"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)]">
                                    <FileText
                                        size={18}
                                        className="text-[var(--primary)]"
                                    />
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                                        {source}
                                    </p>

                                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                                        Updated recently
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
                            >
                                View
                            </button>
                        </div>
                    ))}
                </div>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Knowledge Usage
                    </CardTitle>
                </CardHeader>

                <div>
                    <div className="flex items-end justify-between">
                        <span className="text-sm text-[var(--text-secondary)]">
                            Storage used
                        </span>

                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                            68%
                        </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-[68%] rounded-full bg-[var(--primary)]" />
                    </div>

                    <p className="mt-3 text-xs text-[var(--text-muted)]">
                        6.8 GB of 10 GB used
                    </p>
                </div>
            </Card>
        </div>
    );
}

function ActivityTab() {
    return (
        <Card>
            <CardHeader>
                <div>
                    <CardTitle>
                        Agent Activity
                    </CardTitle>

                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Recent actions and completed tasks.
                    </p>
                </div>

                <select
                    defaultValue="all"
                    className="h-9 rounded-lg border border-[var(--border)] bg-white px-3 text-xs text-[var(--text-secondary)] outline-none"
                >
                    <option value="all">
                        All activity
                    </option>

                    <option value="tasks">
                        Tasks
                    </option>

                    <option value="settings">
                        Settings
                    </option>
                </select>
            </CardHeader>

            <div className="divide-y divide-[var(--border)]">
                {activityItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.id}
                            className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)]">
                                <Icon
                                    size={18}
                                    className="text-[var(--primary)]"
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm font-medium text-[var(--text-primary)]">
                                    {item.title}
                                </p>

                                <p className="mt-1 text-xs text-[var(--text-muted)]">
                                    {item.time}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}

function SettingsTab({
    agentName,
    onDelete,
}: {
    agentName: string;
    onDelete: () => void;
}) {
    const [name, setName] = useState(agentName);
    const [model, setModel] = useState("GPT");
    const [saved, setSaved] = useState(false);

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <div>
                        <CardTitle>
                            General Settings
                        </CardTitle>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            Manage the basic configuration of this agent.
                        </p>
                    </div>
                </CardHeader>

                <div className="space-y-5">
                    <Input
                        label="Agent Name"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                            setSaved(false);
                        }}
                    />

                    <div>
                        <label
                            htmlFor="agent-model"
                            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                        >
                            AI Model
                        </label>

                        <select
                            id="agent-model"
                            value={model}
                            onChange={(event) => {
                                setModel(event.target.value);
                                setSaved(false);
                            }}
                            className="h-12 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
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

                    <Button
                        onClick={() => setSaved(true)}
                    >
                        <Save size={17} />
                        Save Changes
                    </Button>

                    {saved && (
                        <p className="text-sm font-medium text-green-600">
                            Changes saved successfully.
                        </p>
                    )}
                </div>
            </Card>

            <Card>
                <CardHeader>
                    <div>
                        <CardTitle>
                            Danger Zone
                        </CardTitle>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            Irreversible actions for this agent.
                        </p>
                    </div>
                </CardHeader>

                <div className="rounded-[var(--radius-md)] border border-red-200 bg-red-50 p-4">
                    <p className="text-sm font-semibold text-red-700">
                        Delete Agent
                    </p>

                    <p className="mt-1 text-sm leading-6 text-red-600">
                        Permanently remove this agent from the workspace.
                    </p>

                    <button
                        type="button"
                        onClick={onDelete}
                        className="mt-4 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                    >
                        Delete Agent
                    </button>
                </div>
            </Card>
        </div>
    );
}

function ActivityList() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Recent Activity
                </CardTitle>
            </CardHeader>

            <div className="space-y-5">
                {activityItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.id}
                            className="flex items-start gap-3"
                        >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)]">
                                <Icon
                                    size={17}
                                    className="text-[var(--primary)]"
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm font-medium text-[var(--text-primary)]">
                                    {item.title}
                                </p>

                                <p className="mt-1 text-xs text-[var(--text-muted)]">
                                    {item.time}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}

interface MetricCardProps {
    label: string;
    value: string;
    change: string;
    icon: React.ComponentType<{
        size?: number;
        className?: string;
    }>;
}

function MetricCard({
    label,
    value,
    change,
    icon: Icon,
}: MetricCardProps) {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <p className="text-sm text-[var(--text-secondary)]">
                    {label}
                </p>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-light)]">
                    <Icon
                        size={17}
                        className="text-[var(--primary)]"
                    />
                </div>
            </div>

            <div className="mt-4 flex items-end justify-between gap-3">
                <p className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                    {value}
                </p>

                <span className="text-xs font-medium text-green-600">
                    {change}
                </span>
            </div>
        </Card>
    );
}