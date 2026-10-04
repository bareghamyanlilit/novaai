import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CTA() {
    return (
        <section className="bg-white py-24 md:py-28">
            <div className="mx-auto max-w-[1280px] px-5 md:px-10">
                <div className="overflow-hidden rounded-3xl bg-[var(--primary)] px-6 py-16 text-center sm:px-10 md:px-16">
                    <div className="mx-auto max-w-3xl">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                            <Sparkles size={22} />
                        </div>

                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                            Build your AI workspace today.
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
                            Give your team a better way to build, manage, and
                            automate AI-powered workflows.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                href="/register"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-[var(--primary)] transition hover:bg-indigo-50"
                            >
                                Get Started
                                <ArrowRight size={17} />
                            </Link>

                            <Link
                                href="/dashboard"
                                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                Explore Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}