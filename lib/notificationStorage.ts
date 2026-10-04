import { notifications as demoNotifications } from "@/data/notifications";
import type { Notification } from "@/types/notification";

const STORAGE_KEY = "novaai-notifications";
const STORAGE_EVENT = "novaai-notifications-change";

let snapshot = "";
let initialized = false;

function readNotifications(): Notification[] | null {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return null;
        }

        return JSON.parse(
            saved,
        ) as Notification[];
    } catch {
        return null;
    }
}

function updateSnapshot() {
    const notifications =
        readNotifications();

    snapshot = notifications
        ? JSON.stringify(notifications)
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

    const saved = readNotifications();

    if (saved === null) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                demoNotifications,
            ),
        );
    }

    updateSnapshot();
}

export function getSavedNotifications():
    | Notification[]
    | null {
    return readNotifications();
}

export function saveNotifications(
    notifications: Notification[],
) {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(notifications),
    );

    updateSnapshot();

    window.dispatchEvent(
        new Event(STORAGE_EVENT),
    );
}

export function subscribeToNotificationStore(
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

export function getNotificationSnapshot() {
    return snapshot;
}

export function getNotificationServerSnapshot() {
    return "";
}