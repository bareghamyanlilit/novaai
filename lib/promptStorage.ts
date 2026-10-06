import type { Prompt } from "@/types/prompt";

const STORAGE_KEY = "novaliai-prompts";

export function getStoredPrompts(
    defaultPrompts: Prompt[],
): Prompt[] {
    if (typeof window === "undefined") {
        return defaultPrompts;
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(defaultPrompts),
            );

            return defaultPrompts;
        }

        const parsed = JSON.parse(stored);

        if (!Array.isArray(parsed)) {
            return defaultPrompts;
        }

        return parsed as Prompt[];
    } catch {
        return defaultPrompts;
    }
}

export function savePrompts(prompts: Prompt[]) {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(prompts),
    );
}

export function deletePrompt(promptId: string) {
    const currentPrompts = getStoredPrompts([]);

    const updatedPrompts = currentPrompts.filter(
        (prompt) => prompt.id !== promptId,
    );

    savePrompts(updatedPrompts);

    return updatedPrompts;
}