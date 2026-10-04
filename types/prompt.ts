export type PromptCategory =
    | "Marketing"
    | "Sales"
    | "Support"
    | "Research"
    | "Productivity";

export interface Prompt {
    id: string;
    title: string;
    description: string;
    content: string;
    category: PromptCategory;
    usageCount: number;
    updatedAt: string;
    favorite: boolean;
}