import Link from "next/link";
import { notFound } from "next/navigation";
import ContentShell from "@/components/ContentShell";
import ContactLinks from "@/components/ContactLinks";
import SourceLinks from "@/components/SourceLinks";
import GuideFlow from "@/components/GuideFlow";
import { getGuide, guides, guideTitle } from "@/data/guides";
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
  const otherGuide = guides.find((item) => item.slug !== guide.slug)!;
  return <ContentShell label={guide.audience}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(guideSchema(guide)) }} />
    <article data-entry="guide" className="mx-auto max-w-5xl">
      <header className="mx-auto max-w-3xl">
        <Link href="/guides" className="text-sm text-[#b9000e] underline underline-offset-4">← 購車指南總覽</Link>
        <p className="mt-6 text-xs font-bold tracking-widest text-[#777]">{guide.audience} · 鈺漣的 Suzuki 購車指南</p>
        <h1 className="mt-3 text-3xl font-black leading-snug sm:text-4xl">{guide.title}</h1>
        <p className="mt-5 text-base leading-8 text-[#555]">{guide.introduction}</p>
        <div className="mt-5"><ContactLinks entry="guide" /></div>
      </header>
      <section aria-labelledby="article-flow-heading" className="mt-8 rounded-2xl bg-[#efede9] p-5 sm:p-7">
        <h2 id="article-flow-heading" className="text-base font-bold">{guide.audience}，先看這條流程</h2>
        <GuideFlow sections={guide.sections} />
        <p className="mt-4 text-xs leading-6 text-[#666]">可以從頭讀，也可以點選步驟，跳到你正在想的事情。</p>
      </section>
      <div className="mx-auto mt-3 max-w-3xl divide-y divide-[#ddd]">
        {guide.sections.map((section, index) => <section id={section.id} key={section.id} className="scroll-mt-6 py-9 sm:py-11">
          <p aria-hidden="true" className="mb-2 text-xs font-bold tabular-nums tracking-widest text-[#b9000e]">{String(index + 1).padStart(2, "0")} / {section.step}</p>
          <h2 className="text-xl font-bold leading-8 sm:text-2xl">{section.title}</h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-[#4b4b4b]">
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          {section.points && <ul className="mt-5 space-y-4 text-[15px] leading-7 text-[#555]">
            {section.points.map((point) => <li key={point.label} className="border-l-2 border-[#d8cec9] pl-4"><h3 className="font-bold text-[#333]">{point.label}</h3><p className="mt-1">{point.text}</p></li>)}
          </ul>}
          {section.note && <p className="mt-5 rounded-lg bg-[#efede9] px-5 py-4 text-sm leading-7 text-[#555]">{section.note}</p>}
          {section.link && <Link href={section.link.href} className="mt-5 inline-block text-sm font-medium text-[#b9000e] underline underline-offset-4">{section.link.label} →</Link>}
        </section>)}
        <section aria-labelledby="conversation-heading" className="py-8">
          <h2 id="conversation-heading" className="text-xl font-bold">找鈺漣聊，可以這樣開始</h2>
          <p className="mt-3 text-sm leading-7 text-[#666]">不用全部想好，有把握的先說就可以。</p>
          <blockquote className="mt-4 border-l-2 border-[#b9000e] pl-5 text-base leading-8 text-[#444]">{guide.conversation}</blockquote>
        </section>
      </div>
      <footer className="mx-auto max-w-3xl border-t border-[#ddd] pt-6">
        <div className="flex flex-wrap gap-x-7 gap-y-4 text-sm font-bold text-[#555]">
          <Link href="/faq" className="underline underline-offset-4">還有疑問？查看常見 QA →</Link>
          <Link href={`/guides/${otherGuide.slug}`} className="underline underline-offset-4">閱讀{otherGuide.audience}指南 →</Link>
        </div>
        <details className="mt-7 text-xs text-[#777]">
          <summary className="cursor-pointer py-2">參考資料與內容說明</summary>
          <div className="mt-2 space-y-3 leading-6"><SourceLinks ids={guide.sourceIds} /><p>內容更新：<time dateTime={guide.updatedAt}>{guide.updatedAt}</time>；本文引用資料核對：{guide.reviewedAt}。實際報價、文件、核貸與交車安排依個案確認。</p></div>
        </details>
      </footer>
    </article>
  </ContentShell>;
}
