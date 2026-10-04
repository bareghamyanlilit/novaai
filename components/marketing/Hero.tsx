import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
    return (
        <section className="overflow-hidden bg-white">
            <div className="mx-auto max-w-[1280px] px-5 pb-20 pt-20 md:px-10 md:pb-28 md:pt-28">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="mb-6 inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--primary-light)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
                        AI Agents & Automation Workspace
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl md:leading-[1.1]">
                        Build intelligent AI agents
                        <span className="block text-[var(--primary)]">
                            for your entire workflow.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                        Create, manage, and automate AI-powered workflows
                        from one powerful workspace built for modern teams.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            href="/register"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--primary)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
                        >
                            Get Started
                            <ArrowRight size={17} />
                        </Link>

                        <Link
                            href="/dashboard"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-6 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-secondary)]"
                        >
                            <Play size={16} />
                            Live Demo
                        </Link>
                    </div>
                </div>

                <div className="relative mx-auto mt-16 max-w-6xl">
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-3 shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
                        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white">
                            <div className="flex h-12 items-center gap-2 border-b border-[var(--border)] px-4">
                                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                                <div className="ml-4 h-7 w-48 rounded-md bg-slate-100" />
                            </div>

                            <div className="grid min-h-[380px] grid-cols-[180px_1fr]">
                                <div className="border-r border-[var(--border)] bg-slate-50 p-4">
                                    <div className="h-7 w-24 rounded bg-slate-200" />

                                    <div className="mt-8 space-y-3">
                                        <div className="h-9 rounded-lg bg-[var(--primary-light)]" />
                                        <div className="h-9 rounded-lg bg-slate-100" />
                                        <div className="h-9 rounded-lg bg-slate-100" />
                                        <div className="h-9 rounded-lg bg-slate-100" />
                                        <div className="h-9 rounded-lg bg-slate-100" />
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="h-7 w-40 rounded bg-slate-200" />
                                            <div className="mt-2 h-4 w-64 rounded bg-slate-100" />
                                        </div>

                                        <div className="h-10 w-28 rounded-lg bg-[var(--primary)]" />
                                    </div>

                                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                        <div className="h-28 rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm" />
                                        <div className="h-28 rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm" />
                                        <div className="h-28 rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm" />
                                    </div>

                                    <div className="mt-4 h-40 rounded-xl border border-[var(--border)] bg-white shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}