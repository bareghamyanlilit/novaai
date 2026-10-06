import type { Agent } from "@/types/agent";

const STORAGE_KEY = "novaliai-agents";

export function getStoredAgents(defaultAgents: Agent[]): Agent[] {
    if (typeof window === "undefined") {
        return defaultAgents;
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(defaultAgents),
            );

            return defaultAgents;
        }

        const parsed = JSON.parse(stored);

        if (!Array.isArray(parsed)) {
            return defaultAgents;
        }

        return parsed as Agent[];
    } catch {
        return defaultAgents;
    }
}

export function saveAgents(agents: Agent[]) {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
}

export function deleteAgent(agentId: string) {
    const currentAgents = getStoredAgents([]);

    const updatedAgents = currentAgents.filter(
        (agent) => agent.id !== agentId,
    );

    saveAgents(updatedAgents);

    return updatedAgents;
}