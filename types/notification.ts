export type NotificationType =
    | "agent"
    | "workflow"
    | "billing"
    | "team"
    | "system";

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    read: boolean;
    createdAt: string;
}