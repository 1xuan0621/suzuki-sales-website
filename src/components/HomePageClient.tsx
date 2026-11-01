"use client";

import { Suspense, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useConsultation } from "./ConsultationProvider";
import ConsultationPrefill from "./ConsultationPrefill";
import PrivacyNotice from "./PrivacyNotice";
import SiteFrame from "./SiteFrame";
import { cars, usageOptions, budgetRanges, dealer } from "@/data/site";
import { R } from "@/data/constants";
import CompareBar from "@/components/CompareBar";
import LoanCalculator from "@/components/LoanCalculator";
import DeliveryCarousel from "@/components/DeliveryCarousel";

type HomeTopic = { href: string; title: string; description: string };
type HomePhoto = { src: string; alt: string; width: number; height: number };

export default function HomePageClient({ introduction, mobileIntroduction, jimnyTopics, jimnyPhoto, serviceReviews, carCards }: { introduction: string; mobileIntroduction: string; jimnyTopics: HomeTopic[]; jimnyPhoto: HomePhoto; serviceReviews: ReactNode; carCards: ReactNode }) {
  const { form, update, submitted, formError, website, setWebsite, sending, handleSubmit } = useConsultation();


  const lineHref = `https://line.me/R/ti/p/~${dealer.line}`;
  const phoneHref = `tel:${dealer.phone.replace(/\D/g, "")}`;


  return (
    <>
      <Suspense fallback={null}><ConsultationPrefill /></Suspense>
      <SiteFrame>
        <main>
          {/* ═══════ HERO — 大頭照 + 資訊 ═══════ */}
          <section
            data-entry="hero"
            className="relative px-11 pb-[54px] pt-[34px] text-white overflow-hidden max-sm:px-[22px] max-sm:pb-6 max-sm:pt-5"
            style={{
              background: `radial-gradient(circle at 85% 30%, rgba(255,255,255,0.16), transparent 28%), linear-gradient(135deg, ${R}, #bd0010 70%, #9d000b)`,
            }}
          >
            <div className="absolute w-[420px] h-[110px] -left-[120px] bottom-12 bg-white/8 skew-x-[-24deg] pointer-events-none max-sm:hidden" />
            <div className="absolute w-[360px] h-[160px] -right-[100px] top-[88px] bg-white/8 skew-x-[-24deg] pointer-events-none max-sm:hidden" />

            <div className="relative z-10 flex items-center gap-10 max-md:flex-col max-md:text-center max-sm:grid max-sm:grid-cols-[84px_minmax(0,1fr)] max-sm:gap-x-4 max-sm:gap-y-4 max-sm:text-left">
              {/* 大頭照 */}
              <div className="flex-shrink-0">
                <div className="w-[140px] h-[140px] max-sm:w-[84px] max-sm:h-[84px] rounded-full border-4 border-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden bg-white/10">
                  <img
                    src="/images/avatar.jpg"
                    alt={dealer.fullName}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 0%" }}
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = "none";
                      t.parentElement!.classList.add(
                        "flex",
                        "items-center",
                        "justify-center",
                        "text-white/60",
                        "font-bold",
                        "text-3xl"
                      );
                      t.parentElement!.textContent = dealer.fullName.charAt(0);
                    }}
                  />
                </div>
              </div>

              <div className="flex-1 max-sm:contents">
                <div>
                  <h1
                    className="m-0 text-[clamp(44px,7vw,72px)] leading-none tracking-[0.06em] font-bold max-sm:text-4xl"
                  >
                    <span className="mb-4 flex items-center gap-3 text-xl leading-snug tracking-normal max-md:justify-center max-sm:mb-2 max-sm:justify-start max-sm:gap-2 max-sm:text-sm">
                      <img
                        src="/suzuki-logo.svg"
                        alt="SUZUKI"
                        width={496}
                        height={332}
                        className="h-[42px] w-auto shrink-0 brightness-0 invert max-sm:h-[26px]"
                      />
                      <span>台北汽車顧問</span>
                    </span>
                    {dealer.fullName}
                  </h1>
                  <p className="inline-block mt-[18px] pb-3 border-b-2 border-white/80 text-[19px] tracking-[0.18em] max-sm:hidden">
                    全台購車諮詢 / 台北預約試乘
                  </p>
                </div>

                <p className="mt-3 max-w-[650px] text-[15px] leading-7 text-white max-sm:hidden">{dealer.biography}</p>
                <p className="mt-2 max-w-[650px] text-sm leading-7 text-white/95 max-sm:hidden">{introduction}</p>
                <p className="hidden text-[15px] leading-7 text-white max-sm:col-span-2 max-sm:block">{mobileIntroduction}</p>

                {/* 社群按鈕 — 僅 logo 小圓 */}
                <div className="flex justify-end max-md:justify-center gap-2 mt-4 md:mt-0 max-sm:col-span-2 max-sm:mt-0 max-sm:justify-end">
                  <a
                    href="https://www.facebook.com/profile.php?id=100092443294776&locale=zh_TW"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid place-items-center w-11 h-11 bg-[#145DBF] hover:bg-[#0F4C9B] rounded-full text-white text-[17px] font-bold no-underline transition-colors"
                    aria-label="Facebook 粉絲專頁"
                  >
                    f
                  </a>
                  <a
                    href="https://www.threads.net/@lian____06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid place-items-center w-11 h-11 bg-[#000] hover:bg-[#222] rounded-full text-white text-[17px] font-bold no-underline transition-colors"
                    aria-label="Threads"
                  >
                    @
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════ 聯絡資訊 3 欄 ═══════ */}
          <section aria-label="聯絡資訊" data-entry="hero" className="w-[calc(100%-88px)] mx-auto mt-[34px] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-sm:w-[calc(100%-28px)] max-sm:mt-5 max-sm:grid-cols-1 max-sm:gap-[14px]">
            <article className="flex min-w-0 items-center gap-3 p-4 bg-white border border-[#e7e7e7] rounded-2xl shadow-[0_6px_18px_rgba(20,20,20,0.05)] border-l-5 border-l-[#e60012]">
              <div className="flex-shrink-0 grid place-items-center w-11 h-11 rounded-full bg-[#e60012] text-white text-2xl font-extrabold">
                ☎
              </div>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[#666] text-xs font-bold leading-5">電話諮詢</p>
                <h2 className="my-1 whitespace-nowrap text-[22px] font-semibold leading-7 text-[#e60012]">
                  {dealer.phone}
                </h2>
                <a
                  href={phoneHref}
                  className="mt-2 inline-flex min-h-10 items-center justify-center whitespace-nowrap px-3 py-2 border border-[#e60012] rounded-lg text-[#e60012] font-extrabold no-underline transition-colors hover:bg-[#e60012] hover:text-white text-sm"
                >
                  立即撥打
                </a>
              </div>
            </article>

            <article className="flex min-w-0 items-center gap-3 p-4 bg-white border border-[#e7e7e7] rounded-2xl shadow-[0_6px_18px_rgba(20,20,20,0.05)] border-l-5 border-l-[#06C755]">
              <div className="flex-shrink-0 grid place-items-center w-11 h-11 rounded-full bg-[#06C755] text-white text-[11px] font-extrabold">
                LINE
              </div>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[#666] text-xs font-bold leading-5">LINE 聯絡</p>
                <h2 className="my-1 whitespace-nowrap text-[22px] font-semibold leading-7 text-[#06C755]">
                  @{dealer.line}
                </h2>
                <a
                  href={lineHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-10 items-center justify-center whitespace-nowrap px-3 py-2 border border-[#06C755] rounded-lg text-[#06C755] font-extrabold no-underline transition-colors hover:bg-[#06C755] hover:text-white text-sm"
                >
                  加入好友
                </a>
              </div>
            </article>

            <article className="sm:col-span-2 lg:col-span-1 flex min-w-0 items-center gap-3 p-4 bg-white border border-[#e7e7e7] rounded-2xl shadow-[0_6px_18px_rgba(20,20,20,0.05)] border-l-5 border-l-[#e60012]">
              <div className="flex-shrink-0 grid place-items-center w-11 h-11 rounded-full bg-[#e60012] text-white text-2xl font-extrabold">
                📍
              </div>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[#666] text-xs font-bold leading-5">服務據點</p>
                <h2 className="my-1 text-lg font-semibold leading-6 text-[#e60012]">
                  凱騰鈴木北投所
                </h2>
                <p className="m-0 text-[13px] leading-5 text-[#666]">
                  {dealer.location.split("｜")[1] || dealer.location}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.location.replace(/｜.*/, ""))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-center whitespace-nowrap px-3 py-2 border border-[#e60012] rounded-lg text-[#e60012] font-extrabold no-underline transition-colors hover:bg-[#e60012] hover:text-white text-sm"
                >
                  查看地圖
                </a>
                <Link href="/visit/beitou" className="inline-flex min-h-10 items-center whitespace-nowrap text-sm font-bold text-[#b9000e] underline underline-offset-4">交通與試乘</Link>
                </div>
              </div>
            </article>
          </section>

          <section id="cars" aria-labelledby="home-cars-heading" className="mx-auto mt-5 w-[calc(100%-28px)] scroll-mt-6 border-t border-[#ddd] pt-6 sm:mt-[34px] sm:w-[calc(100%-88px)] sm:pt-[34px]">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <h2 id="home-cars-heading" className="text-[23px] font-bold sm:text-[28px]">找到適合你的 Suzuki</h2>
              <Link href="/cars" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#a9000d] underline underline-offset-4">車款總覽與比較 <span aria-hidden="true">→</span></Link>
            </div>
            {carCards}
            <div className="mt-3 flex justify-end">
              <a href="#loan-calculator" className="inline-flex min-h-11 items-center text-sm font-bold text-[#a9000d] underline underline-offset-4">貸款試算 →</a>
            </div>
          </section>

          <section aria-labelledby="jimny-topics-heading" className="w-[calc(100%-88px)] mx-auto mt-[34px] rounded-2xl border border-[#e1d8d2] bg-[#fffaf6] p-6 max-sm:w-[calc(100%-28px)] max-sm:mt-5 max-sm:p-5">
            <div className="grid gap-x-8 gap-y-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center">
              <div className="lg:col-start-2 lg:self-end">
                <p className="text-xs font-bold tracking-widest text-[#b9000e]">JIMNY 專題</p>
                <h2 id="jimny-topics-heading" className="mt-2 text-2xl font-bold leading-snug">Jimny 歷代車型與改裝指南</h2>
              </div>
              <figure className="w-full max-w-[320px] justify-self-center lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-none">
                <Image
                  src={jimnyPhoto.src}
                  alt={jimnyPhoto.alt}
                  width={jimnyPhoto.width}
                  height={jimnyPhoto.height}
                  sizes="(min-width: 1024px) 280px, (min-width: 390px) 320px, calc(100vw - 70px)"
                  className="h-auto w-full rounded-xl"
                />
              </figure>
              <div className="min-w-0 lg:col-start-2 lg:self-start">
                <div className="grid gap-4 sm:grid-cols-2">
                  {jimnyTopics.map((topic) => <Link key={topic.href} href={topic.href} className="rounded-xl border border-[#e1d8d2] bg-white p-5 no-underline transition-colors hover:border-[#b9000e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9000e]">
                    <h3 className="text-lg font-bold leading-7 text-[#333]">{topic.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#666]">{topic.description}</p>
                    <span className="mt-4 inline-block text-sm font-bold text-[#b9000e]">閱讀專題 <span aria-hidden="true">→</span></span>
                  </Link>)}
                </div>
                <Link href="/cars/jimny#faq" className="mt-5 inline-block text-sm font-bold text-[#b9000e] underline underline-offset-4">想問通勤、四驅或五門？看 Jimny 常見 QA →</Link>
              </div>
            </div>
          </section>

          {/* 服務項目卡片暫不顯示；原始資料保留於 site.ts。 */}

          {/* ═══════ 交車照片 — Carousel ═══════ */}
          <section className="w-[calc(100%-88px)] mx-auto mt-[34px] pt-[34px] border-t border-[#ddd] max-sm:w-[calc(100%-28px)] max-sm:mt-5">
            <div className="flex items-end justify-between gap-5 mb-5 max-sm:flex-col max-sm:items-start">
              <div>
                <p className="m-0 text-[#666] text-[15px] font-bold">真實交車紀錄</p>
                <h2 className="mt-0.5 mb-0 text-[28px] leading-tight max-sm:text-[23px]">
                  每一位車主的笑容，都是我最大的動力
                </h2>
              </div>
            </div>

            <DeliveryCarousel />
          </section>

          {serviceReviews}

          {/* ═══════ 詢問表單區塊 ═══════ */}
          <section
            id="contact"
            data-entry="contact"
            data-car-id={cars.find((car) => car.name === form.car)?.id}
            className="w-[calc(100%-88px)] mx-auto mt-[34px] p-[26px] bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)] max-sm:w-[calc(100%-28px)] max-sm:mt-5 max-sm:p-[18px]"
          >
            <div className="flex items-center gap-[14px] mb-[22px]">
              <div className="flex-shrink-0 grid place-items-center w-12 h-12 rounded-full bg-[#e60012] text-white text-[22px] font-extrabold">
                💬
              </div>
              <div>
                <p className="m-0 text-[#666] text-[15px] font-bold">快速諮詢</p>
                <h2 tabIndex={-1} id="contact-heading" className="mt-0.5 mb-0 text-[28px] leading-tight max-sm:text-[23px]">
                  留下需求，我將盡快與您聯繫
                </h2>
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-3" role="status">
                <div className="flex-shrink-0 grid place-items-center w-16 h-16 rounded-full bg-[#e60012] text-white text-[30px] font-extrabold mx-auto">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-[#202020]">需求已收件</h3>
                <p className="text-[#666]">
                  我會盡快與你聯繫！也可以直接加 LINE 😊
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-[280px_1fr] gap-[34px] items-stretch max-lg:grid-cols-1">
                <aside className="grid place-items-center content-center min-h-[320px] p-6 border border-[#e7e7e7] rounded-2xl text-center bg-white max-lg:min-h-[auto] max-lg:py-8 max-sm:hidden">
                  <img
                    src="/images/line-qr.jpg"
                    alt="LINE QR Code"
                    className="w-[180px] h-[180px] object-contain rounded-xl"
                    onError={(event) => { event.currentTarget.hidden = true; }}
                  />
                  <h3 className="mt-4 text-[22px] font-bold text-[#202020]">掃碼加入 LINE</h3>
                  <p className="m-0 text-[#666] text-sm">詢問車款、報價與試乘</p>
                </aside>

                <form onSubmit={handleSubmit} className="grid gap-[14px]" aria-busy={sending}>
                  <fieldset disabled={sending} className="contents">
                  <div className="hidden" aria-hidden="true">
                    <label>網站<input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
                  </div>
                  <label className="grid grid-cols-[120px_1fr] gap-[18px] items-center font-extrabold max-sm:grid-cols-1 max-sm:gap-1.5">
                    <span>姓名 <span aria-hidden="true" className="text-xs font-normal text-[#666]">必填</span></span>
                    <input
                      required
                      maxLength={50}
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full h-12 px-4 border border-[#d9d9d9] rounded-lg bg-white text-[#555] font-inherit outline-none focus:border-[#e60012] focus:ring-2 focus:ring-[rgba(230,0,18,0.18)] transition-all"
                      placeholder="請輸入您的姓名"
                    />
                  </label>
                  <label className="grid grid-cols-[120px_1fr] gap-[18px] items-center font-extrabold max-sm:grid-cols-1 max-sm:gap-1.5">
                    <span>聯絡方式 <span aria-hidden="true" className="text-xs font-normal text-[#666]">必填</span></span>
                    <input
                      required
                      maxLength={30}
                      autoComplete="tel"
                      value={form.contact}
                      onChange={(e) => update("contact", e.target.value)}
                      type="tel"
                      className="w-full h-12 px-4 border border-[#d9d9d9] rounded-lg bg-white text-[#555] font-inherit outline-none focus:border-[#e60012] focus:ring-2 focus:ring-[rgba(230,0,18,0.18)] transition-all"
                      placeholder="請輸入手機號碼"
                    />
                  </label>
                  <label className="grid grid-cols-[120px_1fr] gap-[18px] items-center font-extrabold max-sm:grid-cols-1 max-sm:gap-1.5">
                    <span>想了解車款 <span aria-hidden="true" className="text-xs font-normal text-[#666]">選填</span></span>
                    <select
                      value={form.car}
                      onChange={(e) => update("car", e.target.value)}
                      className="w-full h-12 px-4 border border-[#d9d9d9] rounded-lg bg-white text-[#555] font-inherit outline-none focus:border-[#e60012] focus:ring-2 focus:ring-[rgba(230,0,18,0.18)] transition-all"
                    >
                      <option value="">請選擇想了解的車款</option>
                      {cars.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                      <option value="還不確定">還不確定</option>
                    </select>
                  </label>
                  <label className="grid grid-cols-[120px_1fr] gap-[18px] items-center font-extrabold max-sm:grid-cols-1 max-sm:gap-1.5">
                    <span>購車用途 <span aria-hidden="true" className="text-xs font-normal text-[#666]">選填</span></span>
                    <select
                      value={form.usage}
                      onChange={(e) => update("usage", e.target.value)}
                      className="w-full h-12 px-4 border border-[#d9d9d9] rounded-lg bg-white text-[#555] font-inherit outline-none focus:border-[#e60012] focus:ring-2 focus:ring-[rgba(230,0,18,0.18)] transition-all"
                    >
                      <option value="">請選擇購車用途</option>
                      {usageOptions.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid grid-cols-[120px_1fr] gap-[18px] items-center font-extrabold max-sm:grid-cols-1 max-sm:gap-1.5">
                    <span>預算區間 <span aria-hidden="true" className="text-xs font-normal text-[#666]">選填</span></span>
                    <select
                      value={form.budget}
                      onChange={(e) => update("budget", e.target.value)}
                      className="w-full h-12 px-4 border border-[#d9d9d9] rounded-lg bg-white text-[#555] font-inherit outline-none focus:border-[#e60012] focus:ring-2 focus:ring-[rgba(230,0,18,0.18)] transition-all"
                    >
                      <option value="">請選擇預算區間</option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </label>
                  <p className="text-xs text-[#666] leading-relaxed">
                    資料僅用於購車諮詢與聯繫，可透過 LINE 要求更正或刪除。
                  </p>
                  {formError && <p role="alert" className="p-3 rounded-lg bg-red-50 text-[#b9000e] text-sm">{formError}</p>}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full h-[54px] mt-1 border-0 rounded-[10px] bg-[#e60012] text-white font-black text-[19px] tracking-[0.08em] cursor-pointer transition-all hover:bg-[#b9000e] hover:-translate-y-px disabled:opacity-50"
                  >
                    {sending ? "送出中⋯" : "送出需求"}
                  </button>
                  </fieldset>
                </form>
              </div>
            )}
          </section>

          {/* ═══════ 購車資訊入口 ═══════ */}
          <div className="mx-auto mt-8 grid w-[calc(100%-88px)] grid-cols-2 border-y border-[#ddd] max-sm:w-[calc(100%-28px)]">
            {[{ id: "guides", title: "購車指南" }, { id: "faq", title: "常見 QA" }].map((item) => <section key={item.id} id={item.id} aria-labelledby={`home-${item.id}-heading`} className="min-w-0 scroll-mt-6 first:border-r first:border-[#ddd]">
              <Link href={`/${item.id}`} className="flex items-center justify-between gap-3 px-4 py-6 text-[#333] no-underline transition-colors hover:bg-[#eee] sm:px-6">
                <h2 id={`home-${item.id}-heading`} className="text-lg font-bold sm:text-xl">{item.title}</h2><span aria-hidden="true" className="text-[#b9000e]">→</span>
              </Link>
            </section>)}
          </div>
          {/* ═══════ 貸款試算 ═══════ */}
          <section id="loan-calculator">
            <LoanCalculator />
          </section>

          <footer className="py-[26px] px-6 text-[#666] text-center text-sm">
            <PrivacyNotice />
            © 2026 Suzuki 汽車顧問 {dealer.fullName}｜凱騰鈴木北投所
          </footer>
        </main>
      </SiteFrame>

      <CompareBar />
    </>
  );
}
