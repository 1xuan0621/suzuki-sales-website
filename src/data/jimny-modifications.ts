import type { Guide } from "./guides";

export const jimnyModificationsGuide: Guide = {
  slug: "jimny-modifications",
  category: "jimny",
  audience: "Jimny 改裝入門",
  title: "Jimny 改裝先改什麼？AT 胎、避震升高、車頂架與驗車重點",
  description: "Jimny 通勤一定要換 AT 胎嗎？升高兩吋能合法上路嗎？整理輪胎、避震、車頂架、2026 感知器與保固確認清單，先弄懂用途再決定改裝。",
  introduction: "通勤與偶爾露營可先用原廠配置。AT 胎偏向兼顧非鋪裝路，車頂架增加載物位置；升高則涉及車高變更規定。按路況與行李需求挑項目，比一次買齊套件更實際。",
  updatedAt: "2026-11-01",
  reviewedAt: "2026-10-07",
  sourceIds: ["jimny", "allTerrainTyres", "vehicleEquipment", "vehicleModificationRules", "roofRackRules", "service"],
  sourceNote: "選題參考 Mobile01 與 PTT 的公開改裝、通勤討論，並非本站客戶調查或改裝實測。技術與規定依下列原廠、輪胎製造商及政府資料核對；本文不認證個別套件，也不提供施工或越野操作教學。海外案例不能直接視為台灣可合法上路的方案。",
  relatedSlugs: ["jimny-history", "car-maintenance", "first-car"],
  relatedCars: ["jimny"],
  sections: [
    {
      id: "purpose", step: "先分用途", action: "試原廠車，再列需求",
      title: "只有通勤與偶爾露營，需要先改裝嗎？",
      paragraphs: ["不一定。柏油通勤以舒適、濕地表現和噪音為主；露營則看道路與裝備。原廠車能載下常用行李、通過日常路線，就可以維持原配置。"],
      options: [
        { title: "多數時間走柏油路", answer: "優先比較公路表現", facts: [{ label: "試乘觀察", text: "經過路面接縫時的震動、較快路段的胎噪與風噪。輪胎也要比較濕地煞車表現。" }] },
        { title: "露營或有非鋪裝路需求", answer: "看營地道路與裝備", facts: [{ label: "安排方式", text: "營地若全程柏油路，按一般道路需求選胎；行李裝不下，先調整裝備或座位分配，再評估車頂架。" }] },
      ],
      details: { title: "Jimny 四驅可以一直開嗎？", paragraphs: ["台灣官方將一般柏油道路列為 2H 使用情境；4H 用於相應的越野或積雪路況，4L 是低速高扭力用途。不要把分時四驅當成日常常駐模式，也不能只因下雨就一律切到 4H。切換條件與步驟依自己的隨車手冊。"] },
      link: { href: "/cars/jimny#daily-use", label: "看 Jimny 日常用車與試放重點" },
    },
    {
      id: "tyres", step: "輪胎與輪圈", action: "按路況比較，別只看胎紋",
      title: "Jimny 通勤需要 AT 胎嗎？",
      paragraphs: ["AT 胎兼顧公路與部分非鋪裝路，但高速胎噪與公路表現可能有所取捨。很少離開柏油路，優先比較公路胎的濕地表現、噪音與舒適度。"],
      points: [
        { label: "比較同尺寸、同用途的胎", text: "看各款濕地煞車、噪音與載重資料；AT 是用途分類，不能單靠這兩個字判斷雨天性能。" },
        { label: "報價列完整規格", text: "胎圈尺寸、載重與速度等級要列明；施工時檢查輪拱間隙、轉向干涉及備胎安排。" },
        { label: "更換尺寸前", text: "他車的輪圈或懸吊可能已改動。帶預計使用的胎圈規格與車寬變化，向監理機關確認變更要求。" },
      ],
      link: { href: "/guides/car-maintenance", label: "換胎前，也確認胎壓與保養檢查" },
    },
    {
      id: "suspension", step: "避震與升高", action: "先查規定，不先買套件",
      title: "升高兩吋能合法驗車嗎？想改善晃動怎麼辦？",
      paragraphs: ["依現行《道路交通安全規則》附件十五，懸吊避震器變更後不得超過原核定車身高度。因此，把車身升高兩吋或三吋的方案，不符合這項規定。避震器變更也須由合法業者施作，持發票辦理檢驗與變更登記。", "若目的是改善乘坐，先分清過坑洞彈跳、轉彎側傾，還是異常抖動，並記下車速與載重。異常抖動或行駛偏移先回廠檢查；比較避震方案時，要求說明針對哪種情況改善，以及完工車高。"],
      points: [
        { label: "付款前取得施工明細", text: "列出車型年式、零件、施工項目與完工高度，據此向監理機關確認檢驗與登記要求。" },
        { label: "支臂與連桿的限制", text: "懸吊支臂、三角架與連桿機構屬不可變更項目；更換避震器的規定不涵蓋這些零件。" },
      ],
      link: { href: "https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=K0040013", label: "查道路交通安全規則與附件十五" },
    },
    {
      id: "accessories", step: "車頂架與外觀", action: "核對固定方式與感知器",
      title: "裝車頂架、換保桿，哪些事要先確認？",
      paragraphs: ["車頂架以拆裝方式區分監理程序；保桿則看適用年式與感知器位置。2026 Jimny 安全配備更新，選配件時要指定 2026 年式。"],
      options: [
        { title: "固定式置放架", answer: "需工具拆裝", facts: [{ label: "監理程序", text: "取得對應產品與車型的合格審查資料，辦理檢驗及變更登記。" }] },
        { title: "非固定式置放架", answer: "可徒手拆裝", facts: [{ label: "監理程序", text: "免辦變更登記檢驗；仍須固定妥當，符合裝載與尺寸規定。" }] },
      ],
      points: [
        { label: "架體與行李重量要相加", text: "合計重量須符合車輛與架體文件的行駛承重限制。裝好並載物後量總高，再比較住家、商場入口與車位限高。" },
        { label: "保桿與感知器", text: "施工前列明雷達、攝影機適用位置與校正需求；完工後檢查警示及功能，有異常就回廠處理。" },
      ],
      link: { href: "https://www.thb.gov.tw/News_Content.aspx?n=87&s=61421&sms=13235", label: "看公路局固定式與非固定式置放架說明" },
    },
    {
      id: "quote-warranty", step: "費用與保固", action: "拿到明細，再決定施工",
      title: "改裝會失去保固嗎？怎麼問才有答案？",
      paragraphs: ["要看故障原因與保固條件。施工前把配件型號和更動部位交給原廠，取得可能影響的保固項目；配件保固與施工保固另向供應商、安裝店索取。"],
      points: [
        { label: "一張完整報價", text: "產品品牌、型號、適用車型年式、工資、定位或校正、檢驗登記費及後續檢查，都分項列出。" },
        { label: "三個責任窗口", text: "原車保固找誰、配件故障找誰、安裝問題找誰？期限、條件與處理方式請留下書面紀錄。" },
        { label: "加裝設備的保險", text: "提供設備清單與價值，請保險承辦人列出需申報或加保的項目、保費與保障範圍。" },
      ],
      link: { href: "/cars/jimny#test-drive", label: "先了解台北北投 Jimny 賞車與試乘安排" },
    },
  ],
};
