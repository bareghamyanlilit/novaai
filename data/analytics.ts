export const dashboardStats = [
    {
        label: "Total Requests",
        value: "12,480",
        change: "+24.8%",
    },
    {
        label: "Success Rate",
        value: "94.6%",
        change: "+2.4%",
    },
    {
        label: "Active Agents",
        value: "12",
        change: "+3",
    },
    {
        label: "Avg. Response",
        value: "1.8s",
        change: "-12.4%",
    },
];

export type AnalyticsRange = "7" | "30" | "90";

export interface UsageDataPoint {
    name: string;
    requests: number;
    successful: number;
}

function generateUsageData(
    days: number,
): UsageDataPoint[] {
    const data: UsageDataPoint[] = [];

    for (let index = days - 1; index >= 0; index--) {
        const date = new Date();

        date.setDate(date.getDate() - index);

        const requests =
            350 +
            ((days - index) * 47) % 500;

        const successful = Math.round(
            requests * 0.92,
        );

        const name =
            days === 7
                ? date.toLocaleDateString("en-US", {
                    weekday: "short",
                })
                : date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                });

        data.push({
            name,
            requests,
            successful,
        });
    }

    return data;
}

export const analyticsUsageData: Record<
    AnalyticsRange,
    UsageDataPoint[]
> = {
    "7": generateUsageData(7),
    "30": generateUsageData(30),
    "90": generateUsageData(90),
};

export const analyticsUsageSummary: Record<
    AnalyticsRange,
    {
        requests: number;
        successful: number;
        failed: number;
    }
> = {
    "7": {
        requests: 4860,
        successful: 4593,
        failed: 267,
    },
    "30": {
        requests: 18420,
        successful: 17392,
        failed: 1028,
    },
    "90": {
        requests: 52860,
        successful: 49925,
        failed: 2935,
    },
};

export const usageData = analyticsUsageData["7"];

export const agentPerformance = [
    {
        name: "Marketing Agent",
        runs: 1240,
        successRate: 96,
    },
    {
        name: "Support Agent",
        runs: 980,
        successRate: 94,
    },
    {
        name: "Research Agent",
        runs: 760,
        successRate: 91,
    },
    {
        name: "Sales Agent",
        runs: 620,
        successRate: 89,
    },
];

export const workflowPerformance = [
    {
        name: "Customer Support",
        runs: 840,
        successRate: 95,
    },
    {
        name: "Lead Qualification",
        runs: 690,
        successRate: 92,
    },
    {
        name: "Content Generation",
        runs: 510,
        successRate: 88,
    },
];

export const recentActivity = [
    {
        id: "1",
        title: "Marketing Agent completed a task",
        time: "2 minutes ago",
        type: "agent",
    },
    {
        id: "2",
        title: "Customer Support workflow completed",
        time: "8 minutes ago",
        type: "workflow",
    },
    {
        id: "3",
        title: "Research Agent processed 24 requests",
        time: "15 minutes ago",
        type: "agent",
    },
    {
        id: "4",
        title: "Lead Qualification workflow completed",
        time: "32 minutes ago",
        type: "workflow",
    },
];