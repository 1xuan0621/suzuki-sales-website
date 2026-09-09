import type { ContentSourceId } from "./content-sources";

export interface Guide {
  slug: string;
  audience: string;
  title: string;
  description: string;
  introduction: string;
  updatedAt: string;
  reviewedAt: string;
  sourceIds: ContentSourceId[];
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
  updatedAt: guideReviewedAt,
  title: "Suzuki 購車指南｜第一次買車、舊車換新車｜鈺漣",
  description: "跟鈺漣買 Suzuki，從哪一步開始？先看購車流程圖，再依第一次買車或舊車換新車，了解試乘、報價、舊車估價與交車安排。",
};

export const firstCarGuide: Guide = {
  slug: "first-car",
  audience: "第一次買車",
  title: "第一次買 Suzuki，從看車到開回家",
  description: "第一次買車不用先背熟規格。鈺漣陪你從用車需求與預算開始，弄懂 Suzuki 試乘、購車菜單、訂金、貸款保險和交車當天要確認的事。",
  introduction: "第一次走進展間，不知道要問什麼很正常。你可以先告訴鈺漣平常怎麼通勤、會載誰、車停哪裡，以及希望花多少錢。還沒選定 Suzuki 哪一款也沒關係，先把每天會用到的事情想清楚，再來看車。",
  updatedAt: guideReviewedAt,
  reviewedAt: guideReviewedAt,
  sourceIds: ["consumer", "loan", "insurance", "registration", "service", "swift", "jimny", "eVitara"],
  conversation: "鈺漣你好，我第一次買車，主要是＿＿通勤，平常坐＿＿人，車停＿＿。希望交車前支出在＿＿以內，每月連養車大約＿＿，想先了解＿＿／還沒決定車款。",
  sections: [
    {
      id: "budget", step: "需求與預算", title: "先想每天怎麼用，再算自己能花多少",
      paragraphs: ["先寫下三件事：平常坐幾個人、車停在哪裡、最常走哪種路。兩人通勤和一家人週末出遊，要確認的空間就不一樣。如果是機械車位，把限長、限寬、限高與載重記下來，賞車時一起核對。", "預算則分成兩筆：交車前拿得出的錢，以及每月願意花在車上的錢。月付之外，還有停車、油電、保險、稅費和保養；先扣掉生活開銷與預備金，再決定車價範圍，後面看報價才不容易越加越多。"],
      note: "假設成交車價 80 萬、核貸 50 萬，保險等其他費用合計 6 萬，交車前共需自備 36 萬。若已付訂金 2 萬，剩下是 34 萬。這是算式示例，不是 Suzuki 報價。",
      link: { href: "/#loan-calculator", label: "用貸款試算抓每月支出" },
    },
    {
      id: "test-drive", step: "看車與試乘", title: "試乘時，把你平常的生活帶上車",
      paragraphs: ["看照片喜歡，跟每天開得習慣，是兩件都要確認的事。想看 SWIFT，可以多留意坐姿、轉彎視野與後座；喜歡 Jimny，除了外型，也實際走一次後座進出、試放平常的行李。考慮 e VITARA，則先聊平常在哪裡充電。", "常一起坐車的人最好一起來，嬰兒車或常用行李也可以帶來試放。開車的人把座椅調好後，再請家人坐後座；試乘時感受起步、煞車與路面震動，也試試空調、手機連線等每天會操作的功能。試完覺得不適合，就把原因告訴鈺漣，再縮小選擇。"],
      note: "來北投所前，先確認想看的車款、可安排的展示或試乘車與時段。需要試駕時，也先確認駕照及相關安排。",
      link: { href: "/visit/beitou", label: "查看北投所位置與到店資訊" },
    },
    {
      id: "contract", step: "報價與訂車", title: "拿到「菜單」，先看你最後會拿到什麼",
      paragraphs: ["網友說的菜單，就是購車報價明細。別人的成交單可以幫你找出漏問的項目，但日期、年式、付款方案和配件不同，折扣數字就不能直接比。請鈺漣把你選的條件列清楚，再看交車總額。"],
      points: [
        { label: "車是哪一台", text: "車款、版本、車色、年式、出廠年月，以及是否已領牌，都分開寫。" },
        { label: "配件是哪一款", text: "隔熱紙、行車紀錄器等列品牌與型號，確認原車配備、另加配件及各自的保固窗口。" },
        { label: "錢包含什麼", text: "車價、配件、保險、領牌稅費分項列；現金與貸款各用哪個優惠、是否已含減稅，也先問清楚。" },
      ],
      note: "決定下訂前，先拿完整契約審閱，把交車期限、付款節點、貸款未過與退訂處理寫進約定。匯款核對車商指定帳戶並留收據；不要把契約審閱當成簽約後隨時都能無條件退款。",
    },
    {
      id: "payment", step: "貸款與保險", title: "月付看得懂，保險也要知道保了什麼",
      paragraphs: ["如果要貸款，請鈺漣把現金方案和貸款方案放在一起算：頭款、所有期款、尾期款及另外收的費用，加起來各是多少。再核對總費用年百分率與提前清償條件。網站試算只能先抓預算，實際額度和條件要等審核結果。", "保險可以從情境問起：「如果碰到別人的車呢？自己的車受損呢？」強制險不包含修車費，第三人責任險與車體險處理的風險也不同。拿到明細後，逐項看保額、自負額與不賠的情況，比只問有沒有全險更容易弄懂。"],
      link: { href: "/faq#insurance-coverage", label: "看常見車險問題" },
    },
    {
      id: "paperwork", step: "領牌與安排", title: "訂好車後，先約定哪一天做哪件事",
      paragraphs: ["接下來會碰到看指定實車、付款、保險生效、領牌與配件施工。這些順序要在簽約時跟鈺漣約好；如果你希望領牌前先看車，請提早說，讓看車時間與付款條件一起排進去。需要的證件，則依個人、公司或委託代辦身分，由承辦人提供清單。", "住外縣市可以先遠端談需求和報價，再安排必要的到店行程。想自取或在其他地點交車，就先確認地點、運送方式、費用、保險與驗收安排。有指定用車日也請一開始就說，供車、核貸、領牌和施工都可能影響日期。"],
      note: "等車時可以直接問：「目前完成到哪一步？下一步需要我準備什麼？」領牌文件另按確認好的方式交付，本站諮詢表單不用提供證件或銀行資料。",
    },
    {
      id: "delivery", step: "交車與上路", title: "交車當天，留一段時間慢慢認識新車",
      paragraphs: ["交車前把報價與配件清單存在手機裡，當天一項一項對。先看車，再學操作，最後把單據與隨車物品收好；留一段不趕時間的空檔，會比急著開走安心。"],
      points: [
        { label: "繞車一圈", text: "核對車色與車身識別資料，查看漆面、玻璃、輪圈及內裝，記下里程與油量／電量。" },
        { label: "自己操作一次", text: "測試燈光、車窗、空調與手機連線，確認配件型號和施工。請鈺漣說明駕駛輔助的使用限制；電動車另練習充電操作。" },
        { label: "帶走清單上的東西", text: "點收鑰匙、隨車物品、行照、發票、保險與結算資料，問清保固、首次保養時間及聯絡窗口。" },
      ],
      note: "有刮傷、操作疑問或尚未裝好的配件，就當場拍照記錄，寫明誰處理、何時完成，雙方各留一份。回家後對功能還不熟，也可以把問題整理給鈺漣。",
    },
  ],
};

export const tradeInGuide: Guide = {
  slug: "trade-in",
  audience: "舊車換新車",
  title: "換一台 Suzuki，舊車和新車怎麼接上？",
  description: "舊車還能開，現在換 Suzuki 值不值得？鈺漣帶你分開看舊車估價、新車報價與減稅，算出要補的錢，再安排交車和舊車交接。",
  introduction: "已經有車的人，往往不是不知道怎麼買，而是卡在「舊車怎麼處理、還要補多少、中間會不會沒車用」。找鈺漣聊換車，可以從現在這台車開始：哪些地方還喜歡，哪些地方已經不合用了。",
  updatedAt: guideReviewedAt,
  reviewedAt: guideReviewedAt,
  sourceIds: ["consumer", "tradeInTax", "registration", "service", "eVitara"],
  conversation: "鈺漣你好，我現在開＿＿，＿＿年、約＿＿公里，還有／沒有貸款。想換車主要因為＿＿，考慮 Suzuki 的＿＿，希望＿＿前交車，舊車在這之前還需要每天使用。",
  sections: [
    {
      id: "needs", step: "確認換車原因", title: "這次換車，最想改善哪一件事？",
      paragraphs: ["是維修次數變多、家人上下車不方便、行李放不下，還是想換一台自己更喜歡的車？把最在意的兩三件事排出順序，試乘時才知道新車有沒有真的解決問題。也把現在這台車的優點留下來，像座椅、視野或停車方便程度，別換了才發現不習慣。", "想換 SWIFT，就比較每天停車和實際乘坐；在 VITARA、S-CROSS 間猶豫，就帶家人與常用行李一起試。想圓 Jimny 的夢，也把日常載人載物走一遍。從油車換 e VITARA，先確認固定充電方式和設備費用，再來算養車支出。"],
      link: { href: "/#cars", label: "看看 Suzuki 車款與比較" },
    },
    {
      id: "valuation", step: "舊車估價", title: "舊車賣多少，和新車折多少，分開談",
      paragraphs: ["先整理舊車的車型、年份、里程、保養紀錄，以及事故、鈑烤或改裝情況，跟鈺漣討論估價安排。照片和文字可以先幫忙了解狀況，最後收購價仍要看實車；也要問報價有效到何時、交車前繼續使用會不會影響估價。", "請把新車報價、舊車收購價和換購優惠分開列。若舊車還有貸款，向原貸款機構確認結清金額與相關費用，再算真正可用的餘額。自己賣車或由車商協助，各自要花的時間、收款與交接安排也一起比較。"],
      note: "假設舊車賣 25 萬，貸款結清與費用共 10 萬，能用來換車的是 15 萬。如果新車交車前需自備 36 萬，舊車款已收到或書面約定可抵款時，才是另外準備 21 萬；尚未收到就要先備足 36 萬。以上為假設範例。",
    },
    {
      id: "tax", step: "賣車或報廢", title: "先比賣車與報廢，再決定舊車去向",
      paragraphs: ["還有中古車價值的車，先估價再決定。賣給下一位車主繼續使用，與報廢申請汰舊換新，是不同的處理方式；不要直接把舊車售價和這台舊車的報廢減稅加在一起。請鈺漣分別列出兩種做法的可用金額、文件與時間，再比較哪種適合你。", "新購減稅與汰舊換新也要分開核對。若走報廢換購，財政部現行說明包含舊汽車車齡 10 年以上、持有滿 1 年，以及新舊車主關係等條件；報廢前後 6 個月內購買新車並完成新領牌，也是要一起排好的期限。公司名義、純電車或工作用車，另按適用條件確認。"],
      note: "先請承辦人確認資格、誰送件、款項怎麼退，再辦舊車。報廢包含車體回收和車籍報廢，文件都要留好。尚未核准或入帳的減稅，先別當成交車當天可用的現金。",
    },
    {
      id: "schedule", step: "銜接交車時間", title: "每天都要用車，就先排好交接日",
      paragraphs: ["最需要提早跟鈺漣說的是：「舊車每天還要通勤／接小孩，不能先交出去。」把新車供應、核貸、付款、領牌、施工，以及舊車交付日期放在同一張時間表上。先確認能否銜接，再決定什麼時候交出舊車。", "若走報廢換購，也不必只因為要減稅就急著先報廢；先買新車或先報廢都有條件與期限要符合，請承辦人按你的日期核對。如果中間仍有空檔，租車、家人接送或其他交通的天數與費用，也要算進換車成本。"],
      points: [
        { label: "新車延後時怎麼辦", text: "舊車能否晚交、估價是否仍有效、需要補哪段交通，先留下約定。" },
        { label: "舊車款何時可用", text: "確認收款或抵款日期是否趕得上新車付款，貸款結清由誰辦、何時取得證明。" },
        { label: "外縣市怎麼交接", text: "新舊車是否在同一地點交接、各自的運送費與驗收方式，都先跟鈺漣確認。" },
      ],
    },
    {
      id: "handover", step: "交接與後續", title: "交出舊車前，把自己的東西與資料帶走",
      paragraphs: ["除了後車廂，記得看看手套箱、座椅下方、遮陽板和行車紀錄器記憶卡。車機中的手機配對、通訊錄與導航住家位置也一起清除；停車場車牌辨識、eTag 和保險等服務，向各承辦單位確認異動方式。", "出售舊車時留下交付時間、里程、款項和過戶完成的紀錄；走報廢則收好回收與車籍報廢文件。新車仍照清單檢查，別因為以前買過車就省略；新的駕駛輔助和車機操作，可以請鈺漣陪你再走一次。", "最後把舊貸款結清、換購申請進度、退稅入帳與新車首次保養記在同一處。住外縣市可以查 Suzuki 就近保修據點；購車贈送保養或加裝配件的保固，另確認使用地點與負責窗口。"],
      link: { href: "/guides/first-car#delivery", label: "打開新車交車檢查清單" },
    },
  ],
};

export const guides = [firstCarGuide, tradeInGuide];
export function getGuide(slug: string) { return guides.find((guide) => guide.slug === slug); }
export function guideTitle(guide: Guide) { return `${guide.title}｜鈺漣購車指南`; }

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
