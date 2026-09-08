import ContactLinks from "@/components/ContactLinks";
import Link from "next/link";
import { showroom } from "@/data/content";
import { dealer, cars } from "@/data/site";
import { pageMetadata, breadcrumbSchema, serializeJsonLd } from "@/data/seo";
import ContentShell, { ArticleSection } from "@/components/ContentShell";

export const metadata = pageMetadata("/visit/beitou", showroom.title, showroom.description);
export default function VisitPage() {
  return <ContentShell label="台北北投到店資訊">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ "@context": "https://schema.org", ...breadcrumbSchema("/visit/beitou", "台北北投到店資訊") }) }} />
    <p className="mb-3 text-sm font-bold tracking-widest text-[#b9000e]">台北賞車 · 先預約再出發</p>
    <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl">SUZUKI 台北到店賞車與試乘</h1>
    <p className="mt-5 max-w-3xl text-[15px] leading-8 text-[#555]">張鈺漣的實際服務據點位於凱騰鈴木北投所。全台客戶都可先遠端購車諮詢；需要到店時，先確認想看的車款、展示或試乘車及時間，再安排前往台北。</p>
    <div className="mt-6"><ContactLinks entry="visit" /></div>
    <div className="grid gap-x-6 lg:grid-cols-2">
      <ArticleSection title={showroom.name}>
        <address className="not-italic">{showroom.address}</address>
        <p><strong>展示間電話：</strong><a data-entry="visit" href={showroom.phoneHref} className="underline underline-offset-4">{showroom.phone}</a></p>
        <div><p className="font-bold">官方公告營業時間</p>{showroom.hours.map((hours) => <p key={hours}>{hours}</p>)}</div>
        <p>營業時間不代表顧問全時在場。國定假日、臨時調整與您的預約時間請另行確認。</p>
        <a data-entry="visit" href={showroom.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-xl bg-[#e60012] px-5 py-2 font-bold text-white no-underline">開啟地圖導航</a>
      </ArticleSection>
      <ArticleSection title="購車與試乘請聯繫顧問">
        <p><strong>汽車顧問：</strong>{dealer.name}</p>
        <p><strong>顧問手機：</strong><a data-entry="visit" href={`tel:${dealer.phone.replace(/\D/g, "")}`} className="underline underline-offset-4">{dealer.phone}</a></p>
        <p><strong>LINE：</strong>@{dealer.line}</p>
        <p>顧問可先了解車款、用途及購車需求，再確認到店安排。展示間電話與顧問手機分別提供據點及個人服務聯繫。</p>
        <p>跨縣市購車及交車可個別討論，交車地點、費用、時程與可安排範圍需事前確認。</p>
      </ArticleSection>
    </div>
    <ArticleSection title="交通與停車怎麼安排">
      <p>目的地為台北市北投區承德路六段337號。請使用上方地圖依出發位置查看開車、大眾運輸或步行路線，並留意出發當天的交通狀況。</p>
      <p>北投所提供免費停車位。到店時可向現場人員詢問停放位置；如有上下車或行動協助需求，請在預約時告知顧問。</p>
      <p>搭乘大眾運輸時，可先以地圖確認下車位置及後續步行路線；不熟悉附近環境，也可以在出發前向顧問詢問。</p>
    </ArticleSection>
    <ArticleSection title="預約與到店流程">
      <ol className="list-decimal space-y-3 pl-5">
        <li>先告知想了解的車款、方便的日期與同行人數；尚未決定車款也可以先討論用途。</li>
        <li>由顧問確認展示或試乘車、時段、可安排路線、試乘資格及需攜帶的資料。</li>
        <li>收到顧問確認後再出發；網站表單顯示收件成功，代表收到需求，並非試乘預約已成立。</li>
        <li>到店依自己的需求試坐、查看載物及停車條件，試乘後再整理版本與報價問題。</li>
      </ol>
    </ArticleSection>
    <ArticleSection title="出發前先了解車款">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{cars.map((car) => <Link key={car.id} href={`/cars/${car.id}`} className="rounded-xl border border-[#ddd] px-4 py-3 font-bold text-[#b9000e] no-underline hover:bg-red-50">SUZUKI {car.name} →</Link>)}</div>
      <Link href="/guides#paperwork" className="inline-block text-[#b9000e] underline underline-offset-4">外縣市客戶：購車與交車流程指南</Link>
    </ArticleSection>
    <p className="mt-6 text-xs leading-7 text-[#666]">據點資料核對及內容更新：<time dateTime={showroom.reviewedAt}>{showroom.reviewedAt}</time> · <a href={showroom.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">台灣 Suzuki／凱騰鈴木官方據點資料</a></p>
  </ContentShell>;
}
