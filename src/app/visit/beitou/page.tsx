import ContactLinks from "@/components/ContactLinks";
import Image from "next/image";
import Link from "next/link";
import { showroom } from "@/data/content";
import { dealer, cars } from "@/data/site";
import { pageMetadata, breadcrumbSchema, serializeJsonLd } from "@/data/seo";
import ContentShell, { ArticleSection } from "@/components/ContentShell";
import ReferenceDetails from "@/components/ReferenceDetails";

export const metadata = pageMetadata("/visit/beitou", showroom.title, showroom.description);
export default function VisitPage() {
  return <ContentShell label="台北北投到店資訊">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ "@context": "https://schema.org", ...breadcrumbSchema("/visit/beitou", "台北北投到店資訊") }) }} />
    <p className="mb-3 text-sm font-bold tracking-widest text-[#b9000e]">台北賞車 · 先預約再出發</p>
    <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl">SUZUKI 台北到店賞車與試乘</h1>
    <p className="mt-5 max-w-3xl text-[15px] leading-8 text-[#555]">在凱騰鈴木北投所賞車與試乘，現場提供免費停車位。外縣市買家也可先透過 LINE 詢價、討論車款與交車安排。</p>
    <div className="mt-6"><ContactLinks entry="visit" /></div>
    <div className="grid gap-x-6 lg:grid-cols-2">
      <ArticleSection title={showroom.name}>
        <address className="not-italic">{showroom.address}</address>
        <p><strong>展示間電話：</strong><a data-entry="visit" href={showroom.phoneHref} className="underline underline-offset-4">{showroom.phone}</a></p>
        <div><p className="font-bold">官方公告營業時間</p>{showroom.hours.map((hours) => <p key={hours}>{hours}</p>)}</div>
        <a data-entry="visit" href={showroom.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-xl bg-[#e60012] px-5 py-2 font-bold text-white no-underline">開啟地圖導航</a>
      </ArticleSection>
      <ArticleSection title="購車與試乘請聯繫顧問">
        <p><strong>汽車顧問：</strong>{dealer.fullName}</p>
        <p><strong>顧問手機：</strong><a data-entry="visit" href={`tel:${dealer.phone.replace(/\D/g, "")}`} className="underline underline-offset-4">{dealer.phone}</a></p>
        <p><strong>LINE：</strong>@{dealer.line}</p>
      </ArticleSection>
    </div>
    <ArticleSection title="交通與停車怎麼安排">
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <figure className="overflow-hidden rounded-xl border border-[#e5e5e5] bg-[#f5f5f5]">
          <Image
            src="/images/beitou-exterior-entrance.jpg"
            alt="SUZUKI 北投所正面，凱騰鈴木北投招牌與右側入口門牌337"
            width={1200}
            height={675}
            sizes="(min-width: 1180px) 500px, (min-width: 1024px) 45vw, (min-width: 640px) 85vw, 90vw"
            className="h-auto w-full"
          />
          <figcaption className="px-4 py-3 text-xs leading-6 text-[#666]">抵達時可辨識「凱騰鈴木北投」招牌。</figcaption>
        </figure>
        <div className="space-y-4">
          <p>導航搜尋「凱騰鈴木北投所」，入口在承德路六段337號。</p>
          <p>停放位置可詢問現場人員；需要協助上下車，可在預約時告知。</p>
        </div>
      </div>
    </ArticleSection>
    <ArticleSection title="搭公車與捷運轉乘怎麼到店">
      <p>{showroom.transit.bus}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {showroom.transit.connections.map((connection) => <div key={connection.title} className="rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-5">
          <h3 className="mb-2 font-bold text-[#222]">{connection.title}</h3>
          <p>{connection.description}</p>
          <a href={connection.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[#b9000e] underline underline-offset-4">{connection.linkLabel} ↗</a>
        </div>)}
      </div>
      <a data-entry="visit" href={showroom.transit.walkingUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-xl bg-[#e60012] px-5 py-2 font-bold text-white no-underline">下車後開啟步行導航</a>
      <p>{showroom.transit.note}</p>
    </ArticleSection>
    <ArticleSection title="預約與到店流程">
      <ol className="list-decimal space-y-3 pl-5">
        <li>用 LINE 傳想看的車款、日期與同行人數，預約展示或試乘車。</li>
        <li>收到鈺漣回覆的車款與時段後再出發，需攜帶的資料會在預約時說明。</li>
        <li>常用的嬰兒車、行李或安全座椅可一起帶來，家人坐好後直接試放。</li>
      </ol>
    </ArticleSection>
    <ArticleSection title="出發前先了解車款">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{cars.map((car) => <Link key={car.id} href={`/cars/${car.id}`} className="rounded-xl border border-[#ddd] px-4 py-3 font-bold text-[#b9000e] no-underline hover:bg-red-50">SUZUKI {car.name} →</Link>)}</div>
      <Link href="/guides/first-car#paperwork" className="inline-block text-[#b9000e] underline underline-offset-4">外縣市客戶：購車與交車流程指南</Link>
    </ArticleSection>
    <ReferenceDetails className="mt-6">
      <a href={showroom.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">台灣 Suzuki／凱騰鈴木官方據點資料</a>
    </ReferenceDetails>
  </ContentShell>;
}
