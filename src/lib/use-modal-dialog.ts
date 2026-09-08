"use client";

import { useLayoutEffect, useRef } from "react";

const openDialogs = new Set<HTMLDialogElement>();
let originalOverflow = "";

/** Native modal isolation and focus restoration, with explicit Tab wrapping. */
export function useModalDialog(open = true) {
  const ref = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (openDialogs.size === 0) originalOverflow = document.body.style.overflow;
    openDialogs.add(dialog);
    document.body.style.overflow = "hidden";
    dialog.showModal();
    dialog.querySelector<HTMLElement>("[data-dialog-initial-focus]")?.focus({ preventScroll: true });

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const elements = Array.from(dialog.querySelectorAll<HTMLElement>(
        'a[href], button, input, select, textarea, summary, [tabindex]',
      )).filter((element) => element.tabIndex >= 0 && !element.matches(":disabled")
        && !element.closest("[inert]") && element.getClientRects().length > 0
        && getComputedStyle(element).visibility !== "hidden");
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && (document.activeElement === first || !elements.includes(document.activeElement as HTMLElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !elements.includes(document.activeElement as HTMLElement))) {
        event.preventDefault(); first.focus();
      }
    };
    dialog.addEventListener("keydown", handleTab);
    return () => {
      dialog.removeEventListener("keydown", handleTab);
      // Close before React removes the node so the browser can restore its opener.
      dialog.close();
      openDialogs.delete(dialog);
      if (openDialogs.size === 0) document.body.style.overflow = originalOverflow;
      queueMicrotask(() => {
        if (opener?.isConnected) opener.focus({ preventScroll: true });
      });
    };
  }, [open]);

  return ref;
}
