import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/Card";

interface StatCardProps {
    label: string;
    value: string;
    change: string;
}

export function StatCard({
    label,
    value,
    change,
}: StatCardProps) {
    return (
        <Card padding="md">
            <p className="text-sm text-[var(--text-secondary)]">
                {label}
            </p>

            <div className="mt-3 flex items-end justify-between gap-3">
                <p className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                    {value}
                </p>

                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    <ArrowUpRight size={13} />
                    {change}
                </span>
            </div>
        </Card>
    );
}