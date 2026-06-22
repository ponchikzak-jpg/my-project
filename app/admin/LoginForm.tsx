"use client";

import { useState } from "react";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        const d = await res.json().catch(() => ({}));
        setErr(d.error || "Login failed.");
      }
    } catch {
      setErr("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const input: React.CSSProperties = {
    width: "100%", background: "var(--bg)", border: "1px solid var(--line-strong)", borderRadius: 10,
    padding: "12px 14px", color: "var(--text)", fontSize: 15, fontFamily: "inherit", outline: "none",
  };

  return (
    <div style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: "0 24px" }}>
      <form onSubmit={submit} style={{ width: "100%", maxWidth: 360, border: "1px solid var(--line-strong)", borderRadius: 16, background: "var(--bg-elev)", padding: 28, display: "flex", flexDirection: "column", gap: 14 }}>
        <div className="font-display" style={{ fontSize: 20, fontWeight: 500 }}>Admin sign-in</div>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.5, marginTop: -6 }}>Enter the admin password to view leads.</p>
        <input autoFocus type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={input} />
        {err && <div style={{ color: "#f0a0a0", fontSize: 13.5 }}>{err}</div>}
        <button type="submit" disabled={loading} className="btn-primary" style={{ background: "#ece9f6", color: "#150a2b", fontWeight: 600, fontSize: 15, padding: "13px", borderRadius: 999, border: "none", cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
