"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
type ServiceOption = {
  id: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple";
};

type FormState = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

type FieldError = Partial<Record<keyof FormState, string>>;

// ─── Service options ──────────────────────────────────────────────────────────
const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "web-mobile",
    label: "Web & Mobile",
    desc: "Website, app, or platform",
    color: "blue",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="2" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5 14h6M8 12v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "ai-automation",
    label: "AI & Automation",
    desc: "Intelligent systems & workflows",
    color: "green",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M8 2v2M8 12v2M2 8h2M12 8h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "design",
    label: "UI / UX Design",
    desc: "Product design & research",
    color: "purple",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "saas",
    label: "SaaS Product",
    desc: "End-to-end product build",
    color: "blue",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5 8h2v4H5zM9 5h2v7H9z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    desc: "Infrastructure & deployment",
    color: "green",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 10a3.5 3.5 0 0 1-.3-7A5 5 0 0 1 13 5.5a2.5 2.5 0 0 1-.5 5H4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "consulting",
    label: "Consulting / CTO",
    desc: "Technical advisory & leadership",
    color: "purple",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "athech",
    label: "Athech Demo",
    desc: "Our AI athlete platform",
    color: "green",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.5l1.4 3.8H14l-3.3 2.4 1.3 3.9L8 9.2l-4 2.4 1.3-3.9L2 5.3h4.6L8 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "other",
    label: "Something else",
    desc: "Tell us what you need",
    color: "blue",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M6.5 6.5C6.5 5.7 7.2 5 8 5s1.5.7 1.5 1.5c0 .7-.4 1.2-1 1.4V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="8" cy="11" r="0.7" fill="currentColor"/>
      </svg>
    ),
  },
];

const BUDGET_OPTIONS = [
  { id: "under-500k", label: "Under KSh 500K" },
  { id: "500k-2m", label: "KSh 500K – 2M" },
  { id: "2m-5m", label: "KSh 2M – 5M" },
  { id: "5m-plus", label: "KSh 5M+" },
  { id: "discuss", label: "Let's discuss" },
];

// ─── Color helpers ────────────────────────────────────────────────────────────
const colorMap = {
  blue:   { text: "#4d8eff", bg: "rgba(77,142,255,0.14)", border: "rgba(77,142,255,0.40)" },
  green:  { text: "#00e68a", bg: "rgba(0,230,138,0.13)",  border: "rgba(0,230,138,0.40)" },
  purple: { text: "#a78bff", bg: "rgba(167,139,255,0.14)", border: "rgba(167,139,255,0.40)" },
};

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(form: FormState): FieldError {
  const errors: FieldError = {};
  if (!form.name.trim())                       errors.name    = "We'd love to know your name.";
  if (!form.email.trim())                      errors.email   = "Drop your email so we can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                               errors.email   = "That doesn't look like a valid email.";
  if (!form.service)                           errors.service = "Pick the closest match — we'll sort the details.";
  if (!form.message.trim())                    errors.message = "Tell us a bit about what you're working on.";
  else if (form.message.trim().length < 20)    errors.message = "A little more detail would help us prepare.";
  return errors;
}

// ─── Input component ──────────────────────────────────────────────────────────
function Field({
  label, id, error, hint, children,
}: {
  label: string; id: string; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: error ? "#ff6b6b" : "rgba(255,255,255,0.55)", fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs flex items-center gap-1.5 mt-0.5" style={{ color: "#ff8080" }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M5 3v2.5M5 7.5v.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>{hint}</p>
      )}
    </div>
  );
}

const inputBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 10,
  color: "#ffffff",
  fontFamily: "inherit",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
  width: "100%",
};

const inputFocusStyle = {
  borderColor: "rgba(77,142,255,0.60)",
  background: "rgba(77,142,255,0.06)",
  boxShadow: "0 0 0 3px rgba(77,142,255,0.12)",
};

function TextInput({
  id, value, onChange, placeholder, error, type = "text",
}: {
  id: string; value: string; onChange: (v: string) => void;
  placeholder?: string; error?: string; type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        padding: "12px 16px",
        borderColor: error ? "rgba(255,107,107,0.55)" : focused ? "rgba(77,142,255,0.60)" : "rgba(255,255,255,0.12)",
        background: error ? "rgba(255,107,107,0.05)" : focused ? "rgba(77,142,255,0.06)" : "rgba(255,255,255,0.05)",
        boxShadow: focused ? (error ? "0 0 0 3px rgba(255,107,107,0.12)" : "0 0 0 3px rgba(77,142,255,0.12)") : "none",
      }}
      className="placeholder:opacity-30"
    />
  );
}

function TextArea({
  id, value, onChange, placeholder, error, rows = 5,
}: {
  id: string; value: string; onChange: (v: string) => void;
  placeholder?: string; error?: string; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        padding: "14px 16px",
        resize: "vertical",
        borderColor: error ? "rgba(255,107,107,0.55)" : focused ? "rgba(77,142,255,0.60)" : "rgba(255,255,255,0.12)",
        background: error ? "rgba(255,107,107,0.05)" : focused ? "rgba(77,142,255,0.06)" : "rgba(255,255,255,0.05)",
        boxShadow: focused ? (error ? "0 0 0 3px rgba(255,107,107,0.12)" : "0 0 0 3px rgba(77,142,255,0.12)") : "none",
      }}
      className="placeholder:opacity-30"
    />
  );
}

// ─── Service selector ─────────────────────────────────────────────────────────
function ServiceSelector({
  value, onChange, error,
}: {
  value: string; onChange: (v: string) => void; error?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      {SERVICE_OPTIONS.map((opt) => {
        const selected = value === opt.id;
        const c = colorMap[opt.color];
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(selected ? "" : opt.id)}
            className="flex flex-col gap-2 p-3.5 rounded-xl border text-left transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: selected ? c.bg : "rgba(255,255,255,0.04)",
              borderColor: selected ? c.border : error ? "rgba(255,107,107,0.35)" : "rgba(255,255,255,0.10)",
              boxShadow: selected ? `0 0 0 1px ${c.border}, 0 8px 24px rgba(0,0,0,0.25)` : "none",
            }}
          >
            <span style={{ color: selected ? c.text : "rgba(255,255,255,0.40)" }}>
              {opt.icon}
            </span>
            <span
              className="text-xs font-bold leading-tight"
              style={{ color: selected ? "#ffffff" : "rgba(255,255,255,0.55)", fontFamily: "'Syne', sans-serif" }}
            >
              {opt.label}
            </span>
            <span
              className="text-[10px] leading-tight"
              style={{ color: selected ? "rgba(255,255,255,0.60)" : "rgba(255,255,255,0.28)" }}
            >
              {opt.desc}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Budget selector ──────────────────────────────────────────────────────────
function BudgetSelector({
  value, onChange,
}: {
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {BUDGET_OPTIONS.map((opt) => {
        const selected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(selected ? "" : opt.id)}
            className="px-4 py-2 rounded-lg border text-sm font-semibold transition-all duration-150"
            style={{
              background: selected ? "rgba(77,142,255,0.16)" : "rgba(255,255,255,0.04)",
              borderColor: selected ? "rgba(77,142,255,0.50)" : "rgba(255,255,255,0.10)",
              color: selected ? "#4d8eff" : "rgba(255,255,255,0.50)",
              boxShadow: selected ? "0 0 0 1px rgba(77,142,255,0.30)" : "none",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────
function SuccessScreen({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 gap-7">
      {/* Animated checkmark */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(0,230,138,0.15)",
          border: "2px solid rgba(0,230,138,0.50)",
          boxShadow: "0 0 0 8px rgba(0,230,138,0.07), 0 0 40px rgba(0,230,138,0.20)",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M6 16l7 7 13-13" stroke="#00e68a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div>
        <h2
          className="text-2xl sm:text-3xl font-black mb-3"
          style={{ fontFamily: "'Syne', sans-serif", color: "#ffffff" }}
        >
          Message sent, {name.split(" ")[0]}.
        </h2>
        <p className="text-base leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.55)" }}>
          We read every message personally. You'll hear back from us within{" "}
          <span style={{ color: "#00e68a", fontWeight: 700 }}>24 hours</span> — usually much sooner.
        </p>
      </div>

      <div
        className="flex flex-wrap justify-center gap-3 text-sm"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        <span className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l2.5 2.5L10 2" stroke="#00e68a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          No commitment required
        </span>
        <span className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l2.5 2.5L10 2" stroke="#00e68a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          NDAs available
        </span>
        <span className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l2.5 2.5L10 2" stroke="#00e68a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Honest advice, always
        </span>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03]"
          style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.70)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          Explore our services 
        </Link>
        <Link
          href="/athech"
          className="inline-flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl transition-all duration-200 hover:scale-[1.03]"
          style={{ background: "rgba(0,230,138,0.12)", color: "#00e68a", border: "1px solid rgba(0,230,138,0.35)" }}
        >
          Check out Athech 
        </Link>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", company: "", service: "", budget: "", message: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof FormState) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      formRef.current?.querySelector("[data-error]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    // Simulate API call — replace with your actual form submission logic
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div
      style={{
        background: "var(--bg-base)",
        minHeight: "100svh",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* ── Global background atmosphere ── */}
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(77,142,255,0.14) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          opacity: 0.6,
        }}
      />
      {/* Blue orb — top left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%", left: "-12%",
          width: "55vw", height: "55vw",
          maxWidth: 700, maxHeight: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(77,142,255,0.18) 0%, transparent 65%)",
        }}
      />
      {/* Green orb — bottom right */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-18%", right: "-10%",
          width: "45vw", height: "45vw",
          maxWidth: 580, maxHeight: 580,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,230,138,0.14) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">

        {/* ══════════════════════════════════════════════════
            SPLIT LAYOUT: LEFT SIDEBAR + RIGHT FORM
        ══════════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-[420px_1fr] gap-12 xl:gap-20 items-start">

          {/* ──────────────────────────────────────────────
              LEFT SIDEBAR
          ────────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-10">

            {/* Eyebrow */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-bold tracking-widest uppercase mb-6"
                style={{
                  background: "rgba(77,142,255,0.08)",
                  borderColor: "rgba(77,142,255,0.28)",
                  color: "#4d8eff",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inset-0 rounded-full opacity-60"
                    style={{ background: "#4d8eff" }}
                  />
                  <span className="relative rounded-full h-2 w-2" style={{ background: "#4d8eff" }} />
                </span>
                Let's Talk
              </div>

              <h1
                className="font-black leading-[1.02] tracking-tight mb-5"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(36px, 4.5vw, 58px)",
                  color: "#ffffff",
                }}
              >
                Start the
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #4d8eff 0%, #00e68a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  conversation.
                </span>
              </h1>

              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Tell us what you're working on. We'll tell you honestly whether and how we
                can help — no sales pressure, no jargon.
              </p>
            </div>

            {/* ── What happens next ── */}
            <div
              className="rounded-2xl border p-6 flex flex-col gap-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.09)",
              }}
            >
              <p
                className="text-[11px] font-bold tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace" }}
              >
                What happens next
              </p>
              {[
                {
                  step: "01",
                  title: "We read it",
                  body: "Every message is read by a real person on our team — not filtered through a bot.",
                  color: "#4d8eff",
                },
                {
                  step: "02",
                  title: "We reply within 24hrs",
                  body: "Usually within a few hours. We'll ask a few smart questions to understand your situation.",
                  color: "#00e68a",
                },
                {
                  step: "03",
                  title: "A 30-min discovery call",
                  body: "We'll map your problem to a solution, a timeline, and a budget. No commitment required.",
                  color: "#a78bff",
                },
              ].map(({ step, title, body, color }) => (
                <div key={step} className="flex gap-4 items-start">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                    style={{
                      background: `${color}20`,
                      border: `1px solid ${color}40`,
                      color,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {step}
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-0.5" style={{ color: "#ffffff" }}>{title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.40)" }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Direct contacts ── */}
            <div className="flex flex-col gap-3">
              <p
                className="text-[11px] font-bold tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace" }}
              >
                Or reach us directly
              </p>

              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                      <path d="M1 5.5l7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  ),
                  label: "Email",
                  value: "hello@sporttechies.com",
                  href: "mailto:hello@sporttechies.com",
                  color: "#4d8eff",
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 3.5a1 1 0 0 1 1-1h1.5a.5.5 0 0 1 .5.4l.6 2.8a.5.5 0 0 1-.2.5L5.3 7.4A9 9 0 0 0 8.6 10.7l1.2-1.1a.5.5 0 0 1 .5-.2l2.8.6a.5.5 0 0 1 .4.5V12a1 1 0 0 1-1 1C5.7 13 3 6.3 3 3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                    </svg>
                  ),
                  label: "Phone / WhatsApp",
                  value: "+254 795 198 141",
                  href: "https://wa.me/254795198141",
                  color: "#00e68a",
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.5-2-4.5-4.5-4.5Z" stroke="currentColor" strokeWidth="1.4"/>
                      <circle cx="8" cy="6" r="1.5" fill="currentColor"/>
                    </svg>
                  ),
                  label: "Location",
                  value: "Iten, Elgeyo-Marakwet, Kenya",
                  href: "https://maps.google.com/?q=Iten,Kenya",
                  color: "#a78bff",
                },
              ].map(({ icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl border transition-all duration-200 group hover:scale-[1.02]"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.09)",
                    textDecoration: "none",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}18`, color }}
                  >
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: "rgba(255,255,255,0.30)", fontFamily: "'DM Mono', monospace" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-sm font-semibold truncate group-hover:opacity-80 transition-opacity"
                      style={{ color: "#ffffff" }}
                    >
                      {value}
                    </p>
                  </div>
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    className="ml-auto flex-shrink-0 opacity-30 group-hover:opacity-70 transition-opacity"
                  >
                    <path d="M2 6h8M7 3.5L9.5 6 7 8.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </div>

            {/* ── Social links ── */}
            <div className="flex items-center gap-3">
              <p
                className="text-[10px] font-bold tracking-widest uppercase flex-shrink-0"
                style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'DM Mono', monospace" }}
              >
                Also on
              </p>
              <div className="flex gap-2">
                {[
                  { label: "LinkedIn", href: "#", icon: (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1" y="1" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M4.5 5.5v5M4.5 3.5v.5M7 10.5V7.5A1.5 1.5 0 0 1 10 7.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  )},
                  { label: "X", href: "#", icon: (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 2h3.5l2 3 2.5-3H13L9.5 7 13 12H9.5l-2-3-2.5 3H2l3.5-5L2 2Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                    </svg>
                  )},
                  { label: "GitHub", href: "#", icon: (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1.2A5.8 5.8 0 0 0 1.2 7c0 2.6 1.7 4.8 4 5.6.3 0 .4-.1.4-.3v-1c-1.7.4-2-.8-2-.8a1.6 1.6 0 0 0-.6-.9c-.5-.3.1-.3.1-.3.5.1.8.5.8.5.5.8 1.2.6 1.5.4 0-.3.2-.5.4-.7-1.3-.1-2.7-.7-2.7-2.9a2.3 2.3 0 0 1 .6-1.6 2 2 0 0 1 .1-1.6s.5-.2 1.7.6a5.7 5.7 0 0 1 3 0c1.2-.8 1.7-.6 1.7-.6a2 2 0 0 1 0 1.6 2.3 2.3 0 0 1 .6 1.6c0 2.2-1.4 2.8-2.7 2.9.2.2.4.6.4 1.1v1.7c0 .2.1.3.4.3A5.8 5.8 0 0 0 12.8 7 5.8 5.8 0 0 0 7 1.2Z" fill="currentColor"/>
                    </svg>
                  )},
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(255,255,255,0.10)",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────
              RIGHT: FORM
          ────────────────────────────────────────────── */}
          <div
            ref={formRef}
            className="rounded-2xl border overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderColor: "rgba(255,255,255,0.10)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.40), 0 0 0 1px rgba(77,142,255,0.08)",
            }}
          >
            {/* Form top bar */}
            <div
              className="h-[3px]"
              style={{ background: "linear-gradient(90deg, #4d8eff 0%, #00e68a 50%, #a78bff 100%)" }}
            />

            {submitted ? (
              <SuccessScreen name={form.name} />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="p-6 sm:p-8 flex flex-col gap-7">

                  {/* Header */}
                  <div>
                    <h2
                      className="text-xl sm:text-2xl font-black mb-1.5"
                      style={{ fontFamily: "'Syne', sans-serif", color: "#ffffff" }}
                    >
                      Tell us about your project
                    </h2>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.40)" }}>
                      Fields marked with{" "}
                      <span style={{ color: "#ff8080" }}>*</span> are required. Everything else helps us prepare.
                    </p>
                  </div>

                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div data-error={errors.name ? "true" : undefined}>
                      <Field label="Your name *" id="name" error={errors.name}>
                        <TextInput
                          id="name"
                          value={form.name}
                          onChange={set("name")}
                          placeholder="Jane Mwangi"
                          error={errors.name}
                        />
                      </Field>
                    </div>
                    <div data-error={errors.email ? "true" : undefined}>
                      <Field label="Email address *" id="email" error={errors.email}>
                        <TextInput
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={set("email")}
                          placeholder="jane@company.com"
                          error={errors.email}
                        />
                      </Field>
                    </div>
                  </div>

                  {/* Company */}
                  <Field
                    label="Company / Organisation"
                    id="company"
                    hint="Optional — helps us understand your context."
                  >
                    <TextInput
                      id="company"
                      value={form.company}
                      onChange={set("company")}
                      placeholder="Acme Ltd, freelancer, NGO…"
                    />
                  </Field>

                  {/* Service */}
                  <div data-error={errors.service ? "true" : undefined}>
                    <Field label="What can we help with? *" id="service" error={errors.service}>
                      <ServiceSelector
                        value={form.service}
                        onChange={set("service")}
                        error={errors.service}
                      />
                    </Field>
                  </div>

                  {/* Budget */}
                  <Field
                    label="Rough budget range"
                    id="budget"
                    hint="Helps us scope the right solution. No commitment implied."
                  >
                    <BudgetSelector value={form.budget} onChange={set("budget")} />
                  </Field>

                  {/* Divider */}
                  <div className="h-px" style={{ background: "rgba(255,255,255,0.07)" }} />

                  {/* Message */}
                  <div data-error={errors.message ? "true" : undefined}>
                    <Field
                      label="Tell us what you're working on *"
                      id="message"
                      error={errors.message}
                      hint="The more context you share, the more useful our first reply will be."
                    >
                      <TextArea
                        id="message"
                        value={form.message}
                        onChange={set("message")}
                        placeholder={`Example: "We run a retail shop in Iten and track everything on paper. We need a simple stock management system — ideally mobile-friendly. We have a tight budget and want to move quickly…"`}
                        error={errors.message}
                        rows={6}
                      />
                    </Field>
                  </div>

                  {/* Character count hint */}
                  {form.message.length > 0 && (
                    <p
                      className="text-[10px] -mt-5"
                      style={{ color: form.message.length < 20 ? "#ff8080" : "rgba(255,255,255,0.25)" }}
                    >
                      {form.message.length} characters {form.message.length < 20 ? `— need ${20 - form.message.length} more` : "— good"}
                    </p>
                  )}

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                    <p className="text-xs leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
                      By submitting you agree to us contacting you about your project.
                      We never share your details.
                    </p>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="relative flex-shrink-0 inline-flex items-center gap-3 text-sm font-black px-8 py-4 rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.03] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                      style={{
                        background: "linear-gradient(135deg, #4d8eff 0%, #00e68a 100%)",
                        color: "#000000",
                        boxShadow: submitting ? "none" : "0 8px 28px rgba(77,142,255,0.38)",
                        fontFamily: "'Syne', sans-serif",
                      }}
                    >
                      {/* Shimmer */}
                      {!submitting && (
                        <span
                          className="shimmer-btn absolute inset-0 pointer-events-none"
                          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
                        />
                      )}

                      {submitting ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="6" stroke="rgba(0,0,0,0.3)" strokeWidth="2"/>
                            <path d="M8 2a6 6 0 0 1 6 6" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <span className="relative">Sending…</span>
                        </>
                      ) : (
                        <>
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="relative">
                            <path d="M1 7.5h13M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="relative">Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            BOTTOM: FAQ STRIP
        ══════════════════════════════════════════════════ */}
        <div className="mt-20 sm:mt-28">
          <p
            className="text-center text-[11px] font-bold tracking-[0.22em] uppercase mb-8"
            style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'DM Mono', monospace" }}
          >
            Common questions
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                q: "How quickly can you start?",
                a: "For most projects we can kick off within 1–2 weeks of signing. We'll tell you at the discovery call based on our current load.",
                color: "blue",
              },
              {
                q: "Do you work with early-stage startups?",
                a: "Yes — some of our most interesting work is with founders who have an idea and a budget. We're especially good at scoping MVPs that don't overshoot.",
                color: "green",
              },
              {
                q: "What if I'm not technical?",
                a: "That's the norm, not the exception. We translate between your business goals and the technical decisions. You'll never feel lost in jargon.",
                color: "purple",
              },
              {
                q: "Do you sign NDAs?",
                a: "Yes, on request before any detailed conversations. Just mention it in your message and we'll send one across before the call.",
                color: "blue",
              },
              {
                q: "Can you work with our existing team?",
                a: "Absolutely — we slot into existing engineering and design teams regularly, either leading or supporting depending on what's needed.",
                color: "green",
              },
              {
                q: "We're outside Kenya. Is that a problem?",
                a: "Not at all. We've delivered projects for clients in the US, UK, and across Africa. We run async-first with regular video syncs.",
                color: "purple",
              },
            ].map(({ q, a, color }) => {
              const c = colorMap[color as keyof typeof colorMap];
              return (
                <div
                  key={q}
                  className="rounded-xl border p-5 flex flex-col gap-3 hover:scale-[1.01] transition-transform duration-200"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: c.bg }}
                    >
                      <span className="text-[9px] font-black" style={{ color: c.text }}>?</span>
                    </div>
                    <p className="text-sm font-bold leading-snug" style={{ color: "#ffffff" }}>{q}</p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{a}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            ITEN LOCATION FOOTER STRIP
        ══════════════════════════════════════════════════ */}
        <div
          className="mt-16 rounded-2xl border p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-10"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}
        >
          {/* Map mini embed */}
          <div
            className="rounded-xl overflow-hidden flex-shrink-0 border"
            style={{ width: 180, height: 120, borderColor: "rgba(255,255,255,0.10)" }}
          >
            <iframe
              title="Iten, Kenya"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15956.07177264628!2d35.50196!3d0.66736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178102f2d6b82825%3A0x41b12af09a5f3d0!2sIten%2C%20Kenya!5e0!3m2!1sen!2ske!4v1697000000000!5m2!1sen!2ske"
              width="180"
              height="120"
              style={{ border: 0, filter: "invert(0.88) hue-rotate(180deg) saturate(0.6)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5C4.8 1.5 3 3.3 3 5.5 3 8.5 7 12.5 7 12.5s4-4 4-7c0-2.2-1.8-4-4-4Z" stroke="#00e68a" strokeWidth="1.4"/>
                <circle cx="7" cy="5.5" r="1.4" fill="#00e68a"/>
              </svg>
              <span className="text-sm font-bold" style={{ color: "#00e68a" }}>
                Iten, Elgeyo-Marakwet County, Kenya
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              We're physically here — at 2,400m above sea level, surrounded by the Kerio Valley escarpment and the world's greatest distance runners. Remote meetings work perfectly. In-person visits are welcome.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 flex-shrink-0 text-center">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'DM Mono', monospace" }}>
              Office hours (EAT)
            </p>
            <div className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.60)" }}>
              Mon – Fri<br />
              <span style={{ color: "#ffffff" }}>8:00 AM – 6:00 PM</span>
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
              UTC+3 · East Africa Time
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}