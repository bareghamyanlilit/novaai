import {
    Bot,
    Settings2,
    Workflow,
} from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Bot,
        title: "Create your agent",
        description:
            "Choose an agent type, define its purpose, and give it the instructions it needs to work effectively.",
    },
    {
        number: "02",
        icon: Settings2,
        title: "Configure its knowledge",
        description:
            "Connect prompts, documents, websites, and other sources so your agent has the right context.",
    },
    {
        number: "03",
        icon: Workflow,
        title: "Automate your workflow",
        description:
            "Connect your agent to triggers, conditions, and actions to automate repetitive work.",
    },
];

export function HowItWorks() {
    return (
        <section className="bg-white py-24 md:py-28">
            <div className="mx-auto max-w-[1280px] px-5 md:px-10">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                        How it works
                    </span>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
                        From idea to automation in three steps
                    </h2>

                    <p className="mt-5 text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                        Build your AI workspace without complicated setup or
                        unnecessary infrastructure.
                    </p>
                </div>

                <div className="relative mt-16 grid gap-8 md:grid-cols-3">
                    <div className="absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-[var(--border)] md:block" />

                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <article
                                key={step.number}
                                className="relative text-center"
                            >
                                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border)] bg-white shadow-sm">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                                        <Icon
                                            size={22}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary)] text-[11px] font-bold text-white">
                                        {step.number}
                                    </span>
                                </div>

                                <h3 className="mt-7 text-lg font-semibold text-[var(--text-primary)]">
                                    {step.title}
                                </h3>

                                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
                                    {step.description}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
