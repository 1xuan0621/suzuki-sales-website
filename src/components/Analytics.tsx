"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { startAnalytics, type AnalyticsEvent } from "@/lib/analytics";

export default function Analytics() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    const tracker = startAnalytics(id);
    if (!tracker) return;
    setEnabled(true);
    tracker.page(pathname);
    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const action = target?.closest<HTMLElement>("a, button[data-track-event]");
      if (!action) return;
      const href = action.getAttribute("href") || "";
      let name = action.dataset.trackEvent as AnalyticsEvent | undefined;
      if (!name && href.startsWith("tel:")) name = "phone_click";
      if (!name && /^https:\/\/(line\.me|lin\.ee)\//.test(href)) name = "line_click";
      if (!name && /^https:\/\/www\.google\.com\/maps\//.test(href)) name = "directions_click";
      if (!name && /^\/(\?car=[a-z-]+)?#contact$/.test(href)) name = "consultation_click";
      if (!name || name === "generate_lead") return;
      const scope = action.closest<HTMLElement>("[data-car-id]");
      const entry = action.closest<HTMLElement>("[data-entry]")?.dataset.entry;
      const carId = scope?.dataset.carId || (pathname.startsWith("/cars/") ? pathname.split("/")[2] : undefined);
      tracker!.event(name, carId, entry);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [id, pathname]);

  return enabled ? <Script id="suzuki-ga4" src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" /> : null;
}
