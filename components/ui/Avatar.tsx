"use client";

import Image from "next/image";
import { useState } from "react";

interface AvatarProps {
    src?: string;
    alt?: string;
    name?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
};

function getInitials(name = "") {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

export function Avatar({
    src,
    alt = "",
    name = "",
    size = "md",
}: AvatarProps) {
    const [imageError, setImageError] = useState(false);

    const showImage = Boolean(src) && !imageError;

    return (
        <div
            className={[
                "relative flex shrink-0 items-center justify-center",
                "overflow-hidden rounded-full",
                "bg-[var(--primary-light)]",
                "font-semibold text-[var(--primary)]",
                sizeClasses[size],
            ].join(" ")}
        >
            {showImage ? (
                <Image
                    src={src!}
                    alt={alt || name}
                    fill
                    sizes="64px"
                    className="object-cover"
                    onError={() => setImageError(true)}
                />
            ) : (
                getInitials(name)
            )}
        </div>
    );
}