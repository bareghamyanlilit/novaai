"use client";

import {
    Eye,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SourceActionsProps {
    sourceName: string;
    onDelete: () => void;
}

export function SourceActions({
    sourceName,
    onDelete,
}: SourceActionsProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(
                    event.target as Node,
                )
            ) {
                setOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside,
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside,
            );
        };
    }, []);

    function handleDelete() {
        const confirmed = window.confirm(
            `Delete "${sourceName}"?`,
        );

        if (!confirmed) {
            return;
        }

        onDelete();
        setOpen(false);
    }

    return (
        <div
            ref={menuRef}
            className="relative"
        >
            <button
                type="button"
                aria-label={`Actions for ${sourceName}`}
                aria-expanded={open}
                onClick={() =>
                    setOpen((value) => !value)
                }
                className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
            >
                <MoreHorizontal size={18} />
            </button>

            {open && (
                <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-white p-1 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                    <button
                        type="button"
                        onClick={() =>
                            setOpen(false)
                        }
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                    >
                        <Eye size={16} />
                        View
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setOpen(false)
                        }
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                    >
                        <Pencil size={16} />
                        Rename
                    </button>

                    <div className="my-1 border-t border-[var(--border)]" />

                    <button
                        type="button"
                        onClick={handleDelete}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}