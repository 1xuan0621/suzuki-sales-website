"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/**
 * 交車照片輪播 — 從 API 取得圖片列表，每頁顯示 3 張
 */
export default function DeliveryCarousel() {
  const [images, setImages] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const PER_PAGE = 3;

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/delivery", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load delivery photos");
        return response.json();
      })
      .then((data) => {
        if (controller.signal.aborted) return;
        setImages(Array.isArray(data?.images)
          ? data.images.filter((id: unknown): id is string => typeof id === "string" && /^\d+$/.test(id))
          : []);
      })
      .catch(() => {
        if (!controller.signal.aborted) setImages([]);
      });
    return () => controller.abort();
  }, []);

  if (images.length === 0) return null;

  const max = Math.max(0, Math.ceil(images.length / PER_PAGE) - 1);
  const page = images.slice(idx * PER_PAGE, idx * PER_PAGE + PER_PAGE);

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
        {page.map((n) => (
          <div
            key={n}
            className="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-[#e8e8e8] shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
          >
            <Image
              src={`/images/delivery-${n}.jpg`}
              alt={`交車照片 ${n}`}
              fill
              sizes="(max-width: 639px) calc(100vw - 28px), (max-width: 1180px) calc((100vw - 120px) / 3), 354px"
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center bottom" }}
              onError={(e) => {
                const t = e.currentTarget;
                t.style.display = "none";
                const p = t.parentElement!;
                p.classList.add("flex", "items-center", "justify-center", "text-[#bbb]", "font-bold");
                p.textContent = `📸 交車照 ${n}`;
              }}
            />
          </div>
        ))}
      </div>

      {/* 左右箭頭 & 頁數 */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <button
          onClick={() => setIdx((p) => Math.max(0, p - 1))}
          disabled={idx === 0}
          className={`grid place-items-center w-10 h-10 rounded-full bg-white border border-[#e0e0e0] shadow-sm text-[#333] text-lg transition-all hover:bg-[#f5f5f5] ${idx === 0 ? "opacity-30 pointer-events-none" : ""}`}
          aria-label="上一頁"
        >
          ‹
        </button>
        <span className="text-[#999] text-sm font-bold">
          {idx + 1} / {max + 1}
        </span>
        <button
          onClick={() => setIdx((p) => Math.min(max, p + 1))}
          disabled={idx >= max}
          className={`grid place-items-center w-10 h-10 rounded-full bg-white border border-[#e0e0e0] shadow-sm text-[#333] text-lg transition-all hover:bg-[#f5f5f5] ${idx >= max ? "opacity-30 pointer-events-none" : ""}`}
          aria-label="下一頁"
        >
          ›
        </button>
      </div>
    </div>
  );
}
