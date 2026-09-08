import ContactLinks from "@/components/ContactLinks";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCar, dealer } from "@/data/site";
import { guides, getGuide, carPages, showroom } from "@/data/content";
import { guideSchema, pageMetadata, serializeJsonLd } from "@/data/seo";
import ContentShell, { ArticleSection } from "@/components/ContentShell";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return guides.map((guide) => ({ slug: guide.slug })); }
export async function generateMetadata({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return pageMetadata(`/guides/${guide.slug}`, `${guide.title}｜${dealer.name}`, guide.description, `/images/${guide.carIds[0]}.jpg`, true);
}

function ComparisonTable() {
  const compared = [getCar("vitara")!, getCar("s-cross")!];
  const rows = [
    { label: "建議起價", value: (car: typeof compared[number]) => car.price },
    ...["引擎", "驅動", "行李箱", "油耗"].map((label) => ({ label, value: (car: typeof compared[number]) => car.detail.specs.find((spec) => spec.startsWith(`${label}：`))?.split("：").slice(1).join("：") || "請洽詢" })),
  ];
  return <ArticleSection title="台灣版本比較">
    <div role="region" aria-label="VITARA 與 S-CROSS 比較表，可橫向捲動" tabIndex={0} className="overflow-x-auto rounded-xl border border-[#ddd]">
      <table className="w-full min-w-[550px] text-left text-sm"><caption className="sr-only">台灣販售版本的 VITARA 與 S-CROSS 比較</caption><thead className="bg-[#f5f5f5]"><tr><th scope="col" className="p-4">項目</th>{compared.map((car) => <th key={car.id} scope="col" className="p-4">{car.name}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.label} className="border-t border-[#ddd]"><th scope="row" className="p-4 align-top">{row.label}</th>{compared.map((car) => <td key={car.id} className="p-4 align-top">{row.value(car)}</td>)}</tr>)}</tbody></table>
    </div>
    <p>規格核對：{carPages.vitara.specsReviewedAt}。價格、配備及量測條件請對照下方兩款官方規配表；油耗為測試值，行李箱最大容積需配合後座傾倒，不代表乘客坐滿時的可用空間。</p>
  </ArticleSection>;
}

export default async function GuidePage({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const primaryCar = getCar(guide.carIds[0])!;
  return <ContentShell label={guide.title} carId={guide.carIds.length === 1 ? primaryCar.id : undefined}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(guideSchema(guide)) }} />
    <article data-entry="guide">
      <div className="grid items-center gap-7 lg:grid-cols-[1.3fr_1fr]">
        <div><p className="mb-3 text-sm font-bold tracking-widest text-[#b9000e]">購車指南 · 選車前的準備</p><h1 className="text-balance text-3xl font-black leading-snug sm:text-4xl">{guide.title}</h1><p className="mt-5 text-[15px] leading-8 text-[#555]">{guide.description}</p><p className="mt-5 text-xs leading-7 text-[#666]">作者：<Link href="/" className="underline">{dealer.name}</Link> · 內容更新：<time dateTime={guide.updatedAt}>{guide.updatedAt}</time><br />引用資料核對：<time dateTime={guide.reviewedAt}>{guide.reviewedAt}</time></p><div className="mt-6"><ContactLinks carId={guide.carIds.length === 1 ? primaryCar.id : undefined} entry="guide" /></div></div>
        <figure className="overflow-hidden rounded-2xl border border-[#ddd] bg-white"><div className="relative aspect-video"><Image src={`/images/${primaryCar.id}.jpg`} alt={`SUZUKI ${primaryCar.name} 官方產品外觀照片`} fill sizes="(max-width: 1024px) 100vw, 450px" className="object-contain" /></div><figcaption className="px-4 py-3 text-xs leading-6 text-[#666]">台灣 Suzuki 官方產品照片，非本站自行拍攝。</figcaption></figure>
      </div>
      {guide.slug === "vitara-vs-s-cross" && <ComparisonTable />}
      {guide.sections.map((section) => <ArticleSection key={section.title} title={section.title}>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points && <ul className="list-disc space-y-2 pl-5">{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}</ArticleSection>)}
      {guide.slug === "swift-buying-cost" && <p className="mt-7"><Link href="/#loan-calculator" className="inline-block rounded-xl bg-[#e60012] px-6 py-3 font-bold text-white no-underline">前往首頁貸款試算</Link></p>}
      <ArticleSection title="相關車款與官方資料">
        <div className="grid gap-5 sm:grid-cols-2">{guide.carIds.map((id) => { const car = getCar(id)!; return <div key={id}><Link href={`/cars/${id}`} className="font-bold text-[#b9000e] underline underline-offset-4">SUZUKI {car.name} 完整介紹</Link><div className="mt-2 flex flex-wrap gap-4 text-sm"><a href={car.detail.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">官方車款介紹</a><a href={car.detail.specUrl} target="_blank" rel="noopener noreferrer" className="underline">官方規配表（PDF）</a></div></div>; })}</div>
        {guide.slug === "buying-process" && <a href={showroom.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-block underline">官方據點資料</a>}
        <p>本文整理選車及詢價時可確認的事項，實際車輛、報價、文件與交車安排請依個別需求向顧問確認。</p>
      </ArticleSection>
      <ArticleSection title="帶著問題，安排下一步">
        <p><Link href="/visit/beitou" className="font-bold text-[#b9000e] underline underline-offset-4">查看台北北投到店交通與試乘預約</Link></p>
        {guide.slug !== "buying-process" && <Link href="/guides/buying-process" className="inline-block text-[#b9000e] underline underline-offset-4">了解跨縣市購車與交車流程</Link>}
      </ArticleSection>
    </article>
  </ContentShell>;
}
