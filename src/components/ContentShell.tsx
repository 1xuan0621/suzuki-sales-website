import type { ReactNode } from "react";
import Link from "next/link";
import { dealer } from "@/data/site";
import { homeContent } from "@/data/content";
import PrivacyNotice from "./PrivacyNotice";
import SiteHeader from "./SiteHeader";

export default function ContentShell({ children, label, carId }: { children: ReactNode; label: string; carId?: string }) {
  return <div className="min-h-screen bg-[#2f2f2f] py-7 text-[#252525] max-sm:py-0">
    <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[20px] bg-[#f5f5f5] shadow-xl max-sm:rounded-none">
      <SiteHeader carId={carId} />
      <main className="px-6 pb-12 pt-6 sm:px-11 sm:pt-8">
        <nav aria-label="麵包屑" className="mb-7 text-sm leading-6 text-[#666]"><Link href="/" className="underline underline-offset-4">首頁</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">{label}</span></nav>
        {children}
      </main>
      <footer className="border-t border-[#ddd] px-6 py-6 text-center text-xs leading-6 text-[#666]">
        <p className="mx-auto mb-5 max-w-3xl text-left leading-7">{homeContent.introduction}</p>
        <PrivacyNotice />© 2026 SUZUKI 汽車顧問 {dealer.name}｜凱騰鈴木北投所
      </footer>
    </div>
  </div>;
}

export function ArticleSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="mt-8 rounded-2xl border border-[#e5e5e5] bg-white p-6 sm:p-8"><h2 className="mb-4 text-xl font-bold sm:text-2xl">{title}</h2><div className="space-y-4 text-[15px] leading-8 text-[#4b4b4b]">{children}</div></section>;
}
