// Lead emails via Resend: an internal "new lead" alert to the founder, and a
// thank-you auto-reply to the lead. Both no-op silently if RESEND_API_KEY isn't
// configured, so lead capture never depends on email being set up.

type LeadInput = { name: string; company: string; email: string; message: string };

const esc = (s: string) => s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));

async function send(payload: Record<string, unknown>, label: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // email not configured yet — skip quietly
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) console.error(`${label} failed:`, res.status, await res.text());
  } catch (e) {
    console.error(`${label} error:`, e);
  }
}

// Internal alert to the founder.
export async function notifyNewLead(lead: LeadInput) {
  const to = process.env.LEAD_NOTIFY_EMAIL || "ponchikzak@gmail.com";
  const from = process.env.LEAD_FROM_EMAIL || "Revanio Leads <onboarding@resend.dev>";
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
  await send({ from, to: [to], reply_to: lead.email, subject: `New lead: ${lead.name}${lead.company ? ` · ${lead.company}` : ""}`, html }, "lead notification");
}

// Thank-you auto-reply to the lead.
export async function sendLeadAutoReply(lead: LeadInput) {
  const from = process.env.LEAD_FROM_EMAIL || "Revanio <onboarding@resend.dev>";
  const replyTo = process.env.LEAD_NOTIFY_EMAIL || "ponchikzak@gmail.com";
  const firstName = esc(lead.name.trim().split(/\s+/)[0] || "there");
  const html = `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;font-size:15.5px;color:#1a1a1a;line-height:1.65;max-width:520px">
      <p>Hi ${firstName},</p>
      <p>Thanks for reaching out to <strong>Revanio</strong> — I've got your request and I'll personally review your software and reply within one business day.</p>
      <p>In the meantime, if anything urgent comes up, just reply to this email and it'll come straight to me.</p>
      <p style="margin-top:22px">Talk soon,<br>Dave<br><span style="color:#888">Founder, Revanio</span></p>
      <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
      <p style="color:#999;font-size:12.5px">Revanio · Legacy software modernization · https://revanio.com</p>
    </div>`;
  await send({ from, to: [lead.email], reply_to: replyTo, subject: "Thanks — I've got your request (Revanio)", html }, "lead auto-reply");
}
