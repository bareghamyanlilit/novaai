import type { Workflow } from "@/types/workflow";

export const workflows: Workflow[] = [
    {
        id: "customer-support",
        name: "Customer Support Automation",
        description:
            "Automatically process customer questions and generate helpful responses.",
        status: "active",
        runs: 1284,
        successRate: 96,
        updatedAt: "2 hours ago",
        nodes: [
            {
                id: "trigger-1",
                type: "trigger",
                title: "New Support Message",
                description: "Customer sends a new message",
            },
            {
                id: "condition-1",
                type: "condition",
                title: "Check Priority",
                description: "Determine if the request is urgent",
            },
            {
                id: "agent-1",
                type: "agent",
                title: "Support Agent",
                description: "Generate a helpful response",
            },
            {
                id: "action-1",
                type: "action",
                title: "Send Response",
                description: "Send response to the customer",
            },
        ],
    },
    {
        id: "lead-qualification",
        name: "Lead Qualification",
        description:
            "Analyze new leads and automatically qualify potential customers.",
        status: "active",
        runs: 846,
        successRate: 93,
        updatedAt: "5 hours ago",
        nodes: [
            {
                id: "trigger-1",
                type: "trigger",
                title: "New Lead",
                description: "A new lead is created",
            },
            {
                id: "condition-1",
                type: "condition",
                title: "Check Lead Score",
                description: "Check the lead qualification score",
            },
            {
                id: "agent-1",
                type: "agent",
                title: "Sales Agent",
                description: "Analyze the lead",
            },
            {
                id: "action-1",
                type: "action",
                title: "Update CRM",
                description: "Save qualification results",
            },
        ],
    },
    {
        id: "content-generation",
        name: "Content Generation",
        description:
            "Generate marketing content from a simple content request.",
        status: "draft",
        runs: 324,
        successRate: 91,
        updatedAt: "1 day ago",
        nodes: [
            {
                id: "trigger-1",
                type: "trigger",
                title: "Content Request",
                description: "A team member creates a request",
            },
            {
                id: "agent-1",
                type: "agent",
                title: "Marketing Agent",
                description: "Create the requested content",
            },
            {
                id: "action-1",
                type: "action",
                title: "Save Draft",
                description: "Save generated content",
            },
        ],
    },
];