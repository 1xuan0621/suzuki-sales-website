"use client";

import type { SiteLocale } from "@/data/locales";
import type { Car } from "@/data/site";
import { useCompare } from "./CarCompareProvider";

const labels = {
  "zh-TW": { add: "＋ 加入比較", selected: "✓ 已選取比較", full: "已達 3 台上限", addLabel: (name: string) => `加入 ${name} 比較`, removeLabel: (name: string) => `移除 ${name} 比較` },
  en: { add: "+ Compare", selected: "✓ Selected", full: "3-model limit reached", addLabel: (name: string) => `Compare ${name}`, removeLabel: (name: string) => `Remove ${name} from comparison` },
  ja: { add: "＋ 比較に追加", selected: "✓ 選択済み", full: "比較は 3 台まで", addLabel: (name: string) => `${name}を比較に追加`, removeLabel: (name: string) => `${name}を比較から削除` },
  ko: { add: "+ 비교에 추가", selected: "✓ 선택됨", full: "최대 3개 차종 선택됨", addLabel: (name: string) => `${name} 비교에 추가`, removeLabel: (name: string) => `${name} 비교에서 제외` },
};

export default function CarCompareButton({ car, locale = "zh-TW" }: { car: Car; locale?: SiteLocale }) {
  const { selected, toggleCar, isSelected } = useCompare();
  const active = isSelected(car.id);
  const atLimit = !active && selected.length >= 3;
  const copy = labels[locale];

  return <button
    type="button"
    data-compare-car={car.id}
    aria-pressed={active}
    aria-label={atLimit ? copy.full : active ? copy.removeLabel(car.name) : copy.addLabel(car.name)}
    disabled={atLimit}
    onClick={() => toggleCar(car)}
    className={`min-h-11 w-full rounded-[10px] border-2 px-3 py-2 text-sm font-bold leading-6 transition-colors disabled:cursor-not-allowed disabled:border-[#ccc] disabled:bg-[#f5f5f5] disabled:text-[#666] ${active ? "border-[#b9000e] bg-[#b9000e] text-white" : "border-[#b9000e]/50 bg-white text-[#b9000e] hover:border-[#b9000e] hover:bg-[#fff5f5]"}`}
  >
    {atLimit ? copy.full : active ? copy.selected : copy.add}
  </button>;
}
