import Link from "next/link";
import { notFound } from "next/navigation";
import { cars, getCar, eVitaraPriceSource } from "@/data/site";
import { carPages, carTitle, carVersions, getGuide } from "@/data/content";
import { carSchema, pageMetadata, serializeJsonLd } from "@/data/seo";
import ContentShell, { ArticleSection, ContactLinks } from "@/components/ContentShell";
import CarPageGallery from "@/components/CarPageGallery";
import PromotionNotice from "@/components/PromotionNotice";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return cars.map((car) => ({ slug: car.id })); }
export async function generateMetadata({ params }: Props) {
  const car = getCar((await params).slug);
  if (!car) notFound();
  return pageMetadata(`/cars/${car.id}`, carTitle(car.id), carPages[car.id].description, `/images/${car.id}.jpg`);
}

export default async function CarPage({ params }: Props) {
  const car = getCar((await params).slug);
  if (!car) notFound();
  const content = carPages[car.id];
  return <ContentShell label={`SUZUKI ${car.name}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(carSchema(car)) }} />
    <div data-car-id={car.id} data-entry="car-page" className="grid items-start gap-8 lg:grid-cols-2">
      <div>
        <p className="mb-3 text-sm font-bold tracking-widest text-[#b9000e]">{car.subtitle} · 台灣車款資訊</p>
        <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">SUZUKI {car.name}</h1>
        <p className="mt-3 text-xl font-bold text-[#555]">{car.detail.tagline}</p>
        <p className="mt-5 text-[15px] leading-8 text-[#555]">{content.introduction}</p>
        <p className="mb-5 mt-6 text-sm text-[#666]">建議售價 <strong className="ml-2 text-3xl font-black text-[#b9000e]">{car.price}</strong></p>
        <ContactLinks carId={car.id} entry="car-page" />
        <Link href="/visit/beitou" className="mt-5 inline-block text-sm font-bold text-[#b9000e] underline underline-offset-4">台北北投到店交通與試乘預約</Link>
      </div>
      <CarPageGallery car={car} />
    </div>
    <ArticleSection title="台灣版本與建議售價">
      <div className="overflow-x-auto"><table className="w-full text-left"><caption className="sr-only">{car.name} 台灣版本價格</caption><thead><tr className="border-b border-[#ddd]"><th scope="col" className="py-3 pr-4">版本</th><th scope="col" className="py-3">建議售價</th></tr></thead><tbody>
        {carVersions(car.id).map((version) => <tr key={version.name} className="border-b border-[#eee]"><th scope="row" className="py-3 pr-4 font-medium">{version.name}</th><td className="py-3 font-bold text-[#b9000e]">NT$ {version.priceTwd.toLocaleString("en-US")} 起</td></tr>)}
      </tbody></table></div>
      <p>售價核對：<time dateTime={content.pricesReviewedAt}>{content.pricesReviewedAt}</time>。以上為建議售價，車色、選配、保險、領牌與成交條件請另行確認；實際供應版本與交期需洽詢。</p>
      {car.id === "e-vitara" && <a href={eVitaraPriceSource} target="_blank" rel="noopener noreferrer" className="text-[#b9000e] underline">e VITARA 官方上市價格資料</a>}
    </ArticleSection>
    <ArticleSection title="主要規格與車色">
      <ul className="list-disc space-y-2 pl-5">{car.detail.specs.map((spec) => <li key={spec}>{spec}</li>)}</ul>
      <p>車色參考：{car.detail.colors?.map((color) => color.name).join("、")}。實際車色與配備以台灣規配表及實車為準。</p>
      <p>油耗與續航為官方測試值，實際表現依道路、溫度、載重與駕駛方式而異。規格核對：<time dateTime={content.specsReviewedAt}>{content.specsReviewedAt}</time>。</p>
    </ArticleSection>
    <ArticleSection title="適合的需求與需要考慮的取捨">
      <p><strong>可先評估的用車需求：</strong>{car.detail.whoFor}。</p>
      <ul className="list-disc space-y-2 pl-5">{content.considerations.map((text) => <li key={text}>{text}</li>)}</ul>
    </ArticleSection>
    <ArticleSection title="到店賞車與試乘觀察清單">
      <ul className="list-disc space-y-2 pl-5">{content.testDrive.map((text) => <li key={text}>{text}</li>)}</ul>
      <p>試乘車、路線與可預約時段須先確認，留下需求不代表預約已成立。</p><ContactLinks carId={car.id} entry="car-page" />
    </ArticleSection>
    <ArticleSection title="常見購車問題">
      {content.questions.map((item) => <details key={item.question} className="border-b border-[#eee] pb-3"><summary className="cursor-pointer py-2 font-bold text-[#333]">{item.question}</summary><p className="pt-2">{item.answer}</p></details>)}
    </ArticleSection>
    <ArticleSection title="購車方案與資料來源">
      <PromotionNotice promotion={car.detail.promotion} />
      <p>期間方案以官方活動條件及有效期限為準，最新購車方案請洽詢。</p>
      <div className="flex flex-wrap gap-5 text-[#b9000e]"><a href={car.detail.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">官方車款介紹</a><a href={car.detail.specUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">官方規配表（PDF）</a></div>
      <p className="text-xs">內容整理：張鈺漣購車諮詢網站 · 內容更新：<time dateTime={content.updatedAt}>{content.updatedAt}</time>。選車建議依實際需求討論。</p>
    </ArticleSection>
    <ArticleSection title="延伸閱讀與相關車款">
      <ul className="space-y-3 text-[#b9000e]">
        {content.guideSlugs.map((slug) => { const guide = getGuide(slug)!; return <li key={slug}><Link href={`/guides/${slug}`} className="underline underline-offset-4">{guide.title}</Link></li>; })}
        {content.relatedCars.map((id) => <li key={id}><Link href={`/cars/${id}`} className="underline underline-offset-4">了解 SUZUKI {getCar(id)!.name}</Link></li>)}
        <li><Link href="/visit/beitou" className="underline underline-offset-4">北投所交通與預約資訊</Link></li>
      </ul>
    </ArticleSection>
  </ContentShell>;
}
