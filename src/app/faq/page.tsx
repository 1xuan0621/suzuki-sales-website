import Link from "next/link";
import ContentShell from "@/components/ContentShell";
import ContactLinks from "@/components/ContactLinks";
import FaqExplorer from "@/components/FaqExplorer";
import { cars } from "@/data/site";
import { carFaqs, faqPage } from "@/data/faq";
import { pageMetadata, breadcrumbSchema, serializeJsonLd } from "@/data/seo";

export const metadata = pageMetadata("/faq", faqPage.title, faqPage.description);

export default function FaqPage() {
  return <ContentShell label="常見 QA">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ "@context": "https://schema.org", "@graph": [breadcrumbSchema("/faq", "常見 QA")] }) }} />
    <div className="grid gap-7 lg:grid-cols-[1.3fr_1fr] lg:items-end">
      <div><p className="mb-3 text-sm font-bold tracking-widest text-[#b9000e]">常見 QA</p><h1 className="text-3xl font-black leading-snug sm:text-4xl">買車、用車的疑問，<br />在這裡慢慢釐清。</h1><p className="mt-5 max-w-xl text-[15px] leading-8 text-[#666]">從訂金、保險到跨縣市交車，先找到你想問的。也整理 SWIFT 與 Jimny 的重點問答，其他車型可以直接到所屬頁面查看。</p><p className="mt-4 text-xs leading-6 text-[#777]">內容更新與引用資料核對：<time dateTime={faqPage.updatedAt}>{faqPage.updatedAt}</time></p></div>
      <div className="lg:rounded-2xl lg:bg-[#ebe7e2] lg:p-6"><div className="hidden lg:block"><p className="font-bold">想從頭了解購車流程？</p><p className="mt-2 text-sm leading-7 text-[#666]">六篇指南，從抓預算一路看到交車當天。</p><Link href="/guides" className="mt-3 inline-block text-sm font-bold text-[#b9000e] underline underline-offset-4">前往購車指南 →</Link></div><div className="lg:mt-5 lg:border-t lg:border-[#d6d0ca] lg:pt-5"><ContactLinks entry="content" /></div></div>
    </div>
    <FaqExplorer />
    <section id="car-questions" className="mt-10 scroll-mt-6">
      <p className="text-sm font-bold text-[#b9000e]">依車型找答案</p><h2 className="mt-2 text-2xl font-bold">你的車，有自己的問題清單</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{cars.map((car) => <Link key={car.id} href={`/cars/${car.id}#faq`} className="flex items-center justify-between gap-3 rounded-xl border border-[#ddd] bg-white p-5 no-underline hover:border-[#b9000e]"><div><h3 className="font-bold">{car.name}</h3><p className="mt-1 text-xs leading-6 text-[#666]">{car.subtitle} · {carFaqs[car.id].length} 題車型問答</p></div><span aria-hidden="true" className="text-[#b9000e]">↗</span></Link>)}</div>
    </section>
  </ContentShell>;
}
