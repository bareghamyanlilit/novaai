import type { Workflow } from "@/types/workflow";

const STORAGE_KEY = "novaai-workflows";
const STORAGE_EVENT = "novaai-workflows-change";

let snapshot = "";
let initialized = false;

function readWorkflows(): Workflow[] {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return [];
        }

        return JSON.parse(saved) as Workflow[];
    } catch {
        return [];
    }
}

function updateSnapshot() {
    snapshot = JSON.stringify(readWorkflows());
}

function initializeStore() {
    if (initialized || typeof window === "undefined") {
        return;
    }

    initialized = true;
    updateSnapshot();
}

export function getSavedWorkflows(): Workflow[] {
    return readWorkflows();
}

export function saveWorkflows(
    workflows: Workflow[],
) {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(workflows),
    );

    updateSnapshot();

    window.dispatchEvent(
        new Event(STORAGE_EVENT),
    );
}

export function resetSavedWorkflows() {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.removeItem(STORAGE_KEY);

    updateSnapshot();

    window.dispatchEvent(
        new Event(STORAGE_EVENT),
    );
}

export function subscribeToWorkflowStore(
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

export function getWorkflowSnapshot() {
    return snapshot;
}

export function getWorkflowServerSnapshot() {
    return "";
}