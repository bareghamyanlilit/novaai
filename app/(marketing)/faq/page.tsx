"use client";

import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { useState } from "react";

const faqItems = [
    {
        question: "Is NovaLiAi a real AI service?",
        answer:
            "NovaLiAi is a frontend template designed for AI SaaS products, startups, and internal AI platforms. You can connect it to your own backend, AI provider, database, and authentication system.",
    },
    {
        question: "Does the template include an AI API?",
        answer:
            "No. The template focuses on the frontend experience. You can connect OpenAI, Anthropic, Gemini, Ollama, or your own AI infrastructure depending on your product.",
    },
    {
        question: "Can I customize the branding?",
        answer:
            "Yes. Colors, typography, content, navigation, pricing, dashboard data, and components are structured so they can be customized for your own product.",
    },
    {
        question: "Does it include authentication?",
        answer:
            "The template includes polished login, registration, password recovery, and reset-password interfaces. Real authentication should be connected to your preferred authentication provider.",
    },
    {
        question: "Does it include a database?",
        answer:
            "No. Demo data is stored in the frontend project. You can connect your preferred database and backend when turning the template into a production application.",
    },
    {
        question: "Can I connect my own billing system?",
        answer:
            "Yes. The billing interface is designed to work as a frontend foundation. You can connect Stripe or another billing provider and replace the demo payment logic with your production implementation.",
    },
    {
        question: "Is the dashboard responsive?",
        answer:
            "Yes. The dashboard, navigation, cards, tables, charts, and forms are designed to adapt across desktop, tablet, and mobile screen sizes.",
    },
    {
        question: "Can I use the template for a commercial project?",
        answer:
            "Yes, subject to the license terms of the marketplace where the template is purchased and the licenses of any included third-party assets.",
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div>
            <section className="border-b border-[var(--border)] bg-white">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                            <MessageCircleQuestion size={21} />
                        </div>

                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
                            Frequently asked questions
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                            Everything you need to know about the NovaLiAi
                            template and how you can adapt it to your own
                            product.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-[var(--surface-secondary)]">
                <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
                    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                        {faqItems.map((item, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={item.question}
                                    className="border-b border-[var(--border)] last:border-b-0"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenIndex(
                                                isOpen ? null : index,
                                            )
                                        }
                                        aria-expanded={isOpen}
                                        className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition hover:bg-[var(--surface-secondary)] sm:px-6"
                                    >
                                        <span className="text-sm font-semibold leading-6 text-[var(--text-primary)] sm:text-base">
                                            {item.question}
                                        </span>

                                        <ChevronDown
                                            size={18}
                                            className={`shrink-0 text-[var(--text-muted)] transition-transform ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className="px-5 pb-5 sm:px-6">
                                            <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                                                {item.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}