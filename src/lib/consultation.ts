import { createHash } from "node:crypto";
import { budgetRanges, cars, usageOptions } from "../data/site";

export interface Consultation {
  requestId: string;
  name: string;
  contact: string;
  car: string;
  usage: string;
  budget: string;
}

export interface StoredConsultation extends Consultation {
  receivedAt: string;
  fingerprint: string;
}

export interface ConsultationDependencies {
  allowedOrigins: string[];
  save: (record: StoredConsultation) => Promise<{ created: boolean; record: StoredConsultation }>;
  deliver: (record: StoredConsultation) => Promise<void>;
}

export function validateConsultation(value: unknown): Consultation | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  if (body.website !== undefined && body.website !== "") return null;
  const keys = ["requestId", "name", "contact", "car", "usage", "budget"] as const;
  if (keys.some((key) => typeof body[key] !== "string")) return null;
  const data = Object.fromEntries(keys.map((key) => [key, (body[key] as string).trim()])) as unknown as Consultation;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.requestId)) return null;
  if (!data.name || data.name.length > 50 || /[\u0000-\u001f\u007f]/.test(data.name)) return null;
  if (data.contact.length > 30 || !/^[+\d ()-]+$/.test(data.contact)) return null;
  data.contact = data.contact.replace(/[ ()-]/g, "").replace(/^\+886/, "0");
  if (!/^09\d{8}$/.test(data.contact)) return null;
  if (!["", "還不確定", "Jimny", "THE NEW Jimny", ...cars.map((car) => car.name)].includes(data.car)) return null;
  if (!["", ...usageOptions].includes(data.usage) || !["", ...budgetRanges].includes(data.budget)) return null;
  data.requestId = data.requestId.toLowerCase();
  return data;
}

function response(status: number, body: object) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

// Check actual streamed bytes as well as Content-Length so chunked requests are bounded.
async function readJson(request: Request): Promise<unknown> {
  const limit = 4096;
  if (Number(request.headers.get("content-length")) > limit) throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError();
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel(); throw new RangeError(); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export function createConsultationHandler(deps: ConsultationDependencies) {
  return async (request: Request): Promise<Response> => {
    if (!deps.allowedOrigins.includes(request.headers.get("origin") || "")) {
      return response(403, { ok: false, error: "請從網站表單送出需求。" });
    }
    if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
      return response(415, { ok: false, error: "不支援的資料格式。" });
    }
    let value: unknown;
    try { value = await readJson(request); }
    catch (error) {
      return response(error instanceof RangeError ? 413 : 400, { ok: false, error: "資料格式或長度不正確。" });
    }
    const data = validateConsultation(value);
    if (!data) return response(400, { ok: false, error: "請確認姓名、台灣手機號碼與選擇項目。" });
    const fingerprint = createHash("sha256").update(JSON.stringify(data)).digest("hex");
    const record = { ...data, fingerprint, receivedAt: new Date().toISOString() };

    try {
      const saved = await deps.save(record);
      if (saved.record.fingerprint !== fingerprint) {
        return response(409, { ok: false, error: "此案件編號已使用，請重新整理後再試。" });
      }
      // Only the atomic create winner delivers. Concurrent retries and later deployments reuse the receipt.
      if (saved.created) {
        try { await deps.deliver(saved.record); }
        catch { console.error("consultation_delivery_pending", { requestId: data.requestId }); }
      }
      return response(200, { ok: true, receipt: data.requestId });
    } catch {
      // No raw errors, request bodies, tokens or contact details in logs.
      console.error("consultation_storage_failed", { requestId: data.requestId });
      return response(503, { ok: false, error: "暫時無法確認收件，資料仍保留在表單，請稍後重試或使用 LINE 聯絡。" });
    }
  };
}
