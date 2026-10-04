export type KnowledgeSourceType =
    | "document"
    | "website"
    | "faq";

export type KnowledgeSourceStatus =
    | "ready"
    | "processing"
    | "failed";

export interface KnowledgeSource {
    id: string;
    name: string;
    type: KnowledgeSourceType;
    status: KnowledgeSourceStatus;
    size: string;
    items: number;
    updatedAt: string;
}