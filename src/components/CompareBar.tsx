"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useModalDialog } from "@/lib/use-modal-dialog";
import { useCompare } from "./CarCompareProvider";
import { dealer, type Car } from "@/data/site";
import { carVersions } from "@/data/content";
import { englishCars } from "@/data/english";
import type { SiteLocale } from "@/data/locales";
import { translator } from "@/data/translations";
import { ContactIcon } from "./ContactLinks";

const historyKey = "suzukiCarComparison";
const labels = {
  "zh-TW": { title: "車款比較", compare: "查看比較", close: "關閉比較", item: "比較項目", limit: "最多 3 台", full: "已選滿 3 台，先移除一台再加入", missingNote: "— 表示目前未提供此項比較資料。" },
  en: { title: "Compare models", compare: "Compare", close: "Close comparison", item: "Item", limit: "Up to 3 models", full: "3 selected. Remove one to add another.", missingNote: "— means this comparison detail is not currently available." },
  ja: { title: "車種比較", compare: "比較を見る", close: "比較を閉じる", item: "比較項目", limit: "3 台まで", full: "3 台選択済み。追加するには 1 台を削除してください。", missingNote: "— は、この項目の比較情報を現在掲載していないことを示します。" },
  ko: { title: "차종 비교", compare: "비교 보기", close: "비교 닫기", item: "비교 항목", limit: "최대 3개 차종", full: "3개 선택됨. 추가하려면 1개를 제외하세요.", missingNote: "— 는 현재 해당 항목의 비교 정보를 제공하지 않음을 뜻합니다." },
};

function hasComparisonEntry() {
  return window.history.state?.[historyKey] === window.location.href;
}

function CompareModal({ cars, locale, onClose }: { cars: Car[]; locale: SiteLocale; onClose: () => void }) {
  const dialog = useModalDialog();
  const copy = labels[locale];
  const t = translator(locale);
  const chinese = locale === "zh-TW";
  const specification = (car: Car, pattern: RegExp) => car.detail.specs.find((spec) => pattern.test(spec)) || "—";
  const rows: { label: string; values: (car: Car) => string[]; price?: boolean }[] = chinese ? [
    { label: "建議起價", values: (car) => [car.price], price: true },
    { label: "車身尺寸（長 × 寬 × 高）", values: (car) => [specification(car, /^尺寸/)] },
    { label: "行李箱／載物", values: (car) => [specification(car, /行李廂|行李箱|後座傾倒|載重|貨台/)] },
    { label: "引擎／動力", values: (car) => [car.detail.specs[0] || "—"] },
    { label: "馬力", values: (car) => [specification(car, /馬力|PS/i)] },
    { label: "油耗／續航", values: (car) => [specification(car, /油耗|續航里程/)] },
    { label: "適合誰", values: (car) => [car.detail.whoFor] },
  ] : [
    { label: t("Starting price"), values: (car) => [`NT$ ${carVersions(car.id)[0].priceTwd.toLocaleString("en-US")}`], price: true },
    { label: t("Highlights"), values: (car) => englishCars[car.id].highlights.map((highlight) => t(highlight)) },
  ];

  return <dialog
    ref={dialog}
    className="fixed inset-0 m-0 flex h-dvh max-h-none w-full max-w-none items-center justify-center border-0 bg-black/50 p-3 text-[#333] backdrop:bg-transparent sm:p-4"
    onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    aria-label={copy.title}
  >
    <div className="flex max-h-[90dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-[0_26px_80px_rgba(0,0,0,0.35)]" onClick={(event) => event.stopPropagation()}>
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#ddd] px-4 py-3 sm:px-6">
        <h2 className="text-xl font-extrabold text-[#202020]">{copy.title}</h2>
        <button data-dialog-initial-focus type="button" onClick={onClose} className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full bg-[#f0f0f0] text-xl text-[#555] hover:bg-[#e0e0e0]" aria-label={copy.close}>✕</button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6" tabIndex={0} role="region" aria-label={copy.title}>
        <div className="space-y-5 md:hidden">
          {rows.map((row) => <section key={row.label} className="overflow-hidden rounded-xl border border-[#ddd]">
            <h3 className="bg-[#f5f5f5] px-4 py-3 text-base font-bold text-[#333]">{row.label}</h3>
            <dl className="divide-y divide-[#eee] px-4">
              {cars.map((car) => <div key={car.id} className="py-3">
                <dt className="text-sm font-bold text-[#333]">{car.name}</dt>
                <dd className={`mt-1 space-y-1 text-[15px] leading-7 ${row.price ? "font-bold text-[#b9000e]" : "text-[#555]"}`}>{row.values(car).map((value) => <p key={value}>{value}</p>)}</dd>
              </div>)}
            </dl>
          </section>)}
        </div>
        <table className="hidden w-full table-fixed border-collapse text-left md:table">
          <caption className="sr-only">{copy.title}</caption>
          <thead><tr>
            <th scope="col" className="sticky top-0 w-[18%] border-b-2 border-[#b9000e] bg-white pb-3 pr-4 text-sm font-bold text-[#555]">{copy.item}</th>
            {cars.map((car) => <th key={car.id} scope="col" className="sticky top-0 border-b-2 border-[#b9000e] bg-white px-3 pb-3 text-lg font-bold text-[#202020]">
              {car.name}<span className="mt-1 block text-sm font-normal leading-6 text-[#666]">{chinese ? car.subtitle : t(englishCars[car.id].subtitle)}</span>
            </th>)}
          </tr></thead>
          <tbody>{rows.map((row) => <tr key={row.label}>
            <th scope="row" className="border-b border-[#eee] py-4 pr-4 align-top text-sm font-bold leading-7 text-[#555]">{row.label}</th>
            {cars.map((car) => <td key={car.id} className={`border-b border-[#eee] px-3 py-4 align-top text-[15px] leading-7 ${row.price ? "font-bold text-[#b9000e]" : "text-[#555]"}`}>
              {row.values(car).map((value) => <p key={value}>{value}</p>)}
            </td>)}
          </tr>)}</tbody>
        </table>
        {rows.some((row) => cars.some((car) => row.values(car).includes("—"))) && <p className="mt-4 text-sm leading-6 text-[#666]">{copy.missingNote}</p>}
      </div>
      <div className="flex shrink-0 justify-end border-t border-[#ddd] px-4 py-3 sm:px-6">
        <button type="button" onClick={onClose} className="min-h-11 cursor-pointer rounded-lg bg-[#b9000e] px-5 py-2 text-sm font-bold text-white hover:bg-[#93000b]">{copy.close}</button>
      </div>
    </div>
  </dialog>;
}

export default function CompareBar({ locale = "zh-TW", showContactActions = true }: { locale?: SiteLocale; showContactActions?: boolean }) {
  const { selected, removeCar, clearAll } = useCompare();
  const [showModal, setShowModal] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [barHeight, setBarHeight] = useState(0);
  const bar = useRef<HTMLDivElement>(null);
  const historyClosing = useRef(false);
  const pathname = usePathname();
  const hasSelection = selected.length > 0;
  const copy = labels[locale];
  const t = translator(locale);
  const chinese = locale === "zh-TW";

  useEffect(() => {
    const syncFromHistory = () => {
      historyClosing.current = false;
      // A page reload clears the in-memory shortlist; do not reopen an empty view.
      if (!hasSelection && hasComparisonEntry()) {
        const state = { ...window.history.state };
        delete state[historyKey];
        window.history.replaceState(state, "", window.location.href);
      }
      setShowModal(hasSelection && hasComparisonEntry());
    };
    syncFromHistory();
    window.addEventListener("popstate", syncFromHistory);
    return () => window.removeEventListener("popstate", syncFromHistory);
  }, [pathname, hasSelection]);

  useEffect(() => {
    const element = bar.current;
    if (!element) return;
    const updateHeight = () => setBarHeight(element.getBoundingClientRect().height);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function openComparison() {
    if (historyClosing.current) return;
    if (!hasComparisonEntry()) {
      // Keep Next.js routing state so Back closes this view and Forward reopens it.
      window.history.pushState({ ...window.history.state, [historyKey]: window.location.href }, "", window.location.href);
    }
    setShowModal(true);
  }

  function closeComparison() {
    if (historyClosing.current) return;
    if (hasComparisonEntry()) {
      historyClosing.current = true;
      window.history.back();
    } else {
      setShowModal(false);
    }
  }

  useEffect(() => {
    if (!showContactActions) return;
    let previous = window.scrollY;
    let travel = 0;
    const onScroll = () => {
      // Clamp Safari overscroll so bouncing at the edges does not reverse direction.
      const current = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
      const delta = current - previous;
      previous = current;
      travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;
      const editing = document.activeElement?.matches("input, textarea, select, [contenteditable='true']");
      if (current < 80 || editing) {
        setShowContact(false);
        travel = 0;
      } else if (Math.abs(travel) >= 12) {
        setShowContact(travel > 0);
        travel = 0;
      }
    };
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement && event.target.matches("input, textarea, select, [contenteditable='true']")) setShowContact(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("focusin", onFocus);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("focusin", onFocus);
    };
  }, [showContactActions]);

  const contactVisible = showContactActions && showContact;
  const mobilePosition = contactVisible || (!showContactActions && hasSelection)
    ? "translate-y-0"
    : hasSelection ? "translate-y-[calc(57px+env(safe-area-inset-bottom))]" : "translate-y-[calc(100%+24px)]";

  return <>
    <div
      ref={bar}
      data-entry="sticky"
      inert={!hasSelection && !contactVisible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#ddd] bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-400 ease-in-out motion-reduce:transition-none md:translate-y-0 ${!hasSelection ? "md:hidden" : ""} ${mobilePosition}`}
    >
      {hasSelection && <section aria-label={chinese ? "已選車款" : t("Selected models")} className={`mx-auto max-w-[1180px] px-3 py-2 sm:px-6 ${!showContactActions ? "pb-[max(8px,env(safe-area-inset-bottom))]" : ""}`}>
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <p role="status" className="min-w-0 text-sm font-bold leading-6 text-[#555]">{chinese ? "已選" : t("Selected models")} {selected.length}/3<span className="ml-2 hidden font-normal sm:inline">{copy.limit}</span></p>
          <div className="ml-auto flex shrink-0 gap-2">
            <button type="button" onClick={clearAll} className="min-h-11 cursor-pointer px-2 py-2 text-sm font-bold text-[#555] underline underline-offset-4 hover:text-[#b9000e]">{chinese ? "清除全部" : t("Clear all")}</button>
            <button type="button" onClick={openComparison} className="min-h-11 cursor-pointer rounded-lg bg-[#b9000e] px-4 py-2 text-sm font-bold text-white hover:bg-[#93000b]">{copy.compare}</button>
          </div>
        </div>
        <ul className="mt-1 flex flex-wrap gap-2">
          {selected.map((car) => <li key={car.id} className="flex min-h-11 items-center rounded-full border border-[#ddd] bg-[#f5f5f5] pl-3 text-sm font-bold text-[#333]">
            <span>{car.name}</span>
            <button type="button" onClick={() => removeCar(car.id)} className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full text-base text-[#555] hover:bg-[#e0e0e0]" aria-label={chinese ? `移除 ${car.name}` : t("Remove {model}", { model: car.name })}>✕</button>
          </li>)}
        </ul>
        <p className="mt-1 text-xs leading-5 text-[#666]">{selected.length === 3 ? copy.full : copy.limit}</p>
      </section>}
      {showContactActions && <nav aria-label="快速聯絡" aria-hidden={!showContact} inert={!showContact} className="md:hidden border-t border-[#eee] px-3 pt-1.5 pb-[calc(6px+env(safe-area-inset-bottom))]">
        <div className="flex gap-2">
          <a href={`https://line.me/R/ti/p/~${dealer.line}`} target="_blank" rel="noopener noreferrer" className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#06C755] text-sm font-bold text-white no-underline"><ContactIcon type="line" />加入 LINE</a>
          <a href={`tel:${dealer.phone.replace(/\D/g, "")}`} className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#e60012] text-sm font-bold text-white no-underline"><ContactIcon type="phone" />電話諮詢</a>
        </div>
      </nav>}
    </div>
    {hasSelection ? <div aria-hidden="true" style={{ height: barHeight }} /> : showContactActions && <div aria-hidden="true" className="h-[calc(60px+env(safe-area-inset-bottom))] md:hidden" />}
    {showModal && hasSelection && <CompareModal cars={selected} locale={locale} onClose={closeComparison} />}
  </>;
}
