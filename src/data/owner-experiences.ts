import type { CarId } from "./site";

export interface OwnerExperience {
  title: string;
  context: string;
  summary: string;
  source: {
    name: string;
    author: string;
    href: string;
    publishedAt: string;
    reviewedAt: string;
  };
}

// Third-party accounts are summarized in the third person, not presented as dealer experience.
export const ownerExperiences: Partial<Record<CarId, OwnerExperience>> = {
  swift: {
    title: "通勤與雙人出遊，SWIFT 車主怎麼說？",
    context: "2024 年購入第四代 SWIFT · 使用 3 個月、3,600 公里",
    summary: "這位車主以通勤與雙人出遊為主，累積市區、國道和山路經驗後，喜歡 SWIFT 的操控、駕駛視野與輔助系統，也滿意油耗表現；另一方面，部分路面的胎噪、風切聲與硬塑膠內裝，則是他提到的取捨。這些日常感受，也值得在試乘時親自確認。",
    source: {
      name: "Mobile01",
      author: "DeNASTARS",
      href: "https://www.mobile01.com/topicdetail.php?f=277&t=7065922",
      publishedAt: "2025-01-02",
      reviewedAt: "2026-10-13",
    },
  },
};
