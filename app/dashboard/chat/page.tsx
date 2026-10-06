"use client";

import {
    AlertTriangle,
    Bot,
    Check,
    Copy,
    Eraser,
    Menu,
    MessageSquare,
    MoreHorizontal,
    Paperclip,
    Pencil,
    Plus,
    RefreshCw,
    Send,
    Sparkles,
    Trash2,
    X,
} from "lucide-react";
import {
    useEffect,
    useMemo,
    useRef,
    useState,
    useSyncExternalStore,
} from "react";
import { Button } from "@/components/ui/Button";
import { conversations as demoConversations } from "@/data/chats";
import {
    getChatServerSnapshot,
    getChatSnapshot,
    saveConversations,
    subscribeToChatStore,
} from "@/lib/chatStorage";
import type {
    ChatConversation,
    ChatMessage,
} from "@/types/chat";

function createId(prefix: string) {
    return `${prefix}-${crypto.randomUUID()}`;
}

export default function ChatPage() {

    const [activeConversationId, setActiveConversationId] =
        useState<string | null>(null);

    const chatSnapshot = useSyncExternalStore(
        subscribeToChatStore,
        getChatSnapshot,
        getChatServerSnapshot,
    );

    const conversations = useMemo(() => {
        if (!chatSnapshot) {
            return demoConversations;
        }

        try {
            return JSON.parse(
                chatSnapshot,
            ) as ChatConversation[];
        } catch {
            return demoConversations;
        }
    }, [chatSnapshot]);
    const [message, setMessage] = useState("");
    const [copiedMessageId, setCopiedMessageId] =
        useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openMenuId, setOpenMenuId] =
        useState<string | null>(null);
    const [editingConversationId, setEditingConversationId] =
        useState<string | null>(null);

    const [editingTitle, setEditingTitle] =
        useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [clearConversationId, setClearConversationId] =
        useState<string | null>(null);

    const selectedConversationId =
        activeConversationId ?? conversations[0]?.id ?? null;

    const activeConversation = useMemo(
        () =>
            conversations.find(
                (conversation) =>
                    conversation.id === selectedConversationId,
            ) ?? null,
        [conversations, selectedConversationId],
    );

    function startRenameConversation(
        conversation: ChatConversation,
    ) {
        setEditingConversationId(conversation.id);
        setEditingTitle(conversation.title);
        setOpenMenuId(null);
    }

    function saveConversationTitle(
        conversationId: string,
    ) {
        const title = editingTitle.trim();

        if (!title) {
            return;
        }

        const updatedConversations = conversations.map(
            (conversation) =>
                conversation.id === conversationId
                    ? {
                        ...conversation,
                        title: title.slice(0, 60),
                        updatedAt: "Just now",
                    }
                    : conversation,
        );

        saveConversations(updatedConversations);

        setEditingConversationId(null);
        setEditingTitle("");
    }

    function deleteConversation(conversationId: string) {
        const remaining = conversations.filter(
            (conversation) =>
                conversation.id !== conversationId,
        );

        saveConversations(remaining);
        setOpenMenuId(null);

        if (activeConversationId === conversationId) {
            setActiveConversationId(
                remaining[0]?.id ?? null,
            );
        }

        setSidebarOpen(false);
    }

    function createNewChat() {
        const newConversation: ChatConversation = {
            id: createId("chat"),
            title: "New conversation",
            updatedAt: "Just now",
            messages: [],
        };

        saveConversations([
            newConversation,
            ...conversations,
        ]);

        setActiveConversationId(newConversation.id);
        setMessage("");
        setSidebarOpen(false);
    }

    function sendMessage() {
        if (isTyping) {
            return;
        }

        const trimmedMessage = message.trim();

        if (!trimmedMessage || !activeConversation) {
            return;
        }

        const conversationId = activeConversation.id;

        const userMessage: ChatMessage = {
            id: createId("message"),
            role: "user",
            content: trimmedMessage,
            createdAt: "Just now",
        };

        saveConversations(
            conversations.map((conversation) =>
                conversation.id === conversationId
                    ? {
                        ...conversation,
                        title:
                            conversation.messages.length === 0
                                ? trimmedMessage.slice(0, 35)
                                : conversation.title,
                        updatedAt: "Just now",
                        messages: [
                            ...conversation.messages,
                            userMessage,
                        ],
                    }
                    : conversation,
            ),
        );

        setMessage("");
        setIsTyping(true);

        window.setTimeout(() => {
            const assistantMessage: ChatMessage = {
                id: createId("message"),
                role: "assistant",
                content:
                    "This is a demo AI response. Connect your preferred AI API to generate real responses.",
                createdAt: "Just now",
            };

            const latestConversations =
                JSON.parse(
                    getChatSnapshot() || "[]",
                ) as ChatConversation[];

            saveConversations(
                latestConversations.map((conversation) =>
                    conversation.id === conversationId
                        ? {
                            ...conversation,
                            messages: [
                                ...conversation.messages,
                                assistantMessage,
                            ],
                            updatedAt: "Just now",
                        }
                        : conversation,
                ),
            );

            setIsTyping(false);
        }, 700);
    }

    function regenerateResponse(
        conversationId: string,
    ) {
        if (isTyping) {
            return;
        }

        const conversation = conversations.find(
            (item) => item.id === conversationId,
        );

        if (!conversation) {
            return;
        }

        const lastMessage =
            conversation.messages[
            conversation.messages.length - 1
            ];

        if (!lastMessage || lastMessage.role !== "assistant") {
            return;
        }

        saveConversations(
            conversations.map((item) =>
                item.id === conversationId
                    ? {
                        ...item,
                        messages: item.messages.slice(
                            0,
                            -1,
                        ),
                        updatedAt: "Just now",
                    }
                    : item,
            ),
        );

        setIsTyping(true);

        window.setTimeout(() => {
            const regeneratedMessage: ChatMessage = {
                id: createId("message"),
                role: "assistant",
                content:
                    "Here is another demo response. Connect your preferred AI provider to generate dynamic answers.",
                createdAt: "Just now",
            };

            const latestConversations =
                JSON.parse(
                    getChatSnapshot() || "[]",
                ) as ChatConversation[];

            saveConversations(
                latestConversations.map((item) =>
                    item.id === conversationId
                        ? {
                            ...item,
                            messages: [
                                ...item.messages,
                                regeneratedMessage,
                            ],
                            updatedAt: "Just now",
                        }
                        : item,
                ),
            );

            setIsTyping(false);
        }, 700);
    }

    async function copyMessage(
        messageId: string,
        content: string,
    ) {
        try {
            await navigator.clipboard.writeText(content);

            setCopiedMessageId(messageId);

            window.setTimeout(() => {
                setCopiedMessageId(null);
            }, 1500);
        } catch {
            setCopiedMessageId(null);
        }
    }

    function requestClearConversation(
        conversationId: string,
    ) {
        setOpenMenuId(null);
        setClearConversationId(conversationId);
    }

    function clearConversation() {
        if (!clearConversationId) {
            return;
        }

        saveConversations(
            conversations.map((conversation) =>
                conversation.id === clearConversationId
                    ? {
                        ...conversation,
                        messages: [],
                        updatedAt: "Just now",
                    }
                    : conversation,
            ),
        );

        setMessage("");
        setIsTyping(false);
        setClearConversationId(null);
    }

    useEffect(() => {
        if (!clearConversationId) {
            return;
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setClearConversationId(null);
            }
        }

        window.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [clearConversationId]);

    return (
        <div className="-mx-5 -my-6 flex h-[calc(100vh-80px)] min-h-[620px] overflow-hidden md:-mx-8 md:-my-8 xl:-mx-10 xl:-my-10">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close conversations"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/20 lg:hidden"
                />
            )}

            {/* Conversations */}
            <aside
                className={[
                    "absolute inset-y-0 left-0 z-50 flex w-[300px] flex-col border-r border-[var(--border)] bg-white transition-transform duration-200 lg:relative lg:z-auto lg:translate-x-0",
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full",
                ].join(" ")}
            >
                <div className="flex h-16 items-center justify-between border-b border-[var(--border)] px-5">
                    <div>
                        <h1 className="text-sm font-semibold text-[var(--text-primary)]">
                            AI Chat
                        </h1>

                        <p className="text-xs text-[var(--text-muted)]">
                            Your conversations
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--surface-secondary)] lg:hidden"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-4">
                    <Button
                        className="w-full justify-center"
                        onClick={createNewChat}
                    >
                        <Plus size={17} />
                        New Chat
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto px-3 pb-4">
                    <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                        Conversations
                    </p>

                    <div className="space-y-1">
                        {conversations.map((conversation) => {
                            const active =
                                conversation.id ===
                                activeConversationId;

                            return (
                                <div
                                    key={conversation.id}
                                    className="group relative"
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActiveConversationId(
                                                conversation.id,
                                            );
                                            setSidebarOpen(false);
                                            setOpenMenuId(null);
                                        }}
                                        className={[
                                            "flex w-full items-start gap-3 rounded-[var(--radius-md)] px-3 py-3 pr-11 text-left transition-colors",
                                            active
                                                ? "bg-[var(--primary-light)] text-[var(--primary)]"
                                                : "text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]",
                                        ].join(" ")}
                                    >
                                        <MessageSquare
                                            size={17}
                                            className="mt-0.5 shrink-0"
                                        />

                                        <div className="min-w-0 flex-1">
                                            {editingConversationId ===
                                                conversation.id ? (
                                                <input
                                                    autoFocus
                                                    value={editingTitle}
                                                    maxLength={60}
                                                    onChange={(event) =>
                                                        setEditingTitle(
                                                            event.target.value,
                                                        )
                                                    }
                                                    onClick={(event) =>
                                                        event.stopPropagation()
                                                    }
                                                    onKeyDown={(event) => {
                                                        if (event.key === "Enter") {
                                                            event.preventDefault();

                                                            saveConversationTitle(
                                                                conversation.id,
                                                            );
                                                        }

                                                        if (event.key === "Escape") {
                                                            setEditingConversationId(
                                                                null,
                                                            );
                                                            setEditingTitle("");
                                                        }
                                                    }}
                                                    onBlur={() => {
                                                        if (editingTitle.trim()) {
                                                            saveConversationTitle(
                                                                conversation.id,
                                                            );
                                                        } else {
                                                            setEditingConversationId(
                                                                null,
                                                            );
                                                            setEditingTitle("");
                                                        }
                                                    }}
                                                    className="w-full rounded-md border border-[var(--primary)] bg-white px-2 py-1 text-sm font-medium text-[var(--text-primary)] outline-none"
                                                />
                                            ) : (
                                                <>
                                                    <p
                                                        className={[
                                                            "truncate text-sm font-medium",
                                                            active
                                                                ? "text-[var(--primary)]"
                                                                : "text-[var(--text-primary)]",
                                                        ].join(" ")}
                                                    >
                                                        {conversation.title}
                                                    </p>

                                                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                                                        {conversation.updatedAt}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        aria-label={`Conversation actions for ${conversation.title}`}
                                        onClick={(event) => {
                                            event.stopPropagation();

                                            setOpenMenuId(
                                                openMenuId ===
                                                    conversation.id
                                                    ? null
                                                    : conversation.id,
                                            );
                                        }}
                                        className={[
                                            "absolute right-2 top-2.5 rounded-lg p-1.5 text-[var(--text-muted)] transition",
                                            "hover:bg-white hover:text-[var(--text-primary)]",
                                            "opacity-0 group-hover:opacity-100",
                                            active
                                                ? "opacity-100"
                                                : "",
                                        ].join(" ")}
                                    >
                                        <MoreHorizontal size={17} />
                                    </button>

                                    {openMenuId === conversation.id && (
                                        <div className="absolute right-2 top-11 z-20 w-44 rounded-[var(--radius-md)] border border-[var(--border)] bg-white p-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();

                                                    startRenameConversation(
                                                        conversation,
                                                    );
                                                }}
                                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                                            >
                                                <Pencil size={15} />
                                                Rename
                                            </button>

                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();

                                                    deleteConversation(
                                                        conversation.id,
                                                    );
                                                }}
                                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[var(--danger)] transition-colors hover:bg-red-50"
                                            >
                                                <Trash2 size={15} />
                                                Delete conversation
                                            </button>

                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();

                                                    requestClearConversation(
                                                        conversation.id,
                                                    );
                                                }}
                                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-slate-50"
                                            >
                                                <Eraser size={15} />
                                                Clear conversation
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </aside>

            {/* Chat */}
            <section className="flex min-w-0 flex-1 flex-col bg-[var(--surface-secondary)]">
                {/* Header */}
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--border)] bg-white px-4 md:px-6">
                    <div className="flex min-w-0 items-center gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                setSidebarOpen(true)
                            }
                            className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] lg:hidden"
                        >
                            <Menu size={19} />
                        </button>

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-light)] text-[var(--primary)]">
                            <Bot size={18} />
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-sm font-semibold text-[var(--text-primary)]">
                                {activeConversation?.title ??
                                    "AI Assistant"}
                            </h2>

                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                                <span className="text-xs text-[var(--text-muted)]">
                                    AI Assistant
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden items-center gap-2 sm:flex">
                        <span className="rounded-full bg-[var(--primary-light)] px-2.5 py-1 text-xs font-medium text-[var(--primary)]">
                            Demo
                        </span>
                    </div>
                </header>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto">
                    <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6">
                        {!activeConversation ||
                            activeConversation.messages.length ===
                            0 ? (
                            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-[var(--primary)]">
                                    <Sparkles size={25} />
                                </div>

                                <h2 className="mt-5 text-xl font-semibold text-[var(--text-primary)]">
                                    How can I help you?
                                </h2>

                                <p className="mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                                    Ask questions, generate ideas,
                                    analyze information, or
                                    automate your workflow.
                                </p>

                                <div className="mt-6 flex flex-wrap justify-center gap-2">
                                    {[
                                        "Create a marketing plan",
                                        "Analyze my workflow",
                                        "Write a customer reply",
                                    ].map((suggestion) => (
                                        <button
                                            key={
                                                suggestion
                                            }
                                            type="button"
                                            onClick={() =>
                                                setMessage(
                                                    suggestion,
                                                )
                                            }
                                            className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-7">
                                {activeConversation.messages.map(
                                    (chatMessage) => {
                                        const isUser =
                                            chatMessage.role ===
                                            "user";

                                        return (
                                            <div
                                                key={
                                                    chatMessage.id
                                                }
                                                className={[
                                                    "flex gap-3",
                                                    isUser
                                                        ? "justify-end"
                                                        : "justify-start",
                                                ].join(
                                                    " ",
                                                )}
                                            >
                                                {!isUser && (
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-light)] text-[var(--primary)]">
                                                        <Bot
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    </div>
                                                )}

                                                <div
                                                    className={[
                                                        "max-w-[85%] md:max-w-[70%]",
                                                        isUser
                                                            ? "items-end"
                                                            : "items-start",
                                                    ].join(
                                                        " ",
                                                    )}
                                                >
                                                    <div
                                                        className={[
                                                            "rounded-2xl px-4 py-3 text-sm leading-6",
                                                            isUser
                                                                ? "rounded-br-md bg-[var(--primary)] text-white"
                                                                : "rounded-bl-md border border-[var(--border)] bg-white text-[var(--text-primary)]",
                                                        ].join(
                                                            " ",
                                                        )}
                                                    >
                                                        {
                                                            chatMessage.content
                                                        }
                                                    </div>

                                                    <div
                                                        className={[
                                                            "mt-2 flex items-center gap-2",
                                                            isUser
                                                                ? "justify-end"
                                                                : "justify-start",
                                                        ].join(
                                                            " ",
                                                        )}
                                                    >
                                                        <span className="text-[11px] text-[var(--text-muted)]">
                                                            {
                                                                chatMessage.createdAt
                                                            }
                                                        </span>

                                                        {!isUser && (
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        copyMessage(
                                                                            chatMessage.id,
                                                                            chatMessage.content,
                                                                        )
                                                                    }
                                                                    className="rounded p-1 text-[var(--text-muted)] transition-colors hover:bg-white hover:text-[var(--text-primary)]"
                                                                    aria-label="Copy message"
                                                                >
                                                                    {copiedMessageId ===
                                                                        chatMessage.id ? (
                                                                        <Check size={14} />
                                                                    ) : (
                                                                        <Copy size={14} />
                                                                    )}
                                                                </button>

                                                                {chatMessage.id ===
                                                                    activeConversation.messages[
                                                                        activeConversation.messages.length -
                                                                        1
                                                                    ]?.id && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                regenerateResponse(
                                                                                    activeConversation.id,
                                                                                )
                                                                            }
                                                                            disabled={isTyping}
                                                                            className="rounded p-1 text-[var(--text-muted)] transition-colors hover:bg-white hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-50"
                                                                            aria-label="Regenerate response"
                                                                        >
                                                                            <RefreshCw
                                                                                size={14}
                                                                            />
                                                                        </button>
                                                                    )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                {isUser && (
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-slate-200 text-xs font-semibold text-slate-600">
                                                        You
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    },
                                )}

                                {isTyping && (
                                    <div className="flex gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-light)] text-[var(--primary)]">
                                            <Bot size={17} />
                                        </div>

                                        <div className="rounded-2xl rounded-bl-md border border-[var(--border)] bg-white px-4 py-3">
                                            <div className="flex items-center gap-1">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
                                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
                                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Input */}
                <div className="shrink-0 border-t border-[var(--border)] bg-white p-4 md:p-5">
                    <div className="mx-auto max-w-4xl">
                        <div className="rounded-[var(--radius-lg)] border border-[var(--border-strong)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary-light)]">
                            <textarea
                                value={message}
                                onChange={(event) =>
                                    setMessage(
                                        event.target.value,
                                    )
                                }
                                onKeyDown={(event) => {
                                    if (
                                        event.key ===
                                        "Enter" &&
                                        !event.shiftKey
                                    ) {
                                        event.preventDefault();
                                        sendMessage();
                                    }
                                }}
                                rows={2}
                                placeholder="Message AI Assistant..."
                                aria-label="Message AI Assistant"
                                className="w-full resize-none border-0 bg-transparent px-4 pt-3 text-sm leading-6 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
                            />

                            <div className="flex items-center justify-between px-3 pb-3">
                                <div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        onChange={() => {}}
                                    />

                                    <button
                                        type="button"
                                        aria-label="Attach file"
                                        title="Attach file"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                                    >
                                        <Paperclip size={18} />
                                    </button>
                                </div>
                                <Button
                                    onClick={sendMessage}
                                    disabled={
                                        !message.trim() ||
                                        !activeConversation ||
                                        isTyping
                                    }
                                >
                                    <Send size={16} />
                                    <span className="hidden sm:inline">
                                        Send
                                    </span>
                                </Button>
                            </div>
                        </div>

                        <p className="mt-2 text-center text-[11px] text-[var(--text-muted)]">
                            Demo AI interface · Connect your own
                            AI provider to enable real responses.
                        </p>
                    </div>
                </div>
            </section>
            {clearConversationId && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4 backdrop-blur-[2px]"
                    onMouseDown={() =>
                        setClearConversationId(null)
                    }
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="clear-conversation-title"
                        className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                        onMouseDown={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                <AlertTriangle size={21} />
                            </div>

                            <div className="min-w-0">
                                <h2
                                    id="clear-conversation-title"
                                    className="text-lg font-semibold text-[var(--text-primary)]"
                                >
                                    Clear conversation?
                                </h2>

                                <p className="mt-1.5 text-sm leading-6 text-[var(--text-secondary)]">
                                    All messages in this conversation
                                    will be removed. The conversation
                                    itself will remain.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setClearConversationId(null)
                                }
                                className="rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-slate-50"
                            >
                                Cancel
                            </button>

                            <Button
                                type="button"
                                variant="primary"
                                onClick={clearConversation}
                            >
                                Clear conversation
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}