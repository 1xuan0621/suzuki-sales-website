import type { CarId } from "./site";
import { editorialReviewedAt, type ContentSourceId } from "./content-sources";

export interface ContentSection {
  title: string;
  paragraphs: string[];
  points?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  stage: string;
  readMinutes: number;
  takeaway: string;
  checklist: string[];
  updatedAt: string;
  reviewedAt: string;
  carIds: CarId[];
  sourceIds: ContentSourceId[];
  relatedSlugs: string[];
  faqIds: string[];
  sections: ContentSection[];
}

const guideDates = { updatedAt: editorialReviewedAt, reviewedAt: editorialReviewedAt };
const allCars: CarId[] = ["swift", "jimny", "e-vitara", "vitara", "s-cross", "carry"];

export const guideIndex = {
  updatedAt: editorialReviewedAt,
  title: "購車指南｜費用估算、訂車合約與交車流程｜張鈺漣",
  description: "第一次買車、換車或跨縣市交車，從預算、報價、合約、貸款保險到交車檢查，六篇指南陪你把每一步準備好。",
};

export const guides: Guide[] = [
  {
    ...guideDates, slug: "buying-cost", stage: "先抓預算", readMinutes: 4,
    title: "購車費用怎麼估？從車價算到每月養車",
    description: "車價之外還要準備多少？把交車前的支出、貸款與每月養車費分開，拿到報價就能逐項核對。",
    takeaway: "先算交車前要付的錢，再算每月負擔；訂金是車款的一部分，別重複加進總價。",
    checklist: ["一份含保險、領牌與配件的明細報價", "交車前可動用的金額", "停車位費用與每月行駛里程"],
    carIds: allCars, sourceIds: ["consumer", "registration", "loan"], relatedSlugs: ["financing-insurance", "quote-contract"], faqIds: ["total-cost", "cash-or-loan"],
    sections: [
      { title: "把預算分成三個帳本", paragraphs: ["第一本是交車前支出：自備車款、保險、領牌與稅費、配件，以及另約的運送費。第二本是分期支出：每期還款、貸款費用與可能的尾期款。第三本才是日常用車：停車、油電、保養與下一年度的保險及稅費。", "全額付款時，自備車款就是成交車價；辦貸款時，自備車款是成交車價減去實際核貸本金。已付訂金會抵車款，已包含在報價內的項目也不用再加一次。"] },
      { title: "一個算得清楚的假設範例", paragraphs: ["假設成交車價 80 萬元、自備車款 30 萬元、核貸 50 萬元，保險、領牌與選配另外共 6 萬元，交車前合計需準備 36 萬元。若已付訂金 2 萬元，後續尚需準備 34 萬元。這是計算示範，並非任何車型的報價或核貸承諾。", "貸款全期支出另算：自備車款＋全部期款＋另收的貸款費用＋其他購車費用。全部期款已含貸款本金，不要再把完整車價加進去。"] },
      { title: "拿到菜單，先問哪些已包含", paragraphs: ["不要只比最後一行的折扣。請把同年式、同版本與同車色的報價攤開，要求分項列出；領牌代收金額是否會依單據結算，也要先確認。"], points: ["空車成交價：是否附帶貸款、舊車換購或指定領牌時間等條件？", "配件：品牌、型號、施工與保固由誰負責？能否不加購？", "保險：投保人、保障內容、保額及自負額是否相同？", "領牌：規費、稅費、選號與代辦費各是多少？哪些有收據？", "換購：舊車估價與政府減稅是否分開列示？"] },
      { title: "每月養車，把一年才付一次的費用攤開", paragraphs: ["每月預算可以用「月付＋停車＋油電＋年度保險與稅費÷12＋保養預留」整理。輪胎、耗材與臨時修繕另留彈性，避免把能付月付當成能負擔全部用車成本。", "油費可先用每月公里數÷自己採用的油耗估值×油價試算；電費則依預估用電量與常用站點費率計算。短程、塞車與停車費差異很大，先用自己的路線估算，再以交車後的紀錄修正。"] },
    ],
  },
  {
    ...guideDates, slug: "quote-contract", stage: "看懂報價", readMinutes: 4,
    title: "訂車前怎麼看報價、訂金與合約？",
    description: "折扣一樣，成交條件可能不同。整理年式、出廠時間、贈品、退訂與交期，讓口頭承諾有可以核對的依據。",
    takeaway: "比較相同條件的完整報價；你在意的配備、付款與交車承諾，都要留在正式文件裡。",
    checklist: ["同版本、同年式的逐項報價", "要帶回審閱的契約與附件", "交期、退訂及貸款未核准的處理約定"],
    carIds: allCars, sourceIds: ["consumer"], relatedSlugs: ["buying-cost", "delivery-process"], faqIds: ["deposit", "model-year", "waiting-time"],
    sections: [
      { title: "先把比較基準對齊", paragraphs: ["同一車名也可能有不同版本、年式與生產批次。報價先寫清楚車型、車色、配備、是否已領牌，再核對優惠是否要求指定貸款、換購或期限。折扣較多，不一定代表最後支出較少。", "年式是款式，出廠年月是車輛實際生產時間；領牌日又是另一個日期。不要只以『今年的新車』作為約定，三者分開問清楚。"] },
      { title: "下訂之前，先取得可以審閱的完整文件", paragraphs: ["先拿到契約、配件明細與方案附件，留時間確認再簽署。消保會提醒，業者承諾應列入契約；贈品、指定品牌配件或交車日期，最好都有明確文字。"], points: ["交期寫的是預估區間，還是雙方約定的交車期限？", "延遲交車、變更車色或版本時，要怎麼處理？", "貸款未核准、核貸不足或利率與預期不同時，是否可以改付款方式或解除？", "隔熱紙、行車紀錄器等贈品，型號、數量、施工與保固有沒有寫明？"] },
      { title: "訂金能不能退，不要等到退訂才討論", paragraphs: ["退款要看契約、解除原因與適用規定，不能把所有退訂都當成可全額退，也不能只接受口頭一句『都不能退』。下訂前先問清楚退款條件、已施工配件如何處理及辦理方式，並保留契約與付款證明。", "付款前核對契約上的賣方與車商指定收款資訊，付款後取得可對帳的收據。若臨時收到不同帳戶，先透過原本確認過的公司聯絡管道查證。"] },
      { title: "把這段當成詢價清單", paragraphs: ["『請提供這個版本與車色的完整報價，分開列車價、配件、保險及領牌費；也請註明出廠年月、是否已領牌、預估交期、付款節點，以及貸款未核准或交期延誤時的處理方式。』", "先用同一份清單詢問，後續才容易比較。若仍有看不懂的條款，先請賣方逐項說明，確認後再決定。"] },
    ],
  },
  {
    ...guideDates, slug: "financing-insurance", stage: "安排付款", readMinutes: 4,
    title: "貸款與保險怎麼比？別只看月付和保費",
    description: "現金、低利率與低月付怎麼比較？整理總還款、手續費、提前清償和車險保障，確認交車後的負擔。",
    takeaway: "貸款比較全期總支出，保險比較相同保障；低月付或低保費都只是一部分。",
    checklist: ["各方案的頭款、每期金額與尾期款", "貸款費用及提前清償條件", "列出險種、保額、自負額的保險報價"],
    carIds: allCars, sourceIds: ["loan", "insurance", "autoInsurance"], relatedSlugs: ["buying-cost", "quote-contract"], faqIds: ["cash-or-loan", "insurance-coverage"],
    sections: [
      { title: "先把每一筆要付的金額列出來", paragraphs: ["請分別取得現金購車與貸款購車報價。比較時，把頭款、全部期款、尾期款及另收費用相加，再考慮兩種方案的車價或折扣差異。若有首年低月付，還要看第二年起的金額。", "總費用年百分率是納入相關費用後的比較指標，與貸款利率不同。看到低利率或零利率，仍要確認手續費及其他成本；核貸額度與條件以貸款機構審核為準。"] },
      { title: "簽貸款前，問清楚四件事", paragraphs: ["每月繳得起之外，也要想像之後可能換車、提前還款或收入改變的情況。"], points: ["利率與每期金額是否固定？是否有不同階段月付或大額尾款？", "開辦、帳管或設定等費用是多少？已包含在試算內嗎？", "提前清償是否有限制期間、違約金或其他約定？", "核貸不足時，自備款差額怎麼補？是否影響訂車契約？"] },
      { title: "強制險、第三人責任險與車體險，先分清楚", paragraphs: ["強制汽車責任保險主要提供法定範圍的人身傷亡保障，不負責修復你或對方的車輛。第三人責任險與車體損失險處理的風險不同，實際承保內容、除外責任與賠付條件須逐項看保單。", "比較保費時，請讓投保資料、保額、自負額及附加條款一致，再看價差。甲、乙、丙式的承保範圍不同，不能只憑『全險』兩字認定所有情況都有保障。"] },
      { title: "領牌前對好保單，交車前確認生效時間", paragraphs: ["先核對投保人與被保險人資料、車輛資料、保單起訖日及付款紀錄。若使用貸款，也要向貸款機構確認有無約定保險要求。", "網站貸款試算可協助理解本金、期數與利率的關係；實際費用、尾期款或個別方案仍以書面試算及契約確認。"] },
    ],
  },
  {
    ...guideDates, slug: "delivery-process", stage: "準備交車", readMinutes: 5,
    title: "從訂車到交車：付款、領牌與驗車清單",
    description: "先看車還是先付款？領牌要備哪些資料？按流程整理交車前確認、當天驗收與待處理事項，第一次交車也有依據。",
    takeaway: "把看車、付款、領牌及配件施工的順序事先約好；交車時核對實車、文件與待辦，再完成點交。",
    checklist: ["訂購契約與配件明細", "付款、保險與領牌單據", "手機、常用手機線材及同行家人"],
    carIds: allCars, sourceIds: ["consumer", "registration", "service"], relatedSlugs: ["quote-contract", "buying-process"], faqIds: ["payment-inspection", "registration-documents", "waiting-time"],
    sections: [
      { title: "先看懂整段流程", paragraphs: ["一般可以用『確認需求與試乘 → 報價及簽約 → 供車與貸款審核 → 看車、付款與領牌安排 → 配件完工 → 交車點交』掌握進度。車輛供應、貸款及施工會交互影響，實際先後要在簽約時談清楚。", "如果希望領牌前先看指定實車，請提早提出，約定查看時間、付款條件與領牌授權。不要等已經完成領牌或配件施工，才以為還在單純賞車階段。"] },
      { title: "車還沒到，先完成文件與時程核對", paragraphs: ["個人領牌會涉及身分證明與印章；公司購車所需資料不同。車輛出廠、完稅、保險與新領牌照等資料也要備齊，請由承辦人依身分與是否代辦提供完整清單。", "若交付證件或授權代辦，先確認用途、交付方式與歸還時間。選號或標牌有自己的程序與費用，務必在辦理前說明需求。本站諮詢表單不需要上傳證件或銀行資料。"] },
      { title: "當天先核對車輛與外觀", paragraphs: ["預留明亮、充足的檢查時間，拿著契約和配件表逐項點交。發現疑問時先拍照、一起記錄並確認後續處理，不要只留下口頭答覆。"], points: ["核對車型、車色、車身識別資料與文件是否一致。", "繞車查看漆面、玻璃、燈具、輪圈及內裝，記錄里程與油量／電量。", "逐一核對隔熱紙、行車紀錄器與其他配件的型號、數量及施工。", "檢查車門、車窗、空調、座椅、燈光與儀表有無異常。"] },
      { title: "再把操作、文件與鑰匙帶齊", paragraphs: ["請人員陪同完成手機連線與常用功能設定；駕駛輔助的開關、警示與作動限制，也要用你聽得懂的方式說明。純電車再加上充電口、線組及充電停止操作。"], points: ["依交付清單確認鑰匙、隨車工具、配件及相關證明。", "核對行照、發票、保險資料、付款及領牌結算單據。", "取得車主手冊與保固／保養資料，確認首次回廠時間及預約方式。", "把待補配件、待修項目、處理窗口與約定日期寫進點交紀錄，雙方各留一份。"] },
    ],
  },
  {
    ...guideDates, slug: "buying-process", stage: "跨縣市安排", readMinutes: 4,
    title: "SUZUKI 跨縣市購車與交車流程",
    description: "人在外縣市，也能先遠端了解車款與報價。從到店次數、交車運送到就近保養，把交通、費用與售後窗口一起安排。",
    takeaway: "跨縣市先確認需要跑幾趟、在哪裡交車與誰負責售後，再把交通和運送費放進比較。",
    checklist: ["所在縣市、用車需求與期望交期", "到店自取或希望運送的地點", "住家附近的保修選擇"],
    carIds: allCars, sourceIds: ["consumer", "registration", "service"], relatedSlugs: ["delivery-process", "buying-cost"], faqIds: ["remote-purchase", "local-service"],
    sections: [
      { title: "第一步：遠端先談到具體報價", paragraphs: ["可以先透過 LINE、電話或網站表單，說明所在縣市、預算、乘坐人數、停車條件及想了解的車款。顧問的實際服務據點在台北北投，先把問題談清楚，再決定到店安排。", "請拿到與到店客戶同樣可核對的明細：車型、年式、出廠時間、車價、配件、保險、領牌、付款及預估交期。遠端介紹可以先篩選需求，試坐和試乘感受仍建議親自確認。"] },
      { title: "第二步：把需要本人到場的事情排在一起", paragraphs: ["先確認展示與試乘車、文件簽署及領牌前看車各自的安排，討論是否能合併行程。並非所有程序都能線上完成；公司購車、貸款對保或特殊文件需求，可能另有處理方式。", "出發前再次確認車輛與人員都已就緒。若要由他人代辦，授權範圍、所需文件與資料交付方式都先談清楚。"] },
      { title: "第三步：自取或運送，先約好責任與費用", paragraphs: ["到店自取可以當面核對車輛、配件與操作；若希望其他地點交車，先討論可安排範圍。運送方式、費用、保險與途中發生損傷的處理，應寫明後再確認。", "交車地點、費用與時程依個案約定。訂單成立或完成領牌，並不代表指定日期已確認可以送達。"], points: ["自取：交通、同行人員與回程路線怎麼安排？", "運送：由誰運送、何時到達、在哪裡驗收、費用是否另計？", "改期：供車、天候或施工延遲時，由誰通知、如何調整？", "異常：到場發現配件未完成或車況疑問，誰負責記錄與處理？"] },
      { title: "第四步：先找到日後最方便的服務窗口", paragraphs: ["可以從 Taiwan Suzuki 官方保修據點查找住家附近的服務中心，先洽詢預約及車輛保養需求。保固適用條件依隨車文件；購車贈送的保養或經銷商活動，是否限指定店家也要另問。", "建議分開記錄三個聯絡窗口：購車與文件找原銷售端、例行保養洽保修據點、加裝配件確認施工或保固單位。跨縣市買車前先對好，交車後就不用臨時找人。"] },
    ],
  },
  {
    ...guideDates, slug: "trade-in", stage: "舊車換新", readMinutes: 4,
    title: "舊車怎麼處理？換購估價與減稅準備",
    description: "舊車賣掉、交給車商換購或報廢，影響的金額與手續不同。先分清舊車殘值、車商優惠和貨物稅減徵，再安排換車時間。",
    takeaway: "舊車價、車商折扣與政府減稅分開算；先查資格與時程，再決定出售或報廢。",
    checklist: ["舊車出廠與登記資料", "舊車估價及剩餘貸款金額", "新車預估交期與減稅資格確認"],
    carIds: allCars, sourceIds: ["tax", "registration"], relatedSlugs: ["buying-cost", "delivery-process"], faqIds: ["trade-in-tax"],
    sections: [
      { title: "先分清三筆不同的錢", paragraphs: ["舊車出售或換購估價，是車輛本身的價值；車商換購優惠，是有適用條件的成交方案；政府貨物稅減徵則依車種與法定資格核定。請分開列示，避免把同一筆減稅同時當成車價折扣和額外退款。", "詢問換購報價時，可以同時要求『不交舊車的新車價』與『舊車單獨估價』，再比較整體條件。若舊車仍有貸款，還要確認結清與相關手續。"] },
      { title: "新購減稅與汰舊換新，不是同一個條件", paragraphs: ["依財政部現行說明，符合條件的新購 2,000cc 以下小客車可減徵貨物稅最高 5 萬元；另符合汰舊換新者可再申請最高 5 萬元，合計不超過新車已繳貨物稅。不是所有車型或每位買家都能拿到 10 萬元。", "汰舊換新另有舊車車齡、登記期間、報廢或出口與新車領牌的前後期限等條件。純電車、小貨車與公司購車不可直接套用一般小客車範例；先按實際車籍、車種與已繳稅額確認資格。"] },
      { title: "先排好換車日期，再處理舊車", paragraphs: ["若還需要舊車通勤，先確認新車供應進度及預定點交時間，再決定出售或報廢時點。減稅申請有時間條件，不要只為了趕優惠先處理舊車，卻沒有確認新車能否配合。"], points: ["確認舊車估價有效時間、點交車況與是否有扣款項目。", "出售時確認過戶；報廢時確認車體回收與車籍報廢各自完成。", "列出減稅申請所需文件、申請窗口與預計入帳方式。", "請對方註明報價是否已先扣減稅，以及未通過核定時怎麼結算。"] },
      { title: "把尚未收到的退款留在另一欄", paragraphs: ["編交車預算時，先以當下實際要付的金額準備；未核定或未入帳的款項另列。若車商有先行折抵安排，應在文件中寫清楚金額、條件及後續結算。", "申請前再次查看財政部最新規則，並讓承辦人依實際資料核對。本站整理的是換購準備事項，不以網站車價直接承諾個案退稅額度。"] },
    ],
  },
];

export function getGuide(slug: string) { return guides.find((guide) => guide.slug === slug); }

// Keep already published URLs usable after moving their subject to its owner page.
export const guideRedirects = [
  { source: "/guides/swift-buying-cost", destination: "/guides/buying-cost", permanent: true },
  { source: "/guides/vitara-vs-s-cross", destination: "/cars/vitara#vitara-vs-s-cross", permanent: true },
  { source: "/guides/e-vitara-charging", destination: "/cars/e-vitara#e-vitara-charging", permanent: true },
];
