import { Metadata } from "next";
export const metadata: Metadata = {
    title: "AI Agents",
    description:
        "Build and manage AI agents for support, marketing, research, and operations.",
};

import {
    ArrowRight,
    BarChart3,
    Bot,
    Brain,
    CheckCircle2,
    Clock3,
    MessageSquare,
    Play,
    Settings2,
    Sparkles,
    Workflow,
} from "lucide-react";
import Link from "next/link";

const agentTypes = [
    {
        icon: MessageSquare,
        title: "Support Agent",
        description:
            "Handle repetitive customer questions and keep support workflows moving.",
        tasks: ["Answer questions", "Route requests", "Summarize conversations"],
    },
    {
        icon: Sparkles,
        title: "Marketing Agent",
        description:
            "Assist your team with research, content workflows, and campaign tasks.",
        tasks: ["Research topics", "Create briefs", "Analyze campaigns"],
    },
    {
        icon: Brain,
        title: "Research Agent",
        description:
            "Organize information and turn complex research tasks into structured workflows.",
        tasks: ["Gather information", "Summarize findings", "Create reports"],
    },
    {
        icon: Workflow,
        title: "Operations Agent",
        description:
            "Automate recurring internal processes and coordinate multi-step tasks.",
        tasks: ["Run workflows", "Process tasks", "Track outcomes"],
    },
];

const capabilities = [
    "Custom instructions and system prompts",
    "Connected knowledge and context",
    "Reusable workflow actions",
    "Activity and performance monitoring",
    "Team-ready agent organization",
    "Frontend demo data for rapid customization",
];

export default function AgentsPage() {
    return (
        <>
            <section className="border-b border-[var(--border)] bg-[var(--surface-secondary)]">
                <div className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-28">
                    <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-light)] px-3 py-1.5 text-sm font-medium text-[var(--primary)]">
                                <Bot size={15} />
                                AI Agents
                            </div>

                            <h1 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl">
                                Build AI agents that work with your team.
                            </h1>

                            <p className="mt-6 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                                Create specialized agents, give them the
                                right context, connect workflows, and monitor
                                how they perform.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/register"
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
                                >
                                    Create an Agent
                                    <ArrowRight size={17} />
                                </Link>

                                <Link
                                    href="/dashboard/agents"
                                    className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-white px-6 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-secondary)]"
                                >
                                    Explore Agents
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-6">
                            <div className="flex items-center justify-between border-b border-[var(--border)] pb-5">
                                <div>
                                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                                        Marketing Agent
                                    </p>

                                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                                        Agent workspace
                                    </p>
                                </div>

                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Active
                                </span>
                            </div>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-xl border border-[var(--border)] p-4">
                                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                        <Settings2 size={16} />
                                        <span className="text-xs">
                                            Configuration
                                        </span>
                                    </div>

                                    <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
                                        Marketing specialist
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                                        Brand-aware content and research
                                        workflows.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-[var(--border)] p-4">
                                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                        <Brain size={16} />
                                        <span className="text-xs">
                                            Knowledge
                                        </span>
                                    </div>

                                    <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
                                        24 sources
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                                        Product docs, brand guidelines, and
                                        research.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 rounded-xl bg-[var(--surface-secondary)] p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                                        <Play size={16} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-[var(--text-primary)]">
                                            Weekly campaign research
                                        </p>

                                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                                            Workflow completed successfully
                                        </p>
                                    </div>

                                    <CheckCircle2
                                        size={18}
                                        className="text-emerald-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-24 md:py-28">
                <div className="mx-auto max-w-[1280px] px-5 md:px-10">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                            Agent types
                        </span>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            Start with an agent built around the job.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
                            Use focused agents for different parts of your
                            team&apos;s workflow instead of forcing one assistant
                            to do everything.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2">
                        {agentTypes.map((agent) => {
                            const Icon = agent.icon;

                            return (
                                <div
                                    key={agent.title}
                                    className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                                            <Icon size={21} />
                                        </div>

                                        <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]">
                                            AI Agent
                                        </span>
                                    </div>

                                    <h3 className="mt-5 text-lg font-semibold text-[var(--text-primary)]">
                                        {agent.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                                        {agent.description}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {agent.tasks.map((task) => (
                                            <span
                                                key={task}
                                                className="rounded-lg bg-[var(--surface-secondary)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
                                            >
                                                {task}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-[var(--surface-secondary)] py-24 md:py-28">
                <div className="mx-auto grid max-w-[1280px] gap-14 px-5 md:px-10 lg:grid-cols-2 lg:items-center">
                    <div>
                        <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                            Agent lifecycle
                        </span>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            From idea to reliable AI workflow.
                        </h2>

                        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                            Give each agent a clear purpose, the context it
                            needs, and the actions required to complete its
                            work.
                        </p>

                        <div className="mt-8 space-y-5">
                            {[
                                {
                                    number: "01",
                                    title: "Define the role",
                                    description:
                                        "Set the agent&apos;s purpose, instructions, and expected behavior.",
                                },
                                {
                                    number: "02",
                                    title: "Add context",
                                    description:
                                        "Connect knowledge and information that helps the agent make better decisions.",
                                },
                                {
                                    number: "03",
                                    title: "Connect actions",
                                    description:
                                        "Use workflows to turn the agent into an active part of your process.",
                                },
                            ].map((step) => (
                                <div
                                    key={step.number}
                                    className="flex gap-4"
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)] text-xs font-bold text-[var(--primary)]">
                                        {step.number}
                                    </span>

                                    <div>
                                        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                                            {step.title}
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-[var(--text-primary)]">
                                    Agent activity
                                </p>

                                <p className="mt-1 text-xs text-[var(--text-muted)]">
                                    Last 24 hours
                                </p>
                            </div>

                            <BarChart3
                                size={19}
                                className="text-[var(--primary)]"
                            />
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                            {[
                                ["8,420", "Requests"],
                                ["96.2%", "Success"],
                                ["1.4s", "Response"],
                            ].map(([value, label]) => (
                                <div
                                    key={label}
                                    className="rounded-xl border border-[var(--border)] p-3"
                                >
                                    <p className="text-lg font-semibold text-[var(--text-primary)]">
                                        {value}
                                    </p>

                                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 rounded-xl border border-[var(--border)] p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                    <CheckCircle2 size={17} />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-[var(--text-primary)]">
                                        Research workflow completed
                                    </p>

                                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                                        Completed 8 minutes ago
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 flex items-center gap-3 rounded-xl bg-[var(--surface-secondary)] p-4">
                            <Clock3
                                size={17}
                                className="text-[var(--text-muted)]"
                            />

                            <p className="text-xs leading-5 text-[var(--text-secondary)]">
                                Performance data can be connected to your own
                                backend in production.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-24 md:py-28">
                <div className="mx-auto max-w-[1280px] px-5 md:px-10">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                            Capabilities
                        </span>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            Designed for real AI workflows.
                        </h2>
                    </div>

                    <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
                        {capabilities.map((capability) => (
                            <div
                                key={capability}
                                className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-white p-4"
                            >
                                <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0 text-[var(--success)]"
                                />

                                <span className="text-sm leading-6 text-[var(--text-secondary)]">
                                    {capability}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[var(--primary)] py-24">
                <div className="mx-auto max-w-3xl px-5 text-center md:px-10">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Build your first AI agent today.
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-indigo-100">
                        Start with the NovaAI interface and customize the
                        agent experience for your own product.
                    </p>

                    <div className="mt-8">
                        <Link
                            href="/register"
                            className="inline-flex h-12 items-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-[var(--primary)] transition hover:bg-indigo-50"
                        >
                            Get Started
                            <ArrowRight size={17} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}