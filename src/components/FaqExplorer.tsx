"use client";

import { useState } from "react";
import { carFaqs, featuredCarFaqs, generalFaqGroups } from "@/data/faq";
import FaqList from "./FaqList";

const groups = [
  ...generalFaqGroups,
  ...(["swift", "jimny"] as const).map((carId) => ({
    id: carId,
    title: carId === "swift" ? "SWIFT 重點問答" : "Jimny 重點問答",
    items: featuredCarFaqs.filter((entry) => entry.carId === carId).map((entry) => ({
      ...carFaqs[carId].find((item) => item.id === entry.faqId)!,
      links: [{ href: `/cars/${carId}#${entry.faqId}`, label: `前往 ${carId === "swift" ? "SWIFT" : "Jimny"} 車型頁看完整問答` }],
    })),
  })),
];

export default function FaqExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const filtered = groups.filter((group) => category === "all" || category === group.id).map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      const text = [group.title, item.question, item.answer, ...(item.points || []), ...(item.table?.rows.flat() || [])].join(" ").toLocaleLowerCase();
      return terms.every((term) => text.includes(term));
    }),
  })).filter((group) => group.items.length > 0);
  const count = filtered.reduce((sum, group) => sum + group.items.length, 0);

  function reset() { setQuery(""); setCategory("all"); }

  return <section aria-label="查找常見問題" className="mt-9">
    <div className="rounded-2xl border border-[#e5e1dd] bg-white p-5 sm:p-7">
      <label htmlFor="faq-search" className="mb-3 block text-sm font-bold">想先了解什麼？</label>
      <div className="relative">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-[#777]"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg>
        <input id="faq-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋訂金、領牌、SWIFT…" className="min-h-13 w-full rounded-xl border border-[#ccc] bg-[#faf9f7] py-3 pl-12 pr-4 text-base outline-offset-2 focus:outline-2 focus:outline-[#b9000e]" />
      </div>
      <div role="group" aria-label="問題分類" className="mt-5 flex flex-wrap gap-2">
        {[{ id: "all", title: "全部問題" }, ...groups].map((group) => <button key={group.id} type="button" aria-pressed={category === group.id} onClick={() => setCategory(group.id)} className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b9000e] ${category === group.id ? "border-[#333] bg-[#333] text-white" : "border-[#e5e1dd] bg-white text-[#555] hover:border-[#b9000e]"}`}>{group.title}</button>)}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 text-xs leading-6 text-[#666]">
        <p role="status" aria-live="polite">{query.trim() ? `符合搜尋的問題：${count} 題` : `共 ${count} 題，點選問題展開答案`}</p>
        {(query || category !== "all") && <button type="button" onClick={reset} className="min-h-11 shrink-0 px-2 font-medium text-[#b9000e] underline underline-offset-4">清除篩選</button>}
      </div>
    </div>
    <div className="mt-7 space-y-6">
      {filtered.map((group) => <section key={group.id} aria-labelledby={`category-${group.id}`} className="rounded-2xl border border-[#e5e1dd] bg-white px-5 py-6 sm:px-8">
        <h2 id={`category-${group.id}`} className="mb-2 flex items-center gap-3 text-lg font-bold"><span aria-hidden="true" className="h-4 w-1 rounded bg-[#c90012]" />{group.title}<span className="text-xs font-normal text-[#777]">{group.items.length} 題</span></h2>
        <FaqList items={group.items} />
      </section>)}
      {count === 0 && <div className="rounded-2xl border border-dashed border-[#ccc] p-8 text-center"><h2 className="text-lg font-bold">暫時沒有符合的問題</h2><p className="mt-3 text-sm leading-7 text-[#666]">試試「貸款」「交車」等較短的關鍵字，或清除分類後再找。其他車型問題可從下方車型入口查看。</p><button type="button" onClick={reset} className="mt-5 min-h-11 rounded-full bg-[#333] px-6 py-2 text-sm font-bold text-white">查看全部問題</button></div>}
    </div>
  </section>;
}
