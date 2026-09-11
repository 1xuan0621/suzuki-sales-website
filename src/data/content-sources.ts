export const editorialReviewedAt = "2026-09-08";

// Community discussions inform the questions; factual answers use these primary sources.
// Research scope and discussion links: docs/BUYING_CONTENT_RESEARCH.md.
export const contentSources = {
  consumer: { title: "行政院消保會｜購買新車注意事項", url: "https://cpc.ey.gov.tw/Page/E9F89E01AAE23194/3e4100ad-fb9f-4f2c-8e3b-3cb893c32b18" },
  loan: { title: "金管會銀行局｜總費用年百分率計算範例（PDF）", url: "https://law.banking.gov.tw/Chi/GetLawFile.ashx?FileID=0000242502" },
  insurance: { title: "金管會｜強制汽車責任保險法", url: "https://law.fsc.gov.tw/LawContent.aspx?id=FL006889" },
  autoInsurance: { title: "金管會｜自用汽車保險契約範本（PDF）", url: "https://www.fsc.gov.tw/userfiles/file/自用汽車保險定型化契約範本2018-12-24.pdf" },
  registration: { title: "我的 E 政府｜新領牌照與監理服務", url: "https://www.gov.tw/News_Content_26_721782" },
  tax: { title: "財政部｜購車與汰舊換新貨物稅減徵條件", url: "https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-saving-manual/national/commodity-tax/0Q6AK66" },
  tradeInTax: { title: "財政部｜新購與舊換新減稅條件、流程及文件", url: "https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-saving-secret/re5JYe3" },
  service: { title: "Taiwan Suzuki｜保養維修中心", url: "https://www.taiwansuzuki.com.tw/locator?type=2" },
  maintenancePrinciples: { title: "Toyota Taiwan｜保養表讀法參考（週期與保固不適用 Suzuki）", url: "https://www.toyota.com.tw/owner_maintenance.aspx" },
  repairConsent: { title: "彰化縣消保官｜汽車維修項目、報價與追加同意", url: "https://www.chcg.gov.tw/DTO/senior/03bulletin/bulletin_search_con.aspx?bull_id=356805" },
  tirePressure: { title: "台灣普利司通｜冷胎胎壓與原廠標示怎麼看", url: "https://www.bridgestone.com.tw/zh/tyre-clinic/tyre-talk/tire-maintenance2" },
  energyLabel: { title: "Taiwan Suzuki｜車款比較與能源效率測試說明", url: "https://www.taiwansuzuki.com.tw/compare" },
  swift: { title: "Taiwan Suzuki｜SWIFT", url: "https://www.taiwansuzuki.com.tw/cars/swift" },
  fit: { title: "Honda Taiwan｜FIT 台灣規格", url: "https://www.honda-taiwan.com.tw/Auto/Cars/FIT" },
  jimny: { title: "Taiwan Suzuki｜現行 Jimny", url: "https://www.taiwansuzuki.com.tw/cars/jimny" },
  jimnyPrevious: { title: "Taiwan Suzuki｜Jimny 2024 型錄（歷史 PDF）", url: "https://www.taiwansuzuki.com.tw/uploads/car_list/170444669498.pdf" },
  eVitara: { title: "Taiwan Suzuki｜e VITARA 充電與車款資料", url: "https://www.taiwansuzuki.com.tw/cars/eVITARA" },
  vitara: { title: "Taiwan Suzuki｜VITARA", url: "https://www.taiwansuzuki.com.tw/cars/vitara" },
  sCross: { title: "Taiwan Suzuki｜S-CROSS", url: "https://www.taiwansuzuki.com.tw/cars/s-cross" },
  carry: { title: "Taiwan Suzuki｜CARRY", url: "https://www.taiwansuzuki.com.tw/cars/carry" },
} as const;

export type ContentSourceId = keyof typeof contentSources;
