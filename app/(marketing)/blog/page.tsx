import {
    ArrowRight,
    CalendarDays,
    Clock3,
} from "lucide-react";
import Link from "next/link";

import { blogPosts } from "@/data/blog";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Blog",
    description:
        "Insights and practical ideas about AI agents, automation, knowledge bases, and AI product design.",
};

export default function BlogPage() {
    const featuredPost = blogPosts[0];
    const remainingPosts = blogPosts.slice(1);

    return (
        <div>
            <section className="border-b border-[var(--border)] bg-white">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                            NovaLiAi Blog
                        </p>

                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
                            Ideas for building better AI products.
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                            Practical ideas about AI agents, automation,
                            product design, and building modern AI
                            experiences.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-[var(--surface-secondary)]">
                <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
                    <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="group grid overflow-hidden rounded-2xl border border-[var(--border)] bg-white lg:grid-cols-2"
                    >
                        <div className="flex min-h-[300px] items-center justify-center bg-[var(--primary-light)] p-8 lg:min-h-[400px]">
                            <div className="w-full max-w-sm rounded-2xl border border-indigo-200 bg-white p-6 shadow-[0_20px_40px_rgba(79,70,229,0.10)]">
                                <div className="h-3 w-20 rounded-full bg-indigo-100" />

                                <div className="mt-6 space-y-3">
                                    <div className="h-3 rounded-full bg-slate-100" />
                                    <div className="h-3 w-5/6 rounded-full bg-slate-100" />
                                    <div className="h-3 w-4/6 rounded-full bg-slate-100" />
                                </div>

                                <div className="mt-8 grid grid-cols-2 gap-3">
                                    <div className="h-20 rounded-xl bg-slate-50" />
                                    <div className="h-20 rounded-xl bg-slate-50" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center p-7 sm:p-10">
                            <span className="w-fit rounded-full bg-[var(--primary-light)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                                {featuredPost.category}
                            </span>

                            <h2 className="mt-5 text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                                {featuredPost.title}
                            </h2>

                            <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
                                {featuredPost.excerpt}
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
                                <span className="inline-flex items-center gap-1.5">
                                    <CalendarDays size={14} />
                                    {featuredPost.date}
                                </span>

                                <span className="inline-flex items-center gap-1.5">
                                    <Clock3 size={14} />
                                    {featuredPost.readTime}
                                </span>
                            </div>

                            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                                Read article
                                <ArrowRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </span>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                                Latest articles
                            </p>

                            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                                Explore the latest ideas
                            </h2>
                        </div>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {remainingPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-white transition-shadow hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)]"
                            >
                                <div className="flex h-48 items-center justify-center bg-[var(--surface-secondary)]">
                                    <div className="w-32 rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm">
                                        <div className="h-2 w-10 rounded-full bg-[var(--primary-light)]" />

                                        <div className="mt-4 space-y-2">
                                            <div className="h-2 rounded bg-slate-100" />
                                            <div className="h-2 w-4/5 rounded bg-slate-100" />
                                            <div className="h-2 w-3/5 rounded bg-slate-100" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <span className="text-xs font-semibold text-[var(--primary)]">
                                        {post.category}
                                    </span>

                                    <h3 className="mt-3 text-lg font-semibold leading-7 text-[var(--text-primary)]">
                                        {post.title}
                                    </h3>

                                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--text-secondary)]">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between text-xs text-[var(--text-muted)]">
                                        <span>{post.date}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}