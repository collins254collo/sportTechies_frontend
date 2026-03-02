"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TEAM = [
  {
    id: "ceo",
    role: "Chief Executive Officer",
    roleShort: "CEO",
    name: "Leonard Bett",
    bio: "A builder before a leader. Started writing code at 16, launched his first product at 22, and has spent the years since obsessed with one question: why does so much African tech fail to reach the people who need it most? The answer, he believes, is execution — and that's what he built this studio around.",
    focus: "Vision, Partnerships & Client Strategy",
    photo: "/ceo.jpeg",
    initials: "CE",
    gradient: "linear-gradient(135deg, #1a6bff 0%, #0044cc 100%)",
    linkedIn: "#",
    twitter: "#",
  },
  {
    id: "cto",
    role: "Chief Technology Officer",
    roleShort: "CTO",
    name: "Emmanuel Ambundo",
    bio: "The person in the room who's seen every technology trend come and go — and knows which ones actually matter. Has architected systems serving millions of users across three continents. Deeply allergic to over-engineering, deeply committed to code that lasts. If it's in production, it went through him.",
    focus: "Engineering, Architecture & AI Systems",
    photo: "/cto.jpeg",
    initials: "CT",
    gradient: "linear-gradient(135deg, #00c97d 0%, #007a4d 100%)",
    linkedIn: "#",
    twitter: "#",
  },
  {
    id: "cpo",
    role: "Chief Product Officer",
    roleShort: "CPO",
    name: "Collins Njogu",
    bio: "Starts every product conversation with the same question: what does this person actually need? Has run user research sessions in Iten, Nairobi, Lagos, and Amsterdam. Believes that great design isn't about aesthetics — it's about removing every obstacle between a user and what they're trying to accomplish.",
    focus: "Product Strategy, Design & User Experience",
    photo: "/profile.jpeg",
    initials: "CP",
    gradient: "linear-gradient(135deg, #6b1aff 0%, #3d00cc 100%)",
    linkedIn: "#",
    twitter: "#",
  },
];

const TIMELINE = [
  {
    year: "2025",
    quarter: "Nov",
    title: "A Hackathon. A Spark. A Team.",
    body: "It started at a hackathon. Three people who barely knew each other — a developer, a designer, and a product thinker — ended up at the same table with the same obsession: why do athletes in Iten, one of the greatest sporting environments on earth, still manage their training with WhatsApp messages and paper notebooks? They spent 48 hours building the first prototype of what would become Athech. They didn't win the hackathon. But they found something better — each other.",
    color: "blue",
    icon: "⚡",
    tag: "Origin Story",
    highlight: true,
  },
  {
    year: "2025",
    quarter: "Dec",
    title: "Athech: From Hackathon Prototype to Real Product",
    body: "The three founders couldn't stop thinking about what they'd started. Within weeks of the hackathon, they were meeting every evening after their day jobs, iterating on the Athech concept. The question driving everything: could software genuinely predict injuries before they happen? Early conversations with coaches and sports scientists in Iten said yes — if the data was right. They kept building.",
    color: "green",
    icon: "🏃",
    tag: "Athech Genesis",
  },
  {
    year: "2026",
    quarter: "Jan",
    title: "First Real Client: Maggy's Kienyeji",
    body: "Maggy’s Kienyeji, a growing business in Eldoret specializing in  indigenous vegetables like Sukuma Wiki, Managu, and Terere, was managing inventory, sales, and supplier orders manually using notebooks. This led to untracked stock, occasional produce spoilage, and inaccurate sales records. To solve this, the team built a custom store and inventory management system with real-time stock tracking, supplier management, daily sales reporting, and low-stock alerts. The system improved inventory visibility, reduced wastage, and gave the business clear insight into its operations, becoming the studio’s first paying client project and first successfully shipped product. ",
    color: "blue",
    icon: "🐔",
    tag: "First Client",
    client: "Maggy's Kienyeji",
  },
  {
    year: "2026",
    quarter: "Feb",
    title: "Kechei Camp: Inventory for the Altitude Training World",
    body: "Kechei Camp — a training facility hosting elite and amateur runners from around the world — had the same structural problem as Maggy's, but in a hospitality context. Equipment inventory, kitchen stock, room supplies, and athlete gear were all tracked by memory and spreadsheet. Things disappeared. Things ran out at the worst time. The team adapted and extended the inventory system they'd built for Maggy's, adding multi-category stock management, usage tracking per guest cohort, and automated reorder prompts. Two real products. Two real businesses. Zero outside funding.",
    color: "green",
    icon: "🏕️",
    tag: "Second Client",
    client: "Kechei Camp",
  },
  {
    year: "2026",
    quarter: "Mar",
    title: "The Studio Takes Shape",
    body: "With two live products, two happy clients, and Athech in active development, the founders formalised the studio. What had started as a hackathon conversation was now a registered business with a clear identity: a software studio rooted in Iten, building practical, problem-first products for businesses and athletes. The name, the brand, and the website went live. The mission statement wrote itself.",
    color: "blue",
    icon: "🏢",
    tag: "Official Launch",
  },
  {
    year: "2026",
    quarter: "Now",
    title: "Building. Shipping. Growing.",
    body: "Athech is in active beta with athletes and coaches in Iten. The inventory platform built for Maggy's and Kechei is being productised for wider release. New client conversations are underway. The studio is small, focused, and deliberate — not chasing scale for scale's sake, but committed to doing excellent work on problems that genuinely matter. This is chapter one.",
    color: "green",
    icon: "⭐",
    tag: "Today",
    isCurrent: true,
  },
];

const VALUES = [
  {
    icon: "🎯",
    title: "Outcomes over Output",
    body: "We're not hired to write code. We're hired to solve problems. The measure of our work is what changes in your business — not how many lines were committed.",
    color: "blue",
  },
  {
    icon: "🔬",
    title: "Evidence Before Opinion",
    body: "We recommend technologies we've used in production, approaches we've tested under real load, and designs we've watched real users navigate. No hype, no cargo-culting.",
    color: "green",
  },
  {
    icon: "🤝",
    title: "Radical Transparency",
    body: "If something is off track, you'll hear it from us first — not discover it when the deadline passes. Hard conversations early are always better than hard surprises late.",
    color: "blue",
  },
  {
    icon: "🌍",
    title: "African by Default",
    body: "We build for low-bandwidth networks, M-Pesa payment rails, and users who switch between five languages in a single day. African context isn't an afterthought here — it's the starting point.",
    color: "green",
  },
  {
    icon: "🏗️",
    title: "Built to Last",
    body: "We write code the next engineer will thank us for. We design systems that survive the founder's departure. We build documentation so thorough that you never need us to understand your own product.",
    color: "blue",
  },
  {
    icon: "⚡",
    title: "Ship Fast, Learn Faster",
    body: "Perfect is the enemy of in-market. We believe in getting real things in front of real users quickly, then using what we learn to make them genuinely great.",
    color: "green",
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

// ─── Team card ────────────────────────────────────────────────────────────────
function TeamCard({ member }: { member: typeof TEAM[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col rounded-2xl border overflow-hidden transition-all duration-300"
      style={{
        background: "var(--bg-surface)",
        borderColor: hovered ? "rgba(26,107,255,0.35)" : "var(--border-subtle)",
        boxShadow: hovered ? "0 24px 64px rgba(0,0,0,0.35)" : "0 4px 20px rgba(0,0,0,0.12)",
        transform: hovered ? "translateY(-6px)" : "none",
      }}
    >
      {/* Photo area */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4/3", background: "var(--bg-elevated)" }}
      >
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Placeholder — replace photo: null with photo: "/team/ceo.jpg" in TEAM data */
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            style={{ background: "var(--bg-elevated)" }}
          >
            {/* Avatar circle */}
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center font-black text-2xl text-white"
              style={{ background: member.gradient, fontFamily: "'Syne', sans-serif" }}
            >
              {member.initials}
            </div>
            {/* Photo placeholder indicator */}
            <div
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg border text-[10px] font-bold tracking-widest uppercase"
              style={{
                background: "rgba(26,107,255,0.07)",
                borderColor: "rgba(26,107,255,0.20)",
                color: "var(--text-faint)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="2" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="4" cy="5" r="1" fill="currentColor"/>
                <path d="M1 9l2.5-2.5 2 2 2.5-3L11 9" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
              </svg>
              Add photo
            </div>
          </div>
        )}

        {/* Role badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase"
          style={{
            background: member.roleShort === "CEO"
              ? "rgba(26,107,255,0.85)"
              : member.roleShort === "CTO"
              ? "rgba(0,201,125,0.85)"
              : "rgba(107,26,255,0.85)",
            color: "#fff",
            fontFamily: "'DM Mono', monospace",
            backdropFilter: "blur(8px)",
          }}
        >
          {member.roleShort}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <div>
          <h3
            className="text-xl font-black mb-0.5"
            style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}
          >
            {member.name}
          </h3>
          <p className="text-xs font-semibold" style={{ color: "var(--text-faint)" }}>
            {member.role}
          </p>
        </div>

        <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
          {member.bio}
        </p>

        {/* Focus area */}
        <div
          className="flex items-start gap-2.5 rounded-lg px-3.5 py-3 border"
          style={{
            background: member.roleShort === "CEO"
              ? "rgba(26,107,255,0.06)"
              : member.roleShort === "CTO"
              ? "rgba(0,201,125,0.06)"
              : "rgba(107,26,255,0.06)",
            borderColor: member.roleShort === "CEO"
              ? "rgba(26,107,255,0.18)"
              : member.roleShort === "CTO"
              ? "rgba(0,201,125,0.18)"
              : "rgba(107,26,255,0.18)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0 mt-0.5">
            <circle cx="6" cy="6" r="5" stroke={
              member.roleShort === "CEO" ? "var(--accent)"
              : member.roleShort === "CTO" ? "var(--accent-green)"
              : "#6b1aff"
            } strokeWidth="1.3"/>
            <path d="M6 3.5V6.5" stroke={
              member.roleShort === "CEO" ? "var(--accent)"
              : member.roleShort === "CTO" ? "var(--accent-green)"
              : "#6b1aff"
            } strokeWidth="1.3" strokeLinecap="round"/>
            <circle cx="6" cy="8.5" r="0.6" fill={
              member.roleShort === "CEO" ? "var(--accent)"
              : member.roleShort === "CTO" ? "var(--accent-green)"
              : "#6b1aff"
            }/>
          </svg>
          <p className="text-[11px] font-semibold" style={{ color: "var(--text-muted)" }}>
            <span className="font-bold" style={{ color: "var(--text-secondary)" }}>Owns: </span>
            {member.focus}
          </p>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3 pt-1">
          <a
            href={member.linkedIn}
            className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
            style={{ color: "var(--text-faint)" }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="1" y="1" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M4.5 5.5v4M4.5 3.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M7 9.5V7a1.5 1.5 0 0 1 3 0v2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            LinkedIn
          </a>
          <a
            href={member.twitter}
            className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
            style={{ color: "var(--text-faint)" }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1.5 2h3l2 3.5L9 2h2.5l-4 5 4.5 4H9l-2.5-3.5L3.5 11H1l4-4.5L1.5 2Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
            </svg>
            X / Twitter
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Timeline item (desktop alternating) ──────────────────────────────────────
function TimelineItem({
  item,
  index,
}: {
  item: typeof TIMELINE[0];
  index: number;
}) {
  const isLeft = index % 2 === 0;

  // Strong, visible color definitions
  const isBlue = item.color === "blue";
  const accentColor = isBlue ? "#4d8eff" : "#00e68a";
  const accentBg = isBlue ? "rgba(77,142,255,0.15)" : "rgba(0,230,138,0.13)";
  const accentBorder = isBlue ? "rgba(77,142,255,0.45)" : "rgba(0,230,138,0.45)";
  const tagBg = isBlue ? "rgba(77,142,255,0.20)" : "rgba(0,230,138,0.18)";

  const Card = () => (
    <div
      className="rounded-2xl border p-5 sm:p-7 w-full transition-all duration-300 hover:scale-[1.02] cursor-default"
      style={{
        background: item.highlight
          ? isBlue ? "rgba(77,142,255,0.12)" : "rgba(0,230,138,0.10)"
          : "rgba(255,255,255,0.04)",
        borderColor: item.isCurrent ? accentColor : accentBorder,
        boxShadow: item.isCurrent
          ? `0 0 0 1px ${accentColor}40, 0 16px 48px rgba(0,0,0,0.40)`
          : item.highlight
          ? "0 12px 40px rgba(0,0,0,0.30)"
          : "0 4px 20px rgba(0,0,0,0.20)",
      }}
    >
      {/* Tag + year */}
      <div className={`flex items-center gap-2 mb-4 ${!isLeft ? "" : "md:flex-row-reverse"}`}>
        {item.tag && (
          <span
            className="text-[10px] font-black px-2.5 py-1 rounded-md tracking-widest uppercase"
            style={{ background: tagBg, color: accentColor, fontFamily: "'DM Mono', monospace" }}
          >
            {item.tag}
          </span>
        )}
        <span
          className="text-[11px] font-bold tracking-widest"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace" }}
        >
          {item.year} · {item.quarter}
        </span>
      </div>

      {/* Icon + title */}
      <div className={`flex items-start gap-3 mb-3 ${!isLeft ? "" : "md:flex-row-reverse"}`}>
        <span className="text-3xl flex-shrink-0">{item.icon}</span>
        <h4
          className={`text-lg sm:text-xl font-black leading-tight ${!isLeft ? "" : "md:text-right"}`}
          style={{ fontFamily: "'Syne', sans-serif", color: "#ffffff" }}
        >
          {item.title}
        </h4>
      </div>

      {/* Client badge */}
      {item.client && (
        <div
          className={`flex mb-3 ${!isLeft ? "" : "md:justify-end"}`}
        >
          <span
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg"
            style={{ background: accentBg, color: accentColor, border: `1px solid ${accentBorder}` }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="1" y="1" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M3 5h4M3 7h2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
            </svg>
            {item.client}
          </span>
        </div>
      )}

      {/* Body */}
      <p
        className={`text-sm sm:text-[15px] leading-relaxed ${!isLeft ? "" : "md:text-right"}`}
        style={{ color: "rgba(255,255,255,0.65)" }}
      >
        {item.body}
      </p>

      {/* Current pulse */}
      {item.isCurrent && (
        <div className={`flex mt-4 ${!isLeft ? "" : "md:justify-end"}`}>
          <span
            className="inline-flex items-center gap-2 text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase"
            style={{ background: accentBg, color: accentColor, border: `1px solid ${accentBorder}` }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentColor }} />
            We are here
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-0 md:gap-4 items-center">
      {/* Left slot */}
      <div className={`pb-4 md:pb-0 ${!isLeft ? "md:invisible md:pointer-events-none" : ""}`}>
        {isLeft && <Card />}
      </div>

      {/* Centre node */}
      <div className="hidden md:flex flex-col items-center justify-center self-stretch py-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl z-10 border-2 flex-shrink-0"
          style={{
            background: item.highlight || item.isCurrent
              ? isBlue ? "rgba(77,142,255,0.25)" : "rgba(0,230,138,0.22)"
              : "rgba(255,255,255,0.05)",
            borderColor: item.isCurrent || item.highlight ? accentColor : "rgba(255,255,255,0.18)",
            boxShadow: item.isCurrent
              ? `0 0 0 6px ${accentBg}, 0 0 30px ${accentColor}50`
              : item.highlight
              ? `0 0 0 3px ${accentBg}`
              : "none",
          }}
        >
          {item.icon}
        </div>
      </div>

      {/* Right slot */}
      <div className={`pb-4 md:pb-0 ${isLeft ? "md:invisible md:pointer-events-none" : ""}`}>
        {!isLeft && <Card />}
      </div>
    </div>
  );
}

// ─── Mobile timeline (stacked) ─────────────────────────────────────────────────
function MobileTimelineItem({ item, isLast }: { item: typeof TIMELINE[0]; isLast?: boolean }) {
  const isBlue = item.color === "blue";
  const accentColor = isBlue ? "#4d8eff" : "#00e68a";
  const accentBg = isBlue ? "rgba(77,142,255,0.15)" : "rgba(0,230,138,0.13)";
  const accentBorder = isBlue ? "rgba(77,142,255,0.45)" : "rgba(0,230,138,0.45)";
  const tagBg = isBlue ? "rgba(77,142,255,0.20)" : "rgba(0,230,138,0.18)";

  return (
    <div className="flex gap-4">
      {/* Dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 border-2"
          style={{
            background: item.highlight || item.isCurrent ? accentBg : "rgba(255,255,255,0.05)",
            borderColor: item.isCurrent || item.highlight ? accentColor : "rgba(255,255,255,0.18)",
            boxShadow: item.isCurrent ? `0 0 0 4px ${accentBg}, 0 0 20px ${accentColor}50` : "none",
          }}
        >
          {item.icon}
        </div>
        {!isLast && (
          <div
            className="w-0.5 flex-1 mt-2 mb-2 min-h-[32px]"
            style={{ background: isBlue ? "rgba(77,142,255,0.30)" : "rgba(0,230,138,0.28)" }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 rounded-xl border p-4 mb-5"
        style={{
          background: item.highlight || item.isCurrent ? accentBg : "rgba(255,255,255,0.04)",
          borderColor: item.isCurrent ? accentColor : accentBorder,
          boxShadow: item.isCurrent ? `0 0 0 1px ${accentColor}30` : "none",
        }}
      >
        {/* Tag + year row */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {item.tag && (
            <span
              className="text-[10px] font-black px-2.5 py-1 rounded-md tracking-widest uppercase"
              style={{ background: tagBg, color: accentColor, fontFamily: "'DM Mono', monospace" }}
            >
              {item.tag}
            </span>
          )}
          <span
            className="text-[10px] font-semibold tracking-widest"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace" }}
          >
            {item.year} · {item.quarter}
          </span>
        </div>

        <h4
          className="text-base font-black leading-tight mb-2"
          style={{ fontFamily: "'Syne', sans-serif", color: "#ffffff" }}
        >
          {item.title}
        </h4>

        {item.client && (
          <span
            className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg mb-2"
            style={{ background: accentBg, color: accentColor, border: `1px solid ${accentBorder}` }}
          >
            {item.client}
          </span>
        )}

        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
          {item.body}
        </p>

        {item.isCurrent && (
          <div className="flex mt-3">
            <span
              className="inline-flex items-center gap-2 text-[10px] font-black px-2.5 py-1 rounded-full tracking-widest uppercase"
              style={{ background: accentBg, color: accentColor, border: `1px solid ${accentBorder}` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentColor }} />
              We are here
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100svh" }}>

      {/* ══════════════════════════════════════════════════
          HERO — MANIFESTO STYLE
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
        <div className="absolute pointer-events-none"
          style={{ top: "-25%", right: "-10%", width: "50vw", height: "50vw", maxWidth: 650, maxHeight: 650, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,107,255,0.16) 0%, transparent 65%)" }} />
        {/* Green orb */}
        <div className="absolute pointer-events-none"
          style={{ bottom: "-15%", left: "-8%", width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,201,125,0.12) 0%, transparent 65%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20 sm:pb-28">
          <div className="max-w-4xl">
            <SectionLabel text="About Us" />

            {/* Oversize headline */}
            <h1
              className="font-black leading-[1.00] tracking-tight mt-7 mb-8"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(44px, 7vw, 96px)",
                color: "var(--text-primary)",
              }}
            >
              We build from
                the world's
              <br />
              running capital.
            </h1>

            <div className="max-w-2xl space-y-5">
              <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Iten, Kenya. Elevation 2,400 metres. Population: a few thousand people, and more world records per square kilometre than anywhere else on earth.
              </p>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
                We chose to build our software studio here — and it wasn't accidental. Iten taught us something the tech industry often forgets: extraordinary results come from extraordinary discipline, relentless iteration, and a deep respect for the fundamentals. We apply that philosophy to every product we ship.
              </p>
            </div>

            {/* Location chip */}
            <div className="flex flex-wrap items-center gap-4 mt-10">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border"
                style={{
                  background: "rgba(0,201,125,0.07)",
                  borderColor: "rgba(0,201,125,0.25)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.5-2-4.5-4.5-4.5Z" stroke="var(--accent-green)" strokeWidth="1.4"/>
                  <circle cx="8" cy="6" r="1.5" fill="var(--accent-green)"/>
                </svg>
                <span className="text-sm font-bold" style={{ color: "var(--accent-green)" }}>
                  Iten, Elgeyo-Marakwet County, Kenya
                </span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-green)" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
                  Born from a hackathon · Iten, 2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ITEN — LOCATION SECTION
      ══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-b" style={{ borderColor: "var(--border-default)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Left: copy */}
            <div className="space-y-6">
              <SectionLabel text="Where We Are" color="green" />
              <h2
                className="font-black leading-tight"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 52px)", color: "var(--text-primary)" }}
              >
                Iten isn't remote
                  It's our edge.
                
              </h2>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
                People come to Iten from around the world to train at altitude, to push their limits, to be around others who take what they do seriously. That energy is in the air here — literally and figuratively. We built our studio in this environment on purpose.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                We're 315km north-west of Nairobi, perched on the edge of the Kerio Valley escarpment at 2,400m above sea level. Our office has views that would distract lesser people. We use them as motivation.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Being in Iten means we build for real African conditions — intermittent connectivity, diverse device ecosystems, M-Pesa payment infrastructure, multilingual users. Our products work here, which means they work everywhere.
              </p>

              {/* Location facts */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { label: "Elevation", val: "2,400m", icon: "🏔️" },
                  { label: "County", val: "Elgeyo-Marakwet", icon: "📍" },
                  { label: "From Nairobi", val: "315 km", icon: "🛣️" },
                  { label: "World records", val: "More than anywhere", icon: "🏆" },
                ].map(({ label, val, icon }) => (
                  <div
                    key={label}
                    className="rounded-xl border p-4 flex items-start gap-3"
                    style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
                  >
                    <span className="text-xl">{icon}</span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>{label}</p>
                      <p className="text-sm font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Map embed + photo frame */}
           <div className="relative space-y-4">

  {/* Map */}
          <div
            className="rounded-2xl overflow-hidden border"
            style={{
              borderColor: "var(--border-subtle)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
              height: 320,
            }}
          >
            <iframe
              title="Iten, Kenya"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15956.07177264628!2d35.50196!3d0.66736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178102f2d6b82825%3A0x41b12af09a5f3d0!2sIten%2C%20Kenya!5e0!3m2!1sen!2ske!4v1697000000000!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.7)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Office photo */}
          <div
            className="rounded-2xl border overflow-hidden relative"
            style={{
              borderColor: "var(--border-subtle)",
              height: 420,
            }}
          >
            <Image
              src="/office.jpeg"
              alt="Our Iten office"
              fill
              className="object-cover"
            />
          </div>

          {/* Floating coordinate chip */}
          <div
            className="absolute -top-4 -right-4 sm:-right-8 px-4 py-2.5 rounded-xl border flex items-center gap-2.5"
            style={{
              background: "var(--bg-surface)",
              borderColor: "rgba(0,201,125,0.35)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.30)",
            }}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,201,125,0.12)" }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1.5C4.3 1.5 2.5 3.3 2.5 5.5c0 3 4 6.5 4 6.5s4-3.5 4-6.5c0-2.2-1.8-4-4-4Z" stroke="var(--accent-green)" strokeWidth="1.3"/>
                <circle cx="6.5" cy="5.5" r="1.3" fill="var(--accent-green)"/>
              </svg>
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-widest uppercase" style={{ color: "var(--accent-green)", fontFamily: "'DM Mono', monospace" }}>Coordinates</p>
              <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>0.6674° N, 35.5020° E</p>
            </div>
          </div>

</div>
        </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MISSION STATEMENT — FULL WIDTH PULL QUOTE
      ══════════════════════════════════════════════════ */}
      <section
        className="py-20 sm:py-24 border-b"
        style={{
          borderColor: "var(--border-default)",
          background: "var(--bg-surface)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="text-[11px] font-bold tracking-[0.25em] uppercase mb-8"
            style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}
          >
            Our Mission
          </p>
          <blockquote
            className="font-black leading-tight tracking-tight"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(26px, 4.5vw, 58px)",
              color: "var(--text-primary)",
            }}
          >
            "To prove that the most{" "}
           
              ambitious, world-class software
            {" "}
            can be designed, built, and shipped{" "}
            from Africa— for the world."
          </blockquote>
          <p className="mt-8 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            We didn't start with funding or a big team. We started with a hackathon, a real problem, and the belief that geography shouldn't limit the quality of what you can build. Iten, Kenya is our proof of concept.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TEAM
      ══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel text="The Leadership" />
            <h2
              className="font-black leading-tight mt-5 mb-4"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3.5vw, 48px)", color: "var(--text-primary)" }}
            >
              Three people{" "}
                One mission.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              The founding trio of our studio — each obsessively focused on their domain,
              each deeply invested in yours.{" "}
              <code
                className="px-1.5 py-0.5 rounded text-xs"
                style={{ background: "var(--bg-elevated)", color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}
              >
              </code>{" "}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

          {/* Team ethos strip */}
          <div
            className="mt-10 rounded-2xl border p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-10"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
          >
            <div className="flex -space-x-3 flex-shrink-0">
              {[
                { bg: "var(--gradient-brand)", init: "CE" },
                { bg: "linear-gradient(135deg, #00c97d, #007a4d)", init: "CT" },
                { bg: "linear-gradient(135deg, #6b1aff, #3d00cc)", init: "CP" },
              ].map(({ bg, init }, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-xs text-white"
                  style={{ background: bg, borderColor: "var(--bg-surface)", fontFamily: "'Syne', sans-serif", zIndex: 3 - i }}
                >
                  {init}
                </div>
              ))}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
                <span className="font-black" style={{ color: "var(--text-primary)" }}>A small, focused team</span>{" "}
                — developers, designers, and product thinkers who met at a hackathon and couldn't stop building. We're early-stage, deliberate, and completely committed to doing excellent work on problems that genuinely matter.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03]"
              style={{ background: "var(--bg-elevated)", borderColor: "var(--border-default)", color: "var(--text-muted)", border: "1px solid var(--border-default)" }}
            >
              Work with us
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3.5L9.5 6 7 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          JOURNEY TIMELINE
      ══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-t" style={{ borderColor: "var(--border-default)", background: "rgba(0,0,0,0.35)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel text="Our Journey" color="green" />
            <h2
              className="font-black leading-tight mt-5 mb-4"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3.5vw, 48px)", color: "var(--text-primary)" }}
            >
              One year.{" "}
                Real products. Real clients.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              We didn't start in a boardroom with a deck and a vision statement. We started at a hackathon table
              with a problem we couldn't stop thinking about — and built from there.
            </p>
          </div>

          {/* Desktop: alternating timeline */}
          <div className="hidden md:flex flex-col gap-6 relative">
            {/* Centre vertical line */}
            <div
              className="absolute left-1/2 top-8 bottom-8 w-0.5 -translate-x-1/2 pointer-events-none rounded-full"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(77,142,255,0.35) 8%, rgba(0,230,138,0.30) 92%, transparent)" }}
            />
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.year + item.quarter} item={item} index={i} />
            ))}
          </div>

          {/* Mobile: stacked */}
          <div className="md:hidden flex flex-col">
            {TIMELINE.map((item, i) => (
              <MobileTimelineItem key={item.year + item.quarter} item={item} isLast={i === TIMELINE.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          VALUES
      ══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-t" style={{ borderColor: "var(--border-default)", background: "var(--bg-surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel text="What We Believe" />
            <h2
              className="font-black leading-tight mt-5 mb-4"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 3.5vw, 48px)", color: "var(--text-primary)" }}
            >
              The principles that
                run every project.
            </h2>
            <p className="text-base" style={{ color: "var(--text-muted)" }}>
              These aren't wall decorations. They're why we turn down briefs that aren't right, challenge assumptions in kick-off calls, and keep shipping when it would be easier to stop.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map(({ icon, title, body, color }, i) => (
              <div
                key={title}
                className="rounded-2xl border p-6 flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-200"
                style={{ background: "var(--bg-base)", borderColor: "var(--border-subtle)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{icon}</span>
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{
                      color: color === "blue" ? "var(--accent)" : "var(--accent-green)",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <h3
                  className="text-lg font-black"
                  style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 border-t overflow-hidden" style={{ borderColor: "var(--border-default)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(26,107,255,0.12) 0%, rgba(0,201,125,0.07) 50%, transparent 100%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(26,107,255,0.15) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--accent-green)", fontFamily: "'DM Mono', monospace" }}>
            Come build with us
          </span>
          <h2
            className="font-black leading-tight mt-4 mb-5"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(30px, 5vw, 64px)", color: "var(--text-primary)" }}
          >
            We'd love to hear
              your story.
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Every great product we've built started with a conversation. Let's have one — about your company, your problem, and what's possible.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="relative inline-flex items-center gap-2.5 text-sm font-bold px-9 py-4 rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl"
              style={{ background: "var(--gradient-brand)", color: "#fff", boxShadow: "0 10px 32px rgba(26,107,255,0.40)" }}
            >
              <span className="shimmer-btn absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="relative">
                <rect x="1" y="2.5" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M1 5.5l6.5 4.5L14 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="relative">Start a Conversation</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: "var(--text-muted)" }}
            >
              Explore our services 
            </Link>
          </div>

          {/* Studio facts */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-12 border-t" style={{ borderColor: "var(--border-default)" }}>
            {[
              { emoji: "📍", text: "Iten, Kenya" },
              { emoji: "🌐", text: "Clients in 8+ countries" },
              { emoji: "📧", text: "hello@sporttechies.com" },
              { emoji: "📞", text: "+254 795 198 141" },
            ].map(({ emoji, text }) => (
              <span key={text} className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-faint)" }}>
                <span>{emoji}</span>
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}