import type { HTMLAttributes } from "react";

type BadgeVariant =
    | "default"
    | "success"
    | "warning"
    | "danger"
    | "info";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
    default:
        "bg-slate-100 text-slate-700",
    success:
        "bg-green-50 text-green-700",
    warning:
        "bg-amber-50 text-amber-700",
    danger:
        "bg-red-50 text-red-700",
    info:
        "bg-sky-50 text-sky-700",
};

export function Badge({
    variant = "default",
    className = "",
    children,
    ...props
}: BadgeProps) {
    return (
        <span
            className={[
                "inline-flex items-center gap-1.5",
                "rounded-full",
                "px-2.5 py-1",
                "text-xs font-medium",
                "whitespace-nowrap",
                variantClasses[variant],
                className,
            ].join(" ")}
            {...props}
        >
            <span
                className={[
                    "h-1.5 w-1.5 rounded-full",
                    variant === "success" && "bg-green-500",
                    variant === "warning" && "bg-amber-500",
                    variant === "danger" && "bg-red-500",
                    variant === "info" && "bg-sky-500",
                    variant === "default" && "bg-slate-400",
                ]
                    .filter(Boolean)
                    .join(" ")}
            />

            {children}
        </span>
    );
}