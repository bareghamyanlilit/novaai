import {
    ArrowRight,
    Bot,
    CheckCircle2,
    Code2,
    Layers3,
    Sparkles,
    Zap,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about NovaAI and the ideas behind its AI agents and automation workspace.",
};

const values = [
    {
        icon: Sparkles,
        title: "Clarity first",
        description:
            "Every part of the workspace is designed to make complex AI workflows easier to understand and manage.",
    },
    {
        icon: Zap,
        title: "Built for speed",
        description:
            "Reusable components and focused workflows help teams move from an idea to an AI-powered workflow faster.",
    },
    {
        icon: Layers3,
        title: "Made to scale",
        description:
            "A flexible architecture makes it easy to connect your own APIs, services, data sources, and authentication.",
    },
];

const capabilities = [
    "AI agent management",
    "Prompt and knowledge libraries",
    "Workflow automation",
    "Team collaboration",
    "Usage analytics",
    "Billing management",
];

export default function AboutPage() {
    return (
        <div>
            {/* Hero */}
            <section className="border-b border-[var(--border)] bg-white">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-3.5 py-2 text-sm font-medium text-[var(--text-secondary)]">
                            <Bot
                                size={16}
                                className="text-[var(--primary)]"
                            />
                            About NovaAI
                        </div>

                        <h1 className="mt-7 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
                            A better workspace for building with AI.
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                            NovaAI is a modern frontend template for teams
                            building AI-powered products, agents, and
                            automated workflows.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="bg-[var(--surface-secondary)]">
                <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-28">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                            Our approach
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            Turn complex AI products into simple experiences.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
                            AI products can quickly become difficult to
                            navigate when agents, prompts, knowledge, tools,
                            workflows, and analytics live in different places.
                        </p>

                        <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                            NovaAI brings those experiences together in one
                            structured workspace. The result is a clean
                            foundation that can be adapted to many different
                            AI SaaS products.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {capabilities.map((capability) => (
                                <div
                                    key={capability}
                                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-3.5 py-2.5 text-sm font-medium text-[var(--text-secondary)]"
                                >
                                    <CheckCircle2
                                        size={16}
                                        className="text-[var(--success)]"
                                    />
                                    {capability}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Workspace visual */}
                    <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:p-6">
                        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-[var(--text-muted)]">
                                        AI WORKSPACE
                                    </p>

                                    <h3 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
                                        Agent performance
                                    </h3>
                                </div>

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                                    <Bot size={18} />
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <div className="rounded-xl border border-[var(--border)] bg-white p-4">
                                    <p className="text-xs text-[var(--text-muted)]">
                                        Active agents
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
                                        12
                                    </p>

                                    <p className="mt-1 text-xs text-emerald-600">
                                        +18.2% this month
                                    </p>
                                </div>

                                <div className="rounded-xl border border-[var(--border)] bg-white p-4">
                                    <p className="text-xs text-[var(--text-muted)]">
                                        Success rate
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
                                        94.6%
                                    </p>

                                    <p className="mt-1 text-xs text-emerald-600">
                                        +3.4% this month
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 rounded-xl border border-[var(--border)] bg-white p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                                        Recent workflows
                                    </p>

                                    <span className="text-xs text-[var(--text-muted)]">
                                        Last 7 days
                                    </span>
                                </div>

                                <div className="mt-4 space-y-3">
                                    {[
                                        "Customer Support Agent",
                                        "Research Assistant",
                                        "Lead Qualification",
                                    ].map((name, index) => (
                                        <div
                                            key={name}
                                            className="flex items-center justify-between rounded-lg bg-[var(--surface-secondary)] px-3 py-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[var(--primary)] shadow-sm">
                                                    {index === 0 ? (
                                                        <Bot size={15} />
                                                    ) : index === 1 ? (
                                                        <Sparkles size={15} />
                                                    ) : (
                                                        <Zap size={15} />
                                                    )}
                                                </div>

                                                <span className="text-sm font-medium text-[var(--text-primary)]">
                                                    {name}
                                                </span>
                                            </div>

                                            <span className="text-xs font-medium text-emerald-600">
                                                Active
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                            What we value
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            Designed around the way modern teams work.
                        </h2>

                        <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                            The template focuses on practical product
                            experiences instead of visual complexity.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {values.map((value) => {
                            const Icon = value.icon;

                            return (
                                <div
                                    key={value.title}
                                    className="rounded-2xl border border-[var(--border)] bg-white p-6 transition-shadow hover:shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                                        <Icon size={20} />
                                    </div>

                                    <h3 className="mt-5 text-lg font-semibold text-[var(--text-primary)]">
                                        {value.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Template architecture */}
            <section className="bg-[var(--surface-secondary)]">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
                    <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                        <div>
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                                <Code2 size={20} />
                            </div>

                            <h2 className="mt-5 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                                A flexible foundation for your own product.
                            </h2>

                            <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
                                NovaAI is intentionally built as a frontend
                                template. Connect your preferred AI provider,
                                authentication system, database, billing
                                service, or backend without rebuilding the
                                interface from scratch.
                            </p>

                            <Link
                                href="/features"
                                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]"
                            >
                                Explore features
                                <ArrowRight size={17} />
                            </Link>
                        </div>

                        <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                            <div className="space-y-3">
                                {[
                                    ["Next.js", "Application framework"],
                                    ["TypeScript", "Type-safe development"],
                                    ["Tailwind CSS", "Utility-first styling"],
                                    ["Lucide", "Consistent icon system"],
                                    ["Recharts", "Analytics visualizations"],
                                ].map(([name, description]) => (
                                    <div
                                        key={name}
                                        className="flex items-center justify-between rounded-xl border border-[var(--border)] px-4 py-3.5"
                                    >
                                        <div>
                                            <p className="text-sm font-semibold text-[var(--text-primary)]">
                                                {name}
                                            </p>

                                            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                                                {description}
                                            </p>
                                        </div>

                                        <CheckCircle2
                                            size={17}
                                            className="text-[var(--success)]"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
                    <div className="overflow-hidden rounded-3xl bg-[var(--primary)] px-6 py-14 text-center sm:px-10">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Build your next AI product faster.
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                            Start with a polished foundation and customize
                            NovaAI around your product, brand, and workflow.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                href="/register"
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[var(--primary)] transition hover:bg-indigo-50"
                            >
                                Get started
                                <ArrowRight size={17} />
                            </Link>

                            <Link
                                href="/features"
                                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/30 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                Explore features
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}