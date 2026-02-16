"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Animated particle field for background depth
    const particles: { x: number; y: number; vx: number; vy: number; r: number; opacity: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 80, 0, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connective lines
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 80, 0, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] font-mono">
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Accent glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px] z-0 pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-orange-700/5 blur-[100px] z-0 pointer-events-none" />

      {/* Diagonal rule lines */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.5) 40px,
            rgba(255,255,255,0.5) 41px
          )`,
        }}
      />

      {/* Main content */}
      <main className="relative z-10 flex min-h-screen flex-col">

        {/* Top nav bar */}
        <nav className="flex items-center justify-between px-8 py-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-orange-500 rounded-sm rotate-12 opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative z-10">
                  <path d="M8 2L14 8L8 14L2 8L8 2Z" fill="white" />
                  <circle cx="8" cy="8" r="2" fill="#0a0a0a" />
                </svg>
              </div>
            </div>
            <span
              className="text-white text-sm tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Courier New', monospace", letterSpacing: "0.2em" }}
            >
              SportTechies
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse mr-2" />
            <span className="text-orange-400/80 text-xs tracking-widest uppercase">In Development</span>
          </div>
        </nav>

        {/* Hero area */}
        <div className="flex flex-1 flex-col justify-center px-8 md:px-16 lg:px-24 pt-16 pb-24">

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 rounded-full px-4 py-1.5 mb-12 self-start">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
            <span className="text-orange-300 text-xs tracking-[0.15em] uppercase">Coming Soon</span>
          </div>

          {/* Main headline — editorial large type */}
          <div className="overflow-hidden mb-3">
            <h1
              className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.92] tracking-[-0.03em] text-white animate-[slideUp_0.8s_ease_forwards]"
              style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
            >
              The Platform
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1
              className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.92] tracking-[-0.03em] animate-[slideUp_1s_ease_forwards]"
              style={{
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
                WebkitTextStroke: "2px rgba(255,255,255,0.15)",
                color: "transparent",
              }}
            >
              for{" "}
              <span
                style={{
                  WebkitTextStroke: "0px",
                  color: "#ff5000",
                }}
              >
                Sports
              </span>
            </h1>
          </div>
          <div className="overflow-hidden mb-16">
            <h1
              className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.92] tracking-[-0.03em] text-white animate-[slideUp_1.2s_ease_forwards]"
              style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
            >
              Enthusiasts.
            </h1>
          </div>

          {/* Subtext + CTA row */}
          <div className="flex flex-col lg:flex-row gap-12 lg:items-end">
            <div className="max-w-sm">
              <p className="text-white/40 text-sm leading-7 tracking-wide mb-6">
                A community where athletes, fans, and sports-tech innovators converge.
                Connect. Share. Elevate your game.
              </p>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-white/20 text-xs tracking-widest uppercase">notify me</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Email input */}
              <div className="flex h-12 rounded-sm overflow-hidden border border-white/10 focus-within:border-orange-500/50 transition-colors">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/[0.04] px-4 text-sm text-white placeholder-white/20 outline-none tracking-wide"
                />
                <button className="bg-orange-500 hover:bg-orange-400 transition-colors px-5 text-xs text-white font-bold tracking-[0.15em] uppercase whitespace-nowrap">
                  Join
                </button>
              </div>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 lg:pb-1">
              {["Live Score Feeds", "Athlete Profiles", "Tech Reviews", "Community Forums", "Match Analytics"].map(
                (feat, i) => (
                  <span
                    key={feat}
                    className="border border-white/[0.08] bg-white/[0.03] hover:border-orange-500/40 hover:bg-orange-500/10 transition-all cursor-default rounded-full px-4 py-2 text-xs text-white/50 hover:text-orange-300 tracking-wider"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {feat}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bottom footer bar */}
        <footer className="border-t border-white/[0.06] px-8 md:px-16 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="text-white/20 text-xs tracking-widest uppercase">© 2025 SportTechies</span>
            <span className="text-white/10 text-xs">|</span>
            <a href="#" className="text-white/20 hover:text-orange-400 text-xs tracking-wider transition-colors uppercase">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-5">
            {/* Social icons */}
            {[
              { label: "X", path: "M4 4L12 12M12 4L4 12" },
              {
                label: "IG",
                path: "M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm5.5-2h-11A2.5 2.5 0 000 6v8a2.5 2.5 0 002.5 2.5h11A2.5 2.5 0 0016 14V6a2.5 2.5 0 00-2.5-2.5zm-1.25 1.25a.75.75 0 110 1.5.75.75 0 010-1.5z",
              },
            ].map(({ label, path }) => (
              <a
                key={label}
                href="#"
                className="w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center hover:border-orange-500/40 hover:bg-orange-500/10 transition-all group"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-white/30 group-hover:text-orange-400 transition-colors">
                  <path d={path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}

            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/[0.08] hover:border-white/20 transition-colors rounded-full px-4 py-1.5 group"
            >
              <Image
                src="/vercel.svg"
                alt="Vercel"
                width={14}
                height={14}
                className="opacity-30 group-hover:opacity-60 transition-opacity invert"
              />
              <span className="text-white/30 group-hover:text-white/60 text-xs transition-colors tracking-wide">
                Deploy
              </span>
            </a>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}