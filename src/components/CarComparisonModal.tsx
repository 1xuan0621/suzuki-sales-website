"use client";

import { useEffect, useState } from "react";
import type { Car } from "@/data/site";
import type { SiteLocale } from "@/data/locales";
import { getCarComparisonRows, type ComparisonRow } from "@/data/car-comparison";
import { comparisonLabels } from "@/data/comparison-labels";
import { useModalDialog } from "@/lib/use-modal-dialog";

const pairHistoryKey = "suzukiCarComparisonPair";

function MobileRows({ cars, rows }: { cars: Car[]; rows: ComparisonRow[] }) {
  return <div className="divide-y divide-[#ddd] border-b border-[#ddd]">
    {rows.map((row) => <section key={row.id} aria-label={row.label}>
      <h3 className="bg-[#f5f5f5] px-3 py-1.5 text-[13px] font-bold leading-5 text-[#444]">{row.label}</h3>
      <dl className="grid grid-cols-2 divide-x divide-[#ddd]">
        {cars.map((car, index) => <div key={car.id} className="min-w-0 px-3 py-2.5">
          <dt className="sr-only">{car.name}</dt>
          <dd className={`space-y-1 break-words text-sm leading-[22px] ${row.price ? "font-bold text-[#b9000e]" : "text-[#444]"}`}>
            {row.values[index].map((value) => <p key={value}>{value}</p>)}
          </dd>
        </div>)}
      </dl>
    </section>)}
  </div>;
}

function DesktopTable({ cars, rows, locale }: { cars: Car[]; rows: ComparisonRow[]; locale: SiteLocale }) {
  const copy = comparisonLabels[locale];
  return <table className="w-full table-fixed border-collapse text-left">
    <caption className="sr-only">{copy.title}</caption>
    <thead><tr>
      <th scope="col" className="sticky top-0 w-[18%] border-b-2 border-[#b9000e] bg-white py-3 pr-4 text-sm font-bold text-[#555]">{copy.item}</th>
      {cars.map((car) => <th key={car.id} scope="col" className="sticky top-0 border-b-2 border-[#b9000e] bg-white px-3 py-3 text-lg font-bold text-[#202020]">{car.name}</th>)}
    </tr></thead>
    <tbody>{rows.map((row) => <tr key={row.id}>
      <th scope="row" className="border-b border-[#ddd] py-3 pr-4 align-top text-sm font-bold leading-6 text-[#555]">{row.label}</th>
      {cars.map((car, index) => <td key={car.id} className={`space-y-1 border-b border-[#ddd] px-3 py-3 align-top text-[15px] leading-6 ${row.price ? "font-bold text-[#b9000e]" : "text-[#444]"}`}>
        {row.values[index].map((value) => <p key={value}>{value}</p>)}
      </td>)}
    </tr>)}</tbody>
  </table>;
}

export default function CarComparisonModal({ cars, locale, onClose }: { cars: Car[]; locale: SiteLocale; onClose: () => void }) {
  const dialog = useModalDialog();
  const copy = comparisonLabels[locale];
  const [pair, setPair] = useState<[number, number]>(() => {
    if (typeof window === "undefined") return [0, 1];
    const saved: unknown = window.history.state?.[pairHistoryKey];
    if (!Array.isArray(saved) || saved.length !== 2) return [0, 1];
    const first = cars.findIndex((car) => car.id === saved[0]);
    const second = cars.findIndex((car) => car.id === saved[1]);
    return first >= 0 && second >= 0 && first !== second ? [first, second] : [0, 1];
  });
  useEffect(() => {
    // Restore the visible pair on reload/Forward without adding another Back step.
    window.history.replaceState({ ...window.history.state, [pairHistoryKey]: pair.map((index) => cars[index].id) }, "", window.location.href);
  }, [cars, pair]);
  const mobileCars = pair.map((index) => cars[index]);
  const mobileRows = getCarComparisonRows(mobileCars, locale);
  const desktopRows = getCarComparisonRows(cars, locale);
  const missing = [...desktopRows.summary, ...desktopRows.details].some((row) => row.values.some((values) => values.includes("—")));

  return <dialog ref={dialog} aria-label={copy.title}
    className="fixed inset-0 m-0 flex h-dvh max-h-none w-full max-w-none items-center justify-center border-0 bg-black/50 p-3 text-[#333] backdrop:bg-transparent sm:p-4"
    onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    onCancel={(event) => { event.preventDefault(); onClose(); }}>
    <div className="flex max-h-[90dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-[0_26px_80px_rgba(0,0,0,0.35)]">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#ddd] px-4 py-3 sm:px-6">
        <h2 className="text-xl font-extrabold">{copy.title}</h2>
        <button data-dialog-initial-focus type="button" onClick={onClose} aria-label={copy.close} className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full bg-[#f0f0f0] text-xl text-[#555] hover:bg-[#e0e0e0]">✕</button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-3 sm:px-6 sm:pb-5" tabIndex={0} role="region" aria-label={copy.title}>
        <div className="md:hidden">
          <div className="sticky top-0 z-10 border-b-2 border-[#b9000e] bg-white py-2">
            {cars.length > 2 && <p className="mb-1 text-[13px] leading-5 text-[#555]">{copy.switchHint}</p>}
            <div className="grid grid-cols-2 gap-2">
              {pair.map((carIndex, column) => cars.length > 2 ? <label key={column} className="min-w-0 text-xs leading-5 text-[#555]">
                {column === 0 ? copy.first : copy.second}
                <select value={carIndex} onChange={(event) => setPair((previous) => column === 0 ? [Number(event.target.value), previous[1]] : [previous[0], Number(event.target.value)])}
                  className="block min-h-11 w-full rounded-lg border border-[#bbb] bg-white px-2 text-sm font-bold text-[#333]">
                  {cars.map((car, index) => <option key={car.id} value={index} disabled={index === pair[1 - column]}>{car.name}</option>)}
                </select>
              </label> : <p key={column} className="flex min-h-11 items-center px-3 text-base font-bold leading-6">{cars[carIndex].name}</p>)}
            </div>
          </div>
          <MobileRows cars={mobileCars} rows={mobileRows.summary} />
          {mobileRows.details.length > 0 && <details className="mt-2">
            <summary className="min-h-11 cursor-pointer py-3 text-sm font-bold text-[#a9000d]">{copy.more}</summary>
            <MobileRows cars={mobileCars} rows={mobileRows.details} />
          </details>}
        </div>
        <div className="hidden md:block">
          <DesktopTable cars={cars} rows={desktopRows.summary} locale={locale} />
          {desktopRows.details.length > 0 && <details className="mt-2">
            <summary className="min-h-11 cursor-pointer py-3 text-sm font-bold text-[#a9000d]">{copy.more}</summary>
            <DesktopTable cars={cars} rows={desktopRows.details} locale={locale} />
          </details>}
        </div>
        {missing && <p className="mt-3 text-xs leading-5 text-[#666]">{copy.missingNote}</p>}
      </div>
    </div>
  </dialog>;
}
