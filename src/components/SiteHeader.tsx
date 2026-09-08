import Link from "next/link";

export default function SiteHeader({ carId }: { carId?: string }) {
  return <header className="border-b border-[#ddd] bg-white px-6 py-5 sm:px-11">
    <nav aria-label="主要導覽" className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
      <Link href="/" aria-label="回首頁 — SUZUKI 汽車顧問 張鈺漣" className="group inline-flex flex-wrap items-center gap-x-3 gap-y-2 text-[#b9000e] no-underline focus-visible:outline-2 focus-visible:outline-offset-4">
        <span><span className="mr-2 text-xl font-black tracking-wide">SUZUKI</span><span className="inline-block text-sm font-bold">汽車顧問 張鈺漣</span></span>
        <span className="inline-flex items-center gap-1 rounded-md bg-[#f5f5f5] px-2 py-1 text-xs font-bold text-[#555] group-hover:bg-red-50 group-hover:text-[#b9000e]">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="m3 11 9-8 9 8M5 9v12h5v-7h4v7h5V9" /></svg>回首頁
        </span>
      </Link>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm font-bold text-[#444] sm:flex sm:flex-wrap">
        <Link href="/#cars">全車款介紹</Link><Link href="/visit/beitou">台北到店試乘</Link><Link href="/#guides">購車指南</Link><Link data-entry="content" data-car-id={carId} href={carId ? `/?car=${carId}#contact` : "/#contact"}>購車諮詢</Link>
      </div>
    </nav>
  </header>;
}
