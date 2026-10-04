"use client";

import {
    FileText,
    Globe,
    HelpCircle,
    Upload,
    X,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";

type SourceType = "document" | "website" | "faq";

interface AddSourceModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: {
        type: SourceType;
        fileName?: string;
        url?: string;
        faqText?: string;
    }) => void;
}

const sourceTypes: {
    type: SourceType;
    title: string;
    description: string;
    icon: typeof FileText;
}[] = [
        {
            type: "document",
            title: "Document",
            description: "Upload PDF, DOCX, or TXT files.",
            icon: FileText,
        },
        {
            type: "website",
            title: "Website",
            description: "Import content from a website URL.",
            icon: Globe,
        },
        {
            type: "faq",
            title: "FAQ",
            description: "Add frequently asked questions.",
            icon: HelpCircle,
        },
    ];

export function AddSourceModal({
    open,
    onClose,
    onAdd,
}: AddSourceModalProps) {
    const [type, setType] =
        useState<SourceType>("document");

    const [fileName, setFileName] = useState("");
    const [url, setUrl] = useState("");
    const [faqText, setFaqText] = useState("");

    if (!open) {
        return null;
    }

    function handleAdd() {
        onAdd({
            type,
            fileName,
            url,
            faqText,
        });
    }

    const canSubmit =
        type === "document"
            ? Boolean(fileName)
            : type === "website"
                ? Boolean(url.trim())
                : Boolean(faqText.trim());

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-5 py-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-source-title"
        >
            <div className="w-full max-w-[620px] overflow-hidden rounded-[var(--radius-xl)] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
                    <div>
                        <h2
                            id="add-source-title"
                            className="text-lg font-semibold text-[var(--text-primary)]"
                        >
                            Add Knowledge Source
                        </h2>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            Choose how you want to add information.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid gap-3 sm:grid-cols-3">
                        {sourceTypes.map((item) => {
                            const Icon = item.icon;
                            const active = type === item.type;

                            return (
                                <button
                                    key={item.type}
                                    type="button"
                                    onClick={() =>
                                        setType(item.type)
                                    }
                                    className={[
                                        "rounded-[var(--radius-lg)] border p-4 text-left transition-all",
                                        active
                                            ? "border-[var(--primary)] bg-[var(--primary-light)]"
                                            : "border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-secondary)]",
                                    ].join(" ")}
                                >
                                    <div
                                        className={[
                                            "flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)]",
                                            active
                                                ? "bg-white text-[var(--primary)]"
                                                : "bg-[var(--surface-secondary)] text-[var(--text-secondary)]",
                                        ].join(" ")}
                                    >
                                        <Icon size={19} />
                                    </div>

                                    <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
                                        {item.title}
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                                        {item.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-6">
                        {type === "document" && (
                            <label
                                htmlFor="document-upload"
                                className="flex cursor-pointer flex-col items-center justify-center rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--border-strong)] px-6 py-12 text-center transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary-light)]"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-light)] text-[var(--primary)]">
                                    <Upload size={21} />
                                </div>

                                <p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
                                    {fileName ||
                                        "Choose a document"}
                                </p>

                                <p className="mt-1 text-xs text-[var(--text-muted)]">
                                    PDF, DOCX, or TXT up to 25 MB
                                </p>

                                <input
                                    id="document-upload"
                                    type="file"
                                    accept=".pdf,.docx,.txt"
                                    className="hidden"
                                    onChange={(event) => {
                                        const file =
                                            event.target.files?.[0];

                                        if (file) {
                                            setFileName(file.name);
                                        }
                                    }}
                                />
                            </label>
                        )}

                        {type === "website" && (
                            <div>
                                <label
                                    htmlFor="website-url"
                                    className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                >
                                    Website URL
                                </label>

                                <input
                                    id="website-url"
                                    type="url"
                                    value={url}
                                    onChange={(event) =>
                                        setUrl(event.target.value)
                                    }
                                    placeholder="https://example.com/docs"
                                    className="h-12 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                                />

                                <p className="mt-2 text-xs text-[var(--text-muted)]">
                                    The demo will simulate importing content
                                    from this URL.
                                </p>
                            </div>
                        )}

                        {type === "faq" && (
                            <div>
                                <label
                                    htmlFor="faq-content"
                                    className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                >
                                    FAQ Content
                                </label>

                                <textarea
                                    id="faq-content"
                                    value={faqText}
                                    onChange={(event) =>
                                        setFaqText(
                                            event.target.value,
                                        )
                                    }
                                    rows={7}
                                    placeholder={`Q: How do I reset my password?\nA: Go to Settings and select Security.`}
                                    className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white px-4 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)]"
                                />
                            </div>
                        )}
                    </div>

                    
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-[var(--border)] bg-[var(--surface-secondary)] px-6 py-4 sm:flex-row sm:justify-end">
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleAdd}
                        disabled={!canSubmit}
                    >
                        Add Source
                    </Button>
                </div>
            </div>
        </div>
    );
}