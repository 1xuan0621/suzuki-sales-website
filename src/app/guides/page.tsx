import Link from "next/link";
import ContentShell from "@/components/ContentShell";
import ContactLinks from "@/components/ContactLinks";
import { guides, guideIndex, guideCategories, type Guide } from "@/data/guides";
import { dealer } from "@/data/site";
import { siteUrl } from "@/data/content";
import { breadcrumbSchema, pageMetadata, serializeJsonLd } from "@/data/seo";

export const metadata = pageMetadata("/guides", guideIndex.title, guideIndex.description);

const categoryLabels = {
  process: "買車與換車",
  selection: "選車指南",
  jimny: "Jimny 專題",
  ownership: "保養與使用",
  insurance: "保險專區",
};

function GuideCards({ items, heading: Heading = "h3", introductory = false }: {
  items: Guide[];
  heading?: "h3" | "h4";
  introductory?: boolean;
}) {
  return <div className={`mt-5 grid gap-4 ${introductory ? "lg:grid-cols-3" : "sm:grid-cols-2"}`}>
    {items.map((guide, index) => <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group flex min-w-0 flex-col rounded-2xl border border-[#ddd] bg-white p-6 no-underline transition-colors hover:border-[#b9000e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9000e] sm:p-7">
      {introductory && <span className="text-xs font-bold tracking-wider text-[#b9000e]">第 {index + 1} 篇</span>}
      <Heading className={`mt-3 text-balance font-bold leading-8 text-[#333] ${introductory ? "text-xl" : "text-2xl"}`}>{guide.audience}</Heading>
      <p className="mt-4 flex-1 text-[15px] leading-7 text-[#666]">{guide.description}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#b9000e]">閱讀指南 <span aria-hidden="true">→</span></span>
    </Link>)}
  </div>;
}

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
        <p className="mt-4 max-w-2xl text-base leading-8 text-[#555]">從第一次買車、舊車換新車到選車與領牌，先把需求、預算和交車流程想清楚。<br className="hidden sm:block" />鈺漣陪你一步一步確認，也整理交車後的保養與保險資訊。</p>
        <nav aria-label="購車指南分類" className="mt-6 flex flex-wrap gap-2">
          {guideCategories.map((category) => <a key={category.id} href={`#${category.id}`} className="inline-flex min-h-11 items-center rounded-full border border-[#ded6d0] bg-white px-4 py-2 text-sm font-bold text-[#555] no-underline transition-colors hover:border-[#b9000e] hover:text-[#b9000e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9000e]">{categoryLabels[category.id]}</a>)}
        </nav>
      </header>
      {guideCategories.map((category) => <section id={category.id} key={category.id} aria-labelledby={`guide-${category.id}-heading`} className="mt-10 scroll-mt-6">
        <h2 id={`guide-${category.id}-heading`} className="text-xl font-bold">{category.title}</h2>
        <p className="mt-2 text-sm leading-7 text-[#666]">{category.description}</p>
        {category.id === "insurance" ? <>
          <section aria-labelledby="insurance-start-heading" className="mt-6">
            <h3 id="insurance-start-heading" className="text-base font-bold text-[#665c56]">買保險前，先看這三篇</h3>
            <GuideCards items={guides.filter((guide) => guide.category === "insurance" && !guide.emergency)} heading="h4" introductory />
          </section>
          <section aria-labelledby="insurance-emergency-heading" className="mt-8">
            <h3 id="insurance-emergency-heading" className="text-base font-bold text-[#665c56]">已經發生狀況？從這裡查</h3>
            <GuideCards items={guides.filter((guide) => guide.category === "insurance" && guide.emergency)} heading="h4" />
          </section>
        </> : <GuideCards items={guides.filter((guide) => guide.category === category.id)} />}
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
