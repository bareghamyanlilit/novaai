import type { ChatConversation } from "@/types/chat";

const STORAGE_KEY = "novaliai-chat-conversations";
const STORAGE_EVENT = "novaliai-chat-conversations-change";

let snapshot = "";
let initialized = false;

function readConversations(): ChatConversation[] | null {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return null;
        }

        return JSON.parse(saved) as ChatConversation[];
    } catch {
        return null;
    }
}

function updateSnapshot() {
    const conversations = readConversations();

    snapshot = conversations
        ? JSON.stringify(conversations)
        : "";
}

function initializeStore() {
    if (
        initialized ||
        typeof window === "undefined"
    ) {
        return;
    }

    initialized = true;
    updateSnapshot();
}

export function getSavedConversations():
    | ChatConversation[]
    | null {
    return readConversations();
}

export function saveConversations(
    conversations: ChatConversation[],
) {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(conversations),
    );

    updateSnapshot();

    window.dispatchEvent(
        new Event(STORAGE_EVENT),
    );
}

export function subscribeToChatStore(
    callback: () => void,
) {
    if (typeof window === "undefined") {
        return () => {};
    }

    initializeStore();

    const handleChange = () => {
        updateSnapshot();
        callback();
    };

    window.addEventListener(
        "storage",
        handleChange,
    );

    window.addEventListener(
        STORAGE_EVENT,
        handleChange,
    );

    return () => {
        window.removeEventListener(
            "storage",
            handleChange,
        );

        window.removeEventListener(
            STORAGE_EVENT,
            handleChange,
        );
    };
}

export function getChatSnapshot() {
    return snapshot;
}

export function getChatServerSnapshot() {
    return "";
}