import Link from "next/link";
import { isAuthed } from "../../lib/auth";
import { supabaseAdmin, type Lead } from "../../lib/supabase";
import LoginForm from "./LoginForm";
import LogoutButton from "./LogoutButton";

export const metadata = { title: "Admin — Leads", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const wrap: React.CSSProperties = { maxWidth: 1080, margin: "0 auto", padding: "0 32px" };

export default async function Admin() {
  if (!(await isAuthed())) {
    return (
      <main style={{ position: "relative", zIndex: 2 }}>
        <LoginForm />
      </main>
    );
  }

  let leads: Lead[] = [];
  let loadError = "";
  try {
    const { data, error } = await supabaseAdmin()
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    leads = (data as Lead[]) ?? [];
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Failed to load leads.";
  }

  return (
    <main style={{ position: "relative", zIndex: 2, padding: "48px 0 100px" }}>
      <div style={wrap}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
          <div>
            <h1 className="font-display" style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em" }}>Leads</h1>
            <p style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 4 }}>{leads.length} total · newest first</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/" style={{ fontSize: 13.5, color: "var(--muted)", border: "1px solid var(--line)", padding: "8px 16px", borderRadius: 999 }}>← Site</Link>
            <LogoutButton />
          </div>
        </div>

        {loadError ? (
          <div style={{ border: "1px solid #f0a0a040", background: "#f0a0a012", borderRadius: 12, padding: "18px 22px", color: "#f0a0a0", fontSize: 14.5 }}>
            Couldn&apos;t load leads: {loadError}
          </div>
        ) : leads.length === 0 ? (
          <div style={{ border: "1px solid var(--line)", borderRadius: 14, background: "var(--bg-elev)", padding: "48px 24px", textAlign: "center", color: "var(--muted)" }}>
            No leads yet. Submissions from the audit form will appear here.
          </div>
        ) : (
          <div style={{ border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden", background: "var(--bg-elev)" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ textAlign: "left", color: "var(--muted)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    <Th>Received</Th><Th>Name</Th><Th>Company</Th><Th>Email</Th><Th>Message</Th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} style={{ borderTop: "1px solid var(--line)", verticalAlign: "top" }}>
                      <Td muted nowrap>{fmt(l.created_at)}</Td>
                      <Td>{l.name}</Td>
                      <Td muted>{l.company || "—"}</Td>
                      <Td><a href={`mailto:${l.email}`} style={{ color: "var(--accent)" }}>{l.email}</a></Td>
                      <Td muted style={{ maxWidth: 360, whiteSpace: "pre-wrap" }}>{l.message || "—"}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function fmt(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}

function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ padding: "14px 18px", fontWeight: 600 }}>{children}</th>;
}
function Td({ children, muted, nowrap, style }: { children: React.ReactNode; muted?: boolean; nowrap?: boolean; style?: React.CSSProperties }) {
  return <td style={{ padding: "14px 18px", color: muted ? "var(--muted)" : "var(--text)", whiteSpace: nowrap ? "nowrap" : undefined, lineHeight: 1.5, ...style }}>{children}</td>;
}
