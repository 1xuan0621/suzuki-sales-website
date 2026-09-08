"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { FaqItem } from "@/data/faq";
import SourceLinks from "./SourceLinks";

export default function FaqList({ items }: { items: FaqItem[] }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // A link from a guide or another car should reveal its answer, including on
    // initial load after a legacy URL redirect. Keep the native details controls.
    const revealAnswer = () => {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target instanceof HTMLDetailsElement && container.current?.contains(target)) {
        target.open = true;
        target.scrollIntoView({ block: "start" });
      }
    };
    revealAnswer();
    window.addEventListener("hashchange", revealAnswer);
    return () => window.removeEventListener("hashchange", revealAnswer);
  }, [items]);

  return <div ref={container} className="divide-y divide-[#e8e5e2]">
    {items.map((item) => <details key={item.id} id={item.id} className="group scroll-mt-6 py-1">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 rounded-lg py-4 text-[15px] font-bold leading-7 text-[#292929] outline-offset-4 transition-colors hover:text-[#b9000e] focus-visible:outline-2 focus-visible:outline-[#b9000e] [&::-webkit-details-marker]:hidden">
        <span>{item.question}</span>
        <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f3f1ef] text-xl font-normal text-[#b9000e] group-open:rotate-45">+</span>
      </summary>
      <div className="space-y-4 pb-6 text-[15px] leading-8 text-[#555]">
        <p>{item.answer}</p>
        {item.table && <div role="region" aria-label={item.table.caption} tabIndex={0} className="overflow-x-auto rounded-xl border border-[#e5e5e5]">
          <table className="w-full min-w-[510px] text-left text-sm leading-7">
            <caption className="border-b border-[#e5e5e5] bg-[#faf9f7] px-4 py-3 text-left font-medium text-[#555]">{item.table.caption}</caption>
            <thead className="bg-[#f3f1ef]"><tr>{item.table.columns.map((column) => <th key={column} scope="col" className="p-4 align-top">{column}</th>)}</tr></thead>
            <tbody>{item.table.rows.map((row) => <tr key={row[0]} className="border-t border-[#e5e5e5]">{row.map((cell, index) => index === 0 ? <th key={index} scope="row" className="p-4 align-top font-medium">{cell}</th> : <td key={index} className="p-4 align-top">{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>}
        {item.points && <ul className="list-disc space-y-2 pl-5">{item.points.map((point) => <li key={point}>{point}</li>)}</ul>}
        {item.links && <div className="flex flex-wrap gap-x-5 gap-y-2">{item.links.map((link) => <Link key={link.href} href={link.href} className="font-medium text-[#b9000e] underline underline-offset-4">{link.label} <span aria-hidden="true">→</span></Link>)}</div>}
        <SourceLinks ids={item.sourceIds} />
      </div>
    </details>)}
  </div>;
}
