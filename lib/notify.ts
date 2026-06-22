// Sends a "new lead" notification email via Resend.
// No-ops silently if RESEND_API_KEY isn't configured, so lead capture
// never depends on email being set up.

type LeadInput = { name: string; company: string; email: string; message: string };

export async function notifyNewLead(lead: LeadInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // email not configured yet — skip quietly

  const to = process.env.LEAD_NOTIFY_EMAIL || "ponchikzak@gmail.com";
  const from = process.env.LEAD_FROM_EMAIL || "Revanio Leads <onboarding@resend.dev>";

  const esc = (s: string) => s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));
  const html = `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;font-size:15px;color:#1a1a1a;line-height:1.6">
      <h2 style="margin:0 0 12px">New audit request</h2>
      <p><strong>Name:</strong> ${esc(lead.name)}</p>
      <p><strong>Company:</strong> ${esc(lead.company || "—")}</p>
      <p><strong>Email:</strong> <a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a></p>
      <p><strong>Message:</strong><br>${esc(lead.message || "—").replace(/\n/g, "<br>")}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:18px 0">
      <p style="color:#888;font-size:13px">View all leads at https://revanio.com/admin</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `New lead: ${lead.name}${lead.company ? ` · ${lead.company}` : ""}`,
        html,
      }),
    });
    if (!res.ok) console.error("lead notification failed:", res.status, await res.text());
  } catch (e) {
    console.error("lead notification error:", e);
  }
}
