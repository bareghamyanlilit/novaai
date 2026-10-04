"use client";

import {
    Activity,
    Bot,
    CheckCircle2,
    Clock3,
    Workflow,
} from "lucide-react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useState } from "react";

import { Card } from "@/components/ui/Card";
import {
    analyticsUsageData,
    analyticsUsageSummary,
    type AnalyticsRange,
    agentPerformance,
    recentActivity,
    workflowPerformance,
} from "@/data/analytics";

type AnalyticsTab =
    | "agents"
    | "workflows"
    | "usage";

type StatCardProps = {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
};

function AnalyticsTooltip({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: Array<{
        dataKey?: string;
        value?: number;
    }>;
    label?: string;
}) {
    if (!active || !payload?.length) {
        return null;
    }

    const requests = payload.find(
        (item) => item.dataKey === "requests",
    );

    const successful = payload.find(
        (item) => item.dataKey === "successful",
    );

    return (
        <div className="min-w-[190px] rounded-xl border border-[var(--border)] bg-white p-4 shadow-lg">
            <p className="mb-3 text-xs font-medium text-[var(--text-muted)]">
                {label}
            </p>

            <div className="space-y-2">
                <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                        <span className="text-sm text-[var(--text-secondary)]">
                            Requests
                        </span>
                    </div>

                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {requests?.value?.toLocaleString() ?? "—"}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
                        <span className="text-sm text-[var(--text-secondary)]">
                            Successful
                        </span>
                    </div>

                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {successful?.value?.toLocaleString() ?? "—"}
                    </span>
                </div>
            </div>
        </div>
    );
}

function StatCard({
    title,
    value,
    change,
    icon,
}: StatCardProps) {
    return (
        <Card className="p-5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-[var(--text-secondary)]">
                        {title}
                    </p>

                    <p className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                        {value}
                    </p>

                    <p className="mt-2 text-xs font-medium text-[var(--success)]">
                        {change}
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                    {icon}
                </div>
            </div>
        </Card>
    );
}

export default function AnalyticsPage() {
    const [activeTab, setActiveTab] =
        useState<AnalyticsTab>("agents");

    const [dateRange, setDateRange] =
        useState<AnalyticsRange>("7");

    const currentUsageData =
        analyticsUsageData[dateRange];

    const currentUsageSummary =
        analyticsUsageSummary[dateRange];


    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="text-sm font-medium text-[var(--primary)]">
                        Analytics
                    </p>

                    <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                        Workspace Analytics
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                        Monitor AI usage, agent performance,
                        and workflow activity across your
                        workspace.
                    </p>
                </div>

                <select
                    value={dateRange}
                    onChange={(event) =>
                        setDateRange(
                            event.target.value as AnalyticsRange,
                        )
                    }
                    className="h-11 rounded-xl border border-[var(--border)] bg-white px-4 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--primary)]"
                >
                    <option value="7">
                        Last 7 days
                    </option>

                    <option value="30">
                        Last 30 days
                    </option>

                    <option value="90">
                        Last 90 days
                    </option>
                </select>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Runs"
                    value="4,860"
                    change="+18.2% from last period"
                    icon={<Activity size={20} />}
                />

                <StatCard
                    title="Success Rate"
                    value="94.6%"
                    change="+2.4% from last period"
                    icon={
                        <CheckCircle2 size={20} />
                    }
                />

                <StatCard
                    title="AI Requests"
                    value="12,480"
                    change="+24.8% from last period"
                    icon={<Bot size={20} />}
                />

                <StatCard
                    title="Avg. Response"
                    value="1.8s"
                    change="-12.4% from last period"
                    icon={<Clock3 size={20} />}
                />
            </div>

            {/* Usage Chart */}
            <Card className="p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                            Usage Overview
                        </h2>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            AI requests and successful executions
                            over time.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                            Requests
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
                            Successful
                        </div>
                    </div>
                </div>

                <div className="mt-6 h-[320px] w-full">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <AreaChart
                            data={currentUsageData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: -20,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient
                                    id="requestsGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="#4f46e5"
                                        stopOpacity={0.2}
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor="#4f46e5"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                stroke="#e2e8f0"
                                strokeDasharray="4 4"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#94a3b8",
                                    fontSize: 12,
                                }}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#94a3b8",
                                    fontSize: 12,
                                }}
                            />

                            <Tooltip
                                content={<AnalyticsTooltip />}
                                cursor={{
                                    stroke: "#cbd5e1",
                                    strokeDasharray: "4 4",
                                }}
                            />

                            <Area
                                type="monotone"
                                dataKey="requests"
                                stroke="#4f46e5"
                                strokeWidth={2}
                                fill="url(#requestsGradient)"
                            />

                            <Area
                                type="monotone"
                                dataKey="successful"
                                stroke="#22c55e"
                                strokeWidth={2}
                                fill="none"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Tabs */}
            <Card className="overflow-hidden">
                <div className="border-b border-[var(--border)] px-6 pt-4">
                    <div className="flex gap-6">
                        {[
                            {
                                id: "agents",
                                label: "Agents",
                            },
                            {
                                id: "workflows",
                                label: "Workflows",
                            },
                            {
                                id: "usage",
                                label: "Usage",
                            },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() =>
                                    setActiveTab(
                                        tab.id as AnalyticsTab,
                                    )
                                }
                                className={`border-b-2 pb-3 text-sm font-medium transition-colors ${activeTab ===
                                    tab.id
                                    ? "border-[var(--primary)] text-[var(--primary)]"
                                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    {activeTab === "agents" && (
                        <div className="space-y-4">
                            {agentPerformance.map(
                                (agent) => (
                                    <div
                                        key={agent.name}
                                        className="flex flex-col gap-3 rounded-xl border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                                                <Bot
                                                    size={18}
                                                />
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-[var(--text-primary)]">
                                                    {
                                                        agent.name
                                                    }
                                                </p>

                                                <p className="mt-1 text-xs text-[var(--text-muted)]">
                                                    {
                                                        agent.runs
                                                    }{" "}
                                                    runs
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className="h-full rounded-full bg-[var(--primary)]"
                                                    style={{
                                                        width: `${agent.successRate}%`,
                                                    }}
                                                />
                                            </div>

                                            <span className="w-12 text-right text-sm font-medium text-[var(--text-primary)]">
                                                {
                                                    agent.successRate
                                                }
                                                %
                                            </span>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    )}

                    {activeTab === "workflows" && (
                        <div className="space-y-4">
                            {workflowPerformance.map(
                                (workflow) => (
                                    <div
                                        key={
                                            workflow.name
                                        }
                                        className="flex flex-col gap-3 rounded-xl border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                                                <Workflow
                                                    size={18}
                                                />
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-[var(--text-primary)]">
                                                    {
                                                        workflow.name
                                                    }
                                                </p>

                                                <p className="mt-1 text-xs text-[var(--text-muted)]">
                                                    {
                                                        workflow.runs
                                                    }{" "}
                                                    runs
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className="h-full rounded-full bg-[var(--primary)]"
                                                    style={{
                                                        width: `${workflow.successRate}%`,
                                                    }}
                                                />
                                            </div>

                                            <span className="w-12 text-right text-sm font-medium text-[var(--text-primary)]">
                                                {workflow.successRate}%
                                            </span>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    )}

                    {activeTab === "usage" && (
                        <div>
                            <div className="mb-5">
                                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                                    Usage Summary
                                </h3>

                                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                    Usage for the selected time period.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-xl bg-slate-50 p-5">
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        Requests
                                    </p>

                                    <p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
                                        {currentUsageSummary.requests.toLocaleString()}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-5">
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        Successful
                                    </p>

                                    <p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
                                        {currentUsageSummary.successful.toLocaleString()}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-5">
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        Failed
                                    </p>

                                    <p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
                                        {currentUsageSummary.failed.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
                <div>
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                        Recent Activity
                    </h2>

                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Latest activity across your workspace.
                    </p>
                </div>

                <div className="mt-6 divide-y divide-[var(--border)]">
                    {recentActivity.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-center gap-4 py-4"
                        >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[var(--text-secondary)]">
                                {activity.type ===
                                    "agent" ? (
                                    <Bot size={16} />
                                ) : (
                                    <Workflow
                                        size={16}
                                    />
                                )}
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                                    {activity.title}
                                </p>

                                <p className="mt-1 text-xs text-[var(--text-muted)]">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}