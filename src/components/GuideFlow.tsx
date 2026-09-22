import Link from "next/link";
import type { Guide } from "@/data/guides";

export default function GuideFlow({ sections, label = "購車流程" }: {
  sections: Guide["sections"];
  label?: string;
}) {
  return <nav aria-label={label} className="mt-5">
    <ol className={`grid gap-3 lg:gap-5 ${sections.length === 6 ? "lg:grid-cols-6" : "lg:grid-cols-5"}`}>
      {sections.map((section, index) => <li key={section.id} className="relative min-w-0">
        {index < sections.length - 1 && <span aria-hidden="true" className="absolute left-[22px] top-full z-10 flex h-3 w-px items-center justify-center bg-[#c8b8b0] text-[10px] text-[#927c70] lg:left-full lg:top-[26px] lg:h-px lg:w-5">
          <span className="bg-[#f5f1ed] leading-none lg:hidden">↓</span><span className="hidden bg-[#f5f1ed] leading-none lg:inline">→</span>
        </span>}
        <Link href={`#${section.id}`} className="flex h-full items-center gap-3 rounded-xl border border-[#ded6d0] bg-white p-3 no-underline transition-colors hover:border-[#b9000e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9000e] lg:block lg:p-4">
          <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-[#b9000e] text-xs font-bold tabular-nums text-white">{index + 1}</span>
          <span className="min-w-0 lg:mt-3 lg:block">
            <span className="block text-sm font-bold leading-6 text-[#252525]">{section.step}</span>
            <span className="block text-xs leading-5 text-[#665c56] lg:mt-1">{section.action}</span>
          </span>
        </Link>
      </li>)}
    </ol>
  </nav>;
}
