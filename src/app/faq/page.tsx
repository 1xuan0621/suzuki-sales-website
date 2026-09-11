import Link from "next/link";
import ContentShell from "@/components/ContentShell";
import ContactLinks from "@/components/ContactLinks";
import FaqExplorer from "@/components/FaqExplorer";
import { cars } from "@/data/site";
import { faqPage } from "@/data/faq";
import { pageMetadata, breadcrumbSchema, serializeJsonLd } from "@/data/seo";

export const metadata = pageMetadata("/faq", faqPage.title, faqPage.description);

export default function FaqPage() {
  return <ContentShell label="常見 QA">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ "@context": "https://schema.org", "@graph": [breadcrumbSchema("/faq", "常見 QA")] }) }} />
    <div className="mx-auto max-w-3xl">
      <header>
        <h1 className="text-3xl font-black leading-snug sm:text-4xl">常見 QA</h1>
        <p className="mt-3 text-base leading-7 text-[#666]">選一個問題，找到你需要的答案。</p>
        <div className="mt-5"><ContactLinks entry="content" /></div>
      </header>
      <FaqExplorer />
      <section id="car-questions" className="mt-10 scroll-mt-6 border-t border-[#ddd] pt-7">
        <h2 className="text-lg font-bold">各車型常見問題</h2>
        <div className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-3">{cars.map((car) => <Link key={car.id} href={`/cars/${car.id}#faq`} className="flex items-center justify-between gap-2 border-b border-[#e3e0dc] py-4 text-sm font-medium no-underline hover:text-[#b9000e]">{car.name}<span aria-hidden="true">→</span></Link>)}</div>
        <Link href="/guides" className="mt-7 inline-block text-sm font-medium text-[#333] underline underline-offset-4">從選車、交車到保養，查看購車指南 →</Link>
        <p className="mt-5 text-xs leading-6 text-[#777]">內容更新：<time dateTime={faqPage.updatedAt}>{faqPage.updatedAt}</time>。各題參考資料列於答案內。</p>
      </section>
    </div>
  </ContentShell>;
}
