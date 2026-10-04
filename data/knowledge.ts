import type { KnowledgeSource } from "@/types/knowledge";

export const knowledgeSources: KnowledgeSource[] = [
    {
        id: "product-docs",
        name: "Product Documentation.pdf",
        type: "document",
        status: "ready",
        size: "2.4 MB",
        items: 184,
        updatedAt: "2 hours ago",
    },
    {
        id: "company-faq",
        name: "Company FAQ",
        type: "faq",
        status: "ready",
        size: "184 KB",
        items: 42,
        updatedAt: "5 hours ago",
    },
    {
        id: "help-center",
        name: "https://help.example.com",
        type: "website",
        status: "ready",
        size: "1.8 MB",
        items: 126,
        updatedAt: "1 day ago",
    },
    {
        id: "pricing-guide",
        name: "Pricing Guide.pdf",
        type: "document",
        status: "processing",
        size: "3.1 MB",
        items: 0,
        updatedAt: "10 minutes ago",
    },
    {
        id: "api-documentation",
        name: "API Documentation",
        type: "website",
        status: "failed",
        size: "—",
        items: 0,
        updatedAt: "2 days ago",
    },
];