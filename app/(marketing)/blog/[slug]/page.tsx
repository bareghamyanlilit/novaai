import type { Metadata } from "next";
import {
    ArrowLeft,
    CalendarDays,
    Clock3,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { blogPosts } from "@/data/blog";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;

    const post = blogPosts.find((item) => item.slug === slug);

    if (!post) {
        return {
            title: "Post not found | NovaAI",
        };
    }

    return {
        title: `${post.title} | NovaAI`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({
    params,
}: BlogPostPageProps) {
    const { slug } = await params;

    const post = blogPosts.find((item) => item.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article>
            <section className="border-b border-[var(--border)] bg-white">
                <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--primary)]"
                    >
                        <ArrowLeft size={16} />
                        Back to blog
                    </Link>

                    <div className="mt-8">
                        <span className="rounded-full bg-[var(--primary-light)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                            {post.category}
                        </span>

                        <h1 className="mt-5 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
                            {post.title}
                        </h1>

                        <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                            {post.excerpt}
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-[var(--text-muted)]">
                            <span className="font-medium text-[var(--text-primary)]">
                                {post.author}
                            </span>

                            <span className="inline-flex items-center gap-1.5">
                                <CalendarDays size={15} />
                                {post.date}
                            </span>

                            <span className="inline-flex items-center gap-1.5">
                                <Clock3 size={15} />
                                {post.readTime}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[var(--surface-secondary)]">
                <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
                    <div className="mb-10 flex min-h-[280px] items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--primary-light)] p-8">
                        <div className="w-full max-w-sm rounded-2xl border border-indigo-200 bg-white p-6 shadow-[0_20px_40px_rgba(79,70,229,0.10)]">
                            <div className="h-3 w-24 rounded-full bg-indigo-100" />

                            <div className="mt-6 space-y-3">
                                <div className="h-3 rounded-full bg-slate-100" />
                                <div className="h-3 w-5/6 rounded-full bg-slate-100" />
                                <div className="h-3 w-2/3 rounded-full bg-slate-100" />
                            </div>

                            <div className="mt-8 h-24 rounded-xl bg-slate-50" />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-10">
                        <div className="space-y-6">
                            {post.content.map((paragraph) => (
                                <p
                                    key={paragraph}
                                    className="text-base leading-8 text-[var(--text-secondary)]"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <div className="mt-10 border-t border-[var(--border)] pt-6">
                            <p className="text-sm text-[var(--text-muted)]">
                                This article is demo content for the NovaAI
                                template.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}