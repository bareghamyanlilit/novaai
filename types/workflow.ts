export type WorkflowStatus = "active" | "draft" | "inactive";

export type WorkflowNodeType =
    | "trigger"
    | "condition"
    | "agent"
    | "action";

export interface WorkflowNode {
    id: string;
    type: WorkflowNodeType;
    title: string;
    description: string;
}

export interface Workflow {
    id: string;
    name: string;
    description: string;
    status: WorkflowStatus;
    runs: number;
    successRate: number;
    updatedAt: string;
    nodes: WorkflowNode[];
}