import type { FaqItem } from "./faq";

export const emergencyFaqs: FaqItem[] = [
  {
    id: "parked-hit-and-run",
    question: "車停著被撞，對方跑了、找不到車牌，還能出險嗎？",
    answer: "找不到車牌仍可能申請丙式理賠，條件是由警方或保險公司查證確為車對車碰撞。先報警，保留車損、停車位置與行車紀錄器檔案，請停車場保存監視器影像；再通知承保公司勘車。只有刮痕、無法查明原因的車損，不屬於這項例外。",
    reviewedAt: "2026-10-13",
    sourceIds: ["autoInsuranceCurrent", "carClaimProcess"],
    links: [{ href: "/guides/car-accident-insurance#coverage-scenarios", label: "看不同事故要確認的保障" }],
  },
  {
    id: "hit-parked-car-owner-absent",
    question: "擦到路邊停車，車主不在，留紙條就能走嗎？",
    answer: "不能只留紙條就走。安全停車後，確認有無人受傷，拍下雙方車號、位置與損傷，報警並依指示處理；可請停車場管理員協助聯絡車主。同時通知承保公司，讓理賠人員參與後續賠償協商。",
    reviewedAt: "2026-10-13",
    sourceIds: ["accidentRules", "carClaimProcess"],
    links: [{ href: "/guides/car-accident-insurance#insurance-notice", label: "看出險通知與資料準備" }],
  },
  {
    id: "windscreen-stone-damage",
    question: "飛石打裂擋風玻璃，還能開嗎？車險會賠嗎？",
    answer: "玻璃大面積破裂或擋住視線時，安全停車並叫救援；小裂痕也要儘快檢修。甲、乙式包含拋擲物或墜落物保障，丙式主險不保單純飛石損傷。保留影像與照片，換玻璃前通知保險公司勘車；估價單分列玻璃、隔熱紙與感測器檢查費。",
    reviewedAt: "2026-10-13",
    sourceIds: ["windshieldDamage", "carCoverage"],
    links: [
      { href: "/guides/roadside-emergencies#roadside-help", label: "看安全停車與救援聯絡方式" },
      { href: "/guides/car-accident-insurance#towing-and-repair", label: "看勘車、估價與回廠安排" },
    ],
  },
  {
    id: "tyre-only-insurance",
    question: "爆胎、輪胎吃釘子，有車體險就能換新胎嗎？",
    answer: "輪胎或備胎單獨毀損，不在一般甲、乙式車體險範圍。爆胎後又撞車，碰撞造成的其他車損則按事故與保單處理；道路救援的換備胎或拖吊服務，也不等於支付新胎費。失壓後不要硬開，先安全停車並留下車損照片。",
    reviewedAt: "2026-10-13",
    sourceIds: ["autoInsuranceCurrent", "carClaimProcess"],
    links: [{ href: "/guides/roadside-emergencies#tyre-trouble", label: "爆胎或胎壓異常時先怎麼做" }],
  },
  {
    id: "flood-insurance-coverage",
    question: "有保乙式，颱風淹水、車子泡水就一定會賠嗎？",
    answer: "乙式主險不含颱風、洪水或因雨積水車損，要有相應天災附約；純電車則看電動車保單的天災保障。泡水或涉水熄火後不要再發動。先撤到安全處，再拍水位與車況、通知保險公司，安排拖吊檢查。",
    reviewedAt: "2026-10-13",
    sourceIds: ["autoInsuranceCurrent", "carCoverage", "floodClaim"],
    links: [{ href: "/guides/roadside-emergencies#flooding", label: "看涉水、淹水與熄火的處理方式" }],
  },
  {
    id: "friend-driving-accident",
    question: "車借朋友開出事故，保險會賠嗎？會向朋友追償嗎？",
    answer: "車體險即使先賠車主，也可能向不在被保險人範圍內的朋友追償。重點看保單的駕駛限制及有無「許可使用免追償」附約；免追償不會把原本不保的事故變成承保。出險時提供實際駕駛與事故資料，不要改報車主開車。",
    reviewedAt: "2026-10-13",
    sourceIds: ["autoInsuranceCurrent", "carCoverage"],
    links: [{ href: "/guides/car-accident-insurance#coverage-scenarios", label: "確認車損、對方損失與保單限制" }],
  },
  {
    id: "locked-car-emergency",
    question: "鑰匙鎖在車裡、孩子被反鎖，應該先找誰？",
    answer: "車內有人受困，尤其幼童、無法自行開門或已不適的人，立即打 119 或 110，說明位置與人員狀況；不要等備用鑰匙送到。車內無人且沒有危險時，可找道路救援、服務廠或合格鎖匠，說好費用並備妥車輛身分資料。",
    reviewedAt: "2026-10-13",
    sourceIds: ["lockedCarRescue"],
    links: [{ href: "/guides/roadside-emergencies#roadside-help", label: "準備位置、車型與人員狀況，協助救援" }],
  },
  {
    id: "animal-collision",
    question: "不小心撞到狗、貓或野生動物，該怎麼處理？",
    answer: "先安全停車、查看人員狀況並通報警方；動物受傷可撥 1959 或聯絡地方動保機關，說明位置、種類與傷勢。各縣市救援時段及動物範圍不同；國道上不要走入車道救援。自己的車損：丙式不保單純撞動物，甲、乙式則按碰撞保障處理。",
    reviewedAt: "2026-10-13",
    sourceIds: ["animalRescue", "carCoverage", "freewayAccident"],
    links: [
      { href: "/guides/roadside-emergencies#roadside-help", label: "先看現場安全與救援資訊" },
      { href: "/guides/car-accident-insurance#coverage-scenarios", label: "再確認這次車損的保險範圍" },
    ],
  },
];
