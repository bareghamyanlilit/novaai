import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Features",
    description:
        "Explore AI agents, prompt libraries, knowledge bases, workflows, AI chat, and analytics in NovaLiAi.",
};

import {
    ArrowRight,
    BarChart3,
    Bot,
    Brain,
    CheckCircle2,
    MessageSquare,
    Workflow,
    Zap,
} from "lucide-react";
import Link from "next/link";

const features = [
    {
        icon: Bot,
        title: "AI Agents",
        description:
            "Create specialized AI agents for support, research, marketing, operations, and more.",
    },
    {
        icon: Brain,
        title: "Knowledge Base",
        description:
            "Organize the information your agents need and give every workflow a reliable knowledge layer.",
    },
    {
        icon: Workflow,
        title: "Workflow Automation",
        description:
            "Connect tasks and actions into repeatable workflows that reduce manual work.",
    },
    {
        icon: MessageSquare,
        title: "AI Chat",
        description:
            "Interact with your agents through a focused workspace built for everyday AI tasks.",
    },
    {
        icon: Zap,
        title: "Prompt Library",
        description:
            "Create, organize, and reuse high-quality prompts across your team and workflows.",
    },
    {
        icon: BarChart3,
        title: "Analytics",
        description:
            "Track requests, success rates, response times, and agent activity from one dashboard.",
    },
];

const benefits = [
    "Reusable AI agent configurations",
    "Centralized prompts and knowledge",
    "Workflow-ready interface",
    "Team collaboration tools",
    "Responsive dashboard experience",
    "Frontend-only demo data included",
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-white">
            <section className="border-b border-[var(--border)] bg-[var(--surface-secondary)]">
                <div className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-28">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-light)] px-3 py-1.5 text-sm font-medium text-[var(--primary)]">
                            <Zap size={15} />
                            Powerful AI workspace
                        </div>

                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl">
                            Everything you need to build with AI.
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                            NovaLiAi brings agents, prompts, knowledge,
                            automation, chat, and analytics together in one
                            modern workspace.
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
                            Core features
                        </span>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            A complete workspace for modern AI products.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
                            Build your product around a flexible interface
                            designed for AI agents, automation, and
                            collaboration.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="group rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                                        <Icon size={21} />
                                    </div>

                                    <h3 className="mt-5 text-lg font-semibold text-[var(--text-primary)]">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                                        {feature.description}
                                    </p>
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
                            Built for teams
                        </span>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            Turn AI capabilities into a repeatable workflow.
                        </h2>

                        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                            NovaLiAi is structured around the way modern teams
                            actually work with AI: create agents, provide
                            knowledge, automate tasks, and measure results.
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {benefits.map((benefit) => (
                                <div
                                    key={benefit}
                                    className="flex items-start gap-3"
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

                    <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-6">
                        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                            <div>
                                <p className="text-sm font-semibold text-[var(--text-primary)]">
                                    AI Workspace
                                </p>

                                <p className="mt-1 text-xs text-[var(--text-muted)]">
                                    Agent performance
                                </p>
                            </div>

                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                                Live
                            </span>
                        </div>

                        <div className="mt-5 space-y-3">
                            {[
                                ["Marketing Agent", "8,420 requests", "96.2%"],
                                ["Support Agent", "6,180 requests", "94.8%"],
                                ["Research Agent", "3,820 requests", "92.4%"],
                            ].map(([name, requests, success]) => (
                                <div
                                    key={name}
                                    className="rounded-xl border border-[var(--border)] p-4"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                                                <Bot size={17} />
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-[var(--text-primary)]">
                                                    {name}
                                                </p>

                                                <p className="mt-1 text-xs text-[var(--text-muted)]">
                                                    {requests}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="text-xs font-semibold text-emerald-600">
                                            {success}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-24 md:py-28">
                <div className="mx-auto max-w-[900px] px-5 text-center md:px-10">
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                        Ready to build your AI workspace?
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
                        Start with the NovaLiAi template and customize it for
                        your own AI product.
                    </p>

                    <div className="mt-8">
                        <Link
                            href="/register"
                            className="inline-flex h-12 items-center gap-2 rounded-lg bg-[var(--primary)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
                        >
                            Get Started
                            <ArrowRight size={17} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}