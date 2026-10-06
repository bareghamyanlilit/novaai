import { Quote } from "lucide-react";

const testimonials = [
    {
        quote:
            "NovaLiAi gave our team a much clearer way to organize AI agents and automate repetitive workflows.",
        name: "Alex Morgan",
        role: "Product Lead",
        company: "Vertex",
        initials: "AM",
    },
    {
        quote:
            "The workspace makes it easy to move from a simple prompt to a complete AI-powered workflow.",
        name: "Sarah Chen",
        role: "Operations Manager",
        company: "Northstar",
        initials: "SC",
    },
    {
        quote:
            "Having agents, knowledge, workflows, and analytics in one place makes our daily AI work much easier.",
        name: "David Wilson",
        role: "Growth Manager",
        company: "Orbit",
        initials: "DW",
    },
];

export function Testimonials() {
    return (
        <section className="bg-[var(--surface-secondary)] py-24 md:py-28">
            <div className="mx-auto max-w-[1280px] px-5 md:px-10">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                        Customer stories
                    </span>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
                        Built to make AI work simpler
                    </h2>

                    <p className="mt-5 text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                        See how modern teams can use NovaLiAi to organize and
                        automate their AI workflows.
                    </p>
                </div>

                <div className="mt-16 grid gap-5 md:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <article
                            key={testimonial.name}
                            className="flex flex-col rounded-2xl border border-[var(--border)] bg-white p-7"
                        >
                            <Quote
                                size={24}
                                className="text-[var(--primary)]"
                            />

                            <p className="mt-6 flex-1 text-sm leading-7 text-[var(--text-secondary)]">
                                “{testimonial.quote}”
                            </p>

                            <div className="mt-8 flex items-center gap-3 border-t border-[var(--border)] pt-5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-light)] text-xs font-semibold text-[var(--primary)]">
                                    {testimonial.initials}
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                                        {testimonial.name}
                                    </p>

                                    <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                                        {testimonial.role} ·{" "}
                                        {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
                    Demo content for template preview.
                </p>
            </div>
        </section>
    );
}