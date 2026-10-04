import {
    BarChart3,
    Bot,
    Brain,
    MessageSquare,
    Workflow,
    Zap,
} from "lucide-react";

const features = [
    {
        icon: Bot,
        title: "AI Agents",
        description:
            "Create specialized AI agents that handle repetitive tasks and support your team&apos;s workflow.",
    },
    {
        icon: Zap,
        title: "Prompt Library",
        description:
            "Organize reusable prompts and give your team a faster way to work with AI.",
    },
    {
        icon: Brain,
        title: "Knowledge Base",
        description:
            "Connect documents, websites, and FAQs to give your AI agents the context they need.",
    },
    {
        icon: Workflow,
        title: "Automated Workflows",
        description:
            "Build visual workflows that connect triggers, AI agents, conditions, and actions.",
    },
    {
        icon: MessageSquare,
        title: "AI Chat",
        description:
            "Work directly with your AI assistants through a clean and focused conversation workspace.",
    },
    {
        icon: BarChart3,
        title: "Analytics",
        description:
            "Track requests, agent performance, workflow success rates, and usage from one dashboard.",
    },
];

export function Features() {
    return (
        <section className="bg-white py-24 md:py-28">
            <div className="mx-auto max-w-[1280px] px-5 md:px-10">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                        Everything you need
                    </span>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
                        One workspace for your AI operations
                    </h2>

                    <p className="mt-5 text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                        Build, manage, automate, and monitor your AI
                        workflows without switching between multiple tools.
                    </p>
                </div>

                <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <article
                                key={feature.title}
                                className="group rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-7 transition duration-200 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] transition group-hover:bg-[var(--primary)] group-hover:text-white">
                                    <Icon size={22} strokeWidth={1.8} />
                                </div>

                                <h3 className="mt-6 text-lg font-semibold text-[var(--text-primary)]">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                                    {feature.description}
                                </p>

                                <div className="mt-6 h-px w-0 bg-[var(--primary)] transition-all duration-300 group-hover:w-10" />
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}