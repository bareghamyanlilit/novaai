import { AnalyticsPreview } from "@/components/marketing/AnalyticsPreview";
import { AITools } from "@/components/marketing/AITools";
import { CTA } from "@/components/marketing/CTA";
import { FAQ } from "@/components/marketing/FAQ";
import { Features } from "@/components/marketing/Features";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Pricing } from "@/components/marketing/Pricing";
import { Testimonials } from "@/components/marketing/Testimonials";
import { TrustedBy } from "@/components/marketing/TrustedBy";
import { WorkspacePreview } from "@/components/marketing/WorkspacePreview";

export default function HomePage() {
    return (
        <>
            <Hero />
            <TrustedBy />
            <Features />
            <WorkspacePreview />
            <HowItWorks />
            <AITools />
            <AnalyticsPreview />
            <Testimonials />
            <Pricing />
            <FAQ />
            <CTA />
        </>
    );
}