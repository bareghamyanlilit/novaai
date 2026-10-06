import type { BillingPlan } from "@/types/billing";

const STORAGE_KEY = "novaliaiai-billing-plan";
const STORAGE_EVENT = "novaliai-billing-plan-change";

const validPlans: BillingPlan[] = [
    "Free",
    "Pro",
    "Business",
];

let snapshot = "";
let initialized = false;

function readBillingPlan(): BillingPlan | null {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (
            !saved ||
            !validPlans.includes(
                saved as BillingPlan,
            )
        ) {
            return null;
        }

        return saved as BillingPlan;
    } catch {
        return null;
    }
}

function updateSnapshot() {
    snapshot = readBillingPlan() ?? "";
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

export function getSavedBillingPlan(): BillingPlan | null {
    return readBillingPlan();
}

export function saveBillingPlan(
    plan: BillingPlan,
) {
    if (typeof window === "undefined") {
        return;
    }

    if (!validPlans.includes(plan)) {
        return;
    }

    localStorage.setItem(
        STORAGE_KEY,
        plan,
    );

    updateSnapshot();

    window.dispatchEvent(
        new Event(STORAGE_EVENT),
    );
}

export function subscribeToBillingStore(
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

export function getBillingSnapshot() {
    return snapshot;
}

export function getBillingServerSnapshot() {
    return "";
}