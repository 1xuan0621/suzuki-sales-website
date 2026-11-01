"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useCompare } from "./CarCompareProvider";
import { dealer } from "@/data/site";
import type { SiteLocale } from "@/data/locales";
import { translator } from "@/data/translations";
import { ContactIcon } from "./ContactLinks";
import CarComparisonModal from "./CarComparisonModal";
import { comparisonLabels } from "@/data/comparison-labels";

const historyKey = "suzukiCarComparison";
function hasComparisonEntry() {
  return window.history.state?.[historyKey] === window.location.href;
}

export default function CompareBar({ locale = "zh-TW", showContactActions = true }: { locale?: SiteLocale; showContactActions?: boolean }) {
  const { selected, removeCar, clearAll, ready } = useCompare();
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const selectionId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const [showContact, setShowContact] = useState(false);
  const [barHeight, setBarHeight] = useState(0);
  const bar = useRef<HTMLDivElement>(null);
  const historyClosing = useRef(false);
  const pathname = usePathname();
  const hasSelection = selected.length > 0;
  const canCompare = selected.length >= 2;
  const copy = comparisonLabels[locale];
  const t = translator(locale);
  const chinese = locale === "zh-TW";

  useEffect(() => {
    if (!ready) return;
    const syncFromHistory = () => {
      historyClosing.current = false;
      if (!canCompare && hasComparisonEntry()) {
        // An unavailable/cleared shortlist must not leave a redundant Back step.
        setShowModal(false);
        historyClosing.current = true;
        window.history.back();
        return;
      }
      setShowModal(canCompare && hasComparisonEntry());
    };
    syncFromHistory();
    window.addEventListener("popstate", syncFromHistory);
    return () => window.removeEventListener("popstate", syncFromHistory);
  }, [pathname, canCompare, ready]);

  useEffect(() => {
    if (!hasSelection) setExpanded(false);
  }, [hasSelection]);

  useEffect(() => {
    const restoreFocus = wasOpen.current && !showModal;
    wasOpen.current = showModal;
    if (!restoreFocus) return;
    const frame = requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [showModal]);

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
    if (!canCompare || historyClosing.current) return;
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

  function restoreSelectionFocus(carId: string) {
    requestAnimationFrame(() => {
      const catalogPath = chinese ? "/cars" : `/${locale}/cars`;
      const target = document.querySelector<HTMLElement>(`[data-compare-car="${carId}"]`)
        ?? document.querySelector<HTMLElement>("[data-compare-car]")
        ?? document.querySelector<HTMLElement>(`a[href="${catalogPath}"]`);
      target?.focus();
    });
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
        <div className="flex items-center justify-between gap-2">
          <button type="button" aria-expanded={expanded} aria-controls={selectionId} aria-label={expanded ? copy.collapse : copy.expand} onClick={() => setExpanded((value) => !value)} className="flex min-h-11 shrink-0 cursor-pointer items-center gap-2 px-1 text-sm font-bold text-[#444]">
            <span role="status">{chinese ? "已選" : t("Selected models")} {selected.length}/3</span><span aria-hidden="true">{expanded ? "⌃" : "⌄"}</span>
          </button>
          <button ref={trigger} type="button" onClick={openComparison} disabled={!canCompare} className="min-h-11 min-w-0 cursor-pointer rounded-lg bg-[#b9000e] px-3 py-2 text-sm font-bold leading-5 text-white hover:bg-[#93000b] disabled:cursor-default disabled:bg-[#eee] disabled:text-[#555]">{canCompare ? copy.compare : copy.addOne}</button>
        </div>
        <div id={selectionId} hidden={!expanded} className="pt-2">
          <ul className="flex flex-wrap gap-2">
            {selected.map((car) => <li key={car.id} className="flex min-h-11 items-center rounded-full border border-[#ddd] bg-[#f5f5f5] pl-3 text-sm font-bold text-[#333]">
              <span>{car.name}</span>
              <button type="button" onClick={() => { removeCar(car.id); if (selected.length === 1) restoreSelectionFocus(car.id); }} className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full text-base text-[#555] hover:bg-[#e0e0e0]" aria-label={chinese ? `移除 ${car.name}` : t("Remove {model}", { model: car.name })}>✕</button>
            </li>)}
          </ul>
          <div className="mt-1 flex flex-wrap items-center justify-between gap-x-3">
            <p className="text-xs leading-5 text-[#666]">{selected.length === 3 ? copy.full : copy.limit}</p>
            <button type="button" onClick={() => { clearAll(); restoreSelectionFocus(selected[selected.length - 1].id); }} className="min-h-11 cursor-pointer px-1 py-2 text-sm font-bold text-[#555] underline underline-offset-4 hover:text-[#b9000e]">{chinese ? "清除全部" : t("Clear all")}</button>
          </div>
        </div>
      </section>}
      {showContactActions && <nav aria-label="快速聯絡" aria-hidden={!showContact} inert={!showContact} className="md:hidden border-t border-[#eee] px-3 pt-1.5 pb-[calc(6px+env(safe-area-inset-bottom))]">
        <div className="flex gap-2">
          <a href={`https://line.me/R/ti/p/~${dealer.line}`} target="_blank" rel="noopener noreferrer" className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#06C755] text-sm font-bold text-white no-underline"><ContactIcon type="line" />加入 LINE</a>
          <a href={`tel:${dealer.phone.replace(/\D/g, "")}`} className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#e60012] text-sm font-bold text-white no-underline"><ContactIcon type="phone" />電話諮詢</a>
        </div>
      </nav>}
    </div>
    {hasSelection ? <div aria-hidden="true" style={{ height: barHeight }} /> : showContactActions && <div aria-hidden="true" className="h-[calc(60px+env(safe-area-inset-bottom))] md:hidden" />}
    {showModal && canCompare && <CarComparisonModal cars={selected} locale={locale} onClose={closeComparison} />}
  </>;
}
