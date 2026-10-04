import {
    ArrowLeft,
    Home,
    SearchX,
} from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--surface-secondary)] px-5">
            <div className="w-full max-w-lg text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)]">
                    <SearchX size={30} />
                </div>

                <p className="mt-6 text-sm font-semibold text-[var(--primary)]">
                    404 ERROR
                </p>

                <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
                    Page not found
                </h1>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                    The page you are looking for does not
                    exist or may have been moved.
                </p>

                <div className="mt-8 flex justify-center">
                    <Link
                        href="/"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-hover)]"
                    >
                        <Home size={17} />
                        Go home
                    </Link>

                    <Link
                        href="/"
                        className="ml-3 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-white px-5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-secondary)]"
                    >
                        <ArrowLeft size={17} />
                        Back
                    </Link>
                </div>
            </div>
        </main>
    );
}