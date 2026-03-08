"use client";

import Link from "next/link";
import Image from "next/image";

interface FooterLink  { label: string; href: string; }
interface FooterColumn { heading: string; links: FooterLink[]; }

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Arena Platform",       href: "/product/arena" },
      { label: "Athlete Dashboard",    href: "/product/athlete" },
      { label: "Fan Engagement Suite", href: "/product/fans" },
      { label: "Pricing",              href: "/pricing" },
      { label: "Changelog",            href: "/changelog" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Custom Development", href: "/services/development" },
      { label: "API Integrations",   href: "/services/api" },
      { label: "Data Consulting",    href: "/services/consulting" },
      { label: "Enterprise",         href: "/services/enterprise" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Clubs & Leagues",    href: "/solutions/clubs" },
      { label: "Broadcasters",       href: "/solutions/broadcast" },
      { label: "Betting Operators",  href: "/solutions/betting" },
      { label: "Case Studies",       href: "/case-studies" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",    href: "/about" },
      { label: "Careers",  href: "/careers" },
      { label: "Blog",     href: "/blog" },
      { label: "Press Kit", href: "/press" },
      { label: "Contact",  href: "/contact" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "X / Twitter",
    href: "https://twitter.com/sportTechies",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M12.6 1.5h2.3L10 7.1 15.5 14.5H11l-3.5-4.6-4 4.6H1.2l5.3-6-5-7h4.7l3.2 4.2 3.2-4.2Zm-.8 11.7h1.3L4.3 2.8H2.9l9 10.4Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/sporttechies",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M13.6 1H2.4A1.4 1.4 0 0 0 1 2.4v11.2A1.4 1.4 0 0 0 2.4 15h11.2A1.4 1.4 0 0 0 15 13.6V2.4A1.4 1.4 0 0 0 13.6 1ZM5.3 12.5H3.3V6.4h2v6.1Zm-1-6.9a1.15 1.15 0 1 1 0-2.3 1.15 1.15 0 0 1 0 2.3Zm8.4 6.9h-2v-3c0-.75-.02-1.71-1.04-1.71-1.04 0-1.2.82-1.2 1.66v3.05H6.5V6.4h1.9v.83h.03a2.1 2.1 0 0 1 1.88-1.04c2.01 0 2.38 1.33 2.38 3.05v3.26Z" fill="currentColor" />
      </svg>
    ),
  },
  {
  label: "Facebook",
      href: "https://facebook.com/sporttechies",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
        </svg>
      )
  },
  {
    label: "YouTube",
    href: "https://youtube.com/sporttechies",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M14.5 4.5a1.77 1.77 0 0 0-1.24-1.25C12.1 3 8 3 8 3s-4.1 0-5.26.25A1.77 1.77 0 0 0 1.5 4.5 18.5 18.5 0 0 0 1.25 8c-.01 1.17.07 2.34.25 3.5a1.77 1.77 0 0 0 1.24 1.25C3.9 13 8 13 8 13s4.1 0 5.26-.25a1.77 1.77 0 0 0 1.24-1.25c.18-1.16.27-2.33.25-3.5a18.5 18.5 0 0 0-.25-3.5ZM6.5 10.25v-4.5L10.25 8 6.5 10.25Z" fill="currentColor" />
      </svg>
    ),
  },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy",   href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy",    href: "/cookies" },
  { label: "Security",         href: "/security" },
];

function Logo() {
  return (
     <Link href="/" className="flex items-center gap-2" aria-label="SportTechies home">
      <Image
        src="/sporttechies.png"
        alt="SportTechies logo"
        width={140}
        height={100}
        quality={95}
        priority={true}
        className="rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300"
      />
      
    </Link>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{value}</span>
      <span className="text-[10px] tracking-wider uppercase" style={{ color: "#6b7280", fontFamily: "'DM Mono', monospace" }}>{label}</span>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "var(--footer-bg)", borderTop: "1px solid var(--footer-border)" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(ellipse, #00e5ff 0%, transparent 70%)" }}
      />

      {/* ── CTA Banner ── */}
      <div className="relative" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <p
                className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-2"
                style={{ color: "#00e5ff", fontFamily: "'DM Mono', monospace" }}
              >
                Ready to get started?
              </p>
              <h2
                className="text-2xl sm:text-3xl font-black text-white leading-tight"
                style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}
              >
                See SportTechies in action.
                <br />
                <span style={{ color: "#00e5ff" }}>Book a live demo.</span>
              </h2>
            </div>
            <div className="flex flex-col items-center lg:items-end gap-6">
              {/* Stats */}
              <div
                className="flex items-center gap-8 px-6 py-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <StatPill value="120+" label="Clubs live" />
                <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.1)" }} />
                <StatPill value="2.4B"  label="Events processed" />
                <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.1)" }} />
                <StatPill value="99.9%" label="Uptime SLA" />
              </div>
              {/* Buttons */}
              <div className="flex items-center gap-3">
                <Link
                  href="/demo"
                  className="relative group inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all duration-200 overflow-hidden"
                  style={{ background: "#00e5ff", color: "#08080f" }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative">
                    <rect x="1" y="2" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                    <circle cx="7" cy="6.5" r="1.8" fill="currentColor" />
                  </svg>
                  <span className="relative">Book a Demo</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#9ca3af" }}
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Logo />
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#6b7280" }}>
                Building smart software for sports — from data analytics and performance tracking to fan engagement and operational tools for athletes and teams.
              </p>
            </div>
            {/* Contact */}
            <div className="flex flex-col gap-2.5">
              {[
                {
                  href: "mailto:hello@sportstechies.com",
                  text: "hello@sportstechies.com",
                  icon: (
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <rect x="1" y="2.5" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M1 4.5l5.5 3.5 5.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  href: "tel:+254795198141",
                  text: "+254 795198141",
                  icon: (
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 2.5a1 1 0 0 1 1-1h1.5l1 2.5-.75.75a7 7 0 0 0 3 3l.75-.75 2.5 1V9.5a1 1 0 0 1-1 1A9 9 0 0 1 2 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    </svg>
                  ),
                },
              ].map(({ href, text, icon }) => (
                <a
                  key={href}
                  href={href}
                  className="group inline-flex items-center gap-2.5 text-sm transition-colors"
                  style={{ color: "#6b7280" }}
                >
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    {icon}
                  </span>
                  {text}
                </a>
              ))}
            </div>
            {/* Socials */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#6b7280" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h3
                className="text-[11px] font-semibold text-(var(--text-primary)) tracking-[0.15em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm leading-relaxed transition-colors duration-150"
                      style={{ color: "#6b7280" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs order-2 sm:order-1" style={{ color: "#4b5563" }}>
              © {year} SportTechies Innovations Limited. All rights reserved.
            </p>
            <nav className="flex items-center gap-1 flex-wrap justify-center order-1 sm:order-2">
              {LEGAL_LINKS.map((link, i) => (
                <span key={link.href} className="flex items-center">
                  <Link
                    href={link.href}
                    className="text-xs px-2 py-1 transition-colors"
                    style={{ color: "#4b5563" }}
                  >
                    {link.label}
                  </Link>
                  {i < LEGAL_LINKS.length - 1 && (
                    <span className="text-xs select-none" style={{ color: "#2a2a3a" }}>·</span>
                  )}
                </span>
              ))}
            </nav>
            <div className="flex items-center gap-1.5 order-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <a href="/status" className="text-xs transition-colors" style={{ color: "#4b5563" }}>
                All systems operational
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}