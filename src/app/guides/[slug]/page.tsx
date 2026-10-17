import Link from "next/link";
import { notFound } from "next/navigation";
import ContentShell from "@/components/ContentShell";
import ContactLinks from "@/components/ContactLinks";
import SourceLinks from "@/components/SourceLinks";
import GuideFlow from "@/components/GuideFlow";
import { GuideChecklist, GuideComparison, GuideOptions, GuideWorkedExample } from "@/components/GuideContent";
import { getGuide, guides, guideTitle } from "@/data/guides";
import { dealer, getCar } from "@/data/site";
import { guideSchema, pageMetadata, serializeJsonLd } from "@/data/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return pageMetadata(`/guides/${guide.slug}`, guideTitle(guide), guide.description, "/og-image.png", true);
}

export default async function GuidePage({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const relatedGuides = guide.relatedSlugs.map(getGuide).filter((item) => item !== undefined);
  const relatedCars = guide.relatedCars?.map(getCar).filter((car) => car !== undefined) || [];
  return <ContentShell label={guide.audience}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(guideSchema(guide)) }} />
    <article data-entry="guide" className="mx-auto max-w-5xl">
      <header className="mx-auto max-w-3xl">
        <Link href="/guides" className="text-sm text-[#b9000e] underline underline-offset-4">← 購車指南總覽</Link>
        <p className="mt-6 text-xs font-bold tracking-widest text-[#777]">{guide.audience}</p>
        <h1 className="mt-3 text-balance text-3xl font-black leading-snug sm:text-4xl">{guide.title}</h1>
        <p className="mt-3 text-xs leading-6 text-[#666]">內容整理：<Link href="/" className="underline underline-offset-4">{dealer.fullName}購車諮詢網站</Link> · 更新 <time dateTime={guide.updatedAt}>{guide.updatedAt}</time></p>
        {guide.emergency ? <section id="accident-summary" tabIndex={-1} aria-labelledby="accident-summary-heading" className="mt-6 scroll-mt-6 rounded-2xl border border-[#e6c5c5] bg-[#fff5f3] p-4 sm:p-6">
          <h2 id="accident-summary-heading" className="text-xl font-bold text-[#9c0011]">現場速查｜人身安全優先</h2>
          <p className="mt-2 text-sm leading-7 text-[#5c4242]">{guide.introduction}</p>
          <div aria-label="緊急救援電話" className="mt-4 grid max-w-sm grid-cols-2 gap-3">
            <a href="tel:119" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#b9000e] px-3 py-3 text-base font-bold text-white no-underline transition-colors hover:bg-[#93000b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252525]">119 救護</a>
            <a href="tel:110" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#b9000e] bg-white px-3 py-3 text-base font-bold text-[#9c0011] no-underline transition-colors hover:bg-[#fce7e4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252525]">110 報警</a>
          </div>
          <a href="#guide-contact" className="mt-2 inline-flex min-h-11 items-center py-2 text-sm font-bold text-[#9c0011] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252525]">不知道怎麼辦？聯絡鈺漣 ↓</a>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {guide.emergency.steps.map((point, index) => <li key={point.label} className="flex items-start gap-3">
              <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-[#b9000e] text-xs font-bold tabular-nums text-white">{index + 1}</span>
              <div><h3 className="text-base font-bold leading-6 text-[#442d2d]">{point.label}</h3><p className="mt-1 text-sm leading-6 text-[#5c4242]">{point.text}</p></div>
            </li>)}
          </ol>
          <p className="mt-4 border-t border-[#e6c5c5] pt-3 text-sm leading-6 text-[#714747]">{guide.emergency.notice}</p>
        </section> : <div className="mt-6 border-l-4 border-[#b9000e] pl-4">
          <p className="text-xs font-bold text-[#b9000e]">先看重點</p>
          <p className="mt-2 text-base font-medium leading-8 text-[#333]">{guide.introduction}</p>
        </div>}
        <div id="guide-contact" tabIndex={-1} className={guide.emergency ? "mt-5 scroll-mt-6 rounded-2xl border border-[#ddd] bg-white p-4 sm:p-6" : "mt-5 scroll-mt-6"}>
          {guide.emergency && <>
            <h2 className="text-lg font-bold">這三個時候，記得聯絡鈺漣</h2>
            <ul className="mb-4 mt-3 space-y-2 text-[15px] font-medium leading-7 text-[#444]">
              {guide.emergency.contactReasons.map((reason) => <li key={reason} className="flex gap-2"><span aria-hidden="true" className="text-[#b9000e]">✓</span><span>{reason}</span></li>)}
            </ul>
          </>}
          <ContactLinks entry="guide" />
        </div>
      </header>
      <section aria-labelledby="article-flow-heading" className="mx-auto mt-8 rounded-2xl border border-[#e5dcd5] bg-[#f5f1ed] p-4 sm:p-6">
        <h2 id="article-flow-heading" className="text-lg font-bold">{guide.sections.length}{guide.emergency ? " 個處理重點" : guide.category === "insurance" ? " 個投保重點" : guide.category === "jimny" ? " 個閱讀重點" : ` 步${guide.category === "process" ? "看懂流程" : guide.category === "ownership" ? "看懂保養" : "整理你的選擇"}`}</h2>
        <p className="mt-1 text-sm leading-7 text-[#665c56]">{guide.emergency ? "先確保人身安全，再依目前的狀況查看處理方式。" : guide.category === "insurance" ? "先看差異，再依用車情況整理需求；也可以直接跳到你想知道的答案。" : guide.category === "jimny" ? "從頭認識，或直接點選你想找的答案。" : "按順序看，或點選目前需要的步驟。"}</p>
        <GuideFlow sections={guide.sections} label={guide.emergency ? "用車狀況與處理重點" : guide.category === "insurance" ? "投保需求與保障差異" : guide.category === "process" ? "購車流程" : "指南閱讀重點"} />
      </section>
      <div className="mx-auto mt-3 max-w-3xl divide-y divide-[#ddd]">
        {guide.sections.map((section, index) => <section id={section.id} key={section.id} className="scroll-mt-6 py-9 sm:py-11">
          <h2 className="flex items-start gap-3 text-xl font-bold leading-8 sm:text-2xl"><span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-[#b9000e] text-sm tabular-nums text-white">{index + 1}</span>{section.title}</h2>
          {section.paragraphs.length > 0 && <div className="mt-4 space-y-3 text-base leading-8 text-[#4b4b4b]">
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>}
          {section.comparison && <div className="mt-5"><GuideComparison comparison={section.comparison} /></div>}
          {section.options && <div className="mt-5"><GuideOptions options={section.options} /></div>}
          {section.points && <div className="mt-5"><GuideChecklist points={section.points} /></div>}
          {section.calculation && <div className="mt-6"><GuideWorkedExample example={section.calculation} /></div>}
          {section.note && <aside className="mt-5 rounded-xl border border-[#e7d9bd] bg-[#faf6ed] px-4 py-4 text-sm leading-7 text-[#655231]"><p className="font-bold">提醒</p><p className="mt-1">{section.note}</p></aside>}
          {section.details && <details className="mt-5 rounded-xl border border-[#ddd] bg-white px-4 sm:px-5">
            <summary className="cursor-pointer py-4 text-sm font-bold leading-7 text-[#444]">{section.details.title}</summary>
            <div className="space-y-3 border-t border-[#eee] py-4 text-[15px] leading-7 text-[#555]">
              {section.details.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.details.points && <GuideChecklist points={section.details.points} />}
            </div>
          </details>}
          {section.link && <Link href={section.link.href} className="mt-5 inline-block text-sm font-medium text-[#b9000e] underline underline-offset-4">{section.link.label} →</Link>}
        </section>)}
        <section aria-labelledby="conversation-heading" className="py-8">
          <h2 id="conversation-heading" className="text-xl font-bold">{guide.category === "insurance" ? "聯絡鈺漣時，可以先提供這些資訊" : "找鈺漣聊，可以這樣開始"}</h2>
          <blockquote className="mt-4 border-l-2 border-[#b9000e] pl-5 text-base leading-8 text-[#444]">{guide.conversation}</blockquote>
          <a href="#guide-contact" className="mt-4 inline-flex min-h-11 items-center py-2 text-sm text-[#b9000e] underline underline-offset-4">返回聯絡區，找鈺漣聊聊 ↑</a>
        </section>
      </div>
      <footer className="mx-auto max-w-3xl border-t border-[#ddd] pt-6">
        {relatedCars.length > 0 && <section aria-labelledby="related-cars-heading" className="mb-6">
          <h2 id="related-cars-heading" className="text-base font-bold">延伸了解文中車款</h2>
          <ul className="mt-3 space-y-3 text-sm font-bold text-[#b9000e]">
            {relatedCars.map((car) => <li key={car.id}><Link href={`/cars/${car.id}`} className="underline underline-offset-4">SUZUKI {car.name}：價格、規格與試乘重點 →</Link></li>)}
          </ul>
        </section>}
        <div className="flex flex-wrap gap-x-7 gap-y-4 text-sm font-bold text-[#555]">
          <Link href="/faq" className="underline underline-offset-4">還有疑問？查看常見 QA →</Link>
          {relatedGuides.map((related) => <Link key={related.slug} href={`/guides/${related.slug}`} className="underline underline-offset-4">{related.audience} →</Link>)}
        </div>
        <details className="mt-7 text-xs text-[#777]">
          <summary className="cursor-pointer py-2">參考資料與內容說明</summary>
          <div className="mt-2 space-y-3 leading-6"><SourceLinks ids={guide.sourceIds} />{guide.sourceNote && <p>{guide.sourceNote}</p>}<p>本文引用資料核對：<time dateTime={guide.reviewedAt}>{guide.reviewedAt}</time>。{guide.category === "insurance" ? "實際理賠依保單條款與保險公司審核；事故責任依個案證據及認定結果確認。" : "實際車輛操作與保養依隨車手冊；報價、文件、核貸與交車安排依個案確認。"}</p></div>
        </details>
      </footer>
    </article>
  </ContentShell>;
}
