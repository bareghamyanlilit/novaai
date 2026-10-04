export type BillingPlan =
    | "Free"
    | "Pro"
    | "Business";

export interface BillingUsage {
    aiRequests: number;
    aiRequestLimit: number;
    agents: number;
    agentLimit: number;
    teamMembers: number;
    teamMemberLimit: number;
    storage: number;
    storageLimit: number;
}

export interface Invoice {
    id: string;
    date: string;
    amount: string;
    status: "Paid" | "Pending";
    plan: BillingPlan;
}