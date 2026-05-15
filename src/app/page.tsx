import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { PainSection } from "@/components/sections/PainSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { RevenueLeftSection } from "@/components/sections/RevenueLeftSection";
import { AuthoritySection } from "@/components/sections/AuthoritySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Free Up 40-60% of Your Team's Time | The ForwardIT | AI & Automation for SMBs",
  description:
    "ForwardIT brings 20+ years of federal AI & automation expertise to SMBs. Law firms, medical practices, accounting firms — free up 40-60% of your team's time. Book a free 30-min strategy call.",
  openGraph: {
    title: "ForwardIT — AI & Automation for SMBs",
    description:
      "Free up 40-60% of your team's time. Federal-grade AI, SMB-friendly pricing. Book your free 30-min strategy call.",
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
        <RevenueLeftSection />
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
