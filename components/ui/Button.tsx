import type { ButtonHTMLAttributes } from "react";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]",
    secondary:
        "bg-[var(--primary-light)] text-[var(--primary)] hover:bg-[#e0e7ff]",
    outline:
        "border border-[var(--border-strong)] bg-white text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]",
    ghost:
        "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]",
    danger:
        "bg-[var(--danger)] text-white hover:bg-red-600",
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
};

export function Button({
    variant = "primary",
    size = "md",
    className = "",
    type = "button",
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={[
                "inline-flex items-center justify-center gap-2",
                "rounded-[var(--radius-md)]",
                "font-medium",
                "transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                variantClasses[variant],
                sizeClasses[size],
                className,
            ].join(" ")}
            {...props}
        />
    );
}