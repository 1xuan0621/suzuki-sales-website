import { editorialReviewedAt, type ContentSourceId } from "./content-sources";

export interface Guide {
  title: string;
  description: string;
  updatedAt: string;
  reviewedAt: string;
  sourceIds: ContentSourceId[];
  sections: {
    id: string;
    title: string;
    points: { label: string; text: string }[];
    note?: string;
    link?: { href: string; label: string };
  }[];
}

export const guideIndex = {
  updatedAt: editorialReviewedAt,
  title: "購車指南｜從預算、訂車到交車，一篇掌握｜張鈺漣",
  description: "一篇看懂購車核心流程：估算預算、核對報價合約、安排貸款保險、領牌與跨縣市交車，以及交車當天的檢查清單。",
};

export const buyingGuide: Guide = {
  title: "購車指南：從預算到交車",
  description: guideIndex.description,
  updatedAt: editorialReviewedAt,
  reviewedAt: editorialReviewedAt,
  sourceIds: ["consumer", "registration", "loan", "insurance", "autoInsurance", "tax", "service"],
  sections: [
    {
      id: "budget", title: "先算好預算",
      points: [
        { label: "交車前要付多少", text: "自備車款＋保險、領牌稅費、選配及另約運送費。自備車款是成交車價扣除核貸本金；已付訂金抵車款，不重複加算。" },
        { label: "每月養車留多少", text: "月付＋停車＋油電＋年度保險與稅費÷12，再預留保養及耗材支出。" },
        { label: "有舊車要換購", text: "舊車估價、車商優惠與政府減稅分開列。減稅先確認資格；尚未入帳的款項，不直接當成交車可用預算。" },
      ],
      note: "試算例：車價 80 萬、貸款 50 萬、其他費用 6 萬，交車前共需 36 萬；已付訂金 2 萬，還要準備 34 萬。此為假設範例。",
      link: { href: "/#loan-calculator", label: "試算每月貸款" },
    },
    {
      id: "contract", title: "看清報價，再下訂",
      points: [
        { label: "用相同條件比價", text: "確認車型、版本、年式、出廠年月與是否已領牌。車價、配件、保險及領牌費分項列出，優惠條件也要寫清楚。" },
        { label: "承諾寫進合約", text: "配件型號、交車期限、付款節點及延誤處理，都留下書面約定。先拿完整契約審閱，再簽署付款。" },
        { label: "先問退訂怎麼處理", text: "談妥退訂、貸款未核准或額度不足時的處理方式。退款依契約、解除原因及適用規定確認，並保留收據。" },
      ],
    },
    {
      id: "payment", title: "安排貸款與保險",
      points: [
        { label: "貸款看總支出", text: "把頭款、全部期款（含尾期款）及另收費用加總，再比較現金方案。另問總費用年百分率、提前清償條件；核貸以審核結果為準。" },
        { label: "保險看保障", text: "強制險不負責修車；第三人責任險與車體險的用途不同。用相同保額、自負額與條款比保費，領牌前核對資料及生效時間。" },
      ],
    },
    {
      id: "paperwork", title: "約好領牌與交車安排",
      points: [
        { label: "確認順序與文件", text: "簽約時約好看車、付款、領牌及配件施工順序。想在領牌前看實車，請先提出；由承辦人依個人、公司或代辦身分提供文件清單。" },
        { label: "跨縣市先談清楚", text: "先遠端確認報價，再安排必要的到店行程。自取或運送的地點、時間、費用、運送保險及驗收責任，依個案寫明。" },
        { label: "保留時間彈性", text: "供車、核貸、領牌及施工都會影響交期。有指定用車日期，請在下訂前確認能否配合。" },
      ],
    },
    {
      id: "delivery", title: "交車當天，核對這四件事",
      points: [
        { label: "車輛與外觀", text: "核對車型、車色、車身識別資料；查看漆面、玻璃、輪圈與內裝，記錄里程及油量／電量。" },
        { label: "配件與操作", text: "按契約核對配件型號與施工，測試燈光、車窗、空調及手機連線，請人員說明駕駛輔助；電動車另確認充電操作。" },
        { label: "文件與隨車物品", text: "帶齊行照、發票、保險與結算單據，依清單點收鑰匙及隨車物品，確認保固、首次保養與服務窗口。" },
        { label: "有疑問先記錄", text: "待補配件或車況疑問先拍照，將處理方式、負責窗口與期限寫進點交紀錄，雙方各留一份。" },
      ],
    },
  ],
};

// Published articles now lead directly to the relevant step of the single guide.
export const guideRedirects = [
  { source: "/guides/swift-buying-cost", destination: "/guides#budget", permanent: true },
  { source: "/guides/buying-cost", destination: "/guides#budget", permanent: true },
  { source: "/guides/quote-contract", destination: "/guides#contract", permanent: true },
  { source: "/guides/financing-insurance", destination: "/guides#payment", permanent: true },
  { source: "/guides/delivery-process", destination: "/guides#delivery", permanent: true },
  { source: "/guides/buying-process", destination: "/guides#paperwork", permanent: true },
  { source: "/guides/trade-in", destination: "/guides#budget", permanent: true },
  { source: "/guides/vitara-vs-s-cross", destination: "/cars/vitara#vitara-vs-s-cross", permanent: true },
  { source: "/guides/e-vitara-charging", destination: "/cars/e-vitara#e-vitara-charging", permanent: true },
];
