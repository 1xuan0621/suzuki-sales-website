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
      reviewedAt: "2026-10-31",
    },
  },
  jimny: {
    title: "三門 Jimny 載人與載物，車主怎麼取捨？",
    context: "2020 年三門 Jimny · 交車後環島經驗，非 2026 改款",
    summary: "這篇公開車主自述提到，作者喜歡 Jimny 的方正造型與開闊視野，也分享後座放倒與立起時，載物空間的明顯差異；與朋友環島時，同行者則有因車身晃動而不適的經驗。若平常需要載家人與行李，試乘時可一起確認後座進出、乘坐感受及行李擺放。這是較早年式的個人經驗，配備仍請以現行台灣版本為準。",
    source: {
      name: "PTT car 板",
      author: "holocon11212",
      href: "https://www.ptt.cc/bbs/car/M.1598602864.A.5E1.html",
      publishedAt: "2020-08-28",
      reviewedAt: "2026-10-31",
    },
  },
  vitara: {
    title: "四驅與日常空間，VITARA 一年車主心得",
    context: "VITARA Hybrid ALLGRIP · 2025 年發表的一年使用心得，較早年式",
    summary: "這篇公開車主自述以四驅與 6AT 為選車重點，作者使用一年後認為空間符合需求，也能接受隔音表現；硬塑膠內裝則是家人注意到的取捨。他同時記錄約 3,000 公里時搖臂蓋滲油、由原廠保固更換的經過。這是單一車輛的使用經驗，不能代表故障率；看車時可把內裝、乘坐感受與保養安排一併確認，配備及保固條件以現行台灣資料為準。",
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
    context: "2024 年領牌 CARRY · 2025 年公開購車心得，配備可能與現行版本不同",
    summary: "這篇公開車主自述肯定引擎運轉的平順感，也提到駕駛室及置物空間有限。若工作需要載長型材料，除了看貨台，建議把常載貨物的長寬高、上下貨動線與固定方式一起列入賞車清單，並實際確認駕駛坐姿與隨身工具放置位置。個人載貨經驗不等於車輛的法定載重或裝載限制，仍須依現行車輛資料確認。",
    source: {
      name: "PTT car 板",
      author: "as23305747",
      href: "https://www.ptt.cc/bbs/car/M.1747823342.A.DBE.html",
      publishedAt: "2025-05-21",
      reviewedAt: "2026-10-31",
    },
  },
};
