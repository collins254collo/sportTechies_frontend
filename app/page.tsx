"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── Animated counter ─────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1600, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let t0: number | null = null;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M6 14.5h6M9 13v1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M5.5 8l2 2-2 2M10 10h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Web Development",
    color: "blue",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="3" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="10" y="3" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="3" y="10" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M12.5 10v5M10 12.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: "Mobile Apps",
    color: "green",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 5h14M2 9h14M2 13h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="14" cy="13" r="3" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M16 15l1.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    label: "UI / UX Design",
    color: "blue",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M9 5.5v3.5l2.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.5 3.5l1.5 1.5M13 13l1.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    label: "AI & Automation",
    color: "green",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 5.5L9 2l6 3.5v7L9 16l-6-3.5v-7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M9 2v14M3 5.5l6 3.5 6-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Cloud & DevOps",
    color: "blue",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2l2 5.5h5.5L12 11l1.5 5.5L9 13.5 4.5 16.5 6 11 1.5 7.5H7L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Product Strategy",
    color: "green",
  },
];

// ─── What We Do sections ──────────────────────────────────────────────────────
const WHAT_WE_DO = [
  {
    number: "01",
    title: "Web & Mobile Development",
    color: "blue",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="3" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 19h8M11 16v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 10l2.5 2.5L7 15M12 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description:
      "We build fast, scalable, pixel-perfect web applications and mobile apps using the latest technologies — React, Next.js, React Native, Node.js, and more. From a polished marketing site to a complex SaaS platform, we ship products that look great and perform under pressure.",
    tags: ["React / Next.js", "React Native", "Node.js", "REST & GraphQL", "TypeScript"],
  },
  {
    number: "02",
    title: "AI & Intelligent Automation",
    color: "green",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 3v3M11 16v3M3 11h3M16 11h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5.6 5.6l2.1 2.1M14.3 14.3l2.1 2.1M5.6 16.4l2.1-2.1M14.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    description:
      "We integrate large language models, computer vision, and predictive ML into your products. Whether it's an AI assistant, an automated workflow engine, or a recommendation system, we help you harness the power of AI without the hype — practical, tested, and built for production.",
    tags: ["LLM Integration", "Predictive ML", "Computer Vision", "Workflow Automation", "OpenAI / Anthropic APIs"],
  },
  {
    number: "03",
    title: "UI / UX Design",
    color: "blue",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 11h8M11 7v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="11" cy="11" r="2.5" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    description:
      "Design that isn't just beautiful — it converts. Our design process starts with research, flows through wireframes and interactive prototypes, and ends in production-ready Figma files your developers will love. We craft experiences that users remember and come back to.",
    tags: ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"],
  },
  {
    number: "04",
    title: "Cloud Infrastructure & DevOps",
    color: "green",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M6 14a4 4 0 0 1-.5-7.9A5.5 5.5 0 0 1 16.5 9a3.5 3.5 0 0 1-.5 7H6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 16v3M13 16v3M11 16v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    description:
      "Rock-solid infrastructure that scales with you. We set up CI/CD pipelines, containerised deployments on AWS, GCP, or Azure, and monitoring stacks that alert you before your users notice anything. Zero-downtime deploys. Auto-scaling. Security hardened from day one.",
    tags: ["AWS / GCP / Azure", "Docker & Kubernetes", "CI/CD Pipelines", "Terraform", "Observability"],
  },
  {
    number: "05",
    title: "SaaS Product Development",
    color: "blue",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 11h3v5H7zM12 7h3v9h-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    description:
      "End-to-end SaaS product development — from idea validation and MVP scoping to full product launch and growth iteration. We handle auth, billing (Stripe), multi-tenancy, admin dashboards, and analytics, so you can focus on your customers and your market.",
    tags: ["MVP Development", "Stripe Billing", "Multi-tenancy", "Auth & Roles", "Analytics Dashboards"],
  },
  {
    number: "06",
    title: "Technical Consulting & CTO-as-a-Service",
    color: "green",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 19c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 5l1.5 1.5-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description:
      "Need a senior technical mind without the full-time hire? We slot in as your fractional CTO — evaluating your architecture, coaching your team, unblocking delivery, and ensuring your technical decisions create competitive advantage, not technical debt.",
    tags: ["Architecture Review", "Tech Stack Selection", "Team Coaching", "Roadmap Planning", "Code Audits"],
  },
];

const CLIENTS = [
  "Kechei Camp",
  "Boston Athletic Association",
  "On Athletics Club",
  "Nala Track Club",
  "Tegla Loroupe Peace Race",
];

// ─── Service pill ─────────────────────────────────────────────────────────────
function ServicePill({ icon, label, color }: { icon: React.ReactNode; label: string; color: "blue" | "green" }) {
  return (
    <div
      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-sm font-medium whitespace-nowrap
                 hover:scale-[1.04] transition-transform duration-200 cursor-default"
      style={{
        background: color === "blue" ? "rgba(26,107,255,0.07)" : "rgba(0,201,125,0.07)",
        borderColor: color === "blue" ? "rgba(26,107,255,0.22)" : "rgba(0,201,125,0.22)",
        color: color === "blue" ? "var(--accent)" : "var(--accent-green)",
      }}
    >
      {icon}
      {label}
    </div>
  );
}

// ─── Stat block ───────────────────────────────────────────────────────────────
function Stat({ value, suffix, label, color, active }: {
  value: number; suffix: string; label: string;
  color: "blue" | "green"; active: boolean;
}) {
  const count = useCounter(value, 1500, active);
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className="text-3xl sm:text-[40px] font-black leading-none tabular-nums"
        style={{
          fontFamily: "'Syne', sans-serif",
          color: color === "blue" ? "var(--accent)" : "var(--accent-green)",
        }}
      >
        {count.toLocaleString()}{suffix}
      </span>
      <span
        className="text-[11px] font-semibold uppercase tracking-[0.15em]"
        style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── What We Do Card ──────────────────────────────────────────────────────────
function WhatWeDoCard({ item, index }: { item: typeof WHAT_WE_DO[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl border p-7 flex flex-col gap-5 transition-all duration-300 cursor-default"
      style={{
        background: hovered
          ? item.color === "blue" ? "rgba(26,107,255,0.06)" : "rgba(0,201,125,0.05)"
          : "var(--bg-surface)",
        borderColor: hovered
          ? item.color === "blue" ? "rgba(26,107,255,0.35)" : "rgba(0,201,125,0.35)"
          : "var(--border-subtle)",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.25)" : "none",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
    >
      {/* Number watermark */}
      <span
        className="absolute top-5 right-6 text-[56px] font-black leading-none select-none pointer-events-none transition-opacity duration-300"
        style={{
          fontFamily: "'Syne', sans-serif",
          color: item.color === "blue" ? "rgba(26,107,255,0.07)" : "rgba(0,201,125,0.07)",
          opacity: hovered ? 1 : 0.5,
        }}
      >
        {item.number}
      </span>

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: item.color === "blue" ? "var(--accent-dim)" : "var(--accent-green-dim)",
          color: item.color === "blue" ? "var(--accent)" : "var(--accent-green)",
        }}
      >
        {item.icon}
      </div>

      {/* Title */}
      <h3
        className="text-lg font-black leading-tight"
        style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
        {item.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-1">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide uppercase"
            style={{
              fontFamily: "'DM Mono', monospace",
              background: item.color === "blue" ? "rgba(26,107,255,0.10)" : "rgba(0,201,125,0.10)",
              color: item.color === "blue" ? "var(--accent)" : "var(--accent-green)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Process step ─────────────────────────────────────────────────────────────
function ProcessStep({ step, title, desc, last }: { step: string; title: string; desc: string; last?: boolean }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center gap-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-black text-sm z-10"
          style={{
            background: "var(--gradient-brand)",
            color: "#fff",
            fontFamily: "'Syne', sans-serif",
            boxShadow: "0 0 0 4px var(--bg-base), 0 0 20px rgba(26,107,255,0.35)",
          }}
        >
          {step}
        </div>
        {!last && (
          <div className="w-px flex-1 mt-2" style={{ background: "var(--border-subtle)", minHeight: 40 }} />
        )}
      </div>
      <div className="pb-10 flex-1">
        <h4
          className="font-black text-base mb-1.5"
          style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}
        >
          {title}
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

// ─── Athech card ──────────────────────────────────────────────────────────────
function AthechCard() {
  const bars = [55, 70, 48, 82, 65, 91, 74, 60, 88, 76, 58, 84];
  return (
    <div
      className="relative rounded-2xl overflow-hidden border w-full"
      style={{
        background: "var(--bg-surface)",
        borderColor: "var(--border-subtle)",
        boxShadow: "0 40px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(26,107,255,0.10)",
      }}
    >
      {/* Brand top bar */}
      <div className="h-[3px]" style={{ background: "var(--gradient-brand)" }} />

      {/* Titlebar */}
      <div
        className="flex items-center justify-between px-5 py-3.5 border-b"
        style={{ borderColor: "var(--border-default)", background: "var(--bg-elevated)" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "var(--gradient-brand)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5l1.4 3.8H13l-3.3 2.4 1.3 3.9L7 9.2l-4 2.4 1.3-3.9L1 5.3h4.6L7 1.5Z" fill="white"/>
            </svg>
          </div>
          <span className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}>
            Athech AI
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: "var(--accent-green-dim)", color: "var(--accent-green)" }}>
            LIVE
          </span>
        </div>
        <span className="text-[11px]" style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>
          injury-risk-engine v2.4
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Athlete row */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-sm"
            style={{ background: "var(--gradient-brand)", color: "#fff", fontFamily: "'Syne', sans-serif" }}>
            KO
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Kevin Omondi</p>
            <p className="text-xs" style={{ color: "var(--text-faint)" }}>Centre Mid · AFC Leopards</p>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0"
            style={{ background: "rgba(255,160,0,0.12)", color: "#ffaa00" }}>
            MODERATE
          </span>
        </div>

        {/* Risk score */}
        <div className="rounded-xl p-4 space-y-2.5"
          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)" }}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Injury Risk Index</span>
            <span className="text-2xl font-black" style={{ color: "#ffaa00", fontFamily: "'Syne', sans-serif" }}>72%</span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--bg-overlay)" }}>
            <div className="h-full rounded-full" style={{ width: "72%", background: "linear-gradient(90deg, #1a6bff, #ffaa00 70%, #ff5555)" }} />
          </div>
          <div className="flex justify-between text-[10px]" style={{ color: "var(--text-disabled)" }}>
            <span>Safe</span><span>Caution</span><span>High</span><span>Critical</span>
          </div>
        </div>

        {/* Load bars */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
            style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>
            12-Day Load Trend
          </p>
          <div className="flex items-end gap-[3px] h-12">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end">
                <div
                  className="rounded-[3px]"
                  style={{
                    height: `${h}%`,
                    background: h > 80
                      ? "linear-gradient(to top, #ff5555bb, #ff8800aa)"
                      : "linear-gradient(to top, rgba(26,107,255,0.75), rgba(0,201,125,0.65))",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* AI rec */}
        <div className="rounded-xl p-3.5 flex gap-3 border"
          style={{ background: "rgba(26,107,255,0.06)", borderColor: "rgba(26,107,255,0.18)" }}>
          <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
            style={{ background: "var(--accent-dim)" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="var(--accent)" strokeWidth="1.3"/>
              <path d="M6 3.5V6.5" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round"/>
              <circle cx="6" cy="8.5" r="0.6" fill="var(--accent)"/>
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-0.5"
              style={{ color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>
              AI Recommendation
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Reduce sprint volume by <strong>35%</strong>. Schedule physio session before matchday.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Client ticker ────────────────────────────────────────────────────────────
function ClientTicker() {
  const items = [...CLIENTS, ...CLIENTS];
  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--bg-base), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, var(--bg-base), transparent)" }} />
      <div className="ticker-track flex items-center gap-12 whitespace-nowrap w-max py-1">
        {items.map((name, i) => (
          <span key={i} className="flex items-center gap-3 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: i % 2 === 0 ? "var(--accent)" : "var(--accent-green)" }} />
            <span className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>
              {name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStatsActive(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ background: "var(--bg-base)" }}>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 — HERO HEADLINE
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "100svh" }}>

        {/* Backgrounds */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(26,107,255,0.20) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            maskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 100%)",
          }}
        />
        <div className="orb-float-slow absolute pointer-events-none"
          style={{ top: "-20%", left: "-15%", width: "60vw", height: "60vw", maxWidth: 750, maxHeight: 750, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,107,255,0.22) 0%, transparent 65%)" }} />
        <div className="orb-float-medium absolute pointer-events-none"
          style={{ bottom: "-12%", right: "-10%", width: "48vw", height: "48vw", maxWidth: 640, maxHeight: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,201,125,0.18) 0%, transparent 65%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20">

          {/* Full-width headline */}
          <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-20">
            <div
              className="fade-up delay-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-7 text-xs font-semibold tracking-widest uppercase"
              style={{ background: "rgba(26,107,255,0.08)", borderColor: "rgba(26,107,255,0.28)", color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="pulse-ring absolute inset-0 rounded-full block" style={{ background: "var(--accent)" }} />
                <span className="relative rounded-full h-2 w-2 block" style={{ background: "var(--accent)" }} />
              </span>
              Software Studio · Iten, Kenya
            </div>

            <h1
              className="fade-up delay-2 font-black leading-[1.02] tracking-tight mb-6"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(40px, 7.5vw, 92px)", color: "var(--text-primary)" }}
            >
              We Design & Build
                Software That Performs.
            </h1>

            <p className="fade-up delay-3 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: "var(--text-muted)" }}>
              From stunning websites and mobile apps to AI-powered platforms —
              we turn your idea into a product that delivers. Based in Iten,
              shipping worldwide.
            </p>

            <div className="fade-up delay-4 flex flex-wrap items-center justify-center gap-4">
              <Link href="/services"
                className="group relative inline-flex items-center gap-2.5 text-sm font-bold px-8 py-4 rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl"
                style={{ background: "var(--gradient-brand)", color: "#fff", boxShadow: "0 8px 28px rgba(26,107,255,0.38)" }}>
                <span className="shimmer-btn absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }} />
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="relative">
                  <path d="M2 7.5h11M9 4l3.5 3.5L9 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="relative">See Our Services</span>
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2.5 text-sm font-bold px-8 py-4 rounded-xl border transition-all duration-200 hover:scale-[1.03]"
                style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)", background: "var(--bg-surface)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M1 5l6 4 6-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                Start a Project
              </Link>
            </div>
          </div>

          {/* Services pills */}
          <div className="fade-up delay-4 mb-16 sm:mb-24">
            <p className="text-center text-[11px] font-semibold tracking-[0.2em] uppercase mb-5"
              style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>
              What we build
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {SERVICES.map((s) => (
                <ServicePill key={s.label} icon={s.icon} label={s.label} color={s.color as "blue" | "green"} />
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div
            className="fade-up delay-4 grid grid-cols-2 sm:grid-cols-4 gap-px mb-16 sm:mb-24 rounded-2xl overflow-hidden border"
            style={{ borderColor: "var(--border-default)", background: "var(--border-default)" }}
          >
            {[
              { value: 5, suffix: "+", label: "Projects shipped", color: "blue" },
              { value: 98, suffix: "%", label: "Client satisfaction", color: "green" },
              { value: 2,  suffix: "+", label: "Years building", color: "blue" },
              { value: 12, suffix: "+", label: "Industries served", color: "green" },
            ].map(({ value, suffix, label, color }) => (
              <div key={label} className="flex flex-col items-center justify-center gap-2 py-8 px-6 text-center"
                style={{ background: "var(--bg-surface)" }}>
                <Stat value={value} suffix={suffix} label={label} color={color as "blue" | "green"} active={statsActive} />
              </div>
            ))}
          </div>

          {/* Trusted by ticker */}
          <div className="fade-up delay-5 pt-10 space-y-5 border-t" style={{ borderColor: "var(--border-default)" }}>
            <p className="text-center text-[11px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>
              Trusted by forward-thinking companies
            </p>
            <ClientTicker />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — WHAT WE DO (detailed service cards)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,201,125,0.07) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-bold tracking-widest uppercase mb-5"
              style={{ background: "rgba(0,201,125,0.07)", borderColor: "rgba(0,201,125,0.25)", color: "var(--accent-green)", fontFamily: "'DM Mono', monospace" }}
            >
              Our Services
            </div>
            <h2
              className="font-black leading-tight mb-4"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 52px)", color: "var(--text-primary)" }}
            >
              Everything you need to{" "} ship & scale 
            
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              We're a full-stack studio. That means one team, one conversation, and complete accountability — from
              the first wireframe to the production server.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {WHAT_WE_DO.map((item, i) => (
              <WhatWeDoCard key={item.title} item={item} index={i} />
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div
            className="rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border-default)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-black mb-1.5" style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}>
                Not sure where to start?
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Book a free 30-minute discovery call. We'll map your idea to the right stack, timeline, and budget.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 text-sm font-bold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.03]"
                style={{ background: "var(--gradient-brand)", color: "#fff", boxShadow: "0 6px 20px rgba(26,107,255,0.30)" }}
              >
                Book a Free Call
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M8 4l2.5 2.5L8 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3 — HOW WE WORK
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 border-t" style={{ borderColor: "var(--border-default)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-bold tracking-widest uppercase mb-6"
                style={{ background: "rgba(26,107,255,0.07)", borderColor: "rgba(26,107,255,0.25)", color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}
              >
                How We Work
              </div>
              <h2
                className="font-black leading-tight mb-5"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3.5vw, 46px)", color: "var(--text-primary)" }}
              >
                A process built for{" "}
                  real outcomes.
              </h2>
              <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
                We've refined our process across dozens of projects. You'll always know where things stand,
                what's coming next, and who's responsible. No surprises, no scope creep, no ghosting.
              </p>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-3">
                {["Weekly sprint reviews", "Async-first comms", "Live staging env", "Source code ownership"].map((chip) => (
                  <span
                    key={chip}
                    className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-lg border"
                    style={{ background: "var(--bg-surface)", borderColor: "var(--border-default)", color: "var(--text-muted)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5L8.5 2" stroke="var(--accent-green)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: process steps */}
            <div className="pt-2">
              <ProcessStep step="01" title="Discovery & Scoping"
                desc="We run a structured kick-off to understand your goals, constraints, and users. Output: a clear scope document, tech stack decision, and timeline you can hold us to." />
              <ProcessStep step="02" title="Design & Prototype"
                desc="Wireframes, then high-fidelity Figma designs, then an interactive prototype. You sign off before a single line of production code is written." />
              <ProcessStep step="03" title="Agile Build Sprints"
                desc="Two-week sprints with a live staging environment updated every Friday. You test in real-time. We iterate fast. Full transparency via Linear or Jira." />
              <ProcessStep step="04" title="QA & Launch"
                desc="Automated test suites, manual QA, performance audits, and a hardened CI/CD pipeline. We don't launch until it's ready." />
              <ProcessStep step="05" title="Growth & Maintenance" last
                desc="Post-launch support, feature iteration, scaling infrastructure, and monthly performance reviews. We stay with you as your product grows." />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4 — WHY US
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 border-t overflow-hidden" style={{ borderColor: "var(--border-default)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(0,201,125,0.08) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-bold tracking-widest uppercase mb-5"
              style={{ background: "rgba(0,201,125,0.07)", borderColor: "rgba(0,201,125,0.25)", color: "var(--accent-green)", fontFamily: "'DM Mono', monospace" }}
            >
              Why Choose Us
            </div>
            <h2
              className="font-black leading-tight mb-4"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 52px)", color: "var(--text-primary)" }}
            >
              Built different, by design.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              We're not a dev shop that takes tickets. We're a product partner that cares about
              your business outcomes as much as you do.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "🌍", title: "African Context, Global Standard",
                desc: "Based in Iten — one of Africa's most innovative corners. We understand local markets and build to international quality benchmarks.",
                color: "blue",
              },
              {
                icon: "⚡", title: "Speed Without Shortcuts",
                desc: "We ship fast because we've done this dozens of times. Our reusable patterns, design systems, and infrastructure templates cut weeks off every project.",
                color: "green",
              },
              {
                icon: "🔬", title: "Research-Led Decisions",
                desc: "Every recommendation — from stack choice to feature scope — is backed by data, research, and real-world evidence. No hype-driven tech choices.",
                color: "blue",
              },
              {
                icon: "🤝", title: "You Own Everything",
                desc: "Source code, designs, domains, accounts — all yours from day one. We don't lock you in. We earn your continued business by being excellent.",
                color: "green",
              },
            ].map(({ icon, title, desc, color }) => (
              <div
                key={title}
                className="rounded-2xl p-6 border flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-200"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <span className="text-3xl">{icon}</span>
                <h3 className="text-base font-black leading-tight"
                  style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 5 — FLAGSHIP: ATHECH (moved to bottom as requested)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 border-t overflow-hidden" style={{ borderColor: "var(--border-default)" }}>
        {/* Strong ambient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 70% at 50% 60%, rgba(26,107,255,0.12) 0%, rgba(0,201,125,0.08) 50%, transparent 100%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(26,107,255,0.18) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section label */}
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-bold tracking-widest uppercase"
              style={{ background: "var(--accent-green-dim)", borderColor: "rgba(0,201,125,0.28)", color: "var(--accent-green)", fontFamily: "'DM Mono', monospace" }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 1L7 4.5H11L8 7l1 3.5L5.5 8.5 2.5 10.5l1-3.5-3-2.5h3.5L5.5 1Z" fill="currentColor"/>
              </svg>
              Flagship Innovation · Meet Athech
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Athech card */}
            <div className="relative order-2 lg:order-1">
              <div
                className="absolute -inset-8 rounded-3xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 55% 45%, rgba(26,107,255,0.20) 0%, rgba(0,201,125,0.12) 55%, transparent 100%)", filter: "blur(30px)" }}
              />
              <AthechCard />

            </div>

            {/* Right: copy */}
            <div className="order-1 lg:order-2 space-y-7">
              <div>
                <h2
                  className="font-black leading-tight mb-4"
                  style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(30px, 4vw, 52px)", color: "var(--text-primary)" }}
                >
                  Introducing{" "}
                  <span style={{ background: "var(--gradient-brand-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Athech
                  </span>
                  <br />
                  <span className="text-xl sm:text-2xl font-bold" style={{ color: "var(--text-muted)" }}>
                    The AI Coach Built for African Athletes.
                  </span>
                </h2>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Athech is our flagship SaaS product — a personal AI performance coach that monitors training load,
                  recovery, and biometrics in real time. It surfaces injury risks <em>before</em> they become
                  career-threatening, and delivers personalised coaching recommendations straight to the athlete and their staff.
                </p>
              </div>

              {/* Feature list */}
              <ul className="space-y-4">
                {[
                  { t: "Predict injuries up to 5 days before they occur", c: "blue" },
                  { t: "Per-athlete load monitoring with daily risk scoring", c: "green" },
                  { t: "AI-generated recommendations sent to coaching staff", c: "blue" },
                  { t: "Integrates with GPS vests, wearables & club systems", c: "green" },
                  { t: "Built for football, athletics, rugby, and more", c: "blue" },
                  { t: "Trusted by clubs and running organisations across East Africa", c: "green" },
                ].map(({ t, c }) => (
                  <li key={t} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                    <span
                      className="mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: c === "blue" ? "var(--accent-dim)" : "var(--accent-green-dim)" }}
                    >
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path d="M1.5 4.5l2 2L7.5 2" stroke={c === "blue" ? "var(--accent)" : "var(--accent-green)"}
                          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              {/* Athech stat row */}
              <div
                className="grid grid-cols-3 gap-px rounded-xl overflow-hidden border"
                style={{ borderColor: "var(--border-default)", background: "var(--border-default)" }}
              >
                {[
                  { val: "94%", label: "AI Accuracy" },
                  { val: "5 days", label: "Avg. Early Warning" },
                  { val: "2K+", label: "Athletes Monitored" },
                ].map(({ val, label }) => (
                  <div key={label} className="flex flex-col items-center justify-center py-4 px-3 text-center"
                    style={{ background: "var(--bg-surface)" }}>
                    <span className="text-xl font-black" style={{ fontFamily: "'Syne', sans-serif", color: "var(--accent)" }}>{val}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest mt-0.5"
                      style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>{label}</span>
                  </div>
                ))}
              </div>

              {/* Athech CTAs */}
              <div className="flex items-center gap-5 pt-1">
                <Link
                  href="/athech"
                  className="group inline-flex items-center gap-2 text-sm font-bold px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.03]"
                  style={{ background: "var(--gradient-brand)", color: "#fff", boxShadow: "0 6px 20px rgba(26,107,255,0.30)" }}
                >
                  Explore Athech
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                    className="group-hover:translate-x-0.5 transition-transform">
                    <path d="M2 6.5h9M8 4l2.5 2.5L8 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link href="/demo"
                  className="text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: "var(--text-muted)" }}>
                  Book a free demo →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}