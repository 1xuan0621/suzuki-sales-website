"use client";

import { translator } from "@/data/translations";
import type { ForeignLocale } from "@/data/locales";
import { budgetRanges, cars, dealer, usageOptions } from "@/data/site";
import { useConsultation } from "./ConsultationProvider";

const usageLabels: Record<(typeof usageOptions)[number], string> = {
  "市區通勤代步": "City driving and commuting",
  "家庭出遊": "Family trips",
  "戶外露營／越野": "Camping and off-road driving",
  "商用載貨": "Business and cargo",
  "第一台車": "My first car",
  "換車升級": "Replacing or upgrading my car",
  "其他": "Other",
};

const budgetLabels: Record<(typeof budgetRanges)[number], string> = {
  "50 萬以下": "Under NT$500,000",
  "50-70 萬": "NT$500,000–700,000",
  "70-90 萬": "NT$700,000–900,000",
  "90-120 萬": "NT$900,000–1,200,000",
  "120 萬以上": "Over NT$1,200,000",
  "還不確定": "Not sure yet",
};

const fieldClass = "min-w-0 w-full min-h-12 rounded-lg border border-[#d9d9d9] bg-white px-3 py-3 font-normal text-[#444] outline-none transition-all focus:border-[#e60012] focus:ring-2 focus:ring-[rgba(230,0,18,0.18)]";
const labelClass = "grid min-w-0 gap-1.5 font-bold";

export default function LocalizedConsultation({ locale }: { locale: ForeignLocale }) {
  const t = translator(locale);
  const { form, update, submitted, formError, website, setWebsite, sending, handleSubmit } = useConsultation();

  return <section id="contact" aria-labelledby="contact-heading" data-entry="contact" data-car-id={cars.find((car) => car.name === form.car)?.id} className="mt-10 scroll-mt-6 rounded-[18px] border border-[#e7e7e7] bg-white p-5 shadow-[0_12px_30px_rgba(20,20,20,0.06)] sm:p-8">
    <p className="text-sm font-bold text-[#b9000e]">{t("LET'S TALK")}</p>
    <h2 id="contact-heading" tabIndex={-1} className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">{t("Tell me what you're looking for")}</h2>
    <p className="mt-3 max-w-2xl leading-7 text-[#666]">{t("Ask about a model, a quote or a test drive in Beitou. Leave your details and I'll get back to you.")}</p>

    {submitted ? <div role="status" className="space-y-3 py-8 text-center">
      <div aria-hidden="true" className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e60012] text-3xl font-bold text-white">✓</div>
      <h3 className="text-2xl font-bold">{t("Your request has been received")}</h3>
      <p className="text-[#666]">{t("I'll contact you as soon as possible. You can also message me on LINE.")}</p>
      <p className="text-sm text-[#666]">{t("A test drive is booked only after your appointment is confirmed.")}</p>
      <a href={`https://line.me/R/ti/p/~${dealer.line}`} target="_blank" rel="noopener noreferrer" className="inline-block py-2 font-bold text-[#087b3a] underline underline-offset-4">{t("Chat on LINE")}</a>
    </div> : <form onSubmit={handleSubmit} aria-busy={sending} className="mt-6">
      <fieldset disabled={sending} className="grid min-w-0 gap-5 sm:grid-cols-2">
        <div className="hidden" aria-hidden="true">
          <label>{t("Website")}<input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
        </div>
        <label className={labelClass}>
          <span>{t("Name")}{" "}<span aria-hidden="true" className="text-xs font-normal text-[#666]">{t("Required")}</span></span>
          <input required maxLength={50} autoComplete="name" value={form.name} onChange={(event) => { event.target.setCustomValidity(""); update("name", event.target.value); }} onInvalid={(event) => event.currentTarget.setCustomValidity(t("Please enter your name."))} placeholder={t("Your name")} className={fieldClass} />
        </label>
        <label className={labelClass}>
          <span>{t("Taiwan mobile number")}{" "}<span aria-hidden="true" className="text-xs font-normal text-[#666]">{t("Required")}</span></span>
          <input required maxLength={30} autoComplete="tel" type="tel" inputMode="tel" value={form.contact} aria-describedby="contact-phone-hint" onChange={(event) => { event.target.setCustomValidity(""); update("contact", event.target.value); }} onInvalid={(event) => event.currentTarget.setCustomValidity(t("Please enter your Taiwan mobile number."))} placeholder={t("09xxxxxxxx or +8869xxxxxxxx")} className={fieldClass} />
        </label>
        <p id="contact-phone-hint" className="-mt-2 text-sm leading-6 text-[#666] sm:col-span-2">{t("Use a Taiwan mobile number beginning with 09 (or +8869). If you don't have one,")}{" "}<a href={`https://line.me/R/ti/p/~${dealer.line}`} target="_blank" rel="noopener noreferrer" className="font-bold text-[#087b3a] underline underline-offset-4">{t("contact me on LINE")}</a>.</p>
        <label className={labelClass}>
          <span>{t("Model of interest")}{" "}<span aria-hidden="true" className="text-xs font-normal text-[#666]">{t("Optional")}</span></span>
          <select value={form.car} onChange={(event) => update("car", event.target.value)} className={fieldClass}>
            <option value="">{t("Choose a model")}</option>
            {cars.map((car) => <option key={car.id} value={car.name}>{car.name}</option>)}
            <option value="還不確定">{t("Not sure yet")}</option>
          </select>
        </label>
        <label className={labelClass}>
          <span>{t("Main use")}{" "}<span aria-hidden="true" className="text-xs font-normal text-[#666]">{t("Optional")}</span></span>
          <select value={form.usage} onChange={(event) => update("usage", event.target.value)} className={fieldClass}>
            <option value="">{t("Choose a main use")}</option>
            {usageOptions.map((usage) => <option key={usage} value={usage}>{t(usageLabels[usage])}</option>)}
          </select>
        </label>
        <label className={labelClass}>
          <span>{t("Budget")}{" "}<span aria-hidden="true" className="text-xs font-normal text-[#666]">{t("Optional")}</span></span>
          <select value={form.budget} onChange={(event) => update("budget", event.target.value)} className={fieldClass}>
            <option value="">{t("Choose a budget")}</option>
            {budgetRanges.map((budget) => <option key={budget} value={budget}>{t(budgetLabels[budget])}</option>)}
          </select>
        </label>
        <p className="text-xs leading-6 text-[#666] sm:col-span-2">{t("Your details are used only for your car enquiry and follow-up. You can ask to correct or delete them through LINE.")}</p>
        {formError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm leading-6 text-[#b9000e] sm:col-span-2">{formError}</p>}
        <button type="submit" disabled={sending} className="min-h-14 w-full rounded-xl bg-[#e60012] px-4 py-3 text-lg font-bold text-white transition-colors hover:bg-[#b9000e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9000e] disabled:opacity-50 sm:col-span-2">{t(sending ? "Sending…" : "Send my request")}</button>
      </fieldset>
    </form>}
  </section>;
}
