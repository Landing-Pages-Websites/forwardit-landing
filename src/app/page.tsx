import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { PainSection } from "@/components/sections/PainSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AuthoritySection } from "@/components/sections/AuthoritySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Reclaim 40-60% of your team's time with AI & automation",
  description:
    "Federal-grade AI & automation, built for SMBs. Book a free 30-min ROI assessment — walk away with an hours-saved estimate. 20+ years of experience (NIH, SAMHSA, federal agencies).",
  openGraph: {
    title: "ForwardIT — AI & Automation for SMBs",
    description:
      "Reclaim 40-60% of your team's time. Free 30-min ROI assessment. Federal-grade AI, SMB-friendly pricing.",
    url: "https://solutions.theforwardit.com",
    siteName: "ForwardIT",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <PainSection />
        <ServicesSection />
        <AuthoritySection />
        <TestimonialsSection />
        <ProcessSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
