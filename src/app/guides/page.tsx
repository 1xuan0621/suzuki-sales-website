import Link from "next/link";
import ContentShell from "@/components/ContentShell";
import ContactLinks from "@/components/ContactLinks";
import { guides, guideIndex } from "@/data/guides";
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
        <p className="mt-4 max-w-2xl text-base leading-8 text-[#555]">第一次買車，和開了多年想換車，煩惱的事不太一樣。<br className="hidden sm:block" />選擇適合你的指南，了解各自的購車流程與準備事項。</p>
      </header>
      <section aria-labelledby="choose-guide-heading" className="mt-10">
        <h2 id="choose-guide-heading" className="text-xl font-bold">你是第一次買車，還是準備換車？</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {guides.map((guide, index) => <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group rounded-2xl border border-[#ddd] bg-white p-6 no-underline transition-colors hover:border-[#b9000e] sm:p-7">
            <p className="text-xs font-medium text-[#777]">{index === 0 ? "還沒買過車，想知道怎麼開始" : "已經有車，要把換車這筆帳算清楚"}</p>
            <h3 className="mt-3 text-2xl font-bold text-[#333]">{guide.audience}</h3>
            <p className="mt-4 text-[15px] leading-7 text-[#666]">{index === 0 ? "預算怎麼抓、試乘要問什麼、菜單怎麼看？從選車開始，陪你走到交車那天。" : "舊車賣多少、還要補多少錢？先比較出售與報廢，再排好不耽誤用車的交接時間。"}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#b9000e]">閱讀{guide.audience}指南 <span aria-hidden="true">→</span></span>
          </Link>)}
        </div>
      </section>
      <aside aria-labelledby="advisor-heading" className="mt-10 border-t border-[#ddd] pt-7">
        <h2 id="advisor-heading" className="text-lg font-bold">還沒決定車款，也可以先聊聊</h2>
        <p className="mt-3 max-w-3xl text-[15px] leading-8 text-[#555]">{dealer.biography} 你可以帶著現在的用車習慣來聊，也可以把還在比較的車款一起提出來，我們從你在意的地方開始看。</p>
        <div className="mt-5"><ContactLinks entry="guide" /></div>
        <Link href="/faq" className="mt-6 inline-block text-sm text-[#555] underline underline-offset-4">只想找一個答案？查看常見 QA →</Link>
      </aside>
    </div>
  </ContentShell>;
}
