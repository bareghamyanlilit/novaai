import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
};

export function Card({
    padding = "md",
    className = "",
    children,
    ...props
}: CardProps) {
    return (
        <div
            className={[
                "rounded-[var(--radius-lg)]",
                "border border-[var(--border)]",
                "bg-[var(--surface)]",
                "shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
                paddingClasses[padding],
                className,
            ].join(" ")}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({
    className = "",
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={[
                "mb-5 flex items-start justify-between gap-4",
                className,
            ].join(" ")}
            {...props}
        />
    );
}

export function CardTitle({
    className = "",
    ...props
}: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={[
                "text-lg font-semibold text-[var(--text-primary)]",
                className,
            ].join(" ")}
            {...props}
        />
    );
}

export function CardDescription({
    className = "",
    ...props
}: HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={[
                "mt-1 text-sm text-[var(--text-secondary)]",
                className,
            ].join(" ")}
            {...props}
        />
    );
}

export function CardContent({
    className = "",
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={className} {...props} />
    );
}

export function CardFooter({
    className = "",
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={[
                "mt-5 flex items-center gap-3",
                className,
            ].join(" ")}
            {...props}
        />
    );
}