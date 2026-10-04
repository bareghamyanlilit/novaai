import type { Agent } from "@/types/agent";

export const agents: Agent[] = [
    {
        id: "marketing-agent",
        name: "Marketing Agent",
        description:
            "Create and optimize marketing content for your team.",
        status: "active",
        model: "GPT",
        tasks: 1240,
        successRate: 94,
        updatedAt: "2 hours ago",
    },
    {
        id: "support-agent",
        name: "Support Agent",
        description:
            "Assist customers with common questions and requests.",
        status: "active",
        model: "Claude",
        tasks: 856,
        successRate: 97,
        updatedAt: "5 hours ago",
    },
    {
        id: "research-agent",
        name: "Research Agent",
        description:
            "Research topics and summarize useful information.",
        status: "training",
        model: "GPT",
        tasks: 342,
        successRate: 89,
        updatedAt: "1 day ago",
    },
    {
        id: "sales-agent",
        name: "Sales Agent",
        description:
            "Help your sales team qualify and manage leads.",
        status: "inactive",
        model: "Custom",
        tasks: 621,
        successRate: 91,
        updatedAt: "3 days ago",
    },
];