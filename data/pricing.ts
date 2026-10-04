export type PricingPlan = {
    name: "Free" | "Pro" | "Business";
    price: number;
    description: string;
    features: string[];
    popular?: boolean;
};

export const pricingPlans: PricingPlan[] = [
    {
        name: "Free",
        price: 0,
        description:
            "A simple starting point for exploring AI workflows.",
        features: [
            "500 AI requests",
            "2 agents",
            "1 member",
            "100 MB storage",
        ],
    },
    {
        name: "Pro",
        price: 29,
        description:
            "For teams building and running AI workflows.",
        popular: true,
        features: [
            "10,000 AI requests",
            "20 agents",
            "10 members",
            "10 GB storage",
        ],
    },
    {
        name: "Business",
        price: 99,
        description:
            "For organizations running AI at a larger scale.",
        features: [
            "50,000 AI requests",
            "Unlimited agents",
            "Unlimited members",
            "100 GB storage",
        ],
    },
];