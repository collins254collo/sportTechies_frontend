"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Service {
  id: string;
  index: string;
  category: string;
  title: string;
  tagline: string;
  color: "blue" | "green";
  painHeadline: string;
  painBody: string;
  solutionHeadline: string;
  solutionBody: string;
  outcomes: string[];
  deliverables: string[];
  industries: string[];
  icon: React.ReactNode;
}

// ─── Services data ─────────────────────────────────────────────────────────────
const SERVICES: Service[] = [
  {
    id: "web-mobile",
    index: "01",
    category: "Digital Products",
    title: "Web & Mobile Development",
    tagline: "Fast, scalable products your customers will love using.",
    color: "blue",
    painHeadline: "Your customers judge you in 3 seconds.",
    painBody:
      "A slow website, a clunky checkout, a mobile app that crashes — these aren't just UX problems. They're revenue problems. Studies show 88% of users won't return after a bad digital experience. If your product feels broken, it doesn't matter how good your underlying service is. You're losing customers to competitors with slicker software — often ones with inferior offerings but better execution.",
    solutionHeadline: "We build digital products that become your best salesperson.",
    solutionBody:
      "We design and engineer web applications and mobile apps from the ground up — fast-loading, conversion-optimised, and built to scale with your growth. Every decision we make is rooted in what drives users to act. Whether it's a B2B SaaS dashboard, a customer-facing marketplace, or an internal operations tool, we ship products that work beautifully under real-world pressure.",
    outcomes: [
      "Higher conversion rates from landing page to sale",
      "Reduced churn through seamless, intuitive UX",
      "Mobile-first experiences that reach your full market",
      "Sub-2-second load times — even on low-bandwidth African networks",
      "Products that scale to 10x your current user base without a rewrite",
    ],
    deliverables: ["React / Next.js web apps", "React Native mobile apps", "Progressive Web Apps (PWA)", "API design & backend services", "CMS integration", "Payment & subscription systems"],
    industries: ["E-commerce", "Fintech", "Health & Wellness", "Education", "Real Estate", "Logistics"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="4" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M9 23h10M14 20v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M8 13l3.5 3.5L8 20M16 16h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "ai-automation",
    index: "02",
    category: "Artificial Intelligence",
    title: "AI & Intelligent Automation",
    tagline: "Stop doing manually what a machine can do better.",
    color: "green",
    painHeadline: "Your team is buried in work that shouldn't need humans.",
    painBody:
      "Manually processing invoices. Copying data between systems. Answering the same customer questions hundreds of times a week. Reviewing documents line by line. These tasks don't need judgment — they need speed and consistency. Every hour your high-value people spend on low-value repetition is an hour they're not growing your business. Meanwhile, your competitors are already automating, and the gap widens every quarter.",
    solutionHeadline: "We automate the grind so your people can do the work that matters.",
    solutionBody:
      "We build practical AI integrations — not science experiments. We identify the exact processes in your business that are costing the most time, money, or accuracy, then engineer targeted automation that slots into your existing workflows. From intelligent document processing and AI customer support agents to predictive analytics and recommendation engines, we deploy AI where it generates a measurable return.",
    outcomes: [
      "Cut manual processing time by 60–90% on repetitive tasks",
      "24/7 AI customer support without the headcount cost",
      "Fewer errors in data entry, compliance, and reporting",
      "Faster decisions through real-time data surfacing",
      "Competitive advantage through proprietary AI models trained on your data",
    ],
    deliverables: ["LLM-powered chat & support agents", "Document intelligence (OCR + AI extraction)", "Workflow automation pipelines", "Predictive analytics dashboards", "Custom ML model development", "OpenAI / Anthropic / Gemini API integration"],
    industries: ["Finance & Insurance", "Healthcare", "Legal", "HR & Recruitment", "Manufacturing", "Sports & Athletics"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M14 4v4M14 20v4M4 14h4M20 14h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M7.2 7.2l2.8 2.8M18 18l2.8 2.8M7.2 20.8l2.8-2.8M18 10l2.8-2.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "design",
    index: "03",
    category: "Design & Experience",
    title: "UI / UX Design",
    tagline: "Design isn't decoration. It's the difference between a product that sells and one that doesn't.",
    color: "blue",
    painHeadline: "People abandon your product — and you don't know why.",
    painBody:
      "Low sign-up completion. High cart abandonment. Features nobody uses. Support tickets asking how to do basic things. These are all symptoms of the same disease: poor user experience. Most businesses treat design as an afterthought — something you bolt on at the end. But by then, the wrong architecture is already built, the wrong flows are already coded, and the wrong assumptions are already baked in. Fixing it costs three times more than getting it right the first time.",
    solutionHeadline: "We design products that users intuitively understand and love to use.",
    solutionBody:
      "Our design process starts with research — real conversations with your users, analysis of your usage data, and competitive benchmarking. We map user journeys before we draw a single screen. The result is a design system that feels natural, converts visitors into customers, and reduces support burden by making the right action obvious. We deliver production-ready Figma files your developers can build from immediately, with zero ambiguity.",
    outcomes: [
      "Higher sign-up and onboarding completion rates",
      "Reduced support ticket volume through intuitive UX",
      "Consistent brand experience across every touchpoint",
      "Faster development — devs work from clear, annotated specs",
      "User research insights that reshape your product roadmap",
    ],
    deliverables: ["User research & journey mapping", "Wireframes & information architecture", "High-fidelity Figma designs", "Interactive prototypes for testing", "Design systems & component libraries", "Usability testing & iteration"],
    industries: ["SaaS", "Consumer Apps", "E-commerce", "Healthcare", "EdTech", "Government & NGO"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M8 14h12M14 8v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="3.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    id: "cloud-devops",
    index: "04",
    category: "Infrastructure",
    title: "Cloud & DevOps Engineering",
    tagline: "Infrastructure that doesn't wake you up at 3am.",
    color: "green",
    painHeadline: "Your system goes down at the worst possible time.",
    painBody:
      "Black Friday. End of month payroll. A viral marketing moment. These are exactly the times your product faces the heaviest load — and exactly when fragile infrastructure collapses. Outages don't just cost you revenue in the moment. They destroy customer trust, generate press you don't want, and demoralise the team that built the product. Beyond downtime, poor infrastructure means slow deployments, security vulnerabilities, and a technical debt pile that grows faster than your product.",
    solutionHeadline: "We build infrastructure that scales invisibly and fails gracefully.",
    solutionBody:
      "We architect cloud environments on AWS, GCP, or Azure that auto-scale with demand, recover from failures automatically, and deploy new code without downtime. We implement CI/CD pipelines that let your team ship features with confidence — automated tests, staged rollouts, instant rollback. We harden your systems against security threats and give you the observability to see problems before your customers do.",
    outcomes: [
      "99.9%+ uptime — even during traffic spikes",
      "Zero-downtime deployments on any cadence",
      "Auto-scaling infrastructure that handles 10x load without manual intervention",
      "Security posture that satisfies enterprise and regulatory requirements",
      "30–60% infrastructure cost savings through right-sizing and reserved capacity",
    ],
    deliverables: ["Cloud architecture design & migration", "CI/CD pipeline setup (GitHub Actions, Jenkins)", "Containerisation with Docker & Kubernetes", "Infrastructure as Code (Terraform)", "Monitoring & alerting (Datadog, Grafana)", "Security audits & hardening"],
    industries: ["Fintech", "Health Tech", "Enterprise SaaS", "Media & Streaming", "E-commerce", "Government"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M7 18a5.5 5.5 0 0 1-.7-10.9A7.5 7.5 0 0 1 21.5 11a4.5 4.5 0 0 1-.5 9H7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M11 22v4M17 22v4M14 22v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "saas",
    index: "05",
    category: "Product Development",
    title: "SaaS Product Development",
    tagline: "From idea to recurring revenue — end to end.",
    color: "blue",
    painHeadline: "You have a brilliant SaaS idea. You don't know how to build it.",
    painBody:
      "Most SaaS ideas die not because they're bad — but because of execution. Founders underestimate the scope of what 'just building the product' actually involves: authentication, multi-tenancy, billing, admin panels, email systems, usage analytics, onboarding flows, and a dozen other invisible layers that users expect but never see. Hire the wrong team and you spend 18 months building something that's functionally broken or architecturally unmaintainable. By the time you realise it, you've burned your runway.",
    solutionHeadline: "We've built SaaS products before. We know exactly what's needed.",
    solutionBody:
      "We take you from validated idea to a production-ready, revenue-generating SaaS product. We handle the full stack: architecture decisions, auth and permissions, Stripe billing, multi-tenant data isolation, admin dashboards, user onboarding, feature flags, and analytics. We build modular, so your product can evolve rapidly. And we document everything, so you're never dependent on us to understand your own codebase.",
    outcomes: [
      "Faster time to first paying customer",
      "Subscription billing that just works — upgrades, downgrades, trials, refunds",
      "Multi-tenant architecture that scales from 10 to 10,000 customers",
      "Clear, maintainable codebase your internal team can own",
      "Launch with confidence — tested, monitored, and ready for real traffic",
    ],
    deliverables: ["MVP scoping & roadmap planning", "Full-stack SaaS architecture", "Auth, roles & permissions", "Stripe / Flutterwave billing integration", "Admin & analytics dashboards", "Customer onboarding flows", "Feature flags & A/B testing"],
    industries: ["B2B Software", "MarTech", "PropTech", "AgriTech", "HRTech", "LegalTech"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M9 14h4v6H9zM15 8h4v12h-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "consulting",
    index: "06",
    category: "Advisory",
    title: "Technical Consulting & Fractional CTO",
    tagline: "Senior technical leadership, without the senior hire cost.",
    color: "green",
    painHeadline: "You're making expensive technical decisions with no one to challenge them.",
    painBody:
      "Choosing the wrong stack costs you 12 months of technical debt. Hiring the wrong dev agency costs you your launch window. Skipping architecture planning costs you a full rewrite at Series A. These are the mistakes that kill companies — and they're almost always preventable with the right senior technical voice in the room. Most early-stage businesses can't afford a full-time CTO. So they either go without, or they rely entirely on a junior team making senior-level decisions.",
    solutionHeadline: "We bring the experience — you keep the equity.",
    solutionBody:
      "We slot in as your fractional CTO or technical advisor — attending your planning meetings, reviewing architectural decisions, evaluating vendor proposals, coaching your developers, and giving your board or investors the technical confidence they need. We've seen what good looks like across dozens of products and industries. We know which shortcuts create long-term pain, which technologies are genuinely useful versus trendy, and how to hire and manage a technical team that ships.",
    outcomes: [
      "Avoid costly architecture mistakes before they're baked in",
      "Make confident build-vs-buy decisions with independent guidance",
      "Hiring decisions backed by someone who's built real teams",
      "Clear technical roadmap your whole company can understand",
      "Investor-ready technical due diligence and documentation",
    ],
    deliverables: ["Architecture review & recommendations", "Tech stack selection & vendor evaluation", "Engineering team structure & hiring support", "Technical roadmap & sprint planning", "Code & security audits", "Investor / board technical presentations"],
    industries: ["Startups (Pre-seed to Series B)", "Non-profits & NGOs", "Corporate Innovation Teams", "Government Digital Services", "Family Businesses Going Digital", "Scale-ups"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="4.5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M5 24c0-4.4 4-8 9-8s9 3.6 9 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M21 6l2 2-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ text, color = "blue" }: { text: string; color?: "blue" | "green" }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-bold tracking-widest uppercase"
      style={{
        background: color === "blue" ? "rgba(26,107,255,0.07)" : "rgba(0,201,125,0.07)",
        borderColor: color === "blue" ? "rgba(26,107,255,0.25)" : "rgba(0,201,125,0.25)",
        color: color === "blue" ? "var(--accent)" : "var(--accent-green)",
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {text}
    </div>
  );
}

function ProblemQuote({ text }: { text: string }) {
  return (
    <div
      className="relative pl-6 py-1 my-8"
      style={{ borderLeft: "3px solid rgba(255,80,80,0.5)" }}
    >
      <p
        className="text-lg sm:text-xl font-bold leading-snug italic"
        style={{ color: "rgba(255,100,100,0.85)", fontFamily: "'Syne', sans-serif" }}
      >
        "{text}"
      </p>
    </div>
  );
}

// ─── Service card (compact nav) ───────────────────────────────────────────────
function ServiceNavCard({
  service,
  active,
  onClick,
}: {
  service: Service;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl border p-4 flex items-start gap-4 transition-all duration-200 group"
      style={{
        background: active
          ? service.color === "blue"
            ? "rgba(26,107,255,0.10)"
            : "rgba(0,201,125,0.09)"
          : "var(--bg-surface)",
        borderColor: active
          ? service.color === "blue"
            ? "rgba(26,107,255,0.40)"
            : "rgba(0,201,125,0.40)"
          : "var(--border-subtle)",
        boxShadow: active ? "0 8px 32px rgba(0,0,0,0.25)" : "none",
        transform: active ? "translateX(4px)" : "none",
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          background: active
            ? service.color === "blue" ? "rgba(26,107,255,0.18)" : "rgba(0,201,125,0.18)"
            : "var(--bg-elevated)",
          color: active
            ? service.color === "blue" ? "var(--accent)" : "var(--accent-green)"
            : "var(--text-faint)",
          transition: "all 0.2s",
        }}
      >
        {service.icon}
      </div>
      <div className="min-w-0">
        <span
          className="text-[10px] font-bold tracking-widest uppercase block mb-0.5"
          style={{
            color: active
              ? service.color === "blue" ? "var(--accent)" : "var(--accent-green)"
              : "var(--text-faint)",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {service.index} · {service.category}
        </span>
        <span
          className="text-sm font-bold leading-tight block"
          style={{
            color: active ? "var(--text-primary)" : "var(--text-muted)",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          {service.title}
        </span>
      </div>
    </button>
  );
}

// ─── Service detail panel ─────────────────────────────────────────────────────
function ServiceDetail({ service }: { service: Service }) {
  const accent = service.color === "blue" ? "var(--accent)" : "var(--accent-green)";
  const accentDim = service.color === "blue" ? "rgba(26,107,255,0.10)" : "rgba(0,201,125,0.10)";
  const accentBorder = service.color === "blue" ? "rgba(26,107,255,0.25)" : "rgba(0,201,125,0.25)";

  return (
    <div className="flex flex-col gap-10">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: accentDim, color: accent }}
          >
            {service.icon}
          </div>
          <div>
            <span
              className="text-[10px] font-bold tracking-widest uppercase block"
              style={{ color: accent, fontFamily: "'DM Mono', monospace" }}
            >
              {service.index} · {service.category}
            </span>
            <h2
              className="text-2xl sm:text-3xl font-black leading-tight"
              style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}
            >
              {service.title}
            </h2>
          </div>
        </div>
        <p
          className="text-base sm:text-lg font-semibold leading-relaxed"
          style={{ color: accent }}
        >
          {service.tagline}
        </p>
      </div>

      {/* The Problem */}
      <div
        className="rounded-2xl p-6 sm:p-8 border"
        style={{
          background: "rgba(255,60,60,0.04)",
          borderColor: "rgba(255,60,60,0.18)",
        }}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,60,60,0.12)" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2v4M6 9.5v.5" stroke="rgba(255,80,80,0.9)" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="6" cy="6" r="5" stroke="rgba(255,80,80,0.9)" strokeWidth="1.3"/>
            </svg>
          </div>
          <span
            className="text-[11px] font-bold tracking-widest uppercase"
            style={{ color: "rgba(255,100,100,0.75)", fontFamily: "'DM Mono', monospace" }}
          >
            The Business Problem
          </span>
        </div>
        <h3
          className="text-xl font-black mb-4 leading-snug"
          style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,120,120,0.95)" }}
        >
          {service.painHeadline}
        </h3>
        <p
          className="text-sm sm:text-base leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {service.painBody}
        </p>
      </div>

      {/* The Solution */}
      <div
        className="rounded-2xl p-6 sm:p-8 border"
        style={{ background: accentDim, borderColor: accentBorder }}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: accentDim }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span
            className="text-[11px] font-bold tracking-widest uppercase"
            style={{ color: accent, fontFamily: "'DM Mono', monospace" }}
          >
            How We Solve It
          </span>
        </div>
        <h3
          className="text-xl font-black mb-4 leading-snug"
          style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}
        >
          {service.solutionHeadline}
        </h3>
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {service.solutionBody}
        </p>
      </div>

      {/* Outcomes */}
      <div>
        <h4
          className="text-xs font-bold tracking-widest uppercase mb-4"
          style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}
        >
          Business Outcomes
        </h4>
        <ul className="space-y-3">
          {service.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
              <span
                className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: accentDim }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1.5 4.5l2 2L7.5 2" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Deliverables + Industries */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div
          className="rounded-xl p-5 border"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
        >
          <h4
            className="text-[10px] font-bold tracking-widest uppercase mb-4"
            style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}
          >
            What We Deliver
          </h4>
          <ul className="space-y-2.5">
            {service.deliverables.map((d) => (
              <li key={d} className="flex items-center gap-2.5 text-xs" style={{ color: "var(--text-secondary)" }}>
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: accent }}
                />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-xl p-5 border"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
        >
          <h4
            className="text-[10px] font-bold tracking-widest uppercase mb-4"
            style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}
          >
            Industries We've Served
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.industries.map((ind) => (
              <span
                key={ind}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg"
                style={{ background: accentDim, color: accent }}
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border"
        style={{
          background: "var(--bg-elevated)",
          borderColor: accentBorder,
        }}
      >
        <div>
          <p
            className="text-base font-black mb-1"
            style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}
          >
            Ready to get started?
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Tell us your situation. We'll tell you exactly how we'd approach it.
          </p>
        </div>
        <Link
          href={`/contact?service=${service.id}`}
          className="inline-flex items-center gap-2.5 text-sm font-bold px-6 py-3.5 rounded-xl whitespace-nowrap flex-shrink-0 transition-all duration-200 hover:scale-[1.03]"
          style={{
            background: service.color === "blue" ? "var(--gradient-brand)" : "linear-gradient(135deg, #00c97d, #00a865)",
            color: "#fff",
            boxShadow: service.color === "blue"
              ? "0 6px 20px rgba(26,107,255,0.30)"
              : "0 6px 20px rgba(0,201,125,0.30)",
          }}
        >
          Start a Conversation
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 6.5h9M8 4l2.5 2.5L8 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const activeService = SERVICES.find((s) => s.id === activeId)!;

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100svh" }}>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--border-default)" }}>
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(26,107,255,0.18) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 0%, transparent 100%)",
          }}
        />
        {/* Blue orb */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-30%", left: "-10%",
            width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(26,107,255,0.18) 0%, transparent 65%)",
          }}
        />
        {/* Green orb */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-20%", right: "-15%",
            width: "40vw", height: "40vw", maxWidth: 550, maxHeight: 550,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,201,125,0.13) 0%, transparent 65%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <SectionLabel text="Our Services" />

            <h1
              className="font-black leading-[1.02] tracking-tight mt-6 mb-6"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(38px, 6vw, 80px)",
                color: "var(--text-primary)",
              }}
            >
              We don't sell tech.
                We solve problems.
            </h1>

            <p
              className="text-lg sm:text-xl leading-relaxed max-w-xl"
              style={{ color: "var(--text-muted)" }}
            >
              Every business we work with comes to us with a painful, specific problem.
              Slow operations. Lost customers. A product idea they can't execute. We listen,
              diagnose, and build the right solution — not the most technically impressive one.
            </p>

            {/* Trust bar */}
            <div className="flex flex-wrap items-center gap-6 mt-10">
              {[
                { val: "5+", label: "Projects shipped" },
                { val: "12+", label: "Industries" },
                { val: "98%", label: "Client satisfaction" },
                { val: "2yrs", label: "Building in Africa" },
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span
                    className="text-2xl font-black"
                    style={{ fontFamily: "'Syne', sans-serif", color: "var(--accent)" }}
                  >
                    {val}
                  </span>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PAIN STATEMENT STRIP
      ══════════════════════════════════════════════════ */}
      <section
        className="border-b py-14 sm:py-20"
        style={{ borderColor: "var(--border-default)", background: "var(--bg-surface)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                pain: "You're losing revenue to a competitor with a better app.",
                fix: "We build the product that wins that fight.",
                color: "blue",
              },
              {
                pain: "Your team spends 30% of their week on tasks that should be automated.",
                fix: "We build the AI that gives them that time back.",
                color: "green",
              },
              {
                pain: "Your system crashes when you need it most.",
                fix: "We build infrastructure that holds under pressure.",
                color: "blue",
              },
              {
                pain: "You have a SaaS idea but no technical co-founder.",
                fix: "We become your technical partner and build it.",
                color: "green",
              },
              {
                pain: "Your users don't understand your product and churn.",
                fix: "We redesign the experience so they get it instantly.",
                color: "blue",
              },
              {
                pain: "You're making expensive technical decisions blindly.",
                fix: "We bring the senior voice that saves you months.",
                color: "green",
              },
            ].map(({ pain, fix, color }, i) => (
              <div
                key={i}
                className="rounded-xl p-5 border flex flex-col gap-4"
                style={{
                  background: "var(--bg-base)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(255,60,60,0.10)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 2v3M5 8v.5" stroke="rgba(255,80,80,0.8)" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p
                    className="text-sm font-semibold leading-snug"
                    style={{ color: "rgba(255,100,100,0.8)" }}
                  >
                    {pain}
                  </p>
                </div>
                <div className="h-px" style={{ background: "var(--border-default)" }} />
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: color === "blue" ? "rgba(26,107,255,0.12)" : "rgba(0,201,125,0.12)",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8.5 2"
                        stroke={color === "blue" ? "var(--accent)" : "var(--accent-green)"}
                        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p
                    className="text-sm font-semibold leading-snug"
                    style={{ color: color === "blue" ? "var(--accent)" : "var(--accent-green)" }}
                  >
                    {fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SERVICES DEEP DIVE (sticky sidebar + detail)
      ══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel text="Deep Dive" color="green" />
            <h2
              className="font-black leading-tight mt-5 mb-4"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3.5vw, 48px)", color: "var(--text-primary)" }}
            >
              Pick your problem.
                We'll show you how we solve it.
            </h2>
            <p className="text-base sm:text-lg" style={{ color: "var(--text-muted)" }}>
              Select a service below to see the business pain, our solution, and what you'll actually get.
            </p>
          </div>

          {/* Mobile: tabs */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6 -mx-4 px-4">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className="flex-shrink-0 px-4 py-2 rounded-lg border text-xs font-bold whitespace-nowrap transition-all duration-200"
                style={{
                  background: activeId === s.id
                    ? s.color === "blue" ? "rgba(26,107,255,0.12)" : "rgba(0,201,125,0.12)"
                    : "var(--bg-surface)",
                  borderColor: activeId === s.id
                    ? s.color === "blue" ? "rgba(26,107,255,0.40)" : "rgba(0,201,125,0.40)"
                    : "var(--border-subtle)",
                  color: activeId === s.id
                    ? s.color === "blue" ? "var(--accent)" : "var(--accent-green)"
                    : "var(--text-faint)",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {s.index} {s.title}
              </button>
            ))}
          </div>

          {/* Desktop: sidebar + detail */}
          <div className="flex gap-8 items-start">

            {/* Sticky sidebar */}
            <div className="hidden lg:flex flex-col gap-2.5 w-80 flex-shrink-0 sticky top-24">
              {SERVICES.map((s) => (
                <ServiceNavCard
                  key={s.id}
                  service={s}
                  active={activeId === s.id}
                  onClick={() => setActiveId(s.id)}
                />
              ))}
            </div>

            {/* Detail panel */}
            <div className="flex-1 min-w-0">
              <ServiceDetail key={activeId} service={activeService} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          INDUSTRIES BANNER
      ══════════════════════════════════════════════════ */}
      <section
        className="py-20 border-t border-b"
        style={{ borderColor: "var(--border-default)", background: "var(--bg-surface)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel text="Industries" />
            <h2
              className="font-black leading-tight mt-5"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(24px, 3vw, 42px)", color: "var(--text-primary)" }}
            >
              We've worked across{" "}
                12+ industries.
            </h2>
            <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              We bring cross-sector insights to every project. Solutions that work in fintech often create breakthrough moments in agri or health. We connect those dots.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Fintech & Payments", "Health & MedTech", "E-commerce & Retail", "Sports & Athletics",
              "Education & EdTech", "Logistics & Supply Chain", "Real Estate & PropTech",
              "Agriculture & AgriTech", "Media & Entertainment", "HR & Recruitment",
              "Legal & Compliance", "Government & NGOs",
            ].map((ind, i) => (
              <span
                key={ind}
                className="text-xs font-semibold px-4 py-2.5 rounded-full border transition-all duration-200 hover:scale-105 cursor-default"
                style={{
                  background: i % 2 === 0 ? "rgba(26,107,255,0.07)" : "rgba(0,201,125,0.07)",
                  borderColor: i % 2 === 0 ? "rgba(26,107,255,0.22)" : "rgba(0,201,125,0.22)",
                  color: i % 2 === 0 ? "var(--accent)" : "var(--accent-green)",
                }}
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ENGAGEMENT MODELS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel text="How We Engage" color="green" />
            <h2
              className="font-black leading-tight mt-5 mb-4"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(24px, 3vw, 44px)", color: "var(--text-primary)" }}
            >
              We work the way{" "}
                you need us to.
            </h2>
            <p className="text-base" style={{ color: "var(--text-muted)" }}>
              No rigid contracts. We adapt our engagement model to your situation.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: "🚀",
                name: "Project",
                tag: "Fixed Scope",
                desc: "You have a defined deliverable. We scope it, price it, and build it. Best for: MVPs, redesigns, integrations, and one-time builds.",
                best: ["MVPs & new products", "Website redesigns", "API integrations", "One-time automation"],
                color: "blue",
              },
              {
                icon: "🔄",
                name: "Retainer",
                tag: "Ongoing Partnership",
                desc: "A dedicated monthly block of our senior engineering and design time, yours to direct. Best for: startups iterating fast, scale-ups with continuous product work.",
                best: ["Fast-moving startups", "Continuous feature delivery", "Design iteration", "Ongoing AI/data work"],
                color: "green",
              },
              {
                icon: "🧭",
                name: "Advisory",
                tag: "Fractional CTO",
                desc: "Strategic technical leadership without a full-time hire. Weekly involvement, board-level reporting, team coaching, and architecture oversight.",
                best: ["Pre-seed to Series B founders", "Non-technical CEOs", "Technical due diligence", "Team building & hiring"],
                color: "blue",
              },
            ].map(({ icon, name, tag, desc, best, color }) => (
              <div
                key={name}
                className="rounded-2xl border p-7 flex flex-col gap-5 hover:scale-[1.02] transition-transform duration-200"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-4xl">{icon}</span>
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md"
                    style={{
                      background: color === "blue" ? "rgba(26,107,255,0.10)" : "rgba(0,201,125,0.10)",
                      color: color === "blue" ? "var(--accent)" : "var(--accent-green)",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {tag}
                  </span>
                </div>
                <h3
                  className="text-xl font-black"
                  style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}
                >
                  {name}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
                  {desc}
                </p>
                <div>
                  <p
                    className="text-[10px] font-bold tracking-widest uppercase mb-2.5"
                    style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}
                  >
                    Best for
                  </p>
                  <ul className="space-y-1.5">
                    {best.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{
                            background: color === "blue" ? "var(--accent)" : "var(--accent-green)",
                          }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section
        className="relative py-24 sm:py-32 border-t overflow-hidden"
        style={{ borderColor: "var(--border-default)" }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(26,107,255,0.14) 0%, rgba(0,201,125,0.08) 50%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(26,107,255,0.15) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="text-[11px] font-bold tracking-[0.2em] uppercase"
            style={{ color: "var(--accent-green)", fontFamily: "'DM Mono', monospace" }}
          >
            Ready when you are
          </span>
          <h2
            className="font-black leading-tight mt-4 mb-5"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(30px, 5vw, 64px)", color: "var(--text-primary)" }}
          >
            Let's talk about
              your problem.
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            No sales pitch. No jargon. Just a 30-minute conversation where we listen to your situation and tell you
            — honestly — whether and how we can help.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="relative inline-flex items-center gap-2.5 text-sm font-bold px-9 py-4 rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl"
              style={{
                background: "var(--gradient-brand)",
                color: "#fff",
                boxShadow: "0 10px 32px rgba(26,107,255,0.40)",
              }}
            >
              <span
                className="shimmer-btn absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
              />
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="relative">
                <rect x="1" y="2.5" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M1 5.5l6.5 4.5L14 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="relative">Book a Free Discovery Call</span>
            </Link>
            <Link
              href="/athech"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: "var(--text-muted)" }}
            >
              Or explore Athech, our flagship product →
            </Link>
          </div>

          {/* Micro-reassurances */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {["No commitment required", "Response within 24 hours", "NDAs available on request"].map((item) => (
              <span key={item} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-faint)" }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8.5 2" stroke="var(--accent-green)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}