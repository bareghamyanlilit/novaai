import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service | NovaAI",
    description: "Terms of Service for the NovaAI template.",
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-3xl px-5 py-16 md:px-10 md:py-24">
                <Link
                    href="/"
                    className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
                >
                    ← Back to NovaAI
                </Link>

                <div className="mt-10">
                    <p className="text-sm font-medium text-[var(--primary)]">
                        Legal
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--text-primary)] md:text-5xl">
                        Terms of Service
                    </h1>

                    <p className="mt-4 text-sm text-[var(--text-muted)]">
                        Last updated: October 2026
                    </p>
                </div>

                <div className="mt-12 space-y-10 text-[var(--text-secondary)]">
                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                            Template Notice
                        </h2>
                        <p className="mt-3 leading-7">
                            These Terms of Service are provided as demo content
                            for the NovaAI template. They are not intended to
                            replace legal terms for a production application.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                            Use of the Template
                        </h2>
                        <p className="mt-3 leading-7">
                            NovaAI is a frontend template designed to help
                            developers build AI-focused SaaS interfaces. The
                            template does not provide a production AI service,
                            backend, database, or authentication system.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                            Third-Party Services
                        </h2>
                        <p className="mt-3 leading-7">
                            Buyers may connect the template to their own
                            APIs, databases, authentication providers,
                            payment systems, and AI services. Those services
                            are subject to their own terms and policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                            Production Use
                        </h2>
                        <p className="mt-3 leading-7">
                            Before deploying a customized version to
                            production, replace this demo content with terms
                            that accurately describe your application,
                            business, users, and applicable legal requirements.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}