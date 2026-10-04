export type AgentStatus =
    | "active"
    | "inactive"
    | "training";

export type AgentModel =
    | "GPT"
    | "Claude"
    | "Custom";

export interface Agent {
    id: string;
    name: string;
    description: string;
    status: AgentStatus;
    model: AgentModel;
    tasks: number;
    successRate: number;
    updatedAt: string;
}