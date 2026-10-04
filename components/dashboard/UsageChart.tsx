"use client";

import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { usageData } from "@/data/analytics";

export function UsageChart() {
    return (
        <Card>
            <CardHeader>
                <div>
                    <CardTitle>AI Requests</CardTitle>

                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Requests made over the last 7 days
                    </p>
                </div>
            </CardHeader>

            <div className="h-[320px] w-full">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <LineChart
                        data={usageData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#E2E8F0"
                        />

                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#94A3B8",
                                fontSize: 12,
                            }}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#94A3B8",
                                fontSize: 12,
                            }}
                        />

                        <Tooltip
                            contentStyle={{
                                border: "1px solid #E2E8F0",
                                borderRadius: "12px",
                                boxShadow:
                                    "0 10px 25px rgba(0,0,0,0.08)",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="requests"
                            stroke="#4F46E5"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                                r: 5,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}