"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { languageOptions, languagePaths, localeForPath } from "@/data/locales";
import { cars } from "@/data/site";
import { useConsultation } from "./ConsultationProvider";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = localeForPath(pathname);
  const paths = languagePaths(pathname);
  const activeLanguage = languageOptions.find((option) => option.locale === locale)!;
  const label = { "zh-TW": "切換語言", en: "Change language", ja: "言語を切り替える", ko: "언어 변경" }[locale];
  const { form } = useConsultation();
  const [open, setOpen] = useState(false);
  const [suffix, setSuffix] = useState("");
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return <div ref={container} className="relative shrink-0" onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
  }}>
    <button ref={trigger} type="button" aria-label={label} aria-expanded={open} aria-controls={id}
      className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full border border-[#ddd] bg-white px-2.5 text-xs font-semibold text-[#444] transition hover:border-[#b9000e] hover:text-[#b9000e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b9000e] sm:text-sm"
      onClick={() => {
        const search = new URLSearchParams(window.location.search);
        // A model edited in the form is newer than the initial prefill URL.
        // Reflect it in the translated URL so remounting cannot restore stale intent.
        if (paths?.["zh-TW"] === "/" && search.has("car")) {
          const selected = cars.find((car) => car.name === form.car);
          if (selected) search.set("car", selected.id);
          else search.delete("car");
        }
        // Keep only sections shared by all four languages.
        const sharedAnchors = paths?.["zh-TW"] === "/"
          ? ["#cars", "#contact", "#faq"]
          : paths?.["zh-TW"].startsWith("/cars/") ? ["#pricing", "#specifications", "#test-drive"] : [];
        const hash = sharedAnchors.includes(window.location.hash) ? window.location.hash : "";
        setSuffix(paths ? (search.size ? `?${search}` : "") + hash : "");
        setOpen(!open);
      }}>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z" /></svg>
      <span>{activeLanguage.badge}</span>
      <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-2.5 w-2.5"><path d="m3 4.5 3 3 3-3" /></svg>
    </button>
    {open && <div id={id} className="absolute right-0 top-full z-50 mt-2 min-w-44 rounded-xl border border-[#e5e5e5] bg-white p-1.5 text-sm text-[#333] shadow-lg">
      {languageOptions.map((option) => <Link key={option.locale}
        href={paths ? paths[option.locale] + suffix : option.locale === "zh-TW" ? pathname : `/${option.locale}`}
        lang={option.locale} hrefLang={option.locale} aria-current={locale === option.locale ? "page" : undefined}
        onClick={() => setOpen(false)} className="flex min-h-11 items-center justify-between gap-4 rounded-lg px-3 hover:bg-[#f5f5f5] focus-visible:outline-2 focus-visible:outline-[#b9000e]">
        {option.name} {locale === option.locale && <span aria-hidden="true">✓</span>}
      </Link>)}
      {!paths && <p className="px-3 pb-2 pt-1 text-xs leading-5 text-[#666]">此頁目前僅提供繁體中文；其他語言將前往對應首頁。</p>}
    </div>}
  </div>;
}
