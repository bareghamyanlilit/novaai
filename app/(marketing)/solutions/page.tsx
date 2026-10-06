import {
    ArrowRight,
    BarChart3,
    Bot,
    CheckCircle2,
    Headphones,
    Megaphone,
    Search,
    Settings2,
    Sparkles,
    Workflow,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
    title: "Solutions",
    description:
        "Explore AI-powered workflows for customer support, marketing, operations, and research teams.",
};
const solutions = [
    {
        icon: Headphones,
        title: "Customer Support",
        description:
            "Help support teams handle repetitive requests, organize conversations, and keep customer workflows moving.",
        tasks: [
            "Answer common questions",
            "Summarize conversations",
            "Route support requests",
        ],
    },
    {
        icon: Megaphone,
        title: "Marketing",
        description:
            "Give marketing teams AI agents for research, content workflows, campaign preparation, and analysis.",
        tasks: [
            "Research topics",
            "Create content briefs",
            "Analyze campaign data",
        ],
    },
    {
        icon: Settings2,
        title: "Operations",
        description:
            "Automate recurring internal processes and connect AI agents to structured workflows.",
        tasks: [
            "Process repetitive tasks",
            "Coordinate workflows",
            "Track outcomes",
        ],
    },
    {
        icon: Search,
        title: "Research",
        description:
            "Turn large amounts of information into organized summaries, reports, and useful insights.",
        tasks: [
            "Collect information",
            "Summarize findings",
            "Create structured reports",
        ],
    },
];

const benefits = [
    "Give every team a specialized AI workspace",
    "Standardize repeatable AI workflows",
    "Keep prompts and knowledge organized",
    "Monitor agent activity and performance",
    "Customize the interface for your product",
    "Start with frontend demo data and connect your backend later",
];

export default function SolutionsPage() {
    return (
        <>
            <section className="border-b border-[var(--border)] bg-[var(--surface-secondary)]">
                <div className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-28">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-light)] px-3 py-1.5 text-sm font-medium text-[var(--primary)]">
                            <Sparkles size={15} />
                            AI solutions
                        </div>

                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl">
                            AI workflows built around the way your team works.
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                            Create focused AI experiences for support,
                            marketing, operations, research, and the teams
                            behind your product.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                href="/register"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
                            >
                                Get Started
                                <ArrowRight size={17} />
                            </Link>

                            <Link
                                href="/dashboard"
                                className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-white px-6 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-secondary)]"
                            >
                                Explore Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-24 md:py-28">
                <div className="mx-auto max-w-[1280px] px-5 md:px-10">
                    <div className="max-w-2xl">
                        <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                            Built for teams
                        </span>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            One workspace, different jobs.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
                            Adapt the same AI workspace to different teams
                            and workflows without rebuilding the product
                            experience from scratch.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2">
                        {solutions.map((solution) => {
                            const Icon = solution.icon;

                            return (
                                <div
                                    key={solution.title}
                                    className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                                        <Icon size={21} />
                                    </div>

                                    <h3 className="mt-5 text-lg font-semibold text-[var(--text-primary)]">
                                        {solution.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                                        {solution.description}
                                    </p>

                                    <div className="mt-5 space-y-2.5">
                                        {solution.tasks.map((task) => (
                                            <div
                                                key={task}
                                                className="flex items-center gap-2.5"
                                            >
                                                <CheckCircle2
                                                    size={16}
                                                    className="shrink-0 text-[var(--success)]"
                                                />

                                                <span className="text-sm text-[var(--text-secondary)]">
                                                    {task}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-[var(--surface-secondary)] py-24 md:py-28">
                <div className="mx-auto grid max-w-[1280px] gap-14 px-5 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                    <div>
                        <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                            Workflow example
                        </span>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            Turn a simple request into an automated workflow.
                        </h2>

                        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                            Combine agents, knowledge, prompts, and actions
                            into repeatable workflows that your team can
                            monitor and improve.
                        </p>

                        <div className="mt-8 space-y-4">
                            {[
                                [
                                    "01",
                                    "Receive a request",
                                    "A new task enters the workspace.",
                                ],
                                [
                                    "02",
                                    "AI agent processes it",
                                    "The right agent uses its instructions and knowledge.",
                                ],
                                [
                                    "03",
                                    "Workflow completes",
                                    "The result is delivered and activity is tracked.",
                                ],
                            ].map(([number, title, description]) => (
                                <div
                                    key={number}
                                    className="flex gap-4"
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)] text-xs font-bold text-[var(--primary)]">
                                        {number}
                                    </span>

                                    <div>
                                        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                                            {title}
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-6">
                        <div className="flex items-center justify-between border-b border-[var(--border)] pb-5">
                            <div>
                                <p className="text-sm font-semibold text-[var(--text-primary)]">
                                    Campaign research workflow
                                </p>

                                <p className="mt-1 text-xs text-[var(--text-muted)]">
                                    Marketing team
                                </p>
                            </div>

                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                                Completed
                            </span>
                        </div>

                        <div className="mt-5 space-y-3">
                            {[
                                {
                                    icon: Bot,
                                    title: "Research Agent",
                                    text: "Collected relevant information",
                                },
                                {
                                    icon: Search,
                                    title: "Knowledge Base",
                                    text: "Added internal product context",
                                },
                                {
                                    icon: Workflow,
                                    title: "Workflow",
                                    text: "Generated campaign brief",
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="flex items-center gap-3 rounded-xl border border-[var(--border)] p-4"
                                    >
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                                            <Icon size={17} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-[var(--text-primary)]">
                                                {item.title}
                                            </p>

                                            <p className="mt-1 text-xs text-[var(--text-muted)]">
                                                {item.text}
                                            </p>
                                        </div>

                                        <CheckCircle2
                                            size={17}
                                            className="shrink-0 text-emerald-500"
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-4 flex items-center justify-between rounded-xl bg-[var(--surface-secondary)] p-4">
                            <div className="flex items-center gap-2">
                                <BarChart3
                                    size={17}
                                    className="text-[var(--primary)]"
                                />

                                <span className="text-xs font-medium text-[var(--text-secondary)]">
                                    Workflow success rate
                                </span>
                            </div>

                            <span className="text-sm font-semibold text-[var(--text-primary)]">
                                96.4%
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-24 md:py-28">
                <div className="mx-auto max-w-[1280px] px-5 md:px-10">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                            Why NovaLiAi
                        </span>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            Designed to scale with your AI product.
                        </h2>
                    </div>

                    <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
                        {benefits.map((benefit) => (
                            <div
                                key={benefit}
                                className="flex items-start gap-3 rounded-xl border border-[var(--border)] p-4"
                            >
                                <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0 text-[var(--success)]"
                                />

                                <span className="text-sm leading-6 text-[var(--text-secondary)]">
                                    {benefit}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[var(--primary)] py-24">
                <div className="mx-auto max-w-3xl px-5 text-center md:px-10">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Build AI workflows around your team.
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-indigo-100">
                        Start with the NovaLiAi template and adapt the
                        experience to your own product, users, and AI
                        infrastructure.
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