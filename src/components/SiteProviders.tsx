"use client";

import type { ReactNode } from "react";
import CompareProvider from "./CarCompareProvider";
import ConsultationProvider from "./ConsultationProvider";

export default function SiteProviders({ children }: { children: ReactNode }) {
  return <CompareProvider><ConsultationProvider>{children}</ConsultationProvider></CompareProvider>;
}
