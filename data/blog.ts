import type { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
    {
        slug: "building-effective-ai-agents",
        title: "How to Build More Effective AI Agents",
        excerpt:
            "A practical look at designing AI agents with clear goals, useful context, and reliable workflows.",
        category: "AI Agents",
        date: "October 2, 2026",
        readTime: "6 min read",
        author: "NovaLiAi Team",
        authorRole: "Product & AI",
        image: "/images/blog/ai-agents.jpg",
        content: [
            "AI agents work best when they have a clear purpose. Instead of trying to make one agent handle everything, define a focused role and give it the context it needs.",
            "A strong agent usually starts with three things: a clear objective, reliable knowledge, and a defined set of actions. This makes the workflow easier to understand and easier to improve.",
            "The next step is testing. Monitor successful and unsuccessful runs, identify repeated problems, and improve the agent instructions based on real usage.",
            "The result is an AI workflow that is easier to maintain and much more predictable.",
        ],
    },
    {
        slug: "automating-team-workflows-with-ai",
        title: "Automating Team Workflows with AI",
        excerpt:
            "Discover how AI-powered workflows can remove repetitive work and help teams focus on higher-value tasks.",
        category: "Automation",
        date: "September 26, 2026",
        readTime: "5 min read",
        author: "NovaLiAi Team",
        authorRole: "Product & AI",
        image: "/images/blog/automation.jpg",
        content: [
            "Automation becomes especially useful when a workflow contains repetitive steps that happen frequently.",
            "Instead of manually moving information between tools, teams can define a workflow that receives an input, processes it, and sends the result to the next step.",
            "AI adds another layer by allowing workflows to classify information, summarize content, generate responses, or make structured decisions.",
            "The best automations are not necessarily the most complicated ones. Start with one repetitive process and expand it as the value becomes clear.",
        ],
    },
    {
        slug: "building-a-knowledge-base-for-ai",
        title: "Building a Knowledge Base for AI",
        excerpt:
            "Learn why structured knowledge is important when creating useful AI assistants and agents.",
        category: "Knowledge",
        date: "September 18, 2026",
        readTime: "7 min read",
        author: "NovaLiAi Team",
        authorRole: "Product & AI",
        image: "/images/blog/knowledge-base.jpg",
        content: [
            "An AI assistant becomes more useful when it can work with information that is specific to a product, company, or workflow.",
            "A knowledge base gives the system a structured place to organize documents, instructions, and other useful information.",
            "Good organization matters. Documents should be easy to identify, update, and remove when they are no longer relevant.",
            "For production applications, the knowledge layer can later be connected to your own storage, search system, or retrieval pipeline.",
        ],
    },
    {
        slug: "designing-ai-products-users-trust",
        title: "Designing AI Products People Can Trust",
        excerpt:
            "Good AI interfaces should make intelligent systems feel understandable, predictable, and easy to control.",
        category: "Product Design",
        date: "September 10, 2026",
        readTime: "5 min read",
        author: "NovaLiAi Team",
        authorRole: "Product & AI",
        image: "/images/blog/ai-design.jpg",
        content: [
            "AI interfaces introduce a new challenge: users need to understand not only what the product does, but also what the AI is currently doing.",
            "Clear states, useful feedback, and visible controls help users understand the system without overwhelming them.",
            "Interfaces should also make it easy to review important outputs and correct mistakes.",
            "The goal is not to hide the complexity of AI. It is to present that complexity in a way people can understand and control.",
        ],
    },
];