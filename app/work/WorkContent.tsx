"use client";

import Link from "next/link";
import { LogoMark, Spotlight, useReveal } from "../page";

const C = {
  text: "var(--text)", muted: "var(--muted)", dim: "var(--dim)", accent: "var(--accent)",
  bgElev: "var(--bg-elev)", line: "1px solid var(--line)", lineStrong: "1px solid var(--line-strong)",
};
const wrap: React.CSSProperties = { maxWidth: 860, margin: "0 auto", padding: "0 32px" };
const danger = "#f0a0a0";
const warn = "#e8c98a";

export default function WorkContent() {
  useReveal();
  return (
    <main style={{ position: "relative", zIndex: 2 }}>
      {/* top bar */}
      <nav style={{ borderBottom: C.line, position: "sticky", top: 0, zIndex: 50, background: "rgba(11,9,23,0.72)", backdropFilter: "blur(14px)" }}>
        <div style={{ ...wrap, maxWidth: 1080, display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <LogoMark size={22} />
            <span className="font-display" style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>Revanio</span>
          </Link>
          <Link href="/#start" className="btn-ghost" style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text)", padding: "8px 16px", border: "1px solid var(--line-strong)", borderRadius: 999 }}>Free audit</Link>
        </div>
      </nav>

      {/* header */}
      <header style={{ borderBottom: C.line, padding: "92px 0 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 420, background: "radial-gradient(120% 100% at 50% 0%, rgba(124,58,237,0.16), transparent 62%)", pointerEvents: "none" }} />
        <div style={{ ...wrap, position: "relative" }}>
          <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5 }}>
            <Link href="/" className="crumb" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: C.text, fontWeight: 500, padding: "7px 16px 7px 13px", border: "1px solid var(--line-strong)", borderRadius: 999, background: "rgba(255,255,255,0.04)" }}>
              <span className="back-arrow" style={{ display: "inline-block", transition: "transform .25s cubic-bezier(.16,1,.3,1)" }}>←</span> Home
            </Link>
            <span aria-hidden style={{ color: C.dim }}>/</span>
            <span style={{ color: C.text, fontWeight: 500 }}>Sample work</span>
          </nav>
          <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 8, width: "fit-content", marginTop: 26, marginBottom: 24, background: "rgba(167,139,250,0.1)", color: C.accent, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 999, border: "1px solid var(--line-strong)" }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: C.accent, boxShadow: "0 0 10px var(--accent)" }} />
            Demonstration project
          </div>
          <h1 className="font-display reveal" style={{ fontSize: "clamp(34px,5.4vw,56px)", fontWeight: 500, lineHeight: 1.06, letterSpacing: "-0.035em", marginBottom: 24 }}>
            A legacy warehouse system,<br />rebuilt with zero downtime.
          </h1>
          <p className="reveal" style={{ color: C.muted, fontSize: 18.5, lineHeight: 1.65, maxWidth: 620 }}>
            A representative legacy system — old PHP, an exposed database, code that couldn't run on a modern
            server — modernized end-to-end. This is exactly the process I run for a real client, start to finish.
          </p>

          {/* stat cards */}
          <div className="reveal stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 48 }}>
            {[["6/6", "safety checks passing"], ["100%", "of behavior preserved"], ["0", "downtime to switch over"], ["1", "critical breach closed"]].map(([n, l]) => (
              <Spotlight key={l} style={{ border: C.line, borderRadius: 14, background: C.bgElev, padding: "20px 22px" }}>
                <div className="font-display" style={{ fontSize: 30, fontWeight: 500, color: C.accent, letterSpacing: "-0.03em", lineHeight: 1 }}>{n}</div>
                <div style={{ color: C.muted, fontSize: 13.5, marginTop: 8, lineHeight: 1.35 }}>{l}</div>
              </Spotlight>
            ))}
          </div>
        </div>
      </header>

      <Section n="01" title="The system">
        <p style={p}>A small warehouse ran its product list and staff login on software written over a decade ago. On the surface it worked. Underneath, it was a liability:</p>
        <div className="reveal" style={{ border: C.line, borderRadius: 14, background: C.bgElev, overflow: "hidden", marginTop: 4 }}>
          {["Built on a version of PHP removed from the internet in 2015 — one server update from going dark", "A login wide open to SQL injection — anyone could log in as the owner, or steal the customer database", "Passwords stored in plain text", "Code, layout, and database queries tangled together — impossible to change safely"].map((x, i) => (
            <div key={x} style={{ display: "flex", gap: 14, padding: "16px 22px", borderTop: i ? C.line : "none", fontSize: 15.5, color: C.text, lineHeight: 1.5, alignItems: "flex-start" }}>
              <span style={{ color: danger, marginTop: 1, flexShrink: 0 }}>→</span>{x}
            </div>
          ))}
        </div>
      </Section>

      <Section n="02" title="What the audit found">
        <p style={p}>The first step is always a free audit — a plain-English report of every risk, ranked by danger. Here's the summary:</p>
        <div className="reveal" style={{ border: C.line, borderRadius: 14, overflow: "hidden", marginTop: 4 }}>
          {[
            ["Runs on removed PHP version", "Critical", danger],
            ["SQL injection in login", "Critical", danger],
            ["Plain-text passwords", "High", warn],
            ["No separation of concerns", "Medium", warn],
          ].map(([l, sev, col], i) => (
            <div key={l as string} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "16px 22px", borderTop: i ? C.line : "none", background: C.bgElev, borderLeft: `2px solid ${col as string}` }}>
              <span style={{ color: C.text, fontSize: 15 }}>{l}</span>
              <span className="font-display" style={{ color: col as string, fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", border: `1px solid ${col as string}40`, background: `${col as string}14`, padding: "4px 11px", borderRadius: 999, whiteSpace: "nowrap" }}>{sev}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section n="03" title="The approach">
        <p style={p}>No risky big-bang rewrite. A disciplined, five-step loop that protects the business at every stage:</p>
        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
          {[
            ["Capture current behavior", "Automated tests record exactly what the system does today — the safety net for everything that follows."],
            ["Rebuild the engine", "A clean, modern, secure version is built — parameterized queries, hashed passwords, proper structure."],
            ["Prove nothing broke", "The original tests run against the new version. Every one must still pass."],
            ["Close the holes", "New tests prove the security flaws are gone for good."],
            ["Switch over safely", "Traffic moves to the new system gradually, with instant rollback. No downtime."],
          ].map(([t, d], i) => (
            <Spotlight key={t} style={{ display: "flex", gap: 18, border: C.line, borderRadius: 14, background: C.bgElev, padding: "20px 22px", alignItems: "flex-start" }}>
              <span className="font-display" style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 999, display: "grid", placeItems: "center", color: C.accent, fontSize: 15, fontWeight: 600, background: "rgba(167,139,250,0.1)", border: "1px solid var(--line-strong)" }}>{i + 1}</span>
              <div>
                <div className="font-display" style={{ color: C.text, fontSize: 16.5, fontWeight: 500, marginBottom: 4 }}>{t}</div>
                <div style={{ color: C.muted, fontSize: 15, lineHeight: 1.55 }}>{d}</div>
              </div>
            </Spotlight>
          ))}
        </div>
      </Section>

      <Section n="04" title="Proof: before → after">
        <p style={p}>The same checks run against the old and new systems. The business-facing behavior is identical — the security hole is closed.</p>
        <div className="reveal" style={{ border: C.line, borderRadius: 14, overflow: "hidden", marginTop: 4 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 84px 84px", background: C.bgElev }}>
            <Cell head>Check</Cell><Cell head center>Old</Cell><Cell head center>New</Cell>
            {[
              ["Products display correctly", true, true],
              ["Prices are correct", true, true],
              ["Real logins work", true, true],
              ["Wrong passwords rejected", true, true],
              ["SQL injection blocked", false, true],
            ].map(([l, o, nw]) => (
              <Row key={l as string} label={l as string} o={o as boolean} nw={nw as boolean} />
            ))}
          </div>
        </div>
        <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
          <Chip color={danger}>Old system — 4 / 5 · injection wide open</Chip>
          <Chip color={C.accent}>New system — 5 / 5 · breach provably closed</Chip>
        </div>
      </Section>

      <Section n="05" title="Zero-downtime cutover">
        <Spotlight className="reveal" style={{ border: C.lineStrong, borderRadius: 16, background: C.bgElev, padding: "30px 32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 120% at 100% 0%, rgba(124,58,237,0.12), transparent 60%)", pointerEvents: "none" }} />
          <p style={{ ...p, margin: 0, fontSize: 17, color: C.text, position: "relative" }}>
            The new system went live behind a traffic switch. Customers used one address the entire time; traffic
            moved from old to new behind the scenes, with a one-second rollback on standby. <span style={{ color: C.accent }}>Nobody using the system
            noticed a thing</span> — which is the whole point.
          </p>
        </Spotlight>
      </Section>

      {/* CTA */}
      <section style={{ borderTop: C.line, padding: "108px 0", position: "relative", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 80% at 50% 100%, rgba(124,58,237,0.16), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ ...wrap, position: "relative" }}>
          <h2 className="font-display reveal" style={{ fontSize: "clamp(30px,5vw,48px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
            Want to see what your system looks like?
          </h2>
          <p className="reveal" style={{ color: C.muted, fontSize: 17, lineHeight: 1.6, maxWidth: 480, margin: "0 auto 34px" }}>
            The audit is free and takes 48 hours. You'll get this same kind of clear report on your own software — no cost, no obligation.
          </p>
          <Link href="/#start" className="btn-primary reveal" style={{ background: C.accent, color: "var(--btn-text)", fontWeight: 600, fontSize: 16, padding: "16px 34px", borderRadius: 999, display: "inline-block" }}>Request your free audit →</Link>
        </div>
      </section>

      <footer style={{ borderTop: C.line, padding: "40px 0" }}>
        <div style={{ ...wrap, maxWidth: 1080, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span className="font-display" style={{ fontWeight: 600 }}>Revanio</span>
          <span style={{ color: C.dim, fontSize: 13.5 }}>Legacy software modernization · hello@revanio.com</span>
        </div>
      </footer>

      <style>{`
        .crumb { transition: border-color .2s ease, background .2s ease; }
        .crumb:hover { border-color: var(--text); background: rgba(255,255,255,0.08); }
        .crumb:hover .back-arrow { transform: translateX(-3px); }
        @media (max-width:680px){ .stat-grid{ grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </main>
  );
}

const p: React.CSSProperties = { color: "var(--muted)", fontSize: 16.5, lineHeight: 1.7, marginBottom: 20 };

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section style={{ borderBottom: "1px solid var(--line)", padding: "72px 0" }}>
      <div style={wrap}>
        <div className="reveal" style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 30 }}>
          <span className="font-display" style={{ fontSize: 13, color: "var(--accent)", letterSpacing: "0.05em" }}>{n}</span>
          <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
          <span style={{ fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{title}</span>
        </div>
        {children}
      </div>
    </section>
  );
}

function Chip({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--muted)", border: `1px solid ${color}40`, background: `${color}12`, padding: "8px 14px", borderRadius: 999 }}>
      <span style={{ width: 7, height: 7, borderRadius: 999, background: color, flexShrink: 0 }} />{children}
    </span>
  );
}

function Cell({ children, head, center }: { children: React.ReactNode; head?: boolean; center?: boolean }) {
  return <div style={{ padding: "14px 22px", fontSize: head ? 12 : 14, color: head ? "var(--muted)" : "var(--text)", textAlign: center ? "center" : "left", borderBottom: "1px solid var(--line)", fontWeight: head ? 600 : 400, letterSpacing: head ? "0.08em" : undefined, textTransform: head ? "uppercase" : undefined }}>{children}</div>;
}

function Row({ label, o, nw }: { label: string; o: boolean; nw: boolean }) {
  const mark = (v: boolean) => (
    <span style={{ display: "inline-grid", placeItems: "center", width: 24, height: 24, borderRadius: 999, fontSize: 13, fontWeight: 700, color: v ? "var(--accent)" : danger, background: v ? "rgba(167,139,250,0.12)" : "rgba(240,160,160,0.12)" }}>{v ? "✓" : "✗"}</span>
  );
  return (
    <>
      <div style={{ padding: "14px 22px", fontSize: 14.5, color: "var(--text)", borderBottom: "1px solid var(--line)" }}>{label}</div>
      <div style={{ padding: "10px 22px", display: "grid", placeItems: "center", borderBottom: "1px solid var(--line)" }}>{mark(o)}</div>
      <div style={{ padding: "10px 22px", display: "grid", placeItems: "center", borderBottom: "1px solid var(--line)" }}>{mark(nw)}</div>
    </>
  );
}
