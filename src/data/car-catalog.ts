import type { SiteLocale } from "./locales";

export const carCatalogContent: Record<SiteLocale, { description: string; introduction: string; browse: string }> = {
  "zh-TW": {
    description: "查看台灣 SUZUKI 六款車型的建議售價與特色，比較車款，再深入了解規格、空間與用車資訊。",
    introduction: "從用途與起價開始選車，最多可選 3 款一起比較。",
    browse: "車款總覽與比較",
  },
  en: {
    description: "Explore Taiwan's six Suzuki models, starting prices and everyday features. Compare your shortlist and read each model's specifications.",
    introduction: "Start with everyday use and starting prices. Select up to three models to compare.",
    browse: "Browse & compare models",
  },
  ja: {
    description: "台湾で販売されるSUZUKIの6車種を、価格と使い方から比較。各車種の仕様や室内空間も確認できます。",
    introduction: "使い方と価格から選びましょう。最大3車種を比較できます。",
    browse: "車種一覧・比較",
  },
  ko: {
    description: "대만에서 판매되는 스즈키 6개 차종의 시작 가격과 특징을 비교하고, 각 차종의 사양과 공간 정보를 확인하세요.",
    introduction: "용도와 시작 가격으로 살펴보세요. 최대 3개 차종을 비교할 수 있습니다.",
    browse: "전체 차종 보기·비교",
  },
};
