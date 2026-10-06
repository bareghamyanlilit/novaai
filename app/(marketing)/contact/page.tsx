"use client";

import {
    CheckCircle2,
    Mail,
    MessageSquare,
    Send,
} from "lucide-react";
import { FormEvent, useState } from "react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(true);
    }

    return (
        <div>
            <section className="border-b border-[var(--border)] bg-white">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                            Contact
                        </p>

                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
                            Let&apos;s talk about your next project.
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                            Have a question about the template or want to
                            discuss customization? Send us a message.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-[var(--surface-secondary)]">
                <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
                    {/* Contact info */}
                    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                            Get in touch
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                            We are happy to answer questions about the
                            template, customization, or implementation.
                        </p>

                        <div className="mt-8 space-y-5">
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                                    <Mail size={18} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                                        Email
                                    </p>

                                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                        novaliaiproject@gmail.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                                    <MessageSquare size={18} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                                        Support
                                    </p>

                                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                        Response within 1–2 business days.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 rounded-xl bg-[var(--surface-secondary)] p-5">
                            <p className="text-sm font-semibold text-[var(--text-primary)]">
                                Template support
                            </p>

                            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                                For production applications, connect this
                                form to your preferred email service or API
                                endpoint.
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
                        {submitted ? (
                            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                    <CheckCircle2 size={24} />
                                </div>

                                <h2 className="mt-6 text-2xl font-bold text-[var(--text-primary)]">
                                    Message received
                                </h2>

                                <p className="mt-3 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                                    Thanks for reaching out. This is a demo
                                    contact form. Connect your preferred email
                                    or backend service for production use.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setSubmitted(false)}
                                    className="mt-7 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-7">
                                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                                        Send us a message
                                    </h2>

                                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                                        Fill out the form and we&apos;ll get
                                        back to you.
                                    </p>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                            >
                                                Full name
                                            </label>

                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                placeholder="John Doe"
                                                className="h-12 w-full rounded-xl border border-[var(--border)] px-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-light)]"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                            >
                                                Email address
                                            </label>

                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="novaliaiproject@gmail.com"
                                                className="h-12 w-full rounded-xl border border-[var(--border)] px-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-light)]"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                        >
                                            Subject
                                        </label>

                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            required
                                            placeholder="How can we help?"
                                            className="h-12 w-full rounded-xl border border-[var(--border)] px-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-light)]"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                        >
                                            Message
                                        </label>

                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={6}
                                            placeholder="Tell us a little about your question..."
                                            className="w-full resize-none rounded-xl border border-[var(--border)] px-4 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-light)]"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
                                    >
                                        Send message
                                        <Send size={17} />
                                    </button>

                                    <p className="text-center text-xs leading-5 text-[var(--text-muted)]">
                                        Demo form — connect your own API or
                                        email service in production.
                                    </p>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}