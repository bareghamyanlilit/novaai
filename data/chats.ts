import type { ChatConversation } from "@/types/chat";

export const conversations: ChatConversation[] = [
    {
        id: "marketing-strategy",
        title: "Marketing Strategy",
        updatedAt: "2 min ago",
        messages: [
            {
                id: "message-1",
                role: "user",
                content:
                    "Create a simple marketing strategy for a new SaaS product.",
                createdAt: "10:24 AM",
            },
            {
                id: "message-2",
                role: "assistant",
                content:
                    "Start with a clear target audience, define your core value proposition, create educational content, and use product-focused campaigns to generate qualified leads.",
                createdAt: "10:24 AM",
            },
        ],
    },
    {
        id: "product-research",
        title: "Product Research",
        updatedAt: "1 hour ago",
        messages: [
            {
                id: "message-3",
                role: "user",
                content:
                    "What should I research before launching an AI product?",
                createdAt: "9:42 AM",
            },
            {
                id: "message-4",
                role: "assistant",
                content:
                    "Research your target users, competitors, pricing models, common workflows, technical requirements, and the main problems your product should solve.",
                createdAt: "9:42 AM",
            },
        ],
    },
    {
        id: "support-response",
        title: "Support Response",
        updatedAt: "Yesterday",
        messages: [
            {
                id: "message-5",
                role: "user",
                content:
                    "Write a professional response to a customer asking about a delayed order.",
                createdAt: "Yesterday",
            },
            {
                id: "message-6",
                role: "assistant",
                content:
                    "Thank you for reaching out. We apologize for the delay and appreciate your patience. Our team is checking the shipment status and will provide an update as soon as possible.",
                createdAt: "Yesterday",
            },
        ],
    },
];