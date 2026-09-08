"use client";

import { useState } from "react";
import { useModalDialog } from "@/lib/use-modal-dialog";
import CarPhotoGallery from "./CarPhotoGallery";
import { contentReviewedAt, type Car } from "@/data/site";
import PromotionNotice from "./PromotionNotice";

interface CarModalProps {
  car: Car;
  onClose: () => void;
  onInterest: () => void;
  lineHref: string;
}

/**
 * 車款詳細 Modal — 圖片輪播、顏色選擇、規格、優惠與行動按鈕
 */
export default function CarModal({ car, onClose, onInterest, lineHref }: CarModalProps) {
  const [photoExpanded, setPhotoExpanded] = useState(false);
  const dialog = useModalDialog();

  return (
    <dialog
      ref={dialog}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 flex items-center justify-center bg-black/50 p-4 text-[#333] backdrop:bg-transparent modal-overlay"
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onCancel={(event) => { event.preventDefault(); event.stopPropagation(); onClose(); }}
      role="dialog"
      aria-modal={photoExpanded ? undefined : true}
      aria-label={`${car.name} 詳細資訊`}
    >
      <div
        className="relative w-full max-w-lg max-h-[85vh] bg-white rounded-[18px] shadow-[0_26px_80px_rgba(0,0,0,0.35)] max-sm:rounded-[14px] flex flex-col"
        style={{ overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          data-dialog-initial-focus
          onClick={onClose}
          className="absolute top-3 right-3 z-20 grid place-items-center w-9 h-9 rounded-full bg-black/30 text-white text-lg transition-colors hover:bg-black/50 sm:top-4 sm:right-4"
          aria-label="關閉"
        >
          ✕
        </button>

        <CarPhotoGallery
          key={car.id}
          car={car}
          expanded={photoExpanded}
          onExpandedChange={setPhotoExpanded}
        />

        {/* 內容區 — 可滾動 */}
        <div className="flex-1 overflow-y-auto">
          {/* 車色選擇 */}
          {car.detail.colors && car.detail.colors.length > 0 && (
            <div className="flex items-center gap-3 px-5 pt-4 sm:px-6">
              <p className="shrink-0 text-[13px] font-bold text-[#666]">車色參考</p>
              <div
                role="region"
                aria-label="車色參考，可左右滑動"
                tabIndex={0}
                className="flex min-w-0 flex-1 gap-2 overflow-x-auto overscroll-x-contain py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    event.preventDefault();
                    event.currentTarget.scrollBy({ left: event.key === "ArrowLeft" ? -120 : 120 });
                  } else if (event.key === "Home" || event.key === "End") {
                    event.preventDefault();
                    event.currentTarget.scrollLeft = event.key === "Home" ? 0 : event.currentTarget.scrollWidth;
                  }
                }}
              >
                {car.detail.colors.map((c: { name: string; hex: string }) => (
                  <div
                    key={c.name}
                    className="flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3 py-1.5 border border-[#e0e0e0] rounded-full text-[12px] text-[#555] font-bold"
                  >
                    <span
                      className="inline-block w-3.5 h-3.5 rounded-full"
                      style={{ background: c.hex }}
                    />
                    {c.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 資訊 */}
          <div className="p-5 sm:p-6">
            <div className="flex items-baseline justify-between gap-2 mb-3">
              <span className="text-[#666] text-sm font-bold">建議起價</span>
              <span className="text-[#e60012] text-2xl font-extrabold">{car.price}</span>
            </div>
            <p className="text-[#e60012] font-extrabold text-[17px] leading-tight mb-4">
              {car.detail.tagline}
            </p>

            <div className="mb-4">
              <p className="mb-2 text-[15px] font-extrabold text-[#333]">主要規格</p>
              <ul className="m-0 pl-[18px] space-y-1.5 text-[14px] text-[#555]">
                {car.detail.specs.map((spec, idx) => (
                  <li key={idx}>{spec}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4 p-3 bg-[#f5f5f5] rounded-[10px]">
              <p className="m-0 text-[13px] text-[#666]">
                <strong>適合誰：</strong>
                {car.detail.whoFor}
              </p>
            </div>

            <details className="mb-3 text-xs leading-relaxed text-[#666]">
              <summary className="cursor-pointer py-2">圖片與規格說明</summary>
              <div className="space-y-2 pb-2">
                <p>圖片：台灣 Suzuki。配備、車色以實車為準；成交條件請洽詢。</p>
                <p>油耗／續航為測試值。規格核對：<time dateTime={contentReviewedAt}>{contentReviewedAt}</time>。</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[#b9000e]">
                  <a href={car.detail.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">官方車款介紹</a>
                  <a href={car.detail.specUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">官方規配表（PDF）</a>
                </div>
              </div>
            </details>
            <PromotionNotice promotion={car.detail.promotion} />

            <div className="flex items-center gap-3">
              <button
                onClick={onInterest}
                className="flex-1 flex items-center justify-center h-[48px] bg-[#e60012] text-white rounded-[10px] font-extrabold text-[15px] no-underline transition-all hover:bg-[#b9000e] hover:-translate-y-px cursor-pointer border-0"
              >
                我有興趣
              </button>
              <a
                href={lineHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center h-[48px] border-2 border-[#e60012] text-[#e60012] rounded-[10px] font-extrabold text-[15px] no-underline transition-all hover:bg-[#e60012] hover:text-white"
              >
                用 LINE 詢問
              </a>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
