import type { BillingPlan, Invoice } from "@/types/billing";

export const billingPlanLimits: Record<
    BillingPlan,
    {
        aiRequestLimit: number;
        agentLimit: number | null;
        teamMemberLimit: number | null;
        storageLimit: number;
    }
> = {
    Free: {
        aiRequestLimit: 500,
        agentLimit: 2,
        teamMemberLimit: 1,
        storageLimit: 0.1,
    },

    Pro: {
        aiRequestLimit: 10000,
        agentLimit: 20,
        teamMemberLimit: 10,
        storageLimit: 10,
    },

    Business: {
        aiRequestLimit: 50000,
        agentLimit: null,
        teamMemberLimit: null,
        storageLimit: 100,
    },
};

export const billingUsage: Record<
    BillingPlan,
    {
        aiRequests: number;
        agents: number;
        teamMembers: number;
        storage: number;
    }
> = {
    Free: {
        aiRequests: 320,
        agents: 1,
        teamMembers: 1,
        storage: 0.06,
    },

    Pro: {
        aiRequests: 6840,
        agents: 8,
        teamMembers: 6,
        storage: 6.4,
    },

    Business: {
        aiRequests: 18400,
        agents: 14,
        teamMembers: 8,
        storage: 18,
    },
};

export const invoices: Invoice[] = [
    {
        id: "INV-2026-004",
        date: "Apr 01, 2026",
        amount: "$29.00",
        status: "Paid",
        plan: "Pro",
    },
    {
        id: "INV-2026-003",
        date: "Mar 01, 2026",
        amount: "$29.00",
        status: "Paid",
        plan: "Pro",
    },
    {
        id: "INV-2026-002",
        date: "Feb 01, 2026",
        amount: "$29.00",
        status: "Paid",
        plan: "Pro",
    },
    {
        id: "INV-2026-001",
        date: "Jan 01, 2026",
        amount: "$29.00",
        status: "Paid",
        plan: "Pro",
    },
];