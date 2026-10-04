import { Check, HelpCircle, Sparkles } from "lucide-react";
import Link from "next/link";

import { pricingPlans } from "@/data/pricing";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Pricing",
    description:
        "Explore NovaAI pricing plans and choose the workspace setup that fits your team.",
};
export default function PricingPage() {
    return (
        <>
            <section className="border-b border-[var(--border)] bg-[var(--surface-secondary)]">
                <div className="mx-auto max-w-[1000px] px-5 py-20 text-center md:px-10 md:py-28">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-light)] px-3 py-1.5 text-sm font-medium text-[var(--primary)]">
                        <Sparkles size={15} />
                        Simple pricing
                    </div>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl">
                        Choose the workspace that fits your team.
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                        Start small, scale when you need to, and customize
                        the pricing experience for your own AI product.
                    </p>
                </div>
            </section>

            <section className="bg-white py-20 md:py-24">
                <div className="mx-auto max-w-[1180px] px-5 md:px-10">
                    <div className="grid gap-5 lg:grid-cols-3">
                        {pricingPlans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative flex flex-col rounded-2xl border bg-white p-6 ${
                                    plan.popular
                                        ? "border-[var(--primary)] shadow-[0_20px_50px_rgba(79,70,229,0.12)]"
                                        : "border-[var(--border)] shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-white">
                                        Most popular
                                    </div>
                                )}

                                <div>
                                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                                        {plan.name}
                                    </h2>

                                    <p className="mt-3 min-h-12 text-sm leading-6 text-[var(--text-secondary)]">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="mt-7">
                                    <div className="flex items-end gap-1">
                                        <span className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">
                                            ${plan.price}
                                        </span>

                                        <span className="mb-1 text-sm text-[var(--text-muted)]">
                                            /month
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href="/register"
                                    className={`mt-7 inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold transition ${
                                        plan.popular
                                            ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
                                            : "border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                                    }`}
                                >
                                    Get Started
                                </Link>

                                <div className="my-7 border-t border-[var(--border)]" />

                                <p className="text-sm font-semibold text-[var(--text-primary)]">
                                    What&apos;s included
                                </p>

                                <ul className="mt-4 space-y-3">
                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start gap-3"
                                        >
                                            <Check
                                                size={17}
                                                className="mt-0.5 shrink-0 text-[var(--success)]"
                                            />

                                            <span className="text-sm leading-6 text-[var(--text-secondary)]">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-5">
                        <HelpCircle
                            size={19}
                            className="mt-0.5 shrink-0 text-[var(--primary)]"
                        />

                        <p className="text-sm leading-6 text-[var(--text-secondary)]">
                            Demo pricing for the template preview. Connect
                            your own billing provider and pricing logic in
                            production.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-[var(--surface-secondary)] py-24">
                <div className="mx-auto max-w-3xl px-5 text-center md:px-10">
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                        Need a different pricing model?
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
                        NovaAI is a frontend template, so you can replace
                        these plans with usage-based, seat-based, or
                        custom pricing.
                    </p>

                    <div className="mt-8">
                        <Link
                            href="/contact"
                            className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--primary)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
                        >
                            Contact us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}