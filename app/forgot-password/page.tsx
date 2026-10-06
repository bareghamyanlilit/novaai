"use client";

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Mail,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(true);
    }

    return (
        <main className="min-h-screen bg-[var(--surface-secondary)]">
            <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
                <div className="w-full max-w-md">
                    <Link
                        href="/"
                        className="mx-auto block w-fit text-xl font-bold tracking-tight text-[var(--text-primary)]"
                    >
                        Nova<span className="text-[var(--primary)]">AI</span>
                    </Link>

                    <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-8">
                        {!submitted ? (
                            <>
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                                    <Sparkles size={20} />
                                </div>

                                <h1 className="mt-6 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                                    Forgot your password?
                                </h1>

                                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                                    Enter your email address and we&apos;ll send
                                    instructions to reset your password.
                                </p>

                                <form
                                    onSubmit={handleSubmit}
                                    className="mt-7 space-y-5"
                                >
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                        >
                                            Email address
                                        </label>

                                        <div className="relative">
                                            <Mail
                                                size={18}
                                                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                                            />

                                            <input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(event) =>
                                                    setEmail(event.target.value)
                                                }
                                                placeholder="novaliaiproject@gmail.com"
                                                autoComplete="email"
                                                required
                                                className="h-12 w-full rounded-xl border border-[var(--border)] bg-white pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-light)]"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
                                    >
                                        Send reset link
                                        <ArrowRight size={17} />
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                    <CheckCircle2 size={24} />
                                </div>

                                <h1 className="mt-6 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                                    Check your inbox
                                </h1>

                                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                                    If an account exists for{" "}
                                    <span className="font-medium text-[var(--text-primary)]">
                                        {email}
                                    </span>
                                    , you will receive instructions to reset
                                    your password.
                                </p>

                                <p className="mt-4 text-xs leading-5 text-[var(--text-muted)]">
                                    This is a demo flow. Connect your email
                                    service and authentication provider in
                                    production.
                                </p>
                            </div>
                        )}

                        <div className="mt-7 border-t border-[var(--border)] pt-6 text-center">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
                            >
                                <ArrowLeft size={16} />
                                Back to sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}