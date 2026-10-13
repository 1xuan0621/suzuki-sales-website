import type { ReactNode } from "react";
import LocalizedShell from "./LocalizedShell";

export default function ContentShell({ children, label, carId }: { children: ReactNode; label: string; carId?: string }) {
  return <LocalizedShell locale="zh-TW" label={label} carId={carId}>{children}</LocalizedShell>;
}

export function ArticleSection({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return <section id={id} className="mt-8 scroll-mt-6 rounded-2xl border border-[#e5e5e5] bg-white p-6 sm:p-8"><h2 className="mb-4 text-xl font-bold sm:text-2xl">{title}</h2><div className="space-y-4 text-[15px] leading-8 text-[#4b4b4b]">{children}</div></section>;
}
