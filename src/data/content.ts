import { cars, contentReviewedAt, eVitaraVersions, type CarId } from "./site";

export const siteUrl = "https://suzuki-taipei.com";
export const homeContent = {
  updatedAt: "2026-09-08",
  title: "SUZUKI 台北購車與試乘諮詢｜汽車顧問張鈺漣",
  description: "SUZUKI 汽車顧問張鈺漣以台北為主要服務地區，提供全台選車、購車諮詢與跨縣市交車協助。了解六款車的價格、規格與購車流程，預約凱騰鈴木北投所賞車及試乘；交車安排依個案確認。",
  introduction: "以台北為主要服務地區，提供全台購車諮詢，並協助跨縣市購車與交車。實際服務據點位於凱騰鈴木北投所，到店賞車與試乘請先預約；交車地點、費用與時程依個案確認。",
};

export const showroom = {
  name: "凱騰鈴木北投所",
  address: "台北市北投區承德路六段337號",
  phone: "(02) 2821-1128",
  phoneHref: "tel:0228211128",
  hours: ["週一至週五 08:30–21:00", "週六、週日 09:00–21:00"],
  sourceUrl: "https://www.taiwansuzuki.com.tw/jt/locator?type=1",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("凱騰鈴木北投所 台北市北投區承德路六段337號"),
  reviewedAt: "2026-09-08",
  updatedAt: "2026-09-08",
  title: "SUZUKI 台北到店賞車與試乘｜北投所交通及預約｜張鈺漣",
  description: "預約 SUZUKI 台北北投所賞車與試乘，查看承德路六段據點地址、營業時間、交通及停車確認事項。由張鈺漣先確認車款與時段，外縣市客戶也可先遠端諮詢。",
};

export interface Question { question: string; answer: string }
export interface ContentSection { title: string; paragraphs: string[]; points?: string[] }
export interface CarPageContent {
  updatedAt: string;
  specsReviewedAt: string;
  pricesReviewedAt: string;
  description: string;
  introduction: string;
  considerations: string[];
  testDrive: string[];
  questions: Question[];
  guideSlugs: string[];
  relatedCars: CarId[];
}

const carDates = { updatedAt: "2026-09-08", specsReviewedAt: contentReviewedAt, pricesReviewedAt: "2026-09-08" };
export const carPages: Record<CarId, CarPageContent> = {
  swift: {
    ...carDates,
    description: "了解 SUZUKI SWIFT 台灣售價、輕油電規格、停車尺寸與後座空間取捨。張鈺漣提供全台購車諮詢與跨縣市交車協助，台北北投到店賞車及試乘請先預約。",
    introduction: "選通勤小車，除了看車價，也要把每天停車、常坐幾人與週末載物一起考慮。SWIFT 可從車身尺寸、座椅調整與行李空間三個面向實際確認，讓選車回到自己的生活需求。",
    considerations: ["經常同時載滿乘客與大型行李，請把實際行李帶到現場確認，不能只看後座傾倒後的容積。", "機械車位需逐項核對限高、限寬、限長及載重；車身高度符合並不代表所有車位都能使用。", "官方油耗是測試值，塞車、短程與空調使用都會影響實際表現，不以測試值承諾每月油錢。"],
    testDrive: ["調整成平常開車的坐姿，查看前方、轉彎及倒車時的視野。", "讓常同行的家人試坐後座，確認上下車與腿部空間。", "詢問可安排的路段，觀察起步、低速跟車與停車操作感受。"],
    questions: [
      { question: "SWIFT 可以停進我的機械車位嗎？", answer: "先提供車位的限長、限寬、限高、載重與入口條件，再對照官方規配表。車道轉彎與升降設備也可能有限制，建議向停車設備管理者確認。" },
      { question: "SWIFT 的輕油電需要另外充電嗎？", answer: "SWIFT 的輕油電系統與需插電的純電車不同，日常不需替車輛安排外接充電；系統作動條件與保養仍依原廠說明。" },
      { question: "除了建議售價，購車預算還要準備什麼？", answer: "把保險、領牌相關費用、選配、貸款利息及日常停車費分開估算，並向顧問索取逐項報價。下方購車費用指南可作為詢價清單。" },
    ], guideSlugs: ["swift-buying-cost", "buying-process"], relatedCars: ["s-cross"],
  },
  jimny: {
    ...carDates,
    description: "認識 SUZUKI Jimny 2026 台灣售價、四驅規格與日常乘坐、載物取捨。張鈺漣提供全台購車諮詢，跨縣市交車依個案確認；台北北投賞車及試乘請先預約。",
    introduction: "Jimny 的選車重點在於是否需要它的四驅與車身配置，以及是否接受日常乘坐與載物的取捨。先把通勤、同行人數與戶外行程列出來，再透過實車確認，會比只看外型更容易判斷。",
    considerations: ["後座乘坐與行李需求會互相影響，請用平常同行人數安排試坐，並確認上下車方式。", "四驅功能不等於任何路況都能安全通過；模式使用、輪胎及駕駛方式須遵守車主手冊。", "若主要需求是長途多人乘坐，建議同時試坐休旅車，比較座艙及乘坐感受。"],
    testDrive: ["在允許的試乘路線感受一般道路的轉向、煞車與乘坐。", "確認前後座進出、行李擺放與日常停車視野。", "由顧問說明四驅模式使用條件；一般到店試乘不代表能安排越野體驗。"],
    questions: [
      { question: "這頁介紹的是哪個 Jimny 年式？", answer: "本站目前顯示 Jimny 2026，配備以連結的台灣官方規配表及訂購車輛為準。交期、車色與實際供應年式請在下訂前確認。" },
      { question: "Jimny 適合每天通勤嗎？", answer: "可以先依通勤距離、道路、同行人數及停車條件評估。建議親自試乘並試坐後座，比較你對乘坐感受及載物空間的要求。" },
      { question: "到店可以直接試越野嗎？", answer: "本站不承諾越野試乘。試乘車、路線與時段需先確認，四驅操作應遵守原廠手冊及現場人員說明。" },
    ], guideSlugs: ["buying-process"], relatedCars: ["vitara"],
  },
  "e-vitara": {
    ...carDates,
    description: "了解 SUZUKI e VITARA 台灣版本、售價、充電介面及續航測試條件，評估居家與外出充電。張鈺漣提供全台購車諮詢及跨縣市交車協助，台北北投試乘請先預約。",
    introduction: "選純電車先從充電安排開始：平常停在哪裡、能否安裝設備、長途會在哪裡補電。e VITARA 的版本選擇也要一起考慮驅動需求與測試續航，避免只用單一里程數決定。",
    considerations: ["沒有固定充電位置時，先確認常用公共站點的相容接頭、營業條件及替代站點。", "NEDC 續航是指定測試條件下的結果，不能直接當成高速、滿載或開空調時的保證行駛里程。", "居家充電是否能裝、要花多少費用，需由合格專業人員勘查供電、配線與停車位條件。"],
    testDrive: ["體驗起步與減速感受，確認駕駛姿勢及中控操作。", "請顧問示範充電口、充電資訊與日常操作方式。", "帶著通勤里程和充電安排討論版本，不只比較最高續航。"],
    questions: [
      { question: "2WD 與 ALLGRIP-e 要怎麼選？", answer: "先確認是否有四驅使用需求，再比較售價、配備與各版本測試續航。兩版本條件不同，請以同一份台灣官方規配表比較。" },
      { question: "官方續航里程代表實際一定能開那麼遠嗎？", answer: "不能。官方標示有特定測試標準，實際里程會受到速度、溫度、空調、載重及駕駛方式影響，長途行程應安排充電餘裕。" },
      { question: "沒有自家充電設備也能買嗎？", answer: "先評估日常可使用的公共充電站、時間成本及備援選擇。設備相容與站點可用性需逐一確認，可先看下方充電準備指南，再討論是否適合自己的作息。" },
    ], guideSlugs: ["e-vitara-charging", "buying-process"], relatedCars: ["vitara"],
  },
  vitara: {
    ...carDates,
    description: "比較 SUZUKI VITARA 台灣售價、輕油電與 ALLGRIP 四驅規格，了解與 S-CROSS 的空間及用途差異。張鈺漣提供全台購車諮詢，台北北投賞車及試乘請先預約。",
    introduction: "VITARA 可從四驅需求、車身與空間配置來評估。若平日通勤、週末戶外出遊，請把常走道路、乘坐人數及裝備一起列入選車條件，再與 S-CROSS 比較。",
    considerations: ["先確認四驅是否符合自己的使用情境，再比較價格與日常支出。", "四驅仍受輪胎、路況與駕駛操作限制，不能視為任何路面的通行保證。", "露營裝備或嬰兒車是否好放，應以實際尺寸及後座使用情況確認。"],
    testDrive: ["感受通勤路段的起步、轉向及停車視野。", "請同行家人試坐，並核對行李箱開口與常用物品尺寸。", "詢問 ALLGRIP 模式與使用限制，並與 S-CROSS 比較乘坐感受。"],
    questions: [
      { question: "VITARA 和 S-CROSS 的主要選擇差異是什麼？", answer: "本站目前台灣版本資料中，VITARA 為 ALLGRIP 四驅，S-CROSS 為前驅，兩者行李空間也不同。先用驅動需求與實際載物清單篩選，再安排試坐。" },
      { question: "輕油電也需要裝充電樁嗎？", answer: "本站介紹的 VITARA 輕油電版本不需外接充電。它與 e VITARA 純電車的能源使用方式不同，請不要混用兩款車的充電與續航資訊。" },
      { question: "可以協助外縣市購車與交車嗎？", answer: "可以先遠端討論選車及購車條件，交車地點、費用、時程與可安排範圍依個案確認；不預設為全台免費送車。" },
    ], guideSlugs: ["vitara-vs-s-cross", "buying-process"], relatedCars: ["s-cross", "e-vitara"],
  },
  "s-cross": {
    ...carDates,
    description: "了解 SUZUKI S-CROSS 台灣售價、前驅輕油電規格及家庭載物需求，與 VITARA 比較選車取捨。張鈺漣提供全台購車諮詢與跨縣市交車協助，台北北投試乘請先預約。",
    introduction: "家庭選車可以先從每天怎麼用開始：誰常坐後座、行李是否要和乘客同時上車、停車場是否好進出。S-CROSS 的空間配置值得實車確認，再依自己的驅動需求與 VITARA 比較。",
    considerations: ["行李箱公升數不能直接代表所有物品都放得下，開口形狀、物品長寬高與後座是否有人同樣重要。", "若需要四驅，請比較 VITARA 的台灣版本；不要把不同市場的 S-CROSS 配備混在一起。", "駕駛輔助功能有作動條件，仍需要駕駛持續注意路況與操作。"],
    testDrive: ["家人一起試坐前後座，查看空調、置物與上下車便利性。", "確認停車時的車身感受與視野，請顧問示範相關輔助功能。", "依實際行李尺寸核對行李箱，並比較後座直立及傾倒兩種狀態。"],
    questions: [
      { question: "S-CROSS 與 VITARA 要先比什麼？", answer: "先比較是否需要四驅，以及常用行李能否在後座有人時放入。再把售價、配備與試乘感受放在一起看，下方比較指南整理了相同基準。" },
      { question: "行李空間適合家庭出遊嗎？", answer: "建議帶著嬰兒車、行李箱或露營裝備的尺寸到店確認。最大容積通常涉及後座傾倒，不能當成乘客坐滿時的可用空間。" },
      { question: "我人在外縣市，可以先了解報價嗎？", answer: "可以透過 LINE、電話或表單說明想了解的車款、用途與預算，再由顧問確認報價項目及後續安排。到店試乘與跨縣市交車另約。" },
    ], guideSlugs: ["vitara-vs-s-cross", "buying-process"], relatedCars: ["vitara", "swift"],
  },
  carry: {
    ...carDates,
    description: "查看 SUZUKI CARRY 台灣售價、貨台尺寸與載重規格，整理商用購車及交車前確認事項。張鈺漣提供全台購車諮詢，跨縣市交車地點、費用及時程依個案確認。",
    introduction: "工作車先看工作內容：貨物尺寸、重量、裝卸方式與每天的路線，再看購車及使用成本。CARRY 的貨台與載重資料可作為初步篩選，實際用途仍需對照車輛核定資料。",
    considerations: ["重量估算須包含實際裝載與加裝設備的影響，不能只看貨台放不放得下。", "特殊貨物、設備或車體改裝需求，請在下訂前確認適用性及相關要求。", "商用貸款與活動資格需個別審核，不能將一般購車優惠直接套用到所有用途。"],
    testDrive: ["先提供平常貨物尺寸、重量及裝卸情境，確認貨台使用方式。", "實際坐入駕駛座，確認上下車與日常操作位置。", "賞車或試乘車輛是否可安排，請先向顧問確認，不預設現場有展示或試乘車。"],
    questions: [
      { question: "貨台放得下，就代表可以合法載運嗎？", answer: "不能只看尺寸。應核對車輛核定載重、實際總重、貨物固定方式及用途要求；特殊需求請先提出並確認。" },
      { question: "工作用途都能適用網站上的優惠嗎？", answer: "各活動可能排除特定用途或購車形式，貸款也須審核。請先確認用途、方案期間與官方條件，再取得逐項報價。" },
      { question: "跨縣市交車前應確認哪些事情？", answer: "先確認訂購版本、加裝項目、文件、付款及交車地點，再確認運送費用與時程。交車時一起核對車輛與使用說明，具體安排由雙方事前約定。" },
    ], guideSlugs: ["buying-process"], relatedCars: [],
  },
};

export function carTitle(id: CarId) {
  const car = cars.find((item) => item.id === id)!;
  return `SUZUKI ${car.name} 價格、${id === "e-vitara" ? "充電" : "規格"}與台北試乘｜張鈺漣`;
}

// Single-version starting prices continue to come from the existing shared car data.
// e VITARA's two prices also feed its visible specification line and schema.
export function carVersions(id: CarId) {
  if (id === "e-vitara") return eVitaraVersions;
  const car = cars.find((item) => item.id === id)!;
  return [{ name: `${car.name} 台灣販售版本`, priceTwd: Math.round(Number(car.price.replace(/[^0-9.]/g, "")) * 10000) }];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  reviewedAt: string;
  carIds: CarId[];
  sections: ContentSection[];
}
export const guides: Guide[] = [
  {
    slug: "buying-process", title: "SUZUKI 跨縣市購車與交車流程",
    description: "全台客戶如何向台北 SUZUKI 汽車顧問張鈺漣諮詢？整理遠端選車、逐項報價、購車文件及跨縣市交車地點、費用與時程的確認流程。",
    updatedAt: "2026-09-08", reviewedAt: "2026-09-08", carIds: ["swift", "jimny", "e-vitara", "vitara", "s-cross", "carry"],
    sections: [
      { title: "先遠端說明用車需求", paragraphs: ["不用先到台北才能開始選車。全台客戶皆可透過 LINE、電話或網站表單說明想了解的車款、用途與預算；尚未決定車款，也可以先列出乘坐、停車與載物需求。", "北投是張鈺漣的實際服務據點。跨縣市購車與交車可協助討論，但交車地點、費用、時程及適用範圍都需依個案確認。"] },
      { title: "報價逐項看，先確認再決定", paragraphs: ["比較報價時，請確保車款版本、年式、車色與配備基準相同。官方建議售價、活動優惠與最後成交條件是不同資訊，應由顧問逐項說明。"], points: ["車輛版本與價格、選配或加裝項目。", "保險與領牌相關費用，哪些已包含、哪些另計。", "貸款本金、期數、利率、費用及適用資格。", "預估交期、付款節點、交車安排及額外費用。"] },
      { title: "賞車與試乘先確認車款及時段", paragraphs: ["若能到台北，先與顧問約定北投所賞車時間，並確認是否有想看的展示或試乘車。展示間營業時間不代表顧問隨時在場，也不代表每款車都能當場試乘。", "無法立即到店時，可以先討論規格、照片與購車條件，再安排適合的下一步；不以遠端介紹代替實際乘坐感受。"] },
      { title: "購車文件與付款安排逐案確認", paragraphs: ["個人、公司、貸款或其他購車情況所需資料可能不同，請由顧問依購車身分提供清單，並在約定管道處理。網站諮詢表單只需基本聯絡與選車需求，不需填入證件、銀行或完整財務資料。", "簽署前逐項閱讀訂購與付款內容；付款方式、收款資訊及交車條件以正式文件和雙方確認為準。"] },
      { title: "交車前，把地點、費用與時間寫清楚", paragraphs: ["跨縣市交車並不預設為免費送車或指定日期一定可達。先確認交車位置、可安排範圍、運送方式與費用，再配合實際供車及文件進度約定時間。"], points: ["交車人員、地點、聯絡方式與當日安排。", "車型、車色、配備及加裝項目是否與約定一致。", "文件、鑰匙、保固與保養資訊是否齊備。", "基本操作、駕駛輔助限制；純電車另確認充電操作。"] },
    ],
  },
  {
    slug: "vitara-vs-s-cross", title: "SUZUKI VITARA 與 S-CROSS 怎麼選",
    description: "用相同台灣版本基準比較 SUZUKI VITARA 與 S-CROSS 的價格、驅動及行李空間，整理家庭通勤、戶外出遊與到店試坐的選車清單。",
    updatedAt: "2026-09-08", reviewedAt: contentReviewedAt, carIds: ["vitara", "s-cross"],
    sections: [
      { title: "先決定需求，再比較配備", paragraphs: ["如果每天以通勤與家庭接送為主，請先評估座位、停車和常帶的行李。如果行程包含戶外出遊，也要釐清真正需要的驅動條件。兩款車不必用單一項規格分出好壞，而是看哪個組合符合自己的用途。"] },
      { title: "用同一個空間條件比較", paragraphs: ["比較行李箱時，應同時看後座直立時的空間、傾倒方式及開口尺寸。不能把一款車後座傾倒的最大值，拿來和另一款車後座有人乘坐時的數字比較。", "到店可帶著常用行李的尺寸，試放嬰兒車或露營裝備，並讓常同行的人試坐；表格中的公升數只作初步篩選。"] },
      { title: "四驅需求與日常用途一起考慮", paragraphs: ["本站所列的台灣版本資料中，VITARA 使用 ALLGRIP 四驅，S-CROSS 為前驅。是否需要四驅，應依常用道路與原廠模式使用條件判斷。", "四驅不能取代正確輪胎與安全駕駛。試乘時仍以允許的一般路線觀察視野、起步、轉向與煞車感受，不預設有越野體驗。"] },
      { title: "兩款車都試坐，再整理報價", paragraphs: ["確認同一個購車時間點的版本、車色、配備、保險、領牌及貸款條件，再比較完整報價。到台北北投試坐與試乘前，請先確認車輛及時段。"], points: ["前後座坐姿、進出便利性及常用物品擺放。", "停車場限制、車道轉彎與日常駕駛視野。", "購車總支出與日後用車支出分開比較。"] },
    ],
  },
  {
    slug: "swift-buying-cost", title: "SUZUKI SWIFT 購車費用怎麼估",
    description: "SUZUKI SWIFT 購車預算不只車價：整理保險、領牌、選配、貸款與日常持有支出，搭配月付試算向顧問確認完整報價。",
    updatedAt: "2026-09-08", reviewedAt: "2026-09-08", carIds: ["swift"],
    sections: [
      { title: "把一次購車支出與日常費用分開", paragraphs: ["先以本站與官方車款頁的建議起價作為選車參考，再向顧問確認實際版本及成交條件。不要直接把起價當成包含保險、領牌、選配與利息的總支出。"], points: ["購車時：車輛、選配、保險、領牌相關費用及其他約定項目。", "使用時：停車、能源、保養與適用的年度費用。", "貸款時：頭期款、每期還款、利息與額外費用。"] },
      { title: "拿逐項報價比較，避免只看月付", paragraphs: ["保險會依投保內容與個別條件而不同；規費與適用費用應按購車當時的規定及正式報價核對。本指南不提供固定保費或稅額，避免把不同條件混成同一筆價格。", "如果有舊車處理或活動優惠，請確認資格、適用期間與是否可併用，再把折抵與支出分項記錄。"] },
      { title: "月付試算用來比較情境", paragraphs: ["首頁貸款試算可調整車價、貸款比例、期數及年利率。試算設定預設年利率為 3%，可輸入範圍為 3% 至 8%；這是計算工具的設定，並非保證能取得的貸款方案。", "試算結果不等於金融機構核貸，也不代表已包含手續費、保險或其他支出。正式申請前請核對本金、總還款與全部費用。"] },
      { title: "依自己的通勤方式估持有支出", paragraphs: ["列出每月行駛距離、停車方式及可能的保養安排，再逐項估算。官方油耗屬測試值，實際塞車、短程與駕駛方式不同，不宜直接用測試數字保證每月油錢。"], points: ["先列每月可負擔支出，再回推車價與貸款安排。", "保留保養及臨時支出空間，不將所有預算用於月付。", "向顧問提出用途與預算區間，取得能逐項核對的方案。"] },
    ],
  },
  {
    slug: "e-vitara-charging", title: "SUZUKI e VITARA 購車前的充電準備",
    description: "購買 SUZUKI e VITARA 前，先檢查固定停車位、充電介面、安裝評估及公共充電備援，理解測試續航與真實用車條件的差別。",
    updatedAt: "2026-09-08", reviewedAt: contentReviewedAt, carIds: ["e-vitara"],
    sections: [
      { title: "先確認車停在哪裡、什麼時候能充電", paragraphs: ["把一週常見行程寫出來：住家、工作地點、每日距離與週末長途。固定且方便使用的充電位置，有助於把補電排入日常；如果主要依賴公共站點，也要把等待及繞路時間列入評估。"] },
      { title: "依台灣版本確認介面與設備相容", paragraphs: ["充電接頭、設備與車輛規格應以台灣販售版本及官方規配表確認，不直接套用海外介紹。下方車款連結提供目前整理的 AC／DC 介面及測試條件。", "規劃站點前確認接頭、使用方式與營運資訊；設備相容不表示任何情況都能達到相同充電速度，實際表現也受電池狀態及溫度等條件影響。"] },
      { title: "安裝費用先勘查，再取得報價", paragraphs: ["準備停車位使用條件、供電位置與可能配線路徑，交由合格專業人員評估。共同使用的建物或停車場，也需先確認管理及施工安排。", "不自行推估一定能安裝、固定安裝費或保證施工時間。先取得現場評估與書面報價，再把設備及施工支出加入購車預算。"] },
      { title: "長途行程準備替代站點", paragraphs: ["官方續航標示有指定測試標準，不是任何速度、天氣及載重下的保證。長途行程應保留充電餘裕，確認目的地和沿途可用站點，並準備替代選擇。", "公共站點是否開放、設備是否可用及計費方式，應在出發前查看營運商最新資訊。本頁不把個別站點價格當成固定費率。"] },
      { title: "帶著充電清單到店討論", paragraphs: ["預約台北北投賞車或試乘時，可請顧問介紹充電口及車內資訊顯示；實際車輛與可示範項目需先確認。"], points: ["固定停車位與設備安裝評估是否已有結果。", "每日里程、長途頻率及常用公共站點。", "偏好的版本、預算與交車後的充電安排。"] },
    ],
  },
];

export function getGuide(slug: string) { return guides.find((guide) => guide.slug === slug); }

export const contentRoutes = [
  { path: "/", updatedAt: homeContent.updatedAt, title: homeContent.title },
  ...cars.map((car) => ({ path: `/cars/${car.id}`, updatedAt: carPages[car.id].updatedAt, title: carTitle(car.id) })),
  { path: "/visit/beitou", updatedAt: showroom.updatedAt, title: showroom.title },
  ...guides.map((guide) => ({ path: `/guides/${guide.slug}`, updatedAt: guide.updatedAt, title: `${guide.title}｜張鈺漣` })),
];
