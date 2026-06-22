"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Scene from "./Scene";

export default function Home() {
  useReveal();
  return (
    <main style={{ position: "relative", zIndex: 2, overflowX: "clip" }}>
      <ScrollProgress />
      <Nav />
      <Hero />
      <Ticker />
      <Cost />
      <Bento />
      <Process />
      <Guarantee />
      <Safety />
      <Deliverable />
      <WhyMe />
      <Founder />
      <Faq />
      <RiskCheck />
      <FoundingOffer />
      <CTA />
      <Footer />
    </main>
  );
}

/* ---------- helpers ---------- */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { (e.target as HTMLElement).classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useIsMobile(bp = 760) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${bp}px)`);
    const u = () => setM(mq.matches);
    u(); mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, [bp]);
  return m;
}

const wrap: React.CSSProperties = { maxWidth: 1080, margin: "0 auto", padding: "0 32px" };
const line = "1px solid var(--line)";
const btnPrimary: React.CSSProperties = {
  background: "#ece9f6", color: "#150a2b", fontWeight: 600, fontSize: 15,
  padding: "14px 26px", borderRadius: 999, display: "inline-block",
};
const btnGhost: React.CSSProperties = {
  color: "var(--text)", fontWeight: 500, fontSize: 15, padding: "14px 22px",
  border: "1px solid var(--line-strong)", borderRadius: 999, display: "inline-block",
};

function Aurora({ opacity = 1 }: { opacity?: number }) {
  return (
    <div className="aurora-wrap" aria-hidden="true" style={{ opacity }}>
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />
    </div>
  );
}
function GridBg() {
  return <div className="grid-bg" aria-hidden="true" />;
}

function Magnetic({ href, children, className, style }: { href: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <a ref={ref} href={href} className={className} style={{ ...style, transition: "transform .3s cubic-bezier(.16,1,.3,1)" }}
      onMouseMove={(e) => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`; }}
      onMouseLeave={() => { if (ref.current) ref.current.style.transform = "translate(0,0)"; }}>
      {children}
    </a>
  );
}

export function Spotlight({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className={`spot ${className || ""}`} style={style}
      onMouseMove={(e) => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(); el.style.setProperty("--mx", `${e.clientX - r.left}px`); el.style.setProperty("--my", `${e.clientY - r.top}px`); }}>
      {children}
    </div>
  );
}

function Index({ n, label }: { n: string; label: string }) {
  return (
    <div className="reveal" style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 40 }}>
      <span className="font-display" style={{ fontSize: 13, color: "var(--accent)", letterSpacing: "0.05em" }}>{n}</span>
      <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
      <span style={{ fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{label}</span>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", background: "var(--bg)", border: "1px solid var(--line-strong)", borderRadius: 10,
  padding: "12px 14px", color: "var(--text)", fontSize: 15, fontFamily: "inherit", outline: "none",
};
const pill: React.CSSProperties = {
  fontSize: 13.5, fontWeight: 500, color: "var(--muted)", padding: "7px 16px", borderRadius: 999,
  border: "1px solid var(--line-strong)", background: "transparent", cursor: "pointer",
};
const pillActive: React.CSSProperties = { background: "var(--accent)", color: "var(--btn-text)", borderColor: "var(--accent)" };

/* ---------- SCROLL PROGRESS ---------- */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(Math.max(h.scrollTop / max, 0), 1) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 100, pointerEvents: "none" }}>
      <div style={{ height: "100%", width: `${p * 100}%`, background: "var(--accent)" }} />
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  const links: [string, string][] = [["The cost", "#cost"], ["Process", "#process"], ["Sample work", "/work"], ["FAQ", "#faq"]];
  const [active, setActive] = useState("");
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const u = () => setMobile(mq.matches);
    u(); mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, []);
  useEffect(() => {
    const ids = ["cost", "process", "faq"];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, padding: "14px 16px" }}>
      <nav style={{ maxWidth: 1040, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 58, padding: "0 10px 0 20px", borderRadius: 999, background: "rgba(17,13,34,0.72)", backdropFilter: "blur(16px)", border: "1px solid var(--line-strong)", boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}>
        <Logo />
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {!mobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {links.map(([t, h]) => (
                <a key={h} href={h} className={`navlink ${h.startsWith("#") && active === h.slice(1) ? "active" : ""}`} style={{ fontSize: 14 }}>{t}</a>
              ))}
            </div>
          )}
          <a href="#start" style={{ fontSize: 13.5, fontWeight: 600, color: "#150a2b", background: "#ece9f6", padding: "9px 18px", borderRadius: 999, whiteSpace: "nowrap" }}>Free audit</a>
        </div>
      </nav>
    </div>
  );
}

export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-label="Revanio logo" role="img">
      <rect x="12" y="12" width="18" height="18" rx="3" fill="var(--text)" />
      <rect x="12" y="34" width="18" height="18" rx="3" fill="var(--text)" />
      <rect x="34" y="34" width="18" height="18" rx="3" fill="var(--text)" />
      <rect x="35" y="11" width="16" height="16" rx="3" fill="var(--accent)" transform="rotate(8 43 19)" />
    </svg>
  );
}

function Logo() {
  return (
    <a href="#" style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <LogoMark size={22} />
      <span className="font-display" style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>Revanio</span>
    </a>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const lines = ["The software your", "business runs on", "is getting old."];
  const mobile = useIsMobile();
  return (
    <section style={{ position: "relative", minHeight: "94vh", display: "flex", alignItems: "center", borderBottom: line, overflow: "hidden" }}>
      <GridBg />
      <Aurora opacity={0.7} />
      {!mobile && (
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "78%", zIndex: 1 }}>
          <Scene />
        </div>
      )}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, var(--bg) 3%, rgba(11,9,23,0.28) 36%, transparent 62%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, var(--bg), transparent 18%)", pointerEvents: "none" }} />

      <div style={{ ...wrap, position: "relative", zIndex: 2, width: "100%", paddingTop: 80, paddingBottom: 60 }}>
        <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 30, animationDelay: "0.1s" }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }} />
          <span style={{ fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>Legacy software modernization</span>
        </div>

        <h1 className="font-display" style={{ fontSize: "clamp(30px, 5.6vw, 74px)", fontWeight: 600, lineHeight: 1.03, letterSpacing: "-0.04em", marginBottom: 32 }}>
          {mobile ? (
            <span className="fade-up" style={{ display: "block", animationDelay: "0.15s" }}>
              The software your business runs on is getting old.{" "}
              <span style={{ color: "var(--muted)" }}>I make it </span>
              <span style={{ color: "var(--accent)" }}>new again.</span>
            </span>
          ) : (
            <>
              {lines.map((l, i) => (
                <span key={l} className="line-mask"><span className="line-in" style={{ animationDelay: `${0.15 + i * 0.12}s` }}>{l}</span></span>
              ))}
              <span className="line-mask"><span className="line-in" style={{ animationDelay: `${0.15 + lines.length * 0.12}s` }}>
                <span style={{ color: "var(--muted)" }}>I make it </span><span style={{ color: "var(--accent)" }}>new again.</span>
              </span></span>
            </>
          )}
        </h1>

        <p className="fade-up" style={{ fontSize: 19, lineHeight: 1.6, color: "var(--text)", maxWidth: 540, marginBottom: 40, animationDelay: "0.7s" }}>
          Slow systems, aging databases, code no one dares touch. I rebuild outdated business
          software into fast, secure, modern systems — with zero downtime, and a free audit before you decide anything.
        </p>

        <div className="fade-up" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", animationDelay: "0.85s" }}>
          <Magnetic href="#start" className="btn-primary" style={btnPrimary}>Get your free audit</Magnetic>
          <a href="#process" className="btn-ghost" style={btnGhost}>How it works →</a>
        </div>

        <div className="fade-up" style={{ display: "flex", gap: 28, flexWrap: "wrap", marginTop: 46, paddingTop: 28, borderTop: line, maxWidth: 560, animationDelay: "1s" }}>
          {[["48h", "audit turnaround"], ["0", "downtime, guaranteed"], ["1:1", "direct with the founder"]].map(([n, l]) => (
            <div key={l}><div className="font-display" style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.03em" }}>{n}</div><div style={{ fontSize: 13.5, color: "var(--text)", marginTop: 2 }}>{l}</div></div>
          ))}
        </div>
      </div>

      <div className="fade-up" style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", color: "var(--dim)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", animationDelay: "1.3s" }}>scroll</div>
    </section>
  );
}

/* ---------- TICKER ---------- */
function Ticker() {
  const pairs: [string, string][] = [
    ["PHP 5.6", "TypeScript"], ["Legacy SQL", "PostgreSQL"], ["jQuery spaghetti", "React"],
    ["Breaks weekly", "Rock solid"], ["Security holes", "Locked down"], ["Slow & clunky", "Fast & modern"],
  ];
  const Item = ({ o, n }: { o: string; n: string }) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "0 32px", fontSize: 16 }}>
      <span style={{ color: "var(--dim)", textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,0.2)" }}>{o}</span>
      <span className="font-display" style={{ color: "var(--accent)" }}>→</span>
      <span style={{ color: "var(--text)" }}>{n}</span>
      <span style={{ color: "var(--line-strong)", marginLeft: 20 }}>/</span>
    </span>
  );
  const row = [...pairs, ...pairs];
  return (
    <section style={{ borderBottom: line, padding: "26px 0" }}>
      <div className="marquee" style={{ overflow: "hidden", maxWidth: "100%" }}>
        <div className="marquee-track">
          {row.map((p, i) => <Item key={i} o={p[0]} n={p[1]} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- COST ---------- */
function Cost() {
  const [people, setPeople] = useState(8);
  const [hours, setHours] = useState(5);
  const [wage, setWage] = useState(28);
  const display = useCountUp(people * hours * wage * 52);
  return (
    <section id="cost" style={{ borderBottom: line, padding: "100px 0" }}>
      <div style={wrap}>
        <Index n="01" label="The real cost" />
        <div className="grid-asym" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div className="reveal">
            <h2 className="font-display" style={{ fontSize: "clamp(30px,4vw,44px)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 22 }}>Old software isn't free.<br />It bills you every week.</h2>
            <p style={{ color: "var(--muted)", fontSize: 16.5, lineHeight: 1.65, marginBottom: 36 }}>Every hour your team fights slow, broken systems is money walking out the door. Move the sliders to see what it's quietly costing you.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <Slider label="People slowed down by old systems" v={people} min={1} max={100} set={setPeople} suf=" people" />
              <Slider label="Hours each loses per week" v={hours} min={1} max={30} set={setHours} suf=" hrs" />
              <Slider label="Average hourly cost" v={wage} min={10} max={120} set={setWage} pre="$" suf="/hr" />
            </div>
          </div>
          <Spotlight className="reveal" style={{ border: line, borderRadius: 16, padding: "40px 34px", background: "var(--bg-elev)" }}>
            <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 14 }}>You're losing about</div>
            <div className="font-display" style={{ fontSize: "clamp(44px,6vw,64px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--accent)" }}>${display.toLocaleString()}</div>
            <div style={{ fontSize: 14, color: "var(--dim)", marginTop: 12 }}>every year — in wasted time alone.</div>
            <div style={{ height: 1, background: "var(--line)", margin: "28px 0" }} />
            <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.6 }}>And that's before lost customers, security exposure, and the day it finally breaks.</p>
            <Magnetic href="#start" className="btn-primary" style={{ ...btnPrimary, marginTop: 28, fontSize: 14.5, padding: "12px 22px" }}>Stop the bleeding →</Magnetic>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
function Slider({ label, v, min, max, set, pre = "", suf = "" }: { label: string; v: number; min: number; max: number; set: (n: number) => void; pre?: string; suf?: string }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 14.5, color: "var(--muted)" }}>{label}</span>
        <span className="font-display" style={{ fontSize: 14.5, color: "var(--text)" }}>{pre}{v}{suf}</span>
      </div>
      <input type="range" min={min} max={max} value={v} step={1} onChange={(e) => set(+e.target.value)} style={{ width: "100%", accentColor: "var(--accent)", cursor: "pointer", height: 4 }} />
    </div>
  );
}
function useCountUp(target: number) {
  const [val, setVal] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const from = prev.current, to = target, start = performance.now(), dur = 500;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick); else prev.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return val;
}

/* ---------- BENTO ---------- */
function Bento() {
  const tile: React.CSSProperties = { border: line, borderRadius: 16, background: "var(--bg-elev)", padding: "26px 26px", display: "flex", flexDirection: "column", justifyContent: "space-between" };
  return (
    <section style={{ borderBottom: line, padding: "100px 0" }}>
      <div style={wrap}>
        <Index n="02" label="What you get" />
        <h2 className="font-display reveal" style={{ fontSize: "clamp(30px,4.5vw,48px)", fontWeight: 500, lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: 720, marginBottom: 48 }}>Modern software, explained in plain English.</h2>
        <div className="bento" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "minmax(160px, auto)", gap: 14 }}>
          <Spotlight className="reveal" style={{ ...tile, gridColumn: "1 / span 2", gridRow: "1 / span 2" }}>
            <div>
              <div className="font-display" style={{ fontSize: 26, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 12 }}>Speed you feel on day one</div>
              <p style={{ color: "var(--muted)", fontSize: 15.5, lineHeight: 1.6, maxWidth: 420 }}>I rebuild slow, clunky systems so your team and customers stop waiting. The difference is immediate and obvious.</p>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 90, marginTop: 24 }}>
              {[30, 42, 38, 58, 70, 64, 88, 100].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 4, background: i > 5 ? "var(--accent)" : "rgba(255,255,255,0.1)" }} />
              ))}
              <span className="font-display" style={{ color: "var(--accent)", fontSize: 15, marginLeft: 10, whiteSpace: "nowrap" }}>+340%</span>
            </div>
          </Spotlight>
          <Spotlight className="reveal" style={{ ...tile, gridColumn: "3", gridRow: "1" }}>
            <div className="font-display" style={{ fontSize: 46, fontWeight: 500, letterSpacing: "-0.04em", color: "var(--accent)" }}>0</div>
            <div style={{ color: "var(--muted)", fontSize: 14.5 }}>downtime during the entire rebuild</div>
          </Spotlight>
          <Spotlight className="reveal" style={{ ...tile, gridColumn: "3", gridRow: "2" }}>
            <div className="font-display" style={{ fontSize: 19, fontWeight: 500 }}>Security, modernized</div>
            <div style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55 }}>Old code is a break-in waiting to happen. I close the gaps.</div>
          </Spotlight>
          <Spotlight className="reveal" style={{ ...tile, gridColumn: "1", gridRow: "3" }}>
            <div className="font-display" style={{ fontSize: 19, fontWeight: 500 }}>1:1 access</div>
            <div style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55 }}>You work directly with me. No handoffs.</div>
          </Spotlight>
          <Spotlight className="reveal" style={{ ...tile, gridColumn: "2 / span 2", gridRow: "3" }}>
            <div className="font-display" style={{ fontSize: 19, fontWeight: 500 }}>Room to finally grow</div>
            <div style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, maxWidth: 420 }}>Modern foundations mean you can add the features you've been blocked on for years — without fear of it all falling over.</div>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
function Process() {
  const steps = [
    ["Free audit", "I analyze your code and database, then send a clear written report within 48 hours. No cost, no obligation."],
    ["The plan", "You get an exact plan — what changes, what it costs, how long it takes. No surprises, ever."],
    ["Safe rebuild", "Old and new run side by side until everything is verified. Your business never stops."],
    ["Handoff", "You get fast, modern, documented software built to grow with you for years."],
  ];
  return (
    <section id="process" style={{ borderBottom: line, padding: "100px 0" }}>
      <div style={wrap}>
        <Index n="03" label="The process" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 14 }}>
          {steps.map(([t, d], i) => (
            <Spotlight key={t} className="reveal" style={{ border: line, borderRadius: 14, padding: "30px 26px", minHeight: 230, background: "var(--bg-elev)" }}>
              <div className="font-display" style={{ fontSize: 42, fontWeight: 400, color: "var(--line-strong)", letterSpacing: "-0.04em", marginBottom: 24 }}>0{i + 1}</div>
              <h3 className="font-display" style={{ fontSize: 19, fontWeight: 500, marginBottom: 10, letterSpacing: "-0.02em" }}>{t}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6 }}>{d}</p>
            </Spotlight>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GUARANTEE ---------- */
function Guarantee() {
  return (
    <section id="guarantee" style={{ borderBottom: line, padding: "120px 0", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 60% at 50% 50%, rgba(124,58,237,0.12), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ ...wrap, position: "relative", textAlign: "center" }}>
        <div className="reveal" style={{ fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 26 }}>The Revanio promise</div>
        <h2 className="font-display reveal" style={{ fontSize: "clamp(34px,6vw,64px)", fontWeight: 500, lineHeight: 1.04, letterSpacing: "-0.035em", maxWidth: 880, margin: "0 auto 28px" }}>Zero downtime,<br />or you don't pay.</h2>
        <p className="reveal" style={{ color: "var(--muted)", fontSize: 18, lineHeight: 1.65, maxWidth: 580, margin: "0 auto" }}>Your business runs on this software, so I never take it offline. Old and new run in parallel, fully verified before anything switches over. If your operations go down because of my work — you don't pay.</p>
      </div>
    </section>
  );
}

/* ---------- SAFETY ---------- */
function Safety() {
  const items = [
    ["A full backup, first", "Before I touch a single thing, I take a complete backup. There is always a way back."],
    ["Your code stays private", "Everything runs under NDA. Your code and data never leave your control or get shared with anyone."],
    ["I test on a copy, never live", "I build and verify on an exact mirror of your system — your real one keeps running untouched."],
    ["Parallel run, instant rollback", "Old and new run side by side. If anything looks off, I switch back in seconds — no harm done."],
    ["Your sign-off comes first", "You watch it work on the mirror and approve before a single customer is ever affected."],
  ];
  return (
    <section style={{ borderBottom: line, padding: "100px 0" }}>
      <div style={wrap}>
        <Index n="04" label="Your safety" />
        <h2 className="font-display reveal" style={{ fontSize: "clamp(30px,4.5vw,48px)", fontWeight: 500, lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: 720, marginBottom: 16 }}>How I protect your business while I rebuild it.</h2>
        <p className="reveal" style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.6, maxWidth: 580, marginBottom: 48 }}>Your biggest worry is that someone breaks the system you depend on. So every job is built, from the first minute, to make that impossible.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 14 }}>
          {items.map(([t, d]) => (
            <Spotlight key={t} className="reveal" style={{ border: line, borderRadius: 14, padding: "26px 24px", background: "var(--bg-elev)" }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(167,139,250,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", marginBottom: 16, fontSize: 15 }}>✓</div>
              <h3 className="font-display" style={{ fontSize: 17.5, fontWeight: 500, marginBottom: 9, letterSpacing: "-0.01em" }}>{t}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6 }}>{d}</p>
            </Spotlight>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY ME ---------- */
function WhyMe() {
  const cols = [
    { name: "Do nothing", points: ["Risk grows every single month", "One server update from going dark", "A breach sitting there, waiting"], best: false },
    { name: "Agency or random freelancer", points: ["Pricey and slow — or cheap and risky", "Your project handed to junior staff", "Can vanish halfway through"], best: false },
    { name: "Revanio", points: ["Your live system never goes down", "You work directly with me, start to finish", "Fixed scope, fixed price, zero surprises"], best: true },
  ];
  return (
    <section style={{ borderBottom: line, padding: "100px 0" }}>
      <div style={wrap}>
        <Index n="06" label="Why Revanio" />
        <h2 className="font-display reveal" style={{ fontSize: "clamp(30px,4.5vw,48px)", fontWeight: 500, lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: 680, marginBottom: 48 }}>Your three options, honestly.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 14 }}>
          {cols.map((c) => (
            <div key={c.name} className="reveal" style={{ border: c.best ? "2px solid var(--accent)" : line, borderRadius: 14, padding: "28px 26px", background: "var(--bg-elev)" }}>
              <div className="font-display" style={{ fontSize: 19, fontWeight: 500, marginBottom: 18, color: c.best ? "var(--accent)" : "var(--text)" }}>{c.name}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {c.points.map((p) => (
                  <li key={p} style={{ display: "flex", gap: 11, fontSize: 14.5, color: c.best ? "var(--text)" : "var(--muted)", lineHeight: 1.5 }}>
                    <span style={{ color: c.best ? "var(--accent)" : "var(--dim)", flexShrink: 0 }}>{c.best ? "✓" : "—"}</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- RISK CHECK ---------- */
function RiskCheck() {
  const questions = [
    "Is your main software more than 5 years old?",
    "Has the original developer left, or gone quiet?",
    "Are you nervous to change it in case something breaks?",
    "Does it slow down, freeze, or crash under load?",
    "Has it never had a proper security review?",
  ];
  const [a, setA] = useState<(boolean | null)[]>(Array(questions.length).fill(null));
  const set = (i: number, v: boolean) => setA((prev) => prev.map((x, j) => (j === i ? v : x)));
  const answered = a.filter((x) => x !== null).length;
  const yes = a.filter((x) => x === true).length;
  const done = answered === questions.length;
  const tier =
    yes >= 4 ? { label: "High risk", c: "#f0a0a0", msg: "Your software is exposed on several fronts. This is worth acting on soon — a free audit shows you exactly where you stand and what to fix first." }
    : yes >= 2 ? { label: "Moderate risk", c: "#e8c98a", msg: "There are real warning signs here. A free audit will tell you how serious they are and what to handle first." }
    : { label: "Lower risk — but worth a check", c: "#7ee0b0", msg: "Nothing screaming red — but a quick free audit confirms you're genuinely in the clear." };

  return (
    <section style={{ borderBottom: line, padding: "100px 0" }}>
      <div style={{ ...wrap, maxWidth: 800 }}>
        <Index n="09" label="Where you stand" />
        <h2 className="font-display reveal" style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 16 }}>Is your software at risk? Take the 30-second check.</h2>
        <p className="reveal" style={{ color: "var(--muted)", fontSize: 16.5, lineHeight: 1.6, marginBottom: 36, maxWidth: 540 }}>Answer honestly. No email required — you'll see your result instantly.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {questions.map((q, i) => (
            <div key={q} className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", border: line, borderRadius: 12, padding: "16px 20px", background: "var(--bg-elev)" }}>
              <span style={{ fontSize: 15.5, color: "var(--text)" }}>{q}</span>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                {([["Yes", true], ["No", false]] as [string, boolean][]).map(([lbl, val]) => (
                  <button key={lbl} onClick={() => set(i, val)} style={{ ...pill, ...(a[i] === val ? pillActive : {}) }}>{lbl}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {done && (
          <div className="fade-up" style={{ marginTop: 16, border: `1px solid ${tier.c}55`, borderRadius: 14, padding: "26px 28px", background: "var(--bg-elev)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: tier.c }} />
              <span className="font-display" style={{ fontSize: 20, fontWeight: 500, color: tier.c }}>{tier.label}</span>
              <span style={{ marginLeft: "auto", color: "var(--dim)", fontSize: 13 }}>{yes} of {questions.length} warning signs</span>
            </div>
            <p style={{ color: "var(--muted)", fontSize: 15.5, lineHeight: 1.6, marginBottom: 20 }}>{tier.msg}</p>
            <a href="#start" className="btn-primary" style={btnPrimary}>Get your free audit →</a>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- FOUNDING OFFER ---------- */
function FoundingOffer() {
  return (
    <section style={{ padding: "70px 0" }}>
      <div style={wrap}>
        <div className="reveal" style={{ border: "1px solid var(--line-strong)", borderRadius: 16, background: "var(--bg-elev)", padding: "38px 36px", display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ color: "var(--accent)", fontSize: 12.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Founding clients</div>
            <h3 className="font-display" style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 12 }}>Straight talk: I'm taking on my first few clients at a founder rate.</h3>
            <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.65, maxWidth: 640 }}>I'm building my track record, so a limited number of early clients get senior-level work at a reduced price — in exchange for honest feedback and, if you're happy, a testimonial. You get a real deal; I get to prove myself. No catch.</p>
          </div>
          <a href="#start" className="btn-primary" style={btnPrimary}>Claim a founding slot →</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- DELIVERABLE ---------- */
function Deliverable() {
  const rows: [string, string, string][] = [
    ["Critical security holes", "7 found", "#f0a0a0"],
    ["Outdated dependencies", "31", "#e8c98a"],
    ["Performance bottlenecks", "12 areas", "#e8c98a"],
    ["Projected speed gain", "+340%", "var(--accent)"],
    ["Modernization estimate", "6–8 weeks", "var(--text)"],
  ];
  return (
    <section style={{ borderBottom: line, padding: "100px 0" }}>
      <div style={wrap}>
        <Index n="05" label="Your free deliverable" />
        <div className="grid-asym" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div className="reveal">
            <h2 className="font-display" style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 22 }}>A real report. Not a sales pitch.</h2>
            <p style={{ color: "var(--muted)", fontSize: 16.5, lineHeight: 1.65, marginBottom: 28 }}>Your free audit is a written breakdown of your software's actual condition — risks, costs, and a clear path forward. Hire me or don't; the report is yours to keep.</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {["Plain-English summary you'll actually understand", "Every security & performance risk, ranked", "A clear plan with real timeline and cost", "Honest advice — even if it's 'do nothing yet'"].map((x) => (
                <li key={x} style={{ display: "flex", gap: 12, fontSize: 15.5, color: "var(--text)" }}><span style={{ color: "var(--accent)" }}>✓</span>{x}</li>
              ))}
            </ul>
            <div style={{ marginTop: 30 }}>
              <Link href="/work" className="btn-ghost" style={{ ...btnGhost, display: "inline-flex", alignItems: "center", gap: 8 }}>See a sample modernization →</Link>
            </div>
          </div>
          <Spotlight className="reveal" style={{ border: line, borderRadius: 16, background: "var(--bg-elev)", padding: 28, boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 18, borderBottom: line, marginBottom: 6 }}>
              <span className="font-display" style={{ fontWeight: 500, fontSize: 15 }}>Software Health Audit</span>
              <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--accent)", border: "1px solid var(--line-strong)", padding: "3px 9px", borderRadius: 999 }}>SAMPLE</span>
            </div>
            {rows.map(([l, v, c]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "15px 0", borderBottom: line }}>
                <span style={{ color: "var(--muted)", fontSize: 14 }}>{l}</span>
                <span className="font-display" style={{ color: c, fontSize: 14.5 }}>{v}</span>
              </div>
            ))}
            <div style={{ textAlign: "center", fontSize: 12, color: "var(--dim)", marginTop: 16 }}>Delivered as a clean PDF</div>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOUNDER ---------- */
function Founder() {
  return (
    <section style={{ borderBottom: line, padding: "100px 0" }}>
      <div style={wrap}>
        <Index n="07" label="Who's behind it" />
        <div className="reveal" style={{ maxWidth: 760 }}>
          <h2 className="font-display" style={{ fontSize: "clamp(30px,5vw,52px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 28 }}>Hi, I'm Dave. Revanio is just me — and that's the point.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }} className="grid-2">
            <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.75 }}>I started Revanio because too many good businesses are held hostage by software that's quietly falling apart — and the big firms either won't touch it or charge a fortune to fail.</p>
            <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.75 }}>You work with me directly. No account managers, no handoffs, no jargon. One person who takes your aging system seriously and rebuilds it the right way — safely, clearly, without ever putting your business at risk.</p>
          </div>
          <div className="font-display" style={{ marginTop: 32, fontSize: 16, color: "var(--text)", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 28, height: 1, background: "var(--accent)" }} />Dave — Founder, Revanio
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const faqs = [
    ["Is the audit really free?", "Completely. A full written report, zero cost, zero obligation. I'd rather earn your trust by being useful first. If you don't need work yet, I'll tell you that."],
    ["Will this disrupt my business?", "No — that's the entire point of how I work. Your current system keeps running while the new one is built and tested alongside it. Nothing switches until it's proven. If your operations go down because of my work, you don't pay."],
    ["How much does it cost?", "Every business is different, so I don't do one-size pricing. Your free audit includes an exact, no-surprises quote for your specific system — so you know the full cost before deciding anything."],
    ["I'm not technical — will I follow any of this?", "Yes. I explain everything in plain English, no jargon. You'll always know what's happening, why it matters, and what it costs."],
    ["What kind of software do you work on?", "Aging business systems — old PHP sites, outdated databases, custom internal tools, anything built years ago that now feels slow, risky, or impossible to change."],
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" style={{ borderBottom: line, padding: "100px 0" }}>
      <div style={{ ...wrap, maxWidth: 800 }}>
        <Index n="08" label="Questions" />
        {faqs.map(([q, a], i) => (
          <div key={q} className="reveal" style={{ borderTop: line, ...(i === faqs.length - 1 ? { borderBottom: line } : {}) }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, padding: "24px 0", background: "none", border: "none", color: "var(--text)", cursor: "pointer", textAlign: "left" }}>
              <span className="font-display" style={{ fontSize: 18.5, fontWeight: 500, letterSpacing: "-0.01em" }}>{q}</span>
              <span style={{ color: "var(--accent)", fontSize: 22, flexShrink: 0, transition: "transform .25s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            <div style={{ maxHeight: open === i ? 240 : 0, overflow: "hidden", transition: "max-height .35s ease" }}>
              <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.65, paddingBottom: 24, maxWidth: 640 }}>{a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- CONTACT FORM ---------- */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [f, setF] = useState({ name: "", company: "", email: "", message: "" });
  const on = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const d = await res.json().catch(() => ({}));
        setErr(d.error || "Something went wrong. Please email hello@revanio.com.");
      }
    } catch {
      setErr("Network error. Please email hello@revanio.com.");
    } finally {
      setLoading(false);
    }
  };
  if (sent) {
    return (
      <div style={{ border: "1px solid var(--line-strong)", borderRadius: 16, background: "var(--bg-elev)", padding: "40px 32px", textAlign: "center" }}>
        <div className="font-display" style={{ fontSize: 22, fontWeight: 500, marginBottom: 10 }}>Request received — thank you.</div>
        <p style={{ color: "var(--muted)", fontSize: 15.5, lineHeight: 1.6 }}>I&apos;ll review your software and reply within a day. Prefer email? Reach me anytime at <span style={{ color: "var(--text)" }}>hello@revanio.com</span>.</p>
      </div>
    );
  }
  return (
    <form onSubmit={submit} style={{ border: "1px solid var(--line-strong)", borderRadius: 16, background: "var(--bg-elev)", padding: "26px", textAlign: "left", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="grid-2">
        <input required placeholder="Your name" value={f.name} onChange={on("name")} style={inputStyle} />
        <input placeholder="Company" value={f.company} onChange={on("company")} style={inputStyle} />
      </div>
      <input required type="email" placeholder="Email" value={f.email} onChange={on("email")} style={inputStyle} />
      <textarea placeholder="What's going on with your software? (optional)" value={f.message} onChange={on("message")} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
      {err && <div style={{ color: "#f0a0a0", fontSize: 13.5 }}>{err}</div>}
      <button type="submit" disabled={loading} className="btn-primary" style={{ ...btnPrimary, textAlign: "center", border: "none", cursor: "pointer", marginTop: 4, fontSize: 15.5, padding: "14px", opacity: loading ? 0.7 : 1 }}>{loading ? "Sending…" : "Request my free audit →"}</button>
      <p style={{ color: "var(--dim)", fontSize: 12.5, textAlign: "center" }}>No obligation · I reply within a day · Everything under NDA</p>
    </form>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section id="start" style={{ padding: "140px 0", position: "relative", overflow: "hidden", borderTop: line }}>
      <Aurora opacity={0.9} />
      <GridBg />
      <div style={{ ...wrap, maxWidth: 580, position: "relative", zIndex: 2, textAlign: "center" }}>
        <h2 className="font-display reveal" style={{ fontSize: "clamp(34px,5.5vw,58px)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.04em", margin: "0 auto 22px" }}>See what your software<br />is really costing you.</h2>
        <p className="reveal" style={{ color: "var(--muted)", fontSize: 17.5, lineHeight: 1.6, maxWidth: 480, margin: "0 auto 36px" }}>A free, no-obligation audit in 48 hours. Know exactly where you stand — before spending a single dollar.</p>
        <div className="reveal"><ContactForm /></div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer style={{ padding: "40px 0" }}>
      <div style={{ ...wrap, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
        <Logo />
        <span style={{ color: "var(--dim)", fontSize: 13.5 }}>Legacy software modernization · hello@revanio.com</span>
        <span style={{ color: "var(--dim)", fontSize: 13.5 }}>© 2026 Revanio</span>
      </div>
    </footer>
  );
}
