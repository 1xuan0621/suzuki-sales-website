import { contentRoutes, siteUrl } from "../data/content";
import { getCar } from "../data/site";

export type AnalyticsEvent = "line_click" | "phone_click" | "consultation_click" | "directions_click" | "generate_lead";
const events: AnalyticsEvent[] = ["line_click", "phone_click", "consultation_click", "directions_click", "generate_lead"];
const entries = ["hero", "contact", "modal", "sticky", "car-page", "guide", "visit", "footer", "content"];
type Payload = Record<string, string>;

export function analyticsEnabled(hostname: string, id: string | undefined, production: boolean) {
  return production && hostname === "suzuki-taipei.com" && /^G-[A-Z0-9]+$/.test(id || "");
}

export function safeReferrer(value: string) {
  try {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) return "";
    return url.origin === siteUrl
      ? (contentRoutes.some((route) => route.path === url.pathname) ? siteUrl + url.pathname : siteUrl + "/")
      : url.origin + "/";
  } catch { return ""; }
}

// This is the only payload builder. It accepts no form values or arbitrary URLs.
export function createAnalytics(emit: (name: string, payload: Payload) => void, referrer = "") {
  let currentPath = "";
  let pageReferrer = safeReferrer(referrer);
  const receipts = new Set<string>();
  const send = (name: string, values: Payload) => {
    try { emit(name, values); } catch { /* Analytics must never interrupt a consultation. */ }
  };
  const pageValues = () => ({
    page_location: siteUrl + currentPath,
    page_path: currentPath,
    page_title: contentRoutes.find((route) => route.path === currentPath)?.title || "",
    page_referrer: pageReferrer,
  });
  function page(path: string) {
    const cleanPath = path.split(/[?#]/)[0];
    if (!contentRoutes.some((route) => route.path === cleanPath)) { currentPath = ""; return; }
    if (currentPath === cleanPath) return;
    if (currentPath) pageReferrer = siteUrl + currentPath;
    currentPath = cleanPath;
    send("page_view", pageValues());
  }
  function event(name: AnalyticsEvent, carId?: string, entry = "content") {
    if (!currentPath || !events.includes(name)) return;
    send(name, {
      ...pageValues(),
      car_id: getCar(carId)?.id || "unspecified",
      entry: entries.includes(entry) ? entry : "content",
    });
  }
  function lead(receipt: string, carId?: string) {
    if (receipts.has(receipt)) return;
    receipts.add(receipt);
    event("generate_lead", carId, "contact");
  }
  return { page, event, lead };
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let tracker: ReturnType<typeof createAnalytics> | undefined;
export function startAnalytics(id: string | undefined) {
  if (typeof window === "undefined" || !analyticsEnabled(window.location.hostname, id, process.env.NODE_ENV === "production")) return;
  if (tracker) return tracker;
  window.dataLayer ||= [];
  window.gtag = function () { window.dataLayer!.push(arguments); };
  window.gtag("js", new Date());
  const initialRoute = contentRoutes.find((route) => route.path === window.location.pathname);
  window.gtag("config", id, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: siteUrl + (initialRoute?.path || "/"),
    page_title: initialRoute?.title || "SUZUKI 汽車顧問",
    page_referrer: safeReferrer(document.referrer),
  });
  tracker = createAnalytics((name, payload) => {
    window.gtag?.("set", { page_location: payload.page_location, page_title: payload.page_title, page_referrer: payload.page_referrer });
    window.gtag?.("event", name, payload);
  }, document.referrer);
  return tracker;
}

export function trackLead(receipt: string, carId?: string) {
  try { tracker?.lead(receipt, carId); } catch { /* Receipt remains authoritative. */ }
}
