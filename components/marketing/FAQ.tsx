"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "Is NovaAI a real AI service?",
        answer:
            "NovaAI is a frontend template for AI SaaS products. It includes polished pages, dashboards, interactions, and demo data. You can connect your own AI provider, backend, database, and authentication system.",
    },
    {
        question: "Can I connect my own AI API?",
        answer:
            "Yes. The template is designed to work with your own backend or API layer. You can connect providers such as OpenAI, Anthropic, Google, or your own AI infrastructure.",
    },
    {
        question: "Does the dashboard require a backend?",
        answer:
            "No. The included dashboard uses demo data and browser storage for frontend demonstrations. A production application can replace those layers with your own backend and database.",
    },
    {
        question: "Is the template responsive?",
        answer:
            "Yes. The marketing pages and dashboard are designed for desktop, tablet, and mobile layouts using responsive Tailwind CSS utilities.",
    },
    {
        question: "Can I customize the branding?",
        answer:
            "Yes. Colors, typography, content, navigation, pricing, dashboard data, and reusable components are structured so you can adapt the template to your own product.",
    },
    {
        question: "What is included with the template?",
        answer:
            "The template includes marketing pages, authentication screens, a complete AI workspace dashboard, reusable UI components, demo data, responsive layouts, and documentation.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="bg-[var(--surface-secondary)] py-24 md:py-28">
            <div className="mx-auto max-w-[900px] px-5 md:px-10">
                <div className="text-center">
                    <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                        FAQ
                    </span>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                        Frequently asked questions
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
                        Everything you need to know before getting started
                        with NovaAI.
                    </p>
                </div>

                <div className="mt-12 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-white">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div key={faq.question}>
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    onClick={() =>
                                        setOpenIndex(
                                            isOpen ? null : index,
                                        )
                                    }
                                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
                                >
                                    <span className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                                        {faq.question}
                                    </span>

                                    <ChevronDown
                                        size={18}
                                        className={`shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${
                                            isOpen
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-5 sm:px-6">
                                        <p className="max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}