"use client";

import { createContext, useCallback, useContext, useRef, useState, type FormEvent, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cars } from "@/data/site";
import { trackLead } from "@/lib/analytics";

type Form = { name: string; contact: string; car: string; usage: string; budget: string };
type SubmissionError = { message: string; englishMessage: string };
const unconfirmedEnglish = "We could not confirm receipt. Your details are still in the form. Please try again or contact the advisor on LINE.";

function responseErrorInEnglish(status: number) {
  switch (status) {
    case 400: return "Please check your name, Taiwan mobile number and selected options.";
    case 403: return "Please submit your request from this website. Refresh the page or contact the advisor on LINE.";
    case 409: return "We could not submit this request. Please try again or contact the advisor on LINE.";
    case 413: return "Your request is too long. Please shorten your details and try again.";
    case 415: return "We could not read this request. Please refresh the page or contact the advisor on LINE.";
    default: return unconfirmedEnglish;
  }
}

function useConsultationState() {
  const pathname = usePathname();
  const english = pathname === "/en" || pathname.startsWith("/en/");
  const [form, setForm] = useState<Form>({ name: "", contact: "", car: "", usage: "", budget: "" });
  const draft = useRef(form);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<SubmissionError | null>(null);
  const formError = submissionError ? (english ? submissionError.englishMessage : submissionError.message) : "";
  const [website, setWebsite] = useState("");
  const requestId = useRef("");
  const sendingRef = useRef(false);
  const [sending, setSending] = useState(false);

  const update = useCallback((field: keyof Form, value: string) => {
    if (sendingRef.current || draft.current[field] === value) return;
    draft.current = { ...draft.current, [field]: value };
    setForm(draft.current);
    requestId.current = "";
    setSubmissionError(null);
    setSubmitted(false);
  }, []);

  const beginConsultation = useCallback((carName?: string) => {
    if (sendingRef.current) return;
    if (carName) update("car", carName);
    setSubmitted(false);
  }, [update]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (sendingRef.current) return;
    sendingRef.current = true;
    setSending(true);
    setSubmissionError(null);
    const values = { ...draft.current };
    try {
      requestId.current ||= crypto.randomUUID();
      const submittedId = requestId.current;
      const res = await fetch("/api/notify", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website, requestId: submittedId }),
        signal: AbortSignal.timeout(25000),
      });
      if (res.status === 429) {
        setSubmissionError({
          message: "送出次數較多，請 10 分鐘後重試，或直接使用 LINE 聯絡。",
          englishMessage: "Too many requests. Please try again in 10 minutes or contact the advisor on LINE.",
        });
        return;
      }
      const result = await res.json();
      if (!res.ok || result.ok !== true || result.receipt !== submittedId) {
        if (res.status === 409) requestId.current = "";
        setSubmissionError({
          message: typeof result.error === "string" ? result.error : "暫時無法確認收件，請稍後重試或使用 LINE 聯絡。",
          englishMessage: responseErrorInEnglish(res.status),
        });
        return;
      }
      setSubmitted(true);
      trackLead(submittedId, cars.find((car) => car.name === values.car)?.id);
    } catch (error) {
      setSubmissionError({
        message: error instanceof Error && error.name === "Error"
          ? error.message : "連線中斷，暫時無法確認收件。資料仍保留在表單，請重試或使用 LINE 聯絡。",
        englishMessage: `The connection was interrupted. ${unconfirmedEnglish}`,
      });
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };
  return { form, update, submitted, formError, website, setWebsite, sending, handleSubmit, beginConsultation };
}

const ConsultationContext = createContext<ReturnType<typeof useConsultationState> | null>(null);
export default function ConsultationProvider({ children }: { children: ReactNode }) {
  const state = useConsultationState();
  return <ConsultationContext.Provider value={state}>{children}</ConsultationContext.Provider>;
}
export function useConsultation() {
  const value = useContext(ConsultationContext);
  if (!value) throw new Error("ConsultationProvider is required");
  return value;
}
