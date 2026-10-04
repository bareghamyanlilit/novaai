import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
    {
        name: "Free",
        price: "$0",
        description: "For individuals exploring AI automation.",
        features: [
            "500 AI requests / month",
            "2 AI agents",
            "1 team member",
            "100 MB storage",
        ],
        popular: false,
    },
    {
        name: "Pro",
        price: "$29",
        description: "For growing teams building with AI.",
        features: [
            "10,000 AI requests / month",
            "20 AI agents",
            "10 team members",
            "10 GB storage",
        ],
        popular: true,
    },
    {
        name: "Business",
        price: "$99",
        description: "For teams running AI at scale.",
        features: [
            "50,000 AI requests / month",
            "Unlimited AI agents",
            "Unlimited team members",
            "100 GB storage",
        ],
        popular: false,
    },
];

export function Pricing() {
    return (
        <section className="bg-white py-24 md:py-28">
            <div className="mx-auto max-w-[1280px] px-5 md:px-10">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                        Pricing
                    </span>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
                        Start free. Scale when you need to.
                    </h2>

                    <p className="mt-5 text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                        Choose a plan that fits your team and upgrade as your
                        AI operations grow.
                    </p>
                </div>

                <div className="mt-16 grid gap-5 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <article
                            key={plan.name}
                            className={`relative flex flex-col rounded-2xl border p-7 ${
                                plan.popular
                                    ? "border-[var(--primary)] shadow-[0_15px_40px_rgba(79,70,229,0.12)]"
                                    : "border-[var(--border)]"
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-4 py-1 text-xs font-semibold text-white">
                                    Most popular
                                </div>
                            )}

                            <div>
                                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                                    {plan.name}
                                </h3>

                                <p className="mt-2 min-h-12 text-sm leading-6 text-[var(--text-secondary)]">
                                    {plan.description}
                                </p>

                                <div className="mt-6 flex items-end gap-1">
                                    <span className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">
                                        {plan.price}
                                    </span>

                                    <span className="mb-1 text-sm text-[var(--text-muted)]">
                                        /month
                                    </span>
                                </div>
                            </div>

                            <Link
                                href="/register"
                                className={`mt-7 flex h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold transition ${
                                    plan.popular
                                        ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
                                        : "border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                                }`}
                            >
                                {plan.name === "Free"
                                    ? "Get started"
                                    : "Start free trial"}
                            </Link>

                            <div className="my-7 h-px bg-[var(--border)]" />

                            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                                Includes
                            </p>

                            <ul className="mt-4 space-y-3">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                                    >
                                        <Check
                                            size={17}
                                            className="mt-0.5 shrink-0 text-emerald-500"
                                        />

                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>

                <p className="mt-8 text-center text-xs text-[var(--text-muted)]">
                    Demo pricing for template preview. Connect your own
                    billing provider in production.
                </p>
            </div>
        </section>
    );
}