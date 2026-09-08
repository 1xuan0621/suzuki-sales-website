import type { CarId } from "./site";
import { editorialReviewedAt, type ContentSourceId } from "./content-sources";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  points?: string[];
  table?: { caption: string; columns: string[]; rows: string[][] };
  sourceIds: ContentSourceId[];
  links?: { href: string; label: string }[];
}

export const faqPage = {
  updatedAt: editorialReviewedAt,
  title: "常見 QA｜購車、交車與 SUZUKI 車型問題｜張鈺漣",
  description: "查找購車費用、訂金、貸款、保險、跨縣市交車與保養問題，也能快速了解 SWIFT 小車比較、Jimny 改款差異，連到各車型完整問答。",
};

export const generalFaqGroups: { id: string; title: string; items: FaqItem[] }[] = [
  { id: "budget", title: "預算與付款", items: [
    { id: "total-cost", question: "網頁車價就是交車總價嗎？還有哪些費用？", answer: "網頁標示的是建議售價。請另外核對成交車價、保險、領牌及稅費、選配、貸款費用和另約運送費。已包含的項目不重複加算；已付訂金會抵車款。先拿到明細，再比較交車前支出與全期總成本。", sourceIds: ["consumer", "registration"], links: [{ href: "/guides/buying-cost", label: "看完整費用估算與範例" }] },
    { id: "cash-or-loan", question: "現金、零利率或低月付，哪一種比較划算？", answer: "先取得各方案實際車價，再加總頭款、全部期款、尾期款及另收費用。低月付可能只是拉長期數或把金額留到後面；零利率也要看費用與折扣差異。請同時比較總費用年百分率、提前清償條件及自己的現金需求。", sourceIds: ["loan"], links: [{ href: "/guides/financing-insurance", label: "看貸款與保險比較清單" }, { href: "/#loan-calculator", label: "前往貸款試算" }] },
    { id: "insurance-coverage", question: "只買強制險夠嗎？「全險」到底包含什麼？", answer: "強制險提供法定範圍的人身傷亡保障，不包含車輛修復費用。對方財物損失、自己的車損與其他風險，需要分別確認相應險種。「全險」不是所有事故都賠的保證；請逐項核對保額、自負額及除外條款，再比較同條件保費。", sourceIds: ["insurance", "autoInsurance"], links: [{ href: "/guides/financing-insurance", label: "了解車險與投保前確認事項" }] },
  ] },
  { id: "order", title: "訂車與合約", items: [
    { id: "deposit", question: "付了訂金可以退嗎？貸款沒過怎麼辦？", answer: "要看契約、解除原因與適用規定。先談妥退訂、貸款未核准、額度不足或利率不符預期時的處理方式，連同已施工配件如何結算一起留下書面約定。保留契約與收據，有爭議時再依實際文件尋求消費諮詢。", sourceIds: ["consumer"], links: [{ href: "/guides/quote-contract", label: "看訂車前合約核對清單" }] },
    { id: "model-year", question: "年式、出廠年份和領牌日期有什麼不同？", answer: "年式指車輛款式或配備版本，出廠年月指實際生產時間，領牌日則是車籍登記的日期。三者可能不同；詢價時分開列出，並確認是否已領牌、實際配備與保固起算方式。不要只用『今年的新車』作為約定。", sourceIds: ["consumer"], links: [{ href: "/guides/quote-contract", label: "了解報價與車輛身分核對" }] },
    { id: "waiting-time", question: "訂車後多久能交？有車是不是就能馬上領？", answer: "交期還會受到車色與版本供應、貸款及文件進度、領牌與配件施工影響。先確認是否已有可分配車輛、目前完成哪個步驟，以及預估時間或約定期限。若有指定用車日期，下訂前就提出並談妥延誤處理。", sourceIds: [], links: [{ href: "/guides/delivery-process", label: "看訂車到交車的每一步" }] },
  ] },
  { id: "delivery", title: "領牌與交車", items: [
    { id: "payment-inspection", question: "要先付尾款還是先驗車？領牌前能看車嗎？", answer: "看車、付款、領牌及配件施工的順序，應在簽約時明確約定。希望領牌前看指定實車，就提前安排查看時間及付款條件；不要把別人的交車經驗當成所有車商都相同的流程。交車當天仍需依契約點交並記錄待處理事項。", sourceIds: ["consumer"], links: [{ href: "/guides/delivery-process", label: "看付款安排與交車檢查清單" }] },
    { id: "registration-documents", question: "領牌要準備什麼？證件什麼時候交？", answer: "個人、公司及委託代辦所需文件不同。個人身分證明與印章、車輛出廠及完稅資料、發票、保險等需按監理要求備妥，請承辦人提供完整清單。交付前確認用途、管道與歸還時間；本站諮詢表單不用填證件或銀行資料。", sourceIds: ["registration"], links: [{ href: "/guides/delivery-process", label: "看領牌文件與交車準備" }] },
    { id: "remote-purchase", question: "住外縣市也能買嗎？可以送到家嗎？", answer: "可以先遠端了解車款、需求與報價，再確認到店或文件安排。若希望其他地點交車，需依地點討論運送方式、費用、保險與驗收；交車地點、時程和可安排範圍以個案約定為準。", sourceIds: [], links: [{ href: "/guides/buying-process", label: "看跨縣市購車與交車流程" }] },
  ] },
  { id: "ownership", title: "換車與售後", items: [
    { id: "local-service", question: "在台北買車，之後保養一定要回台北嗎？", answer: "可先從 Taiwan Suzuki 官方保修據點查找附近服務中心，洽詢預約及車輛保養需求。保固依隨車文件與適用條件辦理；購車贈送保養或經銷商專案是否限店使用，另行確認。加裝配件也要分清施工與保固窗口。", sourceIds: ["service"], links: [{ href: "/guides/buying-process", label: "看跨縣市售後安排" }] },
    { id: "trade-in-tax", question: "沒有舊車也能減稅嗎？換購一定能折 10 萬嗎？", answer: "新購小客車減稅與汰舊換新是兩組條件。依財政部現行規則，符合條件的新購 2,000cc 以下小客車可減徵最高 5 萬元；符合汰舊換新可另申請最高 5 萬元，合計受已繳貨物稅額限制。純電車、小貨車等須另核對，不是每台車都能折 10 萬。", sourceIds: ["tax"], links: [{ href: "/guides/trade-in", label: "看舊車估價與減稅準備" }] },
    { id: "test-drive-booking", question: "試乘一定要先預約嗎？到北投所可以停車嗎？", answer: "建議先確認展示或試乘車款、可安排時段與路線，並說明同行人數。北投所提供免費停車位，抵達時可詢問現場人員停放位置；留下網站需求後，仍需由顧問確認才算完成預約。", sourceIds: [], links: [{ href: "/visit/beitou", label: "查看北投所交通與試乘預約" }] },
  ] },
];

const suvTable = {
  caption: "VITARA 與 S-CROSS：台灣販售版本比較方向",
  columns: ["比較項目", "VITARA", "S-CROSS"],
  rows: [
    ["動力", "1.4L 渦輪、48V 輕油電", "1.4L 渦輪、48V 輕油電"],
    ["驅動", "ALLGRIP 四驅", "前輪驅動"],
    ["選車先確認", "是否需要四驅及其使用條件", "後座乘坐與家庭載物需求"],
    ["空間怎麼比", "以後座直立、同一組行李試放", "以後座直立、同一組行李試放"],
  ],
};

export const carFaqs: Record<CarId, FaqItem[]> = {
  swift: [
    { id: "swift-vs-small-cars", question: "SWIFT 和 FIT 等小車怎麼選？", answer: "先比停車、後座與載物，再看動力。SWIFT 是 1.2L 輕油電小車；FIT 在台灣有汽油及 e:HEV 版本，動力系統不同。若主要一至兩人通勤，先試停車與市區操作；常載家人或大型物品，就讓家人試坐，帶行李尺寸比較。", table: { caption: "SWIFT 與 Honda FIT：依台灣版本整理的選車重點", columns: ["比較項目", "SWIFT", "Honda FIT"], rows: [["動力選擇", "1.2L、12V 輕油電", "1.5L 汽油／e:HEV 油電"], ["座椅與載物", "確認後座傾倒與行李放入方式", "可確認 ULTRA SEAT 椅墊上掀與座椅變化"], ["試乘要做什麼", "走自己的通勤情境，確認視野、起步與停車", "使用相同乘坐人數、行李和路線比較"]] }, points: ["先選定要比的台灣版本，不能把汽油版價格和油電版配備混用。", "比較油耗時核對測試條件；實際油錢依自己的路線與駕駛習慣。", "沒有單一全面勝出的答案，把最常用到的條件排在前面。"], sourceIds: ["swift", "fit"], links: [{ href: "/guides/buying-cost", label: "把完整購車與養車成本也算進去" }] },
    { id: "swift-hybrid", question: "SWIFT 輕油電需要充電嗎？和一般油電一樣嗎？", answer: "不用外接充電。SWIFT 的 12V 輕油電由系統回收電能、輔助引擎，不能直接套用其他油電車的純電行駛能力。試乘時可留意起步、怠速熄火與再啟動感受，系統作動及保養依原廠說明。", sourceIds: ["swift"], links: [{ href: "/cars/e-vitara#e-vitara-charging", label: "需要插電的 e VITARA 有哪些差別？" }] },
    { id: "swift-rear-seat", question: "SWIFT 後座和行李箱夠用嗎？可以放嬰兒車嗎？", answer: "先用平常的前座坐姿試坐後座，再確認嬰兒車收折尺寸及行李箱開口。若後座要裝安全座椅或坐家人，就以後座直立的狀態試放；後座傾倒後的最大容積不能當成全家出遊時的可用空間。", sourceIds: ["swift"], links: [{ href: "/visit/beitou", label: "帶著家人與行李尺寸到店確認" }] },
    { id: "swift-parking", question: "SWIFT 可以停機械車位嗎？", answer: "請帶車位的限長、限寬、限高、載重與入口條件，逐項對照官方規配表。也要檢查輪胎定位、車道轉彎及設備規範，並請停車設備管理者確認；只看車高符合，仍不足以判定一定能停。", sourceIds: ["swift"] },
    { id: "swift-consumption", question: "SWIFT 官方油耗等於我的實際油耗嗎？", answer: "官方油耗是在指定條件下測得。短程、塞車、冷氣、載重和駕駛方式都會改變實際結果。可先用通勤里程做保守估算，交車後再以多次加油與里程紀錄觀察，不以單次最佳數字推估整年支出。", sourceIds: ["swift"], links: [{ href: "/guides/buying-cost", label: "看每月養車費怎麼抓" }] },
  ],
  jimny: [
    { id: "jimny-model-update", question: "Jimny 改款差在哪？新舊配備要怎麼比？", answer: "與官方 2024 台灣型錄相比，現行台灣官網的重點是主動安全與車內介面升級，包含 ACC、DSBS II、LDP、TSR，以及 9 吋多媒體系統。仍保留 Jimny 的大樑與加力箱四驅配置，選車時也要評估日常乘坐和載物取捨。", table: { caption: "Jimny：2024 台灣型錄與現行台灣官網對照", columns: ["核對重點", "先前台灣型錄", "現行台灣官網"], rows: [["煞車輔助", "DSBS 雙感知器", "DSBS II 雙感知器"], ["巡航", "定速巡航", "ACC 主動式車距巡航"], ["車道與路標", "LDWS 車道偏離警示", "保留 LDWS，加入 LDP 與 TSR"], ["車機", "CD／MP3、藍牙；觸控螢幕為選配", "標配 9 吋觸控螢幕、無線手機連結"], ["動力骨架", "1.5L、四速自排、加力箱四驅", "維持 1.5L、四速自排、加力箱四驅"]] }, points: ["本站沿用 Jimny 2026 車名；網路上的年份稱呼不一定等於實際供應年式。", "下訂時以台灣規配表、實際車輛及合約配備清單確認。"], sourceIds: ["jimny", "jimnyPrevious"], links: [{ href: "/faq#model-year", label: "年式、出廠與領牌日期有何不同？" }] },
    { id: "jimny-daily-use", question: "Jimny 適合通勤嗎？後座、長途會不會不習慣？", answer: "先看你能否接受三門車的後座進出方式、乘坐感受與載物取捨。試乘不要只看外型：讓常同行的人坐後座，走可安排的一般道路，留意轉向、起伏、風噪與行李空間。如果常滿載跑長途，建議同時試坐其他休旅。", sourceIds: ["jimny"], links: [{ href: "/cars/vitara#vitara-vs-s-cross", label: "看看 VITARA 與 S-CROSS 的選擇方向" }] },
    { id: "jimny-four-wheel-drive", question: "Jimny 四驅可以一直開著嗎？試乘能去越野嗎？", answer: "四驅模式要依原廠手冊及路面條件使用，不要把分時四驅當成任何路面都能常駐開啟的模式。一般到店試乘以事先確認的路線為準；四驅操作可請顧問說明，本站不承諾越野試乘。", sourceIds: ["jimny"] },
    { id: "jimny-modifications", question: "想改輪胎、保桿或加裝配件，下訂前要問什麼？", answer: "先列出預計更動項目，確認是否影響安全感知器、輪胎與車身條件及保固。現行 Jimny 有雷達與攝影機等駕駛輔助設備，不能假設舊款配件可直接沿用；請原廠及施工單位核對適用性與必要校正。", sourceIds: ["jimny"] },
  ],
  "e-vitara": [
    { id: "e-vitara-charging", question: "e VITARA 充電前要準備什麼？用哪種接頭？", answer: "台灣 e VITARA 使用 AC Type 1（J1772）與 DC CCS1。先找出住家或工作地點能使用的相容設備，再確認停車、充電時段與備用站點。不要直接套用海外車型或只看站點標示有充電樁。", points: ["列出平日里程、長途頻率，以及平常停車多久。", "常用站核對接頭、開放時間、停車費、充電費及付款方式。", "需要裝家充時，先由合格專業人員勘查供電與配線，再取得設備及施工報價。", "社區或共用停車場先確認管理與施工安排；長途另備相容站點。"], sourceIds: ["eVitara"], links: [{ href: "/guides/buying-cost", label: "把設備、施工與充電費納入預算" }] },
    { id: "e-vitara-public-charging", question: "沒有家用充電樁，也適合買 e VITARA 嗎？", answer: "先實際查看一週會使用的公共站點，估算繞路、等待和停車時間，並準備另一個相容站點。若充電能穩定融入作息，再評估是否適合；附近有站，不代表每次抵達都能立即充電。", sourceIds: ["eVitara"] },
    { id: "e-vitara-charging-time", question: "充到滿一定只要官網寫的時間嗎？", answer: "不一定。官網 AC 與 DC 標示有不同電量區間及測試條件，不能把快充 10% 到 80% 的時間當成充滿時間。設備、溫度與電池狀態也會影響速度，規劃旅程時請留補電餘裕。", sourceIds: ["eVitara"] },
    { id: "e-vitara-range", question: "官方續航里程是實際保證嗎？長途怎麼安排？", answer: "官方續航是指定測試標準下的結果，速度、空調、天候、載重與駕駛方式都會影響實際里程。規劃長途時，先確認沿途和目的地的相容充電站與備援，避免把測試里程當成每一段行程的可用距離。", sourceIds: ["eVitara"] },
    { id: "e-vitara-versions", question: "e VITARA 2WD 與 ALLGRIP-e 怎麼選？", answer: "先確認是否有四驅使用需求，再比較價格、配備與各版本測試續航。兩個版本使用情境不同；把平日路線、充電安排和長途頻率帶到現場一起討論，比只追求最高里程更有幫助。", sourceIds: ["eVitara"] },
  ],
  vitara: [
    { id: "vitara-vs-s-cross", question: "VITARA 和 S-CROSS 怎麼選？", answer: "以目前台灣販售資料看，兩款都是 1.4L 渦輪搭配 48V 輕油電，VITARA 為 ALLGRIP 四驅，S-CROSS 為前驅。先釐清驅動需求，再以相同乘坐人數及行李試放比較；四驅與行李公升數都不該是唯一決定因素。", table: suvTable, sourceIds: ["vitara", "sCross"], links: [{ href: "/cars/s-cross#s-cross-vs-vitara", label: "從 S-CROSS 的需求看看怎麼選" }] },
    { id: "vitara-hybrid", question: "VITARA 和 e VITARA 是同一種油電車嗎？", answer: "不是。本站 VITARA 是不用外接充電的 48V 輕油電，e VITARA 是需要安排充電的純電車。兩者的動力、能源使用及補充能源方式不同，不要混用油耗、充電或續航資料。", sourceIds: ["vitara", "eVitara"], links: [{ href: "/cars/e-vitara#e-vitara-charging", label: "了解 e VITARA 充電準備" }] },
    { id: "vitara-allgrip", question: "VITARA 有四驅，就適合所有露營或山路嗎？", answer: "還要看道路條件、輪胎、車輛負載與駕駛方式，四驅不能當成通行保證。先說明常走的路線，再請顧問解說 ALLGRIP 模式與限制；露營裝備也要在後座有人時實際試放。", sourceIds: ["vitara"] },
  ],
  "s-cross": [
    { id: "s-cross-vs-vitara", question: "S-CROSS 與 VITARA，家庭用車先比什麼？", answer: "先比較家人乘坐、行李需求和是否需要四驅。目前台灣 S-CROSS 為前驅，VITARA 為 ALLGRIP 四驅；比較空間時，請固定相同乘坐人數與後座狀態，帶嬰兒車或行李尺寸試放。", table: suvTable, sourceIds: ["sCross", "vitara"], links: [{ href: "/cars/vitara#vitara-vs-s-cross", label: "查看 VITARA 的比較與四驅問答" }] },
    { id: "s-cross-luggage", question: "S-CROSS 行李箱夠放全家出遊行李嗎？", answer: "公升數可先篩選，但還要看開口、底板及物品長寬高。請以全家正常就座時的狀態試放，確認嬰兒車與行李能否同時放入；不能用後座傾倒的最大容積當成坐滿時的空間。", sourceIds: ["sCross"] },
    { id: "s-cross-hybrid", question: "S-CROSS 要充電嗎？台灣版本有四驅嗎？", answer: "本站介紹的台灣 S-CROSS 是 48V 輕油電前驅版本，不用外接充電。海外市場可能有不同編成，訂購前請以台灣規配表與實際供應版本確認；有四驅需求可一起比較 VITARA。", sourceIds: ["sCross", "vitara"] },
  ],
  carry: [
    { id: "carry-loading", question: "CARRY 貨台放得下，就代表可以載嗎？", answer: "尺寸與重量要分開看。先核對車輛核定載重、實際總重及貨物固定方式；另有加裝設備或特殊用途時，下訂前就提出。不要只用貨台大小判斷是否適合工作需求。", sourceIds: ["carry"] },
    { id: "carry-business-purchase", question: "CARRY 用公司名義購車，要先準備什麼？", answer: "先確認登記名義、用途、發票與付款方式，再由承辦人依公司及是否貸款提供文件清單。商用車的方案或減稅資格須另外核對，不能直接套用一般小客車優惠。", sourceIds: ["registration", "tax"], links: [{ href: "/guides/trade-in", label: "先分清換購與減稅條件" }] },
    { id: "carry-test-drive", question: "可以直接到現場看 CARRY 或帶貨物試放嗎？", answer: "請先提供貨物尺寸、重量及裝卸方式，確認是否有可安排的展示車與試放條件，再約定到店時間。現場展示、試乘與載物示範都需要先確認。", sourceIds: [], links: [{ href: "/visit/beitou", label: "查看到店與預約方式" }] },
  ],
};

// Shared references keep the hub and each car page's answer identical.
export const featuredCarFaqs: { carId: CarId; faqId: string }[] = [
  { carId: "swift", faqId: "swift-vs-small-cars" },
  { carId: "swift", faqId: "swift-hybrid" },
  { carId: "jimny", faqId: "jimny-model-update" },
  { carId: "jimny", faqId: "jimny-daily-use" },
];

export function getGeneralFaq(id: string) { return generalFaqGroups.flatMap((group) => group.items).find((item) => item.id === id); }
