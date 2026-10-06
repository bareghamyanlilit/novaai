import { defaultSettings } from "@/data/settings";
import type { UserSettings } from "@/types/settings";

const STORAGE_KEY = "novaliai-settings";
const STORAGE_EVENT = "novaliai-settings-change";

let snapshot = "";
let initialized = false;

function readSettings(): UserSettings | null {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return null;
        }

        return JSON.parse(saved) as UserSettings;
    } catch {
        return null;
    }
}

function updateSnapshot() {
    const settings = readSettings();

    snapshot = settings
        ? JSON.stringify(settings)
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

    const saved = readSettings();

    if (saved === null) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultSettings),
        );
    }

    updateSnapshot();
}

export function getSavedSettings(): UserSettings | null {
    return readSettings();
}

export function saveSettings(
    settings: UserSettings,
) {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(settings),
    );

    updateSnapshot();

    window.dispatchEvent(
        new Event(STORAGE_EVENT),
    );
}

export function subscribeToSettingsStore(
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

export function getSettingsSnapshot() {
    return snapshot;
}

export function getSettingsServerSnapshot() {
    return "";
}