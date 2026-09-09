import Link from "next/link";
import type { Guide } from "@/data/guides";

export default function GuideFlow({ sections, basePath = "", preserveIds = false }: {
  sections: Guide["sections"];
  basePath?: string;
  preserveIds?: boolean;
}) {
  return <nav aria-label="購車流程" className="mt-6">
    <ol className={`grid gap-5 ${sections.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-6"}`}>
      {sections.map((section, index) => <li key={section.id} id={preserveIds ? section.id : undefined} className="relative min-w-0 scroll-mt-6">
        <Link href={`${basePath}#${section.id}`} className="group flex h-full items-center gap-3 rounded-xl border border-[#dfdcd7] bg-white px-4 py-3 no-underline transition-colors hover:border-[#b9000e] hover:bg-[#fff9f8] lg:block lg:px-3 lg:py-4">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f8eceb] text-xs font-bold tabular-nums text-[#b9000e]">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-sm font-bold leading-6 text-[#333] lg:mt-3 lg:block">{section.step}</span>
        </Link>
        {index < sections.length - 1 && <span aria-hidden="true" className="pointer-events-none absolute -bottom-5 left-[26px] text-sm leading-5 text-[#ae9c96] lg:-right-4 lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2"><span className="lg:hidden">↓</span><span className="hidden lg:inline">→</span></span>}
      </li>)}
    </ol>
  </nav>;
}
