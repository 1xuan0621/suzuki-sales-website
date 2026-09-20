"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { FaqItem } from "@/data/faq";
import SourceLinks from "./SourceLinks";

export default function FaqList({ items, defaultOpenId }: { items: FaqItem[]; defaultOpenId?: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // A link from a guide or another car should reveal its answer, including on
    // initial load after a legacy URL redirect. Keep the native details controls.
    const revealAnswer = (hash: string) => {
      const target = document.getElementById(hash.slice(1));
      if (target instanceof HTMLDetailsElement && container.current?.contains(target)) {
        target.open = true;
        target.scrollIntoView({ block: "start" });
      }
    };
    const onHashChange = () => revealAnswer(window.location.hash);
    // Next Link uses pushState, and repeated links to the same hash do not emit
    // hashchange. Reveal this list's answer before either kind of navigation.
    const onAnchorClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement) || (anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return;
      const destination = new URL(anchor.href);
      if (destination.origin === window.location.origin && destination.pathname === window.location.pathname && destination.search === window.location.search) {
        revealAnswer(destination.hash);
      }
    };
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onAnchorClick, true);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onAnchorClick, true);
    };
  }, [items]);

  return <div ref={container} className="space-y-3">
    {items.map((item) => <details key={item.id} id={item.id} open={item.id === defaultOpenId || undefined} className="group scroll-mt-6 overflow-hidden rounded-xl border border-[#ddd] bg-white open:border-[#aaa]">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-lg font-bold leading-8 sm:px-6 sm:text-xl text-[#292929] -outline-offset-4 transition-colors hover:text-[#b9000e] focus-visible:outline-2 focus-visible:outline-[#b9000e] [&::-webkit-details-marker]:hidden">
        <span>{item.question}</span>
        <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center text-2xl font-normal text-[#777] group-open:rotate-45">+</span>
      </summary>
      <div className="space-y-4 border-t border-[#eee] bg-[#faf9f7] px-5 py-5 text-[15px] leading-8 text-[#555] sm:px-6">
        <p>{item.answer}</p>
        {item.table && <p className="text-xs text-[#777] sm:hidden">比較表可左右滑動，查看完整配備差異。</p>}
        {item.table && <div role="region" aria-label={item.table.caption} tabIndex={0} className="overflow-x-auto rounded-xl border border-[#e5e5e5]">
          <table className="w-full min-w-[510px] text-left text-sm leading-7">
            <caption className="border-b border-[#e5e5e5] bg-[#faf9f7] px-4 py-3 text-left font-medium text-[#555]">{item.table.caption}</caption>
            <thead className="bg-[#f3f1ef]"><tr>{item.table.columns.map((column) => <th key={column} scope="col" className="p-4 align-top">{column}</th>)}</tr></thead>
            <tbody>{item.table.rows.map((row) => <tr key={row[0]} className="border-t border-[#e5e5e5]">{row.map((cell, index) => index === 0 ? <th key={index} scope="row" className="p-4 align-top font-medium">{cell}</th> : <td key={index} className="p-4 align-top">{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>}
        {item.points && <ul className="list-disc space-y-2 pl-5">{item.points.map((point) => <li key={point}>{point}</li>)}</ul>}
        {item.links && <div className="flex flex-wrap gap-x-5 gap-y-2">{item.links.map((link) => <Link key={link.href} href={link.href} className="text-sm font-medium text-[#555] underline underline-offset-4 hover:text-[#b9000e]">{link.label} <span aria-hidden="true">→</span></Link>)}</div>}
        {item.sourceIds.length > 0 && <div className="border-t border-[#e5e1dd] pt-3"><p className="mb-1 text-[11px] leading-5 text-[#777]">參考資料</p><SourceLinks ids={item.sourceIds} /></div>}
        {item.reviewedAt && <p className="text-xs text-[#777]">本題更新與資料核對：<time dateTime={item.reviewedAt}>{item.reviewedAt}</time></p>}
      </div>
    </details>)}
  </div>;
}
