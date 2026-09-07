import { get, put } from "@vercel/blob";
import type { StoredConsultation } from "./consultation";

export async function saveConsultation(record: StoredConsultation) {
  const pathname = `consultations/${record.requestId}.json`;
  try {
    await put(pathname, JSON.stringify(record), {
      access: "private", addRandomSuffix: false, allowOverwrite: false,
      contentType: "application/json", abortSignal: AbortSignal.timeout(8000),
    });
    return { created: true, record };
  } catch (error) {
    // A failed response can also mean a timed-out write actually succeeded.
    // Read the immutable receipt before deciding whether a retry is safe.
    const existing = await get(pathname, { access: "private", useCache: false, abortSignal: AbortSignal.timeout(8000) });
    if (!existing || existing.statusCode !== 200) throw error;
    const saved = await new Response(existing.stream).json() as StoredConsultation;
    return { created: false, record: saved };
  }
}
