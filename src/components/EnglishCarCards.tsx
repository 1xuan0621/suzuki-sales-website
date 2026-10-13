"use client";

import Image from "next/image";
import Link from "next/link";
import { useCompare } from "./CarCompareProvider";
import { getCar, type CarId } from "@/data/site";

export type EnglishCarCard = {
  id: CarId;
  name: string;
  subtitle: string;
  description: string;
  highlights: string[];
  priceTwd: number;
};

const money = (value: number) => `NT$ ${value.toLocaleString("en-US")}`;

export default function EnglishCarCards({ models }: { models: EnglishCarCard[] }) {
  const { selected, toggleCar, removeCar, clearAll, isSelected } = useCompare();
  const comparison = selected.flatMap((car) => models.filter((model) => model.id === car.id));
  return <>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {models.map((model) => {
        const active = isSelected(model.id);
        return <article key={model.id} data-car-id={model.id} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e2e2e2] bg-white">
          <Link href={`/en/cars/${model.id}`} aria-label={`Explore ${model.name}`} className="block overflow-hidden bg-[#eee]">
            <Image src={`/images/${model.id}.jpg`} alt={`SUZUKI ${model.name}`} width={800} height={450} sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw" className="aspect-[16/10] w-full object-cover transition-transform hover:scale-105 motion-reduce:transition-none" />
          </Link>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#777]">{model.subtitle}</p>
            <h3 className="mt-1 text-2xl font-black">{model.name}</h3>
            <p className="mt-3 text-sm leading-7 text-[#555]">{model.description}</p>
            <p className="mt-4 text-xs text-[#666]">Suggested price from</p>
            <p className="mt-1 text-2xl font-black text-[#b9000e]">{money(model.priceTwd)}</p>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
              <Link href={`/en/cars/${model.id}`} className="py-2 text-sm font-bold text-[#b9000e] underline underline-offset-4">View details →</Link>
              <button type="button" aria-pressed={active} disabled={!active && selected.length >= 3} onClick={() => toggleCar(getCar(model.id)!)} className={`min-h-11 rounded-lg border px-3 py-2 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-50 ${active ? "border-[#b9000e] bg-red-50 text-[#b9000e]" : "border-[#ccc] text-[#555] hover:border-[#b9000e]"}`} aria-label={`${active ? "Remove" : "Compare"} ${model.name}${active ? " from comparison" : ""}`}>
                {active ? "✓ Selected" : "+ Compare"}
              </button>
            </div>
          </div>
        </article>;
      })}
    </div>
    <p className="mt-4 text-xs leading-6 text-[#666]">Prices are in New Taiwan dollars and refer to Taiwan-market models. Paint, accessories, insurance, registration and final terms are confirmed separately. Select up to three models to compare below.</p>
    {comparison.length > 0 && <section aria-label="Selected models" className="mt-6 rounded-2xl border border-[#ddd] bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold">Compare your shortlist <span className="text-sm font-normal text-[#666]">({comparison.length}/3)</span></h3>
        <button type="button" onClick={clearAll} className="min-h-11 text-sm text-[#b9000e] underline underline-offset-4">Clear all</button>
      </div>
      <div role="region" aria-label="Model comparison; scroll horizontally for more models" tabIndex={0} className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-sm leading-7">
          <caption className="sr-only">Selected Suzuki models: starting prices and highlights</caption>
          <thead><tr><th scope="col" className="min-w-28 border-b py-3 pr-4">Model</th>{comparison.map((model) => <th key={model.id} scope="col" className="min-w-48 border-b px-3 py-3"><Link href={`/en/cars/${model.id}`} className="text-[#b9000e] underline underline-offset-4">{model.name}</Link></th>)}</tr></thead>
          <tbody>
            <tr><th scope="row" className="border-b border-[#eee] py-3 pr-4 align-top">Starting price</th>{comparison.map((model) => <td key={model.id} className="border-b border-[#eee] px-3 py-3 align-top">{money(model.priceTwd)}</td>)}</tr>
            <tr><th scope="row" className="border-b border-[#eee] py-3 pr-4 align-top">Highlights</th>{comparison.map((model) => <td key={model.id} className="border-b border-[#eee] px-3 py-3 align-top"><ul className="list-disc pl-4">{model.highlights.map((text) => <li key={text}>{text}</li>)}</ul></td>)}</tr>
            <tr><th scope="row"><span className="sr-only">Remove model</span></th>{comparison.map((model) => <td key={model.id} className="px-3 pt-3"><button type="button" onClick={() => removeCar(model.id)} aria-label={`Remove ${model.name}`} className="min-h-11 text-xs text-[#666] underline underline-offset-4">Remove</button></td>)}</tr>
          </tbody>
        </table>
      </div>
    </section>}
  </>;
}
