"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Car } from "@/data/site";
import { useModalDialog } from "@/lib/use-modal-dialog";
import styles from "./CarPreview.module.css";

type PreviewSpecification = { label: string; value: string };

const historyKey = "suzukiCarPreview";

function isCurrentPreview(carId: Car["id"]) {
  const preview = window.history.state?.[historyKey];
  return preview?.carId === carId && preview?.href === window.location.href;
}

function PreviewDialog({ car, specifications, onClose }: { car: Car; specifications: PreviewSpecification[]; onClose: () => void }) {
  const dialog = useModalDialog();

  return <dialog
    ref={dialog}
    aria-labelledby={`preview-title-${car.id}`}
    className={styles.overlay}
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
  >
    <div className={styles.card}>
      <header className={styles.heading}>
        <h2 id={`preview-title-${car.id}`}>{car.name}</h2>
        <div className={styles.priceRow}>
          <p>{car.subtitle}</p>
          <p className={styles.price}><span>建議起價</span> {car.price}</p>
        </div>
        <button data-dialog-initial-focus type="button" onClick={onClose} aria-label={`關閉 ${car.name} 概覽`} className={styles.close}>✕</button>
      </header>
      <div className={styles.overview}>
        <div className={styles.photo}>
          <Image src={`/images/${car.id}.jpg`} alt={`${car.name} ${car.detail.imageLabels?.[0] ?? "外觀"}`} fill sizes="(min-width: 720px) 328px, (min-width: 520px) 456px, calc(100vw - 48px)" className="object-contain" />
        </div>
        <dl className={styles.specifications}>
          {specifications.map(({ label, value }) => <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>)}
        </dl>
      </div>
      <p className={styles.audience}><strong>適合誰：</strong>{car.detail.whoFor}</p>
      <Link href={`/cars/${car.id}`} replace className={styles.detailLink}>查看 {car.name} 完整介紹 <span aria-hidden="true">→</span></Link>
    </div>
  </dialog>;
}

export default function CarPreview({ car, specifications, children, className }: { car: Car; specifications: PreviewSpecification[]; children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  const closing = useRef(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const restoreFocus = wasOpen.current && !open;
    wasOpen.current = open;
    if (!restoreFocus) return;
    // Restore after Next handles a history entry containing the #cars anchor.
    const frame = requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    const syncFromHistory = () => {
      closing.current = false;
      // Each card reads its own id: Forward only reopens the selected car.
      setOpen(isCurrentPreview(car.id));
    };
    syncFromHistory();
    window.addEventListener("popstate", syncFromHistory);
    return () => window.removeEventListener("popstate", syncFromHistory);
  }, [car.id]);

  function openPreview() {
    if (closing.current) return;
    if (!isCurrentPreview(car.id)) {
      window.history.pushState({
        ...window.history.state,
        [historyKey]: { carId: car.id, href: window.location.href },
      }, "", window.location.href);
    }
    setOpen(true);
  }

  function closePreview() {
    if (closing.current) return;
    if (isCurrentPreview(car.id)) {
      closing.current = true;
      // Closing consumes the modal entry; the detail link replaces it instead.
      window.history.back();
    } else {
      setOpen(false);
    }
  }

  return <>
    <button ref={trigger} type="button" aria-haspopup="dialog" aria-label={`預覽 ${car.name} 車款資訊`} onClick={openPreview} className={className}>{children}</button>
    {open && <PreviewDialog car={car} specifications={specifications} onClose={closePreview} />}
  </>;
}
