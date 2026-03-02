"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";


// ─── Animated counter ─────────────────────────────────────────
function useCounter(target: number, duration = 1800, active = false) {
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

// ─── Intersection observer hook ───────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Shared: Section label ─────────────────────────────────────
function SectionLabel({ children, color = "blue" }: { children: React.ReactNode; color?: "blue" | "green" }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-bold tracking-[0.18em] uppercase"
      style={{
        background: color === "blue" ? "var(--accent-dim)" : "var(--accent-green-dim)",
        borderColor: color === "blue" ? "rgba(26,107,255,0.28)" : "rgba(0,201,125,0.28)",
        color: color === "blue" ? "var(--accent)" : "var(--accent-green)",
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {children}
    </span>
  );
}

// ─── Shared: Gradient heading ──────────────────────────────────
function GradientHeading({ children, size = "lg" }: { children: React.ReactNode; size?: "sm" | "lg" | "xl" }) {
  const sizes = {
    sm: "clamp(24px, 3vw, 34px)",
    lg: "clamp(32px, 5vw, 56px)",
    xl: "clamp(42px, 7vw, 80px)",
  };
  return (
    <span
      style={{
        background: "var(--gradient-brand-text)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontFamily: "'Syne', sans-serif",
        fontSize: sizes[size],
        fontWeight: 900,
        lineHeight: 1.05,
        letterSpacing: "-0.02em",
      }}
    >
      {children}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pt-28 sm:pt-36 pb-20 sm:pb-28"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(26,107,255,0.18) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 100%)",
        }}
      />
      <div className="orb-float-slow absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,107,255,0.18) 0%, transparent 65%)" }} />
      <div className="orb-float-medium absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,201,125,0.14) 0%, transparent 65%)", animationDelay: "3s" }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Status badge */}
        <div className="fade-up delay-1 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8 text-xs font-semibold"
          style={{
            background: "var(--accent-green-dim)",
            borderColor: "rgba(0,201,125,0.3)",
            color: "var(--accent-green)",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.12em",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="pulse-ring absolute inset-0 rounded-full block" style={{ background: "var(--accent-green)" }} />
            <span className="relative rounded-full h-2 w-2 block" style={{ background: "var(--accent-green)" }} />
          </span>
          NOW IN BETA · EARLY ACCESS OPEN
        </div>

        {/* Main headline */}
        <h1 className="fade-up delay-2 mb-6" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.025em" }}>
          <span style={{ fontSize: "clamp(44px, 8vw, 96px)", color: "var(--text-primary)", display: "block" }}>
            Stop Guessing. Predict Injuries.
          </span>
          
        </h1>

        <p className="fade-up delay-3 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ color: "var(--text-muted)" }}>
         Athech is an AI-powered injury prediction platform for running clubs, performance coaches, and sports physiotherapists. We analyse runner data in real time to flag injury risk <em>days before it happens</em>.
        </p>

        {/* CTAs */}
        <div className="fade-up delay-4 flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link href="/demo"
            className="group relative inline-flex items-center gap-2.5 text-sm font-bold px-8 py-4 rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.03]"
            style={{ background: "var(--gradient-brand)", color: "#fff", boxShadow: "0 8px 32px rgba(26,107,255,0.38)" }}
          >
            <span className="shimmer-btn absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }} />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative">
              <rect x="1.5" y="2.5" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8" cy="7.5" r="2.2" fill="currentColor" />
            </svg>
            <span className="relative">Get Early Access</span>
          </Link>
          <Link href="#how-it-works"
            className="inline-flex items-center gap-2 text-sm font-semibold px-8 py-4 rounded-xl border transition-all duration-200 hover:scale-[1.03]"
            style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)", background: "var(--bg-surface)" }}
          >
            See How It Works
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Social proof numbers */}
        <div className="fade-up delay-5 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {[
            { val: "340+", label: "Athletes monitored" },
            { val: "94%", label: "Prediction accuracy" },
            { val: "28+", label: "Clubs in beta" },
            { val: "5 days", label: "Average early warning" },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-black text-2xl sm:text-3xl" style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}>
                {val}
              </span>
              <span className="text-xs tracking-wider uppercase" style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 2 — THE PROBLEM
// ═══════════════════════════════════════════════════════════════
function ProblemSection() {
  const { ref, inView } = useInView();
  return (
    <section className="relative py-20 sm:py-28" style={{ background: "var(--bg-surface)" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <div className={`space-y-7 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SectionLabel color="blue">The Problem</SectionLabel>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Injuries are costing clubs<br />
              millions every season.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              The average professional football club loses over <strong style={{ color: "var(--text-primary)" }}>$3.5M per season</strong> to
              player injuries — in squad costs, lost match performance, and medical bills.
              Yet most clubs still rely on gut feel, manual load tracking in spreadsheets,
              and reactive physio visits.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              By the time a player feels pain, the damage is already done. Athech
              changes this — shifting injury management from reactive to predictive.
            </p>
          </div>

          {/* Right: problem stat cards */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { stat: "$3.5M", desc: "Average annual injury cost per top-flight club", color: "blue" },
              { stat: "62%", desc: "Of injuries happen during periods of overload", color: "green" },
              { stat: "4–6 wk", desc: "Average recovery time lost per key player injury", color: "blue" },
              { stat: "78%", desc: "Of soft-tissue injuries are preventable with early detection", color: "green" },
            ].map(({ stat, desc, color }, i) => (
              <div key={i}
                className="rounded-2xl p-5 border flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200"
                style={{
                  background: "var(--bg-elevated)",
                  borderColor: color === "blue" ? "rgba(26,107,255,0.2)" : "rgba(0,201,125,0.2)",
                }}
              >
                <span className="font-black text-2xl" style={{ fontFamily: "'Syne', sans-serif", color: color === "blue" ? "var(--accent)" : "var(--accent-green)" }}>
                  {stat}
                </span>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 3 — HOW IT WORKS
// ═══════════════════════════════════════════════════════════════
const STEPS = [
  {
    number: "01",
    title: "Connect Your Data Sources",
    desc: "Athech integrates with GPS vests, wearables (Catapult, STATSports, Polar), club management systems, and manual load logs. Setup takes under 30 minutes.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 3v18M4 7.5l8 4.5 8-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    color: "blue",
  },
  {
    number: "02",
    title: "AI Analyses Every Athlete Daily",
    desc: "Our models process biometric data, training load, sleep quality, recovery scores, match intensity, and historical injury patterns — for every player, every day.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    color: "green",
  },
  {
    number: "03",
    title: "Risk Scores Delivered to Your Staff",
    desc: "Each morning, coaches and physios receive a dashboard update with each player's injury risk score, contributing factors, and AI-generated load recommendations.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 9h10M7 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="17" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
    color: "blue",
  },
  {
    number: "04",
    title: "Take Action, Track Outcomes",
    desc: "Adjust training plans directly in Athech. When you modify loads, our model recalculates risk in real time. Track intervention outcomes to continuously improve predictions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 17l4-5 4 3 5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M20 8l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    color: "green",
  },
];

function HowItWorksSection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section id="how-it-works" className="py-20 sm:py-28" style={{ background: "var(--bg-base)" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel color="green">How It Works</SectionLabel>
          <h2 className="mt-5 mb-4" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            From raw data to{" "}actionable insight in minutes.
          </h2>
          <p style={{ color: "var(--text-muted)" }}>
            Athech plugs into your existing setup. No new hardware required. No data science team needed.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-6 border flex flex-col gap-5 group hover:scale-[1.02] transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                background: "var(--bg-surface)",
                borderColor: step.color === "blue" ? "rgba(26,107,255,0.18)" : "rgba(0,201,125,0.18)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Step number watermark */}
              <span
                className="absolute top-4 right-5 font-black text-5xl pointer-events-none select-none"
                style={{ fontFamily: "'Syne', sans-serif", color: step.color === "blue" ? "rgba(26,107,255,0.07)" : "rgba(0,201,125,0.07)" }}
              >
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: step.color === "blue" ? "var(--accent-dim)" : "var(--accent-green-dim)", color: step.color === "blue" ? "var(--accent)" : "var(--accent-green)" }}>
                {step.icon}
              </div>

              <div>
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--text-primary)", fontFamily: "'Syne', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {step.desc}
                </p>
              </div>

              {/* Connector arrow (except last) */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-7 h-7 rounded-full border flex items-center justify-center"
                    style={{ background: "var(--bg-base)", borderColor: "var(--border-subtle)" }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5h6M6 3l2 2-2 2" stroke="var(--text-faint)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 4 — FEATURES
// ═══════════════════════════════════════════════════════════════
const FEATURES = [
  {
    title: "Real-Time Injury Risk Engine",
    desc: "Our proprietary ML model processes 40+ biometric and training variables per athlete per day. Risk scores update continuously — not just once a week.",
    tag: "Core AI",
    color: "blue",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M8 18l4-6 4 4 4-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    points: ["40+ variables per athlete", "Updates every training session", "Per-body-part risk breakdown"],
  },
  {
    title: "Athlete Load Management",
    desc: "Set weekly load targets per player. Athech tracks actual vs planned load, flags overloads automatically, and suggests session modifications to hit your targets safely.",
    tag: "Load Monitoring",
    color: "green",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M4 12h20" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10 17h8M10 20h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    points: ["GPS & wearable data sync", "Chronic vs acute load ratios", "Auto-flag overload sessions"],
  },
  {
    title: "Recovery & Wellness Tracking",
    desc: "Players log daily wellness in 60 seconds via the Athech mobile app. Sleep quality, muscle soreness, mood and HRV data feed directly into the risk model.",
    tag: "Wellness",
    color: "blue",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 5C10 5 6 8.5 6 13c0 5 8 14 8 14s8-9 8-14c0-4.5-4-8-8-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M11 13l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    points: ["60-second daily check-in", "HRV & sleep integration", "Wellness trend visualisation"],
  },
  {
    title: "Smart Recommendations Engine",
    desc: "Athech doesn't just flag risk — it tells you what to do about it. Get specific, evidence-backed training modifications and recovery protocols for each at-risk player.",
    tag: "AI Advice",
    color: "green",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M20 6l2-2M22 10h2M20 14l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    points: ["Personalised per athlete", "Evidence-based protocols", "Outcome tracking & feedback loop"],
  },
  {
    title: "Match Readiness Scores",
    desc: "Before every match, Athech generates a readiness score for each player — factoring in travel, recent loads, sleep, and injury history. Make selection decisions with confidence.",
    tag: "Match Day",
    color: "blue",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3l2.5 8H24l-6.5 5 2.5 8L14 19l-6 5 2.5-8L4 11h7.5L14 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
    points: ["Pre-match readiness report", "Travel & fatigue modelling", "Selection confidence scores"],
  },
  {
    title: "Club Dashboard & Reporting",
    desc: "A single screen showing your entire squad's health status. Drill down into any player, export PDF reports for medical staff, and track season-long injury trends.",
    tag: "Management",
    color: "green",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="15" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="15" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15 20h10M20 15v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    points: ["Full squad at-a-glance view", "PDF medical reports", "Season injury trend analytics"],
  },
];

function FeaturesSection() {
  const { ref, inView } = useInView(0.05);
  return (
    <section className="py-20 sm:py-28" style={{ background: "var(--bg-surface)" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel color="blue">Features</SectionLabel>
          <h2 className="mt-5 mb-4" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            Everything your performance team needs, in one platform.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`rounded-2xl p-7 border flex flex-col gap-5 group hover:scale-[1.01] transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{
                background: "var(--bg-elevated)",
                borderColor: f.color === "blue" ? "rgba(26,107,255,0.15)" : "rgba(0,201,125,0.15)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Icon + tag */}
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: f.color === "blue" ? "var(--accent-dim)" : "var(--accent-green-dim)", color: f.color === "blue" ? "var(--accent)" : "var(--accent-green)" }}>
                  {f.icon}
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{
                    background: f.color === "blue" ? "var(--accent-dim)" : "var(--accent-green-dim)",
                    color: f.color === "blue" ? "var(--accent)" : "var(--accent-green)",
                    fontFamily: "'DM Mono', monospace",
                  }}>
                  {f.tag}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                  {f.desc}
                </p>
                <ul className="space-y-1.5">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                      <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: f.color === "blue" ? "var(--accent-dim)" : "var(--accent-green-dim)" }}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4l2 2L6.5 2" stroke={f.color === "blue" ? "var(--accent)" : "var(--accent-green)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 5 — IMPACT STATS
// ═══════════════════════════════════════════════════════════════
function ImpactSection() {
  const { ref, inView } = useInView(0.3);
  const v1 = useCounter(94, 1600, inView);
  const v2 = useCounter(340, 1800, inView);
  const v3 = useCounter(62, 1600, inView);
  const v4 = useCounter(5,  1400, inView);

  const stats = [
    { val: v1, suffix: "%", label: "Prediction accuracy", sub: "Validated across beta clubs", color: "blue" },
    { val: v2, suffix: "+", label: "Athletes monitored", sub: "Across 28 clubs in 8 countries", color: "green" },
    { val: v3, suffix: "%", label: "Reduction in soft-tissue injuries", sub: "Average across beta partners", color: "blue" },
    { val: v4, suffix: " days", label: "Average early warning lead time", sub: "Before injury manifests as pain", color: "green" },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "var(--bg-base)" }} ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(26,107,255,0.06) 0%, transparent 100%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <SectionLabel color="green">Real Impact</SectionLabel>
          <h2 className="mt-5" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Numbers that tell<br /><GradientHeading size="lg">the real story.</GradientHeading>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ val, suffix, label, sub, color }, i) => (
            <div key={i} className="rounded-2xl p-8 border text-center flex flex-col items-center gap-3 hover:scale-[1.02] transition-transform duration-200"
              style={{
                background: "var(--bg-surface)",
                borderColor: color === "blue" ? "rgba(26,107,255,0.2)" : "rgba(0,201,125,0.2)",
              }}>
              <span className="font-black leading-none" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(40px, 5vw, 60px)", color: color === "blue" ? "var(--accent)" : "var(--accent-green)" }}>
                {val}{suffix}
              </span>
              <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{label}</span>
              <span className="text-xs text-center" style={{ color: "var(--text-faint)" }}>{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 6 — WHO IT'S FOR
// ═══════════════════════════════════════════════════════════════
const PERSONAS = [
  {
    role: "Head of Performance",
    pain: "Struggling to balance training load across a 30-man squad while keeping players fit for key fixtures.",
    gain: "Get a daily squad health overview. Know exactly who needs rest, who can push — and back every decision with data.",
    color: "blue",
    icon: "🏃",
  },
  {
    role: "Club Physiotherapist",
    pain: "Reacting to injuries after they happen, never having enough data to justify early intervention.",
    gain: "Detect at-risk players 3–5 days early. Present evidence-based recommendations to coaching staff with confidence.",
    color: "green",
    icon: "🩺",
  },
  {
    role: "Football Club Director",
    pain: "Watching injury costs eat into the squad budget every season with no clear strategy to reduce them.",
    gain: "Reduce soft-tissue injury rates by up to 62%. Protect your most valuable assets and reclaim lost squad availability.",
    color: "blue",
    icon: "📊",
  },
  {
    role: "Head Coach",
    pain: "Making selection decisions without knowing which players are carrying hidden fatigue or injury risk.",
    gain: "Match-day readiness scores for every player. Select your starting XI with confidence, not guesswork.",
    color: "green",
    icon: "🎯",
  },
];

function ForWhoSection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section className="py-20 sm:py-28" style={{ background: "var(--bg-surface)" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel color="blue">Who It's For</SectionLabel>
          <h2 className="mt-5 mb-4" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            Built for the people on the ground.
          </h2>
          <p style={{ color: "var(--text-muted)" }}>
            Athech is designed around real workflows — not just data scientists and analysts.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {PERSONAS.map((p, i) => (
            <div
              key={i}
              className={`rounded-2xl p-7 border transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                background: "var(--bg-elevated)",
                borderColor: p.color === "blue" ? "rgba(26,107,255,0.18)" : "rgba(0,201,125,0.18)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="text-3xl">{p.icon}</div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-0.5"
                    style={{ color: p.color === "blue" ? "var(--accent)" : "var(--accent-green)", fontFamily: "'DM Mono', monospace" }}>
                    For the
                  </p>
                  <h3 className="font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}>
                    {p.role}
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl p-4" style={{ background: "rgba(255,80,80,0.06)", border: "1px solid rgba(255,80,80,0.15)" }}>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: "#ff6b6b", fontFamily: "'DM Mono', monospace" }}>
                    The Problem
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.pain}</p>
                </div>
                <div className="rounded-xl p-4"
                  style={{
                    background: p.color === "blue" ? "var(--accent-dim)" : "var(--accent-green-dim)",
                    border: `1px solid ${p.color === "blue" ? "rgba(26,107,255,0.2)" : "rgba(0,201,125,0.2)"}`,
                  }}>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5"
                    style={{ color: p.color === "blue" ? "var(--accent)" : "var(--accent-green)", fontFamily: "'DM Mono', monospace" }}>
                    With Athech
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p.gain}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 7 — PRICING
// ═══════════════════════════════════════════════════════════════
const PLANS = [
  {
    name: "Starter",
    price: "$299",
    period: "/month",
    desc: "Perfect for academies, semi-pro clubs, and teams getting started with data-driven performance.",
    color: "blue",
    popular: false,
    features: [
      "Up to 25 athletes",
      "Daily risk scores",
      "Load monitoring dashboard",
      "Mobile wellness app",
      "Email support",
      "CSV data export",
    ],
  },
  {
    name: "Professional",
    price: "$799",
    period: "/month",
    desc: "For professional clubs and serious performance teams who need the full predictive power of Athech.",
    color: "gradient",
    popular: true,
    features: [
      "Up to 60 athletes",
      "Everything in Starter",
      "GPS & wearable integrations",
      "Match-day readiness reports",
      "AI recommendations engine",
      "Priority Slack support",
      "Custom PDF medical reports",
      "Team performance analytics",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Multi-team organisations, leagues, and national federations with bespoke data and compliance needs.",
    color: "green",
    popular: false,
    features: [
      "Unlimited athletes",
      "Everything in Professional",
      "Multi-squad management",
      "Custom AI model training",
      "SSO & enterprise security",
      "Dedicated account manager",
      "SLA guarantee",
      "On-premise deployment option",
    ],
  },
];

function PricingSection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section className="py-20 sm:py-28" style={{ background: "var(--bg-base)" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-xl mx-auto mb-16">
          <SectionLabel color="blue">Pricing</SectionLabel>
          <h2 className="mt-5 mb-3" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            Simple, transparent pricing.
          </h2>
          <p style={{ color: "var(--text-muted)" }}>
            No setup fees. No long-term contracts. Cancel any time. Early access members lock in beta pricing permanently.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => {
            const isGradient = plan.color === "gradient";
            return (
              <div
                key={i}
                className={`relative rounded-2xl p-8 border flex flex-col gap-6 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${plan.popular ? "scale-[1.02] lg:scale-[1.04]" : ""}`}
                style={{
                  background: isGradient ? "var(--bg-elevated)" : "var(--bg-surface)",
                  borderColor: isGradient
                    ? "rgba(26,107,255,0.45)"
                    : plan.color === "green"
                    ? "rgba(0,201,125,0.22)"
                    : "rgba(26,107,255,0.18)",
                  transitionDelay: `${i * 100}ms`,
                  boxShadow: plan.popular ? "0 20px 60px rgba(26,107,255,0.22)" : "none",
                }}
              >
                {/* Top brand line for popular */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: "var(--gradient-brand)" }} />
                )}

                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase"
                    style={{ background: "var(--gradient-brand)", color: "#fff", fontFamily: "'DM Mono', monospace" }}>
                    Most Popular
                  </div>
                )}

                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-2"
                    style={{
                      color: isGradient ? "var(--accent)" : plan.color === "green" ? "var(--accent-green)" : "var(--accent)",
                      fontFamily: "'DM Mono', monospace",
                    }}>
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1 mb-3">
                    <span className="font-black" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 5vw, 52px)", color: "var(--text-primary)", lineHeight: 1 }}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm mb-2" style={{ color: "var(--text-faint)" }}>{plan.period}</span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{plan.desc}</p>
                </div>

                {/* CTA */}
                <Link
                  href={plan.price === "Custom" ? "/contact" : "/demo"}
                  className="block w-full text-center text-sm font-bold py-3.5 rounded-xl transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                  style={
                    isGradient
                      ? { background: "var(--gradient-brand)", color: "#fff" }
                      : { background: "var(--bg-overlay)", color: "var(--text-primary)", border: "1px solid var(--border-subtle)" }
                  }
                >
                  {plan.price === "Custom" ? "Talk to Sales" : "Start Free Trial"}
                </Link>

                {/* Feature list */}
                <ul className="space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                      <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{
                          background: isGradient ? "var(--accent-dim)" : plan.color === "green" ? "var(--accent-green-dim)" : "var(--accent-dim)",
                        }}>
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M1.5 4.5l2 2L7.5 2"
                            stroke={isGradient ? "var(--accent)" : plan.color === "green" ? "var(--accent-green)" : "var(--accent)"}
                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm mt-10" style={{ color: "var(--text-faint)" }}>
          All plans include a 14-day free trial. No credit card required to start.{" "}
          <Link href="/contact" style={{ color: "var(--accent)" }} className="hover:underline">
            Questions? Talk to us →
          </Link>
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 8 — TESTIMONIALS
// ═══════════════════════════════════════════════════════════════
const TESTIMONIALS = [
  {
    quote: "Athech flagged a hamstring risk for our star midfielder four days before he would have broken down in training. That single prediction saved us six weeks of recovery time and a crucial cup run.",
    name: "Leonard Bett",
    role: "Professional Steeplechaser",
    color: "blue",
  },
  {
    quote: "Finally, a tool that actually speaks the language of a physio. The risk breakdowns by body part and the evidence-based recommendations mean I can go to the coaching staff with confidence.",
    name: "Joan Chelimo",
    role: "Marathon World Record Holder",
    color: "green",
  },
  {
    quote: "We reduced our soft-tissue injury rate by 58% in our first season with Athech. From a club finances perspective, that's transformative.",
    name: "Agnes Ngetich",
    role: "10,000m World Champion",
    color: "blue",
  },
];

function TestimonialsSection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section className="py-20 sm:py-28" style={{ background: "var(--bg-surface)" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <SectionLabel color="green">From Our Beta Users</SectionLabel>
          <h2 className="mt-5" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            Real Athletes. Real results.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`rounded-2xl p-7 border flex flex-col gap-6 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                background: "var(--bg-elevated)",
                borderColor: t.color === "blue" ? "rgba(26,107,255,0.18)" : "rgba(0,201,125,0.18)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              {/* Quote mark */}
              <span className="text-5xl font-black leading-none" style={{ color: t.color === "blue" ? "var(--accent)" : "var(--accent-green)", fontFamily: "'Syne', sans-serif" }}>
                "
              </span>

              <p className="text-sm sm:text-base leading-relaxed flex-1 -mt-6" style={{ color: "var(--text-secondary)" }}>
                {t.quote}
              </p>

              <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid var(--border-default)" }}>
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-sm"
                  style={{ background: t.color === "blue" ? "var(--accent-dim)" : "var(--accent-green-dim)", color: t.color === "blue" ? "var(--accent)" : "var(--accent-green)", fontFamily: "'Syne', sans-serif" }}>
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-faint)" }}>{t.role} </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 9 — INTEGRATIONS
// ═══════════════════════════════════════════════════════════════
const INTEGRATIONS = [
  "Catapult Sports", "STATSports", "Polar Team Pro", "Garmin",
  "Whoop", "Oura Ring", "Hudl", "Prozone", "Wyscout", "Excel / CSV",
];

function IntegrationsSection() {
  return (
    <section className="py-16 sm:py-24" style={{ background: "var(--bg-base)", borderTop: "1px solid var(--border-default)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-8" style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>
          Integrates with tools your team already uses
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {INTEGRATIONS.map((name, i) => (
            <span key={i}
              className="px-4 py-2 rounded-full border text-xs font-semibold"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border-subtle)",
                color: "var(--text-muted)",
              }}>
              {name}
            </span>
          ))}
        </div>
        <p className="text-xs mt-6" style={{ color: "var(--text-faint)" }}>
          Don't see your tool?{" "}
          <Link href="/contact" style={{ color: "var(--accent)" }} className="hover:underline">
            Request an integration →
          </Link>
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SECTION 10 — FINAL CTA
// ═══════════════════════════════════════════════════════════════
function CtaSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "var(--bg-base)" }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(26,107,255,0.10) 0%, rgba(0,201,125,0.06) 60%, transparent 100%)" }} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <SectionLabel color="blue">Get Started Today</SectionLabel>

        <h2 className="mt-6 mb-5" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 5.5vw, 64px)", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
          Keep your athletes<br />on the field <GradientHeading size="lg">longer.</GradientHeading>
        </h2>

        <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
          Join 28+ clubs already using Athech in beta. Early access members lock in
          their pricing tier permanently and get a dedicated onboarding session.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Link href="/demo"
            className="group relative inline-flex items-center gap-2.5 text-sm font-bold px-10 py-4 rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.03]"
            style={{ background: "var(--gradient-brand)", color: "#fff", boxShadow: "0 10px 40px rgba(26,107,255,0.40)" }}
          >
            <span className="shimmer-btn absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }} />
            <span className="relative">Get Early Access — It's Free</span>
          </Link>
          <Link href="/contact"
            className="text-sm font-semibold transition-colors hover:opacity-70"
            style={{ color: "var(--text-muted)" }}>
            Talk to the team →
          </Link>
        </div>

        <p className="text-xs" style={{ color: "var(--text-faint)" }}>
          No credit card required · 14-day free trial · Cancel any time
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PAGE EXPORT
// ═══════════════════════════════════════════════════════════════
export default function AthechPage() {
  return (
    <main style={{ background: "var(--bg-base)" }}>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ImpactSection />
      <ForWhoSection />
      <PricingSection />
      <TestimonialsSection />
      <IntegrationsSection />
      <CtaSection />
    </main>
  );
}