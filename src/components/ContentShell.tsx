import type { ReactNode } from "react";
import Link from "next/link";
import { dealer } from "@/data/site";
import { homeContent } from "@/data/content";
import PrivacyNotice from "./PrivacyNotice";

export function ContactLinks({ carId, entry = "content" }: { carId?: string; entry?: string }) {
  return <div data-car-id={carId} data-entry={entry} className="flex flex-wrap gap-3">
    <Link href={carId ? `/?car=${carId}#contact` : "/#contact"} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#e60012] px-5 py-3 font-bold text-white no-underline hover:bg-[#b9000e]">{carId ? "諮詢這款車" : "留下購車需求"}</Link>
    <a href={`https://line.me/R/ti/p/~${dealer.line}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#b9000e] px-5 py-3 font-bold text-[#b9000e] no-underline hover:bg-red-50">LINE 諮詢</a>
    <a href={`tel:${dealer.phone.replace(/\D/g, "")}`} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#ccc] px-5 py-3 font-bold text-[#444] no-underline hover:bg-white">電話諮詢</a>
  </div>;
}

export default function ContentShell({ children, label }: { children: ReactNode; label: string }) {
  return <div className="min-h-screen bg-[#2f2f2f] py-7 text-[#252525] max-sm:py-0">
    <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[20px] bg-[#f5f5f5] shadow-xl max-sm:rounded-none">
      <header className="border-b border-[#ddd] bg-white px-6 py-5 sm:px-11">
        <nav aria-label="主要導覽" className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <Link href="/" className="font-bold text-[#b9000e] no-underline"><span className="mr-2 text-xl font-black tracking-wide">SUZUKI</span><span className="inline-block text-sm">汽車顧問 張鈺漣</span></Link>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm font-bold text-[#444] sm:flex sm:flex-wrap">
            <Link href="/#cars">六款車介紹</Link><Link href="/visit/beitou">台北到店試乘</Link><Link href="/#guides">購車指南</Link><Link href="/#contact">購車諮詢</Link>
          </div>
        </nav>
      </header>
      <main className="px-6 pb-12 pt-6 sm:px-11 sm:pt-8">
        <nav aria-label="麵包屑" className="mb-7 text-sm leading-6 text-[#666]"><Link href="/" className="underline underline-offset-4">首頁</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">{label}</span></nav>
        {children}
        <section className="mt-10 rounded-2xl border border-[#e5d0d0] bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">台北服務，全台都能先聊聊</h2>
          <p className="my-4 max-w-3xl text-sm leading-7 text-[#555]">{homeContent.introduction}</p>
          <ContactLinks entry="footer" />
        </section>
      </main>
      <footer className="border-t border-[#ddd] px-6 py-6 text-center text-xs leading-6 text-[#666]">
        <PrivacyNotice />© 2026 SUZUKI 汽車顧問 {dealer.name}｜凱騰鈴木北投所
      </footer>
    </div>
  </div>;
}

export function ArticleSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="mt-8 rounded-2xl border border-[#e5e5e5] bg-white p-6 sm:p-8"><h2 className="mb-4 text-xl font-bold sm:text-2xl">{title}</h2><div className="space-y-4 text-[15px] leading-8 text-[#4b4b4b]">{children}</div></section>;
}
