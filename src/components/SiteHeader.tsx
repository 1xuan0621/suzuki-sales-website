import Link from "next/link";

export default function SiteHeader({ carId }: { carId?: string }) {
  return <header className="border-b border-[#ddd] bg-white px-6 py-5 sm:px-11">
    <nav aria-label="主要導覽" className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
      <Link href="/" aria-label="回首頁 — SUZUKI 汽車顧問 張鈺漣" className="inline-flex items-center gap-3 text-[#b9000e] no-underline focus-visible:outline-2 focus-visible:outline-offset-4">
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0"><path d="m3 11 9-8 9 8M5 9v12h5v-7h4v7h5V9" /></svg>
        <span><span className="mr-2 text-xl font-black tracking-wide">SUZUKI</span><span className="inline-block text-sm font-bold">汽車顧問 張鈺漣</span></span>
      </Link>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm font-bold text-[#444] sm:flex sm:flex-wrap">
        <Link href="/#cars">全車款介紹</Link><Link href="/visit/beitou">台北到店試乘</Link><Link href="/#guides">購車指南</Link><Link data-entry="content" data-car-id={carId} href={carId ? `/?car=${carId}#contact` : "/#contact"}>購車諮詢</Link>
      </div>
    </nav>
  </header>;
}
