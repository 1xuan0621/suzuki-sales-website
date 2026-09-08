"use client";

import { createContext, useCallback, useContext, useRef, useState, type FormEvent, type ReactNode } from "react";
import { cars } from "@/data/site";
import { trackLead } from "@/lib/analytics";

type Form = { name: string; contact: string; car: string; usage: string; budget: string };
function useConsultationState() {
  const [form, setForm] = useState<Form>({ name: "", contact: "", car: "", usage: "", budget: "" });
  const draft = useRef(form);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [receipt, setReceipt] = useState("");
  const [website, setWebsite] = useState("");
  const requestId = useRef("");
  const sendingRef = useRef(false);
  const [sending, setSending] = useState(false);

  const update = useCallback((field: keyof Form, value: string) => {
    if (sendingRef.current || draft.current[field] === value) return;
    draft.current = { ...draft.current, [field]: value };
    setForm(draft.current);
    requestId.current = "";
    setFormError("");
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
    setFormError("");
    const values = { ...draft.current };
    try {
      requestId.current ||= crypto.randomUUID();
      const submittedId = requestId.current;
      const res = await fetch("/api/notify", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website, requestId: submittedId }),
        signal: AbortSignal.timeout(25000),
      });
      if (res.status === 429) throw new Error("送出次數較多，請 10 分鐘後重試，或直接使用 LINE 聯絡。");
      const result = await res.json();
      if (!res.ok || result.ok !== true || result.receipt !== submittedId) {
        if (res.status === 409) requestId.current = "";
        throw new Error(typeof result.error === "string" ? result.error : "暫時無法確認收件，請稍後重試或使用 LINE 聯絡。");
      }
      setReceipt(result.receipt);
      setSubmitted(true);
      trackLead(submittedId, cars.find((car) => car.name === values.car)?.id);
    } catch (error) {
      setFormError(error instanceof Error && error.name === "Error"
        ? error.message : "連線中斷，暫時無法確認收件。資料仍保留在表單，請重試或使用 LINE 聯絡。");
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };
  return { form, update, submitted, formError, receipt, website, setWebsite, sending, handleSubmit, beginConsultation };
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
