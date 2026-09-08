"use client";

import { Suspense, useRef, useState } from "react";
import Link from "next/link";
import { homeContent, guides } from "@/data/content";
import { useConsultation } from "./ConsultationProvider";
import ConsultationPrefill from "./ConsultationPrefill";
import PrivacyNotice from "./PrivacyNotice";
import SiteHeader from "./SiteHeader";
import { cars, services, usageOptions, budgetRanges, dealer, type Car } from "@/data/site";
import { R, CAR_SHAPE_CLASS } from "@/data/constants";
import { useCompare } from "@/components/CarCompareProvider";
import CompareBar from "@/components/CompareBar";
import LoanCalculator from "@/components/LoanCalculator";
import DeliveryCarousel from "@/components/DeliveryCarousel";
import CarModal from "@/components/CarModal";

import "@/components/car-shapes.css";

/* ═══════════════════════════
   HomePage（內層）
   使用 useCompare，必須包在 CompareProvider 內
   ═══════════════════════════ */
export default function HomePageClient() {
  const { toggleCar, isSelected } = useCompare();
  const { form, update, submitted, formError, receipt, website, setWebsite, sending, handleSubmit, beginConsultation } = useConsultation();
  const [modalCar, setModalCar] = useState<Car | null>(null);
  const contactHeading = useRef<HTMLHeadingElement>(null);


  const lineHref = `https://line.me/R/ti/p/~${dealer.line}`;
  const phoneHref = `tel:${dealer.phone.replace(/\D/g, "")}`;

  const openModal = (car: Car) => setModalCar(car);
  const closeModal = () => setModalCar(null);

  return (
    <>
      <Suspense fallback={null}><ConsultationPrefill /></Suspense>
      <main
        className="min-h-screen bg-[#2f2f2f] antialiased"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Noto Sans TC", Arial, sans-serif',
        }}
      >
        {/* ── 頁面容器 ── */}
        <div className="max-w-[1180px] mx-auto my-7 bg-[#f5f5f5] rounded-[20px] shadow-[0_26px_80px_rgba(0,0,0,0.28)] overflow-hidden max-sm:my-0 max-sm:rounded-none max-sm:shadow-none">
          <SiteHeader />
          {/* ═══════ HERO — 大頭照 + 資訊 ═══════ */}
          <section
            data-entry="hero"
            className="relative px-11 pb-[54px] pt-[34px] text-white overflow-hidden max-sm:px-[22px] max-sm:pb-10 max-sm:pt-6"
            style={{
              background: `radial-gradient(circle at 85% 30%, rgba(255,255,255,0.16), transparent 28%), linear-gradient(135deg, ${R}, #bd0010 70%, #9d000b)`,
            }}
          >
            <div className="absolute w-[420px] h-[110px] -left-[120px] bottom-12 bg-white/8 skew-x-[-24deg] pointer-events-none max-sm:hidden" />
            <div className="absolute w-[360px] h-[160px] -right-[100px] top-[88px] bg-white/8 skew-x-[-24deg] pointer-events-none max-sm:hidden" />

            <div className="relative z-10 flex items-center gap-10 max-md:flex-col max-md:text-center">
              {/* 大頭照 */}
              <div className="flex-shrink-0">
                <div className="w-[140px] h-[140px] max-sm:w-[120px] max-sm:h-[120px] rounded-full border-4 border-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden bg-white/10">
                  <img
                    src="/images/avatar.jpg"
                    alt={dealer.name}
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
                      t.parentElement!.textContent = dealer.name.charAt(0);
                    }}
                  />
                </div>
              </div>

              <div className="flex-1">
                <div>
                  <h1
                    className="m-0 leading-none tracking-[0.06em] font-bold"
                    style={{ fontSize: "clamp(44px, 7vw, 72px)" }}
                  >
                    <span className="mb-4 flex items-center gap-3 text-xl leading-snug tracking-normal max-md:justify-center max-sm:text-lg">
                      <img
                        src="/suzuki-logo.svg"
                        alt="SUZUKI"
                        width={496}
                        height={332}
                        className="h-[42px] w-auto shrink-0 brightness-0 invert max-sm:h-[34px]"
                      />
                      <span>台北汽車顧問</span>
                    </span>
                    {dealer.name}
                  </h1>
                  <p className="inline-block mt-[18px] pb-3 border-b-2 border-white/80 text-[19px] tracking-[0.18em] max-sm:text-base max-sm:tracking-[0.12em]">
                    全台購車諮詢 / 台北預約試乘
                  </p>
                </div>

                <p className="mt-3 max-w-[650px] text-sm leading-7 text-white/95">{homeContent.introduction}</p>

                {/* 社群按鈕 — 僅 logo 小圓 */}
                <div className="flex justify-end max-md:justify-center gap-2 mt-4 md:mt-0">
                  <a
                    href="https://www.facebook.com/profile.php?id=100092443294776&locale=zh_TW"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid place-items-center w-9 h-9 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-full text-white text-[17px] font-bold no-underline transition-all"
                    aria-label="Facebook 粉絲專頁"
                  >
                    f
                  </a>
                  <a
                    href="https://www.threads.net/@lian____06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid place-items-center w-9 h-9 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-full text-white text-[17px] font-bold no-underline transition-all"
                    aria-label="Threads"
                  >
                    @
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════ 聯絡資訊 3 欄 ═══════ */}
          <section aria-label="聯絡資訊" data-entry="hero" className="w-[calc(100%-88px)] mx-auto mt-[34px] grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:w-[calc(100%-28px)] max-sm:mt-5 max-sm:grid-cols-1 max-sm:gap-[14px]">
            <article className="flex items-center gap-[22px] min-h-[170px] p-7 bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)] border-l-5 border-l-[#e60012] max-sm:min-h-[132px] max-sm:p-5">
              <div className="flex-shrink-0 grid place-items-center w-[66px] h-[66px] rounded-full bg-[#e60012] text-white text-[30px] font-extrabold max-sm:w-[54px] max-sm:h-[54px] max-sm:text-2xl">
                ☎
              </div>
              <div>
                <p className="m-0 text-[#666] text-[15px] font-bold">電話諮詢</p>
                <h2 className="my-1 text-2xl text-[#e60012] leading-tight max-sm:text-xl">
                  {dealer.phone}
                </h2>
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center min-w-[112px] px-4 py-2 border border-[#e60012] rounded-lg text-[#e60012] font-extrabold no-underline transition-colors hover:bg-[#e60012] hover:text-white text-sm"
                >
                  立即撥打
                </a>
              </div>
            </article>

            <article className="flex items-center gap-[22px] min-h-[170px] p-7 bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)] border-l-5 border-l-[#06C755] max-sm:min-h-[132px] max-sm:p-5">
              <div className="flex-shrink-0 grid place-items-center w-[66px] h-[66px] rounded-full bg-[#06C755] text-white text-[13px] font-extrabold max-sm:w-[54px] max-sm:h-[54px]">
                LINE
              </div>
              <div>
                <p className="m-0 text-[#666] text-[15px] font-bold">LINE 聯絡</p>
                <h2 className="my-1 text-2xl text-[#06C755] leading-tight max-sm:text-xl">
                  @{dealer.line}
                </h2>
                <a
                  href={lineHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-w-[112px] px-4 py-2 border border-[#06C755] rounded-lg text-[#06C755] font-extrabold no-underline transition-colors hover:bg-[#06C755] hover:text-white text-sm"
                >
                  加入好友
                </a>
              </div>
            </article>

            <article className="flex items-center gap-[22px] min-h-[170px] p-7 bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)] border-l-5 border-l-[#e60012] max-sm:min-h-[132px] max-sm:p-5">
              <div className="flex-shrink-0 grid place-items-center w-[66px] h-[66px] rounded-full bg-[#e60012] text-white text-[30px] font-extrabold max-sm:w-[54px] max-sm:h-[54px] max-sm:text-2xl">
                📍
              </div>
              <div>
                <p className="m-0 text-[#666] text-[15px] font-bold">服務據點</p>
                <h2 className="my-1 text-2xl text-[#e60012] leading-tight max-sm:text-xl">
                  Suzuki 北投所
                </h2>
                <p className="mt-[-6px] mb-[14px] text-[#666] text-sm">
                  {dealer.location.split("｜")[1] || dealer.location}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.location.replace(/｜.*/, ""))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-w-[112px] px-4 py-2 border border-[#e60012] rounded-lg text-[#e60012] font-extrabold no-underline transition-colors hover:bg-[#e60012] hover:text-white text-sm"
                >
                  查看地圖
                </a>
                <Link href="/visit/beitou" className="mt-3 block text-sm font-bold text-[#b9000e] underline underline-offset-4">到店交通與試乘預約</Link>
              </div>
            </article>
          </section>

          {/* ═══════ 車款區塊 — 6 台，點卡片開 Modal ═══════ */}
          <section id="cars" className="w-[calc(100%-88px)] mx-auto mt-[34px] pt-[34px] border-t border-[#ddd] max-sm:w-[calc(100%-28px)] max-sm:mt-5">
            <h2 className="mt-0 mb-5 text-[28px] font-bold leading-tight max-sm:text-[23px]">熱門車款</h2>

            {/* 車款卡片 — 3 欄 (6 台) */}
            <div className="grid grid-cols-3 gap-6 max-[980px]:grid-cols-2 max-[680px]:grid-cols-1 max-sm:gap-[14px]">
              {cars.map((car) => {
                const shapeClass = CAR_SHAPE_CLASS[car.id] ?? "";
                const selected = isSelected(car.id);
                return (
                  <div key={car.id} className="flex flex-col gap-2">
                    <button
                      onClick={() => openModal(car)}
                      className="flex flex-col flex-1 items-center p-[26px_20px] text-center bg-white border border-[#e7e7e7] rounded-[18px] shadow-[0_12px_30px_rgba(20,20,20,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(20,20,20,0.12)] cursor-pointer"
                      aria-haspopup="dialog"
                    >
                      <div className={`car-shape ${shapeClass} shrink-0`} />
                      <h3 className="mt-5 mb-1 text-[26px] font-bold text-[#202020]">
                        {car.name}
                      </h3>
                      <p className="m-0 mt-0 text-[13px] text-[#999] font-bold">{car.subtitle}</p>
                      <p className="m-0 mt-1 text-sm leading-6 text-[#666]">{car.description}</p>
                      <p className="m-0 mt-auto pt-3 text-[18px] font-extrabold text-[#e60012]">
                        {car.price}
                      </p>
                    </button>
                    <Link href={`/cars/${car.id}`} className="rounded-lg px-2 py-3 text-center text-sm font-bold text-[#b9000e] underline underline-offset-4">查看 {car.name} 完整介紹</Link>
                    {/* 加入比較按鈕 */}
                    <button
                      aria-pressed={selected}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCar(car);
                      }}
                      className={`w-full h-[38px] rounded-[10px] font-extrabold text-[13px] cursor-pointer border-2 transition-all ${
                        selected
                          ? "bg-[#e60012] text-white border-[#e60012]"
                          : "bg-white text-[#e60012] border-[#e60012]/40 hover:bg-[#fff5f5] hover:border-[#e60012]"
                      }`}
                    >
                      {selected ? "✓ 已選取比較" : "+ 加入比較"}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ═══════ 服務項目 ═══════ */}
          <section className="w-[calc(100%-88px)] mx-auto mt-[34px] pt-5 max-sm:w-[calc(100%-28px)] max-sm:mt-5">
            <div className="flex items-end justify-between gap-5 mb-5 max-sm:flex-col max-sm:items-start">
              <div>
                <p className="m-0 text-[#666] text-[15px] font-bold">服務項目</p>
                <h2 className="mt-0.5 mb-0 text-[28px] leading-tight max-sm:text-[23px]">
                  購車流程，一次協助
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 max-lg:grid-cols-3 max-sm:grid-cols-1 max-sm:gap-[14px]">
              {services.map((s) => {
                const inner = (
                  <>
                    <span className="text-[26px] leading-none">{s.icon}</span>
                    <span className="text-[#333] text-[15px] font-extrabold leading-tight">
                      {s.title}
                    </span>
                    <span className="text-[#888] text-[13px] leading-snug">{s.desc}</span>
                  </>
                );
                if ("href" in s) {
                  return (
                    <Link
                      key={s.title}
                      href={s.href}
                      className="flex flex-col gap-1.5 min-h-[112px] p-4 bg-white border border-[#e7e7e7] rounded-[14px] shadow-[0_2px_8px_rgba(20,20,20,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(20,20,20,0.10)] hover:border-l-[#e60012] hover:border-l-3 no-underline cursor-pointer"
                    >
                      {inner}
                    </Link>
                  );
                }
                return (
                  <div
                    key={s.title}
                    className="flex flex-col gap-1.5 min-h-[112px] p-4 bg-white border border-[#e7e7e7] rounded-[14px] shadow-[0_2px_8px_rgba(20,20,20,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(20,20,20,0.10)] hover:border-l-[#e60012] hover:border-l-3"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </section>

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
                <h2 ref={contactHeading} tabIndex={-1} id="contact-heading" className="mt-0.5 mb-0 text-[28px] leading-tight max-sm:text-[23px]">
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
                <p className="text-xs text-[#666] break-all">案件編號：{receipt}</p>
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
                  <p className="m-0 text-[#666] text-sm">快速聯繫・即時回覆</p>
                </aside>

                <form onSubmit={handleSubmit} className="grid gap-[14px]" aria-busy={sending}>
                  <fieldset disabled={sending} className="contents">
                  <div className="hidden" aria-hidden="true">
                    <label>網站<input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
                  </div>
                  <label className="grid grid-cols-[120px_1fr] gap-[18px] items-center font-extrabold max-sm:grid-cols-1 max-sm:gap-1.5">
                    <span>姓名</span>
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
                    <span>聯絡方式</span>
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
                    <span>想了解車款</span>
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
                    <span>購車用途</span>
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
                    <span>預算區間</span>
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

          {/* ═══════ 貸款試算 ═══════ */}
          <section id="guides" className="mx-auto mt-9 w-[calc(100%-88px)] border-t border-[#ddd] pt-8 max-sm:w-[calc(100%-28px)]">
            <p className="text-sm font-bold text-[#666]">購車指南</p>
            <h2 className="mt-1 text-2xl font-bold">從選車到交車，先把問題想清楚</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {guides.map((guide) => <Link key={guide.slug} href={`/guides/${guide.slug}`} className="rounded-2xl border border-[#e7e7e7] bg-white p-5 no-underline hover:border-[#e60012]">
                <h3 className="font-bold text-[#b9000e]">{guide.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#555]">{guide.description}</p>
              </Link>)}
            </div>
          </section>
          <section id="loan-calculator">
            <LoanCalculator />
          </section>

          <footer className="py-[26px] px-6 text-[#9b9b9b] text-center text-sm">
            <PrivacyNotice />
            © 2026 Suzuki 汽車顧問 {dealer.name}｜凱騰鈴木北投所
          </footer>
        </div>
      </main>

      {/* ═══════ Modal Overlay — 車款詳細 ═══════ */}
      {modalCar && (
        <CarModal
          car={modalCar}
          onClose={closeModal}
          onInterest={() => {
            beginConsultation(modalCar.name);
            closeModal();
            requestAnimationFrame(() => {
              contactHeading.current?.focus({ preventScroll: true });
              document.getElementById("contact")?.scrollIntoView({ behavior: "instant", block: "start" });
            });
          }}
        />
      )}

      <CompareBar />
    </>
  );
}
