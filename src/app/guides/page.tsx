import Link from "next/link";
import ContentShell from "@/components/ContentShell";
import ContactLinks from "@/components/ContactLinks";
import SourceLinks from "@/components/SourceLinks";
import { buyingGuide, guideIndex } from "@/data/guides";
import { guideSchema, pageMetadata, serializeJsonLd } from "@/data/seo";

export const metadata = pageMetadata("/guides", guideIndex.title, guideIndex.description, "/og-image.png", true);

export default function GuidesPage() {
  return <ContentShell label="購車指南">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(guideSchema(buyingGuide)) }} />
    <article data-entry="guide" className="mx-auto max-w-3xl">
      <header className="border-b border-[#ddd] pb-7">
        <h1 className="text-3xl font-black leading-snug sm:text-4xl">購車指南</h1>
        <p className="mt-3 text-base leading-7 text-[#666]">從預算到交車，一篇掌握五個步驟。</p>
        <div className="mt-5"><ContactLinks entry="guide" /></div>
      </header>
      <div className="divide-y divide-[#ddd]">
        {buyingGuide.sections.map((section, index) => <section id={section.id} key={section.id} className="scroll-mt-6 py-8 sm:py-10">
          <h2 className="mb-5 flex items-baseline gap-3 text-xl font-bold leading-8 sm:text-2xl"><span aria-hidden="true" className="text-sm font-medium tabular-nums text-[#b9000e]">0{index + 1}</span>{section.title}</h2>
          <ul className="space-y-4 text-[15px] leading-7 text-[#555]">
            {section.points.map((point) => <li key={point.label}><h3 className="mb-1 text-base font-bold text-[#333]">{point.label}</h3><p>{point.text}</p></li>)}
          </ul>
          {section.note && <p className="mt-5 border-l-2 border-[#ccc] pl-4 text-sm leading-7 text-[#666]">{section.note}</p>}
          {section.link && <Link href={section.link.href} className="mt-4 inline-block text-sm font-medium text-[#b9000e] underline underline-offset-4">{section.link.label} →</Link>}
        </section>)}
      </div>
      <div className="border-t border-[#ddd] pt-6">
        <Link href="/faq" className="text-base font-bold text-[#333] underline underline-offset-4">還有疑問？查看常見 QA →</Link>
        <details className="mt-7 text-xs text-[#777]">
          <summary className="cursor-pointer py-2">參考資料與內容說明</summary>
          <div className="mt-2 space-y-3 leading-6"><SourceLinks ids={buyingGuide.sourceIds} /><p>內容更新與資料核對：<time dateTime={buyingGuide.reviewedAt}>{buyingGuide.reviewedAt}</time>。實際報價、文件、核貸與交車安排依個案確認。</p></div>
        </details>
      </div>
    </article>
  </ContentShell>;
}
