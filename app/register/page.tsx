"use client";

import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    Sparkles,
    User,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Demo registration.
        // Connect your own authentication provider here.
    }

    return (
        <main className="min-h-screen bg-[var(--surface-secondary)]">
            <div className="grid min-h-screen lg:grid-cols-2">
                {/* Left side */}
                <div className="hidden bg-[var(--primary)] lg:flex lg:flex-col lg:justify-between">
                    <div className="p-10">
                        <Link
                            href="/"
                            className="text-xl font-bold tracking-tight text-white"
                        >
                            Nova<span className="text-indigo-200">AI</span>
                        </Link>
                    </div>

                    <div className="px-10 pb-16">
                        <div className="max-w-lg">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                                <Sparkles size={21} />
                            </div>

                            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white xl:text-5xl">
                                Start building with AI.
                            </h1>

                            <p className="mt-5 max-w-md text-base leading-7 text-indigo-100">
                                Create your workspace and bring your AI
                                agents, knowledge, and workflows together.
                            </p>

                            <div className="mt-8 space-y-3">
                                {[
                                    "Build specialized AI agents",
                                    "Create reusable workflows",
                                    "Manage your AI workspace",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm text-indigo-100"
                                    >
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                                            <ArrowRight size={13} />
                                        </span>

                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="px-10 pb-8 text-xs text-indigo-200">
                        AI Agents & Automation Workspace
                    </div>
                </div>

                {/* Form side */}
                <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
                    <div className="w-full max-w-md">
                        <div className="mb-8 lg:hidden">
                            <Link
                                href="/"
                                className="text-xl font-bold tracking-tight text-[var(--text-primary)]"
                            >
                                NovaLi
                                <span className="text-[var(--primary)]">
                                    AI
                                </span>
                            </Link>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                                Create your account
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                                Start building your AI workspace in a few
                                simple steps.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                >
                                    Full name
                                </label>

                                <div className="relative">
                                    <User
                                        size={18}
                                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                                    />

                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(event) =>
                                            setName(event.target.value)
                                        }
                                        placeholder="Alex Morgan"
                                        autoComplete="name"
                                        required
                                        className="h-12 w-full rounded-xl border border-[var(--border)] bg-white pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-light)]"
                                    />
                                </div>
                            </div>

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

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <LockKeyhole
                                        size={18}
                                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                                    />

                                    <input
                                        id="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        placeholder="Create a password"
                                        autoComplete="new-password"
                                        required
                                        minLength={8}
                                        className="h-12 w-full rounded-xl border border-[var(--border)] bg-white pl-11 pr-12 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-light)]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (visible) => !visible,
                                            )
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={17} />
                                        ) : (
                                            <Eye size={17} />
                                        )}
                                    </button>
                                </div>

                                <p className="mt-2 text-xs text-[var(--text-muted)]">
                                    Use at least 8 characters.
                                </p>
                            </div>

                            <label className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={acceptedTerms}
                                    onChange={(event) =>
                                        setAcceptedTerms(
                                            event.target.checked,
                                        )
                                    }
                                    required
                                    className="mt-1 h-4 w-4 rounded border-[var(--border-strong)] accent-[var(--primary)]"
                                />

                                <span className="text-sm leading-6 text-[var(--text-secondary)]">
                                    I agree to the{" "}
                                    <Link
                                        href="/terms"
                                        className="font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
                                    >
                                        Terms
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy"
                                        className="font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </span>
                            </label>

                            <button
                                type="submit"
                                disabled={!acceptedTerms}
                                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Create account
                                <ArrowRight size={17} />
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]"
                            >
                                Sign in
                            </Link>
                        </p>

                        <div className="mt-8 border-t border-[var(--border)] pt-6 text-center">
                            <Link
                                href="/"
                                className="text-sm text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
                            >
                                ← Back to homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}