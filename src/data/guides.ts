import type { ContentSourceId } from "./content-sources";
import type { CarId } from "./site";

export interface Guide {
  slug: string;
  category: "process" | "selection" | "ownership";
  audience: string;
  title: string;
  description: string;
  introduction: string;
  updatedAt: string;
  reviewedAt: string;
  sourceIds: ContentSourceId[];
  sourceNote?: string;
  relatedSlugs: string[];
  relatedCars?: CarId[];
  conversation: string;
  sections: {
    id: string;
    step: string;
    title: string;
    paragraphs: string[];
    points?: { label: string; text: string }[];
    note?: string;
    link?: { href: string; label: string };
  }[];
}

const guideReviewedAt = "2026-09-09";
export const guideIndex = {
  updatedAt: "2026-09-20",
  title: "Suzuki 購車指南｜選車比較、購車流程與保養｜張鈺漣",
  description: "從第一次買車、舊車換新車、車牌選號與領牌，到家庭休旅選擇、汽油與油電比較、交車後保養，依你的用車問題找到指南與實用清單。",
};

export const guideCategories = [
  { id: "process", title: "準備買車與換車", description: "從預算、報價到交車，先把購車這件事安排好。" },
  { id: "selection", title: "找到適合自己的車", description: "用家人、停車位與日常路線，決定空間和動力怎麼選。" },
  { id: "ownership", title: "交車後的保養與使用", description: "知道何時回廠、工單怎麼看，慢慢熟悉照顧愛車的方法。" },
] as const;

export const firstCarGuide: Guide = {
  slug: "first-car",
  category: "process",
  audience: "第一次買車",
  title: "第一次買 Suzuki，從看車到開回家",
  description: "第一次買車不用先背熟規格。鈺漣陪你從用車需求與預算開始，弄懂 Suzuki 試乘、購車菜單、訂金、貸款保險和交車當天要確認的事。",
  introduction: "第一次買車，先抓交車前要付的錢與每月養車費，再約試乘。下面按看車、報價、付款到交車整理，你可以直接跳到目前進行的步驟。",
  updatedAt: "2026-09-22",
  reviewedAt: guideReviewedAt,
  sourceIds: ["consumer", "loan", "insurance", "registration", "service", "swift", "jimny", "eVitara"],
  relatedSlugs: ["suv-selection", "car-maintenance"],
  conversation: "鈺漣你好，我第一次買車，平常坐＿＿人、車停＿＿，交車前預算＿＿，想了解＿＿。",
  sections: [
    {
      id: "budget", step: "需求與預算", title: "預算分兩筆：交車前現金、每月養車費",
      paragraphs: ["先列乘坐人數、通勤路線與車位限制，縮小車款範圍。預算要留生活預備金，再算下面兩筆。"],
      note: "假設車價 80 萬、核貸 50 萬、其他費用 6 萬，自備款共 36 萬；已付訂金 2 萬，還需 34 萬。這是算式示例，不是 Suzuki 報價。",
      link: { href: "/#loan-calculator", label: "用貸款試算抓每月支出" },
      points: [{ label: "交車前", text: "成交車價減核貸金額，加保險、領牌及另購配件；已付訂金要扣回。" }, { label: "每個月", text: "月付加停車、油電費，再預留年度保險、稅費與保養。" }],
    },
    {
      id: "test-drive", step: "看車與試乘", title: "帶家人、行李尺寸與車位資料去試乘",
      paragraphs: ["把前座調成平常坐姿，再讓家人試後座、上下車，並試放嬰兒車或常用行李。路上留意起步、煞車、震動與停車視野；考慮 e VITARA，另確認日常充電位置。"],
      note: "到北投所前，先確認車款、展示或試乘車、時段；需要試駕時，另確認駕照與相關安排。",
      link: { href: "/visit/beitou", label: "查看北投所位置與到店資訊" },
    },
    {
      id: "contract", step: "報價與訂車", title: "購車菜單看總額，約定寫進契約",
      paragraphs: ["「菜單」就是報價明細。比較時固定年式、版本和付款方式，分清以下三項。"],
      points: [{ label: "車輛", text: "車款、版本、車色、年式、出廠年月，以及是否已領牌。" }, { label: "配件", text: "品牌、型號、價格及保固窗口，不只寫「贈送隔熱紙」。" }, { label: "費用", text: "車價、配件、保險、領牌稅費分列，確認優惠與減稅是否已計入。" }],
      note: "下訂前審閱完整契約，寫清交期、付款、貸款未過與退訂處理。匯款核對車商指定帳戶並留收據；審閱期不等於簽約後可隨時無條件退款。",
    },
    {
      id: "payment", step: "貸款與保險", title: "貸款比總支出，保險看保障範圍",
      paragraphs: ["貸款：加總頭款、全部期款、尾期款及費用，與現金方案比較；再看總費用年百分率、提前清償條件。網站試算只供抓預算，實際條件須審核。", "保險：強制險不賠修車費。對方財物與自己的車損，要分別確認第三人責任險、車體險等保障，逐項看保額、自負額與除外條款。"],
      link: { href: "/faq#insurance-coverage", label: "看常見車險問題" },
    },
    {
      id: "paperwork", step: "領牌與安排", title: "先約定看車、付款、保險與領牌順序",
      paragraphs: ["希望領牌前看指定實車，就在簽約時約好。證件依個人、公司或代辦身分準備，由承辦人提供清單；保險生效、付款與配件施工一起排程。", "外縣市可先遠端詢價；異地交車另確認運送、費用、保險與驗收。有指定用車日請提早說，供車、核貸及領牌進度都會影響交期。"],
      note: "查進度可以問：「目前完成哪一步？接下來需要我準備什麼？」證件另按約定管道交付，本站諮詢表單不收證件或銀行資料。",
      link: { href: "/guides/license-plate", label: "想自己挑車牌？先看選號、競標與領牌期限" },
    },
    {
      id: "delivery", step: "交車與上路", title: "交車當天，照這三項點交",
      paragraphs: ["帶著契約與配件清單核對，留足時間操作新車。"],
      points: [{ label: "看車況", text: "核對車色、車身識別資料，檢查漆面、玻璃、輪圈與內裝，記下里程和油量／電量。" }, { label: "試操作", text: "測燈光、車窗、空調、手機連線與加裝配件；了解駕駛輔助限制，電動車另練習充電。" }, { label: "收物品與單據", text: "點收鑰匙、隨車物品、行照、發票、保險和結算資料，確認保固、首次保養與聯絡窗口。" }],
      note: "刮傷、未裝配件或操作問題，當場拍照並寫明處理人與完成日期，雙方各留一份。",
    },
  ],
};

export const tradeInGuide: Guide = {
  slug: "trade-in",
  category: "process",
  audience: "舊車換新車",
  title: "換一台 Suzuki，舊車和新車怎麼接上？",
  description: "舊車還能開，現在換 Suzuki 值不值得？鈺漣帶你分開看舊車估價、新車報價與減稅，算出要補的錢，再安排交車和舊車交接。",
  introduction: "換車先把新車總價、舊車收購價和減稅分開算，再排交接日期。舊車還要每天通勤的人，先確認新車何時能交，避免中間沒車用。",
  updatedAt: "2026-09-22",
  reviewedAt: guideReviewedAt,
  sourceIds: ["consumer", "tradeInTax", "registration", "service", "eVitara"],
  relatedSlugs: ["first-car", "powertrain-choice"],
  conversation: "鈺漣你好，我的舊車是＿＿、＿＿年、＿＿公里，還有／沒有貸款，想換＿＿，希望＿＿前交車。",
  sections: [
    {
      id: "needs", step: "確認換車原因", title: "選出這次最想改善的兩件事",
      paragraphs: ["維修費、後座、行李空間或停車，先挑最在意的兩項，試乘時逐一確認；也記下舊車想保留的優點。", "家庭用車可帶家人比較 VITARA、S-CROSS；Jimny 要實試後座進出與載物。改開 e VITARA，則先確認充電位置與設備費。"],
      link: { href: "/#cars", label: "看看 Suzuki 車款與比較" },
    },
    {
      id: "valuation", step: "舊車估價", title: "舊車估價與新車折扣分開列",
      paragraphs: ["提供車型、年份、里程、保養及事故／改裝紀錄，安排看實車估價。問清報價有效期，以及交車前繼續使用是否影響價格。", "舊車有貸款，先向貸款機構查結清金額與費用；收購價扣掉這筆，才是可拿來換車的餘額。"],
      note: "假設舊車賣 25 萬、結清貸款與費用 10 萬，可用餘額為 15 萬。新車需自備 36 萬時，舊車款已收到或書面約定可抵款，才只需另備 21 萬；否則先備足 36 萬。",
    },
    {
      id: "tax", step: "賣車或報廢", title: "賣車與報廢減稅，分兩種方案比較",
      paragraphs: ["仍有中古價值，先估價再決定是否報廢。同一台舊車不能把出售收入和報廢減稅一起加算；新購減稅則另核對資格。", "報廢換購汽車的條件包括舊車車齡 10 年以上、持有滿 1 年，並核對新舊車主關係；購買新車及新領牌須落在報廢前後 6 個月內。公司、純電車與工作用車另確認適用條件。"],
      note: "先確認資格、送件人與退款方式，再處理舊車；車體回收及車籍報廢文件都要留。未入帳的減稅，先別當成交車當天可用的現金。",
    },
    {
      id: "schedule", step: "銜接交車時間", title: "把新車付款、交車和舊車交付排在一起",
      paragraphs: ["每天仍要用舊車，請一開始就說。核對新車供應、核貸、領牌及施工進度，再約舊車交付日；需要租車或接送的空檔，也算進成本。"],
      points: [{ label: "新車延後", text: "舊車可否晚交？估價是否仍有效？" }, { label: "舊車款到位", text: "收款或抵款日能否趕上新車付款？誰辦貸款結清？" }, { label: "跨縣市交接", text: "新舊車在哪裡交付？運送費、保險與驗收如何安排？" }],
    },
    {
      id: "handover", step: "交接與後續", title: "清掉舊車資料，留下交接證明",
      paragraphs: ["取走私人物品與記憶卡，清除車機配對、通訊錄和導航住址。停車場車牌辨識、eTag、保險，向各單位辦理異動。", "出售留交付時間、里程、收款及過戶紀錄；報廢留回收與車籍文件。另追蹤貸款結清、減稅申請及入帳，新車按交車清單點交。"],
      link: { href: "/guides/first-car#delivery", label: "打開新車交車檢查清單" },
    },
  ],
};

const suvSelectionGuide: Guide = {
  slug: "suv-selection",
  category: "selection",
  audience: "家庭休旅怎麼選",
  title: "家庭休旅怎麼選？先試家人、行李和停車位",
  description: "小家庭一定需要休旅車嗎？從安全座椅、嬰兒車、長輩上下車、後座舒適度到停車條件，用五個步驟縮小選擇。",
  introduction: "家庭車先過三關：家人坐得下、常用行李放得進、家裡停得了。休旅或掀背都用同一組乘客和行李比較，合用後再看配備與價格。",
  updatedAt: "2026-09-22", reviewedAt: "2026-09-11",
  sourceIds: ["swift", "vitara", "sCross", "jimny", "eVitara"],
  sourceNote: "試坐與比較清單為本站依用車需求整理；乘坐舒適度沒有統一排名，車型配置以台灣版本為準。",
  relatedSlugs: ["powertrain-choice", "first-car"],
  relatedCars: ["vitara", "s-cross"],
  conversation: "鈺漣你好，平常坐＿＿人、有＿＿張安全座椅，常帶＿＿，車位限制＿＿，想比較＿＿。",
  sections: [
    {
      id: "needs", step: "列出乘坐情境", title: "列三項不能妥協的需求",
      paragraphs: ["依最常出現的用車情境挑車，小車若已足夠，也可以保留比較。"],
      points: [{ label: "平日", text: "誰開、誰坐？常走窄巷、坡道或機械停車場嗎？" }, { label: "全家出門", text: "安全座椅、嬰兒車與旅行箱是否要同時上車？" }, { label: "未來幾年", text: "家中成員、通勤或照顧長輩的需求會改變嗎？" }],
    },
    {
      id: "seating", step: "家人一起試坐", title: "前座調好，再試安全座椅與後座",
      paragraphs: ["把前座調成正常坐姿，帶實際安全座椅試裝。裝好兩張後，中間成人是否能正確繫帶、前座是否仍可正常使用，都要實試。五人座標示不能代替確認。", "請長輩親自上下車，感受門檻、座椅高度、踏地與抓握位置。"],
      note: "安全座椅試裝先和展間約定，固定方式依車輛及座椅手冊，不任意移動固定點。",
    },
    {
      id: "luggage-parking", step: "試放與量車位", title: "後座直立試放行李，量好車位",
      paragraphs: ["以全家就座、後座直立的狀態，試放嬰兒車、旅行箱及常用袋子；確認尾門可關、物品可固定。只看行李箱公升數，容易漏掉開口和輪拱限制。", "車位要量限長、限寬、限高、載重，以及坡道、轉彎、開門與尾門空間；機械車位另請管理者確認設備規範。"],
    },
    {
      id: "test-drive", step: "同條件試乘", title: "讓家人用相近路線比較乘坐感受",
      paragraphs: ["固定乘坐位置和相近路線，比較起步、煞車、路面接縫；駕駛記下視野和操控，乘客記下支撐、噪音與晃動。網友心得可當觀察提示，不能代替家人試乘。", "ACC、車道輔助另問作動速度、退出條件及停下後如何起步；由顧問示範正常操作，駕駛仍須掌握車況。"],
      link: { href: "/visit/beitou", label: "先確認可安排的展示與試乘車" },
    },
    {
      id: "shortlist", step: "留下兩三台", title: "留下合用的車，再比總支出",
      paragraphs: ["剔除乘坐、載物或車位不合的選項，再比較成交價、油電、保險、保養及輪胎費。", "VITARA 與 S-CROSS 可從驅動需求比較；Jimny 要接受三門進出及載物取捨，e VITARA 要安排充電。四驅仍有路況與操作限制。"],
      link: { href: "/cars/vitara#vitara-vs-s-cross", label: "核對 VITARA 與 S-CROSS 的台灣版本差異" },
    },
  ],
};

const maintenanceGuide: Guide = {
  slug: "car-maintenance",
  category: "ownership",
  audience: "第一次保養怎麼準備",
  title: "第一次汽車保養怎麼準備？週期、工單與日常檢查",
  description: "里程少也要回廠嗎？第一次保養先準備車型與紀錄，分清定期項目、車況維修和自選服務，再確認費用與下次保養時間。",
  introduction: "第一次保養，帶車型年式、目前里程與上次紀錄。按自己的保養表核對到期項目，再把工單分成定保、車況維修、自選服務三類，確認費用後施工。",
  updatedAt: "2026-09-22", reviewedAt: "2026-09-11",
  sourceIds: ["service", "maintenancePrinciples", "repairConsent", "tirePressure"],
  sourceNote: "保養表讀法參考台灣原廠公開說明；Toyota 頁面的公里數、月份與保固不適用於 Suzuki。本次未取得各年式 Suzuki 台灣隨車保養表，因此不列統一換油、換電池或更換耗材週期。請依自己的隨車文件確認。",
  relatedSlugs: ["powertrain-choice", "first-car"],
  conversation: "鈺漣你好，我的車是＿＿、＿＿年式，目前＿＿公里，上次保養＿＿，想確認＿＿。",
  sections: [
    {
      id: "schedule", step: "找到保養表", title: "保養看時間與里程，依手冊先到者為準",
      paragraphs: ["核對自己年式與動力的保養表。若規定時間、里程先到者為準，里程少也不能忽略時間；首次檢查另確認。短程、久停或特殊使用環境，要告知服務廠。"],
      note: "預約備好：車型年式、里程、上次工單、近期異常與需取車時間。有疑問請服務廠指出適用手冊頁次，不套用別款車的週期。",
    },
    {
      id: "work-order", step: "看懂保養工單", title: "看懂保養工單：先分三類",
      paragraphs: ["先看材料規格、數量、工資與總額，不懂的項目直接問是哪一類。"],
      points: [{ label: "到期定保", text: "對照保養表；要求檢查，不一定代表每次都要換。" }, { label: "車況維修", text: "磨耗、滲漏、異音等，請技師說明檢查結果、急迫性與報價。" }, { label: "自選服務", text: "美容、除臭或額外清潔，問清用途及是否屬於手冊要求。" }],
      note: "約定追加項目及費用先告知、取得同意再做；取車時對照原報價與實際工單。",
      link: { href: "/faq#maintenance-extras", label: "保養加項可以怎麼問？" },
    },
    {
      id: "daily-checks", step: "平常看什麼", title: "平常看輪胎、燈光，記下異常",
      paragraphs: ["每月及長途前查看輪胎，冷胎時依車門標籤或手冊核對胎壓；前後輪、負載與單位要看清楚。順手檢查燈光、雨刷與玻璃。", "偶發異音，停妥後記下冷熱車、車速、天候與頻率。煞車、轉向異常或明顯輪胎損傷，先安全停車並求助，不等下次保養。"],
      link: { href: "/faq#tire-pressure", label: "胎壓要打多少？" },
    },
    {
      id: "powertrain", step: "分清動力系統", title: "輕油電要養引擎，純電也要保養",
      paragraphs: ["輕油電仍有汽油引擎，換油依保養表；純電沒有引擎機油，但輪胎、煞車等仍需檢查。", "詢問電池時，分清供電電瓶、輕油電電池與純電動力電池，再看檢測、報價和保固，別套用他人的更換年限。"],
      link: { href: "/guides/powertrain-choice#systems", label: "先弄懂汽油、輕油電、油電與純電的差別" },
    },
    {
      id: "records", step: "留單據與預算", title: "留好工單，約定下次時間",
      paragraphs: ["留下日期、里程、零件、費用、檢查結果與下次時間；未完成項目寫明後續處理。預約不等於保證完工，有用車需求先約好取車安排。", "預算除定保外，也預留輪胎、電瓶等耗材費。贈送保養另確認材料、工資、使用據點及期限。"],
      link: { href: "/faq#local-service", label: "購車與保養可以在不同縣市嗎？" },
    },
  ],
};

const powertrainGuide: Guide = {
  slug: "powertrain-choice",
  category: "selection",
  audience: "汽油、油電與純電怎麼選",
  title: "汽油、輕油電、油電與純電怎麼選？從里程和充電開始",
  description: "一年開不多就不適合油電嗎？先分清輕油電、一般油電與純電，再用年里程、實際價差、能源費和充電時間評估。",
  introduction: "油電划不划算，沒有固定年里程門檻：要一起算成交價差、能源費與持有年數。考慮純電，則先確認每週在哪裡充電，再比較費用。",
  updatedAt: "2026-09-22", reviewedAt: "2026-09-11",
  sourceIds: ["swift", "vitara", "sCross", "eVitara", "fit", "energyLabel"],
  sourceNote: "費用範例全部為假設值，展示計算方式；不是現行油價、電價、實測油耗或 Suzuki 報價。各車型的充電、保養與保固依台灣版本資料確認。",
  relatedSlugs: ["suv-selection", "car-maintenance"],
  relatedCars: ["swift", "e-vitara"],
  conversation: "鈺漣你好，我一年開＿＿公里，市區／高速約＿＿，預計開＿＿年，＿＿能充電，想比較＿＿。",
  sections: [
    {
      id: "systems", step: "先分清動力", title: "先分清楚：哪些車需要插電？",
      paragraphs: ["Hybrid 名稱不能直接代表純電行駛能力，先看實際系統。"],
      points: [{ label: "汽油", text: "汽油引擎驅動，到加油站補充燃油。" }, { label: "輕油電 MHEV", text: "SWIFT、VITARA、S-CROSS 回收電能輔助引擎，不用外接充電。" }, { label: "一般油電 HEV", text: "如 FIT e:HEV，依條件切換馬達與引擎，不用插電；純電運作有條件限制。" }, { label: "純電 BEV", text: "如 e VITARA，靠電池與馬達行駛，需要充電。PHEV 是另一類插電式油電。" }],
    },
    {
      id: "routine", step: "記下一週路線", title: "記下年里程、市區與高速比例",
      paragraphs: ["通勤加假日行程估年里程，分開看市區停走與高速巡航。試乘時留意起步、引擎介入、再加速及煞車。", "官方能源效率適合在相同測試標準下比較，實際會受冷氣、載重及路況影響；抓預算時另算保守情境。"],
    },
    {
      id: "cost", step: "算持有成本", title: "先算年能源費，再看價差多久抵銷",
      paragraphs: ["汽油／油電：年里程 ÷ 預估 km/L × 每公升油價。純電：年里程 ÷ 預估 km/kWh × 每度電價，另計充電損耗、停車或其他收費；按分鐘計價須另估。", "假設年跑 12,000 公里、油價 30 元，油耗 15 與 20 km/L 的年油費為 24,000 與 18,000 元。價差 6 萬，單靠每年省 6,000 元約需 10 年；里程減半則約 20 年。"],
      points: [{ label: "完整成本", text: "車價加能源、稅費、保險、保養、停車與融資費，減出售收入；殘值用不同假設比較。" }, { label: "別重複加算", text: "已算車價，就不再加貸款本金；已扣出售收入，也不再另加折舊。" }],
      note: "以上是假設算式，不是實車油耗、現行油電價或報價。每年淨節省須大於零才能用除法估回本，保養、配備與殘值差異也要納入。",
      link: { href: "/guides/first-car#budget", label: "交車前現金需求，另看購車預算" },
    },
    {
      id: "charging", step: "實走充電安排", title: "買純電前，實走一次補電路線",
      paragraphs: ["裝家充：確認社區同意，再由合格專業人員勘查供電、配線、設備與施工費；車位有插座不代表能直接使用。", "靠公共充電：到常用站查接頭、開放時間、收費及占用，把繞路和等待也算進作息。準備第二個相容站點，長途另查目的地補電。"],
      link: { href: "/cars/e-vitara#e-vitara-charging", label: "查 e VITARA 台灣充電接頭與準備事項" },
    },
    {
      id: "decision", step: "試乘後決定", title: "核對保固，再用試乘感受做決定",
      paragraphs: ["詢價固定版本與配備，拿到成交明細、定保項目及電池保固；分清故障、容量條件、年限、里程與除外事項。保固到期不等於必須換電池。", "最後比買車差額、年能源費、固定支出、充電時間與家人試乘感受。省下多少錢、喜不喜歡開，分開想清楚。"],
      link: { href: "/guides/car-maintenance#powertrain", label: "不同動力的保養要留意什麼？" },
    },
  ],
};

export const licensePlateGuide: Guide = {
  slug: "license-plate",
  category: "process",
  audience: "選車牌與領牌",
  title: "新車車牌怎麼選？選號費用、競標與領牌期限",
  description: "順編、一般選號與競標差在哪？整理自用小型車選號費、英文與數字查詢、跨區領牌、委託代辦，以及付款前一定要確認的期限。",
  introduction: "不挑號碼可順編；想指定號碼，分一般選號與競標。先確認車輛和文件能領牌，再付款：一般網路選號與競標的領牌期限差很多。",
  updatedAt: "2026-09-22",
  reviewedAt: "2026-09-20",
  sourceIds: ["platePortal", "plateRules", "plateSelection", "plateAuction", "plateCosts"],
  sourceNote: "本文以台灣自用小型車新領牌為主要情境；其他車種、已領牌車換號或有領牌限制者，需另向監理機關確認。選題參考公開買家討論，費用與期限依官方資料核對；付款前仍以當次系統及招標公告為準，不承諾指定號碼或交期。",
  relatedSlugs: ["first-car", "trade-in"],
  conversation: "鈺漣你好，我偏好車牌＿＿或＿＿，選號預算＿＿，希望＿＿前交車，想自己辦／請你協助。",
  sections: [
    {
      id: "options", step: "選方式與預算", title: "順編、一般選號、競標：費用差在哪？",
      paragraphs: ["以下以自用小型汽車新領牌為例，領牌規費、稅費、保險與代辦費另核對。"],
      points: [{ label: "順編：不指定號碼", text: "按順序領用，不另收挑號碼的選號費。" }, { label: "一般選號：基本 2,000 元", text: "從開放清單選；系統、轉帳費另確認，特殊或流標號牌可能依公告底價計費。" }, { label: "競標：依得標價", text: "按公告底價出價，熱門號碼可能加價；先設預算上限。" }],
      note: "報價「含選號」要問包含哪些費用，競標差額與代辦費是否另付。",
    },
    {
      id: "timing", step: "先確認領牌日", title: "車還沒準備好，先查號、別急著繳費",
      paragraphs: ["付款前確認車輛資料、領牌文件、保險與承辦時間，分清兩種期限。"],
      points: [{ label: "一般網路選號", text: "轉帳成功後，須在次一工作日收件截止前辦妥領牌；不是固定 24 小時，假日與受理時段另確認。" }, { label: "網路競標", text: "原則上決標後 24 小時內繳款，以招標公告為準；領牌須在決標次日起三個月內完成。" }],
      note: "逾期領牌會失去號牌權利，已繳款不退。繳款與領牌期限分開記，不要互相套用。",
      link: { href: "/guides/first-car#paperwork", label: "先把付款、保險與領牌順序排好" },
    },
    {
      id: "find-number", step: "查號碼與備選", title: "英文與數字是一組，不能自由拼牌",
      paragraphs: ["到監理服務網「選號標牌 → 網路選號 → 選號及轉帳」，選管轄單位、領牌地點、車種與能源別，查看當下開放號碼。", "查不到可能尚未開放、已選走或另行標售。第三方工具可能有時間差；截圖、收藏或傳給業務，都不代表保留成功。"],
      points: [{ label: "準備備選", text: "列三至五組，註明是否指定英文、能否接受其他領牌地點。" }, { label: "按喜好與預算", text: "紀念日、好記的排列都可以；吉凶評分不代表行車安全。" }],
      link: { href: "https://www.mvdis.gov.tw/m3-emv-plate/webpickno/member/operatePickNo?keepQryData=y", label: "到監理服務網查詢可選號碼" },
    },
    {
      id: "delegate", step: "確認誰辦與地點", title: "可以委託選號，跨區要到號牌所屬單位領",
      paragraphs: ["自行操作先確認會員、自然人憑證、讀卡機與付款方式；也可委託具會員資格者，約好誰查號、繳費、送件及提供證明。", "跨所、站可查選號碼，但須到號牌管轄單位領牌，不能轉到另一站領。先問代辦費、文件與時間；特殊車種或狀態另確認限制。"],
      note: "代辦不等於登記在代辦人名下。車主與車輛資料需正確，一般選號完成後不能任意移給別人或別台車。",
      link: { href: "/faq#registration-documents", label: "查看領牌文件與交付方式" },
    },
    {
      id: "before-payment", step: "付款前最後核對", title: "付款前，核對這五件事",
      paragraphs: ["以官方繳費結果為準；結果不明先查紀錄或聯絡承辦人。"],
      points: [{ label: "號碼與車主", text: "完整英文、數字、車主與指定車輛是否正確？" }, { label: "總費用", text: "選號／得標金、手續費與代辦費是否已含在報價？" }, { label: "領牌地點", text: "誰到哪個監理單位辦理？" }, { label: "兩個期限", text: "何時繳款、何時領牌？文件與車輛趕得上嗎？" }, { label: "成功紀錄", text: "保存官方繳費證明，領牌後核對車牌與行照。" }],
      note: "證件按約定管道交付，本站諮詢表單不需身分證字號或銀行資料。",
    },
  ],
};

export const guides = [firstCarGuide, tradeInGuide, licensePlateGuide, suvSelectionGuide, powertrainGuide, maintenanceGuide];
export function getGuide(slug: string) { return guides.find((guide) => guide.slug === slug); }
export function guideTitle(guide: Guide) { return `${guide.title}｜張鈺漣購車指南`; }

// Keep published URLs useful; trade-in is restored as its own canonical article.
export const guideRedirects = [
  { source: "/guides/swift-buying-cost", destination: "/guides/first-car#budget", permanent: true },
  { source: "/guides/buying-cost", destination: "/guides/first-car#budget", permanent: true },
  { source: "/guides/quote-contract", destination: "/guides/first-car#contract", permanent: true },
  { source: "/guides/financing-insurance", destination: "/guides/first-car#payment", permanent: true },
  { source: "/guides/delivery-process", destination: "/guides/first-car#delivery", permanent: true },
  { source: "/guides/buying-process", destination: "/guides/first-car#paperwork", permanent: true },
  { source: "/guides/vitara-vs-s-cross", destination: "/cars/vitara#vitara-vs-s-cross", permanent: true },
  { source: "/guides/e-vitara-charging", destination: "/cars/e-vitara#e-vitara-charging", permanent: true },
];
