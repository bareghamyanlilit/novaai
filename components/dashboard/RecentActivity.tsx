import { Bot, FileText, UserPlus } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

const activities = [
    {
        id: 1,
        title: "Marketing Agent completed a task",
        time: "5 minutes ago",
        icon: Bot,
    },
    {
        id: 2,
        title: "New prompt added to the library",
        time: "32 minutes ago",
        icon: FileText,
    },
    {
        id: 3,
        title: "Sarah Lee joined the workspace",
        time: "2 hours ago",
        icon: UserPlus,
    },
    {
        id: 4,
        title: "Support Agent completed 24 tasks",
        time: "4 hours ago",
        icon: Bot,
    },
];

export function RecentActivity() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>

            <div className="space-y-5">
                {activities.map((activity) => {
                    const Icon = activity.icon;

                    return (
                        <div
                            key={activity.id}
                            className="flex items-start gap-3"
                        >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)]">
                                <Icon
                                    size={17}
                                    className="text-[var(--primary)]"
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm font-medium text-[var(--text-primary)]">
                                    {activity.title}
                                </p>

                                <p className="mt-1 text-xs text-[var(--text-muted)]">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}