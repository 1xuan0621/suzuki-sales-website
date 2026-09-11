import { after } from "next/server";
import { createConsultationHandler } from "@/lib/consultation";
import { saveConsultation } from "@/lib/consultation-storage";
import { deliverConsultation } from "@/lib/consultation-delivery";

export const runtime = "nodejs";
export const maxDuration = 30;

export const POST = createConsultationHandler({
  allowedOrigins: [
    "https://suzuki-taipei.com",
    "https://www.suzuki-taipei.com",
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000", "http://127.0.0.1:3000"] : []),
  ],
  save: saveConsultation,
  deliver: deliverConsultation,
  afterResponse: after,
});
