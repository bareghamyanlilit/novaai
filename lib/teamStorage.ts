import { teamMembers as demoMembers } from "@/data/team";
import type { TeamMember } from "@/types/team";

const STORAGE_KEY = "novaliai-team-members";
const STORAGE_EVENT = "novaliai-team-members-change";

let snapshot = "";
let initialized = false;

function readMembers(): TeamMember[] | null {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return null;
        }

        return JSON.parse(saved) as TeamMember[];
    } catch {
        return null;
    }
}

function updateSnapshot() {
    const members = readMembers();

    snapshot = members
        ? JSON.stringify(members)
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

    const saved = readMembers();

    if (saved === null) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(demoMembers),
        );
    }

    updateSnapshot();
}

export function getSavedTeamMembers():
    | TeamMember[]
    | null {
    return readMembers();
}

export function saveTeamMembers(
    members: TeamMember[],
) {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(members),
    );

    updateSnapshot();

    window.dispatchEvent(
        new Event(STORAGE_EVENT),
    );
}

export function subscribeToTeamStore(
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

export function getTeamSnapshot() {
    return snapshot;
}

export function getTeamServerSnapshot() {
    return "";
}