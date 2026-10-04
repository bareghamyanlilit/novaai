import type { Prompt } from "@/types/prompt";

export const prompts: Prompt[] = [
    {
        id: "marketing-copy",
        title: "Marketing Copy Generator",
        description:
            "Create clear and engaging marketing copy for your campaigns.",
        content:
            "Write persuasive marketing copy for the following product. Focus on the main benefits, target audience, and a clear call to action.",
        category: "Marketing",
        usageCount: 428,
        updatedAt: "2 hours ago",
        favorite: true,
    },
    {
        id: "sales-email",
        title: "Sales Email Writer",
        description:
            "Generate concise sales emails tailored to potential customers.",
        content:
            "Write a professional sales email for a potential customer. Keep it concise, helpful, and focused on the customer&apos;s needs.",
        category: "Sales",
        usageCount: 312,
        updatedAt: "5 hours ago",
        favorite: false,
    },
    {
        id: "support-response",
        title: "Customer Support Response",
        description:
            "Create helpful and professional responses to customer questions.",
        content:
            "Write a friendly customer support response. Clearly explain the solution and provide the next steps.",
        category: "Support",
        usageCount: 267,
        updatedAt: "1 day ago",
        favorite: true,
    },
    {
        id: "research-summary",
        title: "Research Summarizer",
        description:
            "Turn long research material into concise useful summaries.",
        content:
            "Summarize the following research material. Extract the main findings, important facts, and key conclusions.",
        category: "Research",
        usageCount: 198,
        updatedAt: "2 days ago",
        favorite: false,
    },
    {
        id: "meeting-summary",
        title: "Meeting Summary",
        description:
            "Convert meeting notes into clear summaries and action items.",
        content:
            "Turn these meeting notes into a structured summary. Include decisions, action items, owners, and deadlines.",
        category: "Productivity",
        usageCount: 154,
        updatedAt: "3 days ago",
        favorite: false,
    },
];