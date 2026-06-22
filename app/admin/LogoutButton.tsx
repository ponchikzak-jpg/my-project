"use client";

export default function LogoutButton() {
  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.reload();
  }
  return (
    <button onClick={logout} style={{ fontSize: 13.5, color: "var(--text)", border: "1px solid var(--line-strong)", background: "transparent", padding: "8px 16px", borderRadius: 999, cursor: "pointer" }}>
      Sign out
    </button>
  );
}
