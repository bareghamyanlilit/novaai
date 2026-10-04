import {
    BookOpen,
    FileText,
    MessageSquare,
    Sparkles,
    Workflow,
} from "lucide-react";

const tools = [
    {
        icon: MessageSquare,
        title: "AI Chat",
        description:
            "Work with your AI assistants in focused conversations and turn ideas into useful outputs.",
    },
    {
        icon: FileText,
        title: "Prompt Library",
        description:
            "Save, organize, and reuse your best prompts across different agents and workflows.",
    },
    {
        icon: BookOpen,
        title: "Knowledge Base",
        description:
            "Give your agents access to structured information from documents, websites, and FAQs.",
    },
    {
        icon: Workflow,
        title: "Workflow Builder",
        description:
            "Connect triggers, conditions, agents, and actions to create repeatable automation.",
    },
];

export function AITools() {
    return (
        <section className="bg-[var(--surface-secondary)] py-24 md:py-28">
            <div className="mx-auto max-w-[1280px] px-5 md:px-10">
                <div className="grid items-start gap-14 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="lg:sticky lg:top-24">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-light)] px-3 py-1.5 text-sm font-medium text-[var(--primary)]">
                            <Sparkles size={15} />
                            AI Toolkit
                        </div>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            Powerful tools for every stage of your AI workflow.
                        </h2>

                        <p className="mt-5 max-w-lg text-base leading-7 text-[var(--text-secondary)]">
                            NovaAI brings the tools your team needs together,
                            so you can move from a simple idea to a complete
                            automated workflow.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {tools.map((tool) => {
                            const Icon = tool.icon;

                            return (
                                <article
                                    key={tool.title}
                                    className="group rounded-2xl border border-[var(--border)] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] transition group-hover:bg-[var(--primary)] group-hover:text-white">
                                        <Icon
                                            size={20}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <h3 className="mt-6 text-lg font-semibold text-[var(--text-primary)]">
                                        {tool.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                                        {tool.description}
                                    </p>

                                    <div className="mt-7 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4">
                                        {tool.title === "AI Chat" && (
                                            <div className="space-y-3">
                                                <div className="ml-auto h-7 w-32 rounded-lg bg-[var(--primary-light)]" />
                                                <div className="h-8 w-44 rounded-lg bg-white shadow-sm" />
                                            </div>
                                        )}

                                        {tool.title === "Prompt Library" && (
                                            <div className="space-y-2">
                                                <div className="h-8 rounded-lg bg-white shadow-sm" />
                                                <div className="h-8 rounded-lg bg-white shadow-sm" />
                                                <div className="h-8 w-3/4 rounded-lg bg-white shadow-sm" />
                                            </div>
                                        )}

                                        {tool.title === "Knowledge Base" && (
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="h-14 rounded-lg bg-white shadow-sm" />
                                                <div className="h-14 rounded-lg bg-white shadow-sm" />
                                                <div className="h-14 rounded-lg bg-white shadow-sm" />
                                            </div>
                                        )}

                                        {tool.title === "Workflow Builder" && (
                                            <div className="flex items-center gap-2">
                                                <div className="h-10 w-16 rounded-lg bg-white shadow-sm" />
                                                <div className="h-px flex-1 bg-[var(--border-strong)]" />
                                                <div className="h-10 w-16 rounded-lg bg-[var(--primary-light)]" />
                                                <div className="h-px flex-1 bg-[var(--border-strong)]" />
                                                <div className="h-10 w-16 rounded-lg bg-white shadow-sm" />
                                            </div>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}