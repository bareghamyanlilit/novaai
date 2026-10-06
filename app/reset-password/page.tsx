"use client";

import {
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    LockKeyhole,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [reset, setReset] = useState(false);

    const passwordsMatch =
        password.length > 0 &&
        confirmPassword.length > 0 &&
        password === confirmPassword;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!passwordsMatch || password.length < 8) {
            return;
        }

        setReset(true);
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
                        {!reset ? (
                            <>
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                                    <Sparkles size={20} />
                                </div>

                                <h1 className="mt-6 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                                    Set a new password
                                </h1>

                                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                                    Choose a new password for your NovaLiAi
                                    account.
                                </p>

                                <form
                                    onSubmit={handleSubmit}
                                    className="mt-7 space-y-5"
                                >
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                        >
                                            New password
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
                                                    setPassword(
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Enter new password"
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
                                                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
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

                                    <div>
                                        <label
                                            htmlFor="confirm-password"
                                            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                        >
                                            Confirm password
                                        </label>

                                        <div className="relative">
                                            <LockKeyhole
                                                size={18}
                                                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                                            />

                                            <input
                                                id="confirm-password"
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={confirmPassword}
                                                onChange={(event) =>
                                                    setConfirmPassword(
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Repeat new password"
                                                autoComplete="new-password"
                                                required
                                                className="h-12 w-full rounded-xl border border-[var(--border)] bg-white pl-11 pr-12 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-light)]"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        (visible) => !visible,
                                                    )
                                                }
                                                aria-label={
                                                    showConfirmPassword
                                                        ? "Hide password"
                                                        : "Show password"
                                                }
                                                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff size={17} />
                                                ) : (
                                                    <Eye size={17} />
                                                )}
                                            </button>
                                        </div>

                                        {confirmPassword.length > 0 &&
                                            !passwordsMatch && (
                                                <p className="mt-2 text-xs text-[var(--danger)]">
                                                    Passwords do not match.
                                                </p>
                                            )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={
                                            password.length < 8 ||
                                            !passwordsMatch
                                        }
                                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Reset password
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
                                    Password updated
                                </h1>

                                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                                    Your password has been successfully
                                    updated.
                                </p>

                                <Link
                                    href="/login"
                                    className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
                                >
                                    Continue to sign in
                                    <ArrowRight size={17} />
                                </Link>
                            </div>
                        )}

                        {!reset && (
                            <div className="mt-7 border-t border-[var(--border)] pt-6 text-center">
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]"
                                >
                                    Back to sign in
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}