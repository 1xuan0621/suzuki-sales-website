import type { ReactNode } from "react";
import Link from "next/link";
import { dealer } from "@/data/site";
import PrivacyNotice from "./PrivacyNotice";
import SiteHeader from "./SiteHeader";

export default function EnglishShell({ children, label, carId }: { children: ReactNode; label?: string; carId?: string }) {
  return <div lang="en" className="min-h-screen bg-[#2f2f2f] py-7 text-[#252525] max-sm:py-0">
    <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[20px] bg-[#f5f5f5] shadow-xl max-sm:rounded-none">
      <SiteHeader carId={carId} locale="en" />
      <main className="px-6 pb-12 pt-6 sm:px-11 sm:pt-8">
        {label && <nav aria-label="Breadcrumb" className="mb-7 text-sm leading-6 text-[#666]"><Link href="/en" className="underline underline-offset-4">Home</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">{label}</span></nav>}
        {children}
      </main>
      <footer className="border-t border-[#ddd] px-6 py-6 text-center text-xs leading-6 text-[#666]">
        <p className="mx-auto mb-5 max-w-3xl text-left leading-7">Based in Taipei, with purchase enquiries welcome from across Taiwan. Showroom visits and test drives take place at the Beitou showroom by prior arrangement. Delivery locations, costs and timing are confirmed individually.</p>
        <PrivacyNotice locale="en" />
        <p>© 2026 SUZUKI Sales Advisor <span lang="zh-Hant">{dealer.fullName}</span> · Beitou, Taipei</p>
      </footer>
    </div>
  </div>;
}
