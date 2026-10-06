const STORAGE_KEY = "novaliai-payment-method";
const STORAGE_EVENT =
    "novaliai-payment-method-change";

export interface SavedPaymentMethod {
    brand: "Visa" | "Mastercard";
    last4: string;
}

let snapshot = "";
let initialized = false;

function readPaymentMethod(): SavedPaymentMethod | null {
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
        ) as SavedPaymentMethod;
    } catch {
        return null;
    }
}

function updateSnapshot() {
    const saved = readPaymentMethod();

    snapshot = saved
        ? JSON.stringify(saved)
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

export function getSavedPaymentMethod():
    | SavedPaymentMethod
    | null {
    return readPaymentMethod();
}

export function savePaymentMethod(
    paymentMethod: SavedPaymentMethod,
) {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(paymentMethod),
    );

    updateSnapshot();

    window.dispatchEvent(
        new Event(STORAGE_EVENT),
    );
}

export function subscribeToPaymentStore(
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

export function getPaymentSnapshot() {
    return snapshot;
}

export function getPaymentServerSnapshot() {
    return "";
}