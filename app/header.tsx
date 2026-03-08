"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string }[];
}

// ─── Nav Data ─────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  {
    label: "Product",
    href: "/product",
    children: [
      { label: "Athech AI",            href: "/athech",  description: "AI-powered injury prediction for athletes & clubs" },
      { label: "Athlete Dashboard",    href: "/product/athlete", description: "Real-time performance tracking for teams & coaches" },
      { label: "Fan Engagement Suite", href: "/product/fans",    description: "Interactive experiences that keep fans connected" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Web Development",  href: "/services/web",    description: "Full-stack web apps built to scale" },
      { label: "Mobile Apps",      href: "/services/mobile", description: "iOS & Android apps from design to deployment" },
      { label: "UI / UX Design",   href: "/services/design", description: "Beautiful, conversion-focused interfaces" },
      { label: "AI & Automation",  href: "/services/ai",     description: "Custom AI integrations & workflow automation" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "For Startups",     href: "/solutions/startups",  description: "MVP to launch, fast and lean" },
      { label: "For Enterprises",  href: "/solutions/enterprise", description: "Scalable systems for growing businesses" },
      { label: "For Sports Clubs", href: "/solutions/sports",    description: "End-to-end tech for clubs & leagues" },
    ],
  },
  { label: "About", href: "/about" },
];

// ─── Dropdown ─────────────────────────────────────────────────────────────────
function Dropdown({ item, isOpen, onClose }: {
  item: NavItem; isOpen: boolean; onClose: () => void;
}) {
  if (!item.children) return null;
  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 transition-all duration-200 ${
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
      style={{ zIndex: 50 }}
    >
      {/* Arrow */}
      <div
        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-l border-t"
        style={{ background: "var(--dropdown-bg)", borderColor: "var(--dropdown-border)" }}
      />
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          background: "var(--dropdown-bg)",
          border: "1px solid var(--dropdown-border)",
          boxShadow: "var(--shadow-dropdown)",
        }}
      >
        <div className="p-2">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className="flex flex-col gap-0.5 px-4 py-3 rounded-lg transition-colors duration-150"
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--dropdown-item-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {child.label}
              </span>
              <span className="text-xs leading-snug" style={{ color: "var(--text-faint)" }}>
                {child.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { if (!isOpen) setExpanded(null); }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-40 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/100 backdrop-blur-sm" onClick={onClose} />

      <div
        className={`absolute top-0 right-0 h-full w-[85vw] max-w-sm flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "var(--bg-surface)", borderLeft: "1px solid var(--border-default)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid var(--border-default)" }}>
          <Logo />
          <button onClick={onClose} className="p-2 rounded-lg transition-colors"
            style={{ color: "var(--text-faint)" }} aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                    style={{ color: "#fff" }}
                  >
                    {item.label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                      className={`transition-transform duration-200 ${expanded === item.label ? "rotate-180" : ""}`}>
                      <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div className={`overflow-hidden transition-all duration-200 ${expanded === item.label ? "max-h-96 mt-1" : "max-h-0"}`}>
                    <div className="ml-3 pl-3 space-y-1 pb-2"
                      style={{ borderLeft: "1px solid var(--border-subtle)" }}>
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} onClick={onClose}
                          className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg transition-colors"
                          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--nav-hover-bg)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                            {child.label}
                          </span>
                          <span className="text-xs" style={{ color: "var(--text-faint)" }}>
                            {child.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link href={item.href} onClick={onClose}
                  className="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{ color: "var(--text-muted)" }}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom: theme + CTA */}
        <div className="px-6 py-6 space-y-4" style={{ borderTop: "1px solid var(--border-default)" }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>
              Appearance
            </span>
          </div>
          <Link
            href="/contact"
            onClick={onClose}
            className="block w-full text-center text-sm font-bold px-6 py-3.5 rounded-xl transition-colors duration-200 tracking-wide"
            style={{ background: "var(--gradient-brand)", color: "#fff" }}
          >
            Start a Project
          </Link>
        </div>
      </div>
    </div>
  );
}

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


// ─── Main Header ──────────────────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-300"
        style={
          scrolled
            ? {
                background: "var(--header-bg)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid var(--header-border)",
                boxShadow: "var(--shadow-header)",
              }
            : { background: "transparent" }
        }
      >
        {/* Brand gradient top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: "var(--gradient-brand)", opacity: 0.55 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[70px]">

            <Logo />

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={() => item.children && handleMouseLeave()}
                >
                  {item.children ? (
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                      style={{
                        color: activeDropdown === item.label ? "var(--text-primary)" : "var(--text-muted)",
                        background: activeDropdown === item.label ? "var(--nav-hover-bg)" : "transparent",
                      }}
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`}>
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.label}
                    </Link>
                  )}

                  {item.children && (
                    <Dropdown
                      item={item}
                      isOpen={activeDropdown === item.label}
                      onClose={() => setActiveDropdown(null)}
                    />
                  )}
                </div>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:block">
              </div>

              <Link
                href="/login"
                className="hidden lg:block text-sm font-medium transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                Sign in
              </Link>

              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl
                           transition-all duration-200 tracking-wide group relative overflow-hidden
                           hover:scale-[1.03]"
                style={{
                  background: "var(--gradient-brand)",
                  color: "var(--text-on-primary)",
                  boxShadow: "0 4px 18px rgba(26,107,255,0.30)",
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                             transition-transform duration-500 skew-x-12 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
                />
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative flex-shrink-0">
                  <rect x="1" y="2" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="7" cy="6.5" r="1.8" fill="currentColor" />
                </svg>
                <span className="relative">Start a Project</span>
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2.5 rounded-xl transition-colors"
                style={{ color: "var(--text-muted)" }}
                aria-label="Open navigation menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M3 5h14M3 10h14M3 15h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}