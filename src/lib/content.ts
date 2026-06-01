// ForwardIT LP — source of truth for all page content.
// Atlas task: 2cfce493-3d93-4dce-95f1-efc8f0698176 (Complete LP Revamp 2026-05-14)
// Prior task: 5705b7e5-517e-46d2-8f21-c944e1c71778
// Customer: The ForwardIT (3d3fed28-24fd-4b94-8b71-b183821511a8)
// Director directive 2026-05-14: full redesign — dynamic motion, polished, "make them great"
// Client feedback doc: docs.google.com/document/d/1oKTeXeDIIQpOfh7CKC2Hx_F2d8CDqM6TJloXq2FGKdo

export type ServicePillar = {
  slug: string;
  anchorId: string;
  label: string;
  heading: string;
  body: string; // 60-80 words
  image: string;
  outcomes: string[]; // 3 quick outcome chips
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Testimonial = {
  name: string;
  org: string;
  quote: string;
};

export const BRAND = {
  name: "ForwardIT",
  fullName: "ForwardIT Inc.",
  tagline: "Federal-grade AI & automation. Now for SMBs.",
  // Client-approved positioning (Google Doc 2026-05-14):
  positioning:
    "ForwardIT builds AI and Automation solutions for SMBs — law firms, accounting firms, medical practices, and businesses with 5–50 employees. We bring the same federal-grade AI expertise to commercial clients, at a scale and price point that makes sense for your business.",
  shortPositioning:
    "We turn manual, repetitive work into automated workflows — so your team can focus on billable, revenue-generating work.",
  // Real phone exists (301 235 2050) but task spec has_phone_leads=false — NO phone CTAs.
  email: "info@theforwardit.com",
  address: {
    street: "7209 Hanover Pkwy Suite A",
    city: "Greenbelt",
    state: "MD",
    zip: "20770",
  },
  calendlyUrl: "https://calendly.com/theforwardit-info/30min",
  primaryCtaLabel: "Book My Free Strategy Call",
  primaryCtaShort: "Book My Strategy Call",
  ctaSubLabel: "Free 30-min · No obligation",
} as const;

// Rotating words used in the animated headline.
// Order matters — first word shown is "admin work" (most universal).
export const HERO_ROTATING_WORDS = [
  "admin work",
  "data entry",
  "follow-ups",
  "report building",
  "inbox triage",
  "manual reconciliation",
] as const;

export const STATS: { value: string; label: string; suffix?: string }[] = [
  { value: "40-60", label: "% of team time reclaimed from manual work", suffix: "%" },
  { value: "20+", label: "Years building AI & automation for federal agencies" },
  { value: "100", label: "% Woman-owned, US-based consulting team", suffix: "%" },
  { value: "90", label: "Days to typical ROI break-even", suffix: "d" },
];

export const PAIN_POINTS: { title: string; body: string }[] = [
  {
    title: "Manual data entry & reconciliation",
    body: "Staff moving information between CRM, email, billing, and spreadsheets. Hours every week that never bill out and never scale.",
  },
  {
    title: "Redundant approvals and handoffs",
    body: "Internal requests bouncing between inboxes. Clients waiting. Deals slipping. Ops becomes the bottleneck the business can't see.",
  },
  {
    title: "Siloed tools that don't talk",
    body: "Your practice management, accounting, CRM, and docs all live in separate systems. Every report is a copy-paste project.",
  },
];

// "Revenue Left on the Table" — added per client doc (typo in live page version).
// Numbers framed as illustrative ranges, not fabricated single-client stats.
export const REVENUE_LEAKS: { value: string; title: string; body: string }[] = [
  {
    value: "$48k+",
    title: "Per under-billed associate, per year",
    body: "A senior associate billing 32 hours/week instead of 38 because of admin drag loses ~6 billable hours weekly. At $150/hr that's $46,800 a year — per head.",
  },
  {
    value: "12–18",
    title: "Hours/week per ops team member",
    body: "Average SMB operations staffer spends 12–18 hours per week on copy-paste between CRM, billing, and spreadsheets. Half of it disappears the moment automation lands.",
  },
  {
    value: "23%",
    title: "Faster proposal turnaround",
    body: "Practices that automate intake + proposal generation close in ~23% less time on average. Faster yes, faster no, fewer ghosted leads in your pipeline.",
  },
];

export const SERVICES: ServicePillar[] = [
  {
    slug: "ai-automation-audit",
    anchorId: "ai-automation-audit",
    label: "AI & Automation Audit",
    heading: "AI & Automation Audit",
    body:
      "We map every repetitive task your team does in a typical week — intake, billing, follow-up, reporting — and pinpoint the 3-5 highest-ROI automation candidates. You leave the audit with a prioritized roadmap, estimated hours saved, and a build order. No jargon, no hard sell. Most SMBs discover 15-25 hours of hidden recurring work in a single audit.",
    image: "/images/service-1.png",
    outcomes: ["Prioritized automation roadmap", "Hours-saved estimate per workflow", "Build order with quick wins first"],
  },
  {
    slug: "process-automation",
    anchorId: "process-automation",
    label: "Process Automation",
    heading: "Process Automation Implementation",
    body:
      "We build and deploy the automations — intake forms, client onboarding, document routing, billing workflows, CRM sync. Your team keeps their existing tools; we wire them together with automation layers that run 24/7. Every workflow is monitored, documented, and fully handed over to your team. No black boxes, no vendor lock-in.",
    image: "/images/service-2.png",
    outcomes: ["24/7 unattended workflows", "Zero-copy data between tools", "Documented + handed over"],
  },
  {
    slug: "ai-integration",
    anchorId: "ai-integration",
    label: "AI Integration",
    heading: "AI Integration for SMBs",
    body:
      "We integrate production-grade AI into the tools your team already uses — drafting emails, summarizing case notes, generating client reports, answering inbound questions, triaging inquiries. Built responsibly, with your data governance and compliance guardrails baked in from day one. No experiments. No demos. Only the AI that earns its keep.",
    image: "/images/service-3.png",
    outcomes: ["AI inside your existing tools", "Compliance + governance first", "Measurable time savings"],
  },
  {
    slug: "intelligent-analytics",
    anchorId: "intelligent-analytics",
    label: "Intelligent Analytics",
    heading: "Intelligent Analytics & Reporting",
    body:
      "Stop copy-pasting into spreadsheets. We build live dashboards that pull from your billing, practice management, CRM, and ops systems — so leadership sees utilization, margins, cash flow, and pipeline in real time. Automated weekly and monthly reports arrive in your inbox. KPIs you can actually act on, not quarter-old exports nobody reads.",
    image: "/images/service-4.png",
    outcomes: ["Real-time unified dashboards", "Automated weekly reports", "KPIs leadership actually uses"],
  },
];

export const AUTHORITY_POINTS: { title: string; body: string }[] = [
  {
    title: "20+ years of AI & automation expertise",
    body: "Our leadership team has been deploying AI, automation, and data platforms since before 'AI' became a buzzword — across healthcare, construction, and federal IT.",
  },
  {
    title: "Federal-grade engineering, SMB-friendly pricing",
    body: "The same discipline, compliance, and reliability we bring to agencies like NIH and SAMHSA — applied to SMB budgets and timelines.",
  },
  {
    title: "Woman-owned, US-based, client-centric",
    body: "You work directly with senior consultants — not a junior offshored team. Every project has a single point of ownership and a transparent scope.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Client leadership",
    org: "NIH",
    quote:
      "Working with ForwardIT is a delight, and their performance is superb. By reducing costs and rework, they have added new techniques and creative solutions to the project.",
  },
  {
    name: "Program director",
    org: "SAMHSA",
    quote:
      "The ForwardIT team offered white-glove customer service at a level I have never experienced in the government; I have only encountered this level of service in corporate.",
  },
  {
    name: "Operations lead",
    org: "League of Women Voters",
    quote:
      "ForwardIT leaders are adept at completing knowledge transfer in a timely manner during the transition period.",
  },
];

export const PROCESS_STEPS: { step: number; title: string; body: string }[] = [
  {
    step: 1,
    title: "30-min strategy call",
    body: "Book a free call. We ask about your team, tools, and biggest operational bottlenecks. You walk away with a rough ROI estimate — whether or not we work together.",
  },
  {
    step: 2,
    title: "Audit & roadmap",
    body: "We map your workflows, calculate hours saved per automation, and deliver a prioritized 90-day roadmap with fixed scope and fixed fees. No surprise invoices.",
  },
  {
    step: 3,
    title: "Deploy, measure, hand over",
    body: "We build and ship the automations, track actual hours saved, and train your team to own and extend the system. You keep the playbook.",
  },
];

export const FAQS: FAQ[] = [
  {
    question: "How fast will we see results?",
    answer:
      "Most SMBs see their first automated workflow in production within 2-4 weeks of kickoff. The strategy call takes 30 minutes and is free — you'll have a rough hours-saved estimate before you sign anything.",
  },
  {
    question: "Do you replace our existing tools?",
    answer:
      "No. We build on top of what you already use — practice management, CRM, billing, email, docs. Our automations connect your existing tools so your team doesn't have to change how they work day-to-day.",
  },
  {
    question: "Is our data safe?",
    answer:
      "Yes. 20+ years of federal work means compliance, security, and data governance are baked into our process — not bolted on. We follow HIPAA, SOC 2-style controls, and document every data flow.",
  },
  {
    question: "What does this cost?",
    answer:
      "The strategy call is free. Audits and implementations are quoted as fixed-scope, fixed-fee engagements after the call — so you know exactly what you're investing before you commit. Most SMB engagements pay for themselves within 90 days.",
  },
  {
    question: "Do you work with specific industries?",
    answer:
      "Yes. We specialize in professional services SMBs — law firms, accounting practices, medical offices, consulting firms, and similar small to mid-sized businesses that have hit an operational ceiling and need to scale without hiring linearly.",
  },
  {
    question: "What if I'm not ready to move on a project for 6+ months?",
    answer:
      "Still book the call. It's free, it takes 30 minutes, and we'll give you the roadmap so you can plan around it. We'll follow up as your timeline gets closer — no pressure.",
  },
];

// ============================================================================
// FORM OPTIONS — per client Google Doc 2026-05-14
// REMOVED: ROI dollar-value question ("If AI freed up 40-60%…")
// ADDED:   budget (qualifier), years in business, annual revenue, decision makers
// ============================================================================

// Values are submitted as-is to HubSpot / Mega Events. Format with dollar
// signs + thousands commas per client request 2026-06-01 (task
// 6e8e6ec5-fb4c-4054-90b2-ef9b9874cfc7) so CRM and notification emails
// show readable strings, not raw codes like "5000-10000".
export const BUDGET_OPTIONS = [
  { value: "$0-$2,500", label: "$0 – $2,500" },
  { value: "$2,500-$5,000", label: "$2,500 – $5,000" },
  { value: "$5,000-$10,000", label: "$5,000 – $10,000" },
  { value: "$10,000-$15,000", label: "$10,000 – $15,000" },
  { value: "$15,000+", label: "$15,000+" },
] as const;

export type BudgetValue = (typeof BUDGET_OPTIONS)[number]["value"];

export const YEARS_IN_BUSINESS_OPTIONS = [
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
] as const;

export const ANNUAL_REVENUE_OPTIONS = [
  "Under $250k",
  "$250k – $1M",
  "$1M – $5M",
  "$5M – $25M",
  "$25M+",
] as const;

export const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "6-plus-months", label: "6+ months" },
] as const;

export type TimelineValue = (typeof TIMELINE_OPTIONS)[number]["value"];

// LP-side qualifier logic removed 2026-05-20 per Anthony directive
// (tasks fb289155, 048ae6ac): every filled form submits to the API and
// every lead is routed downstream. Qualification is the backend's job
// via `lead_qualification_rules`.
