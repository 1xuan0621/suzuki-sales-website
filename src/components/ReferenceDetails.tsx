import type { ReactNode } from "react";

export default function ReferenceDetails({ children, label = "參考資料", className = "" }: { children: ReactNode; label?: string; className?: string }) {
  return <details className={`border-t border-[#ddd] text-sm leading-7 text-[#666] ${className}`}>
    <summary className="min-h-11 cursor-pointer py-2 font-medium hover:text-[#b9000e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b9000e]">{label}</summary>
    <div className="space-y-3 pb-3 pt-1">{children}</div>
  </details>;
}
