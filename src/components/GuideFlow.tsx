import Link from "next/link";
import type { Guide } from "@/data/guides";

export default function GuideFlow({ sections, basePath = "", preserveIds = false, label = "購車流程" }: {
  sections: Guide["sections"];
  basePath?: string;
  preserveIds?: boolean;
  label?: string;
}) {
  return <nav aria-label={label} className="mt-3">
    <ol className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
      {sections.map((section, index) => <li key={section.id} id={preserveIds ? section.id : undefined} className="min-w-0 scroll-mt-6">
        <Link href={`${basePath}#${section.id}`} className="flex min-h-11 items-center gap-2 rounded-md py-2 text-sm leading-6 no-underline hover:text-[#b9000e] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b9000e]">
          <span aria-hidden="true" className="shrink-0 text-xs tabular-nums text-[#b9000e]">{String(index + 1).padStart(2, "0")}</span>
          <span className="font-bold">{section.step}</span>
        </Link>
      </li>)}
    </ol>
  </nav>;
}
