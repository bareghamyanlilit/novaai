const companies = [
    "Vertex",
    "Acme",
    "Orbit",
    "Linear",
    "Northstar",
];

export function TrustedBy() {
    return (
        <section className="border-y border-[var(--border)] bg-[var(--surface-secondary)]">
            <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-10">
                <p className="text-center text-sm font-medium text-[var(--text-muted)]">
                    Trusted by modern teams building with AI
                </p>

                <div className="mt-8 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-5">
                    {companies.map((company) => (
                        <div
                            key={company}
                            className="text-center text-base font-semibold tracking-tight text-slate-400 transition hover:text-slate-600"
                        >
                            {company}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}