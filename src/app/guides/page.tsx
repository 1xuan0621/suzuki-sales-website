import Link from "next/link";
import ContentShell from "@/components/ContentShell";
import ContactLinks from "@/components/ContactLinks";
import { guides, guideIndex, guideCategories } from "@/data/guides";
import { dealer } from "@/data/site";
import { siteUrl } from "@/data/content";
import { breadcrumbSchema, pageMetadata, serializeJsonLd } from "@/data/seo";

export const metadata = pageMetadata("/guides", guideIndex.title, guideIndex.description);

export default function GuidesPage() {
  const schema = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "CollectionPage", url: `${siteUrl}/guides`, name: guideIndex.title, description: guideIndex.description,
        mainEntity: { "@type": "ItemList", itemListElement: guides.map((guide, index) => ({ "@type": "ListItem", position: index + 1, name: guide.title, url: `${siteUrl}/guides/${guide.slug}` })) } },
      breadcrumbSchema("/guides", "購車指南"),
    ],
  };
  return <ContentShell label="購車指南">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
    <div data-entry="guide" className="mx-auto max-w-5xl">
      <header>
        <p className="text-xs font-bold tracking-[0.16em] text-[#b9000e]">跟鈺漣一起準備下一台車</p>
        <h1 className="mt-3 text-3xl font-black leading-snug sm:text-4xl">Suzuki 購車指南</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[#555]">從 Jimny 發展史與改裝問題，到第一次買車、換車、選休旅、交車後保養、事故保險與突發狀況。<br className="hidden sm:block" />找到你正在想的問題，帶著清單一步一步確認。</p>
      </header>
      <aside aria-labelledby="quick-help-heading" className="mt-6 rounded-xl border border-[#e6c5c5] bg-[#fff5f3] px-5 py-4 text-[#9c0011]">
        <h2 id="quick-help-heading" className="text-base font-bold leading-7">用車遇到狀況？先看現場速查</h2>
        <div className="mt-1 grid grid-cols-2 gap-3 sm:flex sm:gap-7">
          <Link href="/guides/car-accident-insurance#accident-summary" className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-bold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9000e]">碰撞出險 <span aria-hidden="true">→</span></Link>
          <Link href="/guides/roadside-emergencies#accident-summary" className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-bold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9000e]">爆胎故障 <span aria-hidden="true">→</span></Link>
        </div>
      </aside>
      {guideCategories.map((category) => <section key={category.id} aria-labelledby={`guide-${category.id}-heading`} className="mt-10">
        <h2 id={`guide-${category.id}-heading`} className="text-xl font-bold">{category.title}</h2>
        <p className="mt-2 text-sm leading-7 text-[#666]">{category.description}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {guides.filter((guide) => guide.category === category.id).map((guide) => <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group flex flex-col rounded-2xl border border-[#ddd] bg-white p-6 no-underline transition-colors hover:border-[#b9000e] sm:p-7">
            <h3 className="mt-3 text-balance text-2xl font-bold text-[#333]">{guide.audience}</h3>
            <p className="mt-4 flex-1 text-[15px] leading-7 text-[#666]">{guide.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#b9000e]">閱讀指南 <span aria-hidden="true">→</span></span>
          </Link>)}
        </div>
        {category.id === "insurance" && <Link href="/faq#category-emergency" className="mt-4 inline-block text-sm font-medium leading-7 text-[#b9000e] underline underline-offset-4">更多用車情境與常見 QA →</Link>}
      </section>)}
      <aside aria-labelledby="advisor-heading" className="mt-10 border-t border-[#ddd] pt-7">
        <h2 id="advisor-heading" className="text-lg font-bold">還沒決定車款，也可以先聊聊</h2>
        <p className="mt-3 max-w-3xl text-[15px] leading-8 text-[#555]">{dealer.biography} 你可以帶著現在的用車習慣來聊，也可以把還在比較的車款一起提出來，我們從你在意的地方開始看。</p>
        <div className="mt-5"><ContactLinks entry="guide" /></div>
        <Link href="/faq" className="mt-6 inline-block text-sm text-[#555] underline underline-offset-4">只想找一個答案？查看常見 QA →</Link>
      </aside>
    </div>
  </ContentShell>;
}
