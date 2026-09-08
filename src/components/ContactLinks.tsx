import { dealer } from "@/data/site";

export function ContactIcon({ type }: { type: "line" | "phone" }) {
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {type === "line" ? <><path d="M21 11c0 4.4-4 8-9 8h-1l-4 3v-4C4.1 16.7 3 14 3 11c0-4.4 4-8 9-8s9 3.6 9 8Z" /><path d="M8 10h8M8 13h5" /></> : <path d="m7 3 3 5-2 2c1.3 2.6 3.4 4.7 6 6l2-2 5 3-1 4C10.6 21 3 13.4 3 4l4-1Z" />}
  </svg>;
}

export default function ContactLinks({ carId, entry = "content" }: { carId?: string; entry?: string }) {
  const button = "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-bold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252525] sm:px-5 sm:text-base";
  return <div aria-label="聯絡顧問" data-contact-actions data-car-id={carId} data-entry={entry} className="grid max-w-sm grid-cols-2 gap-3 sm:flex sm:max-w-none">
    <a href={`https://line.me/R/ti/p/~${dealer.line}`} target="_blank" rel="noopener noreferrer" className={`${button} bg-[#06C755] text-white hover:bg-[#06C755] hover:brightness-95`}><ContactIcon type="line" />LINE 諮詢</a>
    <a href={`tel:${dealer.phone.replace(/\D/g, "")}`} className={`${button} border border-[#bbb] bg-white text-[#333] hover:bg-[#eee]`}><ContactIcon type="phone" />電話諮詢</a>
  </div>;
}
