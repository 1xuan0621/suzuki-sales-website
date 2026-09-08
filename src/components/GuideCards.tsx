import Link from "next/link";
import { guides } from "@/data/guides";

export default function GuideCards() {
  return <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {guides.map((guide, index) => <li key={guide.slug} className="h-full">
      <Link href={`/guides/${guide.slug}`} className="group flex h-full flex-col rounded-2xl border border-[#e5e1dd] bg-white p-6 text-inherit no-underline transition-colors hover:border-[#b9000e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9000e]">
        <div className="mb-5 flex items-center justify-between gap-3"><span className="text-sm font-bold text-[#b9000e]">{guide.stage}</span><span aria-hidden="true" className="font-mono text-3xl tracking-tight text-[#d6d0ca]">{String(index + 1).padStart(2, "0")}</span></div>
        <h3 className="text-balance text-lg font-bold leading-8 group-hover:text-[#b9000e]">{guide.title}</h3>
        <p className="mb-6 mt-3 text-sm leading-7 text-[#666]">{guide.description}</p>
        <div className="mt-auto flex items-center justify-between border-t border-[#eee] pt-4 text-xs"><span className="text-[#777]">約 {guide.readMinutes} 分鐘閱讀</span><span className="font-bold text-[#b9000e]">閱讀指南 <span aria-hidden="true">↗</span></span></div>
      </Link>
    </li>)}
  </ol>;
}
