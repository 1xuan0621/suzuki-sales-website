import Link from "next/link";
import ContentShell from "@/components/ContentShell";
import ContactLinks from "@/components/ContactLinks";
import GuideCards from "@/components/GuideCards";
import { guideIndex } from "@/data/guides";
import { pageMetadata, breadcrumbSchema, serializeJsonLd } from "@/data/seo";

export const metadata = pageMetadata("/guides", guideIndex.title, guideIndex.description);

export default function GuidesPage() {
  return <ContentShell label="購車指南">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ "@context": "https://schema.org", "@graph": [breadcrumbSchema("/guides", "購車指南")] }) }} />
    <div className="grid items-end gap-7 lg:grid-cols-[1.3fr_1fr]">
      <div><p className="mb-3 text-sm font-bold tracking-widest text-[#b9000e]">購車指南</p><h1 className="text-3xl font-black leading-snug sm:text-4xl">從第一份報價，<br />到安心把車開回家。</h1><p className="mt-5 max-w-xl text-[15px] leading-8 text-[#666]">第一次買車，或準備換下一台車，都可以從這裡開始。先算清費用，再看懂合約，最後帶著清單完成交車。</p><div className="mt-6"><ContactLinks entry="guide" /></div></div>
      <aside className="rounded-2xl bg-[#ebe7e2] p-6"><p className="text-sm font-bold">按照你現在的進度閱讀</p><p className="mt-3 text-sm leading-8 text-[#555]">還在考慮 → 先抓預算、看報價<br />準備下訂 → 貸款、保險與合約<br />已經訂車 → 領牌與交車清單</p><p className="mt-4 border-t border-[#d6d0ca] pt-4 text-xs leading-6 text-[#666]">跨縣市交車與舊車換購，可在下訂前一起安排。</p></aside>
    </div>
    <section aria-labelledby="guide-list-heading" className="mt-10"><h2 id="guide-list-heading" className="mb-5 text-xl font-bold">六篇指南，把每一步準備好</h2><GuideCards /></section>
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#333] p-6 text-white"><div><h2 className="text-lg font-bold">只想找一個問題的答案？</h2><p className="mt-2 text-sm leading-7 text-[#ddd]">訂金、交期、保養，以及各車型的常見疑問。</p></div><Link href="/faq" className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#333] no-underline">查找常見 QA →</Link></div>
  </ContentShell>;
}
