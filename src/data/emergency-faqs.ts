import type { FaqItem } from "./faq";

export const emergencyFaqs: FaqItem[] = [
  {
    id: "parked-hit-and-run",
    question: "車停著被撞，對方跑了、找不到車牌，還能出險嗎？",
    answer: "先拍下車損與停車位置、保留行車紀錄器檔案，報警並請停車場協助保留監視器。找不到車牌不代表一定不能賠：丙式車體險有經警方或保險公司查證屬實的例外，但仍要確認是車輛碰撞。單憑刮痕不能保證理賠，也不能把不明車損當成已查證事故。聯絡承保公司及鈺漣，先確認勘車再安排回廠。",
    reviewedAt: "2026-10-13",
    sourceIds: ["autoInsuranceCurrent", "carClaimProcess"],
    links: [{ href: "/guides/car-accident-insurance#coverage-scenarios", label: "看不同事故要確認的保障" }],
  },
  {
    id: "hit-parked-car-owner-absent",
    question: "擦到路邊停車，車主不在，留紙條就能走嗎？",
    answer: "不要只留紙條就離開。先安全停車、確認有無人受傷，拍下雙方車號、位置與損傷，通知警方並依指示處理，也可請停車場管理員協助聯絡車主。紙條可能遺失，不能取代事故紀錄；即使看起來只是小刮痕，也先通知承保公司。賠償與維修範圍待確認後再談，需要出險或回廠時聯絡鈺漣。",
    reviewedAt: "2026-10-13",
    sourceIds: ["accidentRules", "carClaimProcess"],
    links: [{ href: "/guides/car-accident-insurance#insurance-notice", label: "看出險通知與資料準備" }],
  },
  {
    id: "windscreen-stone-damage",
    question: "飛石打裂擋風玻璃，還能開嗎？車險會賠嗎？",
    answer: "先穩住方向、減速並移到安全處；玻璃大面積破裂或影響視線時，不要繼續開，請叫救援。小裂痕也應儘快請車廠評估。甲、乙式車體險可確認拋擲物或墜落物保障，只有丙式不能直接當成有飛石保障。保留影像與照片，換玻璃前先通知保險公司及鈺漣，並確認隔熱紙、感測器檢查等費用是否包含。",
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
    answer: "不能直接這樣判斷。金管會甲、乙式車體險範本將輪胎及備胎單獨毀損列為不保事項；爆胎後另發生碰撞，則要分開確認事故原因、其他車損及實際保單。道路救援能否協助換備胎或拖吊，也和新輪胎費用是否理賠不同。先確保人車安全，不硬開癟胎；把現場與車損照片交給承保公司，回廠前聯絡鈺漣。",
    reviewedAt: "2026-10-13",
    sourceIds: ["autoInsuranceCurrent", "carClaimProcess"],
    links: [{ href: "/guides/roadside-emergencies#tyre-trouble", label: "爆胎或胎壓異常時先怎麼做" }],
  },
  {
    id: "flood-insurance-coverage",
    question: "有保乙式，颱風淹水、車子泡水就一定會賠嗎？",
    answer: "不一定。一般車體險不能直接當成有颱風、洪水或因雨積水保障，需核對有無相應附加條款、生效時間及除外事項；純電車也要看自己的電動車保單。發現車輛泡水或涉水熄火，不要為了移車再發動。先確保人員安全，能安全拍照時留下水位與車況，通知保險公司，並聯絡鈺漣協助安排拖吊回廠。",
    reviewedAt: "2026-10-13",
    sourceIds: ["autoInsuranceCurrent", "carCoverage", "floodClaim"],
    links: [{ href: "/guides/roadside-emergencies#flooding", label: "看涉水、淹水與熄火的處理方式" }],
  },
  {
    id: "friend-driving-accident",
    question: "車借朋友開出事故，保險會賠嗎？會向朋友追償嗎？",
    answer: "先按事故流程處理，再查各險種的被保險人、約定駕駛及除外條款，不能只看車主有沒有買保險。車體險可能在賠付後向不在保障身分內的駕駛追償；有無許可使用免追償附加條款也要核對，這項附加保障不等於所有事故都賠。據實提供實際駕駛與事故資料，別改報車主開車，出險與回廠記得聯絡鈺漣。",
    reviewedAt: "2026-10-13",
    sourceIds: ["autoInsuranceCurrent", "carCoverage"],
    links: [{ href: "/guides/car-accident-insurance#coverage-scenarios", label: "確認車損、對方損失與保單限制" }],
  },
  {
    id: "locked-car-emergency",
    question: "鑰匙鎖在車裡、孩子被反鎖，應該先找誰？",
    answer: "車內有人受困，尤其幼童、無法自行開門者或已出現不適，立即打 119 或 110，告知位置及人員狀況，依指示救援；不要等待備用鑰匙或鈺漣回覆才求助。若車內無人且沒有緊急危險，可聯絡道路救援、服務廠或合格鎖匠，先確認費用與車輛身分查核。需要回廠檢查門鎖或鑰匙時，再聯絡鈺漣安排。",
    reviewedAt: "2026-10-13",
    sourceIds: ["lockedCarRescue"],
    links: [{ href: "/guides/roadside-emergencies#roadside-help", label: "準備位置、車型與人員狀況，協助救援" }],
  },
  {
    id: "animal-collision",
    question: "不小心撞到狗、貓或野生動物，該怎麼處理？",
    answer: "先安全停車、確認人員狀況並通報警方；動物受傷可撥 1959 或聯絡地方動保機關，說明位置、種類與狀況，依指示協助救援，不要只看車損就離開。各縣市受理時段與動物種類不同，國道上勿冒險走入車道。自己的車損仍須核對車體險，丙式不能直接當成撞動物也賠；出險、回廠或不知下一步時聯絡鈺漣。",
    reviewedAt: "2026-10-13",
    sourceIds: ["animalRescue", "carCoverage", "freewayAccident"],
    links: [
      { href: "/guides/roadside-emergencies#roadside-help", label: "先看現場安全與救援資訊" },
      { href: "/guides/car-accident-insurance#coverage-scenarios", label: "再確認這次車損的保險範圍" },
    ],
  },
];
