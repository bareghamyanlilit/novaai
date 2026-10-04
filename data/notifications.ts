import type { Notification } from "@/types/notification";

export const notifications: Notification[] = [
    {
        id: "notification-1",
        title: "Agent completed successfully",
        message:
            "Marketing Agent completed its latest task with a 96% success rate.",
        type: "agent",
        read: false,
        createdAt: "10 minutes ago",
    },
    {
        id: "notification-2",
        title: "Workflow completed",
        message:
            "Customer Support workflow processed 24 new requests.",
        type: "workflow",
        read: false,
        createdAt: "32 minutes ago",
    },
    {
        id: "notification-3",
        title: "New team member invited",
        message:
            "Emma Davis has been invited to your workspace.",
        type: "team",
        read: false,
        createdAt: "2 hours ago",
    },
    {
        id: "notification-4",
        title: "Usage is getting high",
        message:
            "You have used 68% of your monthly AI requests.",
        type: "billing",
        read: true,
        createdAt: "5 hours ago",
    },
    {
        id: "notification-5",
        title: "Monthly report is ready",
        message:
            "Your March workspace analytics report is now available.",
        type: "system",
        read: true,
        createdAt: "Yesterday",
    },
    {
        id: "notification-6",
        title: "Research Agent updated",
        message:
            "Research Agent configuration was updated successfully.",
        type: "agent",
        read: true,
        createdAt: "Yesterday",
    },
];