import { put } from "@vercel/blob";
import type { StoredConsultation } from "./consultation";

type DeliveryStatus = "confirmed" | "unconfirmed" | "failed" | "not_configured";

// Prevent formula interpretation in the existing spreadsheet receiver.
export function spreadsheetValue(value: string) {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}

export async function sendDiscord(record: StoredConsultation, endpoint: string | undefined, send = fetch): Promise<DeliveryStatus> {
  if (!endpoint) return "not_configured";
  try {
    const url = new URL(endpoint);
    if (url.origin !== "https://discord.com" || !url.pathname.startsWith("/api/webhooks/")) return "failed";
    url.searchParams.set("wait", "true");
    const res = await send(url, {
      method: "POST", headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(6000),
      body: JSON.stringify({
        allowed_mentions: { parse: [] },
        embeds: [{
          title: "📩 新購車諮詢", color: 0xe60012,
          fields: [
            { name: "姓名", value: record.name, inline: true },
            { name: "聯絡方式", value: record.contact, inline: true },
            { name: "想了解車款", value: record.car || "（未選）", inline: true },
            { name: "購車用途", value: record.usage || "（未選）", inline: true },
            { name: "預算區間", value: record.budget || "（未選）", inline: true },
            { name: "案件編號", value: record.requestId },
          ],
          footer: { text: `收到時間：${new Date(record.receivedAt).toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })}` },
        }],
      }),
    });
    if (!res.ok) return "failed";
    const message = await res.json();
    return typeof message.id === "string" ? "confirmed" : "unconfirmed";
  } catch { return "unconfirmed"; }
}

export async function sendSpreadsheet(record: StoredConsultation, endpoint: string | undefined, send = fetch): Promise<DeliveryStatus> {
  if (!endpoint) return "not_configured";
  try {
    const url = new URL(endpoint);
    if (url.origin !== "https://script.google.com" || !url.pathname.startsWith("/macros/s/")) return "failed";
    const res = await send(url, {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(6000),
      body: new URLSearchParams({
        name: spreadsheetValue(record.name), contact: spreadsheetValue(record.contact),
        car: record.car, usage: record.usage, budget: record.budget,
        timestamp: record.receivedAt, requestId: record.requestId,
      }),
    });
    if (!res.ok) return "failed";
    // A Google login/error HTML page with HTTP 200 is not a write acknowledgment.
    const result = await res.json();
    return result.ok === true || result.success === true || result.result === "success" ? "confirmed" : "unconfirmed";
  } catch { return "unconfirmed"; }
}

export async function deliverConsultation(record: StoredConsultation) {
  const [discord, spreadsheet] = await Promise.all([
    sendDiscord(record, process.env.DISCORD_WEBHOOK_URL),
    sendSpreadsheet(record, process.env.GOOGLE_SHEETS_WEBHOOK_URL),
  ]);
  await put(`delivery/${record.requestId}.json`, JSON.stringify({
    requestId: record.requestId, attemptedAt: new Date().toISOString(), discord, spreadsheet,
  }), {
    access: "private", addRandomSuffix: false, allowOverwrite: false,
    contentType: "application/json", abortSignal: AbortSignal.timeout(6000),
  });
  if (discord !== "confirmed" || spreadsheet !== "confirmed") {
    console.error("consultation_delivery_pending", { requestId: record.requestId, discord, spreadsheet });
  }
}
