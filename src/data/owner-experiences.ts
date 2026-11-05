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
    summary: "這位車主以通勤與雙人出遊為主，累積市區、國道和山路經驗後，喜歡 SWIFT 的操控、駕駛視野與輔助系統，也滿意油耗表現；部分路面的胎噪、風切聲與硬塑膠內裝，則是他提到的取捨。",
    source: {
      name: "Mobile01",
      author: "DeNASTARS",
      href: "https://www.mobile01.com/topicdetail.php?f=277&t=7065922",
      publishedAt: "2025-01-02",
      reviewedAt: "2026-10-31",
    },
  },
  jimny: {
    title: "喜歡內裝風格，也在意晃動：Jimny 車主的取捨",
    context: "作者自述購入 2025 年車 · 2026 年 2 月心得，屬改款前版本",
    summary: "作者喜歡 Jimny 的硬派內裝線條，也能接受自己行駛國道時的隔音感受；較不滿意的是隨身物品的收納、轉彎時明顯的車身晃動，以及頭枕舒適度。賞車時，可帶常用的水壺與隨身包試放，讓同行家人坐後座試乘，確認自己是否能接受這些取捨。",
    source: {
      name: "PTT car 板",
      author: "Muilie",
      href: "https://www.ptt.cc/bbs/car/M.1770905026.A.D75.html",
      publishedAt: "2026-02-12",
      reviewedAt: "2026-11-05",
    },
  },
  vitara: {
    title: "四驅與日常空間，VITARA 一年車主心得",
    context: "VITARA Hybrid ALLGRIP · 2025 年發表的一年使用心得",
    summary: "作者以四驅與 6AT 為選車重點，使用一年後認為空間符合需求，也能接受隔音表現；硬塑膠內裝則是家人注意到的取捨。他也記錄了自己的車在約 3,000 公里時搖臂蓋滲油、由原廠保固更換的經過。看車時，可把內裝、乘坐感受與保養安排一起納入考量。",
    source: {
      name: "Mobile01",
      author: "delica222675",
      href: "https://www.mobile01.com/topicdetail.php?f=277&t=7078863",
      publishedAt: "2025-02-02",
      reviewedAt: "2026-10-31",
    },
  },
  carry: {
    title: "工作載貨選 CARRY，駕駛空間也要一起看",
    context: "2024 年領牌 CARRY · 2025 年公開購車心得",
    summary: "作者肯定引擎運轉的平順感，也提到駕駛室及置物空間有限。若工作需要載長型材料，可把常載貨物的長寬高、上下貨動線與固定方式一起列入賞車清單，也試試駕駛坐姿與隨身工具的放置位置。",
    source: {
      name: "PTT car 板",
      author: "as23305747",
      href: "https://www.ptt.cc/bbs/car/M.1747823342.A.DBE.html",
      publishedAt: "2025-05-21",
      reviewedAt: "2026-10-31",
    },
  },
};
