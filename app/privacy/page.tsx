import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | NovaAI",
    description: "Privacy Policy for the NovaAI template.",
};

export default function PrivacyPage() {
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
                        Privacy Policy
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
                            This Privacy Policy is provided as demo content
                            for the NovaAI template. It is not intended to
                            serve as legal advice or as a complete privacy
                            policy for a production application.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                            Data Collection
                        </h2>
                        <p className="mt-3 leading-7">
                            The NovaAI template does not include a production
                            backend, database, authentication provider, or
                            external AI service. Any data collection should be
                            implemented and documented by the buyer when
                            connecting their own services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                            Third-Party Services
                        </h2>
                        <p className="mt-3 leading-7">
                            A production application built from this template
                            may use third-party services such as authentication,
                            analytics, payment providers, databases, or AI
                            APIs. Their data practices should be reviewed and
                            described in the final application privacy policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                            Customization
                        </h2>
                        <p className="mt-3 leading-7">
                            Before launching a production application, replace
                            this demo content with a privacy policy appropriate
                            for your business, users, jurisdiction, and
                            connected services.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}