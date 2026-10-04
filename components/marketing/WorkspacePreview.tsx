import {
    Activity,
    Bot,
    CheckCircle2,
    Clock3,
    MoreHorizontal,
    Sparkles,
} from "lucide-react";

const agents = [
    {
        name: "Marketing Agent",
        status: "Active",
        tasks: "1,284 tasks",
    },
    {
        name: "Support Agent",
        status: "Active",
        tasks: "942 tasks",
    },
    {
        name: "Research Agent",
        status: "Training",
        tasks: "618 tasks",
    },
];

export function WorkspacePreview() {
    return (
        <section className="bg-[var(--surface-secondary)] py-24 md:py-28">
            <div className="mx-auto max-w-[1280px] px-5 md:px-10">
                <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-light)] px-3 py-1.5 text-sm font-medium text-[var(--primary)]">
                            <Sparkles size={15} />
                            AI Workspace
                        </div>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            Everything your AI team needs in one workspace.
                        </h2>

                        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                            Manage your agents, monitor workflows, explore
                            performance, and collaborate with your team from
                            one centralized workspace.
                        </p>

                        <div className="mt-8 space-y-5">
                            <div className="flex gap-4">
                                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[var(--primary)] shadow-sm">
                                    <Bot size={18} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[var(--text-primary)]">
                                        Manage AI agents
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                                        Create specialized agents and monitor
                                        their activity from a single place.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[var(--primary)] shadow-sm">
                                    <Activity size={18} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[var(--text-primary)]">
                                        Track performance
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                                        Understand usage, success rates, and
                                        workflow performance at a glance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[var(--border)] bg-white p-3 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                        <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                            <div className="flex h-14 items-center justify-between border-b border-[var(--border)] px-5">
                                <div>
                                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                                        AI Agents
                                    </p>

                                    <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                                        Manage your intelligent assistants
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="rounded-lg bg-[var(--primary)] px-3.5 py-2 text-xs font-semibold text-white"
                                >
                                    Create Agent
                                </button>
                            </div>

                            <div className="grid gap-4 bg-slate-50 p-5 sm:grid-cols-2">
                                {agents.map((agent) => (
                                    <div
                                        key={agent.name}
                                        className="rounded-xl border border-[var(--border)] bg-white p-4"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                                                <Bot size={19} />
                                            </div>

                                            <button
                                                type="button"
                                                aria-label={`More options for ${agent.name}`}
                                                className="text-[var(--text-muted)]"
                                            >
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>

                                        <h4 className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
                                            {agent.name}
                                        </h4>

                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                                                {agent.status === "Active" ? (
                                                    <CheckCircle2 size={14} />
                                                ) : (
                                                    <Clock3 size={14} />
                                                )}

                                                {agent.status}
                                            </span>

                                            <span className="text-xs text-[var(--text-muted)]">
                                                {agent.tasks}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-[var(--border)] bg-white p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)]">
                                            Monthly requests
                                        </p>

                                        <p className="mt-1 text-xl font-semibold text-[var(--text-primary)]">
                                            18,420
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-[var(--text-muted)]">
                                            Success rate
                                        </p>

                                        <p className="mt-1 text-xl font-semibold text-emerald-600">
                                            94.6%
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div className="h-full w-[82%] rounded-full bg-[var(--primary)]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}