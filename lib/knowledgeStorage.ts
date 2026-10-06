import { knowledgeSources as demoSources } from "@/data/knowledge";
import type { KnowledgeSource } from "@/types/knowledge";

const STORAGE_KEY = "novaliai-knowledge-sources";
const STORAGE_EVENT = "novaliai-knowledge-sources-change";

let snapshot = "";
let initialized = false;

function readSources(): KnowledgeSource[] | null {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return null;
        }

        return JSON.parse(saved) as KnowledgeSource[];
    } catch {
        return null;
    }
}

function updateSnapshot() {
    const sources = readSources();

    snapshot = sources
        ? JSON.stringify(sources)
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

    const saved = readSources();

    if (saved === null) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(demoSources),
        );
    }

    updateSnapshot();
}

export function getSavedKnowledgeSources():
    | KnowledgeSource[]
    | null {
    return readSources();
}

export function saveKnowledgeSources(
    sources: KnowledgeSource[],
) {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(sources),
    );

    updateSnapshot();

    window.dispatchEvent(
        new Event(STORAGE_EVENT),
    );
}

export function subscribeToKnowledgeStore(
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

export function getKnowledgeSnapshot() {
    return snapshot;
}

export function getKnowledgeServerSnapshot() {
    return "";
}