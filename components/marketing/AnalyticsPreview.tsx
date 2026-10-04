"use client";

import {
    Activity,
    ArrowUpRight,
    CheckCircle2,
    Clock3,
} from "lucide-react";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const usageData = [
    { day: "Mon", requests: 420 },
    { day: "Tue", requests: 580 },
    { day: "Wed", requests: 510 },
    { day: "Thu", requests: 760 },
    { day: "Fri", requests: 690 },
    { day: "Sat", requests: 840 },
    { day: "Sun", requests: 920 },
];

const stats = [
    {
        label: "Total requests",
        value: "18,420",
        change: "+24.8%",
        icon: Activity,
    },
    {
        label: "Success rate",
        value: "94.6%",
        change: "+2.4%",
        icon: CheckCircle2,
    },
    {
        label: "Avg. response",
        value: "1.8s",
        change: "-12.4%",
        icon: Clock3,
    },
];

export function AnalyticsPreview() {
    return (
        <section className="bg-white py-24 md:py-28">
            <div className="mx-auto max-w-[1280px] px-5 md:px-10">
                <div className="grid items-center gap-14 lg:grid-cols-[0.75fr_1.25fr]">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-light)] px-3 py-1.5 text-sm font-medium text-[var(--primary)]">
                            <Activity size={15} />
                            Analytics
                        </div>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            Understand how your AI workspace performs.
                        </h2>

                        <p className="mt-5 max-w-lg text-base leading-7 text-[var(--text-secondary)]">
                            Monitor usage, success rates, response times, and
                            agent activity with clear analytics designed to
                            help your team make better decisions.
                        </p>

                        <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                            Explore analytics
                            <ArrowUpRight size={16} />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                                    Workspace analytics
                                </h3>

                                <p className="mt-1 text-xs text-[var(--text-muted)]">
                                    AI requests over the last 7 days
                                </p>
                            </div>

                            <div className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">
                                Last 7 days
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            {stats.map((stat) => {
                                const Icon = stat.icon;

                                return (
                                    <div
                                        key={stat.label}
                                        className="rounded-xl border border-[var(--border)] p-4"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-[var(--text-muted)]">
                                                {stat.label}
                                            </span>

                                            <Icon
                                                size={16}
                                                className="text-[var(--primary)]"
                                            />
                                        </div>

                                        <p className="mt-2 text-xl font-semibold text-[var(--text-primary)]">
                                            {stat.value}
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-emerald-600">
                                            {stat.change}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 h-[250px] w-full">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <AreaChart data={usageData}>
                                    <defs>
                                        <linearGradient
                                            id="usageGradient"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#4F46E5"
                                                stopOpacity={0.2}
                                            />

                                            <stop
                                                offset="100%"
                                                stopColor="#4F46E5"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>

                                    <XAxis
                                        dataKey="day"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fontSize: 12,
                                            fill: "#94A3B8",
                                        }}
                                    />

                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fontSize: 12,
                                            fill: "#94A3B8",
                                        }}
                                        width={35}
                                    />

                                    <Tooltip
                                        cursor={{
                                            stroke: "#CBD5E1",
                                        }}
                                        contentStyle={{
                                            border: "1px solid #E2E8F0",
                                            borderRadius: "10px",
                                            boxShadow:
                                                "0 10px 25px rgba(0,0,0,0.08)",
                                        }}
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="requests"
                                        stroke="#4F46E5"
                                        strokeWidth={2}
                                        fill="url(#usageGradient)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}