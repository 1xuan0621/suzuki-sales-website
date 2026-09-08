import ContactLinks from "@/components/ContactLinks";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dealer } from "@/data/site";
import { guides, getGuide } from "@/data/guides";
import { getGeneralFaq } from "@/data/faq";
import { guideSchema, pageMetadata, serializeJsonLd } from "@/data/seo";
import ContentShell from "@/components/ContentShell";
import SourceLinks from "@/components/SourceLinks";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return guides.map((guide) => ({ slug: guide.slug })); }
export async function generateMetadata({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return pageMetadata(`/guides/${guide.slug}`, `${guide.title}｜${dealer.name}`, guide.description, "/og-image.png", true);
}

export default async function GuidePage({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return <ContentShell label={guide.title}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(guideSchema(guide)) }} />
    <article data-entry="guide">
      <Link href="/guides" className="mb-5 inline-block text-sm font-medium text-[#b9000e] underline underline-offset-4">← 所有購車指南</Link>
      <div className="grid items-start gap-7 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="mb-3 text-sm font-bold tracking-wide text-[#b9000e]">{guide.stage} · 約 {guide.readMinutes} 分鐘閱讀</p>
          <h1 className="text-balance text-3xl font-black leading-snug sm:text-4xl">{guide.title}</h1>
          <p className="mt-5 text-[15px] leading-8 text-[#555]">{guide.description}</p>
          <p className="mt-5 text-xs leading-7 text-[#666]">整理：<Link href="/" className="underline">{dealer.name}購車諮詢網站</Link> · 內容更新：<time dateTime={guide.updatedAt}>{guide.updatedAt}</time><br />引用資料核對：<time dateTime={guide.reviewedAt}>{guide.reviewedAt}</time></p>
          <div className="mt-6"><ContactLinks entry="guide" /></div>
        </div>
        <aside className="rounded-2xl border border-[#e3dcd3] bg-[#eee9e2] p-6 sm:p-7">
          <p className="text-xs font-bold tracking-widest text-[#8b5147]">先記住這件事</p><p className="mt-3 text-lg font-bold leading-8">{guide.takeaway}</p>
          <h2 className="mb-3 mt-6 border-t border-[#d9d0c5] pt-5 text-sm font-bold">讀完後，準備這三樣</h2>
          <ul className="space-y-3 text-sm leading-7 text-[#555]">{guide.checklist.map((item) => <li key={item} className="flex items-start gap-3"><span aria-hidden="true" className="text-[#b9000e]">✓</span><span>{item}</span></li>)}</ul>
        </aside>
      </div>
      <div className="mt-10 grid items-start gap-7 lg:grid-cols-[210px_minmax(0,1fr)]">
        <nav aria-label="本文目錄" className="rounded-2xl border border-[#e5e1dd] bg-white p-5 lg:sticky lg:top-6">
          <p className="mb-3 text-sm font-bold">這篇會看什麼</p>
          <ol className="space-y-3 text-sm leading-7 text-[#666]">{guide.sections.map((section, index) => <li key={section.title}><a href={`#step-${index + 1}`} className="flex gap-2 hover:text-[#b9000e]"><span className="font-mono text-[#b9000e]">{String(index + 1).padStart(2, "0")}</span><span>{section.title}</span></a></li>)}</ol>
        </nav>
        <div className="min-w-0 space-y-5">
          {guide.sections.map((section, index) => <section id={`step-${index + 1}`} key={section.title} className="scroll-mt-6 rounded-2xl border border-[#e5e1dd] bg-white p-6 sm:p-8">
            <p aria-hidden="true" className="mb-3 font-mono text-sm text-[#b9000e]">{String(index + 1).padStart(2, "0")}</p><h2 className="mb-5 text-xl font-bold leading-8 sm:text-2xl">{section.title}</h2>
            <div className="space-y-4 text-[15px] leading-8 text-[#555]">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points && <ul className="list-disc space-y-3 pl-5">{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}</div>
          </section>)}
          {["buying-cost", "financing-insurance"].includes(guide.slug) && <Link href="/#loan-calculator" className="inline-block rounded-full bg-[#b9000e] px-6 py-3 text-sm font-bold text-white no-underline">前往首頁貸款試算 →</Link>}
          <section className="rounded-2xl border border-[#e5e1dd] bg-white p-6 sm:p-8"><h2 className="mb-4 text-lg font-bold">參考資料與核對範圍</h2><SourceLinks ids={guide.sourceIds} /><p className="mt-4 text-xs leading-7 text-[#666]">官方資料用於核對規則與基本資訊；本文的準備清單為本站整理。實際報價、文件、核貸及交車安排依個案確認。</p></section>
        </div>
      </div>
      <section className="mt-9 rounded-2xl bg-[#ebe7e2] p-6 sm:p-8"><h2 className="text-xl font-bold">你可能也想問</h2><ul className="mt-4 space-y-3">{guide.faqIds.map((id) => <li key={id}><Link href={`/faq#${id}`} className="text-sm font-medium leading-7 text-[#b9000e] underline underline-offset-4">{getGeneralFaq(id)!.question} →</Link></li>)}</ul></section>
      <section className="mt-9"><h2 className="mb-4 text-xl font-bold">接著閱讀</h2><div className="grid gap-4 sm:grid-cols-2">{guide.relatedSlugs.map((slug) => { const related = getGuide(slug)!; return <Link key={slug} href={`/guides/${slug}`} className="rounded-2xl border border-[#ddd] bg-white p-5 no-underline hover:border-[#b9000e]"><p className="text-xs text-[#666]">{related.stage}</p><h3 className="mt-2 font-bold leading-7 text-[#b9000e]">{related.title} →</h3></Link>; })}</div></section>
    </article>
  </ContentShell>;
}
