"use client";

import { translator } from "@/data/translations";
import type { ForeignLocale } from "@/data/locales";
import Image from "next/image";
import Link from "next/link";
import { useCompare } from "./CarCompareProvider";
import { getCar, type CarId } from "@/data/site";

export type LocalizedCarCard = {
  id: CarId;
  name: string;
  subtitle: string;
  description: string;
  highlights: string[];
  priceTwd: number;
};

const money = (value: number) => `NT$ ${value.toLocaleString("en-US")}`;

export default function LocalizedCarCards({ models, locale }: { models: LocalizedCarCard[]; locale: ForeignLocale }) {
  const t = translator(locale);
  const { selected, toggleCar, removeCar, clearAll, isSelected } = useCompare();
  const comparison = selected.flatMap((car) => models.filter((model) => model.id === car.id));
  return <>
    <div className="grid grid-cols-3 gap-6 max-[980px]:grid-cols-2 max-[680px]:grid-cols-1 max-sm:gap-[14px]">
      {models.map((model) => {
        const active = isSelected(model.id);
        return <article key={model.id} data-car-id={model.id} className="flex min-w-0 flex-col overflow-hidden rounded-[18px] border border-[#e7e7e7] bg-white shadow-[0_12px_30px_rgba(20,20,20,0.08)]">
          <Link href={`/${locale}/cars/${model.id}`} aria-label={t("Explore {model}", { model: model.name })} className="block shrink-0 overflow-hidden bg-[#eee]">
            <Image src={`/images/${model.id}.jpg`} alt={`SUZUKI ${model.name}`} width={800} height={450} sizes="(min-width: 1180px) 348px, (min-width: 981px) 30vw, (min-width: 681px) 45vw, 95vw" className="aspect-[16/10] w-full object-cover transition-transform hover:scale-105 motion-reduce:transition-none" />
          </Link>
          <div className="flex flex-1 flex-col p-5 text-center">
            <h3 className="text-[26px] font-bold text-[#202020]">{model.name}</h3>
            <p className="mt-1 text-[13px] font-bold text-[#777]">{model.subtitle}</p>
            <p className="mt-2 text-sm leading-6 text-[#666]">{model.description}</p>
            <div className="mt-auto pt-4">
              <p className="text-xs text-[#666]">{t("Suggested price from")}</p>
              <p className="mt-1 text-2xl font-extrabold text-[#e60012]">{money(model.priceTwd)}</p>
              <div className="mt-5 grid grid-cols-2 items-center gap-3">
                <Link href={`/${locale}/cars/${model.id}`} className="py-2 text-[13px] font-bold text-[#b9000e] underline underline-offset-4">{t("View details →")}</Link>
                <button type="button" aria-pressed={active} disabled={!active && selected.length >= 3} onClick={() => toggleCar(getCar(model.id)!)} className={`min-h-11 rounded-[10px] border-2 px-2 py-2 text-[13px] font-extrabold disabled:cursor-not-allowed disabled:opacity-50 ${active ? "border-[#e60012] bg-[#e60012] text-white" : "border-[#e60012]/40 text-[#e60012] hover:border-[#e60012] hover:bg-[#fff5f5]"}`} aria-label={t(active ? "Remove {model} from comparison" : "Compare {model}", { model: model.name })}>
                  {t(active ? "✓ Selected" : "+ Compare")}
                </button>
              </div>
            </div>
          </div>
        </article>;
      })}
    </div>
    <p className="mt-4 text-xs leading-6 text-[#666]">{t("Prices are in New Taiwan dollars and refer to Taiwan-market models. Paint, accessories, insurance, registration and final terms are confirmed separately. Select up to three models to compare below.")}</p>
    {comparison.length > 0 && <section aria-label={t("Selected models")} className="mt-6 rounded-2xl border border-[#ddd] bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold">{t("Compare your shortlist")}{" "}<span className="text-sm font-normal text-[#666]">({comparison.length}/3)</span></h3>
        <button type="button" onClick={clearAll} className="min-h-11 text-sm text-[#b9000e] underline underline-offset-4">{t("Clear all")}</button>
      </div>
      <div role="region" aria-label={t("Model comparison; scroll horizontally for more models")} tabIndex={0} className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-sm leading-7">
          <caption className="sr-only">{t("Selected Suzuki models: starting prices and highlights")}</caption>
          <thead><tr><th scope="col" className="min-w-28 border-b py-3 pr-4">{t("Model")}</th>{comparison.map((model) => <th key={model.id} scope="col" className="min-w-48 border-b px-3 py-3"><Link href={`/${locale}/cars/${model.id}`} className="text-[#b9000e] underline underline-offset-4">{model.name}</Link></th>)}</tr></thead>
          <tbody>
            <tr><th scope="row" className="border-b border-[#eee] py-3 pr-4 align-top">{t("Starting price")}</th>{comparison.map((model) => <td key={model.id} className="border-b border-[#eee] px-3 py-3 align-top">{money(model.priceTwd)}</td>)}</tr>
            <tr><th scope="row" className="border-b border-[#eee] py-3 pr-4 align-top">{t("Highlights")}</th>{comparison.map((model) => <td key={model.id} className="border-b border-[#eee] px-3 py-3 align-top"><ul className="list-disc pl-4">{model.highlights.map((text) => <li key={text}>{text}</li>)}</ul></td>)}</tr>
            <tr><th scope="row"><span className="sr-only">{t("Remove model")}</span></th>{comparison.map((model) => <td key={model.id} className="px-3 pt-3"><button type="button" onClick={() => removeCar(model.id)} aria-label={t("Remove {model}", { model: model.name })} className="min-h-11 text-xs text-[#666] underline underline-offset-4">{t("Remove")}</button></td>)}</tr>
          </tbody>
        </table>
      </div>
    </section>}
  </>;
}
