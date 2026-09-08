"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Car } from "@/data/site";
import { photoSwipeStep } from "@/lib/photo-gestures";

interface Props {
  car: Car;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

export default function CarPhotoGallery({ car, expanded, onExpandedChange }: Props) {
  const images = car.detail.images?.length ? car.detail.images : [car.id];
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const viewer = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ id: number; x: number; y: number; left: number; top: number } | null>(null);
  const suppressClick = useRef(false);
  const currentImage = images[index];
  const label = car.detail.imageLabels?.[index] || `車款照片 ${index + 1}`;
  const failed = failedImages.includes(currentImage);

  const changeImage = useCallback((step: number) => {
    if (index + step < 0 || index + step >= images.length) return;
    setIndex((previous) => Math.max(0, Math.min(images.length - 1, previous + step)));
    setZoomed(false);
  }, [images.length, index]);

  useEffect(() => {
    if (!expanded) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();
    return () => {
      // The parent dialog becomes interactive again after React's commit.
      queueMicrotask(() => {
        if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
      });
    };
  }, [expanded]);

  useEffect(() => {
    if (surface.current) {
      surface.current.scrollLeft = zoomed ? (surface.current.scrollWidth - surface.current.clientWidth) / 2 : 0;
      surface.current.scrollTop = zoomed ? (surface.current.scrollHeight - surface.current.clientHeight) / 2 : 0;
    }
  }, [zoomed, expanded, index]);

  function startGesture(event: PointerEvent<HTMLElement>) {
    if (!event.isPrimary) {
      gesture.current = null;
      suppressClick.current = true;
      return;
    }
    if (event.button !== 0) return;
    suppressClick.current = false;
    // At 2x, touch devices use native scrolling to pan the photo.
    if (zoomed && event.pointerType === "touch") return;
    gesture.current = {
      id: event.pointerId, x: event.clientX, y: event.clientY,
      left: surface.current?.scrollLeft || 0, top: surface.current?.scrollTop || 0,
    };
    if (event.pointerType !== "touch") event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveGesture(event: PointerEvent<HTMLElement>) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.hypot(dx, dy) > 8) suppressClick.current = true;
    if (zoomed && surface.current) {
      surface.current.scrollLeft = start.left - dx;
      surface.current.scrollTop = start.top - dy;
    }
  }

  function endGesture(event: PointerEvent<HTMLElement>) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    gesture.current = null;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.hypot(dx, dy) > 8) suppressClick.current = true;
    const step = photoSwipeStep(dx, dy);
    if (!zoomed && step) changeImage(step);
  }

  const gestureHandlers = {
    onPointerDown: startGesture,
    onPointerMove: moveGesture,
    onPointerUp: endGesture,
    onPointerCancel: () => { gesture.current = null; suppressClick.current = true; },
    onLostPointerCapture: () => { gesture.current = null; },
  };

  function photo(fullscreen: boolean) {
    return failed ? (
      <p role="status" className="absolute inset-0 flex items-center justify-center px-12 text-center text-sm">
        照片暫時無法載入，請切換其他照片或查看官方車款介紹。
      </p>
    ) : (
      <>
      {!loadedImages.includes(`${currentImage}-${fullscreen}`) && (
        <span role="status" className="absolute inset-0 flex items-center justify-center text-sm">照片載入中…</span>
      )}
      <Image
        key={`${currentImage}-${fullscreen}`}
        src={`/images/${currentImage}.jpg`}
        alt={`${car.name} ${label}`}
        fill
        sizes={fullscreen ? (zoomed ? "200vw" : "100vw") : "(max-width: 544px) calc(100vw - 32px), 512px"}
        loading="eager"
        draggable={false}
        className="select-none object-contain"
        onLoad={() => setLoadedImages((previous) => previous.includes(`${currentImage}-${fullscreen}`) ? previous : [...previous, `${currentImage}-${fullscreen}`])}
        onError={() => setFailedImages((previous) => [...previous, currentImage])}
      />
      </>
    );
  }

  function navigation(fullscreen: boolean) {
    if (images.length < 2) return null;
    return ([-1, 1] as const).map((step) => (
      <button
        key={step}
        type="button"
        disabled={!fullscreen && (step === -1 ? index === 0 : index === images.length - 1)}
        aria-disabled={step === -1 ? index === 0 : index === images.length - 1}
        onClick={() => changeImage(step)}
        aria-label={step === -1 ? "上一張" : "下一張"}
        className={`absolute top-1/2 -translate-y-1/2 z-10 grid h-11 w-11 place-items-center rounded-full text-3xl shadow transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${step === -1 ? "left-2" : "right-2"} ${fullscreen ? "bg-black/60 text-white hover:bg-black/80 aria-disabled:opacity-25" : "bg-white/85 text-[#333] hover:bg-white disabled:invisible"}`}
      >
        {step === -1 ? "‹" : "›"}
      </button>
    ));
  }

  return (
    <>
      <div className="relative w-full aspect-video max-h-[36dvh] flex-shrink-0 bg-[#f1f1f1] text-[#666]">
        <button
          type="button"
          aria-label={`放大 ${car.name} ${label}`}
          aria-haspopup="dialog"
          aria-disabled={failed}
          className="absolute inset-0 cursor-zoom-in touch-pan-y touch-pinch-zoom focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#e60012]"
          {...gestureHandlers}
          onClick={(event) => {
            if (suppressClick.current && event.detail !== 0) {
              suppressClick.current = false;
              return;
            }
            if (failed) return;
            setZoomed(false);
            onExpandedChange(true);
          }}
        >
          {!expanded && photo(false)}
          {!failed && <span className="absolute bottom-2 right-2 rounded-full bg-black/65 px-3 py-1.5 text-xs text-white">左右滑動 · 點擊放大</span>}
        </button>
        {navigation(false)}
      </div>
      <div className="flex-shrink-0 bg-[#242424] px-5 py-3 text-white sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-bold">{car.name}</h3>
            <p className="text-sm text-white/90">{car.subtitle}</p>
          </div>
          <p aria-live="polite" aria-atomic="true" className="pt-1 text-right text-xs text-white/80">
            {label}<span className="mt-1 block tabular-nums">{index + 1} / {images.length}</span>
          </p>
        </div>
      </div>
      {expanded && createPortal(
        <div
          ref={viewer}
          role="dialog"
          aria-modal="true"
          aria-label={`${car.name} 照片檢視器`}
          className="fixed inset-0 z-[70] flex h-dvh flex-col bg-[#111] text-white"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              event.stopPropagation();
              onExpandedChange(false);
            } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              event.stopPropagation();
              changeImage(event.key === "ArrowLeft" ? -1 : 1);
            } else if (event.key === "Tab") {
              const buttons = Array.from(viewer.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") || []);
              const first = buttons[0];
              const last = buttons[buttons.length - 1];
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault(); last?.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault(); first?.focus();
              }
            }
          }}
        >
          <div className="flex shrink-0 items-center justify-between gap-3 px-4 pb-3 pt-[max(12px,env(safe-area-inset-top))]">
            <p className="min-w-0 font-bold">{car.name}</p>
            <div className="flex shrink-0 gap-2">
              <button type="button" disabled={failed} aria-pressed={zoomed} onClick={() => setZoomed((previous) => !previous)} className="min-h-11 rounded-full bg-white/15 px-4 text-sm hover:bg-white/25 disabled:opacity-40">
                {zoomed ? "還原大小" : "放大 2 倍"}
              </button>
              <button ref={closeButton} type="button" aria-label="關閉放大照片" onClick={() => onExpandedChange(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-xl hover:bg-white/25">✕</button>
            </div>
          </div>
          <div className="relative min-h-0 flex-1">
            <div
              ref={surface}
              {...gestureHandlers}
              className={`absolute inset-0 overscroll-contain ${zoomed ? "overflow-auto touch-auto cursor-grab active:cursor-grabbing" : "overflow-hidden touch-pan-y touch-pinch-zoom"}`}
            >
              <div className={`relative ${zoomed ? "h-[200%] w-[200%]" : "h-full w-full"}`}>{photo(true)}</div>
            </div>
            {navigation(true)}
          </div>
          <div className="shrink-0 px-4 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] text-center">
            <p aria-live="polite" aria-atomic="true" className="text-sm">{label} · {index + 1} / {images.length}</p>
            <p className="mt-1 text-xs text-white/60">{zoomed ? "拖曳查看細節 · 還原後可滑動換圖" : "左右滑動或使用方向鍵換圖 · Esc 關閉"}</p>
          </div>
        </div>, document.body,
      )}
    </>
  );
}
