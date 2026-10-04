import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { AgentCard } from "@/components/dashboard/AgentCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatCard } from "@/components/dashboard/StatCard";
import { UsageChart } from "@/components/dashboard/UsageChart";
import { Button } from "@/components/ui/Button";
import { agents } from "@/data/agents";
import { dashboardStats } from "@/data/analytics";

export default function DashboardPage() {
    const featuredAgents = agents.slice(0, 3);

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-[var(--text-secondary)]">
                        Welcome back
                    </p>

                    <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                        Your AI Workspace
                    </h1>
                </div>

                <Link href="/dashboard/agents">
                    <Button>
                        Manage Agents
                        <ArrowRight size={17} />
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {dashboardStats.map((stat) => (
                    <StatCard
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                        change={stat.change}
                    />
                ))}
            </section>

            {/* Chart + Activity */}
            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
                <UsageChart />
                <RecentActivity />
            </section>

            {/* Agents */}
            <section className="mt-8">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                            Your Agents
                        </h2>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            Monitor your most active AI agents.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/agents"
                        className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
                    >
                        View all
                    </Link>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {featuredAgents.map((agent) => (
                        <AgentCard
                            key={agent.id}
                            agent={agent}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}