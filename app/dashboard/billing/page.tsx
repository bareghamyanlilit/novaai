"use client";

import {
    Check,
    CreditCard,
    Download,
    Sparkles,
} from "lucide-react";
import {
    useEffect,
    useId,
    useMemo,
    useState,
    useSyncExternalStore,
} from "react";
import { Card } from "@/components/ui/Card";
import {
    billingPlanLimits,
    billingUsage,
    invoices,
} from "@/data/billing";
import { pricingPlans } from "@/data/pricing";
import {
    getBillingServerSnapshot,
    getBillingSnapshot,
    saveBillingPlan,
    subscribeToBillingStore,
} from "@/lib/billingStorage";

import {
    getPaymentServerSnapshot,
    getPaymentSnapshot,
    savePaymentMethod,
    subscribeToPaymentStore,
} from "@/lib/paymentStorage";

import type {
    SavedPaymentMethod,
} from "@/lib/paymentStorage";
import type { BillingPlan } from "@/types/billing";

export default function BillingPage() {
    const billingSnapshot =
        useSyncExternalStore(
            subscribeToBillingStore,
            getBillingSnapshot,
            getBillingServerSnapshot,
        );

    const currentPlanFromStorage = useMemo(() => {
        if (!billingSnapshot) {
            return null;
        }

        return billingSnapshot as BillingPlan;
    }, [billingSnapshot]);

    const currentPlan =
        currentPlanFromStorage ?? "Pro";

    const [upgradePlan, setUpgradePlan] =
        useState<BillingPlan | null>(null);

    const [paymentOpen, setPaymentOpen] =
        useState(false);

    const [cardNumber, setCardNumber] =
        useState("");

    const [cardExpiry, setCardExpiry] =
        useState("");

    const [cardCvc, setCardCvc] =
        useState("");

    const paymentSnapshot =
        useSyncExternalStore(
            subscribeToPaymentStore,
            getPaymentSnapshot,
            getPaymentServerSnapshot,
        );

    const paymentMethodFromStorage = useMemo(() => {
        if (!paymentSnapshot) {
            return null;
        }

        try {
            return JSON.parse(
                paymentSnapshot,
            ) as SavedPaymentMethod;
        } catch {
            return null;
        }
    }, [paymentSnapshot]);

    const paymentMethod =
        paymentMethodFromStorage ?? {
            brand: "Visa" as const,
            last4: "4242",
        };

    const upgradeDialogTitleId = useId();
    const paymentDialogTitleId = useId();

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key !== "Escape") {
                return;
            }

            if (upgradePlan) {
                setUpgradePlan(null);
            }

            if (paymentOpen) {
                setPaymentOpen(false);
            }
        }

        document.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [upgradePlan, paymentOpen]);

    function selectPlan(plan: BillingPlan) {
        if (plan === currentPlan) {
            return;
        }

        setUpgradePlan(plan);
    }

    function confirmPlanChange() {
        if (!upgradePlan) {
            return;
        }

        saveBillingPlan(upgradePlan);
        setUpgradePlan(null);
    }

    function downloadInvoice(
        invoice: (typeof invoices)[number],
    ) {
        const invoiceWindow = window.open(
            "",
            "_blank",
            "width=900,height=700",
        );

        if (!invoiceWindow) {
            return;
        }

        invoiceWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>${invoice.id}</title>

                <style>
                    * {
                        box-sizing: border-box;
                    }

                    body {
                        margin: 0;
                        padding: 48px;
                        font-family:
                            Arial,
                            Helvetica,
                            sans-serif;
                        color: #0f172a;
                        background: #ffffff;
                    }

                    .invoice {
                        max-width: 760px;
                        margin: 0 auto;
                    }

                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-bottom: 48px;
                    }

                    .brand {
                        font-size: 28px;
                        font-weight: 700;
                        color: #4f46e5;
                    }

                    .title {
                        font-size: 28px;
                        font-weight: 700;
                        margin: 0;
                    }

                    .muted {
                        color: #64748b;
                        font-size: 14px;
                    }

                    .section {
                        margin-top: 32px;
                    }

                    .row {
                        display: flex;
                        justify-content: space-between;
                        padding: 14px 0;
                        border-bottom: 1px solid #e2e8f0;
                    }

                    .total {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 24px;
                        padding-top: 20px;
                        border-top: 2px solid #0f172a;
                        font-size: 20px;
                        font-weight: 700;
                    }

                    .status {
                        display: inline-block;
                        margin-top: 24px;
                        padding: 6px 12px;
                        border-radius: 999px;
                        background: #dcfce7;
                        color: #166534;
                        font-size: 13px;
                        font-weight: 600;
                    }

                    @media print {
                        body {
                            padding: 24px;
                        }
                    }
                </style>
            </head>

            <body>
                <main class="invoice">
                    <div class="header">
                        <div>
                            <div class="brand">
                                NovaLiAi
                            </div>

                            <p class="muted">
                                AI Agents & Automation Workspace
                            </p>
                        </div>

                        <div>
                            <h1 class="title">
                                Invoice
                            </h1>

                            <p class="muted">
                                ${invoice.id}
                            </p>
                        </div>
                    </div>

                    <div class="section">
                        <div class="row">
                            <span class="muted">
                                Invoice date
                            </span>

                            <strong>
                                ${invoice.date}
                            </strong>
                        </div>

                        <div class="row">
                            <span class="muted">
                                Plan
                            </span>

                            <strong>
                                ${invoice.plan}
                            </strong>
                        </div>

                        <div class="row">
                            <span class="muted">
                                Payment status
                            </span>

                            <strong>
                                ${invoice.status}
                            </strong>
                        </div>
                    </div>

                    <div class="total">
                        <span>Total</span>
                        <span>${invoice.amount}</span>
                    </div>

                    <span class="status">
                        ${invoice.status}
                    </span>
                </main>
            </body>
        </html>
    `);

        invoiceWindow.document.close();
        invoiceWindow.focus();

        setTimeout(() => {
            invoiceWindow.print();
        }, 250);
    }

    const planLimits = billingPlanLimits[currentPlan];
    const currentUsage = billingUsage[currentPlan];

    const usage = {
        aiRequests: currentUsage.aiRequests,
        aiRequestLimit: planLimits.aiRequestLimit,

        agents: currentUsage.agents,
        agentLimit: planLimits.agentLimit,

        teamMembers: currentUsage.teamMembers,
        teamMemberLimit: planLimits.teamMemberLimit,

        storage: currentUsage.storage,
        storageLimit: planLimits.storageLimit,
    };

    const currentPlanDetails = pricingPlans.find(
        (plan) => plan.name === currentPlan,
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <p className="text-sm font-medium text-[var(--primary)]">
                    Workspace
                </p>

                <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                    Billing
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                    Manage your subscription, usage,
                    payment method, and invoices.
                </p>
            </div>

            {/* Current plan */}
            <Card className="overflow-hidden">
                <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                                <Sparkles size={20} />
                            </div>

                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Current plan
                                </p>

                                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                                    {currentPlan}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="text-left lg:text-right">
                        <p className="text-2xl font-semibold text-[var(--text-primary)]">
                            ${currentPlanDetails?.price ?? 0}
                            <span className="text-sm font-normal text-[var(--text-muted)]">
                                /month
                            </span>
                        </p>

                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                            Next billing date: May 01, 2027
                        </p>
                    </div>
                </div>
            </Card>

            {/* Usage */}
            <div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                        Usage
                    </h2>

                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Monitor your current plan limits.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <UsageCard
                        label="AI Requests"
                        value={usage.aiRequests}
                        limit={usage.aiRequestLimit}
                        suffix="requests"
                    />

                    <UsageCard
                        label="AI Agents"
                        value={usage.agents}
                        limit={usage.agentLimit}
                        suffix="agents"
                    />

                    <UsageCard
                        label="Team Members"
                        value={usage.teamMembers}
                        limit={usage.teamMemberLimit}
                        suffix="members"
                    />

                    <UsageCard
                        label="Storage"
                        value={usage.storage}
                        limit={usage.storageLimit}
                        suffix="GB"
                    />
                </div>
            </div>

            {/* Plans */}
            <div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                        Plans
                    </h2>

                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Choose the plan that fits your
                        workspace.
                    </p>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                    {pricingPlans.map((plan) => {
                        const isCurrent =
                            currentPlan === plan.name;

                        return (
                            <Card
                                key={plan.name}
                                className={`relative p-6 ${isCurrent
                                    ? "border-[var(--primary)] ring-1 ring-[var(--primary)]"
                                    : ""
                                    }`}
                            >
                                {plan.name === "Pro" && (
                                    <span className="absolute right-5 top-5 rounded-full bg-[var(--primary-light)] px-2.5 py-1 text-xs font-medium text-[var(--primary)]">
                                        Popular
                                    </span>
                                )}

                                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                                    {plan.name}
                                </h3>

                                <p className="mt-2 min-h-10 text-sm leading-5 text-[var(--text-secondary)]">
                                    {plan.description}
                                </p>

                                <div className="mt-5">
                                    <span className="text-3xl font-semibold text-[var(--text-primary)]">
                                        ${plan.price}
                                    </span>

                                    <span className="text-sm text-[var(--text-muted)]">
                                        /month
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        selectPlan(
                                            plan.name,
                                        )
                                    }
                                    disabled={isCurrent}
                                    className={`mt-6 h-11 w-full rounded-xl text-sm font-medium transition-colors ${isCurrent
                                        ? "cursor-default border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)]"
                                        : "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
                                        }`}
                                >
                                    {isCurrent
                                        ? "Current Plan"
                                        : `Choose ${plan.name}`}
                                </button>

                                <div className="mt-6 space-y-3">
                                    {plan.features.map(
                                        (feature) => (
                                            <div
                                                key={
                                                    feature
                                                }
                                                className="flex items-start gap-2"
                                            >
                                                <Check
                                                    size={
                                                        16
                                                    }
                                                    className="mt-0.5 shrink-0 text-[var(--success)]"
                                                />

                                                <span className="text-sm text-[var(--text-secondary)]">
                                                    {
                                                        feature
                                                    }
                                                </span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Payment method */}
            <Card className="p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-secondary)] text-[var(--text-secondary)]">
                            <CreditCard size={20} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-[var(--text-primary)]">
                                Payment method
                            </h2>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                {paymentMethod.brand} ending in{" "}
                                {paymentMethod.last4}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setPaymentOpen(true)}
                        className="h-10 rounded-xl border border-[var(--border)] px-4 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-secondary)]"
                    >
                        Update
                    </button>
                </div>
            </Card>

            {/* Invoices */}
            <Card className="overflow-hidden">
                <div className="border-b border-[var(--border)] p-5">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                        Invoice history
                    </h2>

                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        View and download your previous
                        invoices.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[680px] text-left">
                        <thead>
                            <tr className="border-b border-[var(--border)] bg-[var(--surface-secondary)]">
                                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                                    Invoice
                                </th>

                                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                                    Date
                                </th>

                                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                                    Plan
                                </th>

                                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                                    Amount
                                </th>

                                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                                    Status
                                </th>

                                <th className="w-12 px-5 py-3" />
                            </tr>
                        </thead>

                        <tbody>
                            {invoices.map((invoice) => (
                                <tr
                                    key={invoice.id}
                                    className="border-b border-[var(--border)] last:border-0"
                                >
                                    <td className="px-5 py-4 text-sm font-medium text-[var(--text-primary)]">
                                        {invoice.id}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                                        {invoice.date}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                                        {invoice.plan}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-[var(--text-primary)]">
                                        {invoice.amount}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                            {invoice.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <button
                                            type="button"
                                            onClick={() => downloadInvoice(invoice)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                                            aria-label={`Download ${invoice.id}`}
                                        >
                                            <Download size={17} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {upgradePlan && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-5"
                    role="presentation"
                    onMouseDown={() =>
                        setUpgradePlan(null)
                    }
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={upgradeDialogTitleId}
                        className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xl"
                        onMouseDown={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                            <Sparkles size={20} />
                        </div>

                        <h2
                            id={upgradeDialogTitleId}
                            className="mt-5 text-lg font-semibold text-[var(--text-primary)]"
                        >
                            Change to {upgradePlan}?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                            Your demo workspace will switch to the{" "}
                            <span className="font-medium text-[var(--text-primary)]">
                                {upgradePlan}
                            </span>{" "}
                            plan.
                        </p>

                        <div className="mt-5 rounded-xl bg-[var(--surface-secondary)] p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[var(--text-secondary)]">
                                    New plan
                                </span>

                                <span className="text-sm font-semibold text-[var(--text-primary)]">
                                    {upgradePlan}
                                </span>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-sm text-[var(--text-secondary)]">
                                    Monthly price
                                </span>

                                <span className="text-sm font-semibold text-[var(--text-primary)]">
                                    $
                                    {
                                        pricingPlans.find(
                                            (plan) =>
                                                plan.name ===
                                                upgradePlan,
                                        )?.price
                                    }
                                    /month
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setUpgradePlan(null)
                                }
                                className="h-10 rounded-xl border border-[var(--border)] px-4 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={confirmPlanChange}
                                className="h-10 rounded-xl bg-[var(--primary)] px-4 text-sm font-medium text-white hover:bg-[var(--primary-hover)]"
                            >
                                Confirm Change
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {paymentOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-5"
                    role="presentation"
                    onMouseDown={() =>
                        setPaymentOpen(false)
                    }
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={paymentDialogTitleId}
                        className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xl"
                        onMouseDown={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <div className="mb-6">
                            <h2
                                id={paymentDialogTitleId}
                                className="text-lg font-semibold text-[var(--text-primary)]"
                            >
                                Update payment method
                            </h2>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                This is a demo payment form. No
                                real payment will be processed.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="card-number"
                                    className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                >
                                    Card number
                                </label>

                                <input
                                    id="card-number"
                                    value={cardNumber}
                                    onChange={(event) =>
                                        setCardNumber(event.target.value)
                                    }
                                    placeholder="4242 4242 4242 4242"
                                    inputMode="numeric"
                                    className="h-11 w-full rounded-xl border border-[var(--border)] px-3 text-sm outline-none focus:border-[var(--primary)]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="card-expiry"
                                        className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                    >
                                        Expiry
                                    </label>

                                    <input
                                        id="card-expiry"
                                        value={cardExpiry}
                                        onChange={(event) =>
                                            setCardExpiry(event.target.value)
                                        }
                                        placeholder="MM/YY"
                                        className="h-11 w-full rounded-xl border border-[var(--border)] px-3 text-sm outline-none focus:border-[var(--primary)]"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="card-cvc"
                                        className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                    >
                                        CVC
                                    </label>

                                    <input
                                        id="card-cvc"
                                        value={cardCvc}
                                        onChange={(event) =>
                                            setCardCvc(event.target.value)
                                        }
                                        placeholder="123"
                                        inputMode="numeric"
                                        className="h-11 w-full rounded-xl border border-[var(--border)] px-3 text-sm outline-none focus:border-[var(--primary)]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setPaymentOpen(false)
                                }
                                className="h-10 rounded-xl border border-[var(--border)] px-4 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={
                                    !cardNumber.trim() ||
                                    !cardExpiry.trim() ||
                                    !cardCvc.trim()
                                }
                                onClick={() => {
                                    const normalizedCardNumber =
                                        cardNumber.replace(/\s/g, "");

                                    const last4 =
                                        normalizedCardNumber.slice(-4);

                                    const brand: "Visa" | "Mastercard" =
                                        normalizedCardNumber.startsWith("4")
                                            ? "Visa"
                                            : "Mastercard";

                                    const newPaymentMethod = {
                                        brand,
                                        last4,
                                    };

                                    savePaymentMethod(newPaymentMethod);

                                    setPaymentOpen(false);
                                    setCardNumber("");
                                    setCardExpiry("");
                                    setCardCvc("");
                                }}
                                className="h-10 rounded-xl bg-[var(--primary)] px-4 text-sm font-medium text-white hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Save Payment Method
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

interface UsageCardProps {
    label: string;
    value: number;
    limit: number | null;
    suffix: string;
}

function UsageCard({
    label,
    value,
    limit,
    suffix,
}: UsageCardProps) {
    const unlimited = limit === null;

    const percentage = unlimited
        ? 0
        : Math.min((value / limit) * 100, 100);

    return (
        <Card className="p-5">
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-[var(--text-secondary)]">
                    {label}
                </p>

                <span className="text-xs text-[var(--text-muted)]">
                    {unlimited
                        ? "Unlimited"
                        : `${Math.round(percentage)}%`}
                </span>
            </div>

            <p className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">
                {value}

                <span className="ml-1 text-sm font-normal text-[var(--text-muted)]">
                    /{" "}
                    {unlimited
                        ? "Unlimited"
                        : `${limit} ${suffix}`}
                </span>
            </p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
                {!unlimited && (
                    <div
                        className="h-full rounded-full bg-[var(--primary)] transition-all"
                        style={{
                            width: `${percentage}%`,
                        }}
                    />
                )}
            </div>
        </Card>
    );
}