import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({
    label,
    error,
    id,
    className = "",
    ...props
}: InputProps) {
    const inputId = id ?? props.name;

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                >
                    {label}
                </label>
            )}

            <input
                id={inputId}
                aria-invalid={Boolean(error)}
                aria-describedby={
                    error ? `${inputId}-error` : undefined
                }
                className={[
                    "h-12 w-full rounded-[var(--radius-md)]",
                    "border border-[var(--border-strong)]",
                    "bg-white px-4",
                    "text-sm text-[var(--text-primary)]",
                    "placeholder:text-[var(--text-muted)]",
                    "outline-none",
                    "transition-all duration-200",
                    "focus:border-[var(--primary)]",
                    "focus:ring-2 focus:ring-[var(--primary-light)]",
                    "disabled:cursor-not-allowed",
                    "disabled:bg-[var(--surface-secondary)]",
                    "disabled:opacity-60",
                    error
                        ? "border-[var(--danger)] focus:border-[var(--danger)] focus:ring-red-100"
                        : "",
                    className,
                ].join(" ")}
                {...props}
            />

            {error && (
                <p
                    id={`${inputId}-error`}
                    className="mt-2 text-sm text-[var(--danger)]"
                >
                    {error}
                </p>
            )}
        </div>
    );
}